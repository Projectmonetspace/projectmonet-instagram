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
];

test("resource registry contains exactly the planned eight live articles", () => {
  const data = read("app/lib/resources.ts");
  assert.equal((data.match(/slug: "/g) ?? []).length, 8);
  for (const slug of slugs) assert.match(data, new RegExp(`slug: "${slug}"`));
  assert.doesNotMatch(data, /industry average|average agency charges|guaranteed results|AggregateRating/i);
});

test("resource articles have unique metadata, substantive sections, and human CTAs", () => {
  const data = read("app/lib/resources.ts");
  assert.equal((data.match(/seoTitle: "/g) ?? []).length, 8);
  assert.equal((data.match(/description: "/g) ?? []).length >= 8, true);
  assert.equal((data.match(/heading: "/g) ?? []).length >= 60, true);
  assert.equal((data.match(/related: \[/g) ?? []).length, 8);
  assert.match(read("app/resources/[slug]/page.tsx"), /<PageCta/);
});

test("resource route is statically generated with Article and BreadcrumbList schema", () => {
  const page = read("app/resources/[slug]/page.tsx");
  const framework = read("app/components/page-framework.tsx");
  assert.match(page, /dynamicParams = false/);
  assert.match(page, /generateStaticParams/);
  assert.match(page, /generateMetadata/);
  assert.match(page, /"@type": "Article"/);
  assert.match(page, /datePublished: "2026-08-29"/);
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
  ]) assert.match(data, new RegExp(phrase));
  assert.doesNotMatch(data, /TOFU|MOFU|BOFU|unlock your potential|omnichannel ecosystem/i);
});
