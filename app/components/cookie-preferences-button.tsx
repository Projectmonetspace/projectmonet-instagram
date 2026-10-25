"use client";

export default function CookiePreferencesButton() {
  return <button type="button" className="cookie-preferences-link" onClick={() => window.dispatchEvent(new Event("project-monet-open-cookie-preferences"))}>Cookie preferences</button>;
}
