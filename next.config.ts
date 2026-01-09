import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false, // Set to FALSE to prevent double-rendering 3D scenes and Context Lost errors
};

export default nextConfig;
