import { useMemo } from 'react';
import * as THREE from 'three';
import { SatelliteState } from '../lib/stores/useSatelliteStore';

export function useOrbitalMechanics() {
  const calculateSatellitePosition = useMemo(() => {
    return (satellite: SatelliteState, deltaTime: number) => {
      // Orbital mechanics calculations
      const earthRadius = 5; // Our Earth sphere radius in the scene
      const altitudeScale = satellite.altitude / 100; // Scale down altitude for visualization
      const orbitRadius = earthRadius + altitudeScale;
      
      // Calculate orbital period using Kepler's third law
      // T = 2π√(a³/GM) where GM for Earth ≈ 398600 km³/s²
      const realOrbitRadius = 6371 + satellite.altitude; // km
      const orbitalPeriod = 2 * Math.PI * Math.sqrt(Math.pow(realOrbitRadius, 3) / 398600); // seconds
      
      // Scale time for visualization (speed up the orbit)
      const timeScale = 60; // Make orbit 60x faster for visualization
      const angularVelocity = (2 * Math.PI) / (orbitalPeriod / timeScale);
      
      // Update angle based on time
      const newAngle = satellite.angle + (angularVelocity * deltaTime);
      
      // Convert inclination to radians
      const inclinationRad = (satellite.inclination * Math.PI) / 180;
      
      // Calculate position in 3D space
      const x = orbitRadius * Math.cos(newAngle) * Math.cos(inclinationRad);
      const y = orbitRadius * Math.sin(newAngle) * Math.sin(inclinationRad);
      const z = orbitRadius * Math.sin(newAngle) * Math.cos(inclinationRad);
      
      return {
        position: new THREE.Vector3(x, y, z),
        angle: newAngle % (2 * Math.PI),
        velocity: angularVelocity
      };
    };
  }, []);

  return { calculateSatellitePosition };
}
