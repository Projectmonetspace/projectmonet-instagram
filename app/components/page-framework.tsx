import Link from "next/link";
import { ArrowRight } from "lucide-react";
import AnalyticsLink from "./analytics-link";
import { LeadFormTrigger } from "./lead-form-modal";
import SiteHeader from "./site-header";
import { absoluteUrl } from "@/app/lib/site";

export type Crumb = { label: string; href: string };

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <ol>{items.map((item, index) => <li key={item.href}>{index ? <span aria-hidden="true">/</span> : null}{index === items.length - 1 ? <span aria-current="page">{item.label}</span> : <Link href={item.href}>{item.label}</Link>}</li>)}</ol>
    </nav>
  );
}

export function BreadcrumbSchema({ items }: { items: Crumb[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({ "@type": "ListItem", position: index + 1, name: item.label, item: absoluteUrl(item.href) })),
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}

export function PageHero({ eyebrow, title, intro, path, currentLabel, primaryKind = "audit", primaryLabel = "Get a Free Instagram Audit", showPrimary = true, children }: { eyebrow: string; title: string; intro: string; path: string; currentLabel: string; primaryKind?: "audit" | "viral"; primaryLabel?: string; showPrimary?: boolean; children?: React.ReactNode }) {
  return (
    <header className="page-hero dark-section">
      <SiteHeader />
      <div className="page-shell page-hero-inner">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: currentLabel, href: path }]} />
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p className="page-hero-intro">{intro}</p>
        {(showPrimary || children) && <div className="hero-actions">
          {showPrimary && <LeadFormTrigger kind={primaryKind} location={`page_hero_${path.slice(1)}`} className="button button-orange">{primaryLabel}</LeadFormTrigger>}
          {children}
        </div>}
      </div>
    </header>
  );
}

export function PageCta({ title = "Start with the account you have.", copy = "We will show you what is helping, what is weak, and what we would fix first." }: { title?: string; copy?: string }) {
  return (
    <section className="page-cta orange-section">
      <div className="page-shell">
        <p className="eyebrow">Free Instagram Audit</p>
        <h2>{title}</h2>
        <p>{copy}</p>
        <LeadFormTrigger kind="audit" location="page_final_cta" className="button button-ink">Get a Free Instagram Audit</LeadFormTrigger>
      </div>
    </section>
  );
}

export function RelatedLinks({ title = "Keep exploring", links }: { title?: string; links: Array<{ href: string; label: string; copy: string }> }) {
  return (
    <section className="related-section dark-section">
      <div className="page-shell">
        <p className="eyebrow">Related pages</p>
        <h2>{title}</h2>
        <div className="related-grid">{links.map((link) => <Link key={link.href} href={link.href}><strong>{link.label}</strong><span>{link.copy}</span><ArrowRight aria-hidden="true" /></Link>)}</div>
      </div>
    </section>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="page-shell">
        <div><strong>Project Monet</strong><AnalyticsLink href="mailto:contact@projectmonet.com" event="click_to_email" location="footer">contact@projectmonet.com</AnalyticsLink></div>
        <div className="footer-links"><AnalyticsLink href="https://www.projectmonet.space" target="_blank" rel="noreferrer" event="websites_link_click" location="footer">Websites ↗</AnalyticsLink><nav aria-label="Legal"><Link href="/privacy">Privacy</Link><Link href="/cookies">Cookies</Link><Link href="/terms">Terms</Link><Link href="/audit-terms">Audit Terms</Link></nav></div>
      </div>
    </footer>
  );
}
