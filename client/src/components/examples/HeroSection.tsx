import { HeroSection } from '../HeroSection';
import type { Manga } from '@shared/schema';

const featuredManga: Manga[] = [
  {
    id: "1",
    title: "Shadow Warrior Chronicles",
    url: "https://example.com",
    cover_image: "/src/../../../attached_assets/generated_images/Action_manga_cover_art_43daefaa.png",
    attributes: ["Authors: Akira Tanaka", "Genres: Action, Adventure, Supernatural", "Original work: Ongoing"],
    summary: "In a world where shadows hold ancient powers, a young warrior must master the forbidden arts to protect his village.",
    chapters: [],
    author: "Akira Tanaka",
    genre: ["Action", "Adventure", "Supernatural"],
    status: "ongoing",
    description: "In a world where shadows hold ancient powers, a young warrior must master the forbidden arts to protect his village.",
    coverImage: "/src/../../../attached_assets/generated_images/Action_manga_cover_art_43daefaa.png",
    rating: 9.2,
    views: 125000,
    isFeatured: true,
  },
  {
    id: "2",
    title: "Cherry Blossom Dreams",
    url: "https://example.com",
    cover_image: "/src/../../../attached_assets/generated_images/Romance_manga_cover_art_d78f4ca7.png",
    attributes: ["Authors: Yuki Nakamura", "Genres: Romance, School, Drama", "Original work: Completed"],
    summary: "A heartwarming story of first love set against the backdrop of cherry blossoms.",
    chapters: [],
    author: "Yuki Nakamura",
    genre: ["Romance", "School", "Drama"],
    status: "completed",
    description: "A heartwarming story of first love set against the backdrop of cherry blossoms.",
    coverImage: "/src/../../../attached_assets/generated_images/Romance_manga_cover_art_d78f4ca7.png",
    rating: 8.7,
    views: 89000,
    isFeatured: true,
  },
];

export default function HeroSectionExample() {
  return <HeroSection featuredManga={featuredManga} />;
}