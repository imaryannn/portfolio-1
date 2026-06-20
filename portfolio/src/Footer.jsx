export default function Footer() {
  return (
    <footer className="py-12" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
      <div className="container flex flex-col sm:flex-row items-center justify-between gap-6">
        <p
          className="font-extrabold text-base tracking-tight"
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: "#F6C667" }}
        >
          Aryan<span style={{ color: "#A8F0C6" }}>.</span>
        </p>

        <div className="flex gap-7">
          {[
            { label: "GitHub",   href: "https://github.com" },
            { label: "LinkedIn", href: "https://linkedin.com" },
          ].map(({ label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium transition-colors duration-200"
              style={{ color: "rgba(248,245,238,0.4)" }}
              onMouseEnter={e => e.target.style.color = "#F8F5EE"}
              onMouseLeave={e => e.target.style.color = "rgba(248,245,238,0.4)"}
            >
              {label}
            </a>
          ))}
        </div>

        <p className="text-xs" style={{ color: "rgba(248,245,238,0.22)" }}>
          © {new Date().getFullYear()} Aryan. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
