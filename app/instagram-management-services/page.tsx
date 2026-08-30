import ServicePage, { type ServicePageData } from "@/app/components/service-page";
import { pageMetadata } from "@/app/lib/site";

const path = "/instagram-management-services";
export const metadata = pageMetadata({
  title: "Instagram Management Services | Project Monet",
  description: "Instagram management services for founders and businesses worldwide. Strategy, content, publishing, profile improvement, reporting, and ongoing optimization from $1,000/month.",
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
  includes: ["Instagram strategy and positioning", "Profile and conversion-path review", "Reels, carousels, captions, or scripts within the agreed scope", "Publishing and account management", "Performance reporting and review", "Ongoing optimization and testing"],
  approvalTitle: "You keep structured approval rights.",
  approvalCopy: "Standard Management is collaborative. We agree where your approval is needed and keep feedback inside defined gates, so work can move without turning every post into a new strategy debate.",
  measurementTitle: "We care about what happens after the view.",
  measurementCopy: "A large view count can be useful. It is not the only signal. We look at whether the content brought the right people to the profile and moved them towards trust or action.",
  faqs: [
    ["How much do Instagram management services cost?", "Project Monet Standard Management starts at $1,000 per month. Final pricing depends on the strategy, content, production, publishing, and management required."],
    ["What is included in Instagram account management?", "Scope can include strategy, profile work, content, publishing, reporting, and ongoing optimization. The exact deliverables are agreed before work starts."],
    ["Does Instagram management guarantee virality?", "No. Standard Management provides professional Instagram strategy and execution without a virality guarantee."],
    ["Can we approve content before it is published?", "Yes. Standard Management uses structured approval rights. The exact approval stages are defined for the engagement."],
    ["Do you manage other social platforms?", "Not currently. Project Monet specialises in Instagram."],
  ],
  related: [
    { href: "/instagram-content-creation-services", label: "Instagram Content Creation", copy: "See how Reels, scripts, carousels, and captions fit the account system." },
    { href: "/instagram-reels-agency", label: "Instagram Reels Agency", copy: "Understand the idea-to-testing process behind business Reels." },
    { href: "/instagram-seo-services", label: "Instagram SEO Services", copy: "Improve how people find and understand the profile." },
  ],
};

export default function Page() { return <ServicePage data={data} />; }
