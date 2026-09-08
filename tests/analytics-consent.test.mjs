import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");

test("loads the approved GA4 stream only after explicit consent", () => {
  const component = read("app/components/google-analytics.tsx");
  const analytics = read("app/lib/analytics.ts");
  assert.match(analytics, /G-GFLR7G4SSS/);
  assert.match(component, /consent === "accepted"/);
  assert.match(component, /googletagmanager\.com\/gtag\/js/);
  assert.match(component, /Accept analytics/);
  assert.match(component, /Decline/);
});

test("maps successful forms to the recommended lead event without form answers", () => {
  const component = read("app/components/google-analytics.tsx");
  assert.match(component, /audit_submit_success/);
  assert.match(component, /viral_application_submit_success/);
  assert.match(component, /"generate_lead"/);
  assert.doesNotMatch(component, /email|phone|instagram|businessName/);
});

test("allows the Google tag and collection endpoints in the production CSP", () => {
  const security = read("security-headers.mjs");
  assert.match(security, /script-src[^\n]+googletagmanager\.com/);
  assert.match(security, /connect-src[^\n]+\*\.google-analytics\.com/);
});
