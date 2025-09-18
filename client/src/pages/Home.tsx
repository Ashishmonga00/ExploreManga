import { HeroSection } from "@/components/HeroSection";
import { MangaGrid } from "@/components/MangaGrid";
import { SEO } from "@/components/SEO";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Star, BookOpen, Users, TrendingUp, Clock, Search, Heart, Filter } from "lucide-react";
import { Link, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import type { Manga } from "@shared/schema";


export default function Home() {
  const [, setLocation] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  
  const { data: featuredManga = [], isLoading: featuredLoading } = useQuery<Manga[]>({
    queryKey: ['/api/manga?featured=true'],
  });

  const { data: popularManga = [], isLoading: popularLoading } = useQuery<Manga[]>({
    queryKey: ['/api/manga?popular=true'],
  });

  const { data: allManga = [], isLoading: allLoading } = useQuery<Manga[]>({
    queryKey: ['/api/manga'],
  });
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setLocation(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

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
  const trendingGenres = ["Action", "Romance", "Comedy", "Drama", "Fantasy", "Horror", "Slice of Life", "Adventure"];

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Explore Manga - Read Manga Online Free | Thousands of Titles"
        description="Discover and read thousands of manga online for free. From popular series to hidden gems, action to romance - find your next favorite manga at Explore Manga."
        keywords="manga, read manga online, free manga, manga reader, japanese comics, manga library, online comics, https://exploremanga.com/, explore manga"
        type="website"
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Search Section */}
        <section className="text-center space-y-6 py-8">
          <div className="space-y-2">
            <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground">
              Discover Amazing Manga
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Search through thousands of manga titles, or explore by category
            </p>
          </div>
          
          <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto">
            <Input
              type="search"
              placeholder="Search for manga, authors, or genres..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-12 pl-10 pr-20 rounded-md"
              data-testid="input-homepage-search"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Button 
              type="submit" 
              size="sm" 
              className="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-md"
              data-testid="button-homepage-search"
            >
              Search
            </Button>
          </form>
          
          {/* Quick Category Filters */}
          <div className="flex flex-wrap justify-center gap-2 max-w-4xl mx-auto">
            {trendingGenres.map((genre) => (
              <Link key={genre} href={`/categories/${genre.toLowerCase()}`}>
                <Badge 
                  variant="outline" 
                  className="cursor-pointer hover-elevate text-sm px-3 py-1"
                  data-testid={`badge-genre-${genre.toLowerCase()}`}
                >
                  {genre}
                </Badge>
              </Link>
            ))}
          </div>
        </section>
        
        {/* Compact Hero Section */}
        <HeroSection featuredManga={featuredManga} />

        {/* Trending Now - Horizontal Scroll */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-display font-bold text-foreground">Trending Now</h2>
            <Link href="/categories">
              <Button variant="ghost" size="sm" className="text-primary" data-testid="button-view-all-trending">
                View All
                <Filter className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="flex overflow-x-auto gap-4 pb-4 scrollbar-hide scroll-smooth-x snap-x">
            {popularManga.slice(0, 8).map((manga) => (
              <div key={manga.id} className="scroll-snap-center">
                <Link href={`/manga/${manga.id}`}>
                  <Card className="min-w-[140px] hover-elevate cursor-pointer">
                    <CardContent className="p-0">
                      <div className="aspect-[3/4] relative overflow-hidden rounded-t-lg">
                        <img
                          src={manga.coverImage || manga.cover_image}
                          alt={manga.title}
                          className="w-full h-full object-cover"
                          data-testid={`img-trending-${manga.id}`}
                        />
                        <div className="absolute top-2 right-2">
                          <Badge variant="secondary" className="text-xs">
                            <TrendingUp className="h-3 w-3 mr-1" />
                            Hot
                          </Badge>
                        </div>
                      </div>
                      <div className="p-3">
                        <h3 className="font-medium text-sm line-clamp-2 mb-1" data-testid={`text-trending-title-${manga.id}`}>
                          {manga.title}
                        </h3>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Star className="h-3 w-3 fill-current text-yellow-500" />
                          <span>{(manga.rating || 0).toFixed(1)}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* Recently Added */}
        <MangaGrid
          manga={recentManga}
          title="Recently Added"
        />

        {/* Popular This Week */}
        <MangaGrid
          manga={popularManga}
          title="Popular This Week"
        />
        
        {/* Statistics Section */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4 py-6">
          <Card className="bg-muted/30">
            <CardContent className="flex flex-col items-center justify-center p-4">
              <BookOpen className="h-6 w-6 text-primary mb-2" />
              <div className="text-xl font-bold text-foreground">{allManga.length}+</div>
              <div className="text-xs text-muted-foreground text-center">Manga Titles</div>
            </CardContent>
          </Card>
          
          <Card className="bg-muted/30">
            <CardContent className="flex flex-col items-center justify-center p-4">
              <TrendingUp className="h-6 w-6 text-primary mb-2" />
              <div className="text-xl font-bold text-foreground">Daily</div>
              <div className="text-xs text-muted-foreground text-center">Updates</div>
            </CardContent>
          </Card>
          
          <Card className="bg-muted/30">
            <CardContent className="flex flex-col items-center justify-center p-4">
              <Star className="h-6 w-6 text-primary mb-2" />
              <div className="text-xl font-bold text-foreground">HD</div>
              <div className="text-xs text-muted-foreground text-center">Quality</div>
            </CardContent>
          </Card>
          
          <Card className="bg-muted/30">
            <CardContent className="flex flex-col items-center justify-center p-4">
              <Heart className="h-6 w-6 text-primary mb-2" />
              <div className="text-xl font-bold text-foreground">Free</div>
              <div className="text-xs text-muted-foreground text-center">Always</div>
            </CardContent>
          </Card>
        </section>

        {/* Quick Actions */}
        <section className="text-center py-8 bg-muted/20 rounded-lg">
          <h2 className="text-2xl font-bold text-foreground mb-2">Ready to Start Reading?</h2>
          <p className="text-muted-foreground mb-6">
            Explore our vast collection of manga titles - all completely free.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link href="/categories">
              <Button size="lg">
                <BookOpen className="mr-2 h-4 w-4" />
                Browse Categories
              </Button>
            </Link>
            <Link href="/authors">
              <Button variant="outline" size="lg">
                <Users className="mr-2 h-4 w-4" />
                Explore Authors
              </Button>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}