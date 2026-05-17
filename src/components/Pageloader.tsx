import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { cn } from "../utils/cn";

export default function Pageloader({ className }: { className?: string }) {
  const location = useLocation();

  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    // Scroll to top
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    // Reset
    setVisible(true);
    setProgress(0);

    // Simulated progressive loading
    let value = 0;

    intervalRef.current = window.setInterval(() => {
      value += Math.random() * 15;

      // Slow near completion
      if (value > 90) {
        value = 90;
      }

      setProgress(value);
    }, 200);

    // Finish animation
    const finishLoading = () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }

      setProgress(100);

      setTimeout(() => {
        setVisible(false);
      }, 300);
    };

    if (document.readyState === "complete") {
      finishLoading();
    } else {
      // Wait for DOM/content load
      window.addEventListener("DOMContentLoaded", finishLoading);
      window.addEventListener("load", finishLoading);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }

      window.removeEventListener("DOMContentLoaded", finishLoading);

      window.removeEventListener("load", finishLoading);
    };
  }, [location.pathname]);

  if (!visible) return null;
  const loaderClass = cn(
    "z-9999 w-full h-0 transition-opacity duration-300 relative",
    className,
  );

  return (
    <div className={loaderClass}>
      <div
        className="h-1 bg-indigo-500 transition-all duration-200 ease-out absolute left-0 top-0"
        style={{
          width: `${progress}%`,
        }}
      />
    </div>
  );
}
