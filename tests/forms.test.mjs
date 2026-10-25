import assert from "node:assert/strict";
import test from "node:test";
import { buildWeb3FormsPayload, getLeadRoute, getMeetingRoute, normalizeInstagram, normalizePhone, validateSubmission, WEB3FORMS_ACCESS_KEY } from "../app/lib/forms.ts";
import { parseFirstTouchAttribution } from "../app/lib/attribution.ts";

const audit = {
  name: "Mayank", email: "mayank@example.com", phoneCountry: "India", phoneCountryCode: "+91", phone: "+91 9876543210", businessName: "Example Studio",
  instagram: "@example.studio", niche: "Interior design", goal: "Get more DMs / leads", resources: "Founder footage",
  decisionMaker: "Yes", managementBudget: "Maybe", message: "", consent: true, botcheck: "",
};

const viral = {
  name: "Mayank", email: "mayank@example.com", businessName: "Example Studio", instagram: "instagram.com/example.studio",
  niche: "Interior design", followers: "12,000", normalReel: "3,000 views", goal: "Relevant reach", spokesperson: "Sometimes",
  resourcesReady: "Usually", artificialGrowth: "No", creativeControl: "Yes", subjectiveRevisions: "Yes", cadence: "Yes",
  budget: "Yes", targetUnderstanding: "Yes", message: "", consent: true, botcheck: "",
};

const meeting = {
  name: "Mayank", email: "mayank@example.com", role: "Founder or owner", businessName: "Example Studio",
  accountStatus: "We have an Instagram account", instagram: "@example.studio", website: "https://example.com",
  offer: "An interior design studio for homeowners", service: "Ongoing Instagram management", goal: "DMs or leads",
  budget: "$1,000–$2,499", timeline: "Now or within 30 days", decisionMaker: "Yes", resourcesReady: "Yes",
  message: "", consent: true, botcheck: "",
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
  const missingCountry = validateSubmission("audit", { ...audit, phoneCountry: "", phoneCountryCode: "", phone: "" });
  for (const field of ["phoneCountry", "phoneCountryCode", "phone"]) assert.ok(missingCountry[field]);
});

test("builds differentiated provider payloads with first touch, submission page, UTMs, and no private inbox", () => {
  const context = { sourcePage: "https://www.projectmonet.com/contact", initialLandingPage: "https://www.projectmonet.com/instagram-audit", initialReferrer: "https://chatgpt.com/", submissionPage: "https://www.projectmonet.com/contact", submittedAt: "2026-08-29T12:00:00.000Z", utmSource: "chatgpt.com", utmContent: "lead_004_t1" };
  const auditPayload = buildWeb3FormsPayload("audit", audit, context);
  const viralPayload = buildWeb3FormsPayload("viral", viral, context);
  assert.equal(auditPayload.access_key, WEB3FORMS_ACCESS_KEY);
  assert.equal(auditPayload.form_type, "free_instagram_audit");
  assert.equal(auditPayload["Phone / WhatsApp"], "+919876543210");
  assert.equal(auditPayload.Country, "India");
  assert.equal(auditPayload["Country calling code"], "+91");
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

test("meeting screening routes budget uncertainty to email and early-stage leads to the audit", () => {
  assert.deepEqual(validateSubmission("meeting", meeting), {});
  const cases = [
    [{ budget: "Unsure" }, "email"],
    [{ budget: "Under $1,000" }, "audit"],
    [{ budget: "Under $1,000", accountStatus: "We haven't launched yet", instagram: "" }, "email"],
    [{ timeline: "Just researching" }, "audit"],
    [{ service: "Help with other platforms" }, "email"],
    [{ service: "Viral Mandate" }, "email"],
    [{ service: "Viral Mandate", budget: "$2,500+" }, "qualified"],
    [{ decisionMaker: "No" }, "email"],
    [{ resourcesReady: "No" }, "email"],
    [{ accountStatus: "We haven't launched yet", instagram: "" }, "qualified"],
  ];
  for (const [changes, expected] of cases) assert.equal(getMeetingRoute({ ...meeting, ...changes }), expected);
  assert.ok(validateSubmission("meeting", { ...meeting, instagram: "not-a-real-url.com" }).instagram);
  assert.deepEqual(validateSubmission("meeting", { ...meeting, accountStatus: "We haven't launched yet", instagram: "" }), {});
  assert.ok(validateSubmission("meeting", { ...meeting, offer: "", consent: false }).offer);
});

test("meeting email clearly highlights qualified status and includes screening answers", () => {
  const context = { sourcePage: "https://www.projectmonet.com/", submittedAt: "2026-10-25T12:00:00.000Z" };
  const qualified = buildWeb3FormsPayload("meeting", meeting, context);
  const uncertain = buildWeb3FormsPayload("meeting", { ...meeting, budget: "Unsure" }, context);
  assert.equal(qualified.access_key, WEB3FORMS_ACCESS_KEY);
  assert.match(qualified.subject, /^\[MEETING QUALIFIED\]/);
  assert.match(qualified["Meeting status"], /^MEETING QUALIFIED/);
  assert.equal(qualified["Internal meeting route"], "qualified");
  assert.equal(qualified["Monthly service budget"], "$1,000–$2,499");
  assert.equal(qualified.form_type, "meeting_qualification");
  assert.match(uncertain.subject, /^\[MEETING NOT QUALIFIED\]/);
  assert.equal(uncertain["Internal meeting route"], "email");
});
