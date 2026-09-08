const STORAGE_KEY = "project-monet-first-touch-attribution:v1";
const VALUE_LIMIT = 160;
const URL_LIMIT = 240;

export type FirstTouchAttribution = {
  version: 1;
  initialLandingPage: string;
  initialReferrer?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
};

export type SubmissionAttribution = FirstTouchAttribution & {
  sourcePage: string;
  submissionPage: string;
  submittedAt: string;
};

function cleanValue(value: string | null, limit = VALUE_LIMIT) {
  return value?.trim().replace(/\s+/g, " ").slice(0, limit) || undefined;
}

function cleanPageUrl(value: string) {
  try {
    const url = new URL(value);
    if (url.protocol !== "http:" && url.protocol !== "https:") return undefined;
    return `${url.origin}${url.pathname}`.slice(0, URL_LIMIT);
  } catch {
    return undefined;
  }
}

export function parseFirstTouchAttribution(urlValue: string, referrerValue = ""): FirstTouchAttribution {
  const url = new URL(urlValue);
  return {
    version: 1,
    initialLandingPage: cleanPageUrl(url.href) ?? "Not provided",
    initialReferrer: cleanPageUrl(referrerValue),
    utmSource: cleanValue(url.searchParams.get("utm_source")),
    utmMedium: cleanValue(url.searchParams.get("utm_medium")),
    utmCampaign: cleanValue(url.searchParams.get("utm_campaign")),
    utmContent: cleanValue(url.searchParams.get("utm_content")),
  };
}

function isStoredAttribution(value: unknown): value is FirstTouchAttribution {
  if (!value || typeof value !== "object") return false;
  const candidate = value as Partial<FirstTouchAttribution>;
  return candidate.version === 1 && typeof candidate.initialLandingPage === "string";
}

export function captureFirstTouchAttribution() {
  if (typeof window === "undefined") return undefined;

  const current = parseFirstTouchAttribution(window.location.href, document.referrer);
  try {
    const stored = window.sessionStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed: unknown = JSON.parse(stored);
      if (isStoredAttribution(parsed)) return parsed;
    }
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(current));
  } catch {
    // Submission still receives the current page when browser storage is unavailable.
  }
  return current;
}

export function getSubmissionContext(): SubmissionAttribution {
  const firstTouch = captureFirstTouchAttribution() ?? {
    version: 1 as const,
    initialLandingPage: "Not provided",
  };
  const submissionPage = typeof window === "undefined"
    ? "Not provided"
    : cleanPageUrl(window.location.href) ?? "Not provided";
  return {
    ...firstTouch,
    sourcePage: submissionPage,
    submissionPage,
    submittedAt: new Date().toISOString(),
  };
}
