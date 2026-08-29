import assert from "node:assert/strict";
import test from "node:test";
import { buildWeb3FormsPayload, getLeadRoute, normalizeInstagram, normalizePhone, validateSubmission, WEB3FORMS_ACCESS_KEY } from "../app/lib/forms.ts";

const audit = {
  name: "Mayank", email: "mayank@example.com", phone: "+91 9876543210", businessName: "Example Studio",
  instagram: "@example.studio", niche: "Interior design", goal: "Get more DMs / leads", resources: "Founder footage",
  decisionMaker: "Yes", managementBudget: "Maybe", message: "", consent: true, botcheck: "",
};

const viral = {
  name: "Mayank", email: "mayank@example.com", businessName: "Example Studio", instagram: "instagram.com/example.studio",
  niche: "Interior design", followers: "12,000", normalReel: "3,000 views", goal: "Relevant reach", spokesperson: "Sometimes",
  resourcesReady: "Usually", artificialGrowth: "No", creativeControl: "Yes", subjectiveRevisions: "Yes", cadence: "Yes",
  budget: "Yes", targetUnderstanding: "Yes", message: "", consent: true, botcheck: "",
};

test("normalizes supported Instagram and phone formats", () => {
  assert.equal(normalizeInstagram("projectmonet"), "@projectmonet");
  assert.equal(normalizeInstagram("https://instagram.com/projectmonet/"), "https://www.instagram.com/projectmonet/");
  assert.equal(normalizeInstagram("https://example.com/projectmonet"), "");
  assert.equal(normalizePhone("+91 (98765) 43210"), "+919876543210");
  assert.equal(normalizePhone("12"), "");
});

test("validates both complete flows and rejects required, consent, Instagram, and honeypot failures", () => {
  assert.deepEqual(validateSubmission("audit", audit), {});
  assert.deepEqual(validateSubmission("viral", viral), {});
  const invalid = validateSubmission("audit", { ...audit, email: "bad", instagram: "example.com/no", consent: false, botcheck: "spam" });
  for (const field of ["email", "instagram", "consent", "form"]) assert.ok(invalid[field]);
});

test("builds differentiated provider payloads with source, timestamp, UTMs, and no private inbox", () => {
  const context = { sourcePage: "https://www.projectmonet.com/", submittedAt: "2026-08-29T12:00:00.000Z", utmSource: "instagram" };
  const auditPayload = buildWeb3FormsPayload("audit", audit, context);
  const viralPayload = buildWeb3FormsPayload("viral", viral, context);
  assert.equal(auditPayload.access_key, WEB3FORMS_ACCESS_KEY);
  assert.equal(auditPayload.form_type, "free_instagram_audit");
  assert.equal(viralPayload.form_type, "viral_mandate_qualification");
  assert.equal(auditPayload.utm_source, "instagram");
  assert.equal(viralPayload["Internal lead route"], "viral_mandate_human_review");
  assert.doesNotMatch(JSON.stringify([auditPayload, viralPayload]), /@gmail\.com/i);
});

test("keeps Viral submission open while routing creative-control or budget No answers to nurture", () => {
  assert.equal(getLeadRoute({ creativeControl: "No", budget: "Yes" }), "likely_standard_management_or_nurture");
  assert.equal(getLeadRoute({ creativeControl: "Yes", budget: "No" }), "likely_standard_management_or_nurture");
  assert.deepEqual(validateSubmission("viral", { ...viral, creativeControl: "No", budget: "No" }), {});
});
