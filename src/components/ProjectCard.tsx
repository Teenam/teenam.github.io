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

  // Planetary features - randomly assigned
  const features = useMemo(() => ({
    hasRings: Math.random() > 0.6,
    hasStorm: Math.random() > 0.7,
    hasAtmosphere: Math.random() > 0.5,
    ringTilt: Math.random() * Math.PI / 4,
    ringColor: ['#fbbf24', '#60a5fa', '#c084fc'][Math.floor(Math.random() * 3)],
    stormColor: ['#ff6b6b', '#4ecdc4', '#ffe66d'][Math.floor(Math.random() * 3)],
  }), [])

  useFrame((state) => {
    if (!groupRef.current) return
    const time = state.clock.elapsedTime + noiseOffset

    const floatX = Math.sin(time * floatSpeed * 0.6) * 0.3
    const floatY = Math.cos(time * floatSpeed * 0.8) * 0.25
    const floatZ = Math.sin(time * floatSpeed * 0.4) * 0.3

    groupRef.current.position.set(
      basePosition[0] + floatX,
      basePosition[1] + floatY,
      basePosition[2] + floatZ,
    )

    groupRef.current.rotation.y += rotationSpeed * 0.01
    groupRef.current.rotation.x = Math.sin(time * rotationSpeed * 0.3) * 0.1

    if (meshRef.current) {
      const targetScale = hovered ? 1.15 : 1
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
      {/* Main Planet Body */}
      <mesh
        ref={meshRef}
        onClick={handleClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        castShadow
        receiveShadow
      >
        <sphereGeometry args={[0.6, 32, 32]} />
        <meshStandardMaterial
          color={hovered ? '#ffffff' : colors.base}
          metalness={0.15}
          roughness={0.35}
          emissive={hovered ? colors.emissive : '#1e1b4b'}
          emissiveIntensity={hovered ? 0.8 : 0.25}
        />
      </mesh>

      {/* Title on planet surface */}
      <Text
        position={[0, 0, 0.61]}
        fontSize={0.15}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        maxWidth={1}
        fontWeight="bold"
      >
        {project.title}
      </Text>

      {/* Saturn-style Rings */}
      {features.hasRings && (
        <mesh rotation={[Math.PI / 2 + features.ringTilt, 0, 0]}>
          <torusGeometry args={[0.9, 0.15, 8, 32]} />
          <meshStandardMaterial
            color={features.ringColor}
            transparent
            opacity={0.6}
            metalness={0.5}
            roughness={0.4}
          />
        </mesh>
      )}

      {/* Jupiter-style Storm */}
      {features.hasStorm && (
        <mesh position={[0.3, 0.2, 0.5]}>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshStandardMaterial
            color={features.stormColor}
            emissive={features.stormColor}
            emissiveIntensity={0.3}
          />
        </mesh>
      )}

      {/* Atmosphere Glow */}
      {features.hasAtmosphere && (
        <mesh scale={1.15}>
          <sphereGeometry args={[0.6, 16, 16]} />
          <meshStandardMaterial
            color={colors.base}
            transparent
            opacity={0.2}
            depthWrite={false}
          />
        </mesh>
      )}

      {/* Description Billboard (on hover) */}
      <Billboard follow position={[0, -0.9, 0]}>
        <Text
          fontSize={0.12}
          color="#e5e7eb"
          anchorX="center"
          anchorY="middle"
          maxWidth={1.5}
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

