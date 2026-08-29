import { Check, Minus } from "lucide-react";
import { BreadcrumbSchema, PageCta, PageHero, RelatedLinks, SiteFooter } from "./page-framework";
import { absoluteUrl } from "@/app/lib/site";

export type ServicePageData = {
  path: string;
  eyebrow: string;
  h1: string;
  intro: string;
  directAnswer: string[];
  problems: string[];
  features: Array<{ title: string; copy: string }>;
  process: Array<{ title: string; copy: string }>;
  includes: string[];
  approvalTitle: string;
  approvalCopy: string;
  measurementTitle: string;
  measurementCopy: string;
  faqs: Array<[string, string]>;
  related: Array<{ href: string; label: string; copy: string }>;
};

export default function ServicePage({ data }: { data: ServicePageData }) {
  const breadcrumbs = [{ label: "Home", href: "/" }, { label: data.eyebrow, href: data.path }];
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: data.eyebrow,
    url: absoluteUrl(data.path),
    description: data.intro,
    serviceType: data.eyebrow,
    areaServed: { "@type": "Country", name: "India" },
    provider: { "@type": "Organization", name: "Project Monet", url: absoluteUrl("/") },
    offers: { "@type": "Offer", price: "1000", priceCurrency: "USD", description: "Standard Management monthly starting price. Final scope and price depend on the engagement." },
  };
  const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: data.faqs.map(([name, text]) => ({ "@type": "Question", name, acceptedAnswer: { "@type": "Answer", text } })) };

  return (
    <>
      <main>
        <PageHero eyebrow={data.eyebrow} title={data.h1} intro={data.intro} path={data.path} currentLabel={data.eyebrow} />

        <section className="editorial-section warm-section">
          <div className="page-shell editorial-split">
            <div><p className="eyebrow">The simple answer</p><h2>One account. One connected system.</h2></div>
            <div className="prose-large">{data.directAnswer.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
          </div>
        </section>

        <section className="problem-list dark-section">
          <div className="page-shell">
            <p className="eyebrow">Problems this solves</p>
            <h2>More activity is not the same as more progress.</h2>
            <div className="line-list">{data.problems.map((problem, index) => <div key={problem}><span>{String(index + 1).padStart(2, "0")}</span><p>{problem}</p></div>)}</div>
          </div>
        </section>

        <section className="feature-section warm-section">
          <div className="page-shell">
            <p className="eyebrow">What the work covers</p>
            <h2>Every part has a reason to exist.</h2>
            <div className="feature-grid">{data.features.map((feature, index) => <article key={feature.title}><span>{String(index + 1).padStart(2, "0")}</span><h3>{feature.title}</h3><p>{feature.copy}</p></article>)}</div>
          </div>
        </section>

        <section className="process-section orange-section">
          <div className="page-shell">
            <p className="eyebrow">Funnel-First process</p>
            <h2>Build the machine before pouring traffic into it.</h2>
            <div className="process-list">{data.process.map((step, index) => <article key={step.title}><span>{String(index + 1).padStart(2, "0")}</span><div><h3>{step.title}</h3><p>{step.copy}</p></div></article>)}</div>
          </div>
        </section>

        <section className="scope-section warm-section">
          <div className="page-shell scope-grid">
            <div><p className="eyebrow">Possible scope</p><h2>What may be included</h2><p>The final scope depends on what the account needs. Starting price does not mean unlimited production.</p></div>
            <ul>{data.includes.map((item) => <li key={item}><Check aria-hidden="true" />{item}</li>)}</ul>
          </div>
        </section>

        <section className="control-section dark-section">
          <div className="page-shell control-grid">
            <article><Minus aria-hidden="true" /><p className="eyebrow">Approvals</p><h2>{data.approvalTitle}</h2><p>{data.approvalCopy}</p></article>
            <article><Minus aria-hidden="true" /><p className="eyebrow">Measurement</p><h2>{data.measurementTitle}</h2><p>{data.measurementCopy}</p><strong>Reach → Profile visits → Follows → Engagement → DMs → Leads → Business actions</strong></article>
          </div>
        </section>

        <section className="price-band warm-section">
          <div className="page-shell price-band-grid"><div><p className="eyebrow">Standard Management</p><h2>From <strong>$1,000</strong><span>/month</span></h2></div><div><p>The final price depends on strategy, content, production, and management required.</p><strong>No virality guarantee.</strong></div></div>
        </section>

        <section className="faq-section dark-section">
          <div className="page-shell"><div className="section-heading"><p className="eyebrow">Questions, answered</p><h2>Before you request an audit.</h2></div><div className="faq-list">{data.faqs.map(([question, answer], index) => <details key={question}><summary><span>{String(index + 1).padStart(2, "0")}</span>{question}<i aria-hidden="true">+</i></summary><p>{answer}</p></details>)}</div></div>
        </section>

        <RelatedLinks links={data.related} />
        <PageCta />
      </main>
      <SiteFooter />
      <BreadcrumbSchema items={breadcrumbs} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </>
  );
}
