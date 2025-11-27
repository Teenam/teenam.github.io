import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Group } from 'three'
import ProjectCard from './ProjectCard'
import type { Config } from '../types/config'

interface SceneProps {
  config: Config
}

function Scene({ config }: SceneProps) {
  const swarmRef = useRef<Group>(null)

  useFrame((state) => {
    if (!swarmRef.current) return
    const t = state.clock.elapsedTime * 0.05
    swarmRef.current.rotation.y = Math.sin(t) * 0.2
    swarmRef.current.rotation.x = Math.cos(t * 0.7) * 0.05
  })

  const cubeConfigs = useMemo(() => {
    const projects = config.projects

    return projects.map((project, index) => {
      const angle = (index / Math.max(projects.length, 1)) * Math.PI * 2
      const radius = 3.5 + (index % 4)
      const heightVariance = ((index % 5) - 2) * 0.8

      const basePosition: [number, number, number] = [
        Math.cos(angle) * radius,
        heightVariance,
        Math.sin(angle) * radius,
      ]

      return {
        project,
        basePosition,
        floatSpeed: 0.6 + (index % 5) * 0.15,
        rotationSpeed: 0.3 + (index % 4) * 0.08,
      }
    })
  }, [config.projects])

  return (
    <group ref={swarmRef}>
      {cubeConfigs.map(({ project, basePosition, floatSpeed, rotationSpeed }, index) => (
        <ProjectCard
          key={`${project.title}-${index}`}
          project={project}
          basePosition={basePosition}
          floatSpeed={floatSpeed}
          rotationSpeed={rotationSpeed}
        />
      ))}
    </group>
  )
}

export default Scene

