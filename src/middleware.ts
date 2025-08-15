import createIntlMiddleware from "next-intl/middleware";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Import your routing config for localization
import { routing } from "./i18n/routing";

// Create the localization middleware
const intlMiddleware = createIntlMiddleware(routing, { alternateLinks: true, localeDetection: true });

// Define your locales
const locales = ["sv", "en"];

const protectedRoutes = ["dashboard", "submission", "printing", "order"];

// Combined middleware function
export function middleware(request: NextRequest) {
  // Run the localization middleware first
  const response = intlMiddleware(request);
  const actualPathname = response.headers.get("x-middleware-rewrite");

  // Now, apply authentication logic
  const token = request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;
  const locale = pathname.split("/")[1];

  const resolvedPath = actualPathname?.split("/").pop()?.split("?")[0];

  // Check if the pathname already has a locale (e.g., /en/some-path)
  const pathnameHasLocale = locales.some((locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`);

  // If the request is for the login page, check the token
  if (pathname === "/login") {
    // If a token exists, the user is authenticated, so redirect them to the home page
    if (token) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  } else if (protectedRoutes.includes(resolvedPath || "")) {
    // If the user is authenticated and trying to access the home page, allow access
    if (token) {
      return response;
    } else {
      // If the user is not authenticated, redirect them to the login page
      return NextResponse.redirect(new URL(`/${locale}/login`, request.url));
    }
  }

  // For other paths, if no locale is present, redirect to add the correct locale
  if (!pathnameHasLocale) {
    return response;
  }

  // If everything is fine, proceed with the request
  return response;
}

// Define the configuration for the middleware
export const config = {
  matcher: ["/", "/(en|sv)/:path*"], // Adjust matcher to include login and localized paths
};
