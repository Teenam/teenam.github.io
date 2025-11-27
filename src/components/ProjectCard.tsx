import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Mesh, Vector3 } from 'three'
import { Text, Box } from '@react-three/drei'
import type { Project } from '../types/config'

interface ProjectCardProps {
  project: Project
  position: [number, number, number]
  rotation: [number, number, number]
}

function ProjectCard({ project, position, rotation }: ProjectCardProps) {
  const meshRef = useRef<Mesh>(null)
  const [hovered, setHovered] = useState(false)
  const [clicked, setClicked] = useState(false)

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime
      meshRef.current.position.y = position[1] + Math.sin(time + position[0]) * 0.1
      
      if (hovered) {
        meshRef.current.scale.lerp(new Vector3(1.1, 1.1, 1.1), 0.1)
      } else {
        meshRef.current.scale.lerp(new Vector3(1, 1, 1), 0.1)
      }
    }
  })

  const handleClick = () => {
    if (project.link) {
      window.open(project.link, '_blank', 'noopener,noreferrer')
      setClicked(true)
      setTimeout(() => setClicked(false), 300)
    }
  }

  return (
    <group position={position} rotation={rotation}>
      <mesh
        ref={meshRef}
        onClick={handleClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        castShadow
        receiveShadow
      >
        <Box args={[3, 2, 0.2]}>
          <meshStandardMaterial
            color={hovered ? '#8b5cf6' : '#6366f1'}
            metalness={0.3}
            roughness={0.4}
            emissive={hovered ? '#4f46e5' : '#000000'}
            emissiveIntensity={hovered ? 0.2 : 0}
          />
        </Box>
      </mesh>
      
      <Text
        position={[0, 0.5, 0.15]}
        fontSize={0.3}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        maxWidth={2.5}
      >
        {project.title}
      </Text>
      
      <Text
        position={[0, -0.2, 0.15]}
        fontSize={0.15}
        color="#e5e7eb"
        anchorX="center"
        anchorY="middle"
        maxWidth={2.5}
      >
        {project.description}
      </Text>
      
      {project.link && (
        <Text
          position={[0, -0.8, 0.15]}
          fontSize={0.2}
          color={hovered ? '#fbbf24' : '#ffffff'}
          anchorX="center"
          anchorY="middle"
        >
          {project.type === 'website' ? 'Visit Website →' : 'View Project →'}
        </Text>
      )}
    </group>
  )
}

export default ProjectCard

