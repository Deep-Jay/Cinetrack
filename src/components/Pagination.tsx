import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function ({
  totalPage = 100,
}: {
  totalPage: number | undefined;
}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState<number>(
    Number(searchParams.get("page")) || 1,
  );
  useEffect(() => {
    setSearchParams((p) => {
      p.set("page", String(page));
      return p;
    });
  }, [page]);
  const handlePrev = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };
  const handleNext = () => {
    if (page < totalPage) {
      setPage(page + 1);
    }
  };
  return (
    <div className="mt-8 flex items-center justify-center gap-4">
      <button
        onClick={handlePrev}
        disabled={page === 1}
        className="rounded-lg bg-gray-800 px-4 py-2 disabled:opacity-50"
      >
        Previous
      </button>
      <span className="text-gray-400">
        Page {page} of {totalPage}
      </span>
      <button
        onClick={handleNext}
        disabled={page === totalPage}
        className="rounded-lg bg-gray-800 px-4 py-2 disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
}
