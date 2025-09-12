import { MangaCard } from '../MangaCard';
import type { Manga } from '@shared/schema';

const exampleManga: Manga = {
  id: "1",
  title: "Shadow Warrior Chronicles",
  url: "https://example.com",
  cover_image: "/src/../../../attached_assets/generated_images/Action_manga_cover_art_43daefaa.png",
  attributes: ["Authors: Akira Tanaka", "Genres: Action, Adventure, Supernatural", "Original work: Ongoing"],
  summary: "Epic battles and supernatural powers.",
  chapters: [],
  author: "Akira Tanaka",
  genre: ["Action", "Adventure", "Supernatural"],
  status: "ongoing",
  description: "Epic battles and supernatural powers.",
  coverImage: "/src/../../../attached_assets/generated_images/Action_manga_cover_art_43daefaa.png",
  rating: 9.2,
  views: 125000,
  isPopular: true,
  isFeatured: true,
};

export default function MangaCardExample() {
  return (
    <div className="w-48">
      <MangaCard manga={exampleManga} />
    </div>
  );
}