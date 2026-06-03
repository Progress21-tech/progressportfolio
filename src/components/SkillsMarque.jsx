import React from "react";

/* Each tool: name + accent color + a simple inline SVG glyph.
   Swap the <svg> contents for official logos later if you want. */
const DEV = [
  { n: "React", c: "#61dafb" },
  { n: "Next.js", c: "#ffffff" },
  { n: "TypeScript", c: "#3178c6" },
  { n: "Tailwind CSS", c: "#38bdf8" },
  { n: "shadcn/ui", c: "#ffffff" },
  { n: "Framer Motion", c: "#ff4d8d" },
  { n: "Node.js", c: "#83cd29" },
  { n: "Supabase", c: "#3ecf8e" },
];

const DESIGN = [
  { n: "Figma", c: "#a259ff" },
  { n: "Photoshop", c: "#31a8ff" },
  { n: "Illustrator", c: "#ff9a00" },
  { n: "UI/UX Design", c: "#4df0c8" },
  { n: "Prototyping", c: "#7c5cff" },
  { n: "Design Systems", c: "#4df0c8" },
];

function Glyph({ color }) {
  // a neutral techy mark; same shape, tool's accent color
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" stroke={color} strokeWidth="1.6" opacity="0.5" />
      <circle cx="12" cy="12" r="4" fill={color} />
    </svg>
  );
}

function Row({ items, reverse }) {
  // duplicate the list so the loop is seamless
  const loop = [...items, ...items];
  return (
    <div className="marquee">
      <div className={`marquee-track ${reverse ? "rev" : ""}`}>
        {loop.map((t, i) => (
          <div className="skill-chip" key={i}>
            <Glyph color={t.c} />
            <span>{t.n}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function SkillsMarquee() {
  return (
    <section className="skills" id="skills">
      <div className="wrap skills-head">
        <div className="sec-eyebrow">Tools &amp; Stack</div>
        <h2 className="sec-h">What I build with.</h2>
      </div>

      <div className="skills-rows">
        <div className="skills-group">
          <div className="skills-label">Development</div>
          <Row items={DEV} />
        </div>
        <div className="skills-group">
          <div className="skills-label">Design</div>
          <Row items={DESIGN} reverse />
        </div>
      </div>
    </section>
  );
}