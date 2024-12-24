import { auth } from "@/auth";
import { NextResponse } from "next/server";

const PUBLIC_ONLY_PAGES = ["/login"];

export const middleware = auth((request) => {
  if (
    PUBLIC_ONLY_PAGES.includes(request.nextUrl.pathname) &&
    request.auth?.user?.id
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
