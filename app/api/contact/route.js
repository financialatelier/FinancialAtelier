import { z } from "zod";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// Schema
const contactSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email(),
  message: z.string().min(1).max(2000),
  token: z.string().min(1),
});

// Redis + rate limit
let ratelimit = null;

if (
  process.env.UPSTASH_REDIS_REST_URL &&
  process.env.UPSTASH_REDIS_REST_TOKEN
) {
  const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
  });

  ratelimit = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(3, "1 h"),
  });
}

// GET not allowed
export async function GET() {
  return Response.json({ error: "Method not allowed" }, { status: 405 });
}

// POST handler
export async function POST(req) {
  try {
    const body = await req.json();

    // rate limit
    if (ratelimit) {
      const ip = req.headers.get("x-forwarded-for") || "127.0.0.1";

      const { success, limit, remaining, reset } = await ratelimit.limit(
        `contact_${ip}`,
      );

      if (!success) {
        return Response.json({ error: "Too many requests" }, { status: 429 });
      }
    }

    // validate
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      return Response.json(
        {
          error: "Validation failed",
          details: parsed.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    const { name, email, message, token } = parsed.data;

    // TURNSTILE VERIFY
    const verifyRes = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          secret: process.env.TURNSTILE_SECRET_KEY,
          response: token,
        }),
      },
    );

    const verifyData = await verifyRes.json();

    if (!verifyData.success) {
      return Response.json({ error: "Bot detected" }, { status: 403 });
    }

    // EMAILJS CALL
    const emailRes = await fetch(
      "https://api.emailjs.com/api/v1.0/email/send",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service_id: process.env.EMAILJS_SERVICE_ID,
          template_id: process.env.EMAILJS_TEMPLATE_ID,
          user_id: process.env.EMAILJS_PUBLIC_KEY,
          accessToken: process.env.EMAILJS_PRIVATE_KEY,
          template_params: {
            name,
            email,
            message,
          },
        }),
      },
    );

    if (!emailRes.ok) {
      return Response.json({ error: "Email failed" }, { status: 500 });
    }

    return Response.json({ success: true });
  } catch (err) {
    console.error(err);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
