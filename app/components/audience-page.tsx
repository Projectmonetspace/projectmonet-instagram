import { ArrowRight, Check } from "lucide-react";
import Link from "next/link";
import { absoluteUrl } from "@/app/lib/site";
import { BreadcrumbSchema, PageCta, PageHero, RelatedLinks, SiteFooter } from "./page-framework";

export type AudiencePageData = {
  path: string;
  eyebrow: string;
  h1: string;
  intro: string;
  truthTitle: string;
  truthCopy: string[];
  pathTitle: string;
  pathSteps: Array<{ title: string; copy: string }>;
  contentTitle: string;
  contentIntro: string;
  contentIdeas: string[];
  systemTitle: string;
  systemCopy: string[];
  faqs: Array<[string, string]>;
  related: Array<{ href: string; label: string; copy: string }>;
};

export default function AudiencePage({ data }: { data: AudiencePageData }) {
  const crumbs = [{ label: "Home", href: "/" }, { label: data.eyebrow, href: data.path }];
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: data.eyebrow,
    url: absoluteUrl(data.path),
    description: data.intro,
    audience: { "@type": "Audience", audienceType: data.eyebrow.replace("Instagram Marketing for ", "") },
    provider: { "@type": "Organization", name: "Project Monet", url: absoluteUrl("/") },
  };
  const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: data.faqs.map(([name, text]) => ({ "@type": "Question", name, acceptedAnswer: { "@type": "Answer", text } })) };

  return (
    <>
      <main>
        <PageHero eyebrow={data.eyebrow} title={data.h1} intro={data.intro} path={data.path} currentLabel={data.eyebrow} />

        <section className="editorial-section warm-section">
          <div className="page-shell editorial-split">
            <div><p className="eyebrow">The useful truth</p><h2>{data.truthTitle}</h2></div>
            <div className="prose-large">{data.truthCopy.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
          </div>
        </section>

        <section className="audience-path dark-section">
          <div className="page-shell">
            <p className="eyebrow">The account path</p>
            <h2>{data.pathTitle}</h2>
            <div className="audience-path-grid">{data.pathSteps.map((step, index) => <article key={step.title}><span>{String(index + 1).padStart(2, "0")}</span><ArrowRight aria-hidden="true" /><h3>{step.title}</h3><p>{step.copy}</p></article>)}</div>
          </div>
        </section>

        <section className="content-source warm-section">
          <div className="page-shell scope-grid">
            <div><p className="eyebrow">Content people can use</p><h2>{data.contentTitle}</h2><p>{data.contentIntro}</p></div>
            <ul>{data.contentIdeas.map((idea) => <li key={idea}><Check aria-hidden="true" />{idea}</li>)}</ul>
          </div>
        </section>

        <section className="system-bridge orange-section">
          <div className="page-shell editorial-split">
            <div><p className="eyebrow">Funnel-First</p><h2>{data.systemTitle}</h2></div>
            <div className="prose-large">{data.systemCopy.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}<Link className="text-link" href="/instagram-management-services">See Instagram Management <ArrowRight aria-hidden="true" /></Link></div>
          </div>
        </section>

        <section className="faq-section dark-section">
          <div className="page-shell"><div className="section-heading"><p className="eyebrow">Questions, answered</p><h2>What to know before you start.</h2></div><div className="faq-list">{data.faqs.map(([question, answer], index) => <details key={question}><summary><span>{String(index + 1).padStart(2, "0")}</span>{question}<i aria-hidden="true">+</i></summary><p>{answer}</p></details>)}</div></div>
        </section>

        <RelatedLinks title="Choose the next useful page" links={data.related} />
        <PageCta title="Make Instagram easier to understand — and act on." />
      </main>
      <SiteFooter />
      <BreadcrumbSchema items={crumbs} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </>
  );
}
