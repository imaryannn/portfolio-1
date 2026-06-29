import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const links = [
  { label: "About",    href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills",   href: "#skills" },
  { label: "Contact",  href: "#contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <>
      {/* Desktop pill */}
      <motion.nav
        initial={{ y: -60, opacity: 0, x: "-50%" }}
        animate={{ y: 0, opacity: 1, x: "-50%" }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="desktop-nav"
        style={{
          position: "fixed",
          top: "20px",
          left: "50%",
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

          <div style={{ width: "1px", height: "18px", background: "rgba(255,255,255,0.15)", marginRight: "8px" }} />

          <ul style={{ display: "flex", alignItems: "center", gap: "4px", listStyle: "none", margin: 0, padding: 0 }}>
            {links.map(({ label, href }, idx) => (
              <li key={label}>
                <a
                  href={href}
                  onMouseEnter={() => setHoveredIdx(idx)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  style={{
                    fontSize: "14px",
                    fontWeight: 500,
                    color: hoveredIdx === idx ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.55)",
                    textDecoration: "none",
                    padding: "7px 14px",
                    borderRadius: "99px",
                    background: hoveredIdx === idx ? "rgba(255,255,255,0.15)" : "transparent",
                    transition: "background 0.2s, color 0.2s",
                    display: "block",
                  }}
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
      </motion.nav>

      {/* Mobile hamburger */}
      <nav className="mobile-nav">
        <div
          style={{
            position: "fixed",
            top: "0",
            left: "0",
            right: "0",
            zIndex: 100,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "16px 16px 8px 20px",
          }}
        >
          <a
            href="#home"
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 800,
              fontSize: "17px",
              color: "#F8F5EE",
              textDecoration: "none",
              letterSpacing: "-0.01em",
            }}
          >
            Aryan<span style={{ color: "rgba(255,255,255,0.3)" }}>.</span>
          </a>

          <button
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Toggle menu"
            style={{
              background: "transparent",
              border: "none",
              width: "44px",
              height: "44px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "5px",
              cursor: "pointer",
              flexShrink: 0,
            }}
          >
            <span style={{ display: "block", width: "14px", height: "2px", background: "#F8F5EE", borderRadius: "2px", transition: "all 0.3s ease", transform: menuOpen ? "rotate(45deg) translate(5px, 5px)" : "none" }} />
            <span style={{ display: "block", width: "20px", height: "2px", background: "#F8F5EE", borderRadius: "2px", transition: "all 0.3s ease", transform: menuOpen ? "rotate(-45deg) translate(5px, -5px)" : "none" }} />
          </button>
        </div>

        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            style={{
              position: "fixed",
              top: "68px",
              right: "16px",
              zIndex: 99,
              background: "rgba(15, 42, 31, 0.92)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "16px",
              padding: "8px",
              minWidth: "180px",
            }}
          >
            <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
              {links.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    onClick={() => setMenuOpen(false)}
                    style={{
                      display: "block",
                      padding: "12px 16px",
                      borderRadius: "10px",
                      fontSize: "15px",
                      fontWeight: 500,
                      color: "rgba(248,245,238,0.75)",
                      textDecoration: "none",
                      transition: "background 0.2s",
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.08)"}
                    onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                  >
                    {label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#contact"
                  onClick={() => setMenuOpen(false)}
                  style={{
                    display: "block",
                    padding: "12px 16px",
                    borderRadius: "10px",
                    fontSize: "15px",
                    fontWeight: 600,
                    color: "#0F2A1F",
                    background: "#F6C667",
                    textDecoration: "none",
                    marginTop: "4px",
                  }}
                >
                  Hire me
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </nav>
    </>
  );
}
