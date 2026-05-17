import { useSearchParams } from "react-router-dom";
import { useSearchMovies } from "../hooks/useSearchMovies";
import { ErrorMessage, MovieCard, Pagination, Spinner } from "../components";

export default function Search() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") ?? "";
  const { data, isLoading, isError, error, isFetching } = useSearchMovies(
    query,
    Number(searchParams.get("page")) || 1,
  );

  if (query === "") {
    return (
      <h2 className="text-2xl font-bold">
        No query provided. Use the search at navbar.
      </h2>
    );
  }
  if (isLoading) return <Spinner />;
  if (isError) return <ErrorMessage message={error.message} />;
  if (data?.total_results === 0) {
    return (
      <h2 className="text-2xl font-bold">
        You search did not match any results. Try again!
      </h2>
    );
  }

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Search results for: {query}</h1>
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
