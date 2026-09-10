const stages = [
  "ingest-source-records",
  "normalize-identities",
  "resolve-company",
  "deduplicate-contact-points",
  "verify-email",
  "score-confidence",
  "publish-search-document"
];

console.log(JSON.stringify({ service: "foundersignal-worker", status: "started", stages: stages.length }));

for (const [index, stage] of stages.entries()) {
  console.log(JSON.stringify({
    stage,
    status: "completed",
    sequence: index + 1,
    total: stages.length,
    mode: process.env.DEMO_MODE === "false" ? "production-adapter-required" : "demo"
  }));
}

console.log(JSON.stringify({ service: "foundersignal-worker", status: "completed" }));
