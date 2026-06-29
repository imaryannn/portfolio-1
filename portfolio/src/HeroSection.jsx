import { useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import FadeIn from "./FadeIn";

export default function HeroSection() {
  const { scrollY } = useScroll();
  const [progress, setProgress] = useState(0);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const p = Math.min(latest / (window.innerHeight * 0.5), 1);
    setProgress(p);
  });

  const slideLeft  = `translateX(${-progress * 100}%)`;
  const slideRight = `translateX(${progress * 100}%)`;
  const slideDown  = `translateY(${progress * 100}%)`;
  const opacity    = 1 - progress;

  return (
    <section id="home" className="hero-section">
      <FadeIn from="bottom" delay={200} style={{ width: "100%", height: "100%" }}>
      <div className="hero-inner">
        <div
          style={{
            display: "flex", flexDirection: "column", maxWidth: "380px",
            transform: slideLeft, opacity,
            transition: "none",
          }}
        >
          <h1
            style={{
              fontFamily: "'Bitcount Grid Double', monospace",
              fontSize: "clamp(4rem, 9vw, 9rem)",
              fontWeight: 800,
              lineHeight: 0.95,
              textTransform: "uppercase",
              marginBottom: "20px",
              color: "#F8F5EE",
            }}
          >
            Hi, I'm<br /><span style={{ color: "#F6C667" }}>Aryan</span>
          </h1>
          <p style={{ fontSize: "15px", lineHeight: 1.75, color: "rgba(248,245,238,0.6)" }}>
            Full stack developer building high-performance systems and
            immersive web experiences — from backend APIs to polished UIs.
          </p>
        </div>

        <div
          style={{
            display: "flex", flexDirection: "column", gap: "36px", maxWidth: "300px",
            transform: slideRight, opacity,
            transition: "none",
          }}
        >
          {[
            { val: "5+", label: "Projects shipped", accent: "#FFD95A" },
            { val: "Full stack", label: "Specialisation", accent: "#A8F0C6" },
            { val: "Open", label: "To new work", accent: "#F6C667" },
          ].map(({ val, label, accent }) => (
            <div key={label} style={{ borderLeft: `3px solid ${accent}55`, paddingLeft: "20px" }}>
              <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "clamp(26px, 2.8vw, 34px)", fontWeight: 700, color: accent, lineHeight: 1.1 }}>{val}</p>
              <p style={{ fontSize: "14px", color: "rgba(248,245,238,0.5)", marginTop: "8px", letterSpacing: "0.02em" }}>{label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="hero-ctas">
        <div
          style={{
            display: "flex", gap: "12px",
            transform: slideDown, opacity,
            transition: "none",
          }}
        >
          <a
            href="#projects"
            style={{
              padding: "12px 28px", borderRadius: "99px", fontSize: "14px", fontWeight: 600,
              background: "#F6C667", color: "#0F2A1F", textDecoration: "none",
              fontFamily: "'Plus Jakarta Sans', sans-serif", transition: "opacity 0.2s",
            }}
            onMouseEnter={e => e.currentTarget.style.opacity = "0.88"}
            onMouseLeave={e => e.currentTarget.style.opacity = "1"}
          >
            View projects
          </a>
          <a
            href="#contact"
            style={{
              padding: "12px 28px", borderRadius: "99px", fontSize: "14px", fontWeight: 600,
              color: "#F8F5EE", textDecoration: "none",
              background: "rgba(255,244,214,0.07)", backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)", border: "1px solid rgba(246,198,103,0.18)",
              transition: "opacity 0.2s",
            }}
            onMouseEnter={e => e.currentTarget.style.opacity = "0.75"}
            onMouseLeave={e => e.currentTarget.style.opacity = "1"}
          >
            Get in touch
          </a>
        </div>
      </div>
      </FadeIn>
    </section>
  );
}
