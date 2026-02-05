import { Canvas } from "@react-three/fiber";
import { useGLTF, OrbitControls, Center } from "@react-three/drei";
import { Suspense, useEffect } from "react";
import * as THREE from "three";

function Mask() {
  const { scene } = useGLTF("/models/hacker_mask.glb");

  useEffect(() => {
    scene.traverse((obj) => {
      if (obj.isMesh) {
        // Neutral physical material (realistic)
        obj.material = new THREE.MeshStandardMaterial({
          color: "#e5e7eb", // soft gray
          metalness: 0.15,
          roughness: 0.6,
        });
        obj.castShadow = true;
        obj.receiveShadow = true;
      }
    });
  }, [scene]);

  return (
    <Center>
      <primitive object={scene} scale={0.9} position={[0, -0.5, 0]} />
    </Center>
  );
}

const HackerMask3D = () => {
  return (
    <Canvas
      shadows
      camera={{ position: [0, 0, 6.5], fov: 40 }}
      style={{ width: "100%", height: "100%" }}
    >
      {/* Ambient sky light */}
      <ambientLight intensity={0.4} />

      {/* Sun / Key light */}
      <directionalLight
        position={[4, 6, 4]}
        intensity={2.2}
        color="#e5e7eb"
        castShadow
      />

      {/* Fill light (soft bounce) */}
      <directionalLight position={[-4, 2, 3]} intensity={0.8} />

      {/* Rim / separation */}
      <directionalLight position={[0, 3, -5]} intensity={0.2} />

      <Suspense fallback={null}>
        <Mask />
      </Suspense>

      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={20} />
    </Canvas>
  );
};

export default HackerMask3D;
