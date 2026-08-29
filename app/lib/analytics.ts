export type AnalyticsEvent =
  | "audit_request_click"
  | "viral_mandate_qualification_click"
  | "audit_submit_success"
  | "viral_application_submit_success"
  | "websites_link_click"
  | "click_to_email";

export const ANALYTICS_CONSENT_DEFAULT = "denied" as const;

export function trackEvent(name: AnalyticsEvent, detail: Record<string, string> = {}) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent("project-monet-analytics", { detail: { name, ...detail } }));
}
