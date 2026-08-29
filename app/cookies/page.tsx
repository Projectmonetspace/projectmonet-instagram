import LegalPage from "@/app/components/legal-page";
import { pageMetadata } from "@/app/lib/site";

const path = "/cookies";
export const metadata = pageMetadata({ title: "Cookies Policy | Project Monet", description: "Project Monet’s current cookies and analytics position, essential website storage, future consent rules, and browser choices.", path });

export default function Page() {
  return <LegalPage path={path} title="Cookies Policy" intro="ProjectMonet.com currently keeps tracking minimal. This page explains the storage the site may use and what will happen before optional analytics is enabled." updated="29 August 2026" sections={[
    { heading: "What cookies are", paragraphs: ["Cookies are small values a website or provider can store in a browser. Similar technologies include local storage and other identifiers used to remember state, secure a request, or measure use."] },
    { heading: "Current production position", paragraphs: ["Project Monet does not currently have an approved analytics Measurement ID active on this production site. We do not intentionally set advertising cookies or run cross-site advertising trackers.", "The form wizard keeps answers in the page while it is open. It does not intentionally save those answers to analytics or persistent browser storage."] },
    { heading: "Essential technology", paragraphs: ["The website and its hosting or security providers may use strictly necessary technical storage or request data to deliver pages, prevent abuse, balance traffic, or maintain security. These functions are not used by Project Monet to build advertising profiles.", "External links, Instagram, Web3Forms, Vercel, and other third-party services have their own cookie and privacy practices when you interact with them."] },
    { heading: "Future analytics", paragraphs: ["If Project Monet adds optional analytics later, consent will be denied by default. Optional analytics will not be activated until the visitor makes the required choice.", "Analytics events may cover actions such as Audit CTA clicks, Viral qualification CTA clicks, successful form submissions, the Websites link, and click-to-email. These events must not contain form answers, email addresses, phone numbers, Instagram handles, or other personal information."] },
    { heading: "Your browser choices", paragraphs: ["Most browsers let you view, block, or delete cookies and site storage. Blocking strictly necessary technology may affect how a service works.", "Because optional analytics is currently inactive, there is no analytics preference cookie to manage on this site at the date above."] },
    { heading: "Changes and contact", paragraphs: ["We will update this page if the site begins using new cookie categories or analytics tools. Questions can be sent to contact@projectmonet.com."] },
  ]} related={[{ href: "/privacy", label: "Privacy Policy" }, { href: "/terms", label: "Website Terms" }, { href: "/audit-terms", label: "Free Audit Terms" }]} />;
}
