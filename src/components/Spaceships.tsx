import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Group, Vector3, BufferGeometry, Float32BufferAttribute } from 'three'
import { Points } from '@react-three/drei'

interface SpaceshipsProps {
    planetPositions: Vector3[]
}

function Spaceships({ planetPositions }: SpaceshipsProps) {
    const ship1Ref = useRef<Group>(null)
    const ship2Ref = useRef<Group>(null)
    const ship3Ref = useRef<Group>(null)

    const particles1Ref = useRef<any>(null)
    const particles2Ref = useRef<any>(null)
    const particles3Ref = useRef<any>(null)

    const shipData = useMemo(() => [
        { ref: ship1Ref, particlesRef: particles1Ref, color: '#00ff88', speed: 0.3, startPlanet: 0, endPlanet: 1 },
        { ref: ship2Ref, particlesRef: particles2Ref, color: '#ff3366', speed: 0.25, startPlanet: 2, endPlanet: 3 },
        { ref: ship3Ref, particlesRef: particles3Ref, color: '#3388ff', speed: 0.35, startPlanet: 1, endPlanet: 4 },
    ], [])

    // Particle trail data
    const particleGeometries = useMemo(() => {
        return shipData.map(() => {
            const count = 20
            const positions = new Float32Array(count * 3)
            const geometry = new BufferGeometry()
            geometry.setAttribute('position', new Float32BufferAttribute(positions, 3))
            return { geometry, count, trail: Array(count).fill(new Vector3()) }
        })
    }, [shipData])

    useFrame((state) => {
        if (planetPositions.length < 2) return

        shipData.forEach((ship, shipIndex) => {
            if (!ship.ref.current) return

            const start = planetPositions[ship.startPlanet % planetPositions.length]
            const end = planetPositions[ship.endPlanet % planetPositions.length]

            if (!start || !end) return

            // Progress along journey (0 to 1)
            const rawT = (Math.sin(state.clock.elapsedTime * ship.speed) + 1) / 2

            // Check if direct path crosses near sun (origin)
            const midpoint = new Vector3().lerpVectors(start, end, 0.5)
            const distanceToSun = midpoint.length()
            const sunAvoidanceThreshold = 3.0 // Increased threshold

            let position: Vector3

            if (distanceToSun < sunAvoidanceThreshold) {
                // Arc path to avoid sun
                let normal = new Vector3().crossVectors(start, end)

                // Handle collinear vectors (opposite sides of sun)
                if (normal.lengthSq() < 0.001) {
                    // Pick arbitrary perpendicular vector
                    normal = Math.abs(start.y) < 0.9 * start.length()
                        ? new Vector3(0, 1, 0)
                        : new Vector3(1, 0, 0)
                }

                normal.normalize()

                // Increase offset to ensure we clear the sun (radius 1.5)
                // Curve passes at 0.5 * offset_height at midpoint
                // We want clearance of ~3.0, so offset needs to be ~6.0
                const offset = normal.multiplyScalar(6)
                const waypoint = midpoint.clone().add(offset)

                // Quadratic bezier curve
                if (rawT < 0.5) {
                    const t = rawT * 2
                    position = new Vector3()
                        .copy(start).multiplyScalar((1 - t) * (1 - t))
                        .add(waypoint.clone().multiplyScalar(2 * (1 - t) * t))
                } else {
                    const t = (rawT - 0.5) * 2
                    position = new Vector3()
                        .copy(waypoint).multiplyScalar((1 - t) * (1 - t))
                        .add(end.clone().multiplyScalar(2 * (1 - t) * t))
                }
            } else {
                // Direct path
                position = new Vector3().lerpVectors(start, end, rawT)
            }

            ship.ref.current.position.copy(position)

            // Scale transition: small at planets, large in between
            const scaleT = Math.sin(rawT * Math.PI) // 0 at start/end, 1 at middle
            const scale = 0.15 + scaleT * 0.25 // Min scale 0.15 to avoid disappearing
            ship.ref.current.scale.setScalar(scale)

            // Look at target
            ship.ref.current.lookAt(end)

            // Update particle trail
            const particleData = particleGeometries[shipIndex]
            particleData.trail.unshift(position.clone())
            particleData.trail.pop()

            const positions = particleData.geometry.attributes.position.array as Float32Array
            particleData.trail.forEach((pos, i) => {
                positions[i * 3] = pos.x
                positions[i * 3 + 1] = pos.y
                positions[i * 3 + 2] = pos.z
            })
            particleData.geometry.attributes.position.needsUpdate = true
        })
    })

    return (
        <>
            {shipData.map((ship, index) => (
                <group key={index}>
                    {/* Ship */}
                    <group ref={ship.ref}>
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
                        <pointLight position={[-0.3, 0, 0]} color={ship.color} intensity={1} distance={2} />
                    </group>

                    {/* Thruster particles */}
                    <Points
                        ref={ship.particlesRef}
                        positions={particleGeometries[index].geometry.attributes.position.array as Float32Array}
                    >
                        <pointsMaterial
                            size={0.05}
                            color={ship.color}
                            transparent
                            opacity={0.6}
                            sizeAttenuation
                        />
                    </Points>
                </group>
            ))}
        </>
    )
}

export default Spaceships
