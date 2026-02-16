import { useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import ThreeGlobe from "three-globe";

/* ================= GLOBE ================= */
function CyberGlobe() {
  const groupRef = useRef();
  const globeRef = useRef();
  const cloudRef = useRef();
  const fresnelRef = useRef();

  useEffect(() => {
    const loader = new THREE.TextureLoader();

    const dayMap = loader.load("/textures/Earth-day.jpg");
    const nightMap = loader.load("/textures/Earth-night.jpg");
    const bumpMap = loader.load("/textures/earth-normal.jpg");

    const globe = new ThreeGlobe();

    const mat = globe.globeMaterial();
    mat.map = dayMap;
    mat.bumpMap = bumpMap;
    mat.bumpScale = 8;
    mat.emissiveMap = nightMap;
    mat.emissive = new THREE.Color("#ffffff");
    mat.emissiveIntensity = 1.2;

    globe
      .showAtmosphere(true)
      .atmosphereColor("#00f5d4")
      .atmosphereAltitude(0.2)
      .pointsData([
        { lat: 22.7196, lng: 75.8577, size: 0.35 },
        { lat: 40.7128, lng: -74.006, size: 0.3 },
        { lat: 51.5072, lng: -0.1276, size: 0.3 },
      ])
      .pointLat("lat")
      .pointLng("lng")
      .pointRadius("size")
      .pointAltitude(0.08)
      .pointColor(() => "#ff9f1c");

    globe.scale.set(1.3, 1.3, 1.3);

    // 🔑 FORCE VISIBILITY
    globe.traverse((o) => {
      o.visible = true;
      if (o.material) o.material.needsUpdate = true;
    });

    globeRef.current = globe;
  }, []);

  /* CLOUDS */
  useEffect(() => {
    const tex = new THREE.TextureLoader().load("/textures/earth-clouds.png");

    cloudRef.current = new THREE.Mesh(
      new THREE.SphereGeometry(1.34, 64, 64),
      new THREE.MeshPhongMaterial({
        map: tex,
        transparent: true,
        opacity: 0.75,
        depthWrite: false,
      }),
    );
  }, []);

  /* FRESNEL */
  useEffect(() => {
    fresnelRef.current = new THREE.Mesh(
      new THREE.SphereGeometry(1.38, 64, 64),
      new THREE.ShaderMaterial({
        uniforms: { color: { value: new THREE.Color("#00f5d4") } },
        vertexShader: `
          varying vec3 vNormal;
          varying vec3 vViewDir;
          void main() {
            vNormal = normalize(normalMatrix * normal);
            vec4 mv = modelViewMatrix * vec4(position, 1.0);
            vViewDir = normalize(-mv.xyz);
            gl_Position = projectionMatrix * mv;
          }
        `,
        fragmentShader: `
          uniform vec3 color;
          varying vec3 vNormal;
          varying vec3 vViewDir;
          void main() {
            float f = pow(1.0 - dot(vNormal, vViewDir), 3.0);
            gl_FragColor = vec4(color, f * 0.8);
          }
        `,
        transparent: true,
        blending: THREE.AdditiveBlending,
      }),
    );
  }, []);

  useFrame(() => {
    if (groupRef.current) groupRef.current.rotation.y += 0.001;
    if (cloudRef.current) cloudRef.current.rotation.y += 0.0015;
  });

  return (
    <group ref={groupRef}>
      {globeRef.current && <primitive object={globeRef.current} />}
      {cloudRef.current && <primitive object={cloudRef.current} />}
      {fresnelRef.current && <primitive object={fresnelRef.current} />}
    </group>
  );
}

/* ================= SCENE ================= */
export default function GlobeScene() {
  return (
    <div className="h-full w-full">
      <Canvas camera={{ position: [0, 0, 320], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[6, 6, 6]} intensity={1.2} />

        <CyberGlobe />

        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    </div>
  );
}
