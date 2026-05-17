import { useQuery } from "@tanstack/react-query";
import { tmdbApi } from "../api/tmdb";

export function useSearchMovies(query: string, page: number = 1) {
  return useQuery({
    queryKey: ["movies", "search", query, page],
    queryFn: () => tmdbApi.search(query, page),
    enabled: query.length > 2,
    staleTime: 1000 * 60 * 2,
  });
}
