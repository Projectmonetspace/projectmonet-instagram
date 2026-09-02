import ServicePage, { type ServicePageData } from "@/app/components/service-page";
import { pageMetadata } from "@/app/lib/site";

const path = "/instagram-reels-agency";
export const metadata = pageMetadata({
  title: "Instagram Reels Agency | Project Monet",
  description: "Instagram Reels strategy and production for businesses and founders: ideas, hooks, scripts, editing, testing, and iteration tied to business goals.",
  path,
});

const data: ServicePageData = {
  path,
  eyebrow: "Instagram Reels Agency",
  h1: "Reels built to earn the next action, not only the view.",
  intro: "Project Monet develops Instagram Reels from idea to iteration. Every Reel begins with who should watch and what should happen after they do.",
  directAnswer: [
    "A Reel is a distribution format. It can introduce the business to people who have never heard of it. But reach becomes useful only when the content attracts the right viewers and the profile gives them a reason to stay.",
    "We connect the hook, script, production, edit, cover, caption, and next action. Then we test what the audience actually responds to instead of treating one post as a final verdict.",
  ],
  problems: [
    "The opening takes too long to explain why the viewer should keep watching.",
    "The Reel gets broad views from people who are unlikely to care about the business.",
    "The video ends without creating curiosity, a profile visit, a follow, or a useful next step.",
    "Every Reel uses a new style, so the team cannot learn what to repeat or improve.",
  ],
  features: [
    { title: "Ideas with audience fit", copy: "We use business expertise, audience problems, stories, objections, proof, and timely formats to find ideas worth producing." },
    { title: "Hooks and scripts", copy: "We make the subject clear early, remove slow setup, structure the information, and write for spoken or visual delivery." },
    { title: "Production and editing", copy: "Depending on scope, we direct footage, selects, pacing, on-screen text, sound, visual rhythm, and the final export." },
    { title: "Packaging and testing", copy: "Covers, captions, posting context, format variants, and follow-up tests help us learn whether the idea can become a repeatable asset." },
  ],
  process: [
    { title: "Choose the viewer", copy: "We define who the Reel should reach before deciding how broad or specific the topic should be." },
    { title: "Create the stopping point", copy: "The hook earns attention with clarity, tension, relevance, surprise, or a useful promise—not empty drama." },
    { title: "Deliver and direct", copy: "The middle keeps the idea moving. The ending gives the viewer a clear reason to remember, visit, follow, reply, or act." },
    { title: "Test the signal", copy: "We review retention, shares, profile visits, follow behaviour, and downstream response to decide what to repeat, change, or stop." },
  ],
  includes: ["Reel strategy and recurring format development", "Topic research, ideas, hooks, and scripts", "Shot guidance or production direction", "Editing, pacing, captions, and visual packaging", "Cover and caption direction", "Testing, review, and iteration"],
  approvalTitle: "The account direction comes before individual preferences.",
  approvalCopy: "For Standard Management, agreed review stages protect business facts and brand boundaries. They also keep a strategically useful Reel from being revised into a safer but weaker version without a clear reason.",
  measurementTitle: "Views are the beginning of the path.",
  measurementCopy: "We still care about reach and watch behaviour. We also ask whether the Reel produced qualified profile visits, follows, shares, DMs, leads, or another business-relevant action.",
  faqs: [
    ["What does an Instagram Reels agency do?", "Project Monet can support Reel strategy, ideas, hooks, scripts, production direction, editing, packaging, publishing context, testing, and iteration."],
    ["Do you guarantee that a Reel will go viral?", "No. Standard Reels and management work does not include a virality guarantee."],
    ["Can you work with footage we record?", "Yes, when the footage is suitable. We can define what needs to be recorded and how it should be delivered as part of the agreed production workflow."],
    ["Do Reels need a founder on camera?", "Not always. A founder, expert, product, customer question, process, voice-over, or visual demonstration can lead the content when it fits the account."],
    ["Why are views alone not enough?", "A Reel can reach many irrelevant viewers and still produce few profile visits, follows, DMs, or business actions. Audience quality and the account path matter."],
  ],
  related: [
    { href: "/instagram-content-creation-services", label: "Instagram Content Creation", copy: "See how Reels work alongside scripts, carousels, captions, and creative direction." },
    { href: "/instagram-management-services", label: "Instagram Management", copy: "Connect Reels to profile work, publishing, reporting, and ongoing improvement." },
    { href: "/instagram-seo-services", label: "Instagram SEO Services", copy: "Make the topic easier for people and Instagram to understand." },
    { href: "/resources/instagram-reels-for-small-business", label: "Reels for Small Business", copy: "See practical Reel ideas tied to trust, local relevance, and action." },
  ],
};

export default function Page() { return <ServicePage data={data} />; }
