import Reveal from "./Reveal";

const meta = [
  { label: "Stack", val: "Next.js · Express · React · Node.js · MongoDB" },
  { label: "Focus", val: "Full-stack web systems" },
  { label: "Shipping", val: "Products, tools & interfaces" },
  { label: "Status", val: "Open to new work" },
];

export default function About() {
  return (
    <section id="about" className="section">
      <div className="container">
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "clamp(32px, 5vw, 72px)" }}>
          <Reveal>
            <p className="label-mono" style={{ marginBottom: 20 }}>( 04 ) — About</p>
          </Reveal>

          <div style={{ display: "grid", gridTemplateColumns: "7fr 5fr", gap: "clamp(32px, 6vw, 120px)" }} className="about-grid">
            <div>
              <Reveal delay={0.05}>
                <h2
                  style={{
                    fontFamily: "'Archivo', sans-serif",
                    fontWeight: 800,
                    letterSpacing: "-0.035em",
                    lineHeight: 0.9,
                    textTransform: "none",
                    fontSize: "clamp(2rem, 5vw, 4.75rem)",
                    marginBottom: "clamp(28px, 4vw, 56px)",
                  }}
                >
                  17-year-old
                  <br />
                  builder, shipping
                  <br />
                  <em className="display--italic">real products</em>
                  <span style={{ color: "transparent", WebkitTextStroke: "1.5px rgba(17,17,17,0.9)" }}>.</span>
                </h2>
              </Reveal>
              <Reveal delay={0.12}>
                <p className="body-text" style={{ maxWidth: "52ch" }}>
                  Node.js backends, REST APIs, WebSocket servers, MongoDB
                  pipelines and front-ends that are fast and considered. I don't just make
                  things look good; I make them work under pressure.
                </p>
              </Reveal>
            </div>

            <Reveal delay={0.18}>
              <div style={{ marginTop: "clamp(8px, 1vw, 24px)" }}>
                {meta.map((m) => (
                  <div className="meta-block" key={m.label}>
                    <span className="label-mono" style={{ color: "rgba(17,17,17,0.5)" }}>{m.label}</span>
                    <span style={{ fontSize: 15, fontWeight: 600, textAlign: "right" }}>{m.val}</span>
                  </div>
                ))}
                <p
                  className="label-mono"
                  style={{ marginTop: "clamp(20px, 3vw, 36px)", color: "rgba(17,17,17,0.5)" }}
                >
                  Currently building ambitious digital products &amp; AI-powered tools
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
