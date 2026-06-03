import React, { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";

function Stars({ count = 2600 }) {
  const ref = useRef();
  const { viewport } = useThree();

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // distribute in a deep sphere shell
      const r = 4 + Math.random() * 14;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3 + 0] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, [count]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (!ref.current) return;
    ref.current.rotation.y = t * 0.02;
    ref.current.rotation.x = Math.sin(t * 0.05) * 0.1;
    // subtle parallax toward pointer
    ref.current.rotation.y += (state.pointer.x * viewport.width) / 400;
    ref.current.rotation.x += -(state.pointer.y * viewport.height) / 400;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.045} color="#eef2ff" sizeAttenuation transparent opacity={0.9} depthWrite={false} />
    </points>
  );
}

/* Innovation core — a glowing wireframe icosahedron, the "idea" at the centre */
function InnovationCore() {
  const mesh = useRef();
  const ring = useRef();
  useFrame((_, delta) => {
    if (mesh.current) {
      mesh.current.rotation.y += delta * 0.25;
      mesh.current.rotation.x += delta * 0.12;
    }
    if (ring.current) ring.current.rotation.z += delta * 0.4;
  });
  return (
    <group>
      <mesh ref={mesh}>
        <icosahedronGeometry args={[1.7, 1]} />
        <meshBasicMaterial color="#4df0c8" wireframe transparent opacity={0.55} />
      </mesh>
      <mesh ref={ring} rotation={[Math.PI / 2.4, 0, 0]}>
        <torusGeometry args={[2.8, 0.012, 8, 120]} />
        <meshBasicMaterial color="#7c5cff" transparent opacity={0.6} />
      </mesh>
    </group>
  );
}

export default function CosmicField({ warp = false }) {
  return (
    <Canvas camera={{ position: [0, 0, 7], fov: 62 }} dpr={[1, 2]}>
      <Suspense fallback={null}>
        <Stars count={warp ? 3200 : 2400} />
        {!warp && <InnovationCore />}
      </Suspense>
    </Canvas>
  );
}
