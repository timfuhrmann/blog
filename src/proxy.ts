import { NextResponse, type NextRequest } from "next/server";
import { createHiCookie, readHiCookie } from "@/lib/cookie";

/**
 * Next.js proxy (formerly middleware). When a request carries a `?hi=` search
 * param with a string value, persist it in a cookie for a year. If the cookie
 * is set but the request is missing `?hi=`, redirect to append it so shared
 * URLs always carry the param.
 */
export function proxy(request: NextRequest) {
  const url = request.nextUrl.clone();
  const response = NextResponse.next();

  const fromQuery = url.searchParams.get("hi");

  if (fromQuery) response.headers.append("Set-Cookie", createHiCookie(fromQuery));

  const fromCookie = readHiCookie(request);

  if (fromCookie && !fromQuery) {
    url.searchParams.set("hi", fromCookie);
    return NextResponse.redirect(url, { headers: response.headers });
  }

  const hi = fromQuery ?? fromCookie;

  if (hi && url.pathname === "/") {
    url.pathname = `/home/${hi}`;
    return NextResponse.rewrite(url, { headers: response.headers });
  }

  if (hi && url.pathname === "/selected-work") {
    url.pathname = `/selected-work/${hi}`;
    return NextResponse.rewrite(url, { headers: response.headers });
  }

  if (url.pathname.startsWith("/home/")) {
    url.pathname = `/`;
    return NextResponse.redirect(url, { headers: response.headers });
  }

  if (url.pathname.startsWith("/selected-work/")) {
    url.pathname = `/selected-work`;
    return NextResponse.redirect(url, { headers: response.headers });
  }

  return response;
}

export const config = {
  matcher: "/((?!api|_next/static|_next/image|favicon.ico).*)",
};
