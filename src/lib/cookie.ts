import { stringifySetCookie } from "cookie";
import type { NextRequest } from "next/server";

export const HI_COOKIE = "hi";

const ONE_YEAR_SECONDS = 60 * 60 * 24 * 365;

// Safari rejects `Secure` cookies on http://localhost, so only require it in production.
const SECURE = process.env.NODE_ENV === "production";

/**
 * Serialize the `hi` cookie as a `Set-Cookie` header value, configured to
 * survive for a year everywhere — including Firefox private browsing, which
 * only keeps a cookie for the session when it carries a concrete `Expires`.
 */
export const createHiCookie = (value: string): string =>
  stringifySetCookie({
    name: HI_COOKIE,
    value,
    maxAge: ONE_YEAR_SECONDS,
    expires: new Date(Date.now() + ONE_YEAR_SECONDS * 1000),
    path: "/",
    httpOnly: true,
    secure: SECURE,
    sameSite: "lax",
  });

/** Read the `hi` cookie value off an incoming request, if present. */
export const readHiCookie = (request: NextRequest): string | undefined =>
  request.cookies.get(HI_COOKIE)?.value;

/** Serialize a `Set-Cookie` header value that immediately expires the `hi` cookie. */
export const clearHiCookie = (): string =>
  stringifySetCookie({
    name: HI_COOKIE,
    value: "",
    maxAge: 0,
    expires: new Date(0),
    path: "/",
    httpOnly: true,
    secure: SECURE,
    sameSite: "lax",
  });
