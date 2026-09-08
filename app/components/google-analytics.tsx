"use client";

import Link from "next/link";
import Script from "next/script";
import { useEffect, useState } from "react";
import { ANALYTICS_CONSENT_STORAGE_KEY, GA_MEASUREMENT_ID } from "@/app/lib/analytics";

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

function initializeGoogleAnalytics() {
  window.dataLayer = window.dataLayer ?? [];
  window.gtag = window.gtag ?? ((...args: unknown[]) => window.dataLayer?.push(args));
  window.gtag("js", new Date());
  window.gtag("config", GA_MEASUREMENT_ID);
}

export default function GoogleAnalytics() {
  const [consent, setConsent] = useState<Consent>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setConsent(storedConsent());
      setReady(true);
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (consent !== "accepted") return;

    function forwardEvent(event: Event) {
      const detail = (event as CustomEvent<Record<string, string>>).detail;
      if (!detail?.name || !window.gtag) return;
      const { name, ...parameters } = detail;
      window.gtag("event", name, parameters);
      if (name === "audit_submit_success" || name === "viral_application_submit_success") {
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
    setConsent(nextConsent);
  }

  return (
    <>
      {consent === "accepted" && (
        <Script
          id="project-monet-ga4"
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
          onReady={initializeGoogleAnalytics}
        />
      )}
      {ready && consent === null && (
        <aside className="analytics-consent" role="dialog" aria-label="Analytics choice" aria-live="polite">
          <div>
            <strong>Help us improve Project Monet.</strong>
            <p>Optional Google Analytics measures page use and successful enquiries. It never receives your form answers or contact details. Read our <Link href="/cookies">Cookies Policy</Link>.</p>
          </div>
          <div className="analytics-consent-actions">
            <button type="button" className="button analytics-decline" onClick={() => choose("declined")}>Decline</button>
            <button type="button" className="button button-orange" onClick={() => choose("accepted")}>Accept analytics</button>
          </div>
        </aside>
      )}
    </>
  );
}
