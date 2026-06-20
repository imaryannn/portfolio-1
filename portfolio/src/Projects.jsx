const projects = [
  {
    category: "Video calling",
    name: "ZyroMeet",
    accent: "#7ED7FF",
    desc: "Browser-based video calling using WebRTC for peer-to-peer media and WebSockets for signaling. Low-latency A/V transport with real-time connection negotiation.",
    stack: ["WebRTC", "WebSocket", "React"],
  },
  {
    category: "Cloud storage",
    name: "TelStorage",
    accent: "#A8F0C6",
    desc: "Unlimited cloud storage built on Telegram's infrastructure. Google Drive-style interface — upload, organise, search and access files from any device, free forever.",
    stack: ["Next.js", "TypeScript", "Telegram API"],
  },
  {
    category: "AI platform",
    name: "Orian",
    accent: "#FFD95A",
    desc: "Goal-driven multi-agent AI. Input a goal — specialised agents autonomously plan, research, reason and deliver completed work without human intervention.",
    stack: ["Node.js", "React", "Groq API", "BullMQ", "Redis", "Socket.io"],
  },
  {
    category: "Real-time chat",
    name: "NodeChat",
    accent: "#F6C667",
    desc: "Chat app built on Node.js and Socket.io with bidirectional WebSocket connections, room-based messaging and live user presence on a persistent Express server.",
    stack: ["Express.js", "MongoDB", "Socket.io"],
  },
  {
    category: "Browser utility",
    name: "WPDF Toolkit",
    accent: "#A8F0C6",
    desc: "Client-side PDF processor using Web Workers to compress, encrypt and manipulate PDF binaries entirely in the browser — no uploads, no server.",
    stack: ["Web Workers", "PDF.js API", "Binary Streams"],
  },
  {
    category: "Email client",
    name: "Prioramail",
    accent: "#7ED7FF",
    desc: "Minimal email platform with OAuth/JWT authentication, full inbox management and Gmail API integration with a clean, distraction-free UI.",
    stack: ["Express", "MongoDB", "OAuth/JWT", "Gmail API"],
  },
  {
    category: "Watch together",
    name: "Syncyt",
    accent: "#F6C667",
    desc: "Synchronized media platform — watch YouTube videos with friends in real time, with live chat and presence powered by Socket.io.",
    stack: ["Socket.io", "Node.js", "YouTube API"],
  },
];

export default function Projects() {
  return (
    <section id="projects" className="py-24">
      <div className="container">

        {/* Header */}
        <div className="mb-12">
          <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "#A8F0C6" }}>Work</p>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <h2
              className="font-extrabold leading-tight tracking-tight"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "clamp(2rem, 4vw, 3.5rem)", color: "#F8F5EE" }}
            >
              Featured projects
            </h2>
            <p className="text-sm" style={{ color: "rgba(248,245,238,0.4)" }}>
              {projects.length} projects shipped
            </p>
          </div>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((p) => (
            <div
              key={p.name}
              className="glass-card rounded-3xl p-7 flex flex-col gap-5 transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium" style={{ color: "rgba(248,245,238,0.4)" }}>{p.category}</span>
                <span className="w-2 h-2 rounded-full" style={{ background: p.accent + "99" }} />
              </div>

              <div>
                <h3
                  className="text-lg font-bold mb-2"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: "#F8F5EE" }}
                >
                  {p.name}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(248,245,238,0.5)" }}>{p.desc}</p>
              </div>

              <div className="flex flex-wrap gap-1.5 mt-auto">
                {p.stack.map(s => (
                  <span
                    key={s}
                    className="text-xs px-2.5 py-1 rounded-full"
                    style={{ background: "rgba(255,255,255,0.05)", color: "rgba(248,245,238,0.55)" }}
                  >
                    {s}
                  </span>
                ))}
              </div>

              <a
                href="#"
                className="text-xs font-semibold tracking-wide self-start transition-opacity hover:opacity-60"
                style={{ color: p.accent }}
              >
                View project →
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
