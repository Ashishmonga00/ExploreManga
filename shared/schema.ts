import { z } from "zod";

// Manga schema
export const mangaSchema = z.object({
  id: z.string(),
  title: z.string(),
  author: z.string(),
  genre: z.array(z.string()),
  status: z.enum(["ongoing", "completed", "hiatus"]),
  description: z.string(),
  coverImage: z.string(),
  chapters: z.array(z.object({
    id: z.string(),
    number: z.number(),
    title: z.string(),
    releaseDate: z.string(),
  })),
  rating: z.number().min(0).max(10),
  views: z.number(),
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