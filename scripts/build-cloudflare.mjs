import { readdir, mkdir, readFile, writeFile, rm } from "node:fs/promises";
import path from "node:path";
import { createRequire } from "node:module";
import { spawnSync } from "node:child_process";
import { securityHeaders } from "../security-headers.mjs";

const require = createRequire(import.meta.url);
// Use the image engine already pinned by Next.js and the repository lockfile.
const sharp = require("sharp");
const { imageConfigDefault } = require("next/dist/shared/lib/image-config.js");
const widths = [...new Set([...imageConfigDefault.deviceSizes, ...imageConfigDefault.imageSizes])];
const root = process.cwd();
const generated = path.join(root, "public", "__images");
await rm(generated, { recursive: true, force: true });
async function images(dir) {
  const result = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    if (entry.name === "__images") continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) result.push(...await images(full));
    else if (/\.(png|jpe?g|webp|avif)$/i.test(entry.name)) result.push(full);
  }
  return result;
}
let variants = 0;
for (const source of await images(path.join(root, "public"))) {
  const destination = path.join(generated, path.relative(path.join(root, "public"), source));
  await mkdir(destination, { recursive: true });
  for (const width of widths) {
    await sharp(source).rotate().resize({ width, withoutEnlargement: true })
      .webp({ lossless: true, effort: 4 }).toFile(path.join(destination, "w" + width + ".webp"));
    variants++;
  }
}
console.log("Generated", variants, "lossless responsive image variants; originals are unchanged.");
const build = spawnSync(process.execPath, [require.resolve("next/dist/bin/next"), "build"], {
  stdio: "inherit", env: { ...process.env, PM_STATIC_EXPORT: "1" },
});
if (build.status !== 0) process.exit(build.status ?? 1);

const redirects = [
  "/resources/instagram-marketing-cost-india /resources/instagram-marketing-cost 308",
  "/resources/instagram-reels-for-small-business-india /resources/instagram-reels-for-small-business 308",
].join("\n") + "\n";
const headers = "/*\n" + securityHeaders.map(({ key, value }) => "  " + key + ": " + value).join("\n") +
  "\n\n/media/*\n  Cache-Control: public, max-age=31536000, immutable\n" +
  "\n/_next/static/*\n  Cache-Control: public, max-age=31536000, immutable\n" +
  "\n/__images/*\n  Cache-Control: public, max-age=0, must-revalidate\n";
await writeFile("out/_redirects", redirects);
await writeFile("out/_headers", headers);
await writeFile("out/deployment.json", JSON.stringify({
  commit: process.env.CF_PAGES_COMMIT_SHA || process.env.GITHUB_SHA || null,
  platform: "cloudflare-pages", artifact: "static-export",
}) + "\n");
// Keep the export's 404.html: Pages must not fall back to SPA routing.
await readFile("out/404.html");
const verify = spawnSync(process.execPath, ["scripts/verify-export.mjs"], { stdio: "inherit" });
process.exit(verify.status ?? 1);
