import { useRoute, Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Star, Eye, BookOpen, Calendar, User } from "lucide-react";
import type { Manga } from "@shared/schema";

// TODO: Remove mock data when backend is connected
const mockMangaDetails: Record<string, Manga> = {
  "1": {
    id: "1",
    title: "Shadow Warrior Chronicles",
    author: "Akira Tanaka",
    genre: ["Action", "Adventure", "Supernatural"],
    status: "ongoing",
    description: "In a world where shadows hold ancient powers, a young warrior named Kage discovers he possesses the rare ability to manipulate darkness itself. When his village is attacked by otherworldly creatures known as Voidlings, Kage must master the forbidden Shadow Arts to protect those he loves. But with each use of his power, he risks losing himself to the very darkness he wields. Join Kage on an epic journey of self-discovery, intense battles, and the struggle between light and shadow.",
    coverImage: "/src/../../../attached_assets/generated_images/Action_manga_cover_art_43daefaa.png",
    chapters: [
      { id: "1-1", number: 1, title: "The Shadow Awakens", releaseDate: "2024-01-15" },
      { id: "1-2", number: 2, title: "First Blood", releaseDate: "2024-01-22" },
      { id: "1-3", number: 3, title: "The Village Burns", releaseDate: "2024-01-29" },
      { id: "1-4", number: 4, title: "Master of Darkness", releaseDate: "2024-02-05" },
      { id: "1-5", number: 5, title: "The Forbidden Technique", releaseDate: "2024-02-12" },
    ],
    rating: 9.2,
    views: 125000,
    isPopular: true,
    isFeatured: true,
  },
};

export default function MangaDetail() {
  const [, params] = useRoute("/manga/:id");
  const mangaId = params?.id || "";
  
  const manga = mockMangaDetails[mangaId];

  if (!manga) {
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

  const handleReadChapter = (chapterNumber: number) => {
    console.log(`Reading chapter ${chapterNumber} of ${manga.title}`);
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
                    src={manga.coverImage}
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
                          {manga.rating.toFixed(1)}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Eye className="h-4 w-4" />
                        <span data-testid={`text-manga-detail-views-${manga.id}`}>
                          {manga.views.toLocaleString()}
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
                        {manga.genre.map((genre) => (
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
                  {manga.description}
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
                  {manga.chapters.map((chapter) => (
                    <div
                      key={chapter.id}
                      className="flex items-center justify-between p-3 rounded-md border hover:bg-muted/50 transition-colors cursor-pointer hover-elevate"
                      onClick={() => handleReadChapter(chapter.number)}
                      data-testid={`chapter-item-${chapter.id}`}
                    >
                      <div className="space-y-1">
                        <p className="font-medium">
                          Chapter {chapter.number}: {chapter.title}
                        </p>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          <span>{new Date(chapter.releaseDate).toLocaleDateString()}</span>
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