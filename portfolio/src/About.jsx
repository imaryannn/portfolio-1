import SlideIn from "./SlideIn";

const facts = [
  { label: "Stack",    val: "Node.js · React · MongoDB" },
  { label: "Focus",    val: "Full stack web systems" },
  { label: "Shipping", val: "Projects, tools & interfaces" },
  { label: "Status",   val: "Ready to build" },
];

const techs = ["React", "Node.js", "MongoDB", "Express", "Socket.io", "WebRTC", "TypeScript", "Next.js"];

export default function About() {
  return (
    <section id="about" className="section">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[clamp(40px,6vw,96px)]" style={{ alignItems: "start" }}>
          {/* Left — header + prose */}
          <SlideIn from="left" style={{ paddingTop: "clamp(40px, 8vw, 120px)" }}>
            <div className="section-accent-bar" />
            <p className="section-label">About me</p>
            <h2 className="section-title" style={{ maxWidth: "18ch", marginBottom: "40px" }}>
              Building reliable<br />
              <span style={{ color: "#F6C667" }}>products that last.</span>
            </h2>
            <p
              style={{
                fontSize: "18px",
                lineHeight: "1.75",
                color: "rgba(248,245,238,0.82)",
                marginBottom: "20px",
                maxWidth: "56ch",
              }}
            >
              I build scalable, distributed, production-grade systems that work under pressure.
            </p>
            <p
              style={{
                fontSize: "16px",
                lineHeight: "1.8",
                color: "rgba(248,245,238,0.48)",
                marginBottom: "48px",
                maxWidth: "56ch",
              }}
            >
              Node.js backends, REST APIs, WebSocket servers, MongoDB pipelines, and front-end
              interfaces that are fast and functional. I don't just make things look good —
              I make them work.
            </p>
            <a
              href="#contact"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                fontSize: "15px",
                fontWeight: 600,
                color: "#F6C667",
                textDecoration: "none",
                transition: "opacity 0.2s",
              }}
              onMouseEnter={e => e.currentTarget.style.opacity = "0.65"}
              onMouseLeave={e => e.currentTarget.style.opacity = "1"}
            >
              Let's connect →
            </a>
          </SlideIn>

          {/* Right — glass card */}
          <SlideIn delay={150} from="right" style={{ paddingTop: "clamp(40px, 8vw, 120px)", maxWidth: "420px", marginLeft: "auto" }}>
            <div className="glass-card" style={{ borderRadius: "28px", padding: "clamp(24px, 4vw, 40px)" }}>
              <div className="grid grid-cols-2 gap-[clamp(20px,3vw,32px)]" style={{ marginBottom: "36px" }}>
                {facts.map(({ label, val }) => (
                  <div key={label}>
                    <p
                      style={{
                        fontSize: "11px",
                        fontWeight: 600,
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        color: "rgba(168,240,198,0.5)",
                        marginBottom: "8px",
                      }}
                    >
                      {label}
                    </p>
                    <p style={{ fontSize: "15px", fontWeight: 600, color: "#F8F5EE", lineHeight: 1.4 }}>
                      {val}
                    </p>
                  </div>
                ))}
              </div>

              <div style={{ height: "1px", background: "rgba(255,255,255,0.07)", marginBottom: "32px" }} />

              <p
                style={{
                  fontSize: "11px",
                  fontWeight: 600,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "rgba(168,240,198,0.5)",
                  marginBottom: "16px",
                }}
              >
                Core technologies
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                {techs.map(t => (
                  <span
                    key={t}
                    className="skill-tag"
                    style={{
                      fontSize: "13px",
                      fontWeight: 500,
                      padding: "7px 14px",
                      borderRadius: "99px",
                      background: "rgba(255,255,255,0.06)",
                      color: "rgba(248,245,238,0.72)",
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </SlideIn>
        </div>
      </div>
    </section>
  );
}
