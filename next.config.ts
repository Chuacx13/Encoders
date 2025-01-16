import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "www.bgi-usa.com",
      "images.unsplash.com",
      "cdn.nyallergy.com",
      "encrypted-tbn2.gstatic.com",
      "images.stockcake.com",
      "domf5oio6qrcr.cloudfront.net",
      "img.pikbest.com",
      "www.mashed.com",
      "assets.aceternity.com",
      "res.cloudinary.com",
    ], // Add all external image hostnames here
  },
};

export default nextConfig;
