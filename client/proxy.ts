import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Route protection middleware.
 *
 * Currently uses a simple session-cookie check as a placeholder.
 * Replace `buildingos-session` with your real auth token cookie name
 * when integrating NextAuth.js, Clerk, or a custom JWT solution.
 *
 * Public routes: /, /login, /signup, /book-demo
 * Protected routes: /dashboard/* (redirect to /login if unauthenticated)
 */

const PUBLIC_PATHS = ["/", "/login", "/signup", "/book-demo"];

function isPublicPath(pathname: string): boolean {
  return PUBLIC_PATHS.some(
    (path) => pathname === path || pathname.startsWith(path + "/")
  );
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow public routes through without any check
  if (isPublicPath(pathname)) {
    return NextResponse.next();
  }

  // Protect all /dashboard/* routes
  if (pathname.startsWith("/dashboard")) {
    const sessionToken =
      request.cookies.get("buildingos-session")?.value ||
      request.cookies.get("next-auth.session-token")?.value ||
      request.cookies.get("__Secure-next-auth.session-token")?.value;

    if (!sessionToken) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  /*
   * Match all request paths EXCEPT:
   * - API routes (/api/*)
   * - Static files (_next/static, _next/image, favicon.ico, etc.)
   */
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
