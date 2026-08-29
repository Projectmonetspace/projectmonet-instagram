export const WEB3FORMS_ACCESS_KEY = "68c5446a-5663-4fb3-b70a-968ad99e0360";
export const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

export type FormKind = "audit" | "viral";
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
  if (name === "message" || name === "artificialGrowthDetails") return "";
  if (name === "consent") return value === true ? "" : "Consent is required before submission.";
  const text = clean(value, name === "email" || name === "instagram" ? 160 : limits.message);
  if (!text) return "Choose or enter an answer to continue.";
  if (name === "email" && !emailPattern.test(text)) return "Enter a valid email address.";
  if (name === "phone" && !normalizePhone(text)) return "Enter a valid phone or WhatsApp number.";
  if (name === "instagram" && !normalizeInstagram(text)) return "Enter a valid @handle or Instagram profile URL.";
  return "";
}

const auditRequired = [
  "name", "email", "phone", "businessName", "instagram", "niche", "goal", "resources",
  "decisionMaker", "managementBudget", "consent",
];

const viralRequired = [
  "name", "email", "businessName", "instagram", "niche", "followers", "normalReel", "goal",
  "spokesperson", "resourcesReady", "artificialGrowth", "creativeControl", "subjectiveRevisions",
  "cadence", "budget", "targetUnderstanding", "consent",
];

export function validateSubmission(kind: FormKind, values: LeadValues) {
  const fields = kind === "audit" ? auditRequired : viralRequired;
  const errors: Record<string, string> = {};
  for (const field of fields) {
    const error = validateField(field, values[field] ?? "");
    if (error) errors[field] = error;
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
  submittedAt: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
};

export function buildWeb3FormsPayload(kind: FormKind, values: LeadValues, context: SubmissionContext) {
  const common = {
    access_key: WEB3FORMS_ACCESS_KEY,
    from_name: "ProjectMonet.com",
    name: clean(values.name, limits.name),
    email: clean(values.email, limits.email).toLowerCase(),
    form_type: kind === "audit" ? "free_instagram_audit" : "viral_mandate_qualification",
    source_page: clean(context.sourcePage, 240),
    submitted_at: context.submittedAt,
    utm_source: clean(context.utmSource, 120) || "Not provided",
    utm_medium: clean(context.utmMedium, 120) || "Not provided",
    utm_campaign: clean(context.utmCampaign, 160) || "Not provided",
    botcheck: "",
  };

  if (kind === "audit") {
    return {
      ...common,
      subject: `Free Instagram Audit — ${clean(values.businessName, limits.businessName)}`,
      "Phone / WhatsApp": normalizePhone(values.phone),
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

export function getSubmissionContext() : SubmissionContext {
  const params = new URLSearchParams(window.location.search);
  return {
    sourcePage: `${window.location.origin}${window.location.pathname}`,
    submittedAt: new Date().toISOString(),
    utmSource: params.get("utm_source") ?? undefined,
    utmMedium: params.get("utm_medium") ?? undefined,
    utmCampaign: params.get("utm_campaign") ?? undefined,
  };
}
