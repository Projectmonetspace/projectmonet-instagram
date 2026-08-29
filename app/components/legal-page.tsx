import Link from "next/link";
import { BreadcrumbSchema, PageHero, SiteFooter } from "./page-framework";
import { absoluteUrl } from "@/app/lib/site";

export type LegalSection = { heading: string; paragraphs?: string[]; bullets?: string[] };

export default function LegalPage({ path, title, intro, updated, sections, related }: { path: string; title: string; intro: string; updated: string; sections: LegalSection[]; related: Array<{ href: string; label: string }> }) {
  const crumbs = [{ label: "Home", href: "/" }, { label: title, href: path }];
  const schema = { "@context": "https://schema.org", "@type": "WebPage", name: title, url: absoluteUrl(path), dateModified: "2026-08-29", isPartOf: { "@type": "WebSite", name: "Project Monet", url: absoluteUrl("/") } };
  return (
    <>
      <main>
        <PageHero eyebrow="Project Monet Legal" title={title} intro={intro} path={path} currentLabel={title} showPrimary={false} />
        <article className="legal-page warm-section">
          <div className="legal-shell">
            <p className="legal-updated">Last updated: {updated}</p>
            {sections.map((section, index) => <section key={section.heading}><div><span>{String(index + 1).padStart(2, "0")}</span><h2>{section.heading}</h2></div><div>{section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}{section.bullets && <ul>{section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>}</div></section>)}
            <nav className="legal-links" aria-label="Related legal pages">{related.map((link) => <Link key={link.href} href={link.href}>{link.label}</Link>)}</nav>
          </div>
        </article>
      </main>
      <SiteFooter />
      <BreadcrumbSchema items={crumbs} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </>
  );
}
