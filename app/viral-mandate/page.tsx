import { Check, Minus } from "lucide-react";
import { LeadFormTrigger } from "@/app/components/lead-form-modal";
import { BreadcrumbSchema, PageHero, RelatedLinks, SiteFooter } from "@/app/components/page-framework";
import { absoluteUrl, pageMetadata } from "@/app/lib/site";

const path = "/viral-mandate";
export const metadata = pageMetadata({
  title: "Viral Mandate Instagram Growth Offer | Project Monet",
  description: "Viral Mandate is Project Monet’s qualified six-month organic Instagram performance engagement from $2,500/month, with account-specific signed terms.",
  path,
});

const faqs: Array<[string, string]> = [
  ["How much does Viral Mandate cost?", "Viral Mandate starts at $2,500 per month and uses a six-month engagement. It is available only to qualified accounts."],
  ["Is Viral Mandate just paying for views?", "No. It connects organic Instagram distribution to account positioning, useful content territory, profile readiness, and a business path. It does not promise that views automatically create leads, sales, or revenue."],
  ["Who qualifies for Viral Mandate?", "A human review considers the account’s history and health, baseline, offer, niche, content resources, spokesperson access where needed, guardrails, measurement feasibility, budget, and willingness to test. Budget alone does not qualify an account."],
  ["Can an eligible account start Viral Mandate directly?", "Yes. An eligible account can start directly. An account with too little trustworthy history, unclear positioning, unhealthy signals, or no fair measurement basis may need roughly one to three months of Standard Management first, then re-qualify."],
  ["Why does Viral Mandate require six months?", "The term provides time for strategy, setup, production, testing, iteration, full Reel measurement windows, and final performance verification. It is not presented as an instant result."],
  ["How is Viral Mandate performance measured?", "The initial qualifying format is organic Instagram Reels. Instagram Insights is the source of truth. The account-specific result and measurement rules are agreed in writing after baseline review; paid boosting does not qualify as organic performance."],
  ["What happens if the agreed qualifying result is not delivered?", "If the signed qualifying result is not delivered and eligibility remains intact through the completed six-month engagement, the client is eligible for a 50% refund of collected Viral Mandate management fees under the signed terms."],
  ["Do I lose all control?", "No. You approve brand, factual, legal, safety, confidential, and off-limit boundaries first. Inside those boundaries, Project Monet makes the final creative decisions needed to run the agreed testing system."],
  ["Does applying mean the account is accepted?", "No. Every application receives human review. If Viral Mandate is not the right fit, Standard Management may still be."],
];

export default function Page() {
  const crumbs = [{ label: "Home", href: "/" }, { label: "Viral Mandate", href: path }];
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Viral Mandate",
    url: absoluteUrl(path),
    description: "A qualification-only six-month organic Instagram performance engagement connected to Funnel-First positioning and account-specific signed terms.",
    serviceType: "Instagram performance marketing and management",
    areaServed: "Worldwide",
    provider: { "@type": "Organization", name: "Project Monet", url: absoluteUrl("/") },
    offers: { "@type": "Offer", price: "2500", priceCurrency: "USD", description: "Monthly starting price. Qualification and a six-month engagement are required. Account-specific performance and refund terms are agreed in writing." },
  };
  const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map(([name, text]) => ({ "@type": "Question", name, acceptedAnswer: { "@type": "Answer", text } })) };

  return (
    <>
      <main>
        <PageHero eyebrow="Viral Mandate" title="More performance risk means more creative control." intro="A qualified six-month organic Instagram performance engagement from $2,500/month. The account-specific result and measurement terms are agreed in writing." path={path} currentLabel="Viral Mandate" primaryKind="viral" primaryLabel="See if You Qualify" />

        <section className="mandate-summary warm-section"><div className="page-shell"><p className="eyebrow">The public offer</p><div className="mandate-facts"><article><strong>From $2,500</strong><span>per month</span></article><article><strong>6 months</strong><span>performance engagement</span></article><article><strong>Qualification</strong><span>required first</span></article></div></div></section>

        <section className="editorial-section dark-section"><div className="page-shell editorial-split"><div><p className="eyebrow">Not a vanity-view product</p><h2>Build the machine before pouring traffic into it.</h2></div><div className="prose-large"><p>Viral Mandate is not a simple package for buying random fame. Before pursuing distribution, Project Monet considers the audience, account positioning, offer, business goal, profile path, content territory, account history, baseline, content inputs, guardrails, and whether performance can be measured fairly.</p><p>Then organic Instagram distribution is pursued inside that system. Views matter, but the business path matters too.</p></div></div></section>

        <section className="control-section dark-section"><div className="page-shell control-grid"><article><Minus aria-hidden="true" /><p className="eyebrow">Funnel-First path</p><h2>Attention needs somewhere useful to go.</h2><p>We prepare the account so the right people can understand the page, trust it, and find a relevant next action.</p><strong>Reach → Profile visits → Follows → Engagement → DMs / Leads → Business actions</strong></article><article><Minus aria-hidden="true" /><p className="eyebrow">An honest limit</p><h2>Performance is not the same as revenue.</h2><p>Project Monet does not promise that every view becomes a lead or that an Instagram performance result guarantees sales or revenue. The purpose is to connect distribution to a stronger business path rather than leave reach detached from the account.</p></article></div></section>

        <section className="control-boundaries orange-section"><div className="page-shell"><p className="eyebrow">What the offer is — and is not</p><h2>A performance system, not a shortcut.</h2><div className="boundary-grid"><article><Check aria-hidden="true" /><h3>Viral Mandate is</h3><ul><li>A qualified six-month Instagram performance engagement</li><li>Built on account-specific baseline review</li><li>Focused initially on organic Instagram Reels</li><li>Measured through Instagram Insights</li><li>Run with creative control inside approved guardrails</li><li>Connected to Funnel-First positioning and business objectives</li><li>Subject to signed account-specific performance terms</li></ul></article><article><Minus aria-hidden="true" /><h3>Viral Mandate is not</h3><ul><li>Paid boosting disguised as organic performance</li><li>Guaranteed random mass fame</li><li>A promise of sales or revenue from views</li><li>Suitable for every account</li><li>A simple “buy virality” package</li></ul></article></div></div></section>

        <section className="qualification-section warm-section"><div className="page-shell editorial-split"><div><p className="eyebrow">Who may qualify</p><h2>Budget alone does not make an account ready.</h2></div><div className="prose-large"><p>A strong candidate may have trustworthy account history, healthy organic status, a real offer or business objective, viable content opportunity, useful footage or content resources, and a realistic path from attention into the business.</p><p>We also assess founder or spokesperson availability where needed, willingness to test, ability to sustain the work, final-creative-control readiness inside agreed guardrails, sufficient budget, and whether the account can be measured fairly.</p><p>Every application receives human review. We do not publish an internal score or promise acceptance.</p></div></div></section>

        <section className="editorial-section dark-section"><div className="page-shell editorial-split"><div><p className="eyebrow">When Standard may come first</p><h2>Readiness is account-specific.</h2></div><div className="prose-large"><p>Eligible accounts can start Viral Mandate directly. There is no blanket rule that founders, personal brands, or new businesses must use Standard first.</p><p>An account with insufficient trustworthy history, unclear positioning, unhealthy signals, or no fair measurement basis may need roughly one to three months of Standard Management first. That period can establish the positioning and funnel, test the content direction, build reliable baseline history, and create a fair foundation for re-qualification.</p></div></div></section>

        <section className="process-section orange-section"><div className="page-shell"><p className="eyebrow">Why six months</p><h2>The work needs time to learn and verify.</h2><div className="process-list">{[
          ["Strategy and setup", "Define the audience, offer connection, profile path, baseline, guardrails, and measurement rules."],
          ["Production and testing", "Create and publish controlled Reel tests instead of judging the engagement from one post."],
          ["Iteration", "Use the evidence to improve topics, hooks, formats, pacing, packaging, and account path."],
          ["Full measurement", "Allow each eligible Reel its agreed measurement window before final performance verification."],
        ].map(([title, copy], index) => <article key={title}><span>{String(index + 1).padStart(2, "0")}</span><div><h3>{title}</h3><p>{copy}</p></div></article>)}</div></div></section>

        <section className="control-boundaries warm-section"><div className="page-shell"><p className="eyebrow">How control works</p><h2>You approve the boundaries first.</h2><div className="boundary-grid"><article><Check aria-hidden="true" /><h3>You define</h3><ul><li>Brand boundaries</li><li>Factual accuracy</li><li>Legal limits</li><li>Safety requirements</li><li>Confidential or off-limit topics</li></ul></article><article><Minus aria-hidden="true" /><h3>Inside those boundaries, we decide</h3><ul><li>Hooks and concepts</li><li>Formats and pacing</li><li>Editing and packaging</li><li>Relevant trend use</li><li>Creative testing and iteration</li></ul></article></div><p className="proof-disclaimer">Final creative control makes the performance responsibility workable. It does not remove factual, legal, safety, or agreed brand guardrails.</p></div></section>

        <section className="mandate-terms dark-section"><div className="page-shell"><p className="eyebrow">Measurement and signed terms</p><h2>The details are written before performance work starts.</h2><div className="line-list"><div><span>01</span><p>The qualifying result for the specific eligible account after baseline review. No universal public threshold is promised.</p></div><div><span>02</span><p>Organic Instagram Reels are the initial qualifying format. Paid boosts do not count as organic performance.</p></div><div><span>03</span><p>Instagram Insights is the source of truth, with the measurement rules and full Reel measurement window defined in the signed engagement.</p></div><div><span>04</span><p>If the signed qualifying result is not delivered and eligibility remains intact through the completed six-month engagement, the client is eligible for a <strong className="refund-highlight">50% refund of collected Viral Mandate management fees</strong> under the signed terms.</p></div></div></div></section>

        <section className="mandate-inline-cta orange-section"><div className="page-shell"><p className="eyebrow">Human review</p><h2>See if Viral Mandate fits your account.</h2><p>Applying does not promise acceptance. If Viral Mandate is not the right fit, Standard Management may still be.</p><LeadFormTrigger kind="viral" location="viral_page_mid" className="button button-ink">See if You Qualify</LeadFormTrigger></div></section>

        <section className="faq-section warm-section"><div className="page-shell"><div className="section-heading"><p className="eyebrow">Viral Mandate FAQ</p><h2>Clear answers before you apply.</h2></div><div className="faq-list">{faqs.map(([question, answer], index) => <details key={question}><summary><span>{String(index + 1).padStart(2, "0")}</span>{question}<i aria-hidden="true">+</i></summary><p>{answer}</p></details>)}</div></div></section>

        <RelatedLinks links={[{ href: "/resources/when-instagram-virality-helps-a-business", label: "When Virality Helps a Business", copy: "Understand useful reach, random reach, and account readiness." }, { href: "/resources/turn-instagram-reach-into-leads", label: "Turn Reach Into Leads", copy: "Build the path from attention to DMs, leads, and demand." }, { href: "/instagram-management-services", label: "Standard Management", copy: "See the controlled-management path without a performance guarantee." }]} />
        <section className="page-cta orange-section"><div className="page-shell"><p className="eyebrow">Qualification required</p><h2>Ready to give the work a fair chance?</h2><p>Tell us about the account, resources, goals, and creative-control readiness.</p><LeadFormTrigger kind="viral" location="viral_page_final" className="button button-ink">See if You Qualify</LeadFormTrigger></div></section>
      </main>
      <SiteFooter />
      <BreadcrumbSchema items={crumbs} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </>
  );
}
