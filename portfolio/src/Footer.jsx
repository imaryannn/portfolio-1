import FadeIn from "./FadeIn";

export default function Footer() {
  return (
    <footer style={{ position: "relative", padding: "48px 0" }}>
      <FadeIn>
        <div
          className="container"
          style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "24px" }}
        >
          <p
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 800,
              fontSize: "17px",
              color: "#F6C667",
              letterSpacing: "-0.01em",
            }}
          >
            Aryan<span style={{ color: "#A8F0C6" }}>.</span>
          </p>

          <div style={{ display: "flex", gap: "36px" }}>
            {[
              { label: "GitHub",   href: "https://github.com" },
              { label: "LinkedIn", href: "https://linkedin.com" },
            ].map(({ label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontSize: "14px", fontWeight: 500, color: "rgba(248,245,238,0.38)", textDecoration: "none", transition: "color 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.color = "#F8F5EE"}
                onMouseLeave={e => e.currentTarget.style.color = "rgba(248,245,238,0.38)"}
              >
                {label}
              </a>
            ))}
          </div>

          <p style={{ fontSize: "13px", color: "rgba(248,245,238,0.22)" }}>
            © {new Date().getFullYear()} Aryan. All rights reserved.
          </p>
        </div>
      </FadeIn>
    </footer>
  );
}
