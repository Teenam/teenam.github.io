import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Group } from 'three'
import ProjectCard from './ProjectCard'
import type { Project, Config } from '../types/config'

import SocialIcons from './SocialIcons'
import Sun from './Sun'

interface SceneProps {
  projects: Project[]
  socials: Config['footer']['socials']
}

function Scene({ projects, socials }: SceneProps) {
  const sceneRef = useRef<Group>(null)

  // Gentle scene rotation
  useFrame(() => {
    if (!sceneRef.current) return
    sceneRef.current.rotation.y += 0.0005
  })

  const planetConfigs = useMemo(() => {
    const activeProjects = projects.length
      ? projects
      : [
        {
          title: 'Loading…',
          description: 'Fetching projects',
          link: '',
          type: 'project' as const,
        },
      ]

    return activeProjects.map((project, index) => {
      // Orbital radii - stagger them out from the sun
      const orbitRadius = 5 + (index * 1.5)

      // Initial angle for spacing
      const angle = (index / Math.max(activeProjects.length, 1)) * Math.PI * 2

      // Slight vertical variance for visual interest
      const heightVariance = ((index % 3) - 1) * 0.4

      const basePosition: [number, number, number] = [
        Math.cos(angle) * orbitRadius,
        heightVariance,
        Math.sin(angle) * orbitRadius,
      ]

      return {
        project,
        basePosition,
        orbitRadius,
        orbitSpeed: 0.05 + (index % 3) * 0.02, // Slower, varied speeds
      }
    })
  }, [projects])

  return (
    <group ref={sceneRef}>
      {/* Central Sun */}
      <Sun name="Portfolio" />

      {/* Project Planets */}
      {planetConfigs.map(({ project, basePosition }, index) => (
        <ProjectCard
          key={`${project.title}-${index}`}
          project={project}
          basePosition={basePosition}
          floatSpeed={0.3} // Reduced floating
          rotationSpeed={0.2} // Slower rotation
        />
      ))}

      {/* Social Planet - outermost orbit */}
      <SocialIcons socials={socials} position={[0, 0, 12]} />
    </group>
  )
}

export default Scene
