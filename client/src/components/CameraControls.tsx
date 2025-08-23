import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

export default function CameraControls() {
  const { camera, gl } = useThree();
  const controlsRef = useRef();

  return (
    <OrbitControls
      ref={controlsRef}
      args={[camera, gl.domElement]}
      enablePan={true}
      enableZoom={true}
      enableRotate={true}
      minDistance={8}
      maxDistance={50}
      minPolarAngle={0}
      maxPolarAngle={Math.PI}
      autoRotate={false}
      autoRotateSpeed={0.5}
    />
  );
}
