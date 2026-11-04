# ProjectMonet.com indexing and commercial-link audit — 4 November 2026

Scope: ProjectMonet.com only. Baseline production/main: `105e017735743aa94b435070bf22a58042a190e4` (PR #39). Cloudflare Pages deployment `03556178-4de9-4d3b-97eb-7b8019a3adfb` succeeded for that SHA. All external account access used Composio. No site redesign, new articles, URL changes, pricing changes, case-study metric changes, form changes or infrastructure changes.

## Diagnosis and indexing

Property: `sc-domain:projectmonet.com`, verified siteOwner. Inspection date: 4 November 2026. These are Google's stored index reports, not a live Googlebot fetch. No crawl time, fetch verdict or Google-selected canonical is available for the ten pending URLs; unspecified fields must not be interpreted as a crawl failure.

All ten are now **Discovered — currently not indexed**, with the canonical sitemap listed. This supersedes the earlier same-session summary of five discovered/five unknown. The November 3 baseline supplied by the owner had seven discovered and three unknown. No code change caused this observed status movement; it preceded this release.

| URL path | November 3 baseline | November 4 inspection | Diagnosis / action |
|---|---|---|---|
| `/instagram-management-services` | Discovered, not indexed | Discovered, not indexed | No observed crawl blocker; add relevant client proof link |
| `/instagram-marketing-for-founders` | Discovered, not indexed | Discovered, not indexed | No observed crawl blocker; add preparation example with literary-account scope |
| `/instagram-content-creation-services` | Discovered, not indexed | Discovered, not indexed | No observed crawl blocker; add preparation case-study link |
| `/instagram-marketing-for-small-business` | Discovered, not indexed | Discovered, not indexed | No observed crawl blocker; add scoped first-week audience-growth link |
| `/instagram-audit` | Discovered, not indexed | Discovered, not indexed | Existing crawlable links and distinct human-audit intent; unchanged |
| `/resources/instagram-marketing-cost` | Discovered, not indexed | Discovered, not indexed | Existing pricing/comparison links and distinct intent; unchanged |
| `/resources/instagram-seo-guide` | Discovered, not indexed | Discovered, not indexed | Educational intent distinct from service page; unchanged |
| `/instagram-seo-services` | Unknown | Discovered, not indexed | Sitemap discovery now reported; unchanged |
| `/resources/instagram-profile-optimization` | Unknown | Discovered, not indexed | Sitemap discovery now reported; unchanged |
| `/resources/why-instagram-is-not-growing` | Unknown | Discovered, not indexed | Sitemap discovery now reported; unchanged |

The six inspected results URLs remain Submitted and indexed, with successful mobile crawls on November 3, indexability allowed, and matching user/Google canonicals:

- `/results`
- `/results/rune-gibril`
- `/results/rune-gibril/first-reel`
- `/results/rune-gibril/strategy-before-posting`
- `/results/rune-gibril/first-week-growth`
- `/results/rune-gibril/trial-reels`

This targeted 16-URL check is not a fresh site-wide indexed count. It found no crawled-but-not-indexed, unknown or technical-failure verdict among those 16. Indexing remains Google's decision; no indexing recovery or ranking uplift is claimed.

## Technical and content findings

- The pre-change canonical-host crawl covered all 37 sitemap URLs: all returned HTTP 200, self-canonicals and index/follow. Public HTML contains substantive text and crawlable links; the priority pages are not dependent on client JavaScript for their copy or navigation.
- The ten priority pages have existing inbound links. Commercial routes are exposed by the shared navigation and homepage; supporting guides are reachable through the Resources index and relevant content. They are not orphan pages.
- No observed erroneous canonical, accidental noindex, broken internal page target or robots exclusion explains the pending statuses. Sitemap/robots use the canonical HTTPS www host. Do not weaken CSP, consent or CDN protections to address an unproven cause.
- Service pages distinguish management responsibility, production, Reels, discovery, founder content and small-business needs. The guide pages serve educational/diagnostic intent. Shared templates and CTAs alone do not establish harmful duplication. Current evidence does not justify rewriting or consolidating them.
- Existing results-to-service and conversion links complete the return journey. B2B SaaS remains linked to the Results hub through shared navigation; no literary outcome is repackaged as SaaS sales evidence. Audit and buyer guides retain their existing intent and conversion paths.
- The homepage Client Results rail and all six published results pages are unchanged. Only approved October public evidence is linked; private identity, private accounts and newer client reporting are excluded.

## Changes

Six links added to existing related-page sections, without adding a new shared component or promotional section:

| Source | Destination | Context |
|---|---|---|
| Management | `/results/rune-gibril` | Literary account strategy and organic audience growth; reach is not sales evidence |
| Content Creation | `/results/rune-gibril/strategy-before-posting` | Audience, tone and profile preparation |
| Reels Agency | `/results/rune-gibril/first-reel` | Dated first-Reel reach/followers; future results vary |
| Founders | `/results/rune-gibril/strategy-before-posting` | Audience before a future book; not evidence of founder sales |
| Small Business | `/results/rune-gibril/first-week-growth` | Literary audience development; not business revenue |
| Viral Mandate | `/results/rune-gibril/trial-reels` | Pilot testing example; not a Viral Mandate guarantee or sales result |

Affected files: `app/{instagram-management-services,instagram-content-creation-services,instagram-reels-agency,instagram-marketing-for-founders,instagram-marketing-for-small-business,viral-mandate}/page.tsx` and `app/lib/routes.ts`.

The route registry now dates those six substantive internal-link additions November 4. It also corrects Privacy, Cookies and Audit Terms sitemap dates from August 29 to October 25, matching their visible revision dates and PR #36. Legal body copy and Terms' date are untouched. This is a confirmed date inconsistency, not evidence of the cause of commercial-page non-indexing.

Sitemap before release: 37 submitted URLs; 0 errors; 0 warnings; not pending; last downloaded November 2. The deprecated indexed-count field is zero even though six inspected results pages are indexed, so it is not used as an indexed-page count. No URL additions/removals are needed. Keep normal sitemap discovery; repeated submissions are not an indexing strategy.

## Search performance and interpretation

The November 3 ZIP reconciles to finalized live data: 59 clicks / 466 impressions through November 1. A query requested through November 3 still returned finalized dates only through November 1. The 90-day request has observations from August 29 onward, not a full 90 days of activity.

| Window | Clicks | Impressions | CTR | Average position |
|---|---:|---:|---:|---:|
| Oct 26–Nov 1 | 8 | 90 | 8.89% | 21.27 |
| Oct 19–25 | 6 | 139 | 4.32% | 9.94 |
| Oct 5–Nov 1 | 30 | 307 | 9.77% | 14.23 |
| Sep 7–Oct 4 | 22 | 123 | 17.89% | 8.60 |
| Available Aug 29–Nov 1 | 59 | 466 | 12.66% | 12.42 |

Period totals are summed from property-level daily rows; average position is impression-weighted. Page-level impression totals can overlap and are not added to property totals.

- `project monet`: 40 clicks / 103 impressions over the available period; 23 / 52 in the last 28 days. All reported query clicks are on that exact brand query. The remaining 19 property-level clicks are not fully attributable; do not label them non-branded. Other Monet variants may be ambiguous.
- Relevant non-brand observations: `instagram content strategy` 14 impressions at position 80.5; `content strategy instagram` 3 at 89; `instagram reels agency` 3 at 10; `instagram reel production agency` 3 at 9.33. All have zero reported clicks and insufficient volume for a confident new-content decision.
- Reels Agency: 97 impressions / 0 clicks, including the prior-audit 89-impression October 24–25 spike. Fresh query inspection of those two days shows mostly one-off phrases such as “act instagram reel” and “action instagram reel”. Preserve hiring intent; do not rewrite for those phrases.
- Last-28-day page impressions: homepage 162, About 64, Reels Agency 97, content strategy guide 19. Management/Founders each have two impressions; provider-comparison guides have one or two. Positions 5–20 on tiny samples are not established opportunities.
- No results URL appears in the returned finalized page report. The six were published October 31 and are indexed; the short observation window is insufficient to judge their search performance.

| Country | Available clicks / impressions | Last-28-day clicks / impressions |
|---|---:|---:|
| US | 3 / 163 | 2 / 125 |
| UK | 2 / 20 | 2 / 17 |
| Canada | 1 / 17 | 1 / 11 |
| UAE | 1 / 3 | 0 / 1 |
| India | 42 / 119 | 19 / 61 |

These country totals are not qualified leads or proven non-brand demand. No geographic landing pages or speculative new articles are justified. Retain existing query owners and collect more relevant observations.

## Validation and release procedure

Local ESLint, TypeScript, all 60 existing tests, normal production build, Cloudflare build/export validation, and production dependency audit passed (zero vulnerabilities). The export verifies 37 canonical pages and 530 files with original media unchanged. Full diff reviewed: no new client-side logic, dependency changes, shared layout edits, form payload edits or analytics edits.

Desktop preview/live verification and final deployment identity are recorded in the PR and Notion production record after the release. The local browser binary download was unavailable in this runtime, so do not interpret static responsive checks as a completed mobile browser test. No real prospect submission or meeting booking is required for this change.

Release through a focused PR, passing exact-head CI, then native Cloudflare Pages Git deployment. Verify `/deployment.json` against the merged SHA and recrawl the canonical host. Rollback if needed: revert this PR and let the same native Git pipeline deploy; do not create a second deployment authority. Baseline rollback reference is `105e017735743aa94b435070bf22a58042a190e4`.

## Owner action and observation dates

Composio exposes stored URL Inspection and sitemap operations, not the standard UI Request Indexing action or Test Live URL. The ordinary marketing pages are not eligible for the specialized Indexing API workaround.

In the `projectmonet.com` Search Console property, inspect each exact URL, choose **Test Live URL**, and, if eligible, **Request Indexing** once. Prioritize:

1. https://www.projectmonet.com/instagram-management-services
2. https://www.projectmonet.com/instagram-marketing-for-founders
3. https://www.projectmonet.com/instagram-audit
4. https://www.projectmonet.com/instagram-content-creation-services
5. https://www.projectmonet.com/instagram-marketing-for-small-business
6. https://www.projectmonet.com/resources/instagram-marketing-cost

Then inspect the remaining four pending supporting URLs in the table. No indexing request is claimed as performed. Inspect again around **11 November**; review non-brand, target-country and results-page performance around **25 November–2 December**, using finalized dates. These are recommended observation dates, not a newly created automation.

Primary guidance: [Google recrawl requests](https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl), [URL Inspection API limits](https://developers.google.com/webmaster-tools/v1/urlInspection.index/inspect), [sitemap dates](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap), [crawlable links](https://developers.google.com/search/docs/crawling-indexing/links-crawlable).
