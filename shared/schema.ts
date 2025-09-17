import { z } from "zod";

// Real manga schema based on provided JSON structure
export const mangaSchema = z.object({
  id: z.string(),
  title: z.string(),
  url: z.string(),
  cover_image: z.string(),
  attributes: z.array(z.string()),
  summary: z.string(),
  chapters: z.array(z.object({
    chapter_no: z.number(),
    title: z.string(),
    url: z.string(),
    images: z.array(z.string()),
    page_count: z.number(),
  })),
  // Computed fields for compatibility with frontend
  author: z.string().optional(),
  genre: z.array(z.string()).optional(),
  status: z.enum(["ongoing", "completed", "hiatus"]).optional(),
  description: z.string().optional(),
  coverImage: z.string().optional(),
  rating: z.number().min(0).max(10).optional(),
  views: z.number().optional(),
  isPopular: z.boolean().optional(),
  isFeatured: z.boolean().optional(),
});

export type Manga = z.infer<typeof mangaSchema>;

// Category schema
export const categorySchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  mangaCount: z.number(),
});

export type Category = z.infer<typeof categorySchema>;

// Insert schemas
export const insertMangaSchema = mangaSchema.omit({ id: true });
export const insertCategorySchema = categorySchema.omit({ id: true });

export type InsertManga = z.infer<typeof insertMangaSchema>;
export type InsertCategory = z.infer<typeof insertCategorySchema>;

// Reading progress schema
export const readingProgressSchema = z.object({
  id: z.string(),
  mangaId: z.string(),
  chapterNo: z.number(),
  pageNo: z.number().default(0), // Current page within chapter
  lastReadAt: z.string(), // ISO date string
});

export type ReadingProgress = z.infer<typeof readingProgressSchema>;

export const insertReadingProgressSchema = readingProgressSchema.omit({ id: true });
export type InsertReadingProgress = z.infer<typeof insertReadingProgressSchema>;