<div align="center">
# Progress — Portfolio v3

### Designer & Developer · ProbeTech · Lagos, Nigeria

A techy, universe-themed portfolio built as a full-screen, page-by-page experience
with GSAP scroll choreography, a 3D cosmic intro, and a custom contact backend.

**[ View Live Demo → ](#)** _(deploy to Vercel, then paste your link here)_
>>>>>>> f624106 (Made changes to the backend)

</div>

## ✦ The experience, screen by screen

1. **Intro** — `[ PROGRESS ]` in Orbitron over a blurred 3D cosmic field. A navbar sits on top (Progress left, links right).
2. **Three narrative beats** — *each is its own full screen*. The headline is bold from the start; the body text begins **faint and thin**, and as you scroll it **develops — becoming bolder and more solid** — and only once it's fully "written in" does the screen release to the next beat. A progress bar at the bottom shows how developed the current beat is.
3. **Warp transition** — a travel-through-space moment into the work.
4. **Selected Works** — EventFlow, MediConnect, KOLA, each with Case Study + Live Demo links.
5. **Contact** — full screen, with a form (name, email, project type, message) wired to the custom backend.

## ✦ Fonts
- **Orbitron** — the name, headings, project titles (techy/sci-fi).
- **Rajdhani** — body text (techy but readable).
- **JetBrains Mono** — small technical labels.

To change fonts: edit `--display` and `--body` at the top of `src/index.css`, and update the `<link>` in `index.html`.

## ✦ Run it (Codespaces or local)

Frontend:
```bash
npm install
npm run dev
```
> The pinned scroll + 3D only feel right when actually running — view it in the browser, not just the code.

Backend (contact form) — see `server/README.md`. Create a `.env` here with:
```
VITE_API_URL=https://progressportfolio.onrender.com
```

## ✦ ✎ Placeholders to replace
- `hello@yourdomain.com` — your real email (`Home.jsx`, `ContactForm.jsx`, `CaseStudyEventFlow.jsx`).
- `#` demo links + MediConnect/KOLA case study links — in the `PROJECTS` array in `src/pages/Home.jsx`. Only EventFlow has a full case-study page so far; MediConnect & KOLA point to `#` until you build theirs.
- EventFlow case study — fill the **✎ REPLACE** boxes in `src/pages/CaseStudyEventFlow.jsx`.

## ✦ Editing content
- **Narrative beats** → `BEATS` array in `src/pages/Home.jsx`.
- **Scroll length per beat** → the `.beat-pin { height: 300vh }` in `index.css` (taller = more scrolling to develop the text; lower it to ~200vh if it feels too long).
- **Projects** → `PROJECTS` array in `src/pages/Home.jsx`.
- **Colors** → CSS variables at top of `src/index.css`.

## ✦ Note on the pinned scroll
The "develop the text, then advance" effect uses GSAP ScrollTrigger pinning. It's striking but is a deliberate scroll-jacking pattern — test it on a phone, and if any beat feels too long, reduce `.beat-pin` height. Respects normal scrolling otherwise.

## ✦ Project structure
```
src/
├── main.jsx                      # router
├── index.css                     # theme + all styles (FONTS here)
├── components/
│   ├── Navbar.jsx                # top navbar
│   ├── CosmicField.jsx           # 3D intro universe
│   ├── WarpTunnel.jsx            # world-transition warp
│   └── ContactForm.jsx           # contact form -> backend
└── pages/
    ├── Home.jsx                  # intro + pinned beats + projects + contact (GSAP here)
    └── CaseStudyEventFlow.jsx    # detailed case study
server/                           # Express + Supabase + Resend contact backend
```

## ✦ Deploy
Frontend → **Vercel**. Backend → **Render** (root dir `server`). Point them at each other with env vars. Details in `server/README.md`.
>>>>>>> f624106 (Made changes to the backend)

---

<div align="center">
</div>
