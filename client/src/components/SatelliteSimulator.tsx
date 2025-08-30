import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import Earth from "./Earth";
import StarsBackground from "./StarsBackground";
import BackgroundSphere from "./BackgroundSphere";
import Satellite from "./Satellite";
import ISS from "./ISS";
import OrbitPath from "./OrbitPath";
import CameraControls from "./CameraControls";
import { useSatelliteStore } from "../lib/stores/useSatelliteStore";
import { useMissionStore } from "../lib/stores/useMissionStore";
import { useOrbitalMechanics } from "../hooks/useOrbitalMechanics";

export default function SatelliteSimulator() {
  const groupRef = useRef<THREE.Group>(null);
  const { satellite, updateSatellitePosition } = useSatelliteStore();
  const { checkMissionProgress } = useMissionStore();
  const { calculateSatellitePosition } = useOrbitalMechanics();

  useFrame((state, delta) => {
    // Update satellite position based on orbital mechanics
    const newPosition = calculateSatellitePosition(satellite, delta);
    updateSatellitePosition(newPosition.position, newPosition.angle);
    
    // Check mission progress
    checkMissionProgress();
    
    // Rotate Earth slowly
    if (groupRef.current) {
      groupRef.current.children[0].rotation.y += delta * 0.1; // Earth rotation
    }
  });

  return (
    <>
      <BackgroundSphere />
      <StarsBackground />
      <group ref={groupRef}>
        <Earth />
        <Satellite />
        <ISS />
        <OrbitPath />
        <CameraControls />
      </group>
    </>
  );
}
