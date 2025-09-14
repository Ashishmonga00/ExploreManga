import { HeroSection } from "@/components/HeroSection";
import { MangaGrid } from "@/components/MangaGrid";
import { Footer } from "@/components/Footer";
import { useQuery } from "@tanstack/react-query";
import type { Manga } from "@shared/schema";


export default function Home() {
  const { data: featuredManga = [], isLoading: featuredLoading } = useQuery<Manga[]>({
    queryKey: ['/api/manga?featured=true'],
  });

  const { data: popularManga = [], isLoading: popularLoading } = useQuery<Manga[]>({
    queryKey: ['/api/manga?popular=true'],
  });

  const { data: allManga = [], isLoading: allLoading } = useQuery<Manga[]>({
    queryKey: ['/api/manga'],
  });

  if (featuredLoading || popularLoading || allLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading manga...</p>
        </div>
      </div>
    );
  }

  const recentManga = allManga.slice(0, 12);

  return (
    <div className="min-h-screen bg-background">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        {/* Hero Section */}
        <HeroSection featuredManga={featuredManga} />

        {/* Popular Manga */}
        <MangaGrid
          manga={popularManga}
          title="Popular This Week"
        />

        {/* Recently Added */}
        <MangaGrid
          manga={recentManga}
          title="Recently Added"
        />
      </main>
      <Footer />
    </div>
  );
}