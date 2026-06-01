<div align="center">

# Progress — Portfolio

### Designer &amp; Developer · Founder of ProbeTech · Lagos, Nigeria

I design and build fast, modern websites and apps that help businesses win customers and ship ideas.

**[ View Live Demo → ](#)** &nbsp;·&nbsp; _(deploy to Vercel, then paste your link here)_

</div>

---

## ✦ About this site

This is my personal portfolio — and it's also a working demonstration of how I build. It's a single-page site featuring a **live 3D hero** (an interactive, mouse-reactive particle field built with React Three Fiber), a selected-work section with detailed case studies, and a refined editorial aesthetic in dark tones with an amber accent.

I built it to do double duty: house my work, and *be* a piece of my work.

## ✦ Highlights

- **Live, interactive 3D hero** — an amber particle field that tilts toward your cursor, with a hoverable wireframe object, rendered with React Three Fiber (Three.js).
- **Performance-conscious** — pixel ratio is capped for smooth rendering on mobile, the primary way my audience browses.
- **Scroll-reveal animations** — sections fade and rise into view via a reusable IntersectionObserver hook.
- **Component-driven** — case studies are data-driven, so the content is easy to edit without touching layout code.
- **Fully responsive** — designed mobile-first.

## ✦ Built with

| Layer | Tools |
|---|---|
| Framework | React 18 + Vite |
| 3D | Three.js · React Three Fiber · drei |
| Styling | Hand-written CSS with design tokens (CSS variables) |
| Type | Fraunces (display) · Manrope (body) · Space Mono (accents) |
| Deploy | Vercel _(planned)_ |

## ✦ Selected work featured

- **EventFlow** — a premium, motion-driven marketing site for an event company.
- **MediConnect** — a full EMR platform (web + mobile) with secure auth and a production backend.
- **ProbeTech CMS** — a custom CMS with role-based access, built so a client team can manage their own content.
- **KOLA** — a credit-scoring platform that turns informal savings-group participation into a usable credit signal.

---

## ✦ Run it locally / in GitHub Codespaces

No local setup needed if you use Codespaces — it runs entirely in the browser.

### In GitHub Codespaces
1. Open this repo's **Code** button → **Codespaces** tab → **Create codespace on main**.
2. In the terminal, run:
   ```bash
   npm install
   npm run dev
   ```
3. When the port-forwarding popup appears, click **Open in Browser**.

### On your own machine
```bash
git clone https://github.com/YOUR-USERNAME/probetech-site.git
cd probetech-site
npm install
npm run dev
```

## ✦ Project structure

```
probetech-site/
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx            # entry point
    ├── App.jsx             # assembles all sections
    ├── index.css           # design tokens + all styles
    └── components/
        ├── Nav.jsx
        ├── Hero.jsx        # ← the 3D hero lives here
        ├── Work.jsx        # ← case studies (edit the CASES array)
        ├── Sections.jsx    # approach, about, contact, footer
        └── useReveal.js    # scroll-reveal hook
```

## ✦ Customising

- **Colors & spacing** — edit the CSS variables at the top of `src/index.css`.
- **Case studies** — edit the `CASES` array in `src/components/Work.jsx`.
- **Contact details** — update the email and social links in `src/components/Sections.jsx`.
- **The 3D** — tweak `count` in `ParticleField`, or swap `icosahedronGeometry` for another shape, in `src/components/Hero.jsx`.

## ✦ Deploy

Push to GitHub, then import the repo into **Vercel** or **Netlify** (both auto-detect Vite).
- Build command: `npm run build`
- Output directory: `dist`

Once deployed, paste your live URL into the demo link at the top of this file.

---

<div align="center">

Designed &amp; built in Lagos · © 2026 Progress · ProbeTech

</div>
