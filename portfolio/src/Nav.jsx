import { useState, useContext } from "react";
import { motion } from "framer-motion";
import { LenisScrollContext } from "./LenisScrollContext";

const links = [
  { label: "About",    href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills",   href: "#skills" },
  { label: "Contact",  href: "#contact" },
];

export default function Nav() {
  const scrollY = useContext(LenisScrollContext);
  const scrolled = scrollY > 20;
  const [hoveredIdx, setHoveredIdx] = useState(null);

  return (
    <motion.div
      initial={{ y: -80, opacity: 0, x: "-50%" }}
      animate={{ y: 0, opacity: 1, x: "-50%" }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      style={{ position: "fixed", top: "12px", left: "50%", zIndex: 50, width: "min(95vw, fit-content)" }}
    >
    <nav
      style={{
        width: "100%",
        overflowX: "auto",
        overflowY: "hidden",
        WebkitOverflowScrolling: "touch",
        scrollbarWidth: "none",
        msOverflowStyle: "none",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "4px",
          padding: "6px 6px 6px 16px",
          borderRadius: "99px",
          transition: "all 0.5s ease",
          background: scrolled ? "rgba(255,255,255,0.055)" : "transparent",
          backdropFilter: scrolled ? "blur(24px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(24px)" : "none",
          border: scrolled ? "1px solid rgba(255,255,255,0.1)" : "1px solid transparent",
          boxShadow: scrolled ? "inset 0 1px 0 rgba(255,255,255,0.05)" : "none",
          width: "max-content",
          margin: "0 auto",
        }}
      >
        <a
          href="#home"
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 800,
            fontSize: "15px",
            color: "rgba(255,255,255,0.9)",
            textDecoration: "none",
            letterSpacing: "-0.01em",
            marginRight: "6px",
            flexShrink: 0,
          }}
        >
          Aryan<span style={{ color: "rgba(255,255,255,0.3)" }}>.</span>
        </a>

        <div style={{ width: "1px", height: "16px", background: "rgba(255,255,255,0.15)", marginRight: "4px", flexShrink: 0 }} />

        <ul style={{ display: "flex", alignItems: "center", gap: "2px", listStyle: "none", margin: 0, padding: 0, flexShrink: 0 }}>
          {links.map(({ label, href }, idx) => (
            <li key={label}>
              <a
                href={href}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                style={{
                  fontSize: "13px",
                  fontWeight: 500,
                  color: hoveredIdx === idx ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.55)",
                  textDecoration: "none",
                  padding: "5px 10px",
                  borderRadius: "99px",
                  background: hoveredIdx === idx ? "rgba(255,255,255,0.15)" : "transparent",
                  transition: "background 0.2s, color 0.2s",
                  display: "block",
                  whiteSpace: "nowrap",
                }}
              >
                {label}
              </a>
            </li>
          ))}
          <li style={{ marginLeft: "4px", flexShrink: 0 }}>
            <a
              href="#contact"
              style={{
                padding: "7px 14px",
                borderRadius: "99px",
                fontSize: "13px",
                fontWeight: 600,
                background: "rgba(255,255,255,0.9)",
                color: "#0F2A1F",
                textDecoration: "none",
                transition: "background 0.2s, color 0.2s",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.75)"}
              onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.9)"}
            >
              Hire me
            </a>
          </li>
        </ul>
      </div>
    </nav>
    </motion.div>
  );
}
