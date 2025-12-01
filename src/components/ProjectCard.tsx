import { useMemo, useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Mesh, Group } from 'three'
import { Text, Billboard } from '@react-three/drei'
import type { Project } from '../types/config'

interface ProjectCardProps {
  project: Project
  basePosition: [number, number, number]
  floatSpeed: number
  rotationSpeed: number
}

function ProjectCard({ project, basePosition, floatSpeed, rotationSpeed }: ProjectCardProps) {
  const groupRef = useRef<Group>(null)
  const meshRef = useRef<Mesh>(null)
  const [hovered, setHovered] = useState(false)
  const noiseOffset = useMemo(() => Math.random() * 10, [])
  const shape = useMemo(
    () => {
      const options = ['cube', 'icosa', 'torus', 'octa', 'sphere', 'cone'] as const
      return options[Math.floor(Math.random() * options.length)]
    },
    []
  )
  const colors = useMemo(() => {
    const palettes = [
      { base: '#fbbf24', emissive: '#f59e0b' },
      { base: '#34d399', emissive: '#10b981' },
      { base: '#60a5fa', emissive: '#3b82f6' },
      { base: '#c084fc', emissive: '#a855f7' },
      { base: '#f472b6', emissive: '#ec4899' },
    ]
    return palettes[Math.floor(Math.random() * palettes.length)]
  }, [])

  useFrame((state) => {
    if (!groupRef.current) return
    const time = state.clock.elapsedTime + noiseOffset

    const floatX = Math.sin(time * floatSpeed * 0.6) * 0.6
    const floatY = Math.cos(time * floatSpeed * 0.8) * 0.5
    const floatZ = Math.sin(time * floatSpeed * 0.4) * 0.6

    groupRef.current.position.set(
      basePosition[0] + floatX,
      basePosition[1] + floatY,
      basePosition[2] + floatZ,
    )

    groupRef.current.rotation.y += rotationSpeed * 0.01
    groupRef.current.rotation.x = Math.sin(time * rotationSpeed * 0.3) * 0.2

    if (meshRef.current) {
      const targetScale = hovered ? 1.2 : 1
      const damping = 0.1
      meshRef.current.scale.x += (targetScale - meshRef.current.scale.x) * damping
      meshRef.current.scale.y += (targetScale - meshRef.current.scale.y) * damping
      meshRef.current.scale.z += (targetScale - meshRef.current.scale.z) * damping
    }
  })

  const handleClick = () => {
    if (project.link) {
      window.open(project.link, '_blank', 'noopener,noreferrer')
    }
  }

  return (
    <group ref={groupRef}>
      <mesh
        ref={meshRef}
        onClick={handleClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        castShadow
        receiveShadow
      >
        {shape === 'cube' && <boxGeometry args={[1.2, 1.2, 1.2]} />}
        {shape === 'icosa' && <icosahedronGeometry args={[1.05, 0]} />}
        {shape === 'torus' && <torusGeometry args={[0.8, 0.25, 32, 64]} />}
        {shape === 'octa' && <octahedronGeometry args={[1, 0]} />}
        {shape === 'sphere' && <sphereGeometry args={[1, 32, 32]} />}
        {shape === 'cone' && <coneGeometry args={[0.9, 1.4, 32]} />}

        <meshStandardMaterial
          color={hovered ? '#ffffff' : colors.base}
          metalness={0.15}
          roughness={0.35}
          emissive={hovered ? colors.emissive : '#1e1b4b'}
          emissiveIntensity={hovered ? 0.8 : 0.25}
        />
      </mesh>

      <Billboard follow position={[0, 1.4, 0]}>
        <Text
          fontSize={0.28}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          maxWidth={2}
          renderOrder={1}
          material-depthTest={true}
          material-depthWrite={false}
        >
          {project.title}
        </Text>
      </Billboard>

      <Billboard follow position={[0, -1.1, 0]}>
        <Text
          fontSize={0.18}
          color="#e5e7eb"
          anchorX="center"
          anchorY="middle"
          maxWidth={2.4}
          renderOrder={1}
          material-depthTest={true}
          material-depthWrite={false}
        >
          {hovered ? (project.type === 'website' ? 'Click to view site' : 'Click to view project') : project.description}
        </Text>
      </Billboard>
    </group>
  )
}

export default ProjectCard

