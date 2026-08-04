import { NextRequest, NextResponse } from "next/server";
import { verifySession } from "@/lib/auth";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("session")?.value;

  // Public admin route
  if (pathname === "/admin/login") {
    if (!token) {
      return NextResponse.next();
    }

    const authenticated = await verifySession(token);

    if (authenticated) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }

    // Invalid session -> remove cookie
    const response = NextResponse.next();
    response.cookies.delete("session");
    return response;
  }

  // Protect all other admin routes
  if (pathname.startsWith("/admin")) {
    if (!token) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }

    const authenticated = await verifySession(token);

    if (!authenticated) {
      const response = NextResponse.redirect(
        new URL("/admin/login", request.url)
      );

      response.cookies.delete("session");
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};