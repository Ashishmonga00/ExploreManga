import { HeroSection } from '../HeroSection';
import type { Manga } from '@shared/schema';

const featuredManga: Manga[] = [
  {
    id: "1",
    title: "Shadow Warrior Chronicles",
    author: "Akira Tanaka",
    genre: ["Action", "Adventure", "Supernatural"],
    status: "ongoing",
    description: "In a world where shadows hold ancient powers, a young warrior must master the forbidden arts to protect his village.",
    coverImage: "/src/../../../attached_assets/generated_images/Action_manga_cover_art_43daefaa.png",
    chapters: [],
    rating: 9.2,
    views: 125000,
    isFeatured: true,
  },
  {
    id: "2",
    title: "Cherry Blossom Dreams",
    author: "Yuki Nakamura",
    genre: ["Romance", "School", "Drama"],
    status: "completed",
    description: "A heartwarming story of first love set against the backdrop of cherry blossoms.",
    coverImage: "/src/../../../attached_assets/generated_images/Romance_manga_cover_art_d78f4ca7.png",
    chapters: [],
    rating: 8.7,
    views: 89000,
    isFeatured: true,
  },
];

export default function HeroSectionExample() {
  return <HeroSection featuredManga={featuredManga} />;
}