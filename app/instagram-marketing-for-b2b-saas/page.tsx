import { serializeJsonLd } from "@/app/lib/json-ld";
import { ArrowRight, Check } from "lucide-react";
import Link from "next/link";
import { BreadcrumbSchema, PageCta, PageHero, RelatedLinks, SiteFooter } from "@/app/components/page-framework";
import { absoluteUrl, pageMetadata } from "@/app/lib/site";

const path = "/instagram-marketing-for-b2b-saas";

export const metadata = pageMetadata({
  title: "B2B SaaS Instagram Marketing Agency | Project Monet",
  description: "Instagram strategy and management for B2B SaaS and AI SaaS. Project Monet can manage the company account, founder account, or both, with filming optional.",
  path,
});

const models = [
  { number: "01", title: "Company account", copy: "Make the product and category easier to understand. Show the problem, workflow, use cases, demonstrations, customer education, and proof you can substantiate." },
  { number: "02", title: "Founder account", copy: "Turn the founder’s real perspective into useful content: decisions, lessons, opinions, stories, and industry expertise. Face-to-camera recording is one option, not a requirement." },
  { number: "03", title: "Company + founder", copy: "Give each account a different job. The founder can build recognition and point of view; the company can explain the product and hold durable proof. Both support the same business without reposting the same feed." },
];

const formats = [
  "Founder footage or interviews",
  "Authorized AI avatar and voice",
  "Product demos and screen recordings",
  "Motion graphics and animated explainers",
  "Voice-led or text-led Reels",
  "Infographics, carousels, and visual stories",
];

const questions: Array<[string, string]> = [
  ["Does Instagram work for B2B SaaS?", "It can, when the people you want to reach are there and the content helps them understand a problem, category, or product. We review audience fit, the account, and the next action before recommending a strategy. Instagram should not be assumed to replace sales outreach or every other channel."],
  ["Should we grow the company account or the founder account?", "That depends on the audience, the founder’s perspective, the product, and the resources available. A company account can teach and demonstrate; a founder account can add experience and point of view. We can manage either or both, with distinct roles."],
  ["Do the founder and company accounts post the same content?", "No. They may work from the same customer insight, but each should give the audience a different reason to follow. A founder may explain a decision; the company may show how the product handles the underlying problem."],
  ["Does the founder need to film every week?", "No. We can use interviews, approved writing or voice, product footage, screen recordings, motion, or an authorized AI avatar. The founder still needs to supply a genuine point of view and approve the use of their likeness and voice."],
  ["Can we use an AI avatar for founder content?", "Yes, with the founder’s permission for their likeness and voice and with platform-appropriate disclosure where required. An avatar helps production; it does not replace a sound idea, accurate claims, or the founder’s actual expertise."],
  ["Can Instagram reach turn into demos or trials?", "Content can guide relevant viewers toward a clear profile, landing page, demo, trial, or enquiry. We measure the path from attention to useful actions where the data allows. We do not promise a fixed number of customers or attribute every sale to a Reel."],
  ["Can a new SaaS account qualify for Viral Mandate?", "Qualification requires a reliable account history and baseline, as well as creative control within agreed guardrails. A new or low-history account may start with Standard Management and be reviewed again later. Budget alone does not establish eligibility."],
];

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Instagram marketing for B2B SaaS and AI SaaS",
  url: absoluteUrl(path),
  description: "Instagram strategy and management for B2B SaaS companies, founder accounts, or both.",
  serviceType: "Instagram marketing and management",
  areaServed: "Worldwide",
  audience: { "@type": "Audience", audienceType: "B2B SaaS and AI SaaS companies and founders" },
  provider: { "@type": "Organization", name: "Project Monet", url: absoluteUrl("/") },
};

export default function Page() {
  const crumbs = [{ label: "Home", href: "/" }, { label: "B2B SaaS & AI SaaS", href: path }];
  return (
    <>
      <main>
        <PageHero
          eyebrow="B2B SaaS & AI SaaS"
          title="Instagram marketing for B2B SaaS and AI SaaS."
          intro="Project Monet manages the company account, the founder account, or both. We build a useful Instagram system around your buyers, product, and expertise. The founder does not have to film every week."
          path={path}
          currentLabel="B2B SaaS & AI SaaS"
        />

        <section className="editorial-section warm-section">
          <div className="page-shell editorial-split">
            <div><p className="eyebrow">The role of Instagram</p><h2>Make a complex product easier to remember.</h2></div>
            <div className="prose-large">
              <p>A useful SaaS account does more than announce features. It shows the customer’s problem, explains the category, demonstrates the workflow, and gives people a reason to care before they are ready for a demo.</p>
              <p>Instagram is worth testing when your buyers, users, or people who influence them spend time there. We begin with audience fit and the path from a Reel to a profile, product page, trial, demo, or enquiry. Some B2B products will need a different primary channel.</p>
            </div>
          </div>
        </section>

        <section className="saas-models dark-section">
          <div className="page-shell">
            <p className="eyebrow">Three ways to work</p>
            <h2>One company. The right account strategy.</h2>
            <div className="saas-models-grid">
              {models.map((model) => <article key={model.number}><span>{model.number}</span><h3>{model.title}</h3><p>{model.copy}</p></article>)}
            </div>
          </div>
        </section>

        <section className="content-source warm-section">
          <div className="page-shell scope-grid">
            <div><p className="eyebrow">The content system</p><h2>Give people something to watch before the pitch.</h2><p>We use customer questions and real product knowledge to make content useful even when a viewer is not ready to buy. The company and founder can speak to the same market from different angles.</p></div>
            <ul>
              {["Category and customer-problem stories", "Product demonstrations and real workflows", "Founder decisions and informed opinions", "Use cases, objections, and comparisons", "Permissioned customer proof and factual claims", "Clear routes to the next business action"].map((idea) => <li key={idea}><Check aria-hidden="true" />{idea}</li>)}
            </ul>
          </div>
        </section>

        <section className="editorial-section orange-section">
          <div className="page-shell editorial-split">
            <div><p className="eyebrow">Production without a filming rule</p><h2>Your expertise can become content without a weekly shoot.</h2></div>
            <div className="prose-large">
              <p>We choose formats for the idea and the account. A founder can speak on camera, supply notes or interviews, approve a voice-led script, or authorize an AI avatar. The product itself can lead through screen recordings, demonstrations, animation, and visual explanations.</p>
              <p>An AI avatar solves a production constraint. It cannot supply the founder’s perspective or make unsupported claims true. We use a likeness or synthetic voice only with permission and apply platform disclosure rules where required.</p>
              <ul className="saas-format-list">{formats.map((format) => <li key={format}>{format}</li>)}</ul>
            </div>
          </div>
        </section>

        <section className="editorial-section warm-section">
          <div className="page-shell editorial-split">
            <div><p className="eyebrow">Funnel-First growth</p><h2>Reach needs a next step.</h2></div>
            <div className="prose-large">
              <p>We define who the account should attract, what they should understand, and where they should go next. Then we build the profile and content around that path, publish, measure, and improve.</p>
              <p>For SaaS, that next step might be a relevant follow, product page, trial, demo request, or enquiry. We look beyond views while being honest about what Instagram data can and cannot prove.</p>
              <Link className="text-link" href="/instagram-management-services">See Instagram Management <ArrowRight aria-hidden="true" /></Link>
            </div>
          </div>
        </section>

        <section className="saas-offers dark-section">
          <div className="page-shell">
            <p className="eyebrow">The existing offers</p><h2>Choose the engagement after the audit.</h2>
            <p className="saas-offers-intro">Managing one account or two changes the scope. We assess the current presence and the work required before recommending a plan.</p>
            <div className="saas-offer-grid">
              <article><h3>Standard Management</h3><strong>From $1,000/month</strong><p>Strategy, content, publishing, and review for the account or accounts in scope. No virality guarantee. A new account can build its content system and baseline here.</p><Link href="/instagram-management-services">Explore Standard Management <ArrowRight aria-hidden="true" /></Link></article>
              <article><h3>Viral Mandate</h3><strong>From $2,500/month</strong><p>A qualified six-month performance engagement with account-specific signed terms and creative control inside approved guardrails. If the agreed result is not delivered and eligibility remains intact, a 50% refund of collected management fees applies under the signed terms.</p><Link href="/viral-mandate">See qualification and terms <ArrowRight aria-hidden="true" /></Link></article>
            </div>
          </div>
        </section>

        <section className="faq-section dark-section">
          <div className="page-shell"><div className="section-heading"><p className="eyebrow">Questions, answered</p><h2>Is this the right channel and setup?</h2></div>
            <div className="faq-list">{questions.map(([question, answer], index) => <details key={question}><summary><span>{String(index + 1).padStart(2, "0")}</span>{question}<i aria-hidden="true">+</i></summary><p>{answer}</p></details>)}</div>
          </div>
        </section>

        <RelatedLinks title="Explore the connected work" links={[
          { href: "/instagram-marketing-for-founders", label: "Instagram for Founders", copy: "How a founder account turns a real point of view into useful distribution." },
          { href: "/instagram-content-creation-services", label: "Content Creation", copy: "See how ideas become Reels, scripts, carousels, and other formats." },
          { href: "/instagram-audit", label: "Free Instagram Audit", copy: "Start with the account, audience, and next action you have now." },
        ]} />
        <PageCta title="Find the right Instagram role for your SaaS." copy="We will review the current account, buyer fit, content opportunities, and the clearest next step before recommending a paid engagement." />
      </main>
      <SiteFooter />
      <BreadcrumbSchema items={crumbs} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(serviceSchema) }} />
    </>
  );
}
