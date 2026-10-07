# ProjectMonet.com — search and conversion decisions

Research date: 7 October 2026. Baseline: `f1d22de24cfd8137d06d4b3996a21ebca8c0fe36`.
Scope: ProjectMonet.com only. Preserve Instagram specialization, brand design, current offers and the recently shipped SaaS page.

## Evidence and limits

- Current Notion pages 17, 40, parent OS, service offer, pricing, delivery workflow, Funnel-First methodology, audit and proof rules inform this pass. September commercial locks and October SaaS additions supersede older drafts.
- GSC, 6 September–3 October: prior aggregate read recorded 24 clicks / 127 impressions. Fresh query/page read shows “project monet” at the homepage (12 clicks / 39 impressions / average position 2.33) and About (2 / 26 / 5.65). Remaining visible queries are ambiguous brand variants; no meaningful service-query evidence. Query-level totals omit anonymized queries and are not aggregate totals. No absence-of-row indexing inference.
- Dedicated .com GA4 property 553150634 returned zero rows for landingPage / sessions / engagedSessions / keyEvents over that period. This does not prove zero visitors or conversions. Measurement observation remains open; no tracking configuration change in this pass.
- Ahrefs Keywords Explorer returned **Insufficient plan**. Volume, KD, CPC and traffic potential are unavailable. Historical public estimates are not reused as current metrics.
- Composio/Exa searches are current directional search-result evidence, not a location-controlled Google rank report. Cluster variants below share intent; not every variant received an individual search. Priorities are editorial judgments, not measured demand scores.

## Query ownership (60 candidate queries, grouped by intent)

| Cluster and candidate queries | Intent / priority | Owner | Decision and cannibalization control |
|---|---|---|---|
| Instagram marketing agency; Instagram marketing company; Instagram growth agency; organic Instagram growth agency; Instagram agency | Hire / high | `/` | Keep category ownership. Explain useful growth without follower guarantees. No duplicate growth-agency URL. |
| Instagram management services; Instagram management agency; hire Instagram manager; Instagram manager for business; Instagram account management | Hire / highest | `/instagram-management-services` | Expand operating responsibility, approvals and first-cycle details. |
| Instagram content creation services; Instagram content agency; Instagram content creation agency; Instagram scripts service; Instagram carousel creation | Hire / high | `/instagram-content-creation-services` | Clarify brief, inputs and handoff. Content-only scope stays subject to fit; no invented package. |
| Instagram Reels agency; Instagram Reels marketing agency; Instagram Reel production; Reels content agency; Reels editing agency | Hire / high | `/instagram-reels-agency` | Explain production routes, client footage, formats and series decisions. |
| founder personal branding; Instagram personal branding for founders; founder-led content agency; Instagram marketing for founders; founder branding agency | Hire / highest fit | `/instagram-marketing-for-founders` | Expand the existing page. Keep Instagram-specific scope; no generic personal-branding page. |
| Instagram manager cost; Instagram management cost; Instagram management pricing; Instagram agency pricing; Instagram marketing agency cost | Evaluate / highest | `/resources/instagram-marketing-cost` | Expand one existing cost guide, including quote comparison and actual PM offer table. No fabricated market averages. |
| Instagram manager vs agency; social media freelancer vs agency; Instagram agency vs in-house; content creator vs social media manager; Reels editor vs Reels agency | Evaluate / high | `/resources/instagram-manager-vs-agency` | New comparison guide; compare responsibilities, not stereotypes. |
| how to choose an Instagram agency; questions to ask Instagram agency; Instagram growth agency red flags; should I hire an Instagram manager; what Instagram management should include | Evaluate / high | `/resources/how-to-choose-an-instagram-agency` | New hiring checklist with useful questions, evidence checks and a copyable brief. Cost guide owns price; comparison guide owns provider model. |
| Instagram audit; Instagram audit service; Instagram marketing audit; free Instagram audit; human Instagram audit | Diagnose / high funnel fit | `/instagram-audit` | Strengthen human-review wording and boundaries. No instant scoring tool. |
| Instagram SEO services; Instagram profile SEO; Instagram discoverability; Instagram profile optimization service; Instagram SEO agency | Hire / supporting | `/instagram-seo-services` | Keep as supporting capability with distinct profile/discovery workflow; no Google-ranking promise. |
| why Instagram is not growing; Instagram reach not converting; why Instagram is not generating leads; how to get leads from Instagram; Instagram profile not converting | Diagnose / medium | Existing growth, leads and profile resources | Keep current owners; new resources link into them. Do not split near-duplicates. |
| Instagram marketing for B2B SaaS; Instagram marketing for AI SaaS; founder account vs company account SaaS; Instagram marketing for small business; Instagram Reels for small business | Audience / high fit | Existing SaaS, small-business and small-business Reels pages | Retain current pages. SaaS dual-account decision is already covered; no overlapping SaaS resources yet. |

## Search-result evidence

Queries inspected: agency/organic growth; founder-led personal branding; hire-manager cost/provider comparisons; Reels/content production; human/automated audit; personal branding for founders; agency-selection questions.

- Organic-growth results mix managed content with follower-acquisition services: [Virallized](https://www.virallized.com/), [Social Muse](https://socialmuse.co/), [Egochi](https://www.egochi.com/instagram-marketing-company/). Opportunity: state what growth means and what the agency takes responsibility for. Do not infer these providers' results are independently verified.
- Founder category includes [Flixtar](https://flixtar.co/content-growth/founder-personal-branding), [Lykos](https://lykosagency.com/services/personal-branding), [Menno Kater](https://mennokater.nl/personal-branding-agency-for-founders). Clear founder-intent positioning supports improving the current founder page, not broadening beyond Instagram.
- [Orcalynx](https://www.orcalynx.com/) has a directly inspected service, comparison and substantial tools/resources presentation. Its published performance numbers are self-reported, not evidence for Project Monet. Useful gap: make PM delivery decisions and proof attribution concrete. Do not copy proprietary resources or simulated algorithm claims.
- [Montaz](https://montazmedias.in/instagram-growth-agency) direct fetch timed out. Earlier research is a hypothesis, not newly verified competitor evidence.
- Cost/provider results include [SocialSellinator](https://socialsellinator.com/instagram-manager-price/), [Site Altitude](https://sitealtitude.com/instagram-accounts-manager/), and [Setup](https://setup.am/smm-manager-freelancer-or-agency/). Scope and responsibility can answer the comparison without unsupported global averages.
- Hiring results include [EmberTribe](https://embertribe.com/blog/instagram-marketing-agency), [EDST](https://edst.com/blog/instagram-growth-agency-checklist), [BrightBrain](https://www.brightbraintech.com/blog/how-to-choose-instagram-marketing-agency/). Some lean into paid-media systems. PM's useful distinction is organic Instagram scope, evidence quality, creative inputs and approval ownership.
- Reels results include [UberBrains](https://www.uberbrains.com/instagram-reels-creative-agency/), [Studio502](https://studio502.ae/reels-production-dubai.html), [Buzzer Beater Media](https://buzzerbeatermedia.com/short-form-video-agency). Address filming and production responsibilities explicitly.
- Audit results include [Virallized's automated tool](https://www.virallized.com/instagram-audit) and [Tamara Hammad's audit](https://www.tamarahammad.com/instagram-audit/). Keep human strategic review distinct from an instant score.

## Implementation decisions

Two new buyer resources; improve four service pages, founder page, audit page and existing cost guide. Keep homepage hero, design, offer cards and creator rail. Add small contextual buyer links and useful-growth/fit explanation. Resource template gains accessible comparison tables and visible publication/update dates matching Article schema. Sitemap dates change only for changed routes. No redirects or consolidation are justified. No analytics, form payload, hosting or commercial-term change.

Creator proof remains founder/team proof; approved client outcome data is unavailable. Do not invent content autopsies from view counts without the original creative and analytics. The hiring guide's reusable brief/checklist provides a useful asset without adding a maintained tool.

Google guidance: [people-first content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content), [AI features](https://developers.google.com/search/docs/appearance/ai-features). Preserve crawlable text, clear entities, accurate schema and internal links. No special AI schema, rankings promise or FAQ rich-result claim. Existing llms.txt is maintained as a route directory, not described as a ranking requirement.

## Deferred and monitoring

No generic news, hashtags, city doorway pages, follower-selling terms, generic full-service personal branding, client case studies, invented benchmarks or interactive calculators. Preserve the new SaaS page and collect real buyer questions before expanding it.

Compare the next 28-day GSC windows for non-brand impressions, page/query ownership, pricing/comparison entrances and audit enquiries. Check index/canonical status after normal crawl delay. Investigate empty GA4 reports separately before using them to judge conversion. Accumulate permission-safe client outcomes and original creator analytics for later case studies. No SEO ranking or lead uplift is claimed at deployment.
