import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { insertReadingProgressSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all categories
  app.get("/api/categories", async (req, res) => {
    try {
      const categories = await storage.getAllCategories();
      res.json(categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
      res.status(500).json({ error: "Failed to fetch categories" });
    }
  });

  // Get manga by category
  app.get("/api/categories/:category", async (req, res) => {
    try {
      const { category } = req.params;
      const manga = await storage.getMangaByCategory(category);
      res.json(manga);
    } catch (error) {
      console.error(`Error fetching manga for category ${req.params.category}:`, error);
      res.status(500).json({ error: "Failed to fetch manga for category" });
    }
  });

  // Get manga details by ID
  app.get("/api/manga/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const manga = await storage.getManga(id);
      
      if (!manga) {
        return res.status(404).json({ error: "Manga not found" });
      }
      
      res.json(manga);
    } catch (error) {
      console.error(`Error fetching manga ${req.params.id}:`, error);
      res.status(500).json({ error: "Failed to fetch manga" });
    }
  });

  // Get all manga (with optional query parameters)
  app.get("/api/manga", async (req, res) => {
    try {
      const { search, featured, popular } = req.query;

      if (search) {
        const manga = await storage.searchManga(search.toString());
        return res.json(manga);
      }

      if (featured === "true") {
        const manga = await storage.getFeaturedManga();
        return res.json(manga);
      }

      if (popular === "true") {
        const manga = await storage.getPopularManga();
        return res.json(manga);
      }

      const allManga = await storage.getAllManga();
      res.json(allManga);
    } catch (error) {
      console.error("Error fetching manga:", error);
      res.status(500).json({ error: "Failed to fetch manga" });
    }
  });

  // Get reading progress for a manga
  app.get("/api/reading-progress/:mangaId", async (req, res) => {
    try {
      const { mangaId } = req.params;
      const progress = await storage.getReadingProgress(mangaId);
      
      if (!progress) {
        return res.status(404).json({ error: "No reading progress found" });
      }
      
      res.json(progress);
    } catch (error) {
      console.error(`Error fetching reading progress for manga ${req.params.mangaId}:`, error);
      res.status(500).json({ error: "Failed to fetch reading progress" });
    }
  });

  // Save reading progress for a manga
  app.post("/api/reading-progress", async (req, res) => {
    try {
      const validatedProgress = insertReadingProgressSchema.parse(req.body);
      const progress = await storage.saveReadingProgress(validatedProgress);
      res.json(progress);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid reading progress data", details: error.errors });
      }
      console.error("Error saving reading progress:", error);
      res.status(500).json({ error: "Failed to save reading progress" });
    }
  });

  // Get bulk reading progress for multiple manga IDs
  app.post("/api/reading-progress/bulk", async (req, res) => {
    try {
      const { mangaIds } = req.body;
      
      if (!Array.isArray(mangaIds)) {
        return res.status(400).json({ error: "mangaIds must be an array" });
      }
      
      const progressMap = await storage.getBulkReadingProgress(mangaIds);
      res.json(progressMap);
    } catch (error) {
      console.error("Error fetching bulk reading progress:", error);
      res.status(500).json({ error: "Failed to fetch bulk reading progress" });
    }
  });

  // Get all reading progress
  app.get("/api/reading-progress", async (req, res) => {
    try {
      const allProgress = await storage.getAllReadingProgress();
      res.json(allProgress);
    } catch (error) {
      console.error("Error fetching all reading progress:", error);
      res.status(500).json({ error: "Failed to fetch reading progress" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}