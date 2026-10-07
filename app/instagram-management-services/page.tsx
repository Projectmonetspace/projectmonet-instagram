import ServicePage, { type ServicePageData } from "@/app/components/service-page";
import { pageMetadata } from "@/app/lib/site";

const path = "/instagram-management-services";
export const metadata = pageMetadata({
  title: "Instagram Management Services | Project Monet",
  description: "Instagram management for founders and businesses worldwide: strategy, content, publishing, profile improvement, reporting, and optimization from $1,000/month.",
  path,
});

const data: ServicePageData = {
  path,
  eyebrow: "Instagram Management Services",
  h1: "Instagram management built around growth, trust, and business action.",
  intro: "Project Monet manages Instagram as one connected account system. We improve what people see, why they follow, and what happens after they visit.",
  answerTitle: "Who will take responsibility for the account?",
  problemTitle: "A calendar cannot coordinate itself.",
  featureTitle: "Strategy, production, publishing and review.",
  processTitle: "From a starting baseline to a repeatable cycle.",
  directAnswer: [
    "Instagram management is more than filling a posting calendar. It connects positioning, profile structure, content, publishing, review, and the next action people should take.",
    "If you want to hire an Instagram manager, first decide which responsibilities need an owner. Project Monet connects account strategy, content, approvals, publishing, bounded community management and reporting. You retain ownership of the business account; the agreed access and approval process lets us do the work.",
  ],
  problems: [
    "The account posts regularly but attracts people who are unlikely to buy, enquire, or remember the business.",
    "The profile does not quickly explain what the business offers or why someone should follow it.",
    "Content decisions depend on last-minute ideas, random trends, or personal preference instead of a clear strategy.",
    "Views are reported, but nobody can explain what happened after people watched.",
  ],
  features: [
    { title: "Account strategy", copy: "We define the audience, promise, tone, content direction, and reason to follow before increasing output." },
    { title: "Profile improvement", copy: "We review the name, bio, proof, pinned posts, highlights, link, and next action so new visitors understand the page." },
    { title: "Content system", copy: "We plan useful pillars, repeatable formats, Reels, carousels, captions, and calls to action around the account goal." },
    { title: "Publishing and review", copy: "Publishing and scheduling are included by default. Weekly status shows completed work, work in progress, next steps and anything waiting on your team." },
  ],
  process: [
    { title: "Understand the account", copy: "After the free diagnosis and paid onboarding, we review the account, business goal, audience, assets and available performance history to establish a baseline." },
    { title: "Build the account path", copy: "The first cycle establishes positioning, profile changes, production inputs and the next action. We agree cadence and responsibilities before scaling output; timing depends on access and approvals." },
    { title: "Create and publish", copy: "One named approver reviews topic/angle, script and style at the agreed stages. Production follows locked inputs, with one minor revision round by default. Reopened direction changes the affected scope or timeline." },
    { title: "Measure and improve", copy: "Monthly reporting compares the baseline with reach, profile visits, follows and measurable enquiries. The review call decides what to repeat, change or stop; weekly status keeps delivery visible." },
  ],
  includes: ["Instagram strategy and positioning", "Profile and conversion-path review", "Reels, carousels, captions, or scripts within the agreed scope", "Publishing and scheduling", "Normal bounded community management", "Weekly status visibility", "Monthly report and one monthly review call", "Ongoing optimization and testing"],
  approvalTitle: "You keep structured approval rights.",
  approvalCopy: "Standard Management is collaborative. We agree where your approval is needed and keep feedback inside defined gates, so work can move without turning every post into a new strategy debate.",
  measurementTitle: "We care about what happens after the view.",
  measurementCopy: "A large view count can be useful. It is not the only signal. We look at whether the content brought the right people to the profile and moved them towards trust or action.",
  faqs: [
    ["How much do Instagram management services cost?", "Project Monet Standard Management starts at $1,000 per month. Final pricing depends on the strategy, content, production, publishing, and management required."],
    ["How long is the Standard Management engagement?", "The planned initial operating period is three months, followed by month-to-month service. Clients can give 14 days’ notice before the next billing or renewal period. A one-month paid pilot may be offered at Project Monet’s discretion."],
    ["How many posts are included each week?", "There is no fixed universal posts-per-week quota. Cadence follows the account condition, strategy, formats, resources, and agreed scope instead of an arbitrary volume target."],
    ["What is included in Instagram account management?", "Scope can include strategy, profile work, content, publishing and scheduling, normal bounded community management, weekly status visibility, a monthly report, one monthly review call, and ongoing optimization. Exact deliverables are agreed before work starts."],
    ["How do revisions and approvals work?", "Standard Management uses structured approval gates and includes one minor revision round by default. Major direction changes or reopened approvals may need a changed scope or timeline."],
    ["Does Instagram management guarantee performance?", "No. Standard Management does not guarantee virality, followers, reach, leads, sales, or revenue."],
    ["Why use Project Monet instead of a freelancer or an in-house team?", "Project Monet is not automatically the right choice for every business. In-house can suit companies with internal strategy and creative leadership. A freelancer can suit narrow execution. Project Monet is designed for clients wanting Instagram-only specialist focus, creator-native distribution experience, Funnel-First strategy, content and profile thinking, structured execution, reporting, close oversight, and a qualified performance path through Viral Mandate."],
    ["Do you manage other social platforms?", "Not currently. Project Monet specialises in Instagram."],
  ],
  related: [
    { href: "/resources/instagram-manager-vs-agency", label: "Manager, agency or in-house?", copy: "Compare who owns the decisions and day-to-day work." },
    { href: "/resources/how-to-choose-an-instagram-agency", label: "Before you hire", copy: "Use a practical checklist to assess scope, proof and approvals." },
    { href: "/instagram-content-creation-services", label: "Instagram Content Creation", copy: "See how Reels, scripts, carousels, and captions fit the account system." },
    { href: "/resources/turn-instagram-reach-into-leads", label: "Turn Reach Into Leads", copy: "See how content, profile clarity, trust, and calls to action connect." },
    { href: "/resources/instagram-marketing-cost", label: "Instagram Marketing Cost", copy: "Compare scope, responsibility, and the work behind a monthly price." },
    { href: "/viral-mandate", label: "Viral Mandate", copy: "Compare Standard with the qualified performance-led path." },
  ],
};

export default function Page() { return <ServicePage data={data} />; }
