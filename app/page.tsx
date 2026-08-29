import { ArrowDownRight, ArrowRight } from "lucide-react";
import Link from "next/link";
import Hero from "./components/hero";
import { LeadFormTrigger } from "./components/lead-form-modal";
import { SiteFooter } from "./components/page-framework";
import ReelRail from "./components/reel-rail";

const services = [
  { number: "01", title: "Instagram Management", copy: "Strategy, publishing, review, and ongoing improvement.", href: "/instagram-management-services" },
  { number: "02", title: "Content Creation", copy: "Reels, scripts, carousels, captions, and creative direction.", href: "/instagram-content-creation-services" },
  { number: "03", title: "Instagram Reels", copy: "Ideas, hooks, production, editing, packaging, and testing.", href: "/instagram-reels-agency" },
  { number: "04", title: "Instagram SEO", copy: "Improve how people find and understand your profile and content.", href: "/instagram-seo-services" },
];

const faq = [
  ["How much does Instagram management cost?", "Project Monet Standard Management starts at $1,000 per month. The final price depends on the strategy, content, production, and management required."],
  ["How much does Viral Mandate cost?", "Viral Mandate starts at $2,500 per month and uses a six-month contract. It is available only to qualified accounts."],
  ["What happens if Viral Mandate does not deliver the agreed viral reach?", "For eligible accounts, the viral-reach commitment is defined in the signed engagement. If Project Monet does not deliver that agreed viral reach by the end of the six-month contract, the client is eligible for a 50% refund under the signed terms."],
  ["Does Standard Management guarantee virality?", "No. Standard Management is professional Instagram management without a virality guarantee."],
  ["Do I lose all control with Viral Mandate?", "No. You approve brand, factual, legal, safety, and off-limit boundaries first. Inside those agreed boundaries, Project Monet makes the final creative decisions."],
  ["Do you manage TikTok, Facebook, LinkedIn, or YouTube?", "Not currently. Project Monet specialises in Instagram."],
  ["Do I need a large following?", "No. The quality of the audience and what people do after seeing the content matter more than follower count alone."],
] as const;

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.map(([question, answer]) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })),
};

export default function Home() {
  return (
    <>
      <main>
        <Hero />

        <section id="results" className="proof-section dark-section" aria-labelledby="proof-title">
          <div className="page-shell proof-heading">
            <div><p className="eyebrow">Founder / Team Proof</p><h2 id="proof-title">We learned Instagram by doing it.</h2></div>
            <p>The people behind Project Monet built audiences before they started managing brands.</p>
          </div>
          <div className="page-shell creator-grid">
            <a href="https://instagram.com/sl6dl7/" target="_blank" rel="noreferrer" className="creator-card"><span>Founder / Creative Director</span><strong>Sl6Dl7</strong><p>102K followers</p><ArrowDownRight aria-hidden="true" /></a>
            <a href="https://instagram.com/poetrynyx/" target="_blank" rel="noreferrer" className="creator-card"><span>Co-founder / manages the managers</span><strong>Poetrynyx</strong><p>200K followers</p><ArrowDownRight aria-hidden="true" /></a>
            <article className="creator-card aggregate-card"><span>Creator / team experience</span><strong>35M+</strong><p>Organic views · 5+ original trend formats</p></article>
          </div>
          <ReelRail />
          <p className="proof-disclosure page-shell">Founder and team results are creator experience. They are not Project Monet client campaigns.</p>
        </section>

        <section className="problem-section warm-section">
          <div className="page-shell statement-grid">
            <p className="eyebrow">The problem</p>
            <div><h2>Posting more is not always the answer.</h2><p>A business can post every week and still get the wrong viewers, few profile visits, weak follower growth, and no clear path from a Reel to an enquiry.</p><p>The problem is often not the amount of content.</p><strong>It is the system behind the content.</strong></div>
          </div>
        </section>

        <section id="method" className="method-section orange-section" aria-labelledby="method-title">
          <div className="page-shell">
            <div className="section-heading"><p className="eyebrow">How we work</p><h2 id="method-title">The Funnel-First Growth System</h2><p>Build the machine before pouring traffic into it.</p></div>
            <div className="question-grid">
              <article><span>01</span><h3>Who should find you?</h3><p>We define the people your account should attract.</p></article>
              <article><span>02</span><h3>Why should they follow you?</h3><p>We make the page clear, useful, and easy to remember.</p></article>
              <article><span>03</span><h3>What should you post?</h3><p>We choose content that brings the right people in.</p></article>
              <article><span>04</span><h3>What happens after they visit?</h3><p>We improve the profile, proof, links, and next action.</p></article>
            </div>
            <div className="method-close"><p>Then we publish, measure, and improve.</p><blockquote>Growth is not only knowing what to post. It is also knowing what not to post.</blockquote></div>
          </div>
        </section>

        <section id="services" className="services-section warm-section" aria-labelledby="services-title">
          <div className="page-shell section-heading split"><div><p className="eyebrow">Services</p><h2 id="services-title">Built around Instagram. Nothing else.</h2></div><p>Four parts of one clear account system.</p></div>
          <div className="service-viewport page-shell"><div className="service-track">{services.map((service) => <Link key={service.title} href={service.href} className="service-card"><span>{service.number}</span><h3>{service.title}</h3><p>{service.copy}</p><ArrowRight aria-hidden="true" /></Link>)}</div></div>
        </section>

        <section className="measurement-section dark-section" aria-labelledby="measurement-title">
          <div className="page-shell"><p className="eyebrow">Measure what matters</p><h2 id="measurement-title">A viral Reel is useful only if something happens after the view.</h2><div className="measurement-path" aria-label="Measurement path">{["Reach", "Profile visits", "Follows", "Engagement", "DMs", "Leads", "Business actions"].map((item, index) => <div key={item}><span>{String(index + 1).padStart(2, "0")}</span><strong>{item}</strong></div>)}</div><p className="measurement-note">A Reel with fewer views can be more valuable if the right people see it.</p></div>
        </section>

        <section className="audience-section warm-section">
          <div className="page-shell audience-grid"><div><p className="eyebrow">Founder-led brands</p><h2>Your founder can become part of the growth engine.</h2></div><div><p>People often trust people before they trust company pages.</p><p>We turn your experience, opinions, stories, expertise, and point of view into content people want to follow.</p><strong>You do not need to become an influencer.</strong><h3>You need to become recognisable to the right people.</h3></div></div>
        </section>

        <section className="audience-section small-business-section dark-section">
          <div className="page-shell audience-grid"><div><p className="eyebrow">Small businesses</p><h2>You do not need millions of followers.</h2></div><div><p>You need the right people to:</p><ul><li>find you,</li><li>understand what you offer,</li><li>trust the business,</li><li>and know what to do next.</li></ul><strong>We build Instagram around that path.</strong></div></div>
        </section>

        <section id="offers" className="offers-section warm-section" aria-labelledby="offers-title">
          <div className="page-shell"><div className="section-heading split"><div><p className="eyebrow">Two ways to work with us</p><h2 id="offers-title">Choose collaboration or performance-led control.</h2></div><p>We start by reviewing the account. The right offer depends on the goals, resources, and fit.</p></div>
            <div className="offer-grid">
              <article className="offer-card standard-offer"><p className="offer-label">Standard Management</p><h3>From <strong>$1,000</strong><span>/month</span></h3><p>For businesses that want Project Monet to manage and improve their Instagram.</p><ul><li>Strategy and profile work</li><li>Content and publishing</li><li>Reporting and ongoing optimization</li><li>Structured client approval rights</li></ul><p className="offer-clarification">No virality guarantee.</p><LeadFormTrigger kind="audit" location="standard_offer" className="button button-ink">Get a Free Instagram Audit</LeadFormTrigger></article>
              <article className="offer-card viral-offer"><div className="offer-topline"><p className="offer-label">Viral Mandate</p><span>Qualification required</span></div><h3>From <strong>$2,500</strong><span>/month</span></h3><p className="contract-line">Six-month contract.</p><blockquote>More performance risk = more creative control.</blockquote><p>For eligible accounts, Project Monet works to deliver the agreed viral reach within the six-month contract.</p><p>If it is not delivered by the end of the contract, the client is eligible for a 50% refund under the signed Viral Mandate terms.</p><p className="offer-fineprint">You approve brand, factual, legal, safety, and off-limit boundaries first. Inside them, Project Monet makes the final creative decisions. The target is agreed in writing for the specific account.</p><LeadFormTrigger kind="viral" location="viral_offer" className="button button-light">See if You Qualify</LeadFormTrigger></article>
            </div>
          </div>
        </section>

        <section className="why-section orange-section" aria-labelledby="why-title">
          <div className="page-shell"><div className="section-heading"><p className="eyebrow">Why Project Monet</p><h2 id="why-title">We do not treat Instagram like a posting calendar.</h2></div><div className="why-grid"><article><span>01</span><h3>Creator experience</h3><p>We learned what makes people stop, watch, share, follow, and remember through real publishing.</p></article><article><span>02</span><h3>Instagram focus</h3><p>We specialise in one platform instead of pretending to be experts everywhere.</p></article><article><span>03</span><h3>Business-first measurement</h3><p>We care about what happens after the view.</p></article></div></div>
        </section>

        <section className="audit-section warm-section" aria-labelledby="audit-title">
          <div className="page-shell audit-grid"><div><p className="eyebrow">Free Instagram Audit</p><h2 id="audit-title">Not sure what is holding your Instagram back?</h2><h3>Start with a Free Social Presence Audit.</h3></div><div><p>We review the account before asking you to buy anything.</p><ul><li>Positioning</li><li>Profile</li><li>Recent content</li><li>Obvious growth problems</li><li>Conversion gaps</li><li>Clearest opportunities</li></ul><p>Then we tell you what we think you should do next.</p><LeadFormTrigger kind="audit" location="audit_section" className="button button-orange">Get My Free Instagram Audit</LeadFormTrigger></div></div>
        </section>

        <section id="faq" className="faq-section dark-section" aria-labelledby="faq-title">
          <div className="page-shell"><div className="section-heading split"><div><p className="eyebrow">Questions, answered</p><h2 id="faq-title">Before you choose a path.</h2></div><p>Clear terms. No blanket promises.</p></div><div className="faq-list">{faq.map(([question, answer], index) => <details key={question}><summary><span>{String(index + 1).padStart(2, "0")}</span>{question}<i aria-hidden="true">+</i></summary><p>{answer}</p></details>)}</div></div>
        </section>

        <section className="final-cta orange-section"><div className="page-shell"><p className="eyebrow">One clear next step</p><h2>Your Instagram should have a job.</h2><p className="final-kicker">Not just a feed.</p><p>We can show you what is working, what is weak, and what we would fix first.</p><div className="hero-actions"><LeadFormTrigger kind="audit" location="final_cta" className="button button-ink">Get a Free Instagram Audit</LeadFormTrigger><LeadFormTrigger kind="viral" location="final_cta" className="button button-orange-outline">See if You Qualify for Viral Mandate</LeadFormTrigger></div></div></section>
      </main>

      <SiteFooter />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </>
  );
}
