import { useQueryClient } from "@tanstack/react-query";
import { getImageUrl, tmdbApi } from "../api/tmdb";
import useWatchlistStore from "../store/useWatchlistStore";
import type { Movie } from "../types/tmdb";
import { Link } from "react-router-dom";
import { cn } from "../utils/cn";

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  const queryClient = useQueryClient();
  const watchlist = useWatchlistStore((s) => s.watchlist);
  const addToWatchlist = useWatchlistStore((s) => s.addToWatchlist);
  const removeFromWatchlist = useWatchlistStore((s) => s.removeFromWatchlist);
  const inWatchlist = watchlist.some((m) => m.id === movie.id);
  const handleMouseEnter = () => {
    queryClient.prefetchQuery({
      queryKey: ["movie", movie.id],
      queryFn: () => tmdbApi.getDetail(movie.id),
      staleTime: 1000 * 60 * 5,
    });
  };
  return (
    <div
      className="group relative overflow-hidden rounded-xl bg-gray-900 transition-transform hover:-translate-y-1 hover:shadow-xl"
      onMouseEnter={handleMouseEnter}
    >
      <Link to={`/movie/${movie.id}`}>
        <div
          className="overflow-hidden min-h-88.75 relative bg-black
                 before:absolute before:inset-0
                 before:m-auto before:h-120 before:w-120
                 before:rounded-full before:bg-indigo-400/40
                 before:blur-[120px]
                 before:animate-[pulse_2s_ease-in-out_infinite]"
        >
          <img
            src={getImageUrl(movie.poster_path)}
            alt={movie.title}
            className="w-full object-cover relative z-9"
            loading="lazy"
            height="355px"
          />
        </div>
        <div className="p-3">
          <h3 className="truncate font-semibold">{movie.title}</h3>
          <p className="text-sm text-gray-400">
            {movie.release_date?.slice(0, 4)} •{" "}
            <span className="text-yellow-400">
              ⭐ {movie.vote_average.toFixed(1)}
            </span>
          </p>
        </div>
      </Link>

      <button
        onClick={() =>
          inWatchlist
            ? removeFromWatchlist(movie.id)
            : addToWatchlist({
                id: movie.id,
                title: movie.title,
                poster_path: movie.poster_path,
                vote_average: movie.vote_average,
                addedAt: new Date().toISOString(),
              })
        }
        className={cn(
          "absolute right-2 top-2 rounded-full p-1.5 text-lg transition-all",
          inWatchlist
            ? "bg-indigo-600 text-white"
            : "bg-gray-900/80 text-gray-400 hover:bg-indigo-600 hover:text-white",
        )}
      >
        {inWatchlist ? "★" : "☆"}
      </button>
    </div>
  );
}
