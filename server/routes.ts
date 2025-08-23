import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // ISS Position proxy endpoint (if needed to avoid CORS issues)
  app.get("/api/iss-position", async (req, res) => {
    try {
      const response = await fetch("https://api.open-notify.org/iss-now.json");
      const data = await response.json();
      res.json(data);
    } catch (error) {
      console.error("Failed to fetch ISS position:", error);
      res.status(500).json({ error: "Failed to fetch ISS position" });
    }
  });

  // Get satellite tracking data endpoint
  app.get("/api/satellites", async (req, res) => {
    try {
      // This could be extended to fetch TLE data for multiple satellites
      res.json({
        message: "Satellite tracking data",
        satellites: [
          {
            name: "ISS",
            id: 25544,
            active: true
          }
        ]
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch satellite data" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
