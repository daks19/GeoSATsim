import { useRef, useMemo } from "react";
import * as THREE from "three";
import { useSatelliteStore } from "../lib/stores/useSatelliteStore";
import { generateOrbitPoints } from "../lib/orbitalUtils";

export default function OrbitPath() {
  const lineRef = useRef<THREE.Line>(null);
  const { satellite } = useSatelliteStore();

  const orbitPoints = useMemo(() => {
    return generateOrbitPoints(satellite.altitude, satellite.inclination);
  }, [satellite.altitude, satellite.inclination]);

  const geometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    geometry.setFromPoints(orbitPoints);
    return geometry;
  }, [orbitPoints]);

  return (
    <line ref={lineRef} geometry={geometry}>
      <lineBasicMaterial color="#00FFFF" transparent opacity={0.6} />
    </line>
  );
}
