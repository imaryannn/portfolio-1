import SlideIn from "./SlideIn";

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

        <SlideIn style={{ marginBottom: "64px" }}>
          <div className="section-accent-bar" />
          <p className="section-label">Expertise</p>
          <h2 className="section-title">Skills &amp; technologies</h2>
        </SlideIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map(({ label, color, skills }, i) => (
            <SlideIn key={label} delay={i * 80} from={["left", "bottom", "right"][i % 3]}>
              <div
                className="project-card"
                style={{ borderTopColor: color }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "28px" }}>
                  <div
                    style={{
                      width: "10px",
                      height: "10px",
                      borderRadius: "50%",
                      background: color,
                      flexShrink: 0,
                      boxShadow: `0 0 12px ${color}44`,
                    }}
                  />
                  <h3
                    style={{
                      fontSize: "14px",
                      fontWeight: 700,
                      color: "#F8F5EE",
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      letterSpacing: "0.02em",
                    }}
                  >
                    {label}
                  </h3>
                </div>

                <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                  {skills.map(s => (
                    <span
                      key={s}
                      className="skill-tag"
                      style={{
                        borderColor: `${color}22`,
                      }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = `${color}66`; e.currentTarget.style.background = `${color}15`; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = `${color}22`; e.currentTarget.style.background = "rgba(255,255,255,0.05)"; }}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </SlideIn>
          ))}
        </div>
      </div>
    </section>
  );
}
