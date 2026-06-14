import type { NextConfig } from "next"
import path from "path"

const isPagesBuild = process.env.GITHUB_PAGES === "true"

const nextConfig: NextConfig = {
  ...(isPagesBuild ? {
    output: "export" as const,
    basePath: "/KLIMAT",
    trailingSlash: true,
  } : {}),
  images: {
    ...(isPagesBuild ? { unoptimized: true } : {
      formats: ["image/avif", "image/webp"],
      remotePatterns: [
        { protocol: "https", hostname: "res.cloudinary.com" },
        { protocol: "https", hostname: "kvadroklimat.ru" },
      ],
    }),
  },
  outputFileTracingRoot: path.join(__dirname, ".."),
}

export default nextConfig
