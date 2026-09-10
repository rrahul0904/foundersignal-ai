import test from "node:test";
import assert from "node:assert/strict";
import { getUsage, resetDemoUsage, revealContact } from "../src/usage.mjs";

test("reveal consumes a credit only once", () => {
  resetDemoUsage();
  const before = getUsage();
  const first = revealContact("p1");
  const second = revealContact("p1");
  assert.equal(first.ok, true);
  assert.equal(second.ok, true);
  assert.equal(first.alreadyRevealed, false);
  assert.equal(second.alreadyRevealed, true);
  assert.equal(getUsage().used, before.used + 1);
});
