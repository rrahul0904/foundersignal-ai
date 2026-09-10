import { revealContact, searchPeople } from "@foundersignal/core";
import { NextResponse } from "next/server";

function quote(value: unknown) {
  const text = String(value ?? "");
  return '"' + text.replaceAll('"', '""') + '"';
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const ids = Array.isArray(body.ids) ? body.ids.slice(0, 1000) : [];
  const index = new Map(searchPeople({ verifiedOnly: true }).map((item) => [item.id, item]));
  const rows: unknown[][] = [["name", "title", "company", "industry", "country", "email", "phone", "linkedin"]];

  for (const id of ids) {
    const prospect = index.get(id);
    if (!prospect) continue;
    const revealed = revealContact(id);
    if (!revealed.ok) {
      return NextResponse.json({ error: revealed.code, usage: revealed.usage }, { status: 402 });
    }
    rows.push([
      prospect.name, prospect.title, prospect.company.name, prospect.company.industry,
      prospect.country, revealed.contact.email, revealed.contact.phone, revealed.contact.linkedin
    ]);
  }

  return NextResponse.json({ csv: rows.map((row) => row.map(quote).join(",")).join("\n") });
}
