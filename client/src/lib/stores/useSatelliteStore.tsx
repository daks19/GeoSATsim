import { create } from "zustand";
import * as THREE from "three";

export interface SatelliteState {
  position: THREE.Vector3;
  altitude: number; // km
  inclination: number; // degrees
  angle: number; // current orbital angle in radians
  velocity: number; // angular velocity
}

interface SatelliteStore {
  satellite: SatelliteState;
  updateSatellitePosition: (position: THREE.Vector3, angle: number) => void;
  updateAltitude: (altitude: number) => void;
  updateInclination: (inclination: number) => void;
  resetSatellite: () => void;
}

const initialSatelliteState: SatelliteState = {
  position: new THREE.Vector3(10, 0, 0),
  altitude: 400, // km
  inclination: 51.6, // ISS-like inclination
  angle: 0,
  velocity: 0
};

export const useSatelliteStore = create<SatelliteStore>((set) => ({
  satellite: initialSatelliteState,
  
  updateSatellitePosition: (position: THREE.Vector3, angle: number) =>
    set((state) => ({
      satellite: { ...state.satellite, position, angle }
    })),
  
  updateAltitude: (altitude: number) =>
    set((state) => ({
      satellite: { ...state.satellite, altitude }
    })),
  
  updateInclination: (inclination: number) =>
    set((state) => ({
      satellite: { ...state.satellite, inclination }
    })),
  
  resetSatellite: () =>
    set({ satellite: { ...initialSatelliteState, position: new THREE.Vector3(10, 0, 0) } })
}));
