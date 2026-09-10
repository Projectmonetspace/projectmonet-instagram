import assert from "node:assert/strict";
import { readFile, readdir, stat } from "node:fs/promises";
import path from "node:path";
import { securityHeaders } from "../security-headers.mjs";

const origin = "https://www.projectmonet.com";
const sitemap = await readFile("out/sitemap.xml", "utf8");
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
assert.ok(urls.length > 0, "Sitemap is empty");
assert.equal(new Set(urls).size, urls.length, "Duplicate sitemap URLs");
for (const url of urls) {
  assert.ok(url === origin || url.startsWith(origin + "/"), "Wrong sitemap origin: " + url);
  const route = new URL(url).pathname;
  const file = route === "/" ? "out/index.html" : "out" + route + ".html";
  const html = await readFile(file, "utf8");
  assert.equal((html.match(/<h1(?:\s|>)/g) || []).length, 1, "H1 count: " + route);
  assert.ok(html.includes('rel="canonical" href="' + url + '"'), "Canonical: " + route);
  assert.ok(/<title>[^<]+<\/title>/.test(html), "Title: " + route);
  assert.ok(html.includes('name="description"'), "Description: " + route);
  assert.ok(html.includes('application/ld+json'), "Schema: " + route);
  assert.ok(!/name="robots"[^>]*noindex/.test(html), "Unexpected noindex: " + route);
  assert.ok(!html.includes("/_next/image?"), "Runtime image optimizer: " + route);
  for (const match of html.matchAll(/(?:src|href)="([^"]+)"/g)) {
    const asset = match[1].replaceAll("&amp;", "&");
    if (asset.startsWith("/__images/") || asset.startsWith("/_next/static/")) {
      await stat(path.join("out", decodeURIComponent(asset.split("?")[0])));
    }
  }
}
assert.ok((await readFile("out/robots.txt", "utf8")).includes(origin + "/sitemap.xml"));
const notFound = await readFile("out/404.html", "utf8");
assert.ok(notFound.includes("noindex"), "404 must stay noindex");
const headers = await readFile("out/_headers", "utf8");
for (const { key, value } of securityHeaders) {
  assert.ok(headers.includes(key + ": " + value), "Missing security header: " + key);
  assert.ok((key + ": " + value).length < 2000, "Pages header exceeds limit");
}
const redirects = await readFile("out/_redirects", "utf8");
for (const slug of ["instagram-marketing-cost", "instagram-reels-for-small-business"]) {
  assert.ok(redirects.includes("/resources/" + slug + "-india /resources/" + slug + " 308"));
}
async function allFiles(dir) {
  const result = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) result.push(...await allFiles(file));
    else result.push(file);
  }
  return result;
}
const files = await allFiles("out");
assert.ok(files.length <= 20000, "Pages Free file limit exceeded");
for (const file of files) assert.ok((await stat(file)).size <= 25 * 1024 * 1024, "Pages asset too large: " + file);
for (const file of await allFiles("public/media")) {
  const exported = path.join("out", path.relative("public", file));
  assert.deepEqual(await readFile(exported), await readFile(file), "Original media changed: " + file);
}
console.log("Static export verified:", urls.length, "canonical pages;", files.length, "files; original media unchanged.");
