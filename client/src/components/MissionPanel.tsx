import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { useMissionStore } from "../lib/stores/useMissionStore";
import { useISSPosition } from "../hooks/useISSPosition";

export default function MissionPanel() {
  const { 
    currentMission, 
    score, 
    missionProgress, 
    missionStatus,
    startNewMission,
    availableMissions 
  } = useMissionStore();
  
  const { issData } = useISSPosition();

  return (
    <Card className="absolute top-4 right-4 w-80 bg-black/80 border-gray-600 text-white z-10">
      <CardHeader>
        <CardTitle className="text-xl text-cyan-400">Mission Control</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">Score</span>
            <span className="text-lg font-bold text-green-400">{score}</span>
          </div>
        </div>

        {currentMission ? (
          <div className="space-y-3">
            <div>
              <h3 className="font-semibold text-yellow-400">{currentMission.title}</h3>
              <p className="text-sm text-gray-300 mt-1">{currentMission.description}</p>
            </div>

            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Progress</span>
                <span>{missionProgress.toFixed(0)}%</span>
              </div>
              <Progress value={missionProgress} className="w-full" />
            </div>

            <Badge 
              variant={missionStatus === 'active' ? 'default' : 
                     missionStatus === 'completed' ? 'secondary' : 
                     'destructive'}
              className="w-full justify-center"
            >
              {missionStatus.toUpperCase()}
            </Badge>

            {missionStatus === 'completed' && (
              <div className="text-center">
                <span className="text-green-400 font-bold">
                  +{currentMission.reward} points!
                </span>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center">
            <p className="text-gray-400 mb-3">No active mission</p>
            <Button 
              onClick={() => startNewMission()}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              Start Mission
            </Button>
          </div>
        )}

        {/* ISS Live Data */}
        <div className="border-t border-gray-600 pt-4">
          <h4 className="font-semibold text-green-400 mb-2">ISS Live Data</h4>
          {issData ? (
            <div className="text-xs space-y-1">
              <p><strong>Lat:</strong> {issData.iss_position.latitude}°</p>
              <p><strong>Lon:</strong> {issData.iss_position.longitude}°</p>
              <p><strong>Updated:</strong> {new Date(issData.timestamp * 1000).toLocaleTimeString()}</p>
            </div>
          ) : (
            <p className="text-xs text-gray-400">Loading ISS data...</p>
          )}
        </div>

        {/* Mission List */}
        <div className="border-t border-gray-600 pt-4">
          <h4 className="font-semibold text-purple-400 mb-2">Available Missions</h4>
          <div className="space-y-1">
            {availableMissions.slice(0, 3).map((mission, index) => (
              <Button
                key={index}
                onClick={() => startNewMission(mission)}
                variant="ghost"
                size="sm"
                className="w-full text-left justify-start text-xs text-gray-300 hover:text-white"
                disabled={!!currentMission}
              >
                {mission.title}
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
