import { revealContact } from "@foundersignal/core";
import { NextResponse } from "next/server";

export async function POST(_request: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const result = revealContact(id);
  if (!result.ok) {
    const status = result.code === "NOT_FOUND" ? 404 : 402;
    return NextResponse.json({ error: result.code, usage: result.usage }, { status });
  }
  return NextResponse.json(result);
}
