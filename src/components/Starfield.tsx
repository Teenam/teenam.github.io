import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { InstancedMesh, Object3D, Vector3 } from 'three'

function Starfield() {
    const meshRef = useRef<InstancedMesh>(null)
    const count = 1500

    const dummy = useMemo(() => new Object3D(), [])

    // Generate random star positions once
    const stars = useMemo(() => {
        const temp = []
        for (let i = 0; i < count; i++) {
            const radius = 40 + Math.random() * 60
            const theta = Math.random() * Math.PI * 2
            const phi = Math.acos(2 * Math.random() - 1)

            const x = radius * Math.sin(phi) * Math.cos(theta)
            const y = radius * Math.sin(phi) * Math.sin(theta)
            const z = radius * Math.cos(phi)

            const size = 0.05 + Math.random() * 0.15
            const twinkleSpeed = 0.5 + Math.random() * 1.5
            const twinkleOffset = Math.random() * Math.PI * 2

            temp.push({ position: new Vector3(x, y, z), size, twinkleSpeed, twinkleOffset })
        }
        return temp
    }, [])

    // Initialize instances
    useMemo(() => {
        if (!meshRef.current) return

        stars.forEach((star, i) => {
            dummy.position.copy(star.position)
            dummy.scale.setScalar(star.size)
            dummy.updateMatrix()
            meshRef.current!.setMatrixAt(i, dummy.matrix)
        })
        meshRef.current.instanceMatrix.needsUpdate = true
    }, [stars, dummy])

    // Twinkle animation
    useFrame((state) => {
        if (!meshRef.current) return

        stars.forEach((star, i) => {
            const twinkle = 0.7 + Math.sin(state.clock.elapsedTime * star.twinkleSpeed + star.twinkleOffset) * 0.3
            dummy.position.copy(star.position)
            dummy.scale.setScalar(star.size * twinkle)
            dummy.updateMatrix()
            meshRef.current!.setMatrixAt(i, dummy.matrix)
        })
        meshRef.current.instanceMatrix.needsUpdate = true
    })

    return (
        <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
            <sphereGeometry args={[1, 8, 8]} />
            <meshBasicMaterial color="#ffffff" />
        </instancedMesh>
    )
}

export default Starfield
