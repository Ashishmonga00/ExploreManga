import { HeroSection } from "@/components/HeroSection";
import { MangaGrid } from "@/components/MangaGrid";
import type { Manga } from "@shared/schema";

// TODO: Remove mock data when backend is connected
const mockManga: Manga[] = [
  {
    id: "1",
    title: "Shadow Warrior Chronicles",
    author: "Akira Tanaka",
    genre: ["Action", "Adventure", "Supernatural"],
    status: "ongoing",
    description: "In a world where shadows hold ancient powers, a young warrior must master the forbidden arts to protect his village from an otherworldly threat.",
    coverImage: "/src/../../../attached_assets/generated_images/Action_manga_cover_art_43daefaa.png",
    chapters: [
      { id: "1-1", number: 1, title: "The Shadow Awakens", releaseDate: "2024-01-15" },
      { id: "1-2", number: 2, title: "First Blood", releaseDate: "2024-01-22" },
    ],
    rating: 9.2,
    views: 125000,
    isPopular: true,
    isFeatured: true,
  },
  {
    id: "2",
    title: "Cherry Blossom Dreams",
    author: "Yuki Nakamura",
    genre: ["Romance", "School", "Drama"],
    status: "completed",
    description: "A heartwarming story of first love set against the backdrop of a prestigious academy where cherry blossoms bloom eternal.",
    coverImage: "/src/../../../attached_assets/generated_images/Romance_manga_cover_art_d78f4ca7.png",
    chapters: [
      { id: "2-1", number: 1, title: "Spring's Promise", releaseDate: "2023-03-01" },
      { id: "2-2", number: 2, title: "Under the Sakura", releaseDate: "2023-03-08" },
    ],
    rating: 8.7,
    views: 89000,
    isPopular: true,
    isFeatured: true,
  },
  {
    id: "3",
    title: "Mystic Realms",
    author: "Hiroshi Sato",
    genre: ["Fantasy", "Magic", "Adventure"],
    status: "ongoing",
    description: "When portals to magical realms open across the modern world, a group of unlikely heroes must navigate between worlds to prevent reality from collapsing.",
    coverImage: "/src/../../../attached_assets/generated_images/Fantasy_manga_cover_art_910ab3b7.png",
    chapters: [
      { id: "3-1", number: 1, title: "Portal's Edge", releaseDate: "2024-02-01" },
    ],
    rating: 8.9,
    views: 67000,
    isFeatured: true,
  },
  {
    id: "4",
    title: "Midnight Terrors",
    author: "Kenji Yamamoto",
    genre: ["Horror", "Thriller", "Supernatural"],
    status: "ongoing",
    description: "In the small town of Kurohama, midnight brings more than darkness. Strange creatures emerge from the shadows, and only a few brave souls stand between humanity and eternal nightmare.",
    coverImage: "/src/../../../attached_assets/generated_images/Horror_manga_cover_art_a6e4b504.png",
    chapters: [
      { id: "4-1", number: 1, title: "When Darkness Falls", releaseDate: "2024-01-30" },
    ],
    rating: 8.5,
    views: 45000,
  },
  {
    id: "5",
    title: "Lucky Star Academy",
    author: "Miki Tanaka",
    genre: ["Comedy", "School", "Slice of Life"],
    status: "ongoing",
    description: "Follow the hilarious misadventures of the most unlucky student at Japan's most prestigious academy, where every day brings new comedic disasters.",
    coverImage: "/src/../../../attached_assets/generated_images/Comedy_manga_cover_art_5c7e6802.png",
    chapters: [
      { id: "5-1", number: 1, title: "First Day Disasters", releaseDate: "2024-02-05" },
    ],
    rating: 8.1,
    views: 38000,
  },
  // Additional manga for grid display
  {
    id: "6",
    title: "Digital Samurai",
    author: "Ryu Kimura",
    genre: ["Sci-Fi", "Action"],
    status: "completed",
    description: "In cyberpunk Tokyo 2099, ancient samurai traditions meet cutting-edge technology.",
    coverImage: "/src/../../../attached_assets/generated_images/Action_manga_cover_art_43daefaa.png",
    chapters: [],
    rating: 8.8,
    views: 92000,
    isPopular: true,
  },
];

export default function Home() {
  const featuredManga = mockManga.filter(m => m.isFeatured);
  const popularManga = mockManga.filter(m => m.isPopular);
  const recentManga = mockManga.slice(3);

  return (
    <div className="min-h-screen bg-background">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        {/* Hero Section */}
        <HeroSection featuredManga={featuredManga} />

        {/* Popular Manga */}
        <MangaGrid
          manga={popularManga}
          title="Popular This Week"
        />

        {/* Recently Added */}
        <MangaGrid
          manga={recentManga}
          title="Recently Added"
        />
      </main>
    </div>
  );
}