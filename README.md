# Financial Atelier

Master your wealth with Financial Atelier. Experience an editorial approach to expense tracking, budgeting, and wealth building with precision-engineered tools. Join 120,000+ users designing a smarter financial future.

---

## Features

- **Atelier Dashboard:** Key financial metrics with a high-end editorial aesthetic.
- **Precision Tracking:** Track income, expenses, and investments with granular categorization.
- **Wealth Building:** Personalized growth blueprints and smart budget planning.
- **Hybrid Engine:** Fast local development with Express and scalable production with Next.js API Routes.
- **Security First:** Rate limiting via Upstash and bot protection with Cloudflare Turnstile.

---

## Technology Stack

- **Frontend:** React 19, Next.js 16 (App Router)
- **Styling:** Tailwind CSS 4, Framer Motion (Animations)
- **Backend (Production):** Next.js API Routes (Serverless)
- **Backend (Local Dev):** Node.js with Express
- **Database:** MongoDB (Planned)
- **Services:** Upstash Redis (Rate Limiting), EmailJS (Contact Form)

---

## Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/Rahimsiddiqui/financialatelier.git
cd financialatelier
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment variables
Create a `.env` file in the root directory:
```bash
# Services
EMAILJS_SERVICE_ID=your_service_id
EMAILJS_TEMPLATE_ID=your_template_id
EMAILJS_PUBLIC_KEY=your_public_key
EMAILJS_PRIVATE_KEY=your_private_key

# Security
NEXT_PUBLIC_TURNSTILE_SITEKEY=your_turnstile_sitekey
TURNSTILE_SECRET_KEY=your_turnstile_secret_key
UPSTASH_REDIS_REST_URL=your_upstash_url
UPSTASH_REDIS_REST_TOKEN=your_upstash_token

# Backend URL (Local Dev)
NEXT_PUBLIC_BACKEND_URL=http://localhost:5174
```

### 4. Run the development environment
Start both the Next.js frontend and the local Express backend:
```bash
npm run dev:all
```
- Frontend: [http://localhost:3000](http://localhost:3000)
- Backend: [http://localhost:5174](http://localhost:5174)

---

## License
&copy; 2026 Financial Atelier | All rights reserved.
