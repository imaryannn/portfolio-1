import Reveal from "./Reveal";
import { CAPABILITIES } from "../data";

export default function Capabilities() {
  return (
    <section id="capabilities" className="section">
      <div className="container">
        <Reveal>
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              gap: "24px",
              flexWrap: "wrap",
              marginBottom: "clamp(40px, 5vw, 72px)",
            }}
          >
            <div>
              <p className="label-mono" style={{ marginBottom: 20 }}>( 03 ) — Capabilities</p>
              <h2 className="display">What I do</h2>
            </div>
            <p className="body-text" style={{ maxWidth: "34ch", paddingBottom: 6 }}>
              Everything applied end to end — from raw protocol work to polished
              product surfaces.
            </p>
          </div>
        </Reveal>

        <div>
          {CAPABILITIES.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.04}>
              <div className="capability-row">
                <div style={{ display: "flex", flexDirection: "column", gap: 6, width: "100%" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24 }}>
                    <h3
                      style={{
                        fontFamily: "'Archivo', sans-serif",
                        fontWeight: 800,
                        textTransform: "uppercase",
                        letterSpacing: "-0.03em",
                        lineHeight: 0.9,
                        fontSize: "clamp(2.2rem, 6vw, 5.5rem)",
                      }}
                    >
                      {c.title}
                    </h3>
                    <span className="capability-row__arrow circle-btn" style={{ width: "clamp(40px, 4vw, 60px)", height: "clamp(40px, 4vw, 60px)", flexShrink: 0 }} aria-hidden="true">
                      ↗
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      gap: "clamp(16px, 3vw, 40px)",
                      alignItems: "flex-end",
                      flexWrap: "wrap",
                    }}
                  >
                    <p className="body-text" style={{ maxWidth: "46ch" }}>{c.desc}</p>
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                      {c.tags.map((t) => (
                        <span className="project-tag" key={t}>{t}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
