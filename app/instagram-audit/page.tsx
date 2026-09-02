import { ArrowRight, Check, Minus } from "lucide-react";
import Link from "next/link";
import { BreadcrumbSchema, PageHero, RelatedLinks, SiteFooter } from "@/app/components/page-framework";
import { LeadFormTrigger } from "@/app/components/lead-form-modal";
import { absoluteUrl, pageMetadata } from "@/app/lib/site";

const path = "/instagram-audit";
export const metadata = pageMetadata({
  title: "Free Instagram Audit | Project Monet",
  description: "Request a free Instagram audit covering positioning, profile, recent content, growth problems, conversion gaps, and the clearest next opportunities.",
  path,
});

const reviewItems = [
  ["Positioning", "Can a new visitor quickly understand who the account is for and what it should be known for?"],
  ["Profile", "Do the name, bio, pinned posts, highlights, proof, link, and next action work together?"],
  ["Recent content", "Are the topics, hooks, formats, and calls to action attracting useful attention?"],
  ["Growth problems", "What obvious pattern may be holding reach, profile visits, follows, or engagement back?"],
  ["Conversion gaps", "Where does the path from content to enquiry, booking, sale, or another business action break?"],
  ["Next opportunities", "Which improvements look clearest and most useful to address first?"],
];
const faqs: Array<[string, string]> = [
  ["Is this an automated Instagram score?", "No. Project Monet reviews the account and the context you provide. We do not turn a generic number into a sales pitch."],
  ["What will I receive?", "We will send the clearest account problems and opportunities we see, with a practical recommendation for what to do next."],
  ["Does the audit include a complete content strategy?", "No. The free audit is a diagnosis. A full strategy, production plan, scripts, and implementation belong inside a paid engagement."],
  ["Do I have to buy Instagram management?", "No. We review the account before asking you to buy anything. If there is a fit, we may explain the relevant paid option."],
  ["How long is the form?", "The Audit wizard asks 12 short questions, one at a time, so we have enough context to review the right account."],
];

export default function Page() {
  const breadcrumbs = [{ label: "Home", href: "/" }, { label: "Free Instagram Audit", href: path }];
  const serviceSchema = { "@context": "https://schema.org", "@type": "Service", name: "Free Instagram Audit", url: absoluteUrl(path), description: "A human review of Instagram positioning, profile, recent content, growth problems, conversion gaps, and clearest opportunities.", provider: { "@type": "Organization", name: "Project Monet", url: absoluteUrl("/") }, offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map(([name, text]) => ({ "@type": "Question", name, acceptedAnswer: { "@type": "Answer", text } })) };
  return (
    <>
      <main>
        <PageHero eyebrow="Free Instagram Audit" title="Find what is holding your Instagram back." intro="We review the account before asking you to buy anything. You receive the clearest problems, opportunities, and next step we can see." path={path} currentLabel="Free Instagram Audit" />

        <section className="editorial-section warm-section">
          <div className="page-shell editorial-split">
            <div><p className="eyebrow">What this is</p><h2>A useful diagnosis. Not a generic score.</h2></div>
            <div className="prose-large"><p>An account can look active and still have a weak path from discovery to action. We review the page as a connected system, using the information you share in the form.</p><p>The audit is for founders, creators, and businesses that want a clearer view of what is working, what is confusing, and what deserves attention first.</p></div>
          </div>
        </section>

        <section className="audit-review dark-section">
          <div className="page-shell">
            <p className="eyebrow">What we review</p><h2>Six parts of the account.</h2>
            <div className="audit-review-grid">{reviewItems.map(([title, copy], index) => <article key={title}><span>{String(index + 1).padStart(2, "0")}</span><Check aria-hidden="true" /><h3>{title}</h3><p>{copy}</p></article>)}</div>
          </div>
        </section>

        <section className="audit-boundaries orange-section">
          <div className="page-shell control-grid">
            <article><Check aria-hidden="true" /><p className="eyebrow">What you receive</p><h2>The clearest opportunities we see.</h2><p>We explain the most useful problems and opportunities visible from the account and your answers. We then tell you what we think you should do next.</p></article>
            <article><Minus aria-hidden="true" /><p className="eyebrow">What it does not include</p><h2>A complete free strategy.</h2><p>The audit does not include finished scripts, a full calendar, production, implementation, guaranteed results, or private Viral Mandate qualification rules.</p></article>
          </div>
        </section>

        <section className="process-section warm-section">
          <div className="page-shell"><p className="eyebrow">What happens next</p><h2>Three simple steps.</h2><div className="process-list"><article><span>01</span><div><h3>Answer one question at a time</h3><p>Tell us who you are, which account to review, what the business does, and what you want Instagram to do.</p></div></article><article><span>02</span><div><h3>We review the account</h3><p>A human reviews the visible page and the context you submitted. This is not an automated score tool.</p></div></article><article><span>03</span><div><h3>You receive our clearest view</h3><p>We share the most useful next opportunities. If ongoing management fits, we can explain the relevant scope.</p></div></article></div></div>
        </section>

        <section className="audit-inline-cta dark-section"><div className="page-shell"><p className="eyebrow">Ready when you are</p><h2>Start the Free Instagram Audit.</h2><p>The form has 12 short steps. It stays on this page.</p><LeadFormTrigger kind="audit" location="audit_page_mid" className="button button-orange">Get My Free Instagram Audit <ArrowRight aria-hidden="true" /></LeadFormTrigger></div></section>

        <section className="faq-section warm-section"><div className="page-shell"><div className="section-heading"><p className="eyebrow">Audit FAQ</p><h2>Before you submit.</h2></div><div className="faq-list">{faqs.map(([question, answer], index) => <details key={question}><summary><span>{String(index + 1).padStart(2, "0")}</span>{question}<i aria-hidden="true">+</i></summary><p>{answer}</p></details>)}</div></div></section>

        <RelatedLinks links={[{ href: "/instagram-management-services", label: "Instagram Management", copy: "See what ongoing account management may include." }, { href: "/instagram-seo-services", label: "Instagram SEO", copy: "Understand profile and content discoverability." }, { href: "/viral-mandate", label: "Viral Mandate", copy: "Learn about the qualified performance-led offer." }]} />
        <section className="page-cta orange-section"><div className="page-shell"><p className="eyebrow">Your account, reviewed</p><h2>Find the first useful fix.</h2><p>Tell us which Instagram account to review.</p><LeadFormTrigger kind="audit" location="audit_page_final" className="button button-ink">Get My Free Instagram Audit</LeadFormTrigger><Link className="text-link ink-link" href="/instagram-management-services">See Instagram Management <ArrowRight aria-hidden="true" /></Link></div></section>
      </main>
      <SiteFooter />
      <BreadcrumbSchema items={breadcrumbs} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </>
  );
}
