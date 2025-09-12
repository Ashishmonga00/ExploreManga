import { CategoryList } from "@/components/CategoryList";
import { useQuery } from "@tanstack/react-query";
import type { Category } from "@shared/schema";


export default function Categories() {
  const { data: categories = [], isLoading } = useQuery({
    queryKey: ['/api/categories'],
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading categories...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-display font-bold text-foreground">
              Browse Categories
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover manga across all your favorite genres. From action-packed adventures to heartwarming romances, find the perfect story for your mood.
            </p>
          </div>

          {/* Categories Grid */}
          <CategoryList categories={categories} />
        </div>
      </main>
    </div>
  );
}