import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Group, Vector3 } from 'three'

interface SpaceshipsProps {
    planetPositions: Vector3[]
}

function Spaceships({ planetPositions }: SpaceshipsProps) {
    const ship1Ref = useRef<Group>(null)
    const ship2Ref = useRef<Group>(null)
    const ship3Ref = useRef<Group>(null)

    const shipData = useMemo(() => [
        { ref: ship1Ref, color: '#00ff88', speed: 0.3, startPlanet: 0, endPlanet: 1 },
        { ref: ship2Ref, color: '#ff3366', speed: 0.25, startPlanet: 2, endPlanet: 3 },
        { ref: ship3Ref, color: '#3388ff', speed: 0.35, startPlanet: 1, endPlanet: 4 },
    ], [])

    useFrame((state) => {
        if (planetPositions.length < 2) return

        shipData.forEach((ship) => {
            if (!ship.ref.current) return

            const start = planetPositions[ship.startPlanet % planetPositions.length]
            const end = planetPositions[ship.endPlanet % planetPositions.length]

            if (!start || !end) return

            const t = (Math.sin(state.clock.elapsedTime * ship.speed) + 1) / 2

            ship.ref.current.position.lerpVectors(start, end, t)

            // Look at target
            ship.ref.current.lookAt(end)
        })
    })

    return (
        <>
            {shipData.map((ship, index) => (
                <group key={index} ref={ship.ref}>
                    {/* Simple spaceship shape: cone body + fins */}
                    <mesh rotation={[0, Math.PI / 2, 0]} scale={0.3}>
                        <coneGeometry args={[0.3, 1, 4]} />
                        <meshStandardMaterial
                            color={ship.color}
                            emissive={ship.color}
                            emissiveIntensity={0.5}
                            metalness={0.8}
                            roughness={0.2}
                        />
                    </mesh>
                    {/* Engine glow */}
                    <pointLight position={[-0.3, 0, 0]} color={ship.color} intensity={1} distance={2} />
                </group>
            ))}
        </>
    )
}

export default Spaceships
