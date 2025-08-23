import { useTexture } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

export default function Earth() {
  const earthRef = useRef<THREE.Mesh>(null);
  
  // Use a procedural earth texture since we don't have earth.jpg in the textures folder
  // We'll create a simple earth-like appearance with available textures
  
  return (
    <mesh ref={earthRef} castShadow receiveShadow>
      <sphereGeometry args={[5, 64, 64]} />
      <meshPhongMaterial 
        color="#4A90E2"
        transparent
        opacity={0.9}
        shininess={100}
      />
      
      {/* Add some continents using decals or overlays */}
      <mesh position={[0, 0, 5.01]}>
        <sphereGeometry args={[5.01, 32, 32]} />
        <meshBasicMaterial 
          color="#2E8B57"
          transparent
          opacity={0.3}
          alphaTest={0.1}
        />
      </mesh>
      
      {/* Cloud layer */}
      <mesh position={[0, 0, 0]} scale={1.02}>
        <sphereGeometry args={[5, 32, 32]} />
        <meshBasicMaterial 
          color="white"
          transparent
          opacity={0.1}
          side={THREE.DoubleSide}
        />
      </mesh>
    </mesh>
  );
}
