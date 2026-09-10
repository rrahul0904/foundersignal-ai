import test from "node:test";
import assert from "node:assert/strict";
import { searchPeople } from "../src/search.mjs";

test("search omits protected contact values", () => {
  const results = searchPeople({ q: "data" });
  assert.ok(results.length >= 2);
  assert.equal("email" in results[0], false);
  assert.equal("phone" in results[0], false);
});

test("search filters by country and industry", () => {
  const results = searchPeople({ country: "United States", industry: "Healthcare" });
  assert.ok(results.length >= 1);
  assert.ok(results.every((item) => item.country === "United States"));
  assert.ok(results.every((item) => item.company.industry === "Healthcare"));
});
