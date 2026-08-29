import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");

const legalPages = [
  ["privacy", "Privacy Policy | Project Monet"],
  ["cookies", "Cookies Policy | Project Monet"],
  ["terms", "Website Terms | Project Monet"],
  ["audit-terms", "Free Instagram Audit Terms | Project Monet"],
];

test("all legal pages have unique metadata, visible content, and live route entries", () => {
  const routes = read("app/lib/routes.ts");
  const llms = read("public/llms.txt");
  const titles = new Set();
  for (const [route, title] of legalPages) {
    const page = read(`app/${route}/page.tsx`);
    assert.match(page, new RegExp(title.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
    assert.match(page, /description:/);
    assert.match(routes, new RegExp(`/${route}`));
    assert.match(llms, new RegExp(`/${route}`));
    assert.equal(titles.has(title), false);
    titles.add(title);
  }
});

test("privacy and cookies copy match current provider and analytics configuration", () => {
  const privacy = read("app/privacy/page.tsx");
  const cookies = read("app/cookies/page.tsx");
  assert.match(privacy, /Web3Forms/);
  assert.match(privacy, /retains submission records for up to 3 years/);
  assert.match(privacy, /form answers or other personal information will not be sent as analytics event data/);
  assert.match(cookies, /does not currently have an approved analytics Measurement ID active/);
  assert.match(cookies, /consent will be denied by default/);
  assert.doesNotMatch(`${privacy}\n${cookies}`, /recipient email|68c5446a-5663-4fb3-b70a-968ad99e0360/i);
});

test("website and Audit terms do not invent or broaden Viral Mandate guarantees", () => {
  const terms = read("app/terms/page.tsx");
  const audit = read("app/audit-terms/page.tsx");
  assert.match(terms, /signed Viral Mandate agreement/);
  assert.match(terms, /website copy does not create an unconditional viral promise/i);
  assert.match(audit, /not an automated score, a complete free strategy, or a promise of growth/i);
  assert.match(audit, /does not include a complete strategy, finished scripts, a content calendar, production, implementation/i);
  assert.doesNotMatch(`${terms}\n${audit}`, /1 million|10×|guaranteed followers|baseline formula/i);
});

test("schema scope is normalized by route", () => {
  const layout = read("app/layout.tsx");
  const home = read("app/page.tsx");
  const service = read("app/components/service-page.tsx");
  const resource = read("app/resources/[slug]/page.tsx");
  const legal = read("app/components/legal-page.tsx");
  assert.match(layout, /"@type": "Organization"/);
  assert.match(layout, /"@type": "WebSite"/);
  assert.doesNotMatch(layout, /"@type": "Service"|"@type": "Article"|"@type": "FAQPage"/);
  assert.match(home, /"@type": "Service"/);
  assert.match(home, /"@type": "FAQPage"/);
  assert.match(service, /"@type": "Service"/);
  assert.match(resource, /"@type": "Article"/);
  assert.match(legal, /"@type": "WebPage"/);
});

test("canonical, robots, sitemap, and footer use the configured production host and live paths", () => {
  const site = read("app/lib/site.ts");
  const robots = read("app/robots.ts");
  const sitemap = read("app/sitemap.ts");
  const footer = read("app/components/page-framework.tsx");
  assert.match(site, /SITE_ORIGIN = "https:\/\/www\.projectmonet\.com"/);
  assert.match(robots, /allow: "\/"/);
  assert.match(robots, /https:\/\/www\.projectmonet\.com\/sitemap\.xml/);
  assert.match(sitemap, /indexableRoutes\.map/);
  for (const path of ["/privacy", "/cookies", "/terms", "/audit-terms"]) assert.match(footer, new RegExp(path));
  assert.doesNotMatch(read("app/lib/routes.ts"), /_not-found|\/api\/|test-page/);
});
