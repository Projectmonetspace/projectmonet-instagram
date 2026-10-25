import { ArrowRight, Check } from "lucide-react";
import Link from "next/link";
import { BreadcrumbSchema, PageHero, RelatedLinks, SiteFooter } from "@/app/components/page-framework";
import { LeadFormTrigger } from "@/app/components/lead-form-modal";
import { pageMetadata } from "@/app/lib/site";

const path = "/book-instagram-meeting";
export const metadata = pageMetadata({
  title: "Book an Instagram Management Meeting | Project Monet",
  description: "See who can book a 30-minute Instagram management meeting with Project Monet. Check budget, timing and decision criteria, or choose a free audit or email instead.",
  path,
});

const criteria = [
  "You are a founder, owner, creator, author, marketing lead or team member, or an agency representing a client.",
  "You want ongoing Instagram management, Viral Mandate, or help choosing between them. One-off work and other platforms are outside this meeting route.",
  "You can commit to a monthly service budget of at least $1,000. If you want Viral Mandate only, its starting price is $2,500 per month and its qualification is separate.",
  "You want to start now or within 30 days, or within 1–3 months and are choosing a partner now.",
  "You can approve the engagement or bring the approver, and you can provide business information, content inputs and timely approvals, even if that needs a little planning.",
];

const alternatives = [
  { situation: "Budget under $1,000, or you are still researching", next: "Have an existing Instagram account? Start with a Free Instagram Audit. We can review the account and suggest a useful next step without a meeting.", href: "/instagram-audit", label: "Get a Free Instagram Audit" },
  { situation: "You are planning for later", next: "If the account is live, a Free Instagram Audit is a practical starting point while you decide when to begin.", href: "/instagram-audit", label: "Explore the audit" },
  { situation: "Your monthly budget is undecided", next: "Email us about your goals and questions on scope or starting prices. We can help you decide if a meeting makes sense.", href: "/contact", label: "Email Project Monet" },
  { situation: "Your Instagram account has not launched", next: "If you do not meet the meeting criteria, email us about your launch plans. The audit needs an existing Instagram account to review.", href: "/contact", label: "Email about your launch" },
  { situation: "You need one-off work, other platforms, or cannot bring an approver or inputs", next: "A meeting is not available through this route. Email us about what you need and we will suggest an appropriate next step.", href: "/contact", label: "Email your enquiry" },
  { situation: "You want only Viral Mandate but your budget is below $2,500", next: "Email us if you are open to discussing Standard Management, which starts at $1,000 per month. A Viral-only meeting needs the Viral starting budget.", href: "/contact", label: "Ask about Standard Management" },
];

const faqs: Array<[string, string]> = [
  ["Do I need a large following or an established account?", "No. A new account or low follower count does not by itself prevent a meeting. The decision is based on the work you need, budget, timing, decision-making and ability to collaborate."],
  ["What if I am unsure of my budget?", "A budget that is undecided does not qualify for booking. Email us with your questions about scope and prices; we can help you decide on the next step."],
  ["Does a meeting mean I qualify for Viral Mandate?", "No. Viral Mandate requires a separate review of the account and engagement. The meeting form checks whether a conversation about ongoing work makes sense, not whether an account qualifies for Viral Mandate."],
  ["What happens to my answers if I do not qualify?", "We receive the form answers either way and show you an audit or email route based on what you shared. Only meeting-qualified submissions reveal the booking link after submission."],
  ["Is the meeting a free strategy session?", "No. It is a 30-minute fit and scope conversation. A complete strategy, production plan and implementation are part of a paid engagement."],
];

export default function Page() {
  const breadcrumbs = [{ label: "Home", href: "/" }, { label: "Meeting eligibility", href: path }];
  return (
    <>
      <main>
        <PageHero eyebrow="Meeting eligibility" title="Who can book a meeting with Project Monet?" intro="A 30-minute conversation is for people ready to discuss ongoing Instagram work. Check the criteria below, then answer the short qualification form before the booking link appears." path={path} currentLabel="Meeting eligibility" primaryKind="meeting" primaryLabel="Check Meeting Fit">
          <Link className="button button-outline" href="/instagram-audit">Explore the Free Instagram Audit <ArrowRight aria-hidden="true" /></Link>
        </PageHero>

        <section className="editorial-section warm-section">
          <div className="page-shell editorial-split"><div><p className="eyebrow">The direct answer</p><h2>Ready to choose Instagram support?</h2></div><div className="prose-large"><p>Project Monet books meetings for founders, creators, businesses and their teams who are considering ongoing Instagram management. Standard Management starts at $1,000 per month; Viral Mandate starts at $2,500 per month and has separate account and engagement requirements.</p><p>You can discuss a new account or a small following. What matters for this booking route is a confirmed service budget, a near-term decision, someone who can approve the work, and the information and approvals needed to do it well.</p><p>The meeting is for fit and scope. It is not a free complete Instagram strategy.</p></div></div>
        </section>

        <section className="scope-section orange-section">
          <div className="page-shell scope-grid"><div><p className="eyebrow">Who can book</p><h2>Five conditions for a useful call.</h2><p>Meeting-qualified visitors see the booking link after submitting the form. These criteria apply to the meeting, not automatic acceptance into a service.</p></div><ul>{criteria.map((item) => <li key={item}><Check aria-hidden="true" />{item}</li>)}</ul></div>
        </section>

        <section className="meeting-alternatives dark-section">
          <div className="page-shell"><p className="eyebrow">If a meeting is not available</p><h2>There is still a useful next step.</h2><p className="meeting-alternatives-intro">The form explains your result clearly. Depending on your answers, we suggest a Free Instagram Audit for a live account or an email conversation about your situation.</p><div className="meeting-route-grid">{alternatives.map(({ situation, next, href, label }) => <article key={situation}><h3>{situation}</h3><p>{next}</p><Link href={href}>{label} <ArrowRight aria-hidden="true" /></Link></article>)}</div></div>
        </section>

        <section className="process-section warm-section">
          <div className="page-shell"><p className="eyebrow">How booking works</p><h2>Check fit before choosing a time.</h2><div className="process-list"><article><span>01</span><div><h3>Tell us about your project</h3><p>Share who you are, the account or launch, the work you want, budget, timing and how decisions and content inputs will work.</p></div></article><article><span>02</span><div><h3>See your route</h3><p>Your answers go to Project Monet. If a meeting fits, you can open our 30-minute booking page. If it does not, the result suggests an audit or email instead.</p></div></article><article><span>03</span><div><h3>Discuss fit and scope</h3><p>A meeting helps us understand goals and the possible engagement. Viral Mandate eligibility is assessed separately.</p></div></article></div></div>
        </section>

        <section className="faq-section dark-section"><div className="page-shell"><div className="section-heading"><p className="eyebrow">Meeting FAQ</p><h2>Before you begin.</h2></div><div className="faq-list">{faqs.map(([question, answer], index) => <details key={question}><summary><span>{String(index + 1).padStart(2, "0")}</span>{question}<i aria-hidden="true">+</i></summary><p>{answer}</p></details>)}</div></div></section>

        <RelatedLinks links={[{ href: "/instagram-audit", label: "Free Instagram Audit", copy: "Start with an account review if a meeting is not the right step yet." }, { href: "/instagram-management-services", label: "Standard Management", copy: "Understand ongoing Instagram support and its starting price." }, { href: "/viral-mandate", label: "Viral Mandate", copy: "Read the additional qualification and engagement terms." }]} />
        <section className="page-cta orange-section"><div className="page-shell"><p className="eyebrow">Ready to talk?</p><h2>Check if a meeting fits.</h2><p>Answer the qualification questions. Only meeting-qualified visitors receive the booking link; everyone receives a clear next step.</p><LeadFormTrigger kind="meeting" location="meeting_page_final" className="button button-ink">Check Meeting Fit</LeadFormTrigger><Link className="text-link ink-link" href="/instagram-audit">Explore the audit <ArrowRight aria-hidden="true" /></Link><Link className="text-link ink-link" href="/contact">Email us <ArrowRight aria-hidden="true" /></Link></div></section>
      </main>
      <SiteFooter />
      <BreadcrumbSchema items={breadcrumbs} />
    </>
  );
}
