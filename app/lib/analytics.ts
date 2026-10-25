export type AnalyticsEvent =
  | "audit_request_click"
  | "viral_mandate_qualification_click"
  | "meeting_qualification_click"
  | "audit_submit_success"
  | "viral_application_submit_success"
  | "meeting_qualification_submit_success"
  | "websites_link_click"
  | "click_to_email";

export const GA_MEASUREMENT_ID = "G-GFLR7G4SSS";
export const ANALYTICS_CONSENT_STORAGE_KEY = "project-monet-analytics-consent:v1";

// Event fields are deliberately closed: form values and arbitrary URL data must not
// reach GA4 even if a future caller passes them to trackEvent.
export function safeAnalyticsEvent(detail: unknown) {
  if (!detail || typeof detail !== "object") return null;
  const fields = detail as Record<string, unknown>;
  const names: AnalyticsEvent[] = ["audit_request_click", "viral_mandate_qualification_click", "meeting_qualification_click", "audit_submit_success", "viral_application_submit_success", "meeting_qualification_submit_success", "websites_link_click", "click_to_email"];
  if (!names.includes(fields.name as AnalyticsEvent)) return null;
  const parameters: Record<string, string> = {};
  if (typeof fields.location === "string" && /^[a-z0-9_]{1,60}$/.test(fields.location)) parameters.location = fields.location;
  if (fields.form_type === "audit" || fields.form_type === "viral" || fields.form_type === "meeting") parameters.form_type = fields.form_type;
  if (fields.route === "qualified" || fields.route === "audit" || fields.route === "email") parameters.route = fields.route;
  return { name: fields.name as AnalyticsEvent, parameters };
}

export function trackEvent(name: AnalyticsEvent, detail: Record<string, string> = {}) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent("project-monet-analytics", { detail: { name, ...detail } }));
}
