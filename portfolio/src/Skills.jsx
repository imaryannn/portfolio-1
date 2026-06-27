import FadeIn from "./FadeIn";

const categories = [
  { label: "Frontend",          color: "#7ED7FF", skills: ["JavaScript (ES6+)", "TypeScript", "React", "Next.js", "HTML5", "CSS3"] },
  { label: "Backend & network", color: "#A8F0C6", skills: ["Node.js", "Express.js", "Socket.io", "WebSocket", "REST APIs", "OAuth / JWT"] },
  { label: "Data & storage",    color: "#F6C667", skills: ["MongoDB", "MongoDB Streams", "Redis", "SQLite", "BullMQ"] },
  { label: "Realtime & media",  color: "#FFD95A", skills: ["WebRTC", "Web Workers", "Binary Streams", "YouTube API", "Telegram API"] },
  { label: "Tools & APIs",      color: "#A8F0C6", skills: ["PDF.js API", "Groq API", "Tavily", "Gmail API", "Git"] },
];

export default function Skills() {
  return (
    <section id="skills" className="section">
      <div className="container">

        <FadeIn style={{ marginBottom: "64px" }}>
          <p className="section-label">Expertise</p>
          <h2 className="section-title">Skills &amp; technologies</h2>
        </FadeIn>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "24px",
          }}
        >
          {categories.map(({ label, color, skills }, i) => (
            <FadeIn key={label} delay={i * 80} from="bottom">
              <div
                className="glass-card"
                style={{ borderRadius: "24px", padding: "36px", height: "100%" }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "28px" }}>
                  <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: color, flexShrink: 0 }} />
                  <h3
                    style={{
                      fontSize: "14px",
                      fontWeight: 600,
                      color: "rgba(248,245,238,0.75)",
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                    }}
                  >
                    {label}
                  </h3>
                </div>

                <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                  {skills.map(s => (
                    <span
                      key={s}
                      style={{
                        fontSize: "13px",
                        fontWeight: 500,
                        padding: "8px 16px",
                        borderRadius: "99px",
                        background: "rgba(255,255,255,0.05)",
                        border: `1px solid ${color}1A`,
                        color: "rgba(248,245,238,0.75)",
                      }}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
