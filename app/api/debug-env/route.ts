import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export function GET() {
  return NextResponse.json({
    ADMIN_USERNAME_set: !!process.env.ADMIN_USERNAME,
    ADMIN_USERNAME_value: process.env.ADMIN_USERNAME ?? "NOT SET",
    ADMIN_PASSWORD_set: !!process.env.ADMIN_PASSWORD,
    ADMIN_SESSION_TOKEN_set: !!process.env.ADMIN_SESSION_TOKEN,
  });
}
