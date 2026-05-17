import { NavLink, useNavigate } from "react-router-dom";
import { cn } from "../utils/cn";
import { useState } from "react";

export default function Navbar() {
  const [query, setQuery] = useState<string>("");
  const navigate = useNavigate();
  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    cn(
      "text-sm font-medium transition-colors hover:text-white",
      isActive ? "text-white" : "text-gray-400",
    );
  const handleSearch = (e: React.SubmitEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    setQuery("");
  };
  return (
    <nav className="border-b border-gray-800 bg-gray-950/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 gap-5">
        <NavLink to="/" className="text-xl font-bold text-indigo-400 shrink-0">
          🎬 CineTrack
        </NavLink>

        <div className="flex items-center justify-end flex-wrap gap-x-6 gap-y-2">
          <NavLink to="/" className={navLinkClass}>
            Home
          </NavLink>
          <NavLink to="/watchlist" className={navLinkClass}>
            Watchlist
          </NavLink>

          <form onSubmit={handleSearch} className="flex items-center relative">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search movies..."
              className="w-full max-w-full rounded-lg border border-gray-700 bg-gray-800 px-3 py-1.5 text-sm text-gray-100 placeholder-gray-500 focus:border-indigo-500 focus:outline-none"
            />
          </form>
        </div>
      </div>
    </nav>
  );
}
