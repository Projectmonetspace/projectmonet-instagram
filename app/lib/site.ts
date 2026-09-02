import type { Metadata } from "next";

export const SITE_ORIGIN = "https://www.projectmonet.com";
export const SITE_NAME = "Project Monet";
export const SOCIAL_IMAGE = "/media/hero-poster.webp";

export function pageMetadata({ title, description, path }: { title: string; description: string; path: string }): Metadata {
  const canonical = path === "/" ? SITE_ORIGIN : `${SITE_ORIGIN}${path}`;
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      type: "website",
      url: canonical,
      siteName: SITE_NAME,
      title,
      description,
      images: [{ url: SOCIAL_IMAGE, width: 1280, height: 720, alt: "Project Monet cinematic brand visual" }],
    },
    twitter: { card: "summary_large_image", title, description, images: [SOCIAL_IMAGE] },
  };
}

export function absoluteUrl(path: string) {
  return path === "/" ? SITE_ORIGIN : `${SITE_ORIGIN}${path}`;
}
