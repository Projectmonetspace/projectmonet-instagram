import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BreadcrumbSchema, PageCta, PageHero, SiteFooter } from "@/app/components/page-framework";
import { pageMetadata } from "@/app/lib/site";
import { resultArticles, resultPath } from "@/app/lib/client-results";
import ResultEvidence from "@/app/components/result-evidence";

export const metadata = pageMetadata({ title: "Instagram Client Results & Case Studies | Project Monet", description: "Explore Project Monet's Instagram results: Rune Gibril's organic launch, dated screenshots and four stories behind the strategy, first Reel and growth.", path: "/results" });
export default function ResultsPage() {
  return <><main>
    <PageHero eyebrow="Results / Evidence / Process" title="The work. The numbers. The story behind them." intro="Explore managed client results with dated evidence, then the creator experience behind Project Monet. Different accounts, clearly attributed." path="/results" currentLabel="Results" showPrimary={false} />
    <section className="results-index warm-section"><div className="page-shell">
      <p className="eyebrow">Managed client / 001</p><div className="results-feature"><div><h2>Rune Gibril</h2><p>A new literary identity, built before a planned 2028 book release. One follower at the start. 3.15M account views and 1,575 followers in the 31 October snapshot.</p><p>100% organic. Zero ad spend. An ongoing pilot, with the evidence and reporting windows kept visible.</p><Link className="button button-ink" href="/results/rune-gibril">Read the full case study <ArrowRight aria-hidden="true" /></Link></div><ResultEvidence ids={["dashboard"]} /></div>
      <div className="result-story-grid">{resultArticles.filter(a => a.slug).map((article,index) => <Link key={article.slug} href={resultPath(article.slug)}><span className="eyebrow">{String(index+1).padStart(2,"0")} / {article.eyebrow}</span><h3>{article.title}</h3><p>{article.description}</p><ArrowRight aria-hidden="true" /></Link>)}</div>
    </div></section>
    <section className="results-creator dark-section"><div className="page-shell"><p className="eyebrow">Founder & co-founder / creator experience</p><h2>Built by people who built audiences.</h2><p>Mayank’s @sl6dl7 has 100M+ views across its top 20 posts. Co-founder creator account @poetrynyx has 200M+ views. These are creator-account results, separate from managed client outcomes.</p><Link className="text-link" href="/#results">View the creator Reel collection <ArrowRight aria-hidden="true" /></Link><p className="proof-disclosure">Creator proof and client case studies show different experience. Neither promises the same outcome for every account.</p></div></section>
    <PageCta />
  </main><SiteFooter /><BreadcrumbSchema items={[{ label: "Home", href: "/" }, { label: "Results", href: "/results" }]} /></>;
}
