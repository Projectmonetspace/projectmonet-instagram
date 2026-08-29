import AudiencePage, { type AudiencePageData } from "@/app/components/audience-page";
import { pageMetadata } from "@/app/lib/site";

const path = "/instagram-marketing-for-small-business";
export const metadata = pageMetadata({
  title: "Instagram Marketing for Small Business | Project Monet",
  description: "Instagram marketing for small businesses that need the right people to find, understand, trust, and take action. Strategy, content, profile, and management.",
  path,
});

const data: AudiencePageData = {
  path,
  eyebrow: "Instagram Marketing for Small Business",
  h1: "You do not need millions of followers.",
  intro: "You need the right people to find you, understand what you offer, trust the business, and know what to do next. We build Instagram around that path.",
  truthTitle: "A smaller relevant audience can be worth more than a large random one.",
  truthCopy: [
    "Small-business Instagram often fails when the account tries to look busy instead of being useful. More posts do not fix an unclear offer, weak profile, wrong audience, or missing next step.",
    "The account should help a likely buyer answer simple questions: Is this for me? Can I trust it? What makes it different? How do I buy, book, visit, or ask?",
  ],
  pathTitle: "Make the buying path easy to see.",
  pathSteps: [
    { title: "Find you", copy: "Use topics, local context where relevant, and clear content packaging to reach people who may need the offer." },
    { title: "Understand you", copy: "Explain what the business sells, who it helps, and why it matters without making visitors decode the page." },
    { title: "Trust you", copy: "Show the people, process, product, proof, answers, and useful expertise behind the business." },
    { title: "Take action", copy: "Give people a clear route to a DM, enquiry, booking, shop, visit, or another useful business action." },
  ],
  contentTitle: "Start with the questions customers already ask.",
  contentIntro: "Useful small-business content is often close to the sale, the service, and the real customer experience.",
  contentIdeas: ["Product or service demonstrations", "Common questions and objections", "Founder or expert explanations", "Customer proof you have permission to use", "Behind-the-scenes process", "Local relevance and availability", "Comparisons and buying guidance", "Clear calls to DM, book, visit, or enquire"],
  systemTitle: "Every post should support the account path.",
  systemCopy: [
    "We define the useful audience, improve the profile, choose repeatable content, and connect it to a next action the business can handle.",
    "Then we publish, measure, and improve. We do not judge progress only by followers or one high-view Reel.",
  ],
  faqs: [
    ["Can Instagram work for a local small business?", "Yes, when the content, profile, location cues, proof, and next action make sense for the people the business can actually serve."],
    ["Do I need professional production for every post?", "No. Production quality should fit the idea, offer, and audience. Clear, credible content often matters more than expensive polish."],
    ["What if we have a small following now?", "Follower count alone does not decide whether the account can improve. We look at account health, relevance, resources, and the path from discovery to action."],
    ["How much does Instagram management cost?", "Project Monet Standard Management starts at $1,000 per month. The final price depends on strategy, content, production, and management required."],
  ],
  related: [
    { href: "/instagram-management-services", label: "Instagram Management", copy: "See the connected account-management process." },
    { href: "/instagram-content-creation-services", label: "Content Creation", copy: "Build useful content from real business questions and proof." },
    { href: "/instagram-audit", label: "Free Instagram Audit", copy: "Learn what we review before asking you to buy anything." },
  ],
};

export default function Page() { return <AudiencePage data={data} />; }
