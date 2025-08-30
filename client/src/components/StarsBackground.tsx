import { useMemo } from "react";
import { useLoader } from "@react-three/fiber";
import * as THREE from "three";

// Optionally, you can add a galaxy texture to public/textures/galaxy.png
// For now, we'll use colored points for stars and a few billboards for galaxies

export default function StarsBackground() {
  // Generate random star positions
  const stars = useMemo(() => {
    const arr = [];
    for (let i = 0; i < 800; i++) {
      const phi = Math.acos(2 * Math.random() - 1);
      const theta = 2 * Math.PI * Math.random();
      const radius = 100 + Math.random() * 50;
      arr.push([
        radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.sin(phi) * Math.sin(theta),
        radius * Math.cos(phi),
      ]);
    }
    return arr;
  }, []);

  // Example galaxy positions
  const galaxies = useMemo(() => [
    [120, 80, -100] as [number, number, number],
    [-130, -90, 110] as [number, number, number],
    [100, -120, -130] as [number, number, number],
  ], []);

  return (
    <group>
      {/* Stars as Points */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            array={new Float32Array(stars.flat())}
            count={stars.length}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial color="#fff" size={1.2} sizeAttenuation />
      </points>
      {/* Galaxies as colored spheres (replace with sprites for realism) */}
      {galaxies.map((pos, i) => (
        <mesh position={pos} key={i}>
          <sphereGeometry args={[6, 16, 16]} />
          <meshBasicMaterial color={["#ffccff", "#aaffff", "#ffffcc"][i % 3]} transparent opacity={0.3} />
        </mesh>
      ))}
    </group>
  );
}
