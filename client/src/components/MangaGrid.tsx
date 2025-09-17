import { MangaCard } from "./MangaCard";
import { useReadingProgressMap } from "@/hooks/useReadingProgressMap";
import type { Manga } from "@shared/schema";

interface MangaGridProps {
  manga: Manga[];
  title?: string;
  showStats?: boolean;
}

export function MangaGrid({ manga, title, showStats = true }: MangaGridProps) {
  // Extract manga IDs for bulk reading progress fetch
  const mangaIds = manga.map(m => m.id);
  
  // Fetch reading progress for all manga at once to fix N+1 query problem
  const { progressMap } = useReadingProgressMap(mangaIds);

  return (
    <section className="space-y-6">
      {title && (
        <h2 className="text-2xl font-display font-bold text-foreground">
          {title}
        </h2>
      )}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {manga.map((item) => (
          <MangaCard
            key={item.id}
            manga={item}
            showStats={showStats}
            readingProgress={progressMap[item.id]}
          />
        ))}
      </div>
    </section>
  );
}