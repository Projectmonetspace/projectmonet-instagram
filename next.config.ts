import type { NextConfig } from "next";
import { securityHeaders } from "./security-headers.mjs";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  ...(process.env.PM_STATIC_EXPORT === "1" ? {
    output: "export" as const,
    images: { loader: "custom" as const, loaderFile: "./static-image-loader.ts" },
  } : {}),
  experimental: {
    inlineCss: true,
  },
  async redirects() {
    if (process.env.PM_STATIC_EXPORT === "1") return [];
    return [
      {
        source: "/resources/instagram-marketing-cost-india",
        destination: "/resources/instagram-marketing-cost",
        permanent: true,
      },
      {
        source: "/resources/instagram-reels-for-small-business-india",
        destination: "/resources/instagram-reels-for-small-business",
        permanent: true,
      },
    ];
  },
  async headers() {
    if (process.env.PM_STATIC_EXPORT === "1") return [];
    const headers = process.env.NODE_ENV === "development"
      ? securityHeaders.map((header) => header.key === "Content-Security-Policy"
        ? { ...header, value: header.value.replace("script-src 'self'", "script-src 'self' 'unsafe-eval'") }
        : header)
      : securityHeaders;
    return [
      { source: "/(.*)", headers },
      { source: "/media/:asset*", headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }] },
    ];
  },
};

export default nextConfig;
