import { resourceArticles } from "./resources";

export const indexableRoutes = [
  { path: "/", lastModified: "2026-09-02", changeFrequency: "weekly" as const, priority: 1 },
  {
    path: "/instagram-management-services",
    lastModified: "2026-09-02",
    changeFrequency: "monthly" as const,
    priority: 0.9,
  },
  {
    path: "/instagram-content-creation-services",
    lastModified: "2026-08-29",
    changeFrequency: "monthly" as const,
    priority: 0.85,
  },
  {
    path: "/instagram-reels-agency",
    lastModified: "2026-08-29",
    changeFrequency: "monthly" as const,
    priority: 0.85,
  },
  {
    path: "/instagram-seo-services",
    lastModified: "2026-08-29",
    changeFrequency: "monthly" as const,
    priority: 0.85,
  },
  {
    path: "/instagram-marketing-for-founders",
    lastModified: "2026-08-29",
    changeFrequency: "monthly" as const,
    priority: 0.85,
  },
  {
    path: "/instagram-marketing-for-small-business",
    lastModified: "2026-08-29",
    changeFrequency: "monthly" as const,
    priority: 0.85,
  },
  {
    path: "/instagram-audit",
    lastModified: "2026-08-29",
    changeFrequency: "monthly" as const,
    priority: 0.9,
  },
  {
    path: "/viral-mandate",
    lastModified: "2026-09-02",
    changeFrequency: "monthly" as const,
    priority: 0.85,
  },
  {
    path: "/about",
    lastModified: "2026-09-02",
    changeFrequency: "monthly" as const,
    priority: 0.7,
  },
  {
    path: "/resources",
    lastModified: "2026-09-02",
    changeFrequency: "weekly" as const,
    priority: 0.8,
  },
  ...resourceArticles.map((article) => ({
    path: `/resources/${article.slug}`,
    lastModified: article.modifiedAt ?? article.publishedAt ?? "2026-08-29",
    changeFrequency: "monthly" as const,
    priority: 0.72,
  })),
  ...["/privacy", "/cookies", "/terms", "/audit-terms"].map((path) => ({
    path,
    lastModified: "2026-08-29",
    changeFrequency: "yearly" as const,
    priority: 0.25,
  })),
] as const;
