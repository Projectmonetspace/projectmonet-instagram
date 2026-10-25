import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { safeAnalyticsEvent } from "../app/lib/analytics.ts";

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

test("exposes the non-modal consent banner without an incompatible dialog role", () => {
  const component = read("app/components/google-analytics.tsx");
  assert.match(component, /<aside className="analytics-consent" aria-label="Analytics preferences"/);
  assert.doesNotMatch(component, /<aside[^>]+role="dialog"/);
});

test("maps successful forms to the recommended lead event without form answers", () => {
  const component = read("app/components/google-analytics.tsx");
  assert.match(component, /audit_submit_success/);
  assert.match(component, /viral_application_submit_success/);
  assert.match(component, /"generate_lead"/);
  assert.match(component, /safeAnalyticsEvent/);
});

test("analytics event gate rejects arbitrary fields and unapproved values", () => {
  assert.deepEqual(safeAnalyticsEvent({ name: "audit_submit_success", form_type: "audit", email: "person@example.com", phone: "+123", message: "private" }), { name: "audit_submit_success", parameters: { form_type: "audit" } });
  assert.deepEqual(safeAnalyticsEvent({ name: "click_to_email", location: "footer", instagram: "@private" }), { name: "click_to_email", parameters: { location: "footer" } });
  assert.deepEqual(safeAnalyticsEvent({ name: "click_to_email", location: "person@example.com" }), { name: "click_to_email", parameters: {} });
  assert.equal(safeAnalyticsEvent({ name: "personal_information", email: "person@example.com" }), null);
});

test("withdrawal reloads without GA and page views omit query strings", () => {
  const component = read("app/components/google-analytics.tsx");
  const footer = read("app/components/page-framework.tsx");
  assert.match(component, /window\.location\.reload\(\)/);
  assert.match(component, /ga-disable-/);
  assert.match(component, /send_page_view: false/);
  assert.match(component, /location\.origin.*location\.pathname/);
  assert.match(footer, /CookiePreferencesButton/);
});

test("allows the Google tag and collection endpoints in the production CSP", () => {
  const security = read("security-headers.mjs");
  assert.match(security, /script-src[^\n]+googletagmanager\.com/);
  assert.match(security, /connect-src[^\n]+\*\.google-analytics\.com/);
});
