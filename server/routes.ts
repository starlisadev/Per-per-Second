import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all content
  app.get("/api/content", async (_req, res) => {
    try {
      const allContent = await storage.getAllContent();
      res.json(allContent);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Get content by ID
  app.get("/api/content/:id", async (req, res) => {
    try {
      const contentItem = await storage.getContentById(req.params.id);
      if (!contentItem) {
        return res.status(404).json({ message: "Content not found" });
      }
      res.json(contentItem);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
