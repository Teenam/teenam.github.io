import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Mesh } from 'three'
import { Text } from '@react-three/drei'

interface SunProps {
    name?: string
}

function Sun({ name = 'Portfolio' }: SunProps) {
    const meshRef = useRef<Mesh>(null)

    useFrame((state) => {
        if (!meshRef.current) return
        // Pulsating effect
        const pulse = 1 + Math.sin(state.clock.elapsedTime * 0.5) * 0.05
        meshRef.current.scale.setScalar(pulse)

        // Slow rotation
        meshRef.current.rotation.y += 0.002
    })

    return (
        <group>
            <mesh ref={meshRef}>
                <sphereGeometry args={[1.5, 64, 64]} />
                <meshStandardMaterial
                    color="#FDB813"
                    emissive="#FF6B00"
                    emissiveIntensity={1.5}
                    roughness={0.4}
                    metalness={0.3}
                />
            </mesh>

            {/* Outer glow */}
            <mesh scale={1.2}>
                <sphereGeometry args={[1.5, 32, 32]} />
                <meshStandardMaterial
                    color="#FFD700"
                    emissive="#FFA500"
                    emissiveIntensity={0.8}
                    transparent
                    opacity={0.3}
                    roughness={1}
                />
            </mesh>

            {/* Name text orbiting */}
            <group rotation={[0, 0, Math.PI / 6]}>
                <Text
                    position={[0, 2.2, 0]}
                    fontSize={0.35}
                    color="#FFFFFF"
                    anchorX="center"
                    anchorY="middle"
                    fontWeight="bold"
                >
                    {name}
                </Text>
            </group>

            {/* Point light to illuminate other objects */}
            <pointLight position={[0, 0, 0]} intensity={2} distance={50} color="#FFD700" />
        </group>
    )
}

export default Sun
