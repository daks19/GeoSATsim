import { useState, useEffect } from 'react';
import * as THREE from 'three';

interface ISSData {
  latitude: number;
  longitude: number;
  altitude: number;
  velocity: number;
  timestamp: number;
}

export function useISSPosition() {
  const [issData, setIssData] = useState<ISSData | null>(null);
  const [issPosition, setIssPosition] = useState<THREE.Vector3 | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchISSPosition = async () => {
    try {
      const response = await fetch('https://api.wheretheiss.at/v1/satellites/25544');
      if (!response.ok) {
        throw new Error(`Failed to fetch ISS position: ${response.status}`);
      }
      const data = await response.json();
      
      // Validate the data structure
      if (typeof data.latitude !== 'number' || typeof data.longitude !== 'number') {
        throw new Error('Invalid ISS data structure');
      }
      
      setIssData(data);
      
      // Convert lat/lon to 3D position
      const lat = data.latitude;
      const lon = data.longitude;
      
      // Use actual ISS altitude from the API, fallback to 408 if not available
      const issAltitude = data.altitude || 408;
      const earthRadius = 5; // Our Earth sphere radius in the scene
      const radius = earthRadius + (issAltitude / 100); // Scale down altitude
      
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lon + 180) * (Math.PI / 180);
      
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.cos(phi);
      const z = radius * Math.sin(phi) * Math.sin(theta);
      
      setIssPosition(new THREE.Vector3(x, y, z));
      setError(null);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      console.error('Failed to fetch ISS position:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Fetch immediately
    fetchISSPosition();
    
    // Then fetch every 5 seconds
    const interval = setInterval(fetchISSPosition, 5000);
    
    return () => clearInterval(interval);
  }, []);

  return { issData, issPosition, isLoading, error };
}
