import { useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment, PerspectiveCamera } from '@react-three/drei'
import Scene from './components/Scene'
import UI from './components/UI'
import type { Config } from './types/config'
import { GRADIENT_BG, FULL_VIEWPORT_STYLES, CENTERED_FLEX } from './constants/styles'

function App() {
  const [config, setConfig] = useState<Config | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/config.json')
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to load config: ${res.status}`)
        }
        return res.json()
      })
      .then((data: Config) => {
        setConfig(data)
        document.title = data.page.title
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
        setLoading(false)
      })
  }, [])

  if (loading || !config) {
    return (
      <div style={{ 
        ...CENTERED_FLEX,
        ...FULL_VIEWPORT_STYLES,
        color: 'white',
        fontSize: '1.5rem',
        background: GRADIENT_BG
      }}>
        Loading...
      </div>
    )
  }

  return (
    <div style={{ 
      ...FULL_VIEWPORT_STYLES,
      position: 'relative', 
      background: GRADIENT_BG,
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
        <Scene config={config} />
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

