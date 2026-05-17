import { useQuery } from "@tanstack/react-query";
import { tmdbApi } from "../api/tmdb";

export function useMovieDetail(id: number) {
  return useQuery({
    queryKey: ["movie", id],
    queryFn: () => tmdbApi.getDetail(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 10,
  });
}
