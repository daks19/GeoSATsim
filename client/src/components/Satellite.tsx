import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useSatelliteStore } from "../lib/stores/useSatelliteStore";
import { Text } from "@react-three/drei";

export default function Satellite() {
  const satelliteRef = useRef<THREE.Group>(null);
  const { satellite } = useSatelliteStore();

  useFrame(() => {
    if (satelliteRef.current) {
      satelliteRef.current.position.copy(satellite.position);
    }
  });

  return (
    <group ref={satelliteRef}>
      {/* Main satellite body */}
      <mesh castShadow>
        <boxGeometry args={[0.3, 0.3, 0.6]} />
        <meshPhongMaterial color="#C0C0C0" />
      </mesh>
      
      {/* Solar panels */}
      <mesh position={[-0.8, 0, 0]} castShadow>
        <boxGeometry args={[1.2, 0.05, 0.8]} />
        <meshPhongMaterial color="#1E3A8A" />
      </mesh>
      
      <mesh position={[0.8, 0, 0]} castShadow>
        <boxGeometry args={[1.2, 0.05, 0.8]} />
        <meshPhongMaterial color="#1E3A8A" />
      </mesh>
      
      {/* Antenna */}
      <mesh position={[0, 0.4, 0]} castShadow>
        <cylinderGeometry args={[0.02, 0.02, 0.5]} />
        <meshPhongMaterial color="#FFD700" />
      </mesh>
      
      {/* Label */}
      <Text
        position={[0, -0.8, 0]}
        fontSize={0.3}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        SAT
      </Text>
    </group>
  );
}
