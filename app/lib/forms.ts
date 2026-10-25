export const WEB3FORMS_ACCESS_KEY = "68c5446a-5663-4fb3-b70a-968ad99e0360";
export const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

export type FormKind = "audit" | "viral" | "meeting";
export type LeadValues = Record<string, string | boolean>;

export const limits = {
  name: 80,
  email: 160,
  phone: 40,
  businessName: 120,
  instagram: 160,
  niche: 120,
  short: 220,
  medium: 800,
  message: 1200,
} as const;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const handlePattern = /^@?[A-Za-z0-9._]{1,30}$/;

export function clean(value: unknown, limit: number) {
  return typeof value === "string" ? value.trim().replace(/\s+/g, " ").slice(0, limit) : "";
}

export function normalizePhone(value: unknown) {
  const input = clean(value, limits.phone);
  const digits = input.replace(/\D/g, "");
  if (digits.length < 7 || digits.length > 15) return "";
  return input.startsWith("+") ? `+${digits}` : digits;
}

export function normalizeInstagram(value: unknown) {
  const input = clean(value, limits.instagram);
  if (handlePattern.test(input)) return input.startsWith("@") ? input : `@${input}`;
  try {
    const url = new URL(input.startsWith("http") ? input : `https://${input}`);
    const host = url.hostname.toLowerCase().replace(/^www\./, "");
    if (host !== "instagram.com") return "";
    const handle = url.pathname.split("/").filter(Boolean)[0] ?? "";
    return handlePattern.test(handle) ? `https://www.instagram.com/${handle.replace(/^@/, "")}/` : "";
  } catch {
    return "";
  }
}

export function validateField(name: string, value: string | boolean) {
  if (name === "message" || name === "artificialGrowthDetails" || name === "website") return "";
  if (name === "consent") return value === true ? "" : "Consent is required before submission.";
  const text = clean(value, name === "email" || name === "instagram" ? 160 : limits.message);
  if (!text) return "Choose or enter an answer to continue.";
  if (name === "email" && !emailPattern.test(text)) return "Enter a valid email address.";
  if (name === "phone" && !normalizePhone(text)) return "Enter a valid phone or WhatsApp number.";
  if (name === "instagram" && !normalizeInstagram(text)) return "Enter a valid @handle or Instagram profile URL.";
  return "";
}

const auditRequired = [
  "name", "email", "phoneCountry", "phoneCountryCode", "phone", "businessName", "instagram", "niche", "goal", "resources",
  "decisionMaker", "managementBudget", "consent",
];

const viralRequired = [
  "name", "email", "businessName", "instagram", "niche", "followers", "normalReel", "goal",
  "spokesperson", "resourcesReady", "artificialGrowth", "creativeControl", "subjectiveRevisions",
  "cadence", "budget", "targetUnderstanding", "consent",
];

const meetingRequired = [
  "name", "email", "role", "businessName", "accountStatus", "offer", "service", "goal",
  "budget", "timeline", "decisionMaker", "resourcesReady", "consent",
];

export type MeetingRoute = "qualified" | "audit" | "email";

export function getMeetingRoute(values: LeadValues): MeetingRoute {
  const hasAccount = values.accountStatus === "We have an Instagram account";
  if (values.role === "Other" || values.service === "One-off work" || values.service === "Help with other platforms") return "email";
  if (values.budget === "Unsure" || values.decisionMaker === "No" || values.resourcesReady === "No") return "email";
  if (values.service === "Viral Mandate" && values.budget === "$1,000–$2,499") return "email";
  if (values.budget === "Under $1,000" || values.timeline === "Later" || values.timeline === "Just researching") {
    return hasAccount ? "audit" : "email";
  }
  if (!["Founder or owner", "Creator or author", "Marketing lead or team member", "Agency representing a client"].includes(String(values.role))) return "email";
  if (!["Ongoing Instagram management", "Viral Mandate", "Help choosing between those"].includes(String(values.service))) return "email";
  if (!["$1,000–$2,499", "$2,500+"].includes(String(values.budget))) return "email";
  if (!["Now or within 30 days", "Within 1–3 months and choosing now"].includes(String(values.timeline))) return "email";
  if (!["Yes", "I'm part of the decision and can bring the approver"].includes(String(values.decisionMaker))) return "email";
  if (!["Yes", "Yes, with a little planning"].includes(String(values.resourcesReady))) return "email";
  return "qualified";
}

export function validateSubmission(kind: FormKind, values: LeadValues) {
  const fields = kind === "audit" ? auditRequired : kind === "viral" ? viralRequired : meetingRequired;
  const errors: Record<string, string> = {};
  for (const field of fields) {
    const error = validateField(field, values[field] ?? "");
    if (error) errors[field] = error;
  }
  if (kind === "meeting" && values.accountStatus === "We have an Instagram account") {
    const error = validateField("instagram", values.instagram ?? "");
    if (error) errors.instagram = error;
  }
  if (values.botcheck) errors.form = "Unable to process this request.";
  return errors;
}

export function getLeadRoute(values: LeadValues) {
  if (values.creativeControl === "No" || values.budget === "No") return "likely_standard_management_or_nurture";
  if (values.creativeControl === "I need to understand this better" || values.budget === "Need to discuss") {
    return "human_review_needs_clarification";
  }
  return "viral_mandate_human_review";
}

export type SubmissionContext = {
  sourcePage: string;
  initialLandingPage?: string;
  initialReferrer?: string;
  submissionPage?: string;
  submittedAt: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
};

export function buildWeb3FormsPayload(kind: FormKind, values: LeadValues, context: SubmissionContext) {
  const common = {
    access_key: WEB3FORMS_ACCESS_KEY,
    from_name: "ProjectMonet.com",
    name: clean(values.name, limits.name),
    email: clean(values.email, limits.email).toLowerCase(),
    form_type: kind === "audit" ? "free_instagram_audit" : kind === "viral" ? "viral_mandate_qualification" : "meeting_qualification",
    source_page: clean(context.submissionPage ?? context.sourcePage, 240),
    initial_landing_page: clean(context.initialLandingPage, 240) || "Not provided",
    initial_referrer: clean(context.initialReferrer, 240) || "Not provided",
    submission_page: clean(context.submissionPage ?? context.sourcePage, 240),
    submitted_at: context.submittedAt,
    utm_source: clean(context.utmSource, 120) || "Not provided",
    utm_medium: clean(context.utmMedium, 120) || "Not provided",
    utm_campaign: clean(context.utmCampaign, 160) || "Not provided",
    utm_content: clean(context.utmContent, 160) || "Not provided",
    botcheck: "",
  };

  if (kind === "audit") {
    return {
      ...common,
      subject: `Free Instagram Audit — ${clean(values.businessName, limits.businessName)}`,
      "Phone / WhatsApp": normalizePhone(values.phone),
      "Country": clean(values.phoneCountry, 80),
      "Country calling code": clean(values.phoneCountryCode, 8),
      "Business / Creator": clean(values.businessName, limits.businessName),
      Instagram: normalizeInstagram(values.instagram),
      "Niche / Category": clean(values.niche, limits.niche),
      "Instagram goal": clean(values.goal, limits.short),
      "Current content / resources": clean(values.resources, limits.medium),
      "Approval role": clean(values.decisionMaker, limits.short),
      "Open to management from $1,000/month": clean(values.managementBudget, limits.short),
      "Additional context": clean(values.message, limits.message) || "Not provided",
      "Privacy consent": "Yes",
    };
  }

  if (kind === "meeting") {
    const route = getMeetingRoute(values);
    return {
      ...common,
      subject: `[${route === "qualified" ? "MEETING QUALIFIED" : "MEETING NOT QUALIFIED"}] ${clean(values.businessName, limits.businessName)}`,
      "Meeting status": route === "qualified" ? "MEETING QUALIFIED — booking link shown after submission" : "MEETING NOT QUALIFIED — no booking link shown",
      "Internal meeting route": route,
      "Role": clean(values.role, limits.short),
      "Business / Creator": clean(values.businessName, limits.businessName),
      "Instagram status": clean(values.accountStatus, limits.short),
      Instagram: values.accountStatus === "We have an Instagram account" ? normalizeInstagram(values.instagram) : "Not launched",
      "Website": clean(values.website, limits.short) || "Not provided",
      "Offer and audience": clean(values.offer, limits.medium),
      "Requested service": clean(values.service, limits.short),
      "Instagram goal": clean(values.goal, limits.short),
      "Monthly service budget": clean(values.budget, limits.short),
      "Start timing": clean(values.timeline, limits.short),
      "Approval role": clean(values.decisionMaker, limits.short),
      "Inputs and approvals": clean(values.resourcesReady, limits.short),
      "Additional context": clean(values.message, limits.message) || "Not provided",
      "Privacy consent": "Yes",
    };
  }

  return {
    ...common,
    subject: `Viral Mandate Qualification — ${clean(values.businessName, limits.businessName)}`,
    "Business / Creator": clean(values.businessName, limits.businessName),
    Instagram: normalizeInstagram(values.instagram),
    "Industry / niche": clean(values.niche, limits.niche),
    "Current followers": clean(values.followers, limits.short),
    "Normal Reel performance": clean(values.normalReel, limits.short),
    "Main goal": clean(values.goal, limits.short),
    "Founder / spokesperson availability": clean(values.spokesperson, limits.short),
    "Inputs and approvals on time": clean(values.resourcesReady, limits.short),
    "Artificial growth history": clean(values.artificialGrowth, limits.short),
    "Artificial growth details": clean(values.artificialGrowthDetails, limits.medium) || "Not provided",
    "Accepts final creative control": clean(values.creativeControl, limits.short),
    "Avoids subjective revisions": clean(values.subjectiveRevisions, limits.short),
    "Six-month cadence": clean(values.cadence, limits.short),
    "Budget from $2,500/month": clean(values.budget, limits.short),
    "Understands written account-specific target": clean(values.targetUnderstanding, limits.short),
    "Additional context": clean(values.message, limits.message) || "Not provided",
    "Internal lead route": getLeadRoute(values),
    "Privacy consent": "Yes",
  };
}
