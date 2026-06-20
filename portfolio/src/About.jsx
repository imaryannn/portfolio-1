const facts = [
  { label: "Stack",    val: "Node.js · React · MongoDB" },
  { label: "Focus",    val: "Full stack web systems" },
  { label: "Shipping", val: "Projects, tools & interfaces" },
  { label: "Status",   val: "Ready to build" },
];

export default function About() {
  return (
    <section id="about" className="py-24">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Left */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest mb-5" style={{ color: "#A8F0C6" }}>
              About me
            </p>
            <h2
              className="font-extrabold leading-tight tracking-tight mb-6"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "clamp(2rem, 4vw, 3.5rem)", color: "#F8F5EE" }}
            >
              Building reliable<br />
              <span style={{ color: "#F6C667" }}>products that last.</span>
            </h2>
            <p className="text-base leading-relaxed mb-4" style={{ color: "rgba(248,245,238,0.75)", maxWidth: "52ch" }}>
              I build scalable, distributed, production-grade systems that work under pressure.
            </p>
            <p className="text-sm leading-relaxed mb-8" style={{ color: "rgba(248,245,238,0.45)", maxWidth: "52ch" }}>
              Node.js backends, REST APIs, WebSocket servers, MongoDB pipelines, and front-end interfaces that are fast and functional. I don't just make things look good — I make them work.
            </p>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 text-sm font-semibold transition-opacity hover:opacity-70"
              style={{ color: "#F6C667" }}
            >
              Let's connect →
            </a>
          </div>

          {/* Right */}
          <div className="glass-card rounded-3xl p-8 lg:p-10">
            <div className="grid grid-cols-2 gap-4">
              {facts.map(({ label, val }) => (
                <div key={label} className="flex flex-col gap-1.5">
                  <p className="text-xs font-medium uppercase tracking-widest" style={{ color: "rgba(168,240,198,0.5)" }}>{label}</p>
                  <p className="text-sm font-semibold leading-snug" style={{ color: "#F8F5EE" }}>{val}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-8" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
              <p className="text-xs uppercase tracking-widest mb-4 font-medium" style={{ color: "rgba(168,240,198,0.5)" }}>
                Core technologies
              </p>
              <div className="flex flex-wrap gap-2">
                {["React", "Node.js", "MongoDB", "Express", "Socket.io", "WebRTC", "TypeScript", "Next.js"].map(t => (
                  <span
                    key={t}
                    className="text-xs px-3 py-1.5 rounded-full font-medium"
                    style={{ background: "rgba(255,255,255,0.06)", color: "rgba(248,245,238,0.7)" }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
