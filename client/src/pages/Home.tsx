import { HeroSection } from "@/components/HeroSection";
import { MangaGrid } from "@/components/MangaGrid";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, BookOpen, Users, TrendingUp, Clock, Search, Heart } from "lucide-react";
import { Link } from "wouter";
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
      <SEO 
        title="MangaLibrary - Read Manga Online Free | Thousands of Titles"
        description="Discover and read thousands of manga online for free. From popular series to hidden gems, action to romance - find your next favorite manga at MangaLibrary."
        keywords="manga, read manga online, free manga, manga reader, japanese comics, manga library, online comics"
        type="website"
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        {/* Hero Section */}
        <HeroSection featuredManga={featuredManga} />

        {/* Statistics Section */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="flex flex-col items-center justify-center p-6">
              <BookOpen className="h-8 w-8 text-primary mb-2" />
              <div className="text-2xl font-bold text-foreground">{allManga.length}+</div>
              <div className="text-sm text-muted-foreground text-center">Manga Titles</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="flex flex-col items-center justify-center p-6">
              <TrendingUp className="h-8 w-8 text-primary mb-2" />
              <div className="text-2xl font-bold text-foreground">Daily</div>
              <div className="text-sm text-muted-foreground text-center">Updates</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="flex flex-col items-center justify-center p-6">
              <Star className="h-8 w-8 text-primary mb-2" />
              <div className="text-2xl font-bold text-foreground">HD</div>
              <div className="text-sm text-muted-foreground text-center">Quality</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="flex flex-col items-center justify-center p-6">
              <Heart className="h-8 w-8 text-primary mb-2" />
              <div className="text-2xl font-bold text-foreground">Free</div>
              <div className="text-sm text-muted-foreground text-center">Always</div>
            </CardContent>
          </Card>
        </section>

        {/* Popular Manga */}
        <MangaGrid
          manga={popularManga}
          title="Popular This Week"
        />

        {/* Features Section */}
        <section className="bg-muted/30 rounded-lg p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-2">Why Choose MangaLibrary?</h2>
            <p className="text-muted-foreground">Your ultimate destination for reading manga online</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <Search className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">Easy Discovery</h3>
              <p className="text-muted-foreground">Search by title, author, or genre. Find exactly what you're looking for with our powerful search and filtering system.</p>
            </div>
            
            <div className="text-center">
              <Clock className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">Regular Updates</h3>
              <p className="text-muted-foreground">Stay up-to-date with the latest chapters. We add new content regularly so you never miss your favorite series.</p>
            </div>
            
            <div className="text-center">
              <Users className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">Community Driven</h3>
              <p className="text-muted-foreground">Join thousands of manga readers. Discover new series through our curated recommendations and popular picks.</p>
            </div>
          </div>
          
          <div className="text-center mt-8">
            <Link href="/categories">
              <Button size="lg" className="mr-4">
                Browse All Categories
              </Button>
            </Link>
            <Link href="/authors">
              <Button variant="outline" size="lg">
                Explore Authors
              </Button>
            </Link>
          </div>
        </section>

        {/* Recently Added */}
        <MangaGrid
          manga={recentManga}
          title="Recently Added"
        />

        {/* Call to Action */}
        <section className="text-center py-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">Start Your Manga Journey Today</h2>
          <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
            Join millions of readers worldwide. Discover your next favorite series, follow ongoing stories, 
            and explore the vast world of manga - all completely free.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/categories">
              <Button size="lg">
                <BookOpen className="mr-2 h-5 w-5" />
                Start Reading
              </Button>
            </Link>
            <Button variant="outline" size="lg" onClick={() => {
              const searchInput = document.querySelector('[data-testid="input-search"]') as HTMLInputElement;
              if (searchInput) {
                searchInput.focus();
              }
            }}>
              <Search className="mr-2 h-5 w-5" />
              Search Manga
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}