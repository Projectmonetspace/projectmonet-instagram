import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");

test("homepage keeps the locked section order and one H1", () => {
  const page = read("app/page.tsx");
  const hero = read("app/components/hero.tsx");
  const order = ["<Hero", "id=\"results\"", "problem-section", "id=\"method\"", "id=\"services\"", "measurement-section", "audience-section warm-section", "small-business-section", "id=\"offers\"", "why-section", "audit-section", "id=\"faq\"", "final-cta", "<SiteFooter"];
  let cursor = -1;
  for (const marker of order) { const next = page.indexOf(marker, cursor + 1); assert.ok(next > cursor, `${marker} is in order`); cursor = next; }
  assert.equal((`${page}\n${hero}`.match(/<h1/g) ?? []).length, 1);
  assert.match(hero, /Build an Instagram presence people remember — and act on\./);
  assert.match(hero, /Creator-Led Instagram Marketing Agency/);
  assert.match(hero, /Remote\. Working with founders and businesses worldwide\./);
});

test("hero uses the untouched approved remote source and poster behavior", () => {
  const hero = read("app/components/hero.tsx");
  assert.match(hero, /https:\/\/d8j0ntlcm91z4\.cloudfront\.net\/user_38xzZboKViGWJOttwIXH07lWA1P\/hf_20260813_092641_de52eb87-daf2-41db-92cb-7a56eae012a5\.mp4/);
  for (const attribute of ["autoPlay", "muted", "loop", "playsInline", "poster=\"/media/hero-poster.webp\""]) assert.match(hero, new RegExp(attribute));
});

test("proof is attributed and identifies creator experience rather than client results", () => {
  const page = read("app/page.tsx");
  const rail = read("app/components/reel-rail.tsx");
  for (const text of ["Sl6Dl7", "102K followers", "Poetrynyx", "200K followers", "not Project Monet client results"]) assert.match(page, new RegExp(text, "i"));
  assert.match(page, /Results That Speak/);
  assert.match(rail, /Verified founder and team Instagram Reel results/);
});

test("automatic Reel rail cannot trap vertical scrolling", () => {
  const rail = read("app/components/reel-rail.tsx");
  const css = read("app/globals.css");
  assert.doesNotMatch(rail, /preventDefault|onWheel|setPointerCapture|onTouch/);
  assert.match(css, /\.reel-viewport \{[^}]*touch-action: pan-y;/s);
  assert.match(css, /\.reel-card \{[^}]*touch-action: pan-y;/s);
  assert.match(css, /\.reel-track \{[^}]*animation: rail-move/s);
  assert.match(css, /prefers-reduced-motion/);
});

test("both one-question wizards include required success states and do not redirect", () => {
  const modal = read("app/components/lead-form-modal.tsx");
  assert.match(modal, /Step \{index \+ 1\} of \{steps\.length\}/);
  for (const text of ["Your audit request is in.", "Your Viral Mandate application is in.", "aria-modal=\"true\"", "event.key === \"Escape\"", "document.body.style.overflow = \"hidden\""]) assert.ok(modal.includes(text));
  assert.match(modal, /focusableSelector/);
  assert.match(modal, /returnFocusRef\.current\.focus\(\)/);
  assert.doesNotMatch(modal, /window\.location|redirect/);
});

test("metadata and crawl files expose the homepage and live service routes", () => {
  const layout = read("app/layout.tsx");
  const sitemap = read("app/sitemap.ts");
  const routes = read("app/lib/routes.ts");
  const llms = read("public/llms.txt");
  assert.match(layout, /Instagram Marketing Agency for Founders & Businesses \| Project Monet/);
  assert.match(layout, /Project Monet is a creator-led Instagram marketing agency for founders and businesses worldwide\./);
  assert.match(layout, /areaServed: "Worldwide"/);
  assert.match(read("app/page.tsx"), /areaServed: "Worldwide"/);
  assert.match(read("app/components/service-page.tsx"), /areaServed: "Worldwide"/);
  assert.match(sitemap, /indexableRoutes\.map/);
  for (const route of ["instagram-management-services", "instagram-content-creation-services", "instagram-reels-agency", "instagram-seo-services"]) {
    assert.match(routes, new RegExp(route));
    assert.match(llms, new RegExp(route));
  }
  assert.doesNotMatch(routes, /\/blog/);
});

test("mobile CSS keeps the page, rails, and near-full-screen form usable", () => {
  const css = read("app/globals.css");
  assert.match(css, /@media \(max-width: 767px\)/);
  assert.match(css, /body \{[^}]*overflow-x: hidden/s);
  assert.match(css, /\.service-viewport \{[^}]*touch-action: pan-x pan-y/s);
  assert.match(css, /\.modal-panel \{[^}]*width: 100%;[^}]*height: calc\(100dvh/s);
  assert.match(css, /\.modal-close \{[^}]*position: sticky/s);
  assert.match(css, /env\(safe-area-inset-bottom\)/);
  assert.match(css, /\.wizard-step \{[^}]*overflow-y: auto/s);
});
