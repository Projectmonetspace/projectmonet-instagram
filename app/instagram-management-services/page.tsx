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
  directAnswer: [
    "Instagram management is more than filling a posting calendar. It connects positioning, profile structure, content, publishing, review, and the next action people should take.",
    "Project Monet starts with the account itself. We decide who it should attract, what it should become known for, and which content deserves to be published. Then we manage and improve that system over time.",
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
    { title: "Publishing and review", copy: "Depending on scope, we prepare, publish, review performance, and improve the work instead of repeating the same plan." },
  ],
  process: [
    { title: "Understand the account", copy: "We audit the current page, recent content, audience signal, resources, and business goal." },
    { title: "Build the account path", copy: "We decide who should find the page, why they should follow, and what they should do next." },
    { title: "Create and publish", copy: "We produce the agreed work with clear approval gates, responsibilities, and publishing cadence." },
    { title: "Measure and improve", copy: "We compare results against the starting point and change hooks, topics, formats, and profile elements when the evidence supports it." },
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
    { href: "/instagram-content-creation-services", label: "Instagram Content Creation", copy: "See how Reels, scripts, carousels, and captions fit the account system." },
    { href: "/resources/turn-instagram-reach-into-leads", label: "Turn Reach Into Leads", copy: "See how content, profile clarity, trust, and calls to action connect." },
    { href: "/resources/instagram-marketing-cost", label: "Instagram Marketing Cost", copy: "Compare scope, responsibility, and the work behind a monthly price." },
    { href: "/viral-mandate", label: "Viral Mandate", copy: "Compare Standard with the qualified performance-led path." },
  ],
};

export default function Page() { return <ServicePage data={data} />; }
