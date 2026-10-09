import { readFile, writeFile, mkdir } from "node:fs/promises";
import { createHash } from "node:crypto";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const sharp = require("sharp");
const source = await readFile("assets/brand/project-monet-source.png");
const expected = "e1991e36a31ae0531d0a7c95da5364218e77e637c2372ab3b42436fe5d05bc30";
if (createHash("sha256").update(source).digest("hex") !== expected) {
  throw new Error("Canonical logo source changed. Review the approved source before regenerating.");
}

// Remove only empty background. Preserve every pixel of the mark, its colours and ratio.
// The centered 640px canvas gives tiny icons enough visual weight without clipping.
const canvas = await sharp(source).extract({ left: 192, top: 192, width: 640, height: 640 }).png().toBuffer();
const png = (size) => sharp(canvas).resize(size, size, { kernel: "lanczos3" }).png({ compressionLevel: 9 }).toBuffer();
await mkdir("public/brand", { recursive: true });
const outputs = [
  ["brand/project-monet-logo.png", 512],
  ["favicon-16x16.png", 16], ["favicon-32x32.png", 32],
  ["favicon-48x48.png", 48], ["favicon-96x96.png", 96],
  ["apple-touch-icon.png", 180],
  ["android-chrome-192x192.png", 192], ["android-chrome-512x512.png", 512],
];
for (const [file, size] of outputs) await writeFile(`public/${file}`, await png(size));

// PNG-backed ICO entries are supported by modern browsers and preserve the source pixels.
const sizes = [16, 32, 48];
const entries = await Promise.all(sizes.map(png));
const header = Buffer.alloc(6 + 16 * entries.length);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(entries.length, 4);
let offset = header.length;
entries.forEach((entry, index) => {
  const start = 6 + index * 16;
  header[start] = sizes[index];
  header[start + 1] = sizes[index];
  header.writeUInt16LE(1, start + 4);
  header.writeUInt16LE(32, start + 6);
  header.writeUInt32LE(entry.length, start + 8);
  header.writeUInt32LE(offset, start + 12);
  offset += entry.length;
});
await writeFile("public/favicon.ico", Buffer.concat([header, ...entries]));

// The supplied raster is embedded faithfully; no tracing or invented vector geometry.
const embedded = (await png(512)).toString("base64");
await writeFile("public/favicon.svg", `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512"><image width="512" height="512" href="data:image/png;base64,${embedded}"/></svg>\n`);
console.log("Generated canonical logo, PNG/SVG/ICO favicons and app icons.");
