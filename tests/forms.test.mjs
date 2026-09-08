import assert from "node:assert/strict";
import test from "node:test";
import { buildWeb3FormsPayload, getLeadRoute, normalizeInstagram, normalizePhone, validateSubmission, WEB3FORMS_ACCESS_KEY } from "../app/lib/forms.ts";
import { parseFirstTouchAttribution } from "../app/lib/attribution.ts";

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

test("builds differentiated provider payloads with first touch, submission page, UTMs, and no private inbox", () => {
  const context = { sourcePage: "https://www.projectmonet.com/contact", initialLandingPage: "https://www.projectmonet.com/instagram-audit", initialReferrer: "https://chatgpt.com/", submissionPage: "https://www.projectmonet.com/contact", submittedAt: "2026-08-29T12:00:00.000Z", utmSource: "chatgpt.com", utmContent: "lead_004_t1" };
  const auditPayload = buildWeb3FormsPayload("audit", audit, context);
  const viralPayload = buildWeb3FormsPayload("viral", viral, context);
  assert.equal(auditPayload.access_key, WEB3FORMS_ACCESS_KEY);
  assert.equal(auditPayload.form_type, "free_instagram_audit");
  assert.equal(viralPayload.form_type, "viral_mandate_qualification");
  assert.equal(auditPayload.utm_source, "chatgpt.com");
  assert.equal(auditPayload.utm_content, "lead_004_t1");
  assert.equal(auditPayload.initial_landing_page, "https://www.projectmonet.com/instagram-audit");
  assert.equal(auditPayload.submission_page, "https://www.projectmonet.com/contact");
  assert.equal(viralPayload["Internal lead route"], "viral_mandate_human_review");
  assert.doesNotMatch(JSON.stringify([auditPayload, viralPayload]), /@gmail\.com/i);
});

test("captures safe first-touch attribution and drops query strings from stored URLs", () => {
  const attribution = parseFirstTouchAttribution(
    "https://www.projectmonet.com/instagram-audit?utm_source=chatgpt.com&utm_medium=referral&utm_campaign=audit&utm_content=lead_004_t1&email=private@example.com",
    "https://chatgpt.com/c/example?private=value",
  );
  assert.deepEqual(attribution, {
    version: 1,
    initialLandingPage: "https://www.projectmonet.com/instagram-audit",
    initialReferrer: "https://chatgpt.com/c/example",
    utmSource: "chatgpt.com",
    utmMedium: "referral",
    utmCampaign: "audit",
    utmContent: "lead_004_t1",
  });
});

test("keeps Viral submission open while routing creative-control or budget No answers to nurture", () => {
  assert.equal(getLeadRoute({ creativeControl: "No", budget: "Yes" }), "likely_standard_management_or_nurture");
  assert.equal(getLeadRoute({ creativeControl: "Yes", budget: "No" }), "likely_standard_management_or_nurture");
  assert.deepEqual(validateSubmission("viral", { ...viral, creativeControl: "No", budget: "No" }), {});
});
