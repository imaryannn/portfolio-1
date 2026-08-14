import { useState } from "react";
import Reveal from "./Reveal";

const meta = [
  { label: "Response", val: "Direct email reply" },
  { label: "Availability", val: "Open to new projects" },
];

export default function Contact() {
  const [status, setStatus] = useState("idle");
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: "20b341cc-bebf-48dd-9167-4d4116a4e84e",
          ...form,
        }),
      });
      if (!res.ok) throw new Error("Failed to send");
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="section" style={{ paddingBottom: "clamp(72px, 10vw, 160px)" }}>
      <div className="container">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(40px, 7vw, 120px)" }} className="contact-grid">
          <div>
            <Reveal>
              <p className="label-mono" style={{ marginBottom: 20 }}>( 05 ) — Contact</p>
              <h2
                style={{
                  fontFamily: "'Archivo', sans-serif",
                  fontWeight: 800,
                  letterSpacing: "-0.035em",
                  lineHeight: 0.9,
                  textTransform: "uppercase",
                  fontSize: "clamp(2.8rem, 6.5vw, 7rem)",
                  marginBottom: "clamp(28px, 4vw, 56px)",
                }}
              >
                Got an
                <br />
                idea?
                <br />
                Let's <em className="display--italic">talk</em><span style={{ color: "transparent", WebkitTextStroke: "1.5px rgba(17,17,17,0.9)" }}>.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="body-text" style={{ maxWidth: "40ch", marginBottom: "clamp(28px, 4vw, 48px)" }}>
                Have a project in mind, or just want to build something together? Drop a
                message and I'll get back to you directly.
              </p>
              <div style={{ display: "grid", gap: 0 }}>
                {meta.map((m) => (
                  <div className="meta-block" key={m.label} style={{ borderTopWidth: 1 }}>
                    <span className="label-mono" style={{ color: "rgba(17,17,17,0.5)" }}>{m.label}</span>
                    <span style={{ fontSize: 15, fontWeight: 600 }}>{m.val}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.15} className="contact-form">
            {status === "sent" ? (
              <div
                style={{
                  border: "1px solid rgba(17,17,17,0.85)",
                  borderRadius: 14,
                  padding: "clamp(40px, 6vw, 80px)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 16,
                  textAlign: "center",
                  minHeight: "100%",
                  justifyContent: "center",
                }}
              >
                <span className="circle-btn circle-btn--lg" aria-hidden="true" style={{ borderRadius: "50%" }}>✓</span>
                <p className="display display--sm" style={{ textTransform: "none" }}>Message sent.</p>
                <p className="body-text">I'll get back to you within 1–2 days.</p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                style={{ display: "flex", flexDirection: "column", gap: 8 }}
                noValidate
              >
                <label className="label-mono" htmlFor="contact-name" style={{ marginTop: 12 }}>
                  Your name
                </label>
                <input
                  id="contact-name"
                  className="field"
                  type="text"
                  required
                  placeholder="What should I call you?"
                  value={form.name}
                  onChange={set("name")}
                />
                <label className="label-mono" htmlFor="contact-email" style={{ marginTop: 20 }}>
                  Email
                </label>
                <input
                  id="contact-email"
                  className="field"
                  type="email"
                  required
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={set("email")}
                />
                <label className="label-mono" htmlFor="contact-message" style={{ marginTop: 20 }}>
                  Message
                </label>
                <textarea
                  id="contact-message"
                  className="field"
                  rows={4}
                  required
                  placeholder="Tell me about your project…"
                  value={form.message}
                  onChange={set("message")}
                  style={{ resize: "vertical", minHeight: 110 }}
                />

                {status === "error" && (
                  <p className="label-mono" style={{ color: "#111111", marginTop: 16 }}>
                    Something went wrong — try again, or find me on GitHub.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="btn-ink"
                  style={{ alignSelf: "flex-start", marginTop: "clamp(24px, 3vw, 40px)" }}
                  data-cursor
                >
                  <span>{status === "sending" ? "Sending…" : "Send message"}</span>
                  <span className="btn-arrow" aria-hidden="true">→</span>
                </button>
              </form>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
