import { NextResponse } from "next/server";

export function GET() {
  return NextResponse.json({
    ok: true,
    service: "foundersignal-web",
    mode: process.env.DEMO_MODE === "false" ? "production" : "demo"
  });
}
