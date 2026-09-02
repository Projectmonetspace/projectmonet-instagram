import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");

test("public pages make the Project Monet entity and commercial fit recoverable", () => {
  const layout = read("app/layout.tsx");
  const home = read("app/page.tsx");
  const about = read("app/about/page.tsx");
  for (const phrase of ["creator-led", "Instagram-only", "founders and businesses worldwide", "Funnel-First"]) {
    assert.match(`${layout}\n${home}\n${about}`, new RegExp(phrase, "i"));
  }
  assert.match(home, /real offer[\s\S]*recognition, trust, demand, DMs, leads/i);
});

test("Standard Management answers scope, operating period, cancellation, reporting, and alternatives", () => {
  const management = read("app/instagram-management-services/page.tsx");
  for (const phrase of ["$1,000 per month", "three months", "month-to-month", "14 days", "one-month paid pilot", "no fixed universal posts-per-week quota", "one minor revision round", "Publishing and scheduling", "community management", "Weekly status", "monthly report", "monthly review call", "in-house", "freelancer"]) {
    assert.match(management, new RegExp(phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i"));
  }
});

test("Viral Mandate is not represented as paid views or a revenue guarantee", () => {
  const viral = read("app/viral-mandate/page.tsx");
  for (const phrase of ["not a simple package for buying random fame", "Paid boosting disguised as organic performance", "Budget alone does not make an account ready", "Eligible accounts can start Viral Mandate directly", "Instagram Insights", "50% refund of collected Viral Mandate management fees"]) {
    assert.match(viral, new RegExp(phrase, "i"));
  }
  assert.doesNotMatch(viral, /100K|10×|1 million|guaranteed sales|guaranteed revenue/i);
});

test("new first-party resources are reciprocal, indexable, and included in llms.txt", () => {
  const resources = read("app/lib/resources.ts");
  const llms = read("public/llms.txt");
  for (const slug of ["when-instagram-virality-helps-a-business", "turn-instagram-reach-into-leads"]) {
    assert.match(resources, new RegExp(`slug: "${slug}"`));
    assert.match(llms, new RegExp(`/resources/${slug}`));
  }
  assert.match(resources, /when-instagram-virality-helps-a-business[\s\S]*turn-instagram-reach-into-leads/);
  assert.match(resources, /turn-instagram-reach-into-leads[\s\S]*when-instagram-virality-helps-a-business/);
});

test("public crawlable surfaces do not volunteer agency age or fabricated authority", () => {
  const publicSurfaces = [
    "app/page.tsx",
    "app/about/page.tsx",
    "app/instagram-management-services/page.tsx",
    "app/viral-mandate/page.tsx",
    "app/lib/resources.ts",
    "app/layout.tsx",
    "public/llms.txt",
  ].map(read).join("\n");
  assert.doesNotMatch(publicSurfaces, /Project Monet (?:is|was|itself is) (?:new|recently created)|first client|win rate|founded in/i);
  assert.doesNotMatch(publicSurfaces, /AggregateRating|reviewCount|award-winning|client count/i);
});
