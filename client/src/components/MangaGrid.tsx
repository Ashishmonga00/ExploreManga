import { MangaCard } from "./MangaCard";
import type { Manga } from "@shared/schema";

interface MangaGridProps {
  manga: Manga[];
  title?: string;
  showStats?: boolean;
}

export function MangaGrid({ manga, title, showStats = true }: MangaGridProps) {
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
          />
        ))}
      </div>
    </section>
  );
}