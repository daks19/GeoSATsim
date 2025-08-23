import { create } from "zustand";
import { useSatelliteStore } from "./useSatelliteStore";
import { useISSPosition } from "../../hooks/useISSPosition";

export interface Mission {
  id: string;
  title: string;
  description: string;
  objective: string;
  reward: number;
  timeLimit?: number; // seconds
  targetAltitude?: number;
  targetInclination?: number;
  targetDistance?: number; // from ISS
}

interface MissionStore {
  currentMission: Mission | null;
  score: number;
  missionProgress: number;
  missionStatus: 'active' | 'completed' | 'failed';
  availableMissions: Mission[];
  startNewMission: (mission?: Mission) => void;
  checkMissionProgress: () => void;
  resetMission: () => void;
}

const defaultMissions: Mission[] = [
  {
    id: 'altitude-500',
    title: 'High Orbit',
    description: 'Maintain altitude above 500km for 30 seconds',
    objective: 'altitude',
    reward: 100,
    timeLimit: 30,
    targetAltitude: 500
  },
  {
    id: 'match-iss-inclination',
    title: 'ISS Rendezvous',
    description: 'Match ISS orbital inclination (51.6°)',
    objective: 'inclination',
    reward: 150,
    targetInclination: 51.6
  },
  {
    id: 'polar-orbit',
    title: 'Polar Survey',
    description: 'Achieve polar orbit (90° inclination)',
    objective: 'inclination',
    reward: 120,
    targetInclination: 90
  },
  {
    id: 'low-earth-orbit',
    title: 'LEO Operations',
    description: 'Maintain stable orbit between 300-400km',
    objective: 'altitude-range',
    reward: 80,
    targetAltitude: 350
  }
];

export const useMissionStore = create<MissionStore>((set, get) => ({
  currentMission: null,
  score: 0,
  missionProgress: 0,
  missionStatus: 'active',
  availableMissions: defaultMissions,
  
  startNewMission: (mission?: Mission) => {
    const missionToStart = mission || defaultMissions[Math.floor(Math.random() * defaultMissions.length)];
    set({
      currentMission: missionToStart,
      missionProgress: 0,
      missionStatus: 'active'
    });
  },
  
  checkMissionProgress: () => {
    const { currentMission, missionStatus } = get();
    if (!currentMission || missionStatus !== 'active') return;
    
    const satellite = useSatelliteStore.getState().satellite;
    let progress = 0;
    let completed = false;
    
    switch (currentMission.objective) {
      case 'altitude':
        if (currentMission.targetAltitude) {
          const altitudeDiff = Math.abs(satellite.altitude - currentMission.targetAltitude);
          progress = Math.max(0, 100 - (altitudeDiff / 50) * 100);
          completed = altitudeDiff < 25; // Within 25km tolerance
        }
        break;
        
      case 'inclination':
        if (currentMission.targetInclination !== undefined) {
          const inclinationDiff = Math.abs(satellite.inclination - currentMission.targetInclination);
          progress = Math.max(0, 100 - (inclinationDiff / 5) * 100);
          completed = inclinationDiff < 2; // Within 2 degree tolerance
        }
        break;
        
      case 'altitude-range':
        if (currentMission.targetAltitude) {
          const inRange = satellite.altitude >= 300 && satellite.altitude <= 400;
          progress = inRange ? 100 : 0;
          completed = inRange;
        }
        break;
    }
    
    set({ missionProgress: progress });
    
    if (completed && missionStatus === 'active') {
      set(state => ({
        missionStatus: 'completed',
        score: state.score + currentMission.reward
      }));
      
      // Auto-start next mission after 3 seconds
      setTimeout(() => {
        get().startNewMission();
      }, 3000);
    }
  },
  
  resetMission: () => {
    set({
      currentMission: null,
      missionProgress: 0,
      missionStatus: 'active',
      score: 0
    });
  }
}));
