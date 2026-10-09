# ProjectMonet.com security, repository and brand audit — 9 October 2026

## Scope and evidence

Baseline: `Projectmonetspace/projectmonet-instagram` main `f5b982d1551b9b33cc9409135e78b8ebe880c463`. Inspected all 102 tracked files, application routes/components, forms, analytics/attribution, metadata/schema, public assets, package lock, CI, static export and deployment configuration. Current tree was retrieved with Composio GitHub and verified against Git blob hashes. All external account operations used Composio.

Operational documentation read: Composio MCP Routing/Integration Guide; ProjectMonet.com OS; Production Website Record; Brand System; Interface Branding Canonical; Technical Requirements; SEO Page 17; Continuity Page 10. Later native Cloudflare Git deployment records supersede historical Vercel instructions. Vercel remains an untouched rollback. Official Google favicon guidance, Next.js 16.4 bundled JSON-LD/CSP/static export/icon documentation, and OWASP CSP guidance informed the changes.

This is a source/configuration and non-destructive public-surface audit, not a penetration-test certification. No credential guessing, exploit traffic, real lead submissions or third-party account changes were performed.

## Findings and fixes

| Finding | Evidence / disposition |
| --- | --- |
| Inconsistent logo | Header used black X on orange; user supplied orange X on black. The supplied source exactly matched an unused variant. All shared headers, favicon/app icons and Organization logo now derive from the retained exact source. See brand-assets.md. |
| JSON-LD defense in depth | 18 inline schema renderings used plain JSON.stringify. Current inputs are repository-authored, so no attacker-controlled XSS was demonstrated. Shared serializer now escapes `<`; malicious script-closing input and round-trip behavior are tested. |
| CSP unnecessary capabilities | Tightened base-uri to none; added frame-src none and script-src-attr none. Existing allowlists, forms and consent-gated Google tags retained. Static Next hydration still requires inline script elements; removing unsafe-inline without a validated hash strategy would break the export. |
| CI supply chain | Pinned checkout/setup-node v4 to verified immutable commits; disabled checkout credential persistence; set a 15-minute verification timeout. Existing read-only workflow permission retained. |
| Next lint mismatch | eslint-config-next and its plugin aligned from 16.3.4 to installed Next 16.4.0. No framework/runtime upgrade. |
| Development dependency advisory | Full npm audit reports five high entries stemming from one braces stack-exhaustion advisory GHSA-vfj7-8cjw-p6xm, through eslint-config-next → eslint plugin → fast-glob → micromatch → braces. Registry latest braces 3.0.3 has no patched version. Maintainer-controlled build globs only; not shipped in the static application. Do not accept npm's suggested incompatible framework lint downgrade. Monitor upstream fix. |
| Repository controls | GitHub reports secret scanning and push protection enabled, main unprotected, automatic Dependabot security updates disabled. Recommend required green CI/review rules and Dependabot configuration. Not changed as part of brand release; stale branches were not deleted without merge/reachability proof. |
| Stale docs / wasted output | Corrected README, environment example and deployment guide. Removed three unreferenced public logo variants; retained exact approved source outside public. Responsive conversion now targets only the Reel rail images, avoiding unused favicon/hero variants. Original media preserved byte-for-byte. |

## Checks without demonstrated vulnerabilities

- Current tracked-source secret-pattern scan found no private keys, GitHub tokens, AWS access keys or accidental secret assignments. The Web3Forms access key and approved GA measurement ID are intentionally public client identifiers, not private credentials. Git history and secret-alert inventory were not exhaustively scanned.
- Static site has no server handlers, authentication/database, privileged client environment variables, or dynamic remote HTML/CMS rendering. Schema content is authored in repository. No unsafe external redirect input or mixed-content references found in source.
- Form validation covers bounded strings, email, phone/Instagram normalization, choices, consent and honeypot. Attribution strips query/hash from stored URLs and bounds UTM values. Client validation cannot enforce provider-side abuse protection. Web3Forms account restrictions/rate limits and actual delivery remain unverified.
- Consent gates GA loading/events; submitted form answers are not analytics event properties. No unrelated embeds or third-party scripts added.
- Live baseline homepage returned HTTPS 200 through Cloudflare, HSTS max-age 63072000, DENY framing, nosniff, referrer/permissions policies and expected CSP. HTML revalidates; hashed Next assets are immutable. No private routes are intentionally served. Public deployment.json only exposes a commit identifier, not a credential.
- Preserve all 28 canonical sitemap pages, robots indexability, metadata, structured data semantics, route redirects, internal links, approved proof media, analytics identifiers and offers.

## Validation and release evidence

Local lint, TypeScript, 55 unit tests and normal Next production build passed. Production npm audit: zero vulnerabilities. Full development audit: five high entries from the one unresolved advisory above. The Cloudflare export, desktop/mobile browser checks, preview and production release evidence are recorded in the PR and Notion after completion; do not interpret this file as proof of deployment.

## Limits and follow-up

The documented Composio Cloudflare MCP connection initially returned 401, then no active connection. Account-level WAF/TLS settings, preview access policy and provider deployment metadata could not be independently audited through that connection. Do not substitute another Cloudflare account. Native Git remains the deployment authority, with GitHub checks and public exact-commit artifact checks used where available.

Review branch protection and automatic dependency security updates; resolve the lint-chain advisory when upstream publishes a compatible fix; verify Web3Forms anti-abuse controls and delivery in its account; restore the documented Cloudflare connection to finish account-level inspection. Strict hash-based CSP is a separate compatibility-tested project. Public preview visibility is not confidentiality protection; robots/noindex alone does not restrict access. No stale branch deletion, speculative CSS pruning, broad package churn, media recompression, SEO copy rewrite or unrelated infrastructure change was made.

References: https://nextjs.org/docs/app/guides/json-ld ; https://nextjs.org/docs/app/guides/content-security-policy ; https://cheatsheetseries.owasp.org/cheatsheets/Content_Security_Policy_Cheat_Sheet.html ; https://developers.google.com/search/docs/appearance/favicon-in-search ; https://github.com/advisories/GHSA-vfj7-8cjw-p6xm
