import { useQuery } from "@tanstack/react-query";
import { tmdbApi } from "../api/tmdb";

export function useMovieCredits(id: number) {
  return useQuery({
    queryKey: ["movie", id, "credits"],
    queryFn: () => tmdbApi.getCredits(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 10,
  });
}
