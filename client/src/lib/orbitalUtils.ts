import * as THREE from "three";

export function generateOrbitPoints(altitude: number, inclination: number): THREE.Vector3[] {
  const points: THREE.Vector3[] = [];
  const earthRadius = 5; // Our Earth sphere radius in the scene
  const altitudeScale = altitude / 100; // Scale down altitude for visualization
  const orbitRadius = earthRadius + altitudeScale;
  const inclinationRad = (inclination * Math.PI) / 180;
  
  // Generate points along the orbital path
  const segments = 64;
  for (let i = 0; i <= segments; i++) {
    const angle = (i / segments) * Math.PI * 2;
    
    // Calculate position considering inclination
    const x = orbitRadius * Math.cos(angle) * Math.cos(inclinationRad);
    const y = orbitRadius * Math.sin(angle) * Math.sin(inclinationRad);
    const z = orbitRadius * Math.sin(angle) * Math.cos(inclinationRad);
    
    points.push(new THREE.Vector3(x, y, z));
  }
  
  return points;
}

export function calculateDistanceBetweenSatellites(pos1: THREE.Vector3, pos2: THREE.Vector3): number {
  return pos1.distanceTo(pos2);
}

export function latLonToVector3(lat: number, lon: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  
  const x = radius * Math.sin(phi) * Math.cos(theta);
  const y = radius * Math.cos(phi);
  const z = radius * Math.sin(phi) * Math.sin(theta);
  
  return new THREE.Vector3(x, y, z);
}

export function calculateOrbitalPeriod(altitude: number): number {
  // Orbital period in seconds using Kepler's third law
  // T = 2π√(a³/GM) where GM for Earth ≈ 398600 km³/s²
  const earthRadius = 6371; // km
  const semiMajorAxis = earthRadius + altitude;
  const GM = 398600; // km³/s²
  
  return 2 * Math.PI * Math.sqrt(Math.pow(semiMajorAxis, 3) / GM);
}

export function calculateOrbitalVelocity(altitude: number): number {
  // Orbital velocity in km/s
  const earthRadius = 6371; // km
  const orbitRadius = earthRadius + altitude;
  const GM = 398600; // km³/s²
  
  return Math.sqrt(GM / orbitRadius);
}
