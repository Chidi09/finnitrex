"use client";

import { useEffect } from "react";

export default function PWARegister() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js", { updateViaCache: "none" })
        .then((registration) => {
          console.log("[PWA] Service Worker registered, scope:", registration.scope);

          // Pull latest worker immediately on load.
          registration.update();

          // Check for updates periodically
          setInterval(() => {
            registration.update();
          }, 60 * 60 * 1000); // every hour
        })
        .catch((err) => {
          console.log("[PWA] Service Worker registration failed:", err);
        });
    }
  }, []);

  return null;
}
