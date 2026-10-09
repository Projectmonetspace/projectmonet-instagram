import assert from "node:assert/strict";
import test from "node:test";
import { serializeJsonLd } from "../app/lib/json-ld.ts";

test("structured data cannot terminate its script element and preserves data", () => {
  const schema = {
    "@type": "Article",
    headline: '</script><script>alert("xss")</script>',
    description: "Prices < $100 & Unicode: नमस्ते",
  };
  const serialized = serializeJsonLd(schema);
  assert.ok(!serialized.includes("<"));
  assert.deepEqual(JSON.parse(serialized), schema);
});
