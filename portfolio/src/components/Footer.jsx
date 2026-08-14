import Reveal from "./Reveal";
import Marquee from "./Marquee";
import { SOCIALS } from "../data";
import { API_BASE } from "../api";
import { scrollToId } from "../lib/scroll";

export default function Footer() {
  const year = new Date().getFullYear();

  const go = (e, id) => {
    e.preventDefault();
    scrollToId(id);
  };

  return (
    <footer style={{ background: "#111111", color: "#F5EDC9", position: "relative", overflow: "hidden" }}>
      <Marquee
        items={["Open for work", "Let's build", "Open for work", "Let's build"]}
        outline
        style={{ borderTop: "1px solid rgba(245,237,201,0.2)", borderBottom: "1px solid rgba(245,237,201,0.2)", padding: "18px 0", color: "#F5EDC9" }}
      />

      <div className="container" style={{ paddingTop: "clamp(72px, 10vw, 140px)", paddingBottom: "clamp(32px, 4vw, 56px)" }}>
        <Reveal>
          <p className="label-mono" style={{ color: "rgba(245,237,201,0.5)", marginBottom: "clamp(28px, 4vw, 56px)" }}>
            ( 06 ) — Let's work together
          </p>
        </Reveal>

        <Reveal delay={0.05}>
          <h2 className="display display--lg footer-cta" style={{ color: "#F5EDC9" }}>
            Let's build
            <br />
            <em className="display--italic" style={{ color: "transparent", WebkitTextStroke: "1.5px #F5EDC9" }}>something.</em>
          </h2>
        </Reveal>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "clamp(20px, 3vw, 40px)",
            flexWrap: "wrap",
            marginTop: "clamp(40px, 6vw, 80px)",
          }}
        >
          <Reveal delay={0.1}>
            <a
              href="#contact"
              onClick={(e) => go(e, "#contact")}
              className="circle-btn circle-btn--lg"
              style={{ borderColor: "#F5EDC9", color: "#F5EDC9", borderRadius: "999px", padding: "0 clamp(24px, 3vw, 40px)", width: "auto", height: "clamp(72px, 8vw, 112px)" }}
              data-cursor
              data-cursor-label="TALK"
            >
              <span className="label-mono" style={{ letterSpacing: "0.22em" }}>Start a project</span>
              <span aria-hidden="true" style={{ marginLeft: 16, fontSize: 20 }}>→</span>
            </a>
          </Reveal>

          <Reveal delay={0.16}>
            <div style={{ display: "flex", flexDirection: "column", gap: 14, alignItems: "flex-end" }}>
              <a className="footer-link" href={SOCIALS.github} target="_blank" rel="noopener noreferrer" data-cursor>
                GitHub <span aria-hidden="true">↗</span>
              </a>
              <a className="footer-link" href={SOCIALS.linkedin} target="_blank" rel="noopener noreferrer" data-cursor>
                LinkedIn <span aria-hidden="true">↗</span>
              </a>
              <a className="footer-link" href={`${API_BASE}/admin/login`} target="_blank" rel="noopener noreferrer" data-cursor>
                Admin <span aria-hidden="true">↗</span>
              </a>
            </div>
          </Reveal>
        </div>

        <div
          className="hairline hairline--light"
          style={{ marginTop: "clamp(48px, 7vw, 88px)" }}
        />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 16,
            flexWrap: "wrap",
            paddingTop: 28,
          }}
        >
          <p className="label-mono" style={{ color: "rgba(245,237,201,0.45)" }}>
            © {year} Aryan — all rights reserved
          </p>
          <a
            href="#home"
            onClick={(e) => go(e, "#home")}
            className="label-mono"
            style={{ color: "rgba(245,237,201,0.55)" }}
            data-cursor
          >
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
