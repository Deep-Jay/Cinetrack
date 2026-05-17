import { useQuery } from "@tanstack/react-query";
import { tmdbApi } from "../api/tmdb";

export function usePopularMovies(page: number = 1) {
  return useQuery({
    queryKey: ["movies", "popular", page],
    queryFn: () => tmdbApi.getPopular(page),
    staleTime: 1000 * 60 * 5,
  });
}
