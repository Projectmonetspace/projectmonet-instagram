import ServicePage, { type ServicePageData } from "@/app/components/service-page";
import { pageMetadata } from "@/app/lib/site";

const path = "/instagram-seo-services";
export const metadata = pageMetadata({
  title: "Instagram SEO Services in India | Project Monet",
  description: "Instagram SEO services for businesses in India. Improve profile clarity, topic relevance, searchable content, discoverability, and conversion after people find your account.",
  path,
});

const data: ServicePageData = {
  path,
  eyebrow: "Instagram SEO Services",
  h1: "Help the right people find and understand your Instagram.",
  intro: "Instagram SEO improves how clearly your profile and content communicate their subject inside Instagram. It supports discovery, but it is not the same system as Google SEO.",
  directAnswer: [
    "People use Instagram search, suggested content, Explore, audio pages, hashtags, and recommendations to discover accounts. Clear profile language and consistent topics can help Instagram and potential followers understand where an account belongs.",
    "We improve that clarity across the profile and content. Then we make sure discovery leads to a page that explains the offer, shows proof, and gives people a useful next step.",
  ],
  problems: [
    "The profile name and bio use clever language but do not clearly say what the account is about.",
    "Recent content jumps between unrelated topics, making the account difficult for people and the platform to categorise.",
    "Captions and on-screen language omit the words the intended audience naturally uses to describe the problem.",
    "People find the account but leave because the profile does not explain the offer, proof, or next action.",
  ],
  features: [
    { title: "Profile relevance", copy: "We review the profile name, username, category, bio, offer, proof, pinned posts, highlights, link, and CTA for clarity." },
    { title: "Topic consistency", copy: "We define a focused set of subjects the account can cover repeatedly without becoming narrow, repetitive, or confusing." },
    { title: "Searchable content", copy: "We use natural topic language in hooks, spoken words, on-screen text, captions, and supporting context where it helps understanding." },
    { title: "Discovery conversion", copy: "We connect search visibility to the profile experience, because being found is not valuable if the visitor cannot see why to follow or act." },
  ],
  process: [
    { title: "Map how people describe the need", copy: "We identify the plain words, questions, products, services, and topics the intended audience is likely to use." },
    { title: "Clarify the profile", copy: "We make the account identity understandable without forcing keywords into every available field." },
    { title: "Build topic signals", copy: "Content pillars, hooks, captions, and recurring formats reinforce the subjects the account genuinely covers." },
    { title: "Review discovery and action", copy: "We track available search and discovery signals alongside profile visits, follows, DMs, and other next actions." },
  ],
  includes: ["Instagram profile and discoverability review", "Name, bio, category, and profile-structure recommendations", "Topic and content-pillar mapping", "Natural caption and on-screen language guidance", "Pinned-post, highlight, link, and CTA review", "Ongoing topic and discovery testing"],
  approvalTitle: "Clarity should still sound like the brand.",
  approvalCopy: "Instagram SEO is not an excuse to make every sentence robotic. We agree on accurate language and brand boundaries, then use relevant words where they help a real person understand the account.",
  measurementTitle: "Discovery is useful only when the profile converts it.",
  measurementCopy: "Search placement is not the only outcome. We look at discoverability signals where available, then connect them to profile visits, follows, DMs, and business actions.",
  faqs: [
    ["What is Instagram SEO?", "Instagram SEO is the practice of making a profile and its content easier to understand and discover inside Instagram through clear profile information, consistent topics, and natural content context."],
    ["Is Instagram SEO the same as Google SEO?", "No. Instagram has different surfaces, signals, formats, and measurement limits. Some principles overlap, but the systems are not identical."],
    ["Do you add keywords to every caption?", "No. We use relevant language naturally when it improves clarity. Repeating keywords without a useful reason can make content worse for people."],
    ["Can Instagram SEO guarantee reach?", "No. Discoverability depends on many platform and content factors. Project Monet does not guarantee a fixed reach from Instagram SEO."],
    ["What happens after someone finds the account?", "The profile should explain what the account offers, show enough proof to build trust, and make the next action clear. Discovery and profile conversion need to work together."],
  ],
  related: [
    { href: "/instagram-management-services", label: "Instagram Management", copy: "Turn discoverability work into an ongoing account system." },
    { href: "/instagram-content-creation-services", label: "Instagram Content Creation", copy: "Build content around topics people and the platform can understand." },
    { href: "/instagram-reels-agency", label: "Instagram Reels Agency", copy: "Use clear topic signals without weakening the creative idea." },
  ],
};

export default function Page() { return <ServicePage data={data} />; }
