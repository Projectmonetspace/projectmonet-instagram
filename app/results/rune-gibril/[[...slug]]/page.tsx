import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import SiteHeader from "@/app/components/site-header";
import { Breadcrumbs, BreadcrumbSchema, PageCta, RelatedLinks, SiteFooter } from "@/app/components/page-framework";
import ResultEvidence from "@/app/components/result-evidence";
import { clientReels, resultArticles, resultBase, resultDate, resultMedia, resultPath } from "@/app/lib/client-results";
import { absoluteUrl, pageMetadata } from "@/app/lib/site";
import { serializeJsonLd } from "@/app/lib/json-ld";

export const dynamicParams = false;
export function generateStaticParams() { return resultArticles.map(article => ({ slug: article.slug ? [article.slug] : [] })); }
type Props = { params: Promise<{ slug?: string[] }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = (await params).slug?.join("/") ?? "";
  const article = resultArticles.find(item => item.slug === slug);
  if (!article) return {};
  const metadata = pageMetadata({ title: `${article.shortTitle}: Rune Gibril | Project Monet`, description: article.description, path: resultPath(slug) });
  return { ...metadata, openGraph: { ...metadata.openGraph, type: "article", publishedTime: resultDate, modifiedTime: resultDate, images: [{ url: `${resultMedia}/DewkGkKvNKt.webp`, width: 640, height: 360, alt: "Mary Oliver first-Reel cover from Rune Gibril" }] }, twitter: { card: "summary_large_image", title: article.title, description: article.description, images: [`${resultMedia}/DewkGkKvNKt.webp`] } };
}

export default async function ResultPage({ params }: Props) {
  const slug = (await params).slug?.join("/") ?? "";
  const article = resultArticles.find(item => item.slug === slug);
  if (!article) notFound();
  const path = resultPath(slug);
  const crumbs = [{ label: "Home", href: "/" }, { label: "Results", href: "/results" }, { label: "Rune Gibril", href: resultBase }, ...(slug ? [{ label: article.shortTitle, href: path }] : [])];
  const schema = { "@context": "https://schema.org", "@type": "Article", headline: article.title, description: article.description, datePublished: resultDate, dateModified: resultDate, mainEntityOfPage: absoluteUrl(path), image: [absoluteUrl(`${resultMedia}/DewkGkKvNKt.webp`)], author: { "@type": "Organization", name: "Project Monet", url: absoluteUrl("/about") }, publisher: { "@type": "Organization", name: "Project Monet", url: absoluteUrl("/") }, about: { "@type": "Thing", name: "Rune Gibril Instagram launch", sameAs: "https://www.instagram.com/runegibril/" } };
  return <>
    <main>
      <header className="result-hero dark-section"><SiteHeader /><div className="page-shell result-hero-inner">
        <Breadcrumbs items={crumbs} /><p className="eyebrow">{article.eyebrow}</p><h1>{article.title}</h1>
        <p className="result-summary">{article.summary}</p>
        <div className="result-byline">By <Link href="/about">Project Monet</Link><span aria-hidden="true"> · </span><time dateTime={resultDate}>Published 31 October 2026</time><span>Early pilot results · 100% organic</span></div>
        <div className="result-hero-stat"><strong>{article.stat}</strong><span>{article.statLabel}</span></div>
      </div></header>
      <div className="result-article warm-section"><div className="article-shell">
        <nav className="result-contents" aria-label="On this page"><p className="eyebrow">In this story</p>{article.sections.map((section, i) => <a key={section.title} href={`#part-${i+1}`}>{String(i+1).padStart(2,"0")} / {section.title}</a>)}</nav>
        <article>{article.sections.map((section, index) => <section className="result-section" id={`part-${index+1}`} key={section.title}>
          <p className="eyebrow">{String(index+1).padStart(2,"0")} / {article.shortTitle}</p><h2>{section.title}</h2>
          <div className="result-prose">{section.paragraphs.map(p => <p key={p}>{p}</p>)}</div>
          {section.bullets ? <ul>{section.bullets.map(p => <li key={p}>{p}</li>)}</ul> : null}
          {section.table ? <div className="comparison-scroll" role="region" aria-label={section.table.caption} tabIndex={0}><table className="resource-comparison"><caption>{section.table.caption}</caption><thead><tr>{section.table.columns.map(c => <th scope="col" key={c}>{c}</th>)}</tr></thead><tbody>{section.table.rows.map(row => <tr key={row[0]}>{row.map((cell, i) => i === 0 ? <th scope="row" key={i}>{cell}</th> : <td key={i}>{cell}</td>)}</tr>)}</tbody></table></div> : null}
          {section.images ? <ResultEvidence ids={section.images} /> : null}
        </section>)}</article>
        <aside className="result-source-links"><p className="eyebrow">Public source Reels</p><ul>{clientReels.filter(reel => !slug || slug === "first-week-growth" || (slug === "trial-reels" ? reel.shortcode === "De65sWRBWzw" : reel.shortcode === "DewkGkKvNKt")).map(reel => <li key={reel.shortcode}><a href={reel.href} target="_blank" rel="noopener noreferrer">{reel.title} ↗</a></li>)}</ul><p>Native screenshots are dated captures. Public Reel links may show newer totals. Viewers, account views and Reel lifetime views have distinct scopes. Zero paid spend is confirmed by Project Monet.</p></aside>
      </div></div>
      <RelatedLinks title={slug ? "Read the rest of the launch" : "Four stories behind the result"} links={resultArticles.filter(item => item.slug !== slug).map(item => ({ href: resultPath(item.slug), label: item.shortTitle, copy: item.title }))} />
      <div className="result-service-link page-shell"><p>Planning your own account? Explore <Link href="/instagram-management-services">Instagram management</Link>, our <Link href="/instagram-reels-agency">Reels work</Link> or the <Link href="/resources/instagram-content-strategy-for-business">content strategy guide</Link>.</p></div>
      <PageCta title="What should your Instagram grow into?" copy="Start with a free audit of your current account. We will review the audience, content and next useful step." />
    </main><SiteFooter /><BreadcrumbSchema items={crumbs} /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(schema) }} />
  </>;
}
