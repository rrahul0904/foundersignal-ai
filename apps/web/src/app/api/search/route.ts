import { getUsage, searchPeople } from "@foundersignal/core";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const results = searchPeople({
    q: params.get("q") ?? "",
    country: params.get("country") ?? "",
    industry: params.get("industry") ?? "",
    seniority: params.get("seniority") ?? "",
    verifiedOnly: params.get("verifiedOnly") === "true"
  });

  return NextResponse.json({ results, usage: getUsage() });
}
