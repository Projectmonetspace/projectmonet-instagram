# ProjectMonet.com

Project Monet’s Instagram-first website, built with Next.js and deployed as a static export on Cloudflare Pages through native Git integration.

## Development and verification

Use the Node version in `.node-version`, then run `npm ci`, `npm run lint`, `npm run typecheck`, `npm test`, and `npm run build`. Production artifacts use `npm run build:cloudflare`, which also verifies the export. `npm run audit:production` checks shipped dependencies.

## Brand and deployment

The user-approved orange mark on black is retained in `assets/brand/project-monet-source.png`. Run `npm run assets:brand` to regenerate all website/favicon/app-icon derivatives faithfully. See [brand assets](docs/brand-assets.md), [deployment workflow](docs/cloudflare-migration.md), and [October audit](docs/security-audit-2026-10-09.md).
