import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Pageloader from "./Pageloader";

export default function Layout() {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <header className="sticky top-0 z-10">
        <Navbar />
        <Pageloader className="-mt-px" />
      </header>
      <main className="mx-auto max-w-7xl px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
}
