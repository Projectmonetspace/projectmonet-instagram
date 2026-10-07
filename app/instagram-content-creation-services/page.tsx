import ServicePage, { type ServicePageData } from "@/app/components/service-page";
import { pageMetadata } from "@/app/lib/site";

const path = "/instagram-content-creation-services";
export const metadata = pageMetadata({
  title: "Instagram Content Creation Services | Project Monet",
  description: "Instagram content creation for businesses and founders: Reels, hooks, scripts, carousels, captions, creative direction, and goal-led content systems.",
  path,
});

const data: ServicePageData = {
  path,
  eyebrow: "Instagram Content Creation Services",
  h1: "Instagram content with a reason to exist.",
  intro: "Project Monet creates Reels, scripts, carousels, captions, and repeatable formats that support the account—not a pile of disconnected posts.",
  answerTitle: "Turn expertise into work people can use.",
  problemTitle: "Good ideas get lost between brief and delivery.",
  featureTitle: "The brief, the format and the finished asset.",
  processTitle: "From a real question to a publishable piece.",
  directAnswer: [
    "Good Instagram content should do a clear job. It may introduce the business to new people, explain an idea, answer an objection, build authority, or give someone a reason to visit the profile.",
    "The working brief connects the audience, one useful point, supporting facts, format, production inputs and next action. We agree who supplies footage or product information and who approves it. Content-only work is assessed for fit and scope; it is not a separate fixed-price package.",
  ],
  problems: [
    "The team has ideas, but no repeatable system for turning them into publishable content.",
    "Reels earn attention while the rest of the profile tells a different story.",
    "Content looks polished but gives the viewer no reason to remember, follow, or act.",
    "The business keeps producing more assets without learning which topics, hooks, or formats actually work.",
  ],
  features: [
    { title: "Hooks and ideas", copy: "We turn business knowledge, audience questions, objections, stories, and timely formats into focused content ideas." },
    { title: "Scripts and structure", copy: "We shape the opening, information order, pacing, proof, and next action so a strong idea survives production." },
    { title: "Reels and carousels", copy: "We choose the format that helps the idea land. Not every thought needs to become a Reel, and not every carousel needs ten slides." },
    { title: "Captions and packaging", copy: "We use captions, covers, on-screen language, and calls to action to help people understand the topic and decide what to do next." },
  ],
  process: [
    { title: "Choose the content job", copy: "We decide whether the content should attract, explain, prove, answer, or prompt action." },
    { title: "Build repeatable pillars", copy: "We create a small set of topics and formats the audience can recognise and the business can sustain." },
    { title: "Produce inside the system", copy: "The approved topic, script and style guide production. Your team supplies agreed facts, access and assets; we create the scoped scripts, designs or edits. A new direction after approval may change the timeline." },
    { title: "Learn from publishing", copy: "When we manage publishing, performance informs the next cycle. If your team publishes, agree the handoff, captions, covers and access to results. Final paid deliverables transfer under the SOW; editable source files are not included by default." },
  ],
  includes: ["Content strategy and pillar development", "Reel concepts, hooks, and scripts", "Carousel structures and copy", "Caption and CTA writing", "Creative direction and packaging", "Editing or production within the agreed scope"],
  approvalTitle: "Feedback happens against the agreed direction.",
  approvalCopy: "We establish the audience, voice, claims, visual boundaries, and business facts first. Reviews are clearer when everyone can compare the work with that shared brief.",
  measurementTitle: "The best asset is the one that does its job.",
  measurementCopy: "We do not judge every post by views alone. A useful piece may bring fewer but better profile visitors, answer a sales objection, or become a repeatable format the audience remembers.",
  faqs: [
    ["What does Instagram content creation include?", "Depending on scope, it can include content strategy, ideas, hooks, scripts, Reels, carousels, captions, creative direction, editing, and packaging."],
    ["Can you create content without managing the whole account?", "The final scope depends on fit and resources. Project Monet still needs enough account context to make useful content rather than isolated assets."],
    ["Do you promise a fixed number of views?", "No. Content creation does not include a fixed view or virality guarantee."],
    ["Can our founder or team appear in the content?", "Yes. Founder, expert, and team-led content can be valuable when it supports the strategy and the people involved are available."],
    ["How much does ongoing work start from?", "Project Monet Standard Management starts at $1,000 per month. Content and production requirements affect the final price."],
  ],
  related: [
    { href: "/resources/instagram-manager-vs-agency", label: "Creator or account manager?", copy: "Decide whether you need assets, account ownership or both." },
    { href: "/instagram-reels-agency", label: "Instagram Reels Agency", copy: "Go deeper into hooks, production, editing, packaging, and testing." },
    { href: "/instagram-management-services", label: "Instagram Management", copy: "See how content fits publishing, profile work, reporting, and optimization." },
    { href: "/instagram-seo-services", label: "Instagram SEO Services", copy: "Help Instagram understand the topics your content consistently covers." },
  ],
};

export default function Page() { return <ServicePage data={data} />; }
