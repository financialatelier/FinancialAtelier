# Financial Atelier

Master your wealth with Financial Atelier. Experience an editorial approach to expense tracking, budgeting, and wealth building with precision-engineered tools.

---

## Features

- **Atelier Dashboard:** Key financial metrics with a high-end editorial aesthetic.
- **Precision Tracking:** Track income, expenses, and investments with granular categorization.
- **Wealth Building:** Personalized growth blueprints and smart budget planning.
- **Secure Authentication:** Built-in Auth.js v5 (NextAuth) integration with Google and GitHub providers.
- **Database Integrated:** Automatic user and session persistence via MongoDB.
- **Security First:** Rate limiting via Upstash, CSRF protection, and bot protection with Cloudflare Turnstile.

---

## Technology Stack

- **Frontend:** React 19, Next.js 16 (App Router)
- **Authentication:** Auth.js v5 (Beta)
- **Styling:** Tailwind CSS 4, Framer Motion (Animations)
- **Database:** MongoDB (via @auth/mongodb-adapter)
- **Security:** Upstash Redis (Rate Limiting), Cloudflare Turnstile
- **Deployment:** Vercel

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/financialatelier/financialatelier.git
cd financialatelier
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the root directory and add the following:

```bash
# Email JS
EMAILJS_SERVICE_ID=your_service_id
EMAILJS_TEMPLATE_ID=your_template_mail
EMAILJS_PUBLIC_KEY=your_public_key
EMAILJS_PRIVATE_KEY=your_private_key

# Upstach Redis
UPSTASH_REDIS_REST_URL=your_upstach_redis_url
UPSTASH_REDIS_REST_TOKEN=your_upstach_redis_token

# Turnstile Keys
NEXT_PUBLIC_TURNSTILE_SITEKEY=1x00000000000000000000AA
TURNSTILE_SECRET_KEY=your_turnstile_secret_key

# OAuth Credentials
AUTH_GOOGLE_ID=your_google_client_id
AUTH_GOOGLE_SECRET=your_google_client_secret
AUTH_GITHUB_ID=your_github_client_id
AUTH_GITHUB_SECRET=your_github_client_secret

# Secret Keys
AUTH_SECRET=your_auth_secret # Generate with: npx auth secret

# Database
STORAGE_MONGODB_URI=mongodb+srv://...
```

### 4. Run the development environment

```bash
npm run dev
```

- Frontend: [http://localhost:3000](http://localhost:3000)

---

## Project Structure (Auth & Logic)

- `auth.js`: Centralized Auth.js configuration.
- `proxy.js`: Next.js 16 middleware for route protection.
- `lib/mongodb.js`: Shared MongoDB client instance.
- `app/api/auth/[...nextauth]/route.js`: Authentication route handlers.

---

## License

&copy; 2026 Financial Atelier | All rights reserved.
