import { useRoute } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { MangaGrid } from "@/components/MangaGrid";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Search } from "lucide-react";
import { Link } from "wouter";
import type { Manga } from "@shared/schema";

export default function SearchResults() {
  const [, params] = useRoute("/search");
  const urlParams = new URLSearchParams(window.location.search);
  const searchQuery = urlParams.get("q") || "";

  const { data: searchResults = [], isLoading, error } = useQuery<Manga[]>({
    queryKey: [`/api/manga?search=${encodeURIComponent(searchQuery)}`],
    enabled: !!searchQuery,
  });

  if (!searchQuery) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <Search className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h1 className="text-2xl font-bold text-foreground mb-2">No Search Query</h1>
            <p className="text-muted-foreground mb-4">Please enter a search term to find manga.</p>
            <Link href="/">
              <Button>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Return Home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
              <p className="mt-4 text-muted-foreground">Searching for "{searchQuery}"...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-2">Search Error</h1>
            <p className="text-muted-foreground mb-4">There was an error performing the search.</p>
            <Link href="/">
              <Button>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Return Home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title={`Search Results: "${searchQuery}" | Explore Manga`}
        description={`Search results for "${searchQuery}" on Explore Manga. ${searchResults.length > 0 ? `Found ${searchResults.length} manga${searchResults.length !== 1 ? 's' : ''} matching your search.` : 'No results found, try different keywords.'}`}
        keywords={`${searchQuery}, manga search, find manga, manga library`}
        type="website"
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Link href="/">
              <Button variant="outline" size="sm">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                Search Results
              </h1>
              <p className="text-muted-foreground mt-1">
                Showing results for "{searchQuery}"
              </p>
            </div>
          </div>
          
          {searchResults.length > 0 && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Search className="h-4 w-4" />
              <span>Found {searchResults.length} manga{searchResults.length !== 1 ? 's' : ''}</span>
            </div>
          )}
        </div>

        {/* Results */}
        {searchResults.length > 0 ? (
          <MangaGrid 
            manga={searchResults} 
            title=""
          />
        ) : (
          <div className="text-center py-12">
            <Search className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h2 className="text-xl font-semibold text-foreground mb-2">
              No Results Found
            </h2>
            <p className="text-muted-foreground mb-6">
              We couldn't find any manga matching "{searchQuery}". Try:
            </p>
            <ul className="text-muted-foreground text-left max-w-md mx-auto space-y-2 mb-6">
              <li>• Checking your spelling</li>
              <li>• Using different keywords</li>
              <li>• Searching for author names</li>
              <li>• Browsing our categories instead</li>
            </ul>
            <div className="flex gap-4 justify-center">
              <Link href="/categories">
                <Button variant="outline">Browse Categories</Button>
              </Link>
              <Link href="/">
                <Button>Return Home</Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}