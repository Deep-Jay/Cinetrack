import { useParams } from "react-router-dom";
import { useMovieDetail } from "../hooks/useMovieDetail";
import { ErrorMessage, Spinner } from "../components";
import { getImageUrl } from "../api/tmdb";
import useWatchlistStore from "../store/useWatchlistStore";
import { useMovieCredits } from "../hooks/useMovieCredits";
import { formatCurrency } from "../utils/formatCurrency";
import backdropFallback from "../assets/backdrop-placeholder.png";
import castFallback from "../assets/placeholder.png";

export default function MovieDetail() {
  const { id } = useParams<{ id: string }>();
  const movieId = Number(id);

  const watchlist = useWatchlistStore((s) => s.watchlist);
  const addToWatchlist = useWatchlistStore((s) => s.addToWatchlist);
  const removeFromWatchlist = useWatchlistStore((s) => s.removeFromWatchlist);
  const { data, isLoading, isError, error } = useMovieDetail(movieId);
  const { data: casts } = useMovieCredits(movieId);

  const inWatchlist = watchlist.some((m) => m.id === movieId);
  if (!movieId) {
    return (
      <h2 className="text-2xl">
        Cannot fetch movie details. No valid ID provided
      </h2>
    );
  }
  if (isLoading) return <Spinner />;
  if (isError) return <ErrorMessage message={error.message} />;

  if (!data) {
    return <h2 className="text-2xl font-bold">Invalid movie ID provided.</h2>;
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <div className="relative h-[70vh] w-full overflow-hidden">
        <img
          src={getImageUrl(data.backdrop_path, "w1280", backdropFallback)}
          alt="Movie Backdrop"
          className="h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-linear-to-t from-neutral-950 via-neutral-950/70 to-black/30"></div>

        <div className="absolute bottom-0 left-0 right-0 mx-auto flex max-w-7xl flex-col gap-8 px-6 pb-10 md:flex-row md:items-end">
          <div className="w-48 overflow-hidden rounded-2xl shadow-2xl md:w-72 shrink-0">
            <img
              src={getImageUrl(data.poster_path)}
              alt="Movie Poster"
              className="w-full object-cover"
            />
          </div>

          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-3">
              {data.genres.map((genre) => (
                <span
                  key={genre.id}
                  className="rounded-full bg-indigo-500 px-3 py-1 text-sm font-medium"
                >
                  {genre.name}
                </span>
              ))}
            </div>

            <h1 className="mt-4 text-4xl font-bold md:text-6xl">
              {data.title}
            </h1>

            <div className="mt-4 flex flex-wrap items-center gap-5 text-sm text-neutral-300 md:text-base">
              <span>📅 {data.release_date?.slice(0, 4)}</span>
              <span>
                ⏱ {Math.floor(data.runtime / 60)}h {data.runtime % 60}m
              </span>
              <span className="text-yellow-400">
                ⭐ {data.vote_average.toFixed(1)} / 10
              </span>
              <span>
                🔥{" "}
                {data.vote_count < 1000
                  ? data.vote_count
                  : (data.vote_count / 1000).toFixed(1) + "K"}{" "}
                votes
              </span>
            </div>

            <p className="mt-6 max-w-3xl text-sm leading-7 text-neutral-300 md:text-base">
              {data.tagline}
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <button
                className="rounded-xl border border-neutral-700 bg-neutral-900/80 px-6 py-3 font-medium transition hover:border-indigo-500 hover:bg-neutral-800"
                onClick={() =>
                  inWatchlist
                    ? removeFromWatchlist(data.id)
                    : addToWatchlist({
                        id: data.id,
                        title: data.title,
                        poster_path: data.poster_path,
                        vote_average: data.vote_average,
                        addedAt: new Date().toISOString(),
                      })
                }
              >
                {inWatchlist ? "★ Remove" : "☆ Add to Watchlist"}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-[2fr_1fr]">
        <div>
          <section>
            <h2 className="mb-4 text-2xl font-semibold">Overview</h2>

            <p className="leading-8 text-neutral-300">{data.overview}</p>
          </section>

          <section className="mt-12">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-2xl font-semibold">Top Cast</h2>
            </div>

            <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4">
              {casts?.cast.slice(0, 8).map((cast) => (
                <div
                  key={cast.id}
                  className="overflow-hidden rounded-2xl bg-neutral-900 transition hover:-translate-y-1 hover:shadow-xl"
                >
                  <img
                    src={getImageUrl(cast.profile_path, "w185", castFallback)}
                    alt={cast.name}
                    className="h-56 w-full object-cover"
                  />
                  <div className="p-3">
                    <h3 className="font-medium">{cast.name}</h3>
                    <p className="mt-1 text-sm text-neutral-400">
                      {cast.character}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <aside className="space-y-6">
          <div className="rounded-2xl bg-neutral-900 p-6">
            <h3 className="mb-5 text-xl font-semibold">Movie Info</h3>

            <div className="space-y-4 text-sm">
              <div>
                <p className="text-neutral-500">Status</p>
                <p className="mt-1 font-medium">{data.status}</p>
              </div>

              <div>
                <p className="text-neutral-500">Budget</p>
                <p className="mt-1 font-medium">
                  {formatCurrency(data.budget)}
                </p>
              </div>

              <div>
                <p className="text-neutral-500">Revenue</p>
                <p className="mt-1 font-medium">
                  {formatCurrency(data.revenue)}
                </p>
              </div>

              <div>
                <p className="text-neutral-500">Production</p>
                <p className="mt-1 font-medium">
                  {data.production_companies
                    .map((comp) => comp.name)
                    .join(", ")}
                </p>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
