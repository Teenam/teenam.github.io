interface OrbitRingsProps {
    orbits: number[]
}

function OrbitRings({ orbits }: OrbitRingsProps) {
    return (
        <group rotation={[Math.PI / 2, 0, 0]}>
            {orbits.map((radius, index) => (
                <mesh key={index} rotation={[0, 0, 0]}>
                    <torusGeometry args={[radius, 0.02, 8, 64]} />
                    <meshBasicMaterial
                        color="#ffffff"
                        transparent
                        opacity={0.15}
                        depthWrite={false}
                    />
                </mesh>
            ))}
        </group>
    )
}

export default OrbitRings
