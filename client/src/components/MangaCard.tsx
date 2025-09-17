import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Eye, BookOpen } from "lucide-react";
import { Link } from "wouter";
import { useMemo } from "react";
import type { Manga, ReadingProgress } from "@shared/schema";

interface MangaCardProps {
  manga: Manga;
  showStats?: boolean;
  readingProgress?: ReadingProgress;
}

export function MangaCard({ manga, showStats = true, readingProgress }: MangaCardProps) {

  // Memoize calculations for stable refs and better performance
  const { chapterLink, progressPercentage, hasProgress } = useMemo(() => {
    // Determine which chapter to link to
    const getChapterLink = () => {
      // If there are no chapters, go to manga detail page
      if (!manga.chapters || manga.chapters.length === 0) {
        return `/manga/${manga.id}`;
      }

      // If there's reading progress, go to the last read chapter
      if (readingProgress) {
        return `/manga/${manga.id}/chapter/${readingProgress.chapterNo}`;
      }

      // Otherwise, go to the first chapter
      const firstChapter = Math.min(...manga.chapters.map(ch => ch.chapter_no));
      return `/manga/${manga.id}/chapter/${firstChapter}`;
    };

    // Calculate reading progress percentage based on chapter index, not raw chapter number
    const getProgressPercentage = () => {
      if (!readingProgress || !manga.chapters || manga.chapters.length === 0) {
        return 0;
      }
      
      // Sort chapters by chapter number to get proper ordering
      const sortedChapters = [...manga.chapters].sort((a, b) => a.chapter_no - b.chapter_no);
      
      // Find the index of the current chapter in the sorted array
      const currentChapterIndex = sortedChapters.findIndex(ch => ch.chapter_no === readingProgress.chapterNo);
      
      if (currentChapterIndex === -1) {
        return 0;
      }
      
      // Calculate percentage based on chapter index (0-based) + 1 to represent completion of that chapter
      return Math.round(((currentChapterIndex + 1) / sortedChapters.length) * 100);
    };

    const percentage = getProgressPercentage();
    
    return {
      chapterLink: getChapterLink(),
      progressPercentage: percentage,
      hasProgress: readingProgress && percentage > 0
    };
  }, [manga.chapters, manga.id, readingProgress]);

  return (
    <Link href={chapterLink} data-testid={`link-manga-card-${manga.id}`}>
      <Card className="group cursor-pointer hover-elevate transition-all duration-300">
        <CardContent className="p-0">
          {/* Cover Image */}
          <div className="relative aspect-[3/4] overflow-hidden rounded-t-lg">
            <img
              src={manga.coverImage || manga.cover_image}
              alt={manga.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
              data-testid={`img-manga-cover-${manga.id}`}
            />
            
            {/* Status Badge */}
            <Badge
              variant={manga.status === "completed" ? "secondary" : "default"}
              className="absolute top-2 right-2 text-xs"
            >
              {manga.status}
            </Badge>
            
            {/* Reading Progress Badge */}
            {hasProgress && (
              <Badge variant="secondary" className="absolute top-2 left-2 text-xs bg-primary/90 text-primary-foreground">
                <BookOpen className="h-3 w-3 mr-1" />
                {progressPercentage}%
              </Badge>
            )}

            {/* Featured/Popular Badges - shifted down if progress exists */}
            {manga.isFeatured && (
              <Badge 
                variant="destructive" 
                className={`absolute text-xs ${hasProgress ? 'top-8 left-2' : 'top-2 left-2'}`}
              >
                Featured
              </Badge>
            )}
            {manga.isPopular && !manga.isFeatured && (
              <Badge 
                variant="default" 
                className={`absolute text-xs ${hasProgress ? 'top-8 left-2' : 'top-2 left-2'}`}
              >
                Popular
              </Badge>
            )}

            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>

          {/* Content */}
          <div className="p-4 space-y-2">
            <h3 
              className="font-display font-semibold text-sm line-clamp-2 group-hover:text-primary transition-colors"
              data-testid={`text-manga-title-${manga.id}`}
            >
              {manga.title}
            </h3>
            
            <p className="text-xs text-muted-foreground" data-testid={`text-manga-author-${manga.id}`}>
              by {manga.author}
            </p>

            {/* Genres */}
            <div className="flex flex-wrap gap-1">
              {(manga.genre || []).slice(0, 2).map((genre) => (
                <Badge key={genre} variant="outline" className="text-xs">
                  {genre}
                </Badge>
              ))}
              {(manga.genre && manga.genre.length > 2) && (
                <Badge variant="outline" className="text-xs">
                  +{(manga.genre?.length || 0) - 2}
                </Badge>
              )}
            </div>

            {/* Stats */}
            {showStats && (
              <div className="flex items-center justify-between text-xs text-muted-foreground pt-2">
                <div className="flex items-center gap-1">
                  <Star className="h-3 w-3 fill-current text-yellow-500" />
                  <span data-testid={`text-manga-rating-${manga.id}`}>
                    {(manga.rating || 0).toFixed(1)}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <Eye className="h-3 w-3" />
                  <span data-testid={`text-manga-views-${manga.id}`}>
                    {(manga.views || 0).toLocaleString()}
                  </span>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}