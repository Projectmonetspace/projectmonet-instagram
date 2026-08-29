"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import BrandMark from "./brand-mark";
import { useLeadForm } from "./lead-form-modal";
import { trackEvent } from "@/app/lib/analytics";

const links = [
  { label: "Results", href: "#results" },
  { label: "Method", href: "#method" },
  { label: "Services", href: "#services" },
  { label: "Pricing", href: "#offers" },
  { label: "FAQ", href: "#faq" },
];

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const { openForm } = useLeadForm();

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const escape = (event: KeyboardEvent) => { if (event.key === "Escape") setOpen(false); };
    document.addEventListener("keydown", escape);
    return () => { document.body.style.overflow = previous; document.removeEventListener("keydown", escape); };
  }, [open]);

  return (
    <>
      <nav className="site-nav" aria-label="Primary navigation">
        <a href="#top" aria-label="Project Monet home" onClick={() => setOpen(false)}><BrandMark /></a>
        <div className="desktop-nav glass-surface">
          {links.map((link) => <a key={link.href} href={link.href}>{link.label}</a>)}
        </div>
        <div className="desktop-actions glass-surface">
          <a href="https://www.projectmonet.space" target="_blank" rel="noreferrer" onClick={() => trackEvent("websites_link_click", { location: "header" })}>Websites ↗</a>
          <button type="button" onClick={(event) => openForm("audit", event.currentTarget, "header")}>Free Audit</button>
        </div>
        <button className="menu-toggle glass-surface" type="button" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen((value) => !value)}>
          {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </nav>
      <div id="mobile-menu" className={`mobile-menu ${open ? "is-open" : ""}`} aria-hidden={!open}>
        <button className="mobile-menu-backdrop" type="button" aria-label="Close menu" onClick={() => setOpen(false)} />
        <div className="mobile-menu-panel glass-surface">
          {links.map((link) => <a key={link.href} href={link.href} tabIndex={open ? 0 : -1} onClick={() => setOpen(false)}>{link.label}<span>↘</span></a>)}
          <button className="button button-light" type="button" tabIndex={open ? 0 : -1} onClick={(event) => { setOpen(false); openForm("audit", event.currentTarget, "mobile_menu"); }}>Get a Free Instagram Audit</button>
          <a className="button button-outline" href="https://www.projectmonet.space" target="_blank" rel="noreferrer" tabIndex={open ? 0 : -1}>Websites ↗</a>
        </div>
      </div>
    </>
  );
}
