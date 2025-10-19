import { OrbitControls } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';

function RotatingObjects() {
  const sphereRef = useRef();
  const hexRef = useRef();
  const torusRef = useRef();

  useFrame(() => {
    if (sphereRef.current) sphereRef.current.rotation.y += 0.003;
    if (hexRef.current) hexRef.current.rotation.z += 0.003;
    if (torusRef.current) torusRef.current.rotation.y += 0.003;
  });

  return (
    <>
      {/* Sphere */}
      <mesh ref={sphereRef}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshPhysicalMaterial
          color={0xf2efe9}
          roughness={0.95}
          metalness={0.0}
          sheen={0.2}
          clearcoat={0.06}
          clearcoatRoughness={0.6}
          transmission={0}
        />
      </mesh>

      {/* Hexagon (Cylinder) */}
      <mesh ref={hexRef} position={[-2.5, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[1, 1, 0.3, 6, 1]} />
        <meshPhysicalMaterial
          color={0xf2efe9}
          roughness={0.95}
          metalness={0.0}
          sheen={0.2}
          clearcoat={0.06}
          clearcoatRoughness={0.6}
          transmission={0}
        />
      </mesh>

      {/* Torus */}
      <mesh ref={torusRef} position={[2.5, 0, 0]}>
        <torusGeometry args={[0.75, 0.25, 32, 96]} />
        <meshPhysicalMaterial
          color={0xf2efe9}
          roughness={0.95}
          metalness={0.0}
          sheen={0.2}
          clearcoat={0.06}
          clearcoatRoughness={0.6}
          transmission={0}
        />
      </mesh>

      {/* Lighting */}
      <directionalLight position={[5, 5, 5]} intensity={2.2} />
      <hemisphereLight args={[0xffffff, 0xdedede, 0.7]} />
      <directionalLight position={[-3, 2, -2]} intensity={1.0} />
      <ambientLight intensity={0.22} />
    </>
  );
}

function ThreeJsFiberPlayground() {
  return (
    <div className='w-full h-screen'>
      <Canvas
        camera={{
          position: [0, 1.5, 6],
          fov: 45,
          near: 0.1,
          far: 100,
        }}
        gl={{
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.0,
          outputColorSpace: THREE.SRGBColorSpace,
          physicallyCorrectLights: true,
        }}>
        <RotatingObjects />
        <OrbitControls enableDamping target={[0, 0, 0]} />
      </Canvas>
    </div>
  );
}

export default ThreeJsFiberPlayground;
