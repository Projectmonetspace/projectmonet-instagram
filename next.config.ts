import type { NextConfig } from "next";
import { securityHeaders } from "./security-headers.mjs";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async headers() {
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
