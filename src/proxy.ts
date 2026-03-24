import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const locales = ["en", "tr"];
function getLocale(request: NextRequest) {
  const acceptLang = request.headers.get("accept-language");
  if (acceptLang && acceptLang.toLowerCase().includes("tr")) return "tr";
  return "en";
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return;

  const locale = getLocale(request);
  request.nextUrl.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: ["/((?!_next|api|favicon.ico|next.svg|vercel.svg).*)"],
};
