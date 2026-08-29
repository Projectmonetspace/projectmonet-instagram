import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const source = readFileSync(new URL("../security-headers.mjs", import.meta.url), "utf8");

test("security headers retain the approved hardening baseline", () => {
  for (const value of ["object-src 'none'", "frame-ancestors 'none'", "X-Content-Type-Options", "X-Frame-Options", "strict-origin-when-cross-origin", "camera=(), microphone=(), geolocation=()"] ) assert.match(source, new RegExp(value.replace(/[()]/g, "\\$&")));
  assert.match(source, /connect-src 'self' https:\/\/api\.web3forms\.com/);
  assert.match(source, /media-src 'self' https:\/\/d8j0ntlcm91z4\.cloudfront\.net/);
  assert.doesNotMatch(source, /unsafe-eval|X-Powered-By/);
});
