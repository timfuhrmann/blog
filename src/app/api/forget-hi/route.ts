import { NextResponse } from "next/server";
import { clearHiCookie } from "@/lib/cookie";

export function POST() {
  const response = new NextResponse(null, { status: 204 });
  response.headers.set("Set-Cookie", clearHiCookie());
  return response;
}
