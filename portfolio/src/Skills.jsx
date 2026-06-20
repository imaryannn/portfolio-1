const categories = [
  { label: "Frontend",          color: "#7ED7FF", skills: ["JavaScript (ES6+)", "TypeScript", "React", "Next.js", "HTML5", "CSS3"] },
  { label: "Backend & network", color: "#A8F0C6", skills: ["Node.js", "Express.js", "Socket.io", "WebSocket", "REST APIs", "OAuth / JWT"] },
  { label: "Data & storage",    color: "#F6C667", skills: ["MongoDB", "MongoDB Streams", "Redis", "SQLite", "BullMQ"] },
  { label: "Realtime & media",  color: "#FFD95A", skills: ["WebRTC", "Web Workers", "Binary Streams", "YouTube API", "Telegram API"] },
  { label: "Tools & APIs",      color: "#A8F0C6", skills: ["PDF.js API", "Groq API", "Tavily", "Gmail API", "Git"] },
];

export default function Skills() {
  return (
    <section id="skills" className="py-24">
      <div className="container">

        <div className="mb-12">
          <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "#A8F0C6" }}>Expertise</p>
          <h2
            className="font-extrabold leading-tight tracking-tight"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "clamp(2rem, 4vw, 3.5rem)", color: "#F8F5EE" }}
          >
            Skills &amp; technologies
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map(({ label, color, skills }) => (
            <div key={label} className="glass-card rounded-3xl p-7 flex flex-col gap-5">
              <div className="flex items-center gap-2.5">
                <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: color }} />
                <h3 className="text-sm font-semibold" style={{ color: "rgba(248,245,238,0.7)" }}>{label}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {skills.map(s => (
                  <span
                    key={s}
                    className="text-xs px-3 py-1.5 rounded-full font-medium"
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      border: `1px solid ${color}20`,
                      color: "rgba(248,245,238,0.72)",
                    }}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
