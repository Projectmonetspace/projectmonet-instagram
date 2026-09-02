import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { BreadcrumbSchema, PageCta, PageHero, SiteFooter } from "@/app/components/page-framework";
import { pageMetadata } from "@/app/lib/site";
import { resourceArticles } from "@/app/lib/resources";

const path = "/resources";
export const metadata = pageMetadata({
  title: "Instagram Marketing Resources | Project Monet",
  description: "Plain-language Instagram marketing resources for businesses: useful virality, reach-to-lead paths, costs, Reels, content strategy, profile optimization, and Instagram SEO.",
  path,
});

export default function Page() {
  const crumbs = [{ label: "Home", href: "/" }, { label: "Resources", href: path }];
  return (
    <>
      <main>
        <PageHero eyebrow="Instagram Marketing Resources" title="Useful Instagram guidance without the filler." intro="Clear guides for founders and businesses that want to understand content, Reels, profile growth, Instagram SEO, leads, and what the work should cost." path={path} currentLabel="Resources" />

        <section className="resource-index-intro warm-section"><div className="page-shell editorial-split"><div><p className="eyebrow">Start with the real question</p><h2>What are you trying to fix?</h2></div><div className="prose-large"><p>These resources explain the decisions behind a useful Instagram presence. They are written for people who do not want to learn marketing jargon before they can improve the account.</p><p>Read one guide. Use what fits. If the account still feels unclear, request a Free Instagram Audit.</p></div></div></section>

        <section className="resource-index dark-section"><div className="page-shell"><p className="eyebrow">Practical guides</p><div className="resource-card-grid">{resourceArticles.map((article, index) => <Link key={article.slug} href={`/resources/${article.slug}`}><span>{String(index + 1).padStart(2, "0")}</span><small>{article.eyebrow}</small><h2>{article.title}</h2><p>{article.description}</p><i>{article.readTime}<ArrowRight aria-hidden="true" /></i></Link>)}</div></div></section>

        <PageCta title="Not sure which guide matches the problem?" copy="We can review the account and show you the clearest opportunity we see." />
      </main>
      <SiteFooter />
      <BreadcrumbSchema items={crumbs} />
    </>
  );
}
