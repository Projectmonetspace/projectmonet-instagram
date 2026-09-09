# Cloudflare migration — preparation

Status: branch preparation only; custom production remains on Vercel.

## Deployment authority

Cloudflare Pages native Git integration with the existing repository.
No GitHub Actions/Wrangler deployment workflow. Existing GitHub CI remains a validation gate.
Account: Project Monet (`6c6b7d434bca0158dff06cc5c3478a02`), confirmed by owner.
Node: 22.16.0 via .node-version.
Build: `npm run build:cloudflare`; output: `out`; repository root: root.
Validate migration/cloudflare-pages before merging to main or onboarding a domain.

The Pages build generates lossless responsive variants from unchanged public originals,
exports Next.js pages with production canonicals, and writes Pages redirects/security headers.
The normal npm run build remains the original Vercel runtime build for rollback.
Existing tests are preserved. CI also validates the static export.

## Baseline and rollback

Repository main and Vercel production SHA: aeec33b368b9918a36bbd9e611ccac885c488625
Vercel project: projectmonet-instagram (`prj_btY2EKs3ubHqTEWH921eVD32FJwH`)
Deployment: dpl_BoDDRRtqihBMkLeQtZXeSx2q1qa4
Rollback URL: https://projectmonet-instagram-49jmxifrz.vercel.app
Canonical: https://www.projectmonet.com
Original www CNAME: 42453a90c2864ee4.vercel-dns-017.com
Original apex A: 216.198.79.1

Do not delete the Vercel project. Before any nameserver change, copy and compare fresh Hostinger DNS,
including the extra hostingermail1._domainkey TXT, three DKIM CNAMEs, MX, SPF, DMARC,
Google verification and autodiscover/autoconfig. Nameserver and DNSSEC changes require their checkpoints.

## Remaining gates

Cloudflare GitHub authorization and Pages preview; rendered preview/navigation/forms/headers/404 tests;
zone onboarding; fresh DNS comparison; DNSSEC/DS inspection; manual nameserver checkpoint;
custom-domain TLS and 308 apex redirect with path/query preservation; production smoke; GSC/GA4.
No gate above is claimed completed by this preparation commit.
