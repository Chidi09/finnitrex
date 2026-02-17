"use client";

import { useState } from "react";

interface ProjectScreenshotProps {
  src: string;
  alt: string;
  className?: string;
}

export default function ProjectScreenshot({
  src,
  alt,
  className = "",
}: ProjectScreenshotProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={`${className} bg-gray-900 flex items-center justify-center`}
      >
        <div className="text-center px-4">
          <div className="w-8 h-8 mx-auto mb-2 border border-gray-700 rounded flex items-center justify-center">
            <svg
              className="w-4 h-4 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <p className="text-[10px] text-gray-600 font-mono uppercase tracking-wider">
            Preview unavailable
          </p>
        </div>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading="lazy"
      onError={() => setFailed(true)}
    />
  );
}
