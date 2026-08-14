import { useEffect, useState } from "react";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { scrollToId, stopLenis, startLenis } from "../lib/scroll";

const links = [
  { label: "Work", href: "#projects", index: "01" },
  { label: "Capabilities", href: "#capabilities", index: "02" },
  { label: "About", href: "#about", index: "03" },
  { label: "Contact", href: "#contact", index: "04" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();
  const reduced = useReducedMotion();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const prev = scrollY.getPrevious() ?? 0;
    if (open) return;
    if (latest > prev && latest > 120) setHidden(true);
    else if (latest < prev) setHidden(false);
  });

  useEffect(() => {
    if (open) {
      stopLenis();
      document.body.style.overflow = "hidden";
    } else {
      startLenis();
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const go = (e, href) => {
    e.preventDefault();
    setOpen(false);
    setTimeout(() => scrollToId(href), 100);
  };

  return (
    <>
      <motion.header
        className="nav-bar"
        style={{ color: open ? "#F5EDC9" : "#111111", transition: "color 0.3s ease" }}
        initial={reduced ? false : { y: -30, opacity: 0 }}
        animate={{ y: reduced ? 0 : hidden ? -120 : 0, opacity: 1 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        <a
          href="#home"
          onClick={(e) => go(e, "#home")}
          className="nav-wordmark"
          aria-label="Aryan — home"
        >
          Aryan<span className="dot">.</span>
        </a>

        <button
          className="menu-btn"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="menu-overlay"
          onClick={() => setOpen((o) => !o)}
          data-cursor
        >
          <span className="menu-btn__icon" aria-hidden="true">
            <span />
            <span />
          </span>
        </button>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="menu-overlay"
            className="menu-overlay"
            aria-label="Main menu"
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduced ? undefined : { opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="label-mono" style={{ color: "rgba(245,237,201,0.4)", marginBottom: 20 }}>
              Navigation / 2026
            </p>

            <nav>
              {links.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  className="menu-link"
                  onClick={(e) => go(e, l.href)}
                  initial={reduced ? false : { opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.12 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                >
                  <span className="menu-link__index">{l.index}</span>
                  {l.label}
                </motion.a>
              ))}
            </nav>

            <div className="menu-overlay__foot">
              <p className="label-mono" style={{ color: "rgba(245,237,201,0.45)" }}>
                Full-stack / Realtime / AI
              </p>
              <p className="label-mono" style={{ color: "rgba(245,237,201,0.45)" }}>
                Open to new work — let's talk
              </p>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
