"use client";

import Link from "next/link";
import Script from "next/script";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { ANALYTICS_CONSENT_STORAGE_KEY, GA_MEASUREMENT_ID, safeAnalyticsEvent } from "@/app/lib/analytics";

type Consent = "accepted" | "declined" | null;
type Gtag = (...args: unknown[]) => void;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: Gtag;
  }
}

function storedConsent(): Consent {
  try {
    const value = window.localStorage.getItem(ANALYTICS_CONSENT_STORAGE_KEY);
    return value === "accepted" || value === "declined" ? value : null;
  } catch {
    return null;
  }
}

function prepareGoogleAnalytics() {
  window.dataLayer = window.dataLayer ?? [];
  window.gtag = window.gtag ?? ((...args: unknown[]) => window.dataLayer?.push(args));
  window.gtag("js", new Date());
  window.gtag("consent", "default", { analytics_storage: "denied", ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied" });
  window.gtag("consent", "update", { analytics_storage: "granted" });
  // GA's default page view can include query parameters such as email addresses.
  window.gtag("set", { page_location: cleanPageLocation(), page_referrer: cleanReferrer() });
  window.gtag("config", GA_MEASUREMENT_ID, { send_page_view: false, allow_google_signals: false, allow_ad_personalization_signals: false });
}

function cleanPageLocation() {
  return `${window.location.origin}${window.location.pathname}`;
}

function cleanReferrer() {
  try {
    const url = new URL(document.referrer);
    return url.protocol === "https:" || url.protocol === "http:" ? url.origin : "";
  } catch {
    return "";
  }
}

function removeAnalyticsCookies() {
  for (const entry of document.cookie.split(";")) {
    const name = entry.trim().split("=")[0];
    if (!/^_ga(?:_|$)|^_gid$|^_gat(?:_|$)/.test(name)) continue;
    document.cookie = `${name}=; Max-Age=0; Path=/; SameSite=Lax`;
    document.cookie = `${name}=; Max-Age=0; Path=/; Domain=.projectmonet.com; SameSite=Lax`;
  }
}

export default function GoogleAnalytics() {
  const pathname = usePathname();
  const [consent, setConsent] = useState<Consent>(null);
  const [ready, setReady] = useState(false);
  const [preferencesOpen, setPreferencesOpen] = useState(false);
  const [initialized, setInitialized] = useState(false);
  const consentRef = useRef<Consent>(null);

  function revokeAnalytics() {
    Object.assign(window, { [`ga-disable-${GA_MEASUREMENT_ID}`]: true });
    window.gtag?.("consent", "update", { analytics_storage: "denied" });
    removeAnalyticsCookies();
    consentRef.current = "declined";
    setConsent("declined");
    setInitialized(false);
    // The downloaded tag cannot be unloaded; reload the page with consent denied.
    window.location.reload();
  }

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const saved = storedConsent();
      if (saved === "accepted") prepareGoogleAnalytics();
      consentRef.current = saved;
      setConsent(saved);
      setReady(true);
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const open = () => setPreferencesOpen(true);
    const sync = (event: StorageEvent) => {
      if (event.key !== ANALYTICS_CONSENT_STORAGE_KEY) return;
      const next = storedConsent();
      if (consentRef.current === "accepted" && next !== "accepted") {
        revokeAnalytics();
        return;
      }
      if (next === "accepted" && consentRef.current !== "accepted") prepareGoogleAnalytics();
      consentRef.current = next;
      setConsent(next);
    };
    window.addEventListener("project-monet-open-cookie-preferences", open);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("project-monet-open-cookie-preferences", open);
      window.removeEventListener("storage", sync);
    };
  }, []);

  useEffect(() => {
    if (consent !== "accepted" || !initialized || !window.gtag) return;
    window.gtag("set", { page_location: cleanPageLocation(), page_referrer: cleanReferrer() });
    window.gtag("event", "page_view", { page_location: cleanPageLocation(), page_referrer: cleanReferrer(), page_title: document.title });
  }, [consent, initialized, pathname]);

  useEffect(() => {
    if (consent !== "accepted") return;

    function forwardEvent(event: Event) {
      const safe = safeAnalyticsEvent((event as CustomEvent<unknown>).detail);
      if (!safe || !window.gtag) return;
      const { name, parameters } = safe;
      window.gtag("event", name, parameters);
      if (name === "audit_submit_success" || name === "viral_application_submit_success" || (name === "meeting_qualification_submit_success" && parameters.route === "qualified")) {
        window.gtag("event", "generate_lead", parameters);
      }
    }

    window.addEventListener("project-monet-analytics", forwardEvent);
    return () => window.removeEventListener("project-monet-analytics", forwardEvent);
  }, [consent]);

  function choose(nextConsent: Exclude<Consent, null>) {
    try {
      window.localStorage.setItem(ANALYTICS_CONSENT_STORAGE_KEY, nextConsent);
    } catch {
      // The choice still applies for this page when storage is unavailable.
    }
    setPreferencesOpen(false);
    if (consentRef.current === "accepted" && nextConsent === "declined") {
      revokeAnalytics();
      return;
    }
    if (nextConsent === "accepted" && consentRef.current !== "accepted") prepareGoogleAnalytics();
    consentRef.current = nextConsent;
    setConsent(nextConsent);
  }

  return (
    <>
      {consent === "accepted" && (
        <Script
          id="project-monet-ga4"
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
          onReady={() => {
            if (consentRef.current !== "accepted") return;
            setInitialized(true);
          }}
        />
      )}
      {ready && (consent === null || preferencesOpen) && (
        <aside className="analytics-consent" aria-label="Analytics preferences" aria-live="polite">
          <div>
            <strong>Help us improve Project Monet.</strong>
            <p>Optional Google Analytics measures page use and successful enquiries. We exclude form answers and contact details from the events we send. Read our <Link href="/cookies">Cookies Policy</Link>.</p>
            {consent && <p className="analytics-current-choice">Current choice: {consent === "accepted" ? "analytics accepted" : "analytics declined"}.</p>}
          </div>
          <div className="analytics-consent-actions">
            <button type="button" className="button analytics-decline" onClick={() => choose("declined")}>Decline analytics</button>
            <button type="button" className="button button-orange" onClick={() => choose("accepted")}>Accept analytics</button>
            {consent && <button type="button" className="analytics-close" onClick={() => setPreferencesOpen(false)}>Close preferences</button>}
          </div>
        </aside>
      )}
    </>
  );
}
