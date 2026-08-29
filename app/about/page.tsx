import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { BreadcrumbSchema, PageCta, PageHero, RelatedLinks, SiteFooter } from "@/app/components/page-framework";
import { absoluteUrl, pageMetadata } from "@/app/lib/site";

const path = "/about";
export const metadata = pageMetadata({
  title: "About Project Monet | Creator-Led Instagram Agency",
  description: "Meet Project Monet, a creator-led Instagram marketing agency focused on strategy, content, Reels, management, Instagram SEO, and business-first measurement.",
  path,
});

export default function Page() {
  const crumbs = [{ label: "Home", href: "/" }, { label: "About Project Monet", href: path }];
  const aboutSchema = { "@context": "https://schema.org", "@type": "AboutPage", name: "About Project Monet", url: absoluteUrl(path), description: "Project Monet is a creator-led, Instagram-only marketing agency.", mainEntity: { "@type": "Organization", name: "Project Monet", url: absoluteUrl("/") } };
  return (
    <>
      <main>
        <PageHero eyebrow="About Project Monet" title="We learned Instagram by doing it." intro="Project Monet is a creator-led Instagram marketing agency. The people behind it built audiences before they started managing brands." path={path} currentLabel="About Project Monet" />

        <section className="editorial-section warm-section"><div className="page-shell editorial-split"><div><p className="eyebrow">Why Project Monet exists</p><h2>Make attention useful.</h2></div><div className="prose-large"><p>Instagram can make a business visible. Visibility alone is not the finish line. The account also needs to be clear, trusted, easy to remember, and connected to a next action.</p><p>That is why we plan the profile and path before treating content as output. Strategy comes before posting. Measurement continues after the view.</p></div></div></section>

        <section className="founder-profiles dark-section"><div className="page-shell"><p className="eyebrow">Public founder proof</p><h2>Built through real publishing.</h2><div className="profile-proof-grid"><article><span>Founder / Creative Director</span><h3>Sl6Dl7</h3><strong>102K followers</strong><p>Creator experience informs how Project Monet thinks about attention, format, memory, and audience response.</p><a href="https://instagram.com/sl6dl7/" target="_blank" rel="noreferrer">View Instagram <ArrowRight aria-hidden="true" /></a></article><article><span>Co-founder / manages the managers</span><h3>Poetrynyx</h3><strong>200K followers</strong><p>Creator and management experience informs how the team turns creative direction into a repeatable operating process.</p><a href="https://instagram.com/poetrynyx/" target="_blank" rel="noreferrer">View Instagram <ArrowRight aria-hidden="true" /></a></article></div><p className="proof-disclaimer">These are founder and team creator results. They are not Project Monet client campaign results.</p></div></section>

        <section className="about-principles orange-section"><div className="page-shell"><p className="eyebrow">How we work</p><h2>Three ideas guide the agency.</h2><div className="about-principle-grid"><article><span>01</span><h3>Instagram focus</h3><p>We specialise in one platform instead of pretending to be experts everywhere.</p></article><article><span>02</span><h3>Funnel-First thinking</h3><p>We decide who should find the account, why they should follow, what to publish, and what happens after the visit.</p></article><article><span>03</span><h3>Clear attribution</h3><p>Founder results, team results, and client results are different proof categories. We keep them separate.</p></article></div></div></section>

        <section className="editorial-section warm-section"><div className="page-shell editorial-split"><div><p className="eyebrow">Creator-led, business-first</p><h2>What happens after the view matters.</h2></div><div className="prose-large"><p>We care about reach. We also care about profile visits, follows, engagement, DMs, leads, and business actions.</p><p>A Reel with fewer views can be more valuable when the right people see it. Growth is not only knowing what to post. It is also knowing what not to post.</p><Link className="text-link" href="/instagram-management-services">See how Instagram Management works <ArrowRight aria-hidden="true" /></Link></div></div></section>

        <RelatedLinks links={[{ href: "/instagram-marketing-for-founders", label: "Instagram for Founders", copy: "Build authority without pretending to be an influencer." }, { href: "/instagram-management-services", label: "Instagram Management", copy: "See the full connected account system." }, { href: "/instagram-audit", label: "Free Instagram Audit", copy: "Start with a human account review." }]} />
        <PageCta title="Let us show you what we would fix first." />
      </main>
      <SiteFooter />
      <BreadcrumbSchema items={crumbs} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }} />
    </>
  );
}
