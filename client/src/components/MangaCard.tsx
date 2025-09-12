import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Eye } from "lucide-react";
import { Link } from "wouter";
import type { Manga } from "@shared/schema";

interface MangaCardProps {
  manga: Manga;
  showStats?: boolean;
}

export function MangaCard({ manga, showStats = true }: MangaCardProps) {
  return (
    <Link href={`/manga/${manga.id}`}>
      <Card className="group cursor-pointer hover-elevate transition-all duration-300">
        <CardContent className="p-0">
          {/* Cover Image */}
          <div className="relative aspect-[3/4] overflow-hidden rounded-t-lg">
            <img
              src={manga.coverImage}
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
            
            {/* Featured/Popular Badges */}
            {manga.isFeatured && (
              <Badge variant="destructive" className="absolute top-2 left-2 text-xs">
                Featured
              </Badge>
            )}
            {manga.isPopular && !manga.isFeatured && (
              <Badge variant="default" className="absolute top-2 left-2 text-xs">
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
              {manga.genre.slice(0, 2).map((genre) => (
                <Badge key={genre} variant="outline" className="text-xs">
                  {genre}
                </Badge>
              ))}
              {manga.genre.length > 2 && (
                <Badge variant="outline" className="text-xs">
                  +{manga.genre.length - 2}
                </Badge>
              )}
            </div>

            {/* Stats */}
            {showStats && (
              <div className="flex items-center justify-between text-xs text-muted-foreground pt-2">
                <div className="flex items-center gap-1">
                  <Star className="h-3 w-3 fill-current text-yellow-500" />
                  <span data-testid={`text-manga-rating-${manga.id}`}>
                    {manga.rating.toFixed(1)}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <Eye className="h-3 w-3" />
                  <span data-testid={`text-manga-views-${manga.id}`}>
                    {manga.views.toLocaleString()}
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