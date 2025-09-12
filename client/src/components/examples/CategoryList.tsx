import { CategoryList } from '../CategoryList';
import type { Category } from '@shared/schema';

const exampleCategories: Category[] = [
  {
    id: "1",
    name: "Action",
    description: "High-octane adventures filled with intense battles and epic confrontations.",
    mangaCount: 1247,
  },
  {
    id: "2", 
    name: "Romance",
    description: "Heartwarming stories of love and emotional journeys.",
    mangaCount: 892,
  },
  {
    id: "3",
    name: "Fantasy",
    description: "Magical worlds filled with mystical creatures and ancient powers.",
    mangaCount: 756,
  },
];

export default function CategoryListExample() {
  return <CategoryList categories={exampleCategories} />;
}