import React, { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";

/* Particles that stream past the camera = travelling through space */
function WarpStreaks({ count = 1800 }) {
  const ref = useRef();
  const data = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const speeds = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      positions[i * 3 + 0] = (Math.random() - 0.5) * 12;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 12;
      positions[i * 3 + 2] = -Math.random() * 30;
      speeds[i] = 0.06 + Math.random() * 0.16;
    }
    return { positions, speeds };
  }, [count]);

  useFrame(() => {
    if (!ref.current) return;
    const pos = ref.current.geometry.attributes.position.array;
    for (let i = 0; i < count; i++) {
      pos[i * 3 + 2] += data.speeds[i] * 3;
      if (pos[i * 3 + 2] > 6) {
        pos[i * 3 + 2] = -30;
        pos[i * 3 + 0] = (Math.random() - 0.5) * 12;
        pos[i * 3 + 1] = (Math.random() - 0.5) * 12;
      }
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
    ref.current.rotation.z += 0.001;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={data.positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.06} color="#4df0c8" sizeAttenuation transparent opacity={0.85} depthWrite={false} />
    </points>
  );
}

export default function WarpTunnel() {
  return (
    <Canvas camera={{ position: [0, 0, 6], fov: 70 }} dpr={[1, 2]}>
      <Suspense fallback={null}>
        <WarpStreaks />
      </Suspense>
    </Canvas>
  );
}
