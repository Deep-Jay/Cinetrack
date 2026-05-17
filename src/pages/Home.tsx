import MovieCard from "../components/MovieCard";
import Spinner from "../components/Spinner";
import ErrorMessage from "../components/ErrorMessage";
import { usePopularMovies } from "../hooks/usePopularMovies";
import { Pagination } from "../components";
import { useSearchParams } from "react-router-dom";

export default function Home() {
  const [searchParams] = useSearchParams();
  const { data, isLoading, isError, error, isFetching } = usePopularMovies(
    Number(searchParams.get("page")) || 1,
  );

  if (isLoading) return <Spinner />;
  if (isError) return <ErrorMessage message={error.message} />;

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Popular Movies</h1>
        {isFetching && (
          <span className="text-sm text-gray-400">Updating...</span>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {data?.results.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>

      <Pagination totalPage={data?.total_pages} />
    </div>
  );
}
