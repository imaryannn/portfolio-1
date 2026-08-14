import Reveal from "./Reveal";
import Marquee from "./Marquee";

export default function Intro() {
  return (
    <>
      <Marquee
        items={["Build", "Create", "Ship", "Repeat"]}
        style={{ borderTop: "1px solid rgba(17,17,17,0.85)", borderBottom: "1px solid rgba(17,17,17,0.85)", padding: "22px 0", margin: "0 0 clamp(72px, 10vw, 168px)" }}
      />

      <section id="intro" className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <Reveal>
            <div className="intro-top">
              <span className="label-mono">( 01 ) — Who I am</span>
              <span className="label-mono">ARYAN — BUILDER · 17</span>
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <h2 className="display display--lg intro-title" style={{ textTransform: "none" }}>
              I turn ideas
              <br />
              into <em className="display--italic">real</em>
              <br />
              products<span style={{ color: "transparent", WebkitTextStroke: "1.5px rgba(17,17,17,0.9)" }}>.</span>
            </h2>
          </Reveal>

          <div className="intro-grid">
            <Reveal delay={0.1}>
              <p className="body-text intro-copy">
                I'm Aryan — 17, and I build complete products from the
                database to the interface. Realtime systems, AI-powered tools, and web
                experiences that feel fast, feel considered, and ship.
              </p>
            </Reveal>

            <Reveal delay={0.18}>
              <ul className="intro-facts">
                <li>ARYAN — BUILDER</li>
                <li>END-TO-END — 17</li>
                <li>BASED ONLINE — WORKS ANYWHERE</li>
              </ul>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
