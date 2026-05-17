// src/api/tmdb.ts
import axios from "axios";
import placeholderImg from "../assets/movie-fallback.png";
import type {
  Movie,
  MovieDetail,
  MovieCredits,
  PaginatedResponse,
  Genre,
} from "../types/tmdb";

const tmdb = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
    "Content-Type": "application/json",
  },
});

// Helper to build image URLs
export const getImageUrl = (
  path: string | null,
  size: "w185" | "w200" | "w500" | "w1200" | "w1280" | "original" = "w500",
  placeholder: string = placeholderImg,
): string => (path ? `https://image.tmdb.org/t/p/${size}${path}` : placeholder);

// API functions — all typed
export const tmdbApi = {
  getPopular: (page = 1) =>
    tmdb
      .get<PaginatedResponse<Movie>>("/movie/popular", { params: { page } })
      .then((r) => r.data),

  getTopRated: (page = 1) =>
    tmdb
      .get<PaginatedResponse<Movie>>("/movie/top_rated", { params: { page } })
      .then((r) => r.data),

  search: (query: string, page = 1) =>
    tmdb
      .get<
        PaginatedResponse<Movie>
      >("/search/movie", { params: { query, page } })
      .then((r) => r.data),

  getDetail: (id: number) =>
    tmdb.get<MovieDetail>(`/movie/${id}`).then((r) => r.data),

  getCredits: (id: number) =>
    tmdb.get<MovieCredits>(`/movie/${id}/credits`).then((r) => r.data),

  getGenres: () =>
    tmdb
      .get<{ genres: Genre[] }>("/genre/movie/list")
      .then((r) => r.data.genres),
};
