import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SEO } from "@/components/SEO";
import { Link } from "wouter";
import { User, BookOpen, Search } from "lucide-react";
import type { Manga } from "@shared/schema";

export default function Authors() {
  const { data: allManga = [], isLoading, error } = useQuery<Manga[]>({
    queryKey: ['/api/manga'],
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading authors...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-2">Error Loading Authors</h1>
          <p className="text-muted-foreground">There was an error loading the authors list.</p>
          <Link href="/">
            <Button className="mt-4">Return Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  // Extract unique authors from all manga
  const authorsMap = new Map<string, { name: string; mangaCount: number; manga: Manga[] }>();

  allManga.forEach(manga => {
    const authorName = manga.author || "Unknown Author";
    if (authorsMap.has(authorName)) {
      const author = authorsMap.get(authorName)!;
      author.mangaCount += 1;
      author.manga.push(manga);
    } else {
      authorsMap.set(authorName, {
        name: authorName,
        mangaCount: 1,
        manga: [manga]
      });
    }
  });

  const authors = Array.from(authorsMap.values())
    .sort((a, b) => b.mangaCount - a.mangaCount); // Sort by manga count descending

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Manga Authors - Browse by Author | Explore Manga"
        description={`Explore manga by your favorite authors. Browse our collection of ${authors.length} manga authors and discover new series from talented creators.`}
        keywords="manga authors, manga creators, author browse, manga by author"
        type="website"
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <User className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold text-foreground">Authors</h1>
          </div>
          <p className="text-muted-foreground">
            Discover manga by your favorite authors. Browse our collection of {authors.length} authors.
          </p>
        </div>

        {/* Authors Grid */}
        {authors.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {authors.map((author) => (
              <Card key={author.name} className="hover-elevate transition-all duration-200">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <User className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <CardTitle className="text-lg truncate" data-testid={`text-author-name-${author.name.toLowerCase().replace(/\s+/g, '-')}`}>
                        {author.name}
                      </CardTitle>
                      <div className="flex items-center gap-1 mt-1">
                        <BookOpen className="h-3 w-3 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          {author.mangaCount} manga{author.mangaCount !== 1 ? 's' : ''}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  {/* Sample manga covers */}
                  <div className="grid grid-cols-3 gap-2">
                    {author.manga.slice(0, 3).map((manga, index) => (
                      <div key={manga.id} className="aspect-[3/4] relative overflow-hidden rounded-md">
                        <img
                          src={manga.cover_image || manga.coverImage}
                          alt={manga.title}
                          className="w-full h-full object-cover"
                        />
                        {index === 2 && author.mangaCount > 3 && (
                          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                            <span className="text-white text-sm font-medium">
                              +{author.mangaCount - 3}
                            </span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Popular genres by this author */}
                  <div className="space-y-2">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                      Popular Genres
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {Array.from(new Set(
                        author.manga.flatMap(manga => manga.genre || [])
                      ))
                        .slice(0, 3)
                        .map(genre => (
                          <Badge key={genre} variant="secondary" className="text-xs">
                            {genre}
                          </Badge>
                        ))
                      }
                    </div>
                  </div>

                  {/* Search by author button */}
                  <Link href={`/search?q=${encodeURIComponent(author.name)}`}>
                    <Button 
                      className="w-full" 
                      size="sm"
                      data-testid={`button-view-author-${author.name.toLowerCase().replace(/\s+/g, '-')}`}
                    >
                      <Search className="mr-2 h-3 w-3" />
                      View All Works
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <User className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h2 className="text-xl font-semibold text-foreground mb-2">No Authors Found</h2>
            <p className="text-muted-foreground">No authors are available at the moment.</p>
          </div>
        )}
      </main>
    </div>
  );
}