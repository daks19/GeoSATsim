import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Text } from "@react-three/drei";
import { useISSPosition } from "../hooks/useISSPosition";

export default function ISS() {
  const issRef = useRef<THREE.Group>(null);
  const { issPosition, isLoading } = useISSPosition();

  useFrame(() => {
    if (issRef.current && issPosition) {
      issRef.current.position.copy(issPosition);
    }
  });

  if (isLoading || !issPosition) {
    return null;
  }

  return (
    <group ref={issRef}>
      {/* ISS main structure */}
      <mesh castShadow>
        <boxGeometry args={[0.4, 0.2, 1.0]} />
        <meshPhongMaterial color="#C0C0C0" />
      </mesh>
      
      {/* Solar arrays - larger than satellite */}
      <mesh position={[-1.2, 0, 0]} castShadow>
        <boxGeometry args={[1.6, 0.05, 1.2]} />
        <meshPhongMaterial color="#000080" />
      </mesh>
      
      <mesh position={[1.2, 0, 0]} castShadow>
        <boxGeometry args={[1.6, 0.05, 1.2]} />
        <meshPhongMaterial color="#000080" />
      </mesh>
      
      {/* ISS modules */}
      <mesh position={[0, 0, 0.6]} castShadow>
        <cylinderGeometry args={[0.15, 0.15, 0.4]} />
        <meshPhongMaterial color="#F5F5DC" />
      </mesh>
      
      {/* Label */}
      <Text
        position={[0, -0.6, 0]}
        fontSize={0.25}
        color="#00FF00"
        anchorX="center"
        anchorY="middle"
      >
        ISS
      </Text>
    </group>
  );
}
