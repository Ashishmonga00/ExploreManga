import { useRoute, useLocation, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ChevronLeft, ChevronRight, ArrowLeft, BookOpen } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import type { Manga } from "@shared/schema";

export default function ChapterReader() {
  const [, params] = useRoute("/manga/:id/chapter/:chapterNo");
  const [, setLocation] = useLocation();
  
  const mangaId = params?.id || "";
  const chapterNo = Number(params?.chapterNo) || 1;

  const { data: manga, isLoading, error } = useQuery<Manga>({
    queryKey: [`/api/manga/${mangaId}`],
    enabled: !!mangaId,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading chapter...</p>
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

  const currentChapter = manga.chapters.find(c => c.chapter_no === chapterNo);
  
  if (!currentChapter) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-2">Chapter Not Found</h1>
          <p className="text-muted-foreground">The requested chapter could not be found.</p>
          <Link href={`/manga/${mangaId}`}>
            <Button className="mt-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Return to Manga
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const currentChapterIndex = manga.chapters.findIndex(c => c.chapter_no === chapterNo);
  const prevChapter = currentChapterIndex > 0 ? manga.chapters[currentChapterIndex - 1] : null;
  const nextChapter = currentChapterIndex < manga.chapters.length - 1 ? manga.chapters[currentChapterIndex + 1] : null;

  const navigateToChapter = (targetChapterNo: number) => {
    setLocation(`/manga/${mangaId}/chapter/${targetChapterNo}`);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header with navigation */}
      <div className="sticky top-0 z-50 bg-background border-b">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Link href={`/manga/${mangaId}`}>
                <Button variant="ghost" size="sm" data-testid="button-back-to-manga">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
              </Link>
              <div className="space-y-1">
                <h1 className="font-bold text-lg" data-testid="text-manga-title">
                  {manga.title}
                </h1>
                <p className="text-sm text-muted-foreground" data-testid="text-chapter-info">
                  Chapter {currentChapter.chapter_no}: {currentChapter.title}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigateToChapter(prevChapter!.chapter_no)}
                disabled={!prevChapter}
                data-testid="button-prev-chapter"
              >
                <ChevronLeft className="h-4 w-4" />
                Prev
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigateToChapter(nextChapter!.chapter_no)}
                disabled={!nextChapter}
                data-testid="button-next-chapter"
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Chapter images */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="space-y-4">
          <Card>
            <CardHeader className="text-center">
              <div className="flex items-center justify-center gap-2">
                <BookOpen className="h-5 w-5" />
                <span className="font-medium">
                  Chapter {currentChapter.chapter_no} - {currentChapter.page_count} pages
                </span>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-2">
                {currentChapter.images.map((imageUrl, index) => (
                  <div key={index} className="relative">
                    <img
                      src={imageUrl}
                      alt={`Chapter ${currentChapter.chapter_no} - Page ${index + 1}`}
                      className="w-full h-auto"
                      loading="lazy"
                      data-testid={`img-chapter-page-${index}`}
                    />
                    <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
                      {index + 1} / {currentChapter.page_count}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Bottom navigation */}
          <div className="flex items-center justify-between py-4">
            <Button
              variant="outline"
              onClick={() => navigateToChapter(prevChapter!.chapter_no)}
              disabled={!prevChapter}
              data-testid="button-prev-chapter-bottom"
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              Previous Chapter
            </Button>

            <Link href={`/manga/${mangaId}`}>
              <Button variant="secondary" data-testid="button-manga-detail-bottom">
                <BookOpen className="mr-2 h-4 w-4" />
                Manga Details
              </Button>
            </Link>

            <Button
              variant="outline"
              onClick={() => navigateToChapter(nextChapter!.chapter_no)}
              disabled={!nextChapter}
              data-testid="button-next-chapter-bottom"
            >
              Next Chapter
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}