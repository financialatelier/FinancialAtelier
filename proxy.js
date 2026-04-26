import { auth } from "@/auth";

export const proxy = auth((req) => {
  const isLoggedIn = !!req.auth;
  const isProtectedRoute = req.nextUrl.pathname.startsWith("/dashboard");
  const isAuthRoute = req.nextUrl.pathname.startsWith("/auth");

  if (isProtectedRoute && !isLoggedIn) {
    return Response.redirect(new URL("/auth?mode=login", req.nextUrl));
  }

  if (isAuthRoute && isLoggedIn) {
    return Response.redirect(new URL("/dashboard", req.nextUrl));
  }
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
