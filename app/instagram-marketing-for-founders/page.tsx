import AudiencePage, { type AudiencePageData } from "@/app/components/audience-page";
import { pageMetadata } from "@/app/lib/site";

const path = "/instagram-marketing-for-founders";
export const metadata = pageMetadata({
  title: "Instagram Marketing for Founders | Project Monet",
  description: "Instagram marketing for founders who want to turn expertise, opinions, and stories into authority, trust, profile visits, DMs, and business demand.",
  path,
});

const data: AudiencePageData = {
  path,
  eyebrow: "Instagram Marketing for Founders",
  h1: "You do not need to become an influencer.",
  intro: "You need to become recognisable to the right people. Project Monet turns founder experience, opinions, stories, and expertise into an Instagram presence that supports the business.",
  truthTitle: "People often trust people before they trust company pages.",
  truthCopy: [
    "A founder can explain the thinking, decisions, lessons, and beliefs behind a business in a way a logo cannot. That does not mean sharing every part of your life or performing for attention.",
    "It means giving the right audience a clear person to remember. The content should still have a business job: build authority, create trust, answer doubts, and make the next action easy.",
  ],
  pathTitle: "From useful point of view to business demand.",
  pathSteps: [
    { title: "Be found", copy: "Use relevant topics, clear hooks, and searchable context to reach people who may care about the problem you solve." },
    { title: "Be understood", copy: "Make your role, experience, point of view, and business connection clear when someone visits the profile." },
    { title: "Be trusted", copy: "Publish useful explanations, honest stories, evidence, and informed opinions instead of empty personal-brand quotes." },
    { title: "Create a next step", copy: "Connect attention to a follow, profile link, DM, enquiry, or another action the business can support." },
  ],
  contentTitle: "Your work already contains content.",
  contentIntro: "The best starting material usually comes from real work, not a blank content calendar.",
  contentIdeas: ["Lessons from decisions you made", "Clear opinions about the industry", "Answers to questions buyers keep asking", "Stories that explain why the business exists", "Useful frameworks from your expertise", "Behind-the-scenes choices and trade-offs", "Objections explained without a sales pitch", "Founder-led proof with accurate attribution"],
  systemTitle: "The founder is part of the system, not the whole system.",
  systemCopy: [
    "We decide who should find you, why they should follow, what you can credibly talk about, and how the profile connects back to the business.",
    "Then we build formats that fit your time and strengths. A good plan should not require you to pretend to be someone else every week.",
  ],
  faqs: [
    ["Do founders have to appear on camera?", "Not always. A person-led strategy can use voice, writing, interviews, demonstrations, or other formats. If face-to-camera content is useful, we will explain why."],
    ["Is founder marketing the same as becoming an influencer?", "No. The goal is to become recognisable and trusted by people relevant to the business, not to share everything or chase broad fame."],
    ["Can founder content support a company account?", "Yes. The founder and company pages can have different roles while supporting the same business story and next action."],
    ["How much does ongoing Instagram management cost?", "Project Monet Standard Management starts at $1,000 per month. Final pricing depends on the work required."],
  ],
  related: [
    { href: "/instagram-management-services", label: "Instagram Management", copy: "See how strategy, profile, publishing, and review work together." },
    { href: "/instagram-content-creation-services", label: "Content Creation", copy: "Turn expertise into repeatable Reels, scripts, carousels, and captions." },
    { href: "/viral-mandate", label: "Viral Mandate", copy: "Understand the qualified six-month performance-led offer." },
  ],
};

export default function Page() { return <AudiencePage data={data} />; }
