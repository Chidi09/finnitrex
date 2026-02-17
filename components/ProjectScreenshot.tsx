"use client";

import { useState } from "react";

interface ProjectScreenshotProps {
  src: string;
  alt: string;
  /** Tailwind aspect-ratio class, e.g. "aspect-video" or "aspect-[16/9]" */
  aspect?: string;
  className?: string;
}

export default function ProjectScreenshot({
  src,
  alt,
  aspect = "aspect-video",
  className = "",
}: ProjectScreenshotProps) {
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={`relative w-full overflow-hidden bg-gray-950 ${aspect} ${className}`}>
      {/* Loading skeleton — shown until image loads or fails */}
      {!loaded && !failed && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-full h-full bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 animate-pulse" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-6 h-6 border border-gray-700 rounded-full border-t-lime-500 animate-spin" />
          </div>
        </div>
      )}

      {/* Failure state */}
      {failed && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-gray-900/80">
          <svg
            className="w-6 h-6 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3 20.25h18M3.75 4.875c0-.621.504-1.125 1.125-1.125h14.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125H4.875A1.125 1.125 0 013.75 16.125V4.875z"
            />
          </svg>
          <p className="text-[10px] text-gray-600 font-mono uppercase tracking-wider">
            Preview unavailable
          </p>
        </div>
      )}

      {/* The actual screenshot image */}
      {!failed && (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
          className={`absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-500 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
        />
      )}
    </div>
  );
}
