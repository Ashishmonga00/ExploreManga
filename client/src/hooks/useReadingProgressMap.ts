import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import type { ReadingProgress } from "@shared/schema";

interface UseReadingProgressMapOptions {
  enabled?: boolean;
}

/**
 * Custom hook to efficiently fetch reading progress for multiple manga IDs at once
 * This solves the N+1 query problem by making a single bulk request instead of 
 * individual requests for each manga card.
 */
export function useReadingProgressMap(
  mangaIds: string[],
  options: UseReadingProgressMapOptions = {}
) {
  const { enabled = true } = options;

  const query = useQuery<Record<string, ReadingProgress>>({
    queryKey: ['/api/reading-progress/bulk', mangaIds.sort()], // Sort for stable cache key
    queryFn: async () => {
      if (mangaIds.length === 0) {
        return {};
      }

      const response = await apiRequest('POST', '/api/reading-progress/bulk', {
        mangaIds,
      });
      return response.json();
    },
    enabled: enabled && mangaIds.length > 0,
    retry: false, // Don't retry on failures to prevent loops
    refetchOnWindowFocus: false, // Don't refetch when window gains focus
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
  });

  return {
    ...query,
    progressMap: query.data || {},
    getProgress: (mangaId: string): ReadingProgress | undefined => {
      return query.data?.[mangaId];
    },
  };
}