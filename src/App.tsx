import { useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment, PerspectiveCamera } from '@react-three/drei'
import Scene from './components/Scene'
import UI from './components/UI'
import type { Config, Project } from './types/config'

function App() {
  const [config, setConfig] = useState<Config | null>(null)
  const [loading, setLoading] = useState(true)
  const [projects, setProjects] = useState<Project[]>([])

  useEffect(() => {
    const configPath = `${import.meta.env.BASE_URL}config.json`

    fetch(configPath, { cache: 'no-cache' })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to load config: ${res.status}`)
        }
        return res.json()
      })
      .then((data: Config) => {
        setConfig(data)
        document.title = data.page.title
        setProjects(data.projects)
        setLoading(false)
      })
      .catch((error) => {
        console.error('Error loading config:', error)
        // Fallback config if fetch fails
        const fallbackConfig: Config = {
          page: {
            title: "Portfolio - Projects",
            mainTitle: "My Projects",
            subtitle: "A collection of my work and creations"
          },
          projects: [
            {
              title: "Example Project",
              description: "Edit public/config.json to add your projects",
              link: "",
              type: "project"
            }
          ],
          footer: {
            text: "Connect with me",
            name: "Your Name",
            socials: []
          }
        }
        setConfig(fallbackConfig)
        setProjects(fallbackConfig.projects)
        setLoading(false)
      })
  }, [])

  useEffect(() => {
    if (!config?.github || !config.github.username) {
      return
    }

    const controller = new AbortController()
    const loadRepos = async () => {
      try {
        const { username, includeForks = false, maxProjects = 12 } = config.github!
        const response = await fetch(
          `https://api.github.com/users/${username}/repos?sort=updated&per_page=${maxProjects}`,
          { signal: controller.signal }
        )

        if (!response.ok) {
          throw new Error(`GitHub API error: ${response.status}`)
        }

        const repos = await response.json()
        const mappedProjects: Project[] = repos
          .filter((repo: any) => includeForks || !repo.fork)
          .map((repo: any) => ({
            title: repo.name,
            description: repo.description || 'A GitHub project',
            link: repo.homepage || repo.html_url,
            type: repo.homepage ? 'website' : 'project',
          }))

        setProjects(mappedProjects.length ? mappedProjects : config.projects)
      } catch (error) {
        if ((error as Error).name !== 'AbortError') {
          console.error('Failed to load GitHub projects:', error)
          setProjects(config.projects)
        }
      }
    }

    loadRepos()

    return () => controller.abort()
  }, [config])

  if (loading || !config) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100vw',
        height: '100vh',
        minHeight: '100vh',
        color: 'white',
        fontSize: '1.5rem',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
      }}>
        Loading...
      </div>
    )
  }

  const effectiveProjects = projects.length ? projects : config.projects

  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      minHeight: '100vh',
      position: 'relative',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'block',
      margin: 0,
      padding: 0
    }}>
      <Canvas
        shadows
        gl={{ antialias: true, alpha: false }}
        dpr={[1, 2]}
        style={{ width: '100%', height: '100%', display: 'block' }}
      >
        <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={50} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} castShadow />
        <directionalLight position={[-10, 10, -10]} intensity={0.5} />
        <Environment preset="sunset" />
        <Scene projects={effectiveProjects} socials={config.footer.socials} />
        <OrbitControls
          enableZoom={true}
          enablePan={false}
          minDistance={5}
          maxDistance={20}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>
      <UI config={config} />
    </div>
  )
}

export default App

