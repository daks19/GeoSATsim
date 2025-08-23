import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import "@fontsource/inter";
import SatelliteSimulator from "./components/SatelliteSimulator";
import ControlPanel from "./components/ControlPanel";
import MissionPanel from "./components/MissionPanel";

function App() {
  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden', background: '#000011' }}>
      {/* Control Panel - Left Side */}
      <ControlPanel />
      
      {/* Mission Panel - Right Side */}
      <MissionPanel />
      
      {/* 3D Scene */}
      <Canvas
        shadows
        camera={{
          position: [0, 0, 15],
          fov: 45,
          near: 0.1,
          far: 1000
        }}
        gl={{
          antialias: true,
          powerPreference: "high-performance"
        }}
        style={{ position: 'absolute', top: 0, left: 0, zIndex: 1 }}
      >
        <color attach="background" args={["#000011"]} />
        
        {/* Lighting */}
        <ambientLight intensity={0.2} />
        <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
        
        <Suspense fallback={null}>
          <SatelliteSimulator />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default App;
