import { useState, useEffect } from "react";
import { useRoute, useLocation, Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { SEO } from "@/components/SEO";
import { Star, Eye, BookOpen, Calendar, User, ArrowUpDown, ArrowUp, ArrowDown, Search, ChevronLeft, ChevronRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import type { Manga } from "@shared/schema";


export default function MangaDetail() {
  const [, params] = useRoute("/manga/:id");
  const [, setLocation] = useLocation();
  const mangaId = params?.id || "";
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [chapterSearch, setChapterSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const chaptersPerPage = 20; // Show 20 chapters per page
  
  const { data: manga, isLoading, error } = useQuery<Manga>({
    queryKey: [`/api/manga/${mangaId}`],
    enabled: !!mangaId,
  });

  // Scroll to top when component loads or manga changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [mangaId]);

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
    setLocation(`/manga/${mangaId}/chapter/${chapterNo}`);
  };

  // Reset to first page when search changes or sort changes
  const resetPagination = () => {
    setCurrentPage(1);
  };

  const sortedAndFilteredChapters = manga ? [...manga.chapters]
    .sort((a, b) => {
      return sortOrder === "asc" 
        ? a.chapter_no - b.chapter_no 
        : b.chapter_no - a.chapter_no;
    })
    .filter(chapter => {
      if (!chapterSearch.trim()) return true;
      const searchLower = chapterSearch.toLowerCase();
      return (
        chapter.title.toLowerCase().includes(searchLower) ||
        chapter.chapter_no.toString().includes(searchLower)
      );
    }) : [];

  // Pagination logic
  const totalChapters = sortedAndFilteredChapters.length;
  const totalPages = Math.ceil(totalChapters / chaptersPerPage);
  const startIndex = (currentPage - 1) * chaptersPerPage;
  const endIndex = startIndex + chaptersPerPage;
  const paginatedChapters = sortedAndFilteredChapters.slice(startIndex, endIndex);

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title={`${manga.title} - Read Online | MangaLibrary`}
        description={`Read ${manga.title} manga online for free. ${manga.description || manga.summary || `${manga.title} is available with all chapters on MangaLibrary.`}`}
        keywords={`${manga.title}, manga, read online, ${manga.author}, ${(manga.genre || []).join(', ')}`}
        image={manga.cover_image || manga.coverImage}
        type="article"
      />
      
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
                        {(manga.genre || []).map((genre: string) => (
                          <Link key={genre} href={`/categories/${genre.toLowerCase()}`}>
                            <Badge 
                              variant="outline" 
                              className="text-xs cursor-pointer hover-elevate" 
                              data-testid={`link-genre-${genre.toLowerCase()}`}
                            >
                              {genre}
                            </Badge>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <Button 
                    size="lg" 
                    className="w-full"
                    onClick={() => handleReadChapter(manga.chapters?.[0]?.chapter_no || 1)}
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
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <Button
                        variant={sortOrder === "asc" ? "default" : "outline"}
                        size="sm"
                        onClick={() => {
                          setSortOrder("asc");
                          resetPagination();
                        }}
                        data-testid="button-sort-first-to-last"
                      >
                        <ArrowUp className="h-3 w-3 mr-1" />
                        First to Last
                      </Button>
                      <Button
                        variant={sortOrder === "desc" ? "default" : "outline"}
                        size="sm"
                        onClick={() => {
                          setSortOrder("desc");
                          resetPagination();
                        }}
                        data-testid="button-sort-last-to-first"
                      >
                        <ArrowDown className="h-3 w-3 mr-1" />
                        Last to First
                      </Button>
                    </div>
                    <Badge variant="secondary">
                      {totalChapters > chaptersPerPage 
                        ? `Page ${currentPage} of ${totalPages} • ${totalChapters} chapters` 
                        : `${totalChapters}${chapterSearch ? ` of ${manga.chapters.length}` : ''} chapters`
                      }
                    </Badge>
                  </div>
                </CardTitle>
                <div className="mt-4">
                  <div className="relative">
                    <Input
                      type="search"
                      placeholder="Search chapters..."
                      value={chapterSearch}
                      onChange={(e) => {
                        setChapterSearch(e.target.value);
                        resetPagination();
                      }}
                      className="pl-10"
                      data-testid="input-chapter-search"
                    />
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {totalChapters > 0 ? (
                    paginatedChapters.map((chapter, index) => (
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
                  ))
                  ) : (
                    <div className="text-center py-8">
                      <Search className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
                      <p className="text-muted-foreground">
                        {chapterSearch ? `No chapters found matching "${chapterSearch}"` : "No chapters available"}
                      </p>
                      {chapterSearch && (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="mt-3"
                          onClick={() => setChapterSearch("")}
                        >
                          Clear Search
                        </Button>
                      )}
                    </div>
                  )}
                  
                  {/* Pagination Controls */}
                  {totalPages > 1 && (
                    <div className="flex items-center justify-between pt-4 border-t">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                        disabled={currentPage === 1}
                        data-testid="button-prev-page"
                      >
                        <ChevronLeft className="h-4 w-4 mr-1" />
                        Previous
                      </Button>
                      
                      <div className="flex items-center gap-2">
                        {/* Page Numbers */}
                        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                          let pageNum;
                          if (totalPages <= 5) {
                            pageNum = i + 1;
                          } else if (currentPage <= 3) {
                            pageNum = i + 1;
                          } else if (currentPage >= totalPages - 2) {
                            pageNum = totalPages - 4 + i;
                          } else {
                            pageNum = currentPage - 2 + i;
                          }
                          
                          return (
                            <Button
                              key={pageNum}
                              variant={currentPage === pageNum ? "default" : "outline"}
                              size="sm"
                              onClick={() => setCurrentPage(pageNum)}
                              className="w-8 h-8 p-0"
                              data-testid={`button-page-${pageNum}`}
                            >
                              {pageNum}
                            </Button>
                          );
                        })}
                        
                        {totalPages > 5 && currentPage < totalPages - 2 && (
                          <>
                            <span className="text-muted-foreground">...</span>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setCurrentPage(totalPages)}
                              className="w-8 h-8 p-0"
                              data-testid={`button-page-${totalPages}`}
                            >
                              {totalPages}
                            </Button>
                          </>
                        )}
                      </div>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                        disabled={currentPage === totalPages}
                        data-testid="button-next-page"
                      >
                        Next
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}