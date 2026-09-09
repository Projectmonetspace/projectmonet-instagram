import type { ImageLoaderProps } from "next/image";

// Preserve Next Image's responsive width selection; all variants are built locally.
export default function staticImageLoader({ src, width }: ImageLoaderProps): string {
  if (!src.startsWith("/") || src.includes("..") || src.includes("?") || src.includes("#")) {
    throw new Error("Static image loader requires a local public image path: " + src);
  }
  return "/__images" + src + "/w" + width + ".webp";
}
