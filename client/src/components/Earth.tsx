import { useTexture } from "@react-three/drei";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function Earth() {
  const earthRef = useRef<THREE.Mesh>(null);
  
  // Use a procedural earth texture since we don't have earth.jpg in the textures folder
  // We'll create a simple earth-like appearance with available textures
  
  const earthTexture = useTexture('/textures/earth.jpg');


  return (
    <>
      {/* Earth */}
      <mesh ref={earthRef} castShadow receiveShadow>
        <sphereGeometry args={[5, 64, 64]} />
        <meshStandardMaterial 
          map={earthTexture}
          roughness={0.7}
          metalness={0.1}
        />
      </mesh>
  // ...no cloud layer...
  // ...no atmosphere overlay...
    </>
  );
}
