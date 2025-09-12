import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { ChevronRight } from "lucide-react";
import type { Category } from "@shared/schema";

interface CategoryListProps {
  categories: Category[];
}

export function CategoryList({ categories }: CategoryListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {categories.map((category) => (
        <Link key={category.id} href={`/categories/${category.name.toLowerCase()}`}>
          <Card className="group cursor-pointer hover-elevate transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-display group-hover:text-primary transition-colors">
                {category.name}
              </CardTitle>
              <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                {category.description}
              </p>
              <Badge 
                variant="secondary" 
                data-testid={`badge-category-count-${category.id}`}
              >
                {category.mangaCount} manga
              </Badge>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}