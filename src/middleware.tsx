import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { routes } from "./lib/routes";

// Define public routes that don't require authentication
const PUBLIC_ROUTES = [routes.LOGIN];

export function middleware(request: NextRequest) {
  // const { pathname } = request.nextUrl;

  // // Get authentication token
  // const accessToken = request.cookies.get("access_token")?.value;
  // const isAuthenticated = !!accessToken;

  // // Handle root path - redirect to dashboard if authenticated
  // if (pathname === routes.HOME) {
  //   return isAuthenticated
  //     ? NextResponse.redirect(new URL(routes.DASHBOARD, request.url))
  //     : NextResponse.redirect(new URL(routes.LOGIN, request.url));
  // }

  // // Allow access to public routes without authentication
  // if (PUBLIC_ROUTES.includes(pathname)) {
  //   // If already authenticated and trying to access login, redirect to dashboard
  //   if (isAuthenticated && pathname === routes.LOGIN) {
  //     return NextResponse.redirect(new URL(routes.DASHBOARD, request.url));
  //   }
  //   return NextResponse.next();
  // }

  // // Protect all other routes - redirect to login if not authenticated
  // if (!isAuthenticated) {
  //   return NextResponse.redirect(new URL(routes.LOGIN, request.url));
  // }

  // // Allow access to protected routes for authenticated users
  return NextResponse.next();
}

// Configure which routes should be handled by the middleware
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.svg|.*\\.png|.*\\.jpg|.*\\.jpeg|.*\\.webp|.*\\.ico|.*\\.txt|.*\\.woff2?|.*\\.ttf|.*\\.eot|.*\\.otf).*)",
  ],
};
