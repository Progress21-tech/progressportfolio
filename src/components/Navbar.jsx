import React, { useEffect, useState } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={scrolled ? "scrolled" : ""}>
      <div className="nav-in">
        <a href="#top" className="nav-logo">
          <span className="b">[</span>&nbsp;PROGRESS ONI&nbsp;<span className="b">]</span>
        </a>
        <div className="nav-links">
          <a href="#approach">Approach</a>
          <a href="#skills">Skills</a>
          <a href="#work">Work</a>
          <a href="#contact" className="nav-cta">Contact</a>
        </div>
      </div>
    </nav>
  );
}