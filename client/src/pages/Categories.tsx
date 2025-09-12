import { CategoryList } from "@/components/CategoryList";
import type { Category } from "@shared/schema";

// TODO: Remove mock data when backend is connected
const mockCategories: Category[] = [
  {
    id: "1",
    name: "Action",
    description: "High-octane adventures filled with intense battles, martial arts, and epic confrontations that will keep you on the edge of your seat.",
    mangaCount: 1247,
  },
  {
    id: "2", 
    name: "Romance",
    description: "Heartwarming stories of love, relationships, and emotional journeys that explore the depths of human connection.",
    mangaCount: 892,
  },
  {
    id: "3",
    name: "Fantasy",
    description: "Magical worlds filled with mystical creatures, ancient powers, and epic quests that transport you to realms beyond imagination.",
    mangaCount: 756,
  },
  {
    id: "4",
    name: "Horror",
    description: "Spine-chilling tales that delve into the darkness of human nature and supernatural terrors that lurk in the shadows.",
    mangaCount: 423,
  },
  {
    id: "5",
    name: "Comedy",
    description: "Hilarious stories that bring joy and laughter through clever humor, funny situations, and loveable characters.",
    mangaCount: 634,
  },
  {
    id: "6",
    name: "Sci-Fi",
    description: "Futuristic tales exploring advanced technology, space exploration, and the possibilities of tomorrow's world.",
    mangaCount: 567,
  },
  {
    id: "7",
    name: "Drama",
    description: "Emotionally compelling stories that explore complex human relationships and life's most challenging moments.",
    mangaCount: 445,
  },
  {
    id: "8",
    name: "Slice of Life",
    description: "Realistic portrayals of everyday experiences that find beauty and meaning in ordinary moments.",
    mangaCount: 389,
  },
  {
    id: "9",
    name: "Mystery",
    description: "Intriguing puzzles and suspenseful investigations that challenge readers to solve complex cases alongside the protagonists.",
    mangaCount: 312,
  },
];

export default function Categories() {
  return (
    <div className="min-h-screen bg-background">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-display font-bold text-foreground">
              Browse Categories
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover manga across all your favorite genres. From action-packed adventures to heartwarming romances, find the perfect story for your mood.
            </p>
          </div>

          {/* Categories Grid */}
          <CategoryList categories={mockCategories} />
        </div>
      </main>
    </div>
  );
}