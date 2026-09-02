import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");
const slugs = [
  "instagram-marketing-cost",
  "instagram-reels-strategy-for-business",
  "instagram-content-strategy-for-business",
  "instagram-profile-optimization",
  "instagram-seo-guide",
  "how-to-get-leads-from-instagram",
  "why-instagram-is-not-growing",
  "instagram-reels-for-small-business",
  "when-instagram-virality-helps-a-business",
  "turn-instagram-reach-into-leads",
];

test("resource registry contains exactly the ten live articles", () => {
  const data = read("app/lib/resources.ts");
  assert.equal((data.match(/slug: "/g) ?? []).length, 10);
  for (const slug of slugs) assert.match(data, new RegExp(`slug: "${slug}"`));
  assert.doesNotMatch(data, /industry average|average agency charges|guaranteed results|AggregateRating/i);
});

test("resource articles have unique metadata, substantive sections, and human CTAs", () => {
  const data = read("app/lib/resources.ts");
  assert.equal((data.match(/seoTitle: "/g) ?? []).length, 10);
  assert.equal((data.match(/description: "/g) ?? []).length >= 10, true);
  assert.equal((data.match(/heading: "/g) ?? []).length >= 78, true);
  assert.equal((data.match(/related: \[/g) ?? []).length, 10);
  assert.match(read("app/resources/[slug]/page.tsx"), /<PageCta/);
});

test("resource route is statically generated with Article and BreadcrumbList schema", () => {
  const page = read("app/resources/[slug]/page.tsx");
  const framework = read("app/components/page-framework.tsx");
  assert.match(page, /dynamicParams = false/);
  assert.match(page, /generateStaticParams/);
  assert.match(page, /generateMetadata/);
  assert.match(page, /"@type": "Article"/);
  assert.match(page, /datePublished: article\.publishedAt \?\? "2026-08-29"/);
  assert.match(page, /dateModified: article\.modifiedAt/);
  assert.match(framework, /"@type": "BreadcrumbList"/);
  assert.doesNotMatch(page, /FAQPage|AggregateRating|Review/);
});

test("required contextual internal-link paths are present", () => {
  const data = read("app/lib/resources.ts");
  for (const path of [
    "/instagram-seo-services",
    "/instagram-reels-agency",
    "/instagram-management-services",
    "/instagram-content-creation-services",
    "/instagram-marketing-for-small-business",
    "/instagram-audit",
    "/viral-mandate",
  ]) assert.match(data, new RegExp(path));
});

test("weak resource pages have contextual discovery links", () => {
  const data = read("app/lib/resources.ts");
  const pairs = [
    ["instagram-content-strategy-for-business", "/resources/turn-instagram-reach-into-leads"],
    ["how-to-get-leads-from-instagram", "/resources/instagram-content-strategy-for-business"],
    ["instagram-marketing-cost", "/instagram-management-services"],
    ["instagram-reels-for-small-business", "/instagram-reels-agency"],
    ["why-instagram-is-not-growing", "/resources/instagram-seo-guide"],
    ["instagram-seo-guide", "/resources/why-instagram-is-not-growing"],
  ];
  for (const [slug, href] of pairs) {
    const start = data.indexOf(`slug: "${slug}"`);
    const end = data.indexOf("\n  {\n    slug:", start + 10);
    assert.ok(start >= 0, `${slug} exists`);
    assert.ok(data.slice(start, end < 0 ? data.length : end).includes(`href: "${href}"`), `${slug} links contextually to ${href}`);
  }
});

test("public meta descriptions stay concise after the crawlability pass", () => {
  const sources = ["app/layout.tsx", "app/instagram-management-services/page.tsx", "app/instagram-seo-services/page.tsx", "app/instagram-content-creation-services/page.tsx", "app/resources/page.tsx", "app/instagram-reels-agency/page.tsx", "app/instagram-audit/page.tsx", "app/lib/resources.ts"];
  for (const source of sources) {
    const data = read(source);
    for (const match of data.matchAll(/description: "([^"]+)"/g)) assert.ok(match[1].length <= 160, `${source} description is <= 160 characters`);
  }
});

test("sitemap and llms consume the live resource registry", () => {
  const routes = read("app/lib/routes.ts");
  const llms = read("public/llms.txt");
  assert.match(routes, /resourceArticles\.map/);
  assert.match(routes, /path: "\/resources"/);
  for (const slug of slugs) assert.match(llms, new RegExp(`/resources/${slug}`));
  assert.doesNotMatch(llms, /private|CRM|hidden scoring/i);
  assert.doesNotMatch(llms, /instagram-marketing-cost-india|instagram-reels-for-small-business-india/);
});

test("legacy India resource routes permanently redirect to global canonicals", () => {
  const config = read("next.config.ts");
  assert.match(config, /source: "\/resources\/instagram-marketing-cost-india"[\s\S]*destination: "\/resources\/instagram-marketing-cost"[\s\S]*permanent: true/);
  assert.match(config, /source: "\/resources\/instagram-reels-for-small-business-india"[\s\S]*destination: "\/resources\/instagram-reels-for-small-business"[\s\S]*permanent: true/);
});

test("resource copy preserves plain-language strategic distinctions", () => {
  const data = read("app/lib/resources.ts");
  for (const phrase of [
    "Instagram SEO is not Google SEO",
    "The right viewer is more valuable than a random viewer",
    "A content strategy is a set of useful choices",
    "Do not solve every lead problem by making more Reels",
    "Be recognisable to the right people, not famous to everyone",
    "Useful virality expands a relevant message. Random virality expands a number.",
    "Reach → Profile visit → Profile understanding → Trust or follow → Relevant CTA → DM, lead, or business action",
  ]) assert.match(data, new RegExp(phrase));
  assert.doesNotMatch(data, /TOFU|MOFU|BOFU|unlock your potential|omnichannel ecosystem/i);
});
