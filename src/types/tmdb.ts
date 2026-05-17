// src/types/tmdb.ts
export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  vote_count: number;
  genre_ids: number[];
}

export interface MovieDetail extends Movie {
  runtime: number;
  genres: Genre[];
  tagline: string;
  status: string;
  budget: number;
  revenue: number;
  production_companies: ProductionCompany[];
}

export interface Genre {
  id: number;
  name: string;
}

export interface ProductionCompany {
  id: number;
  name: string;
  logo_path: string | null;
}

export interface Cast {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
}

export interface MovieCredits {
  id: number;
  cast: Cast[];
}

export interface PaginatedResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

export interface WatchlistMovie {
  id: number;
  title: string;
  poster_path: string | null;
  vote_average: number;
  addedAt: string; // ISO date string
}

export type SortBy = "date" | "rating" | "title";
