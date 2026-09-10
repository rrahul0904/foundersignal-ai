import { PEOPLE } from "./seed.mjs";

const state = globalThis.__foundersignalUsage ??= {
  plan: "starter",
  allowance: 100,
  revealed: new Set()
};

export function getUsage() {
  return {
    plan: state.plan,
    allowance: state.allowance,
    used: state.revealed.size,
    remaining: Math.max(0, state.allowance - state.revealed.size)
  };
}

export function revealContact(personId) {
  const person = PEOPLE.find((item) => item.id === personId);
  if (!person) return { ok: false, code: "NOT_FOUND" };

  const alreadyRevealed = state.revealed.has(personId);
  const usage = getUsage();
  if (!alreadyRevealed && usage.remaining <= 0) {
    return { ok: false, code: "QUOTA_EXCEEDED", usage };
  }

  if (!alreadyRevealed) state.revealed.add(personId);

  return {
    ok: true,
    alreadyRevealed,
    usage: getUsage(),
    contact: {
      email: person.email,
      phone: person.phone,
      linkedin: person.linkedin,
      verificationStatus: person.verificationStatus,
      verifiedAt: person.verifiedAt,
      confidence: person.confidence
    }
  };
}

export function resetDemoUsage() {
  state.revealed.clear();
  return getUsage();
}
