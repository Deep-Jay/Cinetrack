import { create } from "zustand";
import { type SortBy, type WatchlistMovie } from "../types/tmdb";
import { persist } from "zustand/middleware";

interface WatchlistStore {
  watchlist: WatchlistMovie[];
  addToWatchlist: (movie: WatchlistMovie) => void;
  removeFromWatchlist: (id: WatchlistMovie["id"]) => void;
  clearWatchlist: () => void;
  sortBy: SortBy;
  minRating: number;
  setSortBy: (sort: SortBy) => void;
  setMinRating: (rating: number) => void;
}

const useWatchlistStore = create<WatchlistStore>()(
  persist(
    (set) => ({
      watchlist: [],
      sortBy: "date",
      minRating: 6,

      addToWatchlist: (movie) =>
        set((state) => ({ watchlist: [...state.watchlist, movie] })),

      removeFromWatchlist: (id) =>
        set((state) => ({
          watchlist: state.watchlist.filter((m) => m.id !== id),
        })),

      clearWatchlist: () => set({ watchlist: [] }),

      setSortBy: (sort) => set({ sortBy: sort }),

      setMinRating: (rate) => set({ minRating: rate }),
    }),
    {
      name: "cinetrack-watchlist",
      partialize: (state) => ({ watchlist: state.watchlist }),
    },
  ),
);

export default useWatchlistStore;
