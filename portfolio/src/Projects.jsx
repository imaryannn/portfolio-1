import { useEffect, useState } from "react";
import SlideIn from "./SlideIn";
import { fetchProjects } from "./api";

const FALLBACK = [
  {
    category: "Video calling", name: "ZyroMeet", accent: "#7ED7FF",
    desc: "Browser-based video calling using WebRTC for peer-to-peer media and WebSockets for signaling. Low-latency A/V transport with real-time connection negotiation.",
    stack: ["WebRTC", "WebSocket", "React"], link: "#",
  },
  {
    category: "Cloud storage", name: "TelStorage", accent: "#A8F0C6",
    desc: "Unlimited cloud storage built on Telegram's infrastructure. Google Drive-style interface — upload, organise, search and access files from any device, free forever.",
    stack: ["Next.js", "TypeScript", "Telegram API"], link: "#",
  },
  {
    category: "AI platform", name: "Orian", accent: "#FFD95A",
    desc: "Goal-driven multi-agent AI. Input a goal — specialised agents autonomously plan, research, reason and deliver completed work without human intervention.",
    stack: ["Node.js", "React", "Groq API", "BullMQ", "Redis", "Socket.io"], link: "#",
  },
  {
    category: "Real-time chat", name: "NodeChat", accent: "#F6C667",
    desc: "Chat app built on Node.js and Socket.io with bidirectional WebSocket connections, room-based messaging and live user presence on a persistent Express server.",
    stack: ["Express.js", "MongoDB", "Socket.io"], link: "#",
  },
  {
    category: "Browser utility", name: "WPDF Toolkit", accent: "#A8F0C6",
    desc: "Client-side PDF processor using Web Workers to compress, encrypt and manipulate PDF binaries entirely in the browser — no uploads, no server.",
    stack: ["Web Workers", "PDF.js API", "Binary Streams"], link: "#",
  },
  {
    category: "Email client", name: "Prioramail", accent: "#7ED7FF",
    desc: "Minimal email platform with OAuth/JWT authentication, full inbox management and Gmail API integration with a clean, distraction-free UI.",
    stack: ["Express", "MongoDB", "OAuth/JWT", "Gmail API"], link: "#",
  },
  {
    category: "Watch together", name: "Syncyt", accent: "#F6C667",
    desc: "Synchronized media platform — watch YouTube videos with friends in real time, with live chat and presence powered by Socket.io.",
    stack: ["Socket.io", "Node.js", "YouTube API"], link: "#",
  },
];

const ACCENTS = ["#7ED7FF", "#A8F0C6", "#FFD95A", "#F6C667", "#A8F0C6", "#7ED7FF", "#F6C667"];

export default function Projects() {
  const [projects, setProjects] = useState(FALLBACK);

  useEffect(() => {
    fetchProjects().then(data => {
      if (data.length > 0) {
        setProjects(data.map((p, i) => ({
          category: p.category,
          name: p.name,
          desc: p.description,
          stack: p.techStack || [],
          link: p.link || "#",
          accent: ACCENTS[i % ACCENTS.length],
        })));
      }
    }).catch(() => {});
  }, []);

  return (
    <section id="projects" className="section">
      <div className="container">

        <SlideIn
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            marginBottom: "64px",
            flexWrap: "wrap",
            gap: "16px",
          }}
        >
          <div>
            <div className="section-accent-bar" />
            <p className="section-label">Work</p>
            <h2 className="section-title">Featured projects</h2>
          </div>
          <p style={{ fontSize: "14px", color: "rgba(248,245,238,0.35)", fontWeight: 500 }}>
            {projects.length} projects shipped
          </p>
        </SlideIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {projects.map((p, i) => (
            <SlideIn key={p.name} delay={i * 80} from="bottom">
              <div className="project-card" style={{ borderTopColor: p.accent }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "24px" }}>
                  <span
                    style={{
                      fontSize: "11px",
                      fontWeight: 600,
                      letterSpacing: "0.05em",
                      textTransform: "uppercase",
                      color: p.accent,
                    }}
                  >
                    {p.category}
                  </span>
                  <span
                    style={{
                      width: "8px", height: "8px", borderRadius: "50%",
                      background: p.accent,
                      opacity: 0.4,
                      flexShrink: 0,
                    }}
                  />
                </div>

                <h3
                  style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontSize: "22px",
                    fontWeight: 700,
                    color: "#F8F5EE",
                    marginBottom: "14px",
                    lineHeight: 1.2,
                  }}
                >
                  {p.name}
                </h3>

                <p
                  style={{
                    fontSize: "14px",
                    lineHeight: "1.75",
                    color: "rgba(248,245,238,0.5)",
                    marginBottom: "28px",
                    flexGrow: 1,
                  }}
                >
                  {p.desc}
                </p>

                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "24px" }}>
                  {p.stack.map(s => (
                    <span
                      key={s}
                      style={{
                        fontSize: "12px",
                        padding: "5px 12px",
                        borderRadius: "99px",
                        background: "rgba(255,255,255,0.05)",
                        border: "1px solid rgba(255,255,255,0.06)",
                        color: "rgba(248,245,238,0.52)",
                      }}
                    >
                      {s}
                    </span>
                  ))}
                </div>

                <a
                  href="#"
                  style={{
                    fontSize: "13px",
                    fontWeight: 600,
                    color: p.accent,
                    textDecoration: "none",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    transition: "gap 0.2s ease, opacity 0.2s ease",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.gap = "10px"; e.currentTarget.style.opacity = "0.7"; }}
                  onMouseLeave={e => { e.currentTarget.style.gap = "6px"; e.currentTarget.style.opacity = "1"; }}
                >
                  View project →
                </a>
              </div>
            </SlideIn>
          ))}
        </div>
      </div>
    </section>
  );
}
