import { useRoute, Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Star, Eye, BookOpen, Calendar, User } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import type { Manga } from "@shared/schema";


export default function MangaDetail() {
  const [, params] = useRoute("/manga/:id");
  const mangaId = params?.id || "";
  
  const { data: manga, isLoading, error } = useQuery({
    queryKey: [`/api/manga/${mangaId}`],
    enabled: !!mangaId,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading manga details...</p>
        </div>
      </div>
    );
  }

  if (!manga || error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-2">Manga Not Found</h1>
          <p className="text-muted-foreground">The requested manga could not be found.</p>
          <Link href="/">
            <Button className="mt-4">Return Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleReadChapter = (chapterNo: number) => {
    console.log(`Reading chapter ${chapterNo} of ${manga.title}`);
    // TODO: Navigate to chapter reader
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cover and Basic Info */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardContent className="p-0">
                <div className="aspect-[3/4] relative overflow-hidden rounded-t-lg">
                  <img
                    src={manga.coverImage || manga.cover_image}
                    alt={manga.title}
                    className="w-full h-full object-cover"
                    data-testid={`img-manga-detail-cover-${manga.id}`}
                  />
                </div>
                
                <div className="p-6 space-y-4">
                  <div className="space-y-2">
                    <h1 className="text-xl font-display font-bold" data-testid={`text-manga-detail-title-${manga.id}`}>
                      {manga.title}
                    </h1>
                    
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <User className="h-4 w-4" />
                      <span data-testid={`text-manga-detail-author-${manga.id}`}>{manga.author}</span>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-current text-yellow-500" />
                        <span className="font-medium" data-testid={`text-manga-detail-rating-${manga.id}`}>
                          {(manga.rating || 0).toFixed(1)}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Eye className="h-4 w-4" />
                        <span data-testid={`text-manga-detail-views-${manga.id}`}>
                          {(manga.views || 0).toLocaleString()}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <p className="text-sm font-medium">Status</p>
                      <Badge 
                        variant={manga.status === "completed" ? "secondary" : "default"}
                        data-testid={`badge-manga-detail-status-${manga.id}`}
                      >
                        {manga.status}
                      </Badge>
                    </div>

                    <div className="space-y-2">
                      <p className="text-sm font-medium">Genres</p>
                      <div className="flex flex-wrap gap-2">
                        {(manga.genre || []).map((genre) => (
                          <Badge key={genre} variant="outline" className="text-xs">
                            {genre}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <Button 
                    size="lg" 
                    className="w-full"
                    onClick={() => handleReadChapter(1)}
                    data-testid={`button-start-reading-${manga.id}`}
                  >
                    <BookOpen className="mr-2 h-4 w-4" />
                    Start Reading
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Description and Chapters */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <Card>
              <CardHeader>
                <CardTitle>Synopsis</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed" data-testid={`text-manga-detail-description-${manga.id}`}>
                  {manga.description || manga.summary}
                </p>
              </CardContent>
            </Card>

            {/* Chapters */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Chapters</span>
                  <Badge variant="secondary">
                    {manga.chapters.length} chapters
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {manga.chapters.map((chapter, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 rounded-md border hover:bg-muted/50 transition-colors cursor-pointer hover-elevate"
                      onClick={() => handleReadChapter(chapter.chapter_no)}
                      data-testid={`chapter-item-${index}`}
                    >
                      <div className="space-y-1">
                        <p className="font-medium">
                          Chapter {chapter.chapter_no}: {chapter.title}
                        </p>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          <span>{chapter.page_count} pages</span>
                        </div>
                      </div>
                      <BookOpen className="h-4 w-4 text-muted-foreground" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}