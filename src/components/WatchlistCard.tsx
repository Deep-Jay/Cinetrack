import { Link } from "react-router-dom";
import { getImageUrl } from "../api/tmdb";
import useWatchlistStore from "../store/useWatchlistStore";
import type { WatchlistMovie } from "../types/tmdb";

interface WatchlistCardProps {
  movie: WatchlistMovie;
}

export default function WatchlistCard({ movie }: WatchlistCardProps) {
  const removeFromWatchlist = useWatchlistStore((s) => s.removeFromWatchlist);

  return (
    <div className="group overflow-hidden rounded-xl bg-gray-900 shadow-md transition-all hover:-translate-y-1 hover:shadow-xl">
      <Link to={`/movie/${movie.id}`}>
        <div className="overflow-hidden min-h-88.75">
          <img
            src={getImageUrl(movie.poster_path)}
            alt={movie.title}
            className="w-full min-h-88.75 object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        </div>

        <div className="space-y-2 p-4">
          <h3 className="line-clamp-1 text-lg font-semibold">{movie.title}</h3>

          <div className="flex items-center justify-between text-sm text-gray-400">
            <span className="text-yellow-400">
              ⭐ {movie.vote_average.toFixed(1)}
            </span>

            <span>{new Date(movie.addedAt).toLocaleDateString()}</span>
          </div>
        </div>
      </Link>

      <div className="px-4 pb-4">
        <button
          onClick={() => removeFromWatchlist(movie.id)}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700"
        >
          Remove
        </button>
      </div>
    </div>
  );
}
