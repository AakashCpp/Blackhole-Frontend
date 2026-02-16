import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Text, Environment } from "@react-three/drei";
import { useRef } from "react";

function CylinderScene() {
  const groupRef = useRef();

  // ✅ allowed here
  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.004;
    }
  });

  const labels = ["SCAN", "AI CORE", "SECURE", "ANALYZE", "MONITOR", "Detect"];
  const radius = 2;

  return (
    <>
      {/* lights */}
      <ambientLight intensity={0.6} />
      <directionalLight position={[4, 6, 4]} intensity={1.2} />

      <group ref={groupRef}>
        {/* CYLINDER */}
        <mesh>
          <cylinderGeometry args={[1, 1, 1, 64, 1, true]} />
          <meshStandardMaterial
            color="#0a0a0a"
            metalness={0.9}
            roughness={0.25}
          />
        </mesh>

        {/* TEXT AROUND CYLINDER */}
        {labels.map((label, i) => {
          const angle = (i / labels.length) * Math.PI * 2;

          return (
            <Text
              key={i}
              position={[
                Math.sin(angle) * (radius + 0.12), // 👈 little outside cylinder
                0,
                Math.cos(angle) * (radius + 0.12),
              ]}
              rotation={[0, angle + Math.PI, 0]}
              fontSize={0.32}
              anchorX="center"
              anchorY="middle"
            >
              {label}
              <meshStandardMaterial
                color="#ff9f1c"
                emissive="#ff9f1c"
                emissiveIntensity={1.4}
              />
            </Text>
          );
        })}
      </group>

      <OrbitControls enableZoom />
    </>
  );
}

export default function RotatingCylinder() {
  return (
    <div className="h-full w-full">
      <Canvas camera={{ position: [0, 1.6, 2], fov: 60 }}>
        <Environment
          files="/env/ferndale_studio_09_2k.hdr"
          intensity={0.7}
          background={false}
        />
        <CylinderScene />
      </Canvas>
    </div>
  );
}
