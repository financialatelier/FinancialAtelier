import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export function proxy(req) {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/auth", req.url));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    //attach mode info usage
    req.headers.set("x-user-mode", decoded.mode);

    return NextResponse.next();
  } catch {
    return NextResponse.redirect(new URL("/auth", req.url));
  }
}

export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*"],
};
