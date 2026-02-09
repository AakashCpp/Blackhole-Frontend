import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, useGLTF } from "@react-three/drei";
import { Suspense } from "react";

export default function BlackholeScene() {
  // load model
  const Blackhole = () => {
    const { scene } = useGLTF("/models/blackhole.glb");
    return <primitive object={scene} scale={0.8} position={[0, 0, 0]} />;
  };

  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [0, 2, 6], fov: 45 }}>
        {/* lights */}
        <ambientLight intensity={0.35} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} />

        {/* environment light */}
        <Environment preset="night" />

        {/* model */}
        <Suspense fallback={null}>
          <Blackhole />
        </Suspense>

        {/* controls */}
        <OrbitControls autoRotate autoRotateSpeed={1.5} enableZoom={true} />
      </Canvas>
    </div>
  );
}
