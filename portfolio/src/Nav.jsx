import { useState, useEffect } from "react";

const links = [
  { label: "About",    href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills",   href: "#skills" },
  { label: "Contact",  href: "#contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <nav
      style={{
        position: "fixed",
        top: "20px",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 50,
        width: "fit-content",
        transition: "all 0.5s ease",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          padding: "8px 8px 8px 24px",
          borderRadius: "99px",
          transition: "all 0.5s ease",
          background: scrolled ? "rgba(255,255,255,0.05)" : "transparent",
          backdropFilter: scrolled ? "blur(32px) saturate(180%)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(32px) saturate(180%)" : "none",
          border: scrolled ? "1px solid rgba(255,255,255,0.1)" : "1px solid transparent",
          boxShadow: scrolled ? "0 8px 32px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.08), inset 0 -1px 0 rgba(0,0,0,0.08)" : "none",
        }}
      >
        {/* Logo */}
        <a
          href="#home"
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 800,
            fontSize: "16px",
            color: "#F6C667",
            textDecoration: "none",
            letterSpacing: "-0.01em",
            marginRight: "8px",
          }}
        >
          Aryan<span style={{ color: "#A8F0C6" }}>.</span>
        </a>

        {/* Divider */}
        <div style={{ width: "1px", height: "18px", background: "rgba(255,255,255,0.15)", marginRight: "8px" }} />

        {/* Desktop links */}
        <ul style={{ display: "flex", alignItems: "center", gap: "4px", listStyle: "none", margin: 0, padding: 0 }}>
          {links.map(({ label, href }) => (
            <li key={label}>
              <a
                href={href}
                style={{
                  fontSize: "14px",
                  fontWeight: 500,
                  color: "rgba(248,245,238,0.65)",
                  textDecoration: "none",
                  padding: "7px 14px",
                  borderRadius: "99px",
                  transition: "background 0.2s, color 0.2s",
                  display: "block",
                }}
                onMouseEnter={e => { e.currentTarget.style.color = "#F8F5EE"; e.currentTarget.style.background = "rgba(255,255,255,0.08)"; }}
                onMouseLeave={e => { e.currentTarget.style.color = "rgba(248,245,238,0.65)"; e.currentTarget.style.background = "transparent"; }}
              >
                {label}
              </a>
            </li>
          ))}
          <li style={{ marginLeft: "8px" }}>
            <a
              href="#contact"
              style={{
                padding: "9px 20px",
                borderRadius: "99px",
                fontSize: "14px",
                fontWeight: 600,
                background: "#F6C667",
                color: "#0F2A1F",
                textDecoration: "none",
                transition: "opacity 0.2s",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                boxShadow: "0 2px 8px rgba(246,198,103,0.3)",
              }}
              onMouseEnter={e => e.currentTarget.style.opacity = "0.88"}
              onMouseLeave={e => e.currentTarget.style.opacity = "1"}
            >
              Hire me
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
