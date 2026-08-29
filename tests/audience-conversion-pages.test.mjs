import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");

const routes = [
  ["instagram-marketing-for-founders", "Instagram Marketing for Founders | Project Monet"],
  ["instagram-marketing-for-small-business", "Instagram Marketing for Small Business | Project Monet"],
  ["instagram-audit", "Free Instagram Audit | Project Monet"],
  ["viral-mandate", "Viral Mandate Instagram Growth Offer | Project Monet"],
  ["about", "About Project Monet | Creator-Led Instagram Agency"],
];

test("audience and conversion routes have unique metadata and are indexable", () => {
  const routeRegistry = read("app/lib/routes.ts");
  const llms = read("public/llms.txt");
  const titles = new Set();
  for (const [route, title] of routes) {
    const page = read(`app/${route}/page.tsx`);
    assert.match(page, new RegExp(title.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
    assert.match(page, /description:/);
    assert.match(routeRegistry, new RegExp(`/${route}`));
    assert.match(llms, new RegExp(`/${route}`));
    assert.equal(titles.has(title), false);
    titles.add(title);
  }
});

test("founder and small-business pages answer their audience intent without jargon", () => {
  const founder = read("app/instagram-marketing-for-founders/page.tsx");
  const small = read("app/instagram-marketing-for-small-business/page.tsx");
  assert.match(founder, /You do not need to become an influencer\./);
  assert.match(founder, /recognisable to the right people/i);
  assert.match(small, /You do not need millions of followers\./);
  for (const text of ["Find you", "Understand you", "Trust you", "Take action"]) assert.match(small, new RegExp(text));
  assert.doesNotMatch(`${founder}\n${small}`, /TOFU|MOFU|BOFU|omnichannel|growth loops/i);
});

test("Audit page reuses the shared wizard and sets honest boundaries", () => {
  const audit = read("app/instagram-audit/page.tsx");
  assert.match(audit, /LeadFormTrigger kind="audit"/);
  assert.match(audit, /Not a generic score\./);
  assert.match(audit, /does not include finished scripts, a full calendar, production, implementation, guaranteed results/i);
  assert.doesNotMatch(audit, /WEB3FORMS|access_key|<form/i);
});

test("Viral Mandate copy preserves qualification, control, term, and refund rules", () => {
  const viral = read("app/viral-mandate/page.tsx");
  for (const phrase of ["$2,500 per month", "six-month contract", "agreed viral reach", "50% refund", "Qualification", "brand, factual, legal, safety"]) assert.match(viral, new RegExp(phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i"));
  assert.match(viral, /LeadFormTrigger kind="viral"/);
  assert.match(viral, /Applying does not promise acceptance/i);
  assert.doesNotMatch(viral, /1M|1 million|10×|guaranteed followers|AggregateRating/i);
  assert.doesNotMatch(viral, /WEB3FORMS|access_key|<form/i);
});

test("About proof is public, attributed, and never presented as client work", () => {
  const about = read("app/about/page.tsx");
  for (const phrase of ["Sl6Dl7", "102K followers", "Poetrynyx", "200K followers", "not Project Monet client campaign results"]) assert.match(about, new RegExp(phrase, "i"));
  assert.doesNotMatch(about, /testimonial|client revenue|leads generated|client view count/i);
});

test("navigation exposes live audience and Viral routes without overloading desktop", () => {
  const header = read("app/components/site-header.tsx");
  for (const route of ["/instagram-marketing-for-founders", "/instagram-marketing-for-small-business", "/viral-mandate"]) assert.match(header, new RegExp(route));
  assert.match(header, /Who We Help/);
  assert.doesNotMatch(header, /href="\/resources"/);
});
