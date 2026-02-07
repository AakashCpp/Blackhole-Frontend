import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Environment } from "@react-three/drei";
import { Suspense } from "react";

function Helmet() {
  const { scene } = useGLTF("/models/game_ready_scifi_helmet.glb");

  return <primitive object={scene} scale={0.01} position={[0, -0.3, 0]} />;
}

export default function HelmetScene() {
  return (
    <Canvas camera={{ position: [0, 0, 3.5], fov: 40 }}>
      {/* Lights */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[3, 4, 5]} intensity={1.2} />

      <Environment
        files="/env/ferndale_studio_09_2k.hdr"
        intensity={0.7}
        background={false}
      />

      {/* Suspense is REQUIRED */}
      <Suspense fallback={null}>
        <Helmet />
      </Suspense>

      <OrbitControls
        autoRotate
        autoRotateSpeed={1.2}
        enableZoom={false}
        enablePan={false}
      />
    </Canvas>
  );
}
