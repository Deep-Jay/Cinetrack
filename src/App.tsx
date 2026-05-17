// import { Routes, Route } from "react-router-dom";

import { Route, Routes } from "react-router-dom";
import { Layout, Spinner } from "./components";
import NotFound from "./pages/NotFound";
import { lazy, Suspense } from "react";

const Home = lazy(() => import("./pages/Home.tsx"));
const Search = lazy(() => import("./pages/Search.tsx"));
const MovieDetail = lazy(() => import("./pages/MovieDetail.tsx"));
const Watchlist = lazy(() => import("./pages/Watchlist.tsx"));

export default function App() {
  return (
    <Suspense fallback={<Spinner fullScreen />}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="search" element={<Search />} />
          <Route path="movie/:id" element={<MovieDetail />} />
          <Route path="watchlist" element={<Watchlist />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}
