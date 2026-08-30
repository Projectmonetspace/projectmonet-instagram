import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";
import { reelProof } from "../app/lib/reel-proof.ts";

const expectedOrder = [
  "C-p8e1myj2p",
  "C093-LuKwqW",
  "C2EimIbrsoS",
  "CzuANP0K5ML",
  "DAImKFKN01J",
  "C3xkNnAoWa_",
  "C6oczyKRM_L",
  "CrodTefqiKm",
  "DEZ1ybtyyck",
  "CzpAg5nKgWc",
  "DHJGgbCtvGF",
  "CytnwFRq0c2",
];

test("the creator-proof rail contains the 12 verified Reels in interleaved order", () => {
  assert.equal(reelProof.length, 12);
  assert.deepEqual(reelProof.map((reel) => reel.shortcode), expectedOrder);
  assert.deepEqual(reelProof.map((reel) => reel.account), [
    "Poetrynyx", "Sl6dl7", "Poetrynyx", "Sl6dl7", "Poetrynyx", "Sl6dl7",
    "Poetrynyx", "Sl6dl7", "Poetrynyx", "Sl6dl7", "Poetrynyx", "Sl6dl7",
  ]);
});

test("each Reel has its matching URL, local thumbnail, attribution, and verified metrics", () => {
  for (const reel of reelProof) {
    assert.equal(reel.href, `https://www.instagram.com/reel/${reel.shortcode}/`);
    assert.match(reel.thumbnail, new RegExp(`${reel.shortcode.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\.jpg$`));
    assert.ok(existsSync(new URL(`../public${reel.thumbnail}`, import.meta.url)), `${reel.shortcode} thumbnail exists`);
    assert.match(reel.handle, /^@(poetrynyx|sl6dl7)$/);
    assert.match(reel.label, /^(Team|Founder) \/ Creator Result$/);
    assert.match(reel.views, /^\d+(\.\d+)?M$/);
    if (reel.likes) assert.match(reel.likes, /^\d+(\.\d+)?[KM]$/);
  }
});

test("hidden-like Reels omit likes while all other supplied likes remain exact", () => {
  const metrics = Object.fromEntries(reelProof.map((reel) => [reel.shortcode, [reel.views, reel.likes]]));
  assert.deepEqual(metrics.C2EimIbrsoS, ["11.7M", undefined]);
  assert.deepEqual(metrics.DHJGgbCtvGF, ["5.4M", undefined]);
  assert.deepEqual(metrics["C-p8e1myj2p"], ["27.6M", "2.4M"]);
  assert.deepEqual(metrics["C093-LuKwqW"], ["9.5M", "685K"]);
});

test("the rail renders safe links, meaningful alt text, and hidden duplicate copies", () => {
  const rail = readFileSync(new URL("../app/components/reel-rail.tsx", import.meta.url), "utf8");
  assert.match(rail, /target="_blank"/);
  assert.match(rail, /rel="noopener noreferrer"/);
  assert.match(rail, /Instagram Reel cover from/);
  assert.match(rail, /aria-hidden=\{duplicate \|\| undefined\}/);
  assert.match(rail, /tabIndex=\{duplicate \? -1 : undefined\}/);
  assert.doesNotMatch(rail, /0 likes|N\/A likes|estimated likes/i);
});
