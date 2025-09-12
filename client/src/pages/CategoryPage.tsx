import { useRoute } from "wouter";
import { MangaGrid } from "@/components/MangaGrid";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import type { Manga } from "@shared/schema";


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
  
  const { data: categoryManga = [], isLoading } = useQuery({
    queryKey: [`/api/categories/${category}`],
  });

  const categoryName = category.charAt(0).toUpperCase() + category.slice(1);
  const description = categoryDescriptions[category] || "";

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading {categoryName} manga...</p>
        </div>
      </div>
    );
  }

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