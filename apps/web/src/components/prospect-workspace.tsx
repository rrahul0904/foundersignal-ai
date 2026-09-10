"use client";

import { useEffect, useMemo, useState } from "react";

type Prospect = {
  id: string;
  name: string;
  title: string;
  seniority: string;
  country: string;
  city: string;
  company: { name: string; industry: string; employeeRange: string; technologies: string[] };
  verifiedAt: string;
  confidence: number;
};

type Contact = { email: string; phone: string; linkedin: string };

export default function ProspectWorkspace() {
  const [q, setQ] = useState("");
  const [country, setCountry] = useState("");
  const [industry, setIndustry] = useState("");
  const [seniority, setSeniority] = useState("");
  const [results, setResults] = useState<Prospect[]>([]);
  const [usage, setUsage] = useState({ used: 0, remaining: 100, allowance: 100 });
  const [revealed, setRevealed] = useState<Record<string, Contact>>({});
  const [loading, setLoading] = useState(false);

  const query = useMemo(() => {
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    if (country) params.set("country", country);
    if (industry) params.set("industry", industry);
    if (seniority) params.set("seniority", seniority);
    params.set("verifiedOnly", "true");
    return params.toString();
  }, [q, country, industry, seniority]);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    fetch("/api/search?" + query, { signal: controller.signal })
      .then((r) => r.json())
      .then((data) => {
        setResults(data.results ?? []);
        setUsage(data.usage ?? usage);
      })
      .finally(() => setLoading(false));
    return () => controller.abort();
  }, [query]);

  async function reveal(id: string) {
    const response = await fetch("/api/reveal/" + id, { method: "POST" });
    const data = await response.json();
    if (!response.ok) {
      alert(data.error ?? "Unable to reveal contact");
      return;
    }
    setRevealed((current) => ({ ...current, [id]: data.contact }));
    setUsage(data.usage);
  }

  async function exportVisible() {
    const response = await fetch("/api/exports", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ ids: results.map((item) => item.id) })
    });
    const data = await response.json();
    if (!response.ok) {
      alert(data.error ?? "Unable to export");
      return;
    }
    const blob = new Blob([data.csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "foundersignal-prospects.csv";
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <main className="workspace">
      <header className="workspaceHeader">
        <div>
          <p className="eyebrow">DISCOVERY WORKSPACE</p>
          <h2>Verified prospects</h2>
        </div>
        <div className="usage"><strong>{usage.remaining}</strong><span>reveals left</span></div>
      </header>

      <section className="filters">
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search title, company, technology…" />
        <select value={country} onChange={(e) => setCountry(e.target.value)}>
          <option value="">All countries</option>
          <option>United States</option><option>Canada</option><option>United Kingdom</option>
        </select>
        <select value={industry} onChange={(e) => setIndustry(e.target.value)}>
          <option value="">All industries</option>
          <option>Healthcare</option><option>Financial Services</option><option>Retail</option><option>Software</option>
        </select>
        <select value={seniority} onChange={(e) => setSeniority(e.target.value)}>
          <option value="">All seniority</option>
          <option>C-Level</option><option>VP</option><option>Head</option><option>Director</option><option>Manager</option>
        </select>
        <button onClick={exportVisible} disabled={!results.length}>Export visible</button>
      </section>

      <section className="tableCard">
        <div className="tableMeta"><span>{loading ? "Searching…" : results.length + " prospects"}</span><span>Protected search results</span></div>
        <div className="tableWrap">
          <table>
            <thead><tr><th>Prospect</th><th>Company</th><th>Location</th><th>Contact</th><th>Quality</th><th></th></tr></thead>
            <tbody>
              {results.map((item) => {
                const contact = revealed[item.id];
                return (
                  <tr key={item.id}>
                    <td><strong>{item.name}</strong><span>{item.title}</span></td>
                    <td><strong>{item.company.name}</strong><span>{item.company.industry} · {item.company.employeeRange}</span></td>
                    <td><span>{item.city}, {item.country}</span></td>
                    <td>{contact ? <><strong>{contact.email}</strong><span>{contact.phone}</span></> : <span className="masked">••••••••@••••••</span>}</td>
                    <td><strong>{Math.round(item.confidence * 100)}%</strong><span>Verified {item.verifiedAt}</span></td>
                    <td><button className="reveal" onClick={() => reveal(item.id)}>{contact ? "Revealed" : "Reveal"}</button></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
