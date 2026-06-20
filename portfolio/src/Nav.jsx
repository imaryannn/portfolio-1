import { useState, useEffect } from "react";

const links = [
  { label: "About",    href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills",   href: "#skills" },
  { label: "Contact",  href: "#contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen]         = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? "glass-dark py-3 shadow-lg shadow-black/20" : "py-5"
      }`}
    >
      <div className="container flex items-center justify-between">
        <a
          href="#home"
          className="text-base font-extrabold tracking-tight"
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: "#F6C667" }}
        >
          Aryan<span style={{ color: "#A8F0C6" }}>.</span>
        </a>

        {/* Desktop */}
        <ul className="hidden md:flex items-center gap-7">
          {links.map(({ label, href }) => (
            <li key={label}>
              <a
                href={href}
                className="text-sm font-medium transition-colors duration-200"
                style={{ color: "rgba(248,245,238,0.6)" }}
                onMouseEnter={e => e.target.style.color = "#F8F5EE"}
                onMouseLeave={e => e.target.style.color = "rgba(248,245,238,0.6)"}
              >
                {label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="#contact"
              className="px-5 py-2 rounded-full text-sm font-semibold transition-opacity hover:opacity-85"
              style={{ background: "#F6C667", color: "#0F2A1F" }}
            >
              Hire me
            </a>
          </li>
        </ul>

        {/* Mobile burger */}
        <button
          className="md:hidden flex flex-col justify-center gap-[5px] w-8 h-8"
          onClick={() => setOpen(o => !o)}
          aria-label="Toggle menu"
        >
          <span className={`block h-px bg-[#F8F5EE] transition-all duration-300 ${open ? "rotate-45 translate-y-[6px]" : ""}`} />
          <span className={`block h-px bg-[#F8F5EE] transition-all duration-300 ${open ? "opacity-0" : ""}`} />
          <span className={`block h-px bg-[#F8F5EE] transition-all duration-300 ${open ? "-rotate-45 -translate-y-[6px]" : ""}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="glass-dark md:hidden mt-2 mx-4 rounded-2xl px-6 py-5 flex flex-col gap-5">
          {links.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="text-base font-medium"
              style={{ color: "rgba(248,245,238,0.8)" }}
              onClick={() => setOpen(false)}
            >
              {label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
