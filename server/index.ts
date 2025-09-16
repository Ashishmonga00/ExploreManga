import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import { storage } from "./storage";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  const server = await registerRoutes(app);

  // Generate sitemap.xml (must be before setupVite to avoid catch-all interference)
  app.get("/sitemap.xml", async (req, res) => {
    try {
      const baseUrl = `${req.protocol}://${req.get('host')}`;
      const currentDate = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
      
      // Get all data for sitemap
      const [allManga, allCategories] = await Promise.all([
        storage.getAllManga(),
        storage.getAllCategories()
      ]);

      let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

      // Static routes
      const staticRoutes = [
        { url: '/', priority: '1.0', changefreq: 'daily' },
        { url: '/categories', priority: '0.9', changefreq: 'weekly' },
        { url: '/authors', priority: '0.8', changefreq: 'weekly' },
        { url: '/contact', priority: '0.7', changefreq: 'monthly' }
      ];

      for (const route of staticRoutes) {
        sitemap += `
  <url>
    <loc>${baseUrl}${route.url}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`;
      }

      // Category pages (/categories/[category])
      for (const category of allCategories) {
        sitemap += `
  <url>
    <loc>${baseUrl}/categories/${encodeURIComponent(category.name.toLowerCase())}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
      }

      // Manga detail pages (/manga/[id])
      for (const manga of allManga) {
        sitemap += `
  <url>
    <loc>${baseUrl}/manga/${encodeURIComponent(manga.id)}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>`;

        // Chapter pages (/manga/[id]/chapter/[chapterNo])
        if (manga.chapters && manga.chapters.length > 0) {
          for (const chapter of manga.chapters) {
            sitemap += `
  <url>
    <loc>${baseUrl}/manga/${encodeURIComponent(manga.id)}/chapter/${chapter.chapter_no}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`;
          }
        }
      }

      sitemap += `
</urlset>`;

      res.type('application/xml').send(sitemap);
      log(`GET /sitemap.xml 200 - sitemap generated with ${allManga.length} manga, ${allCategories.length} categories`);
    } catch (error) {
      console.error("Error generating sitemap:", error);
      res.status(500).send("Error generating sitemap");
    }
  });

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    throw err;
  });

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  // ALWAYS serve the app on the port specified in the environment variable PORT
  // Other ports are firewalled. Default to 5000 if not specified.
  // this serves both the API and the client.
  // It is the only port that is not firewalled.
  const port = parseInt(process.env.PORT || '5000', 10);
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true,
  }, () => {
    log(`serving on port ${port}`);
  });
})();
