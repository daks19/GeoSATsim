import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Slider } from "./ui/slider";
import { Button } from "./ui/button";
import { useSatelliteStore } from "../lib/stores/useSatelliteStore";
import { useMissionStore } from "../lib/stores/useMissionStore";

export default function ControlPanel() {
  const { satellite, updateAltitude, updateInclination, resetSatellite } = useSatelliteStore();
  const { resetMission } = useMissionStore();

  const handleAltitudeChange = (value: number[]) => {
    updateAltitude(value[0]);
  };

  const handleInclinationChange = (value: number[]) => {
    updateInclination(value[0]);
  };

  const handleReset = () => {
    resetSatellite();
    resetMission();
  };

  return (
    <Card className="absolute top-4 left-4 w-80 bg-black/80 border-gray-600 text-white z-10">
      <CardHeader>
        <CardTitle className="text-xl text-cyan-400">Satellite Controls</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">
            Altitude: {satellite.altitude.toFixed(0)} km
          </label>
          <Slider
            value={[satellite.altitude]}
            onValueChange={handleAltitudeChange}
            min={200}
            max={2000}
            step={10}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>200 km</span>
            <span>2000 km</span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Inclination: {satellite.inclination.toFixed(1)}°
          </label>
          <Slider
            value={[satellite.inclination]}
            onValueChange={handleInclinationChange}
            min={0}
            max={180}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>0°</span>
            <span>180°</span>
          </div>
        </div>

        <div className="pt-4">
          <Button 
            onClick={handleReset} 
            variant="outline" 
            className="w-full bg-red-600/20 border-red-500 text-red-400 hover:bg-red-600/40"
          >
            Reset Orbit
          </Button>
        </div>

        <div className="text-xs text-gray-400 space-y-1">
          <p><strong>Period:</strong> {(2 * Math.PI * Math.sqrt(Math.pow((6371 + satellite.altitude), 3) / 398600) / 60).toFixed(1)} min</p>
          <p><strong>Speed:</strong> {(Math.sqrt(398600 / (6371 + satellite.altitude))).toFixed(2)} km/s</p>
        </div>
      </CardContent>
    </Card>
  );
}
