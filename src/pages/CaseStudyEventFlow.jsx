import React from "react";
import { Link } from "react-router-dom";

export default function CaseStudyEventFlow() {
  return (
    <div className="cs">
      <div className="wrap" style={{ paddingTop: 28 }}>
        <Link to="/" className="cs-back">← back to work</Link>
      </div>

      <header className="cs-hero">
        <div className="wrap">
          <div className="kicker">Case Study · Startup · Web + CMS</div>
          <h1>EventFlow</h1>
          <p className="lede">
            A full marketing website and a custom content system for an event-marketing
            startup — built so the team can run their own site and publish their own
            stories without a developer in the loop.
          </p>
          <div className="cs-facts">
            <div className="f"><span>Role</span><span>Design &amp; Development</span></div>
            <div className="f"><span>Stack</span><span>React · TypeScript · Framer Motion · Vercel</span></div>
            <div className="f"><span>Scope</span><span>6-page site + custom CMS</span></div>
            <div className="f"><span>Year</span><span>2026</span></div>
          </div>
        </div>
      </header>

      <div className="cs-body">
        <section className="cs-section">
          <h2><span className="n">01</span>The client</h2>
          <p>
            EventFlow is an <strong>event-marketing startup</strong> — a young company
            helping brands plan, promote, and run events. Like most early-stage startups,
            their product and ambition were ahead of their web presence: they needed a
            site that looked as credible and polished as the work they deliver, and a way
            to keep it alive without paying for a developer every time something changed.
          </p>
          <div className="placeholder">
            ✎ REPLACE: add 1–2 real sentences about EventFlow — who they serve, what
            makes them different, the founder's goal. This is where real detail makes the
            case study believable.
          </div>
        </section>

        <section className="cs-section">
          <h2><span className="n">02</span>The challenge</h2>
          <p>
            As a startup, EventFlow needed to do two things at once: <strong>look
            established</strong> to win client trust, and <strong>stay nimble</strong>
            enough to update their own content as the business evolved. An off-the-shelf
            template would have solved the first poorly and the second not at all.
          </p>
          <p>The brief came down to:</p>
          <ul className="cs-list">
            <li>A <b>marketing site</b> that communicates the brand with confidence.</li>
            <li>A <b>blog &amp; case-study system</b> the team controls themselves.</li>
            <li>Room to <b>grow</b> — new pages and content without a rebuild.</li>
          </ul>
        </section>

        <section className="cs-section">
          <h2><span className="n">03</span>What I built — the site</h2>
          <p>
            I designed and developed the full website in <strong>React and TypeScript</strong>,
            with <strong>Framer Motion</strong> for motion that guides attention without
            getting in the way, deployed on <strong>Vercel</strong>. Each page earns its place:
          </p>
          <ul className="cs-list">
            <li><b>Landing page</b> — the first impression; sets the brand tone and routes visitors to what matters.</li>
            <li><b>Services page</b> — what EventFlow actually offers, made clear and scannable.</li>
            <li><b>Blog (v2)</b> — a refined publishing surface for the team's articles and updates.</li>
            <li><b>About page</b> — the story and the people, building trust with prospects.</li>
            <li><b>Contact page</b> — a clean path for new enquiries to reach the team.</li>
            <li><b>Coming-soon page</b> — a holding/launch surface for things not yet live.</li>
          </ul>
          <div className="placeholder">
            ✎ REPLACE/ADD: a sentence per page on a specific design decision you made —
            e.g. "the services page uses X because…". Specifics here read as real expertise.
          </div>
        </section>

        <section className="cs-section">
          <h2><span className="n">04</span>What I built — the CMS</h2>
          <p>
            The site is only half the story. I built EventFlow a <strong>custom content
            management system</strong> so the team can manage their own <strong>blogs and
            case studies</strong> directly — write, edit, and publish without touching code
            or waiting on a developer. I've already populated it with their initial blog
            posts and case studies, so it shipped working, not empty.
          </p>
          <p>
            This is the difference between a site that's a snapshot and one that's a living
            tool: EventFlow owns their content pipeline.
          </p>
          <div className="placeholder">
            ✎ REPLACE: CMS tech details if you want them public (e.g. Node/Express,
            Supabase, role-based access, Tiptap editor), plus any workflow specifics —
            who uses it, how often they publish.
          </div>
        </section>

        <section className="cs-section">
          <h2><span className="n">05</span>The outcome</h2>
          <p>
            EventFlow went from <strong>no real web presence</strong> to a polished,
            self-managed site that matches their ambition as a startup — and a content
            system that lets a non-technical team publish on their own terms.
          </p>
          <div className="placeholder">
            ✎ REPLACE: real results if you have any — launch date, number of posts
            published, client feedback, traffic, leads. Even "the founder now updates the
            blog weekly themselves" is a strong, concrete outcome.
          </div>
        </section>
      </div>

      <div className="cs-cta">
        <a className="primary" href="#" target="_blank" rel="noreferrer">View live site ↗</a>
        <Link className="ghost" to="/#contact">Start a project like this →</Link>
      </div>

      <footer>
        <div className="wrap foot-in">
          <span>© 2026 Progress · ProbeTech</span>
          <span>EventFlow case study</span>
        </div>
      </footer>
    </div>
  );
}
