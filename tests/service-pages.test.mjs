import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");

const pages = [
  ["instagram-management-services", "Instagram Management Services | Project Monet", "Instagram management built around growth, trust, and business action."],
  ["instagram-content-creation-services", "Instagram Content Creation Services | Project Monet", "Instagram content with a reason to exist."],
  ["instagram-reels-agency", "Instagram Reels Agency | Project Monet", "Reels built to earn the next action, not only the view."],
  ["instagram-seo-services", "Instagram SEO Services | Project Monet", "Help the right people find and understand your Instagram."],
];

test("each service route has unique metadata and one declared page H1", () => {
  const seenTitles = new Set();
  for (const [route, title, h1] of pages) {
    const page = read(`app/${route}/page.tsx`);
    assert.match(page, new RegExp(title.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
    assert.match(page, new RegExp(h1.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
    assert.match(page, /description:/);
    assert.match(page, /<ServicePage data=\{data\}/);
    assert.equal(seenTitles.has(title), false, `${route} title is unique`);
    seenTitles.add(title);
  }
});

test("the shared service framework renders visible FAQs and matching valid schema", () => {
  const component = read("app/components/service-page.tsx");
  for (const type of ["Service", "FAQPage", "BreadcrumbList"]) assert.match(`${component}\n${read("app/components/page-framework.tsx")}`, new RegExp(type));
  assert.match(component, /data\.faqs\.map/);
  assert.match(component, /price: "1000"/);
  assert.match(component, /No virality guarantee\./);
  assert.doesNotMatch(component, /AggregateRating|reviewCount|guaranteed views|1 million/i);
});

test("service navigation and homepage cards use real internal routes", () => {
  const header = read("app/components/site-header.tsx");
  const homepage = read("app/page.tsx");
  for (const [route] of pages) {
    assert.match(header, new RegExp(`/${route}`));
    assert.match(homepage, new RegExp(`/${route}`));
  }
  assert.doesNotMatch(header, /data-future-href/);
});

test("service pages retain the shared audit wizard rather than duplicating form logic", () => {
  const framework = read("app/components/page-framework.tsx");
  const service = read("app/components/service-page.tsx");
  assert.match(framework, /LeadFormTrigger kind="audit"/);
  assert.doesNotMatch(service, /web3forms|access_key|<form/i);
});
