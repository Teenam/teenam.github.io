import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Group } from 'three'
import ProjectCard from './ProjectCard'
import type { Config } from '../types/config'

interface SceneProps {
  config: Config
}

function Scene({ config }: SceneProps) {
  const groupRef = useRef<Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.1
    }
  })

  const projects = config.projects
  const radius = 8
  const angleStep = (Math.PI * 2) / projects.length

  return (
    <group ref={groupRef}>
      {projects.map((project, index) => {
        const angle = index * angleStep - Math.PI / 2
        const x = Math.cos(angle) * radius
        const z = Math.sin(angle) * radius
        const y = Math.sin(index * 0.5) * 2

        return (
          <ProjectCard
            key={index}
            project={project}
            position={[x, y, z]}
            rotation={[0, angle + Math.PI / 2, 0]}
          />
        )
      })}
    </group>
  )
}

export default Scene

