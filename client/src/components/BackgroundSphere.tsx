import { useRef } from "react";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

export default function BackgroundSphere() {
  // Place your 8k_stars_milky_way.jpg in public/textures/
  const bgTexture = useTexture("/textures/8k_stars_milky_way.jpg");
  const meshRef = useRef<THREE.Mesh>(null);

  return (
    <mesh ref={meshRef} scale={200}>
      <sphereGeometry args={[1, 64, 64]} />
      <meshBasicMaterial map={bgTexture} side={THREE.BackSide} />
    </mesh>
  );
}
