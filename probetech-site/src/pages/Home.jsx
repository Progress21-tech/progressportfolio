import React, { useRef, useLayoutEffect } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "../components/Navbar.jsx";
import CosmicField from "../components/CosmicField.jsx";
import WarpTunnel from "../components/WarpTunnel.jsx";
import ContactForm from "../components/ContactForm.jsx";

gsap.registerPlugin(ScrollTrigger);

/* Narrative beats — each becomes its own pinned full screen.
   headline = always bold; body = "develops" from faint->bold on scroll. */
const BEATS = [
  {
    idx: "001 / WHAT",
    head: ["I build digital products that ", "move businesses forward."],
    body: "From marketing sites that win customers to full platforms and MVPs for founders — I handle the design and the engineering, end to end.",
  },
  {
    idx: "002 / HOW",
    head: ["I start from the problem — ", "never the technology."],
    body: "Before a single line of code, I work out what the business actually needs. The build follows the goal, not the other way around.",
  },
  {
    idx: "003 / APPROACH",
    head: ["Ship fast, then ", "sharpen with real feedback."],
    body: "I get a working version live, then refine with how people actually use it. Design taste plus solid engineering, in service of something that works as well as it looks.",
  },
];

const PROJECTS = [
  { no: "01", name: "EventFlow", meta: "Startup · Full site + CMS · React · TypeScript · Framer Motion",
    caseHref: "/work/eventflow", demo: "https://www.eventflow.com" },
  { no: "02", name: "MediConnect", meta: "Health · EMR platform · Web + mobile · Supabase",
    caseHref: "#", demo: "#" },
  { no: "03", name: "KOLA", meta: "Fintech · AI credit scoring · Next.js · Supabase",
    caseHref: "#", demo: "#" },
];

export default function Home() {
  const root = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // INTRO: pin the screen and let scroll DRIVE the shrink.
      // The page can't advance until the name finishes shrinking.
      const introTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".intro-pin",
          start: "top top",
          end: "bottom bottom",
          scrub: true,
          pin: ".intro",
          pinnedContainer: ".intro-pin",
          anticipatePin: 1,
        },
      });
      introTl
        .fromTo(".intro-name", { scale: 1, y: 0 }, { scale: 0.32, y: "-8vh", ease: "none" })
        .to(".scroll-hint", { opacity: 0, ease: "none" }, 0)
        .to(".intro-name", { opacity: 0, ease: "none" }, 0.75) // fade only at the very end
        .fromTo(".intro-canvas", { scale: 1, filter: "blur(7px)" },
                                  { scale: 1.15, filter: "blur(1px)", ease: "none" }, 0);

      // BEATS: pin each screen; scroll DEVELOPS the body text (faint->bold),
      // and only when fully developed does the pin release to the next beat.
      gsap.utils.toArray(".beat-pin").forEach((pin) => {
        const body = pin.querySelector(".beat-body");
        const bar = pin.querySelector(".beat-progress i");

        // drive opacity 0.12 -> 1 and font-weight 300 -> 700 together
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: pin,
            start: "top top",
            end: "bottom bottom",
            scrub: true,
            pin: ".beat-screen",         // the visible screen stays put
            pinnedContainer: pin,
            anticipatePin: 1,
          },
        });
        tl.fromTo(body, { opacity: 0.12, fontWeight: 300 },
                        { opacity: 1, fontWeight: 700, ease: "none" });
        if (bar) tl.fromTo(bar, { width: "0%" }, { width: "100%", ease: "none" }, 0);
      });

      // WARP: pin it so you "travel" — the label fades in, holds, then the
      // whole thing fades to black before the works appear fresh.
      const warpTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".warp-pin",
          start: "top top",
          end: "bottom bottom",
          scrub: true,
          pin: ".warp",
          pinnedContainer: ".warp-pin",
          anticipatePin: 1,
        },
      });
      warpTl
        .fromTo(".warp-label", { opacity: 0, letterSpacing: "0.15em" },
                               { opacity: 1, letterSpacing: "0.45em", ease: "none", duration: 0.4 })
        .to(".warp-label", { opacity: 1, ease: "none", duration: 0.3 })          // hold
        .to(".warp-label", { opacity: 0, ease: "none", duration: 0.15 })          // label out
        .fromTo(".warp-black", { opacity: 0 }, { opacity: 1, ease: "none", duration: 0.25 }); // fade to black

      // PROJECTS: arrive fresh — the whole section fades + lifts in from black,
      // like a new page appeared, rather than scrolling up underneath.
      gsap.fromTo(".projects-inner",
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, ease: "power2.out", duration: 1,
          scrollTrigger: { trigger: ".projects", start: "top 70%" },
        });
      // then each project staggers in
      gsap.utils.toArray(".proj").forEach((p, i) => {
        gsap.from(p, {
          opacity: 0, y: 40, duration: 0.6, ease: "power2.out", delay: 0.1 + i * 0.08,
          scrollTrigger: { trigger: ".projects", start: "top 60%" },
        });
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={root} id="top">
      <Navbar />

      {/* INTRO — pinned; scroll drives the shrink, only then advances */}
      <div className="intro-pin">
        <section className="intro">
          <div className="intro-canvas"><CosmicField /></div>
          <div className="intro-veil" />
          <div className="intro-name">
            <div className="brackets">
              <span className="brk">[</span>
              <span className="nm">PROGRESS ONI</span>
              <span className="brk">]</span>
            </div>
            <div className="intro-tag">Designer &amp; Developer · ProbeTech · Lagos</div>
          </div>
          <div className="scroll-hint">scroll to begin ↓</div>
        </section>
      </div>

      {/* BEATS — each its own pinned full screen */}
      <div id="approach">
        {BEATS.map((b) => (
          <div className="beat-pin" key={b.idx}>
            <div className="beat-screen">
              <div className="wrap">
                <div className="beat-idx">{b.idx}</div>
                <h2 className="beat-head">
                  {b.head[0]}<span className="em">{b.head[1]}</span>
                </h2>
                <p className="beat-body">{b.body}</p>
              </div>
              <div className="beat-progress"><i /></div>
            </div>
          </div>
        ))}
      </div>

      {/* WORLD TRANSITION — pinned travel that builds, then fades to black */}
      <div className="warp-pin">
        <section className="warp">
          <div className="warp-canvas"><WarpTunnel /></div>
          <div className="warp-label">Entering the work</div>
          <div className="warp-black" />
        </section>
      </div>

      {/* PROJECTS — appears fresh, like a new page */}
      <section className="projects" id="work">
        <div className="wrap projects-inner">
          <div className="sec-eyebrow">Selected Works</div>
          <h2 className="sec-h">Things I've built.</h2>
          {PROJECTS.map((p) => (
            <div className="proj" key={p.no}>
              <div className="proj-no">{p.no}</div>
              <div className="proj-main">
                <h3>{p.name}</h3>
                <div className="meta">{p.meta}</div>
              </div>
              <div className="proj-links">
                {p.caseHref.startsWith("/") ? (
                  <Link className="primary" to={p.caseHref}>View case study →</Link>
                ) : (
                  <a className="primary" href={p.caseHref}>View case study →</a>
                )}
                <a className="ghost" href={p.demo} target="_blank" rel="noreferrer">Live demo ↗</a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT — full screen */}
      <section className="contact" id="contact">
        <div className="wrap contact-grid">
          <div>
            <div className="contact-big">Let's build<br /><span className="em">something.</span></div>
            <p className="contact-sub">
              Got a product, a site, or an idea that needs shipping? Tell me about it.
            </p>
            <div className="contact-detail">
              or email directly → <a href="mailto:hello@yourdomain.com">hello@yourdomain.com</a>
            </div>
          </div>
          <ContactForm />
        </div>
      </section>

      <footer>
        <div className="wrap foot-in">
          <span>© 2026 Progress · ProbeTech</span>
          <span>Built in Lagos · React · Three.js · GSAP</span>
        </div>
      </footer>
    </div>
  );
}
