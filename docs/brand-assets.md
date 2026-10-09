# Canonical website brand assets

As approved by the user on 8–9 October 2026, the second uploaded image (`Project-Monet-Avatar-Black-Orange-1024(2).png`) is the canonical ProjectMonet.com mark: orange rounded X on Ink black. It was byte-identical to the previously unused black/orange variant. The header had used the inverse orange-background variant.

Original: `assets/brand/project-monet-source.png`, SHA-256 `e1991e36a31ae0531d0a7c95da5364218e77e637c2372ab3b42436fe5d05bc30`.

Run `npm run assets:brand`. The deterministic generator verifies the original hash, removes excess empty canvas with a centered 640px crop, and resizes without redrawing or distorting the mark. Black remains intentional for contrast. These icons do not advertise maskable support.

Outputs: 512px `/brand/project-monet-logo.png`; SVG with embedded faithful PNG; ICO with 16/32/48px images; 16/32/48/96px PNG favicons; 180px Apple touch icon; 192/512px Android icons. The shared BrandMark component updates the header in the homepage hero and all other site headers. The text lockup remains. Organization schema points to the canonical logo. The photographic hero and OG poster do not contain the old mark and remain unchanged.

Retired unreferenced variants: `favicon-black-orange.png`, `favicon-orange-black.png`, `favicon-offwhite-black.png`. Source original remains outside public. Existing standard favicon/app-icon URLs remain stable. Google and browsers can cache icons beyond a deploy; recrawl can take days or weeks.

Guidance: https://developers.google.com/search/docs/appearance/favicon-in-search
