import { useRoute } from "wouter";
import { MangaGrid } from "@/components/MangaGrid";
import { Badge } from "@/components/ui/badge";
import type { Manga } from "@shared/schema";

// TODO: Remove mock data when backend is connected
const mockMangaByCategory: Record<string, Manga[]> = {
  action: [
    {
      id: "1",
      title: "Shadow Warrior Chronicles",
      author: "Akira Tanaka",
      genre: ["Action", "Adventure", "Supernatural"],
      status: "ongoing",
      description: "Epic battles and supernatural powers.",
      coverImage: "/src/../../../attached_assets/generated_images/Action_manga_cover_art_43daefaa.png",
      chapters: [],
      rating: 9.2,
      views: 125000,
      isPopular: true,
    },
    {
      id: "6",
      title: "Digital Samurai",
      author: "Ryu Kimura",
      genre: ["Sci-Fi", "Action"],
      status: "completed",
      description: "Cyberpunk samurai action.",
      coverImage: "/src/../../../attached_assets/generated_images/Action_manga_cover_art_43daefaa.png",
      chapters: [],
      rating: 8.8,
      views: 92000,
    },
  ],
  romance: [
    {
      id: "2",
      title: "Cherry Blossom Dreams",
      author: "Yuki Nakamura",
      genre: ["Romance", "School", "Drama"],
      status: "completed",
      description: "First love under cherry blossoms.",
      coverImage: "/src/../../../attached_assets/generated_images/Romance_manga_cover_art_d78f4ca7.png",
      chapters: [],
      rating: 8.7,
      views: 89000,
    },
  ],
  fantasy: [
    {
      id: "3",
      title: "Mystic Realms",
      author: "Hiroshi Sato",
      genre: ["Fantasy", "Magic", "Adventure"],
      status: "ongoing",
      description: "Magical portals and epic adventures.",
      coverImage: "/src/../../../attached_assets/generated_images/Fantasy_manga_cover_art_910ab3b7.png",
      chapters: [],
      rating: 8.9,
      views: 67000,
    },
  ],
  horror: [
    {
      id: "4",
      title: "Midnight Terrors",
      author: "Kenji Yamamoto",
      genre: ["Horror", "Thriller", "Supernatural"],
      status: "ongoing",
      description: "Creatures from the darkness.",
      coverImage: "/src/../../../attached_assets/generated_images/Horror_manga_cover_art_a6e4b504.png",
      chapters: [],
      rating: 8.5,
      views: 45000,
    },
  ],
  comedy: [
    {
      id: "5",
      title: "Lucky Star Academy",
      author: "Miki Tanaka",
      genre: ["Comedy", "School", "Slice of Life"],
      status: "ongoing",
      description: "Hilarious school misadventures.",
      coverImage: "/src/../../../attached_assets/generated_images/Comedy_manga_cover_art_5c7e6802.png",
      chapters: [],
      rating: 8.1,
      views: 38000,
    },
  ],
};

const categoryDescriptions: Record<string, string> = {
  action: "High-octane adventures filled with intense battles, martial arts, and epic confrontations.",
  romance: "Heartwarming stories of love, relationships, and emotional journeys.",
  fantasy: "Magical worlds filled with mystical creatures, ancient powers, and epic quests.",
  horror: "Spine-chilling tales that delve into the darkness and supernatural terrors.",
  comedy: "Hilarious stories that bring joy and laughter through clever humor and funny situations.",
};

export default function CategoryPage() {
  const [, params] = useRoute("/categories/:category");
  const category = params?.category || "";
  
  const categoryManga = mockMangaByCategory[category] || [];
  const categoryName = category.charAt(0).toUpperCase() + category.slice(1);
  const description = categoryDescriptions[category] || "";

  return (
    <div className="min-h-screen bg-background">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Header */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <h1 className="text-4xl font-display font-bold text-foreground">
                {categoryName}
              </h1>
              <Badge variant="secondary" className="text-sm">
                {categoryManga.length} manga
              </Badge>
            </div>
            
            {description && (
              <p className="text-lg text-muted-foreground max-w-3xl">
                {description}
              </p>
            )}
          </div>

          {/* Manga Grid */}
          {categoryManga.length > 0 ? (
            <MangaGrid manga={categoryManga} />
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">
                No manga found in this category yet.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}