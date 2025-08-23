import { useState, useEffect } from 'react';
import * as THREE from 'three';

interface ISSData {
  message: string;
  timestamp: number;
  iss_position: {
    latitude: string;
    longitude: string;
  };
}

export function useISSPosition() {
  const [issData, setIssData] = useState<ISSData | null>(null);
  const [issPosition, setIssPosition] = useState<THREE.Vector3 | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchISSPosition = async () => {
    try {
      const response = await fetch('https://api.open-notify.org/iss-now.json');
      if (!response.ok) {
        throw new Error('Failed to fetch ISS position');
      }
      const data: ISSData = await response.json();
      setIssData(data);
      
      // Convert lat/lon to 3D position
      const lat = parseFloat(data.iss_position.latitude);
      const lon = parseFloat(data.iss_position.longitude);
      
      // ISS altitude is approximately 408 km
      const issAltitude = 408;
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
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
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
