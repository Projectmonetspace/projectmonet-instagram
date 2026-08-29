import { Check, Minus } from "lucide-react";
import { LeadFormTrigger } from "@/app/components/lead-form-modal";
import { BreadcrumbSchema, PageHero, RelatedLinks, SiteFooter } from "@/app/components/page-framework";
import { absoluteUrl, pageMetadata } from "@/app/lib/site";

const path = "/viral-mandate";
export const metadata = pageMetadata({
  title: "Viral Mandate Instagram Growth Offer | Project Monet",
  description: "Viral Mandate is Project Monet’s qualified six-month Instagram engagement from $2,500/month. Agreed viral reach, more creative control, and signed refund terms.",
  path,
});

const faqs: Array<[string, string]> = [
  ["How much does Viral Mandate cost?", "Viral Mandate starts at $2,500 per month and uses a six-month contract. It is available only to qualified accounts."],
  ["What is the viral-reach target?", "The agreed viral reach is defined in writing for the specific eligible account. Project Monet does not publish one fixed threshold for every account."],
  ["What happens if the agreed viral reach is not delivered?", "If Project Monet does not deliver the agreed viral reach by the end of the six-month contract, the client is eligible for a 50% refund under the signed Viral Mandate terms."],
  ["Do I lose all control?", "No. You approve brand, factual, legal, safety, confidential, and off-limit boundaries first. Inside those boundaries, Project Monet makes the final creative decisions."],
  ["Does applying mean the account is accepted?", "No. Every application receives human review. If Viral Mandate is not the right fit, Standard Management may still be."],
];

export default function Page() {
  const crumbs = [{ label: "Home", href: "/" }, { label: "Viral Mandate", href: path }];
  const schema = { "@context": "https://schema.org", "@type": "Service", name: "Viral Mandate", url: absoluteUrl(path), description: "A qualification-only six-month performance-led Instagram engagement with an account-specific agreed viral-reach commitment.", provider: { "@type": "Organization", name: "Project Monet", url: absoluteUrl("/") }, offers: { "@type": "Offer", price: "2500", priceCurrency: "USD", description: "Monthly starting price. Six-month contract and qualification required." } };
  const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map(([name, text]) => ({ "@type": "Question", name, acceptedAnswer: { "@type": "Answer", text } })) };
  return (
    <>
      <main>
        <PageHero eyebrow="Viral Mandate" title="More performance risk means more creative control." intro="A qualified six-month Instagram engagement from $2,500/month. Project Monet takes on an agreed viral-reach commitment for eligible accounts." path={path} currentLabel="Viral Mandate" primaryKind="viral" primaryLabel="See if You Qualify" />

        <section className="mandate-summary warm-section"><div className="page-shell"><p className="eyebrow">The public offer</p><div className="mandate-facts"><article><strong>From $2,500</strong><span>per month</span></article><article><strong>6 months</strong><span>contract term</span></article><article><strong>Qualification</strong><span>required first</span></article></div></div></section>

        <section className="editorial-section dark-section"><div className="page-shell editorial-split"><div><p className="eyebrow">The commitment</p><h2>Agreed for the specific account.</h2></div><div className="prose-large"><p>For eligible accounts, Project Monet works to deliver the agreed viral reach within the six-month engagement.</p><p>If the agreed viral reach is not delivered by the end of the six-month contract, the client is eligible for a 50% refund under the signed Viral Mandate terms.</p><strong>This is not an unconditional promise for every Instagram account.</strong></div></div></section>

        <section className="control-boundaries orange-section"><div className="page-shell"><p className="eyebrow">How control works</p><h2>You approve the boundaries first.</h2><div className="boundary-grid"><article><Check aria-hidden="true" /><h3>You define</h3><ul><li>Brand boundaries</li><li>Factual accuracy</li><li>Legal limits</li><li>Safety requirements</li><li>Confidential or off-limit topics</li></ul></article><article><Minus aria-hidden="true" /><h3>Inside those boundaries, we decide</h3><ul><li>Hooks and concepts</li><li>Formats and pacing</li><li>Editing and packaging</li><li>Relevant trend use</li><li>Creative testing and iteration</li></ul></article></div></div></section>

        <section className="qualification-section warm-section"><div className="page-shell editorial-split"><div><p className="eyebrow">Why qualification comes first</p><h2>The account must be able to support the work.</h2></div><div className="prose-large"><p>We review account health, current reach, resources, access, spokesperson availability, artificial growth history, decision speed, creative-control readiness, cadence, goals, and budget.</p><p>We do not publish a hidden score or promise acceptance. A human reviews every application. Honest context helps us decide whether Viral Mandate, Standard Management, or no engagement is the most responsible answer.</p></div></div></section>

        <section className="mandate-terms dark-section"><div className="page-shell"><p className="eyebrow">What the signed engagement defines</p><h2>The details are written before work starts.</h2><div className="line-list"><div><span>01</span><p>The agreed viral reach for the specific eligible account.</p></div><div><span>02</span><p>The six-month measurement period and the content covered.</p></div><div><span>03</span><p>The client responsibilities, access, cadence, and approved boundaries.</p></div><div><span>04</span><p>The 50% refund eligibility under the signed Viral Mandate terms if the agreed reach is not delivered.</p></div></div></div></section>

        <section className="mandate-inline-cta orange-section"><div className="page-shell"><p className="eyebrow">Human review</p><h2>See if Viral Mandate fits your account.</h2><p>Applying does not promise acceptance. If Viral Mandate is not the right fit, Standard Management may still be.</p><LeadFormTrigger kind="viral" location="viral_page_mid" className="button button-ink">See if You Qualify</LeadFormTrigger></div></section>

        <section className="faq-section warm-section"><div className="page-shell"><div className="section-heading"><p className="eyebrow">Viral Mandate FAQ</p><h2>Read this before applying.</h2></div><div className="faq-list">{faqs.map(([question, answer], index) => <details key={question}><summary><span>{String(index + 1).padStart(2, "0")}</span>{question}<i aria-hidden="true">+</i></summary><p>{answer}</p></details>)}</div></div></section>

        <RelatedLinks links={[{ href: "/instagram-management-services", label: "Standard Management", copy: "Professional Instagram management without a virality guarantee." }, { href: "/instagram-marketing-for-founders", label: "For Founders", copy: "Turn expertise and point of view into useful demand." }, { href: "/instagram-audit", label: "Free Instagram Audit", copy: "Start with a human review of the account." }]} />
        <section className="page-cta orange-section"><div className="page-shell"><p className="eyebrow">Qualification required</p><h2>Ready to give the work a fair chance?</h2><p>Tell us about the account, resources, goals, and creative-control readiness.</p><LeadFormTrigger kind="viral" location="viral_page_final" className="button button-ink">See if You Qualify</LeadFormTrigger></div></section>
      </main>
      <SiteFooter />
      <BreadcrumbSchema items={crumbs} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </>
  );
}
