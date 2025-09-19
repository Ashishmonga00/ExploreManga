import fs from 'fs';
import path from 'path';
import { randomUUID } from "crypto";
import type { Manga, Category, InsertManga, InsertCategory, ReadingProgress, InsertReadingProgress } from "@shared/schema";

// Helper function to extract genre from attributes
function extractGenres(attributes: string[]): string[] {
  const genreAttr = attributes.find(attr => attr.startsWith('Genres:'));
  if (!genreAttr) return [];
  
  const genresPart = genreAttr.replace('Genres:', '').trim();
  return genresPart
    .split(',')
    .map(g => g.trim())
    .filter(g => !['Manga', 'Josei(W)', 'Seinen(M)', 'Shoujo(G)', 'Shounen(B)'].includes(g));
}

// Helper function to extract author from attributes
function extractAuthor(attributes: string[]): string {
  const authorAttr = attributes.find(attr => attr.startsWith('Authors:') || attr.startsWith('Author:'));
  if (!authorAttr) return 'Unknown Author';
  
  return authorAttr.replace(/Authors?:/, '').trim();
}

// Helper function to extract status from attributes
function extractStatus(attributes: string[]): "ongoing" | "completed" | "hiatus" {
  const statusAttr = attributes.find(attr => attr.includes('Original work:'));
  if (!statusAttr) return 'ongoing';
  
  if (statusAttr.includes('Completed')) return 'completed';
  if (statusAttr.includes('Hiatus')) return 'hiatus';
  return 'ongoing';
}

// Helper function to extract view count
function extractViews(attributes: string[]): number {
  const rankAttr = attributes.find(attr => attr.startsWith('Rank:'));
  if (!rankAttr) return Math.floor(Math.random() * 100000) + 1000;
  
  const match = rankAttr.match(/(\d+(?:\.\d+)?[KM]?)\s+total views/);
  if (!match) return Math.floor(Math.random() * 100000) + 1000;
  
  const viewStr = match[1];
  let views = parseFloat(viewStr);
  if (viewStr.includes('K')) views *= 1000;
  if (viewStr.includes('M')) views *= 1000000;
  return Math.floor(views);
}

// Transform raw JSON data to our Manga schema
function transformMangaData(rawData: any, id: string): Manga {
  const genres = extractGenres(rawData.attributes);
  const author = extractAuthor(rawData.attributes);
  const status = extractStatus(rawData.attributes);
  const views = extractViews(rawData.attributes);
  
  return {
    id,
    title: rawData.title,
    url: rawData.url,
    cover_image: rawData.cover_image,
    attributes: rawData.attributes,
    summary: rawData.summary || '',
    chapters: rawData.chapters.map((chapter: any) => ({
      chapter_no: chapter.chapter_no,
      title: chapter.title,
      url: chapter.url,
      images: chapter.images,
      page_count: chapter.page_count,
    })),
    // Computed compatibility fields
    author,
    genre: genres,
    status,
    description: rawData.summary || '',
    coverImage: rawData.cover_image,
    rating: Math.floor(Math.random() * 30 + 70) / 10, // Random rating 7.0-10.0
    views,
    isPopular: views > 50000,
    isFeatured: views > 100000 && genres.some(g => ['Action', 'Romance', 'Fantasy'].includes(g)),
  };
}

export interface IStorage {
  // Manga operations
  getManga(id: string): Promise<Manga | undefined>;
  getAllManga(): Promise<Manga[]>;
  getMangaByCategory(category: string): Promise<Manga[]>;
  searchManga(query: string): Promise<Manga[]>;
  getFeaturedManga(): Promise<Manga[]>;
  getPopularManga(): Promise<Manga[]>;
  
  // Category operations
  getAllCategories(): Promise<Category[]>;
  getCategoryByName(name: string): Promise<Category | undefined>;
  
  // Reading progress operations
  getReadingProgress(mangaId: string): Promise<ReadingProgress | undefined>;
  getBulkReadingProgress(mangaIds: string[]): Promise<Record<string, ReadingProgress>>;
  saveReadingProgress(progress: InsertReadingProgress): Promise<ReadingProgress>;
  getAllReadingProgress(): Promise<ReadingProgress[]>;
}

export class FileStorage implements IStorage {
  private mangaData: Map<string, Manga> = new Map();
  private categories: Map<string, Category> = new Map();
  private readingProgress: Map<string, ReadingProgress> = new Map();
  private initialized = false;

  constructor() {
    this.loadData();
  }

  private async loadData(): Promise<void> {
    if (this.initialized) return;

    try {
      // In production/Vercel, data is in dist/data; in development, it's in server/data
      // Check for Vercel environment first, then fallback to development
      let dataDir;
      const distDataPath = path.join(process.cwd(), 'dist/data');
      const serverDataPath = path.join(process.cwd(), 'server/data');
      
      try {
        fs.accessSync(distDataPath);
        dataDir = distDataPath;
        console.log('Using production data path:', dataDir);
      } catch {
        try {
          fs.accessSync(serverDataPath);
          dataDir = serverDataPath;
          console.log('Using development data path:', dataDir);
        } catch {
          throw new Error(`Data directory not found. Tried: ${distDataPath} and ${serverDataPath}`);
        }
      }
      const files = fs.readdirSync(dataDir).filter(file => file.endsWith('.json'));
      
      // Load manga data
      for (const file of files) {
        const filePath = path.join(dataDir, file);
        const rawData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        const id = path.basename(file, '.json');
        
        const manga = transformMangaData(rawData, id);
        this.mangaData.set(id, manga);
      }

      // Generate categories from manga data
      const genreMap = new Map<string, number>();
      
      const allMangaData = Array.from(this.mangaData.values());
      for (const manga of allMangaData) {
        if (manga.genre) {
          for (const genre of manga.genre) {
            genreMap.set(genre, (genreMap.get(genre) || 0) + 1);
          }
        }
      }

      // Create category objects
      let categoryIndex = 1;
      const genreEntries = Array.from(genreMap.entries());
      for (const [genreName, count] of genreEntries) {
        if (count > 0) { // Only include genres with manga
          const category: Category = {
            id: categoryIndex.toString(),
            name: genreName,
            description: this.getCategoryDescription(genreName),
            mangaCount: count,
          };
          this.categories.set(genreName.toLowerCase(), category);
          categoryIndex++;
        }
      }

      this.initialized = true;
      console.log(`Loaded ${this.mangaData.size} manga and ${this.categories.size} categories`);
    } catch (error) {
      console.error('Error loading manga data:', error);
    }
  }

  private getCategoryDescription(genre: string): string {
    const descriptions: Record<string, string> = {
      'Action': 'High-octane adventures filled with intense battles, martial arts, and epic confrontations.',
      'Romance': 'Heartwarming stories of love, relationships, and emotional journeys.',
      'Fantasy': 'Magical worlds filled with mystical creatures, ancient powers, and epic quests.',
      'Horror': 'Spine-chilling tales that delve into the darkness and supernatural terrors.',
      'Comedy': 'Hilarious stories that bring joy and laughter through clever humor.',
      'Drama': 'Emotionally compelling stories exploring complex human relationships.',
      'Sci-Fi': 'Futuristic tales exploring advanced technology and space exploration.',
      'Mystery': 'Intriguing puzzles and suspenseful investigations.',
      'Supernatural': 'Stories involving supernatural elements and otherworldly phenomena.',
      'School Life': 'Stories set in academic environments exploring student life.',
      'Mature': 'Content intended for mature audiences with complex themes.',
      'Smut': 'Adult content with explicit romantic and intimate scenes.',
      'Harem': 'Stories featuring one character surrounded by multiple love interests.',
      'Parody': 'Satirical takes on popular genres, series, or cultural phenomena.',
    };
    
    return descriptions[genre] || `Explore exciting ${genre.toLowerCase()} manga with compelling stories and characters.`;
  }

  async getManga(id: string): Promise<Manga | undefined> {
    await this.loadData();
    return this.mangaData.get(id);
  }

  async getAllManga(): Promise<Manga[]> {
    await this.loadData();
    return Array.from(this.mangaData.values());
  }

  async getMangaByCategory(category: string): Promise<Manga[]> {
    await this.loadData();
    const allManga = Array.from(this.mangaData.values());
    return allManga.filter(manga => 
      manga.genre?.some(genre => genre.toLowerCase() === category.toLowerCase())
    );
  }

  async searchManga(query: string): Promise<Manga[]> {
    await this.loadData();
    const lowercaseQuery = query.toLowerCase();
    const allManga = Array.from(this.mangaData.values());
    
    return allManga.filter(manga =>
      manga.title.toLowerCase().includes(lowercaseQuery) ||
      manga.author?.toLowerCase().includes(lowercaseQuery) ||
      manga.genre?.some(genre => genre.toLowerCase().includes(lowercaseQuery))
    );
  }

  async getFeaturedManga(): Promise<Manga[]> {
    await this.loadData();
    const allManga = Array.from(this.mangaData.values());
    return allManga.filter(manga => manga.isFeatured).slice(0, 5);
  }

  async getPopularManga(): Promise<Manga[]> {
    await this.loadData();
    const allManga = Array.from(this.mangaData.values());
    return allManga
      .filter(manga => manga.isPopular)
      .sort((a, b) => (b.views || 0) - (a.views || 0))
      .slice(0, 12);
  }

  async getAllCategories(): Promise<Category[]> {
    await this.loadData();
    return Array.from(this.categories.values())
      .sort((a, b) => b.mangaCount - a.mangaCount); // Sort by manga count descending
  }

  async getCategoryByName(name: string): Promise<Category | undefined> {
    await this.loadData();
    return this.categories.get(name.toLowerCase());
  }

  // Reading progress operations
  async getReadingProgress(mangaId: string): Promise<ReadingProgress | undefined> {
    return this.readingProgress.get(mangaId);
  }

  async getBulkReadingProgress(mangaIds: string[]): Promise<Record<string, ReadingProgress>> {
    const result: Record<string, ReadingProgress> = {};
    for (const mangaId of mangaIds) {
      const progress = this.readingProgress.get(mangaId);
      if (progress) {
        result[mangaId] = progress;
      }
    }
    return result;
  }

  async saveReadingProgress(progress: InsertReadingProgress): Promise<ReadingProgress> {
    const id = randomUUID();
    const readingProgress: ReadingProgress = {
      id,
      ...progress,
    };
    
    // Store by mangaId for easy lookup (one progress per manga)
    this.readingProgress.set(progress.mangaId, readingProgress);
    return readingProgress;
  }

  async getAllReadingProgress(): Promise<ReadingProgress[]> {
    return Array.from(this.readingProgress.values());
  }
}

export const storage = new FileStorage();