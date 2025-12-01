import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import { Group } from 'three'
import type { Config } from '../types/config'

interface SocialIconMoonProps {
    url: string
    orbitRadius: number
    orbitSpeed: number
    initialAngle: number
    color?: string
    name: string
}

function SocialIconMoon({ url, orbitRadius, orbitSpeed, initialAngle, color = '#60a5fa', name }: SocialIconMoonProps) {
    const [hovered, setHovered] = useState(false)
    const moonRef = useRef<Group>(null)

    useFrame((state) => {
        if (!moonRef.current) return
        const angle = initialAngle + state.clock.elapsedTime * orbitSpeed
        moonRef.current.position.x = Math.cos(angle) * orbitRadius
        moonRef.current.position.z = Math.sin(angle) * orbitRadius
        moonRef.current.rotation.y += 0.01
    })

    return (
        <group
            ref={moonRef}
            onClick={(e) => {
                e.stopPropagation()
                window.open(url, '_blank')
            }}
            onPointerOver={() => {
                document.body.style.cursor = 'pointer'
                setHovered(true)
            }}
            onPointerOut={() => {
                document.body.style.cursor = 'auto'
                setHovered(false)
            }}
        >
            {/* Moon body */}
            <mesh scale={hovered ? 0.3 : 0.25}>
                <sphereGeometry args={[1, 16, 16]} />
                <meshStandardMaterial
                    color={hovered ? '#ffffff' : color}
                    roughness={0.5}
                    metalness={0.6}
                    emissive={hovered ? color : '#000000'}
                    emissiveIntensity={hovered ? 0.5 : 0}
                />
            </mesh>

            {/* Moon label */}
            {hovered && (
                <Text
                    position={[0, 0.5, 0]}
                    fontSize={0.15}
                    color="#ffffff"
                    anchorX="center"
                    anchorY="middle"
                >
                    {name}
                </Text>
            )}
        </group>
    )
}

interface SocialIconsProps {
    socials: Config['footer']['socials']
    position?: [number, number, number]
}

export default function SocialIcons({ socials, position = [0, 0, 12] }: SocialIconsProps) {
    const planetRef = useRef<Group>(null)

    useFrame(() => {
        if (!planetRef.current) return
        planetRef.current.rotation.y += 0.003
    })

    const moonColors: Record<string, string> = {
        github: '#333333',
        linkedin: '#0077B5',
        twitter: '#1DA1F2',
        email: '#EA4335',
        instagram: '#E4405F',
        youtube: '#FF0000',
    }

    return (
        <group position={position}>
            {/* Social Planet */}
            <group ref={planetRef}>
                <mesh>
                    <sphereGeometry args={[1.2, 32, 32]} />
                    <meshStandardMaterial
                        color="#8B5CF6"
                        roughness={0.4}
                        metalness={0.3}
                        emissive="#6D28D9"
                        emissiveIntensity={0.3}
                    />
                </mesh>

                {/* "Social" text on planet surface */}
                <Text
                    position={[0, 0, 1.21]}
                    fontSize={0.35}
                    color="#ffffff"
                    anchorX="center"
                    anchorY="middle"
                    fontWeight="bold"
                >
                    Social
                </Text>
            </group>

            {/* Social Icons as Moons */}
            {socials.map((social, index) => (
                <SocialIconMoon
                    key={social.name}
                    url={social.url}
                    name={social.name}
                    orbitRadius={2 + (index * 0.3)}
                    orbitSpeed={0.3 - (index * 0.05)}
                    initialAngle={(index / socials.length) * Math.PI * 2}
                    color={moonColors[social.icon.toLowerCase()] || '#60a5fa'}
                />
            ))}
        </group>
    )
}
