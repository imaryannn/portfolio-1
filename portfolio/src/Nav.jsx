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
          background: scrolled ? "rgba(255,255,255,0.055)" : "transparent",
          backdropFilter: scrolled ? "blur(24px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(24px)" : "none",
          border: scrolled ? "1px solid rgba(255,255,255,0.1)" : "1px solid transparent",
          boxShadow: scrolled ? "inset 0 1px 0 rgba(255,255,255,0.05)" : "none",
        }}
      >
        {/* Logo */}
        <a
          href="#home"
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 800,
            fontSize: "16px",
            color: "rgba(255,255,255,0.9)",
            textDecoration: "none",
            letterSpacing: "-0.01em",
            marginRight: "8px",
          }}
        >
          Aryan<span style={{ color: "rgba(255,255,255,0.3)" }}>.</span>
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
                  color: "rgba(255,255,255,0.55)",
                  textDecoration: "none",
                  padding: "7px 14px",
                  borderRadius: "99px",
                  transition: "background 0.2s, color 0.2s",
                  display: "block",
                }}
                onMouseEnter={e => { e.currentTarget.style.color = "rgba(255,255,255,0.95)"; e.currentTarget.style.background = "rgba(255,255,255,0.15)"; }}
                onMouseLeave={e => { e.currentTarget.style.color = "rgba(255,255,255,0.55)"; e.currentTarget.style.background = "transparent"; }}
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
                background: "rgba(255,255,255,0.9)",
                color: "#0F2A1F",
                textDecoration: "none",
                transition: "background 0.2s, color 0.2s",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                boxShadow: "none",
                border: "1px solid rgba(255,255,255,0.1)",
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
  );
}
