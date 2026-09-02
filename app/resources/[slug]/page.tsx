import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Check } from "lucide-react";
import { BreadcrumbSchema, PageCta, PageHero, RelatedLinks, SiteFooter } from "@/app/components/page-framework";
import { absoluteUrl, pageMetadata } from "@/app/lib/site";
import { getResourceArticle, resourceArticles } from "@/app/lib/resources";

export const dynamicParams = false;

export function generateStaticParams() {
  return resourceArticles.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = getResourceArticle(slug);
  if (!article) return {};
  return pageMetadata({ title: article.seoTitle, description: article.description, path: `/resources/${slug}` });
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getResourceArticle(slug);
  if (!article) notFound();
  const path = `/resources/${article.slug}`;
  const crumbs = [{ label: "Home", href: "/" }, { label: "Resources", href: "/resources" }, { label: article.title, href: path }];
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    datePublished: article.publishedAt ?? "2026-08-29",
    dateModified: article.modifiedAt ?? article.publishedAt ?? "2026-08-29",
    mainEntityOfPage: absoluteUrl(path),
    author: { "@type": "Organization", name: "Project Monet", url: absoluteUrl("/") },
    publisher: { "@type": "Organization", name: "Project Monet", url: absoluteUrl("/") },
  };

  return (
    <>
      <main>
        <PageHero eyebrow={article.eyebrow} title={article.title} intro={article.intro} path={path} currentLabel={article.title}>
          <span className="read-time">{article.readTime}</span>
        </PageHero>

        <article className="resource-article warm-section">
          <div className="article-shell">
            <header className="article-lead"><p className="eyebrow">Project Monet Resources</p><p>This guide explains the subject in plain language. It does not promise a result for every account. Use the ideas with the account, audience, resources, and business goal in mind.</p></header>
            {article.sections.map((section, index) => (
              <section key={section.heading} className="article-section">
                <div className="article-section-heading"><span>{String(index + 1).padStart(2, "0")}</span><h2>{section.heading}</h2></div>
                <div className="article-section-body">
                  {section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                  {section.bullets && <ul>{section.bullets.map((bullet) => <li key={bullet}><Check aria-hidden="true" />{bullet}</li>)}</ul>}
                  {section.callout && <blockquote>{section.callout}</blockquote>}
                </div>
              </section>
            ))}
          </div>
        </article>

        <RelatedLinks title="Continue with a useful next step" links={article.related} />
        <PageCta title="Want a second pair of eyes on the account?" copy="We will review the current Instagram presence and show you the clearest opportunities we see." />
      </main>
      <SiteFooter />
      <BreadcrumbSchema items={crumbs} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
    </>
  );
}
