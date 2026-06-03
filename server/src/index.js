import "dotenv/config";
import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import { supabase } from "./supabase.js";
import { validateContact } from "./validate.js";
import { sendNotification } from "./email.js";

const app = express();
app.use(express.json({ limit: "20kb" }));

// --- CORS: only allow your own frontend(s) to call this API ---
const allowed = (process.env.ALLOWED_ORIGINS || "https://progressoni.vercel.app")
  .split(",")
  .map((o) => o.trim());

app.use(
  cors({
    origin: (origin, cb) => {
      // allow tools with no origin (curl, server-to-server) and listed origins
      if (!origin || allowed.includes(origin)) return cb(null, true);
      return cb(new Error("Not allowed by CORS"));
    },
  })
);

// --- Rate limit the contact endpoint: 5 submissions / 10 min / IP ---
const contactLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { ok: false, error: "Too many submissions. Please try again later." },
});

app.get("/", (_req, res) => res.json({ ok: true, service: "probetech-contact-api" }));
app.get("/api/health", (_req, res) => res.json({ ok: true }));

app.post("/api/contact", contactLimiter, async (req, res) => {
  try {
    // Honeypot: a hidden field real users never fill. Bots do.
    if (req.body.company_website) {
      // Pretend success so the bot doesn't learn anything.
      return res.json({ ok: true });
    }

    const { valid, errors, data } = validateContact(req.body);
    if (!valid) {
      return res.status(400).json({ ok: false, errors });
    }

    // 1) Store in Supabase
    const { error: dbError } = await supabase
      .from("contact_submissions")
      .insert([
        {
          name: data.name,
          email: data.email,
          project_type: data.type,
          message: data.message,
        },
      ]);

    if (dbError) {
      console.error("Supabase insert error:", dbError.message);
      // We still try to email so the lead isn't lost.
    }

    // 2) Email notification (non-blocking failure)
    const emailResult = await sendNotification(data);

    // Success if at least one path worked
    if (dbError && !emailResult.sent) {
      return res
        .status(500)
        .json({ ok: false, error: "Could not save or send your message. Please email directly." });
    }

    return res.json({ ok: true });
  } catch (err) {
    console.error("Contact route error:", err.message);
    return res.status(500).json({ ok: false, error: "Something went wrong." });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✓ Contact API running on port ${PORT}`));
