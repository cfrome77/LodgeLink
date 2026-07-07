import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export", // Compiles the application into static HTML/CSS/JS files
  images: {
    unoptimized: true, // Prevents local image assets from breaking in an offline desktop environment
  },
};

export default nextConfig;
