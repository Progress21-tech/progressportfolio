# ProbeTech — Contact API

A small Express backend that receives contact-form submissions, stores them in
Supabase, and emails you a notification (via Resend). Built with ES Modules to
match the MediConnect setup.

## What it does
- `POST /api/contact` → validates input → stores in Supabase → emails you.
- Spam protection: a honeypot field + rate limiting (5 submissions / 10 min / IP).
- CORS locked to your own frontend origins.
- Starts cleanly even before you add keys (fails gracefully, never crashes).

---

## Setup (local)

```bash
cd server
npm install
cp .env.example .env     # then fill in real values
npm run dev
```
Server runs on `http://localhost:5000`.

## 1. Supabase
1. In your Supabase project → **SQL Editor** → paste `schema.sql` → **Run**. This creates the `contact_submissions` table with RLS on.
2. Get your **Project URL** and **service_role key** from **Project Settings → API**.
3. Put them in `.env` as `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY`.

> ⚠️ The **service_role key is secret** — it bypasses Row Level Security. Only ever use it on the server, never in frontend code, never commit it.

## 2. Email (Resend)
1. Sign up free at **resend.com**, create an **API key**.
2. Put it in `.env` as `RESEND_API_KEY`, set `NOTIFY_TO` to your inbox.
3. To start immediately, leave `NOTIFY_FROM` as the `onboarding@resend.dev` test sender. To send from your own domain, verify it in Resend and update `NOTIFY_FROM`.

(If you skip Resend, submissions still save to Supabase — email is just skipped.)

## 3. Connect the frontend
In the **frontend** project root, create `.env`:
```
VITE_API_URL=http://localhost:5000
```
Run the frontend (`npm run dev`) and the contact form will POST here.

---

## Deploy to Render
1. Push the repo to GitHub.
2. On Render → **New → Web Service** → connect the repo.
3. Set **Root Directory** to `server`.
4. Build command: `npm install` · Start command: `npm start`.
5. Add all the `.env` values as **Environment Variables** in Render.
6. Set `ALLOWED_ORIGINS` to your Vercel URL (e.g. `https://your-site.vercel.app`).
7. After deploy, copy the Render URL and set `VITE_API_URL` to it in your **Vercel** frontend env, then redeploy the frontend.

> Render's free tier sleeps after inactivity, so the first submission after a quiet spell may take a few seconds while the server wakes. Fine for a portfolio.

## Viewing submissions
Supabase → **Table Editor → contact_submissions**. Every enquiry is stored there permanently, plus you get the email.
