import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(req) {
  const { searchParams } = new URL(req.url);

  const code = searchParams.get("code");
  const stateEncoded = searchParams.get("state");

  if (!code || !stateEncoded) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  let decoded;
  try {
    decoded = JSON.parse(atob(stateEncoded));
  } catch (e) {
    return NextResponse.json({ error: "Invalid state format" }, { status: 400 });
  }

  const storedState = req.cookies.get("oauth_state")?.value;

  if (!storedState || storedState !== decoded.state) {
    return NextResponse.json({ error: "Invalid state" }, { status: 403 });
  }

  // exchange code
  const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code,
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      redirect_uri: process.env.REDIRECT_URI,
      grant_type: "authorization_code",
    }),
  });

  const tokenData = await tokenRes.json();

  if (!tokenData.access_token) {
    return NextResponse.json(tokenData, { status: 400 });
  }

  // get user
  const userRes = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
    headers: {
      Authorization: `Bearer ${tokenData.access_token}`,
    },
  });

  const user = await userRes.json();

  // mode logic
  const mode = decoded.mode; // login | signup

  // JWT includes mode
  const token = jwt.sign(
    {
      email: user.email,
      name: user.name,
      picture: user.picture,
      mode,
    },
    process.env.JWT_SECRET,
    { expiresIn: "7d" },
  );

  const res = NextResponse.redirect(new URL("/dashboard", req.url));

  // Cleanup CSRF state
  res.cookies.delete("oauth_state");

  res.cookies.set("token", token, {
    httpOnly: true,
    secure: true,
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  return res;
}
