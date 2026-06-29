import { useState } from "react";
import SlideIn from "./SlideIn";

const meta = [
  { label: "Response",     val: "Direct email reply" },
  { label: "Availability", val: "Open to new projects" },
  { label: "Turnaround",   val: "1–2 business days" },
];

export default function Contact() {
  const [status, setStatus] = useState("idle");
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }));

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
    <section id="contact" className="section">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[clamp(40px,7vw,112px)]" style={{ alignItems: "center" }}>
          <SlideIn delay={100} from="left">
            <div className="section-accent-bar" />
            <p className="section-label">Contact</p>
            <h2
              className="section-title"
              style={{ marginBottom: "24px" }}
            >
              Let's build<br />
              <span style={{ color: "#F6C667" }}>something great.</span>
            </h2>
            <p
              style={{
                fontSize: "17px",
                lineHeight: "1.75",
                color: "rgba(248,245,238,0.52)",
                maxWidth: "44ch",
                marginBottom: "52px",
              }}
            >
              Have a project in mind or just want to chat? Drop a message and I'll get back to you directly.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              {meta.map(({ label, val }) => (
                <div key={label} className="contact-meta">
                  <span style={{ fontSize: "13px", fontWeight: 500, color: "rgba(168,240,198,0.55)" }}>{label}</span>
                  <span style={{ fontSize: "14px", fontWeight: 600, color: "#F8F5EE" }}>{val}</span>
                </div>
              ))}
            </div>
          </SlideIn>

          <SlideIn delay={200} from="right">
            <div
              className="glass-card"
              style={{ borderRadius: "28px", padding: "clamp(24px, 4vw, 48px)" }}
            >
              {status === "sent" ? (
                <div style={{ padding: "48px 0", display: "flex", flexDirection: "column", alignItems: "center", gap: "16px", textAlign: "center" }}>
                  <div
                    style={{
                      width: "52px", height: "52px", borderRadius: "50%",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: "20px",
                      background: "rgba(168,240,198,0.08)",
                      border: "1px solid rgba(168,240,198,0.22)",
                      color: "#A8F0C6",
                    }}
                  >
                    ✓
                  </div>
                  <p style={{ fontSize: "18px", fontWeight: 700, color: "#F8F5EE", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Message sent!</p>
                  <p style={{ fontSize: "14px", color: "rgba(248,245,238,0.42)" }}>I'll get back to you within 1–2 days.</p>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  style={{ display: "flex", flexDirection: "column", gap: "24px" }}
                >
                  {[
                    { id: "name",  label: "Your name",  type: "text",  placeholder: "Enter name" },
                    { id: "email", label: "Email",       type: "email", placeholder: "you@example.com" },
                  ].map(({ id, label, type, placeholder }) => (
                    <div key={id} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                      <label style={{ fontSize: "13px", fontWeight: 500, color: "rgba(255,255,255,0.7)" }}>{label}</label>
                      <input
                        type={type}
                        required
                        placeholder={placeholder}
                        value={form[id]}
                        onChange={set(id)}
                        style={{
                          width: "100%",
                          padding: "15px 18px",
                          fontSize: "15px",
                          color: "#fff",
                          background: "rgba(255,255,255,0.08)",
                          border: "1px solid rgba(255,255,255,0.18)",
                          borderRadius: "14px",
                          outline: "none",
                          transition: "border-color 0.2s, box-shadow 0.2s",
                        }}
                        onFocus={e => { e.target.style.borderColor = "rgba(246,198,103,0.5)"; e.target.style.boxShadow = "0 0 0 3px rgba(246,198,103,0.08)"; }}
                        onBlur={e => { e.target.style.borderColor = "rgba(255,255,255,0.18)"; e.target.style.boxShadow = "none"; }}
                      />
                    </div>
                  ))}

                  <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    <label style={{ fontSize: "13px", fontWeight: 500, color: "rgba(255,255,255,0.7)" }}>Message</label>
                    <textarea
                      required
                      rows={5}
                      placeholder="Tell me about your project…"
                      value={form.message}
                      onChange={set("message")}
                      style={{
                        width: "100%",
                        padding: "15px 18px",
                        fontSize: "15px",
                        color: "#fff",
                        background: "rgba(255,255,255,0.08)",
                        border: "1px solid rgba(255,255,255,0.18)",
                        borderRadius: "14px",
                        outline: "none",
                        resize: "none",
                        transition: "border-color 0.2s, box-shadow 0.2s",
                      }}
                      onFocus={e => { e.target.style.borderColor = "rgba(246,198,103,0.5)"; e.target.style.boxShadow = "0 0 0 3px rgba(246,198,103,0.08)"; }}
                      onBlur={e => { e.target.style.borderColor = "rgba(255,255,255,0.18)"; e.target.style.boxShadow = "none"; }}
                    />
                  </div>

                  {status === "error" && (
                    <p style={{ fontSize: "13px", color: "#FF6B6B", textAlign: "center" }}>
                      Something went wrong. Try again or email me directly.
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === "sending"}
                    style={{
                      width: "100%",
                      padding: "16px",
                      marginTop: "4px",
                      borderRadius: "14px",
                      fontSize: "15px",
                      fontWeight: 600,
                      background: status === "sending" ? "rgba(246,198,103,0.5)" : "#F6C667",
                      color: "#0F2A1F",
                      border: "none",
                      cursor: status === "sending" ? "not-allowed" : "pointer",
                      transition: "opacity 0.2s, transform 0.15s, background 0.2s, box-shadow 0.2s",
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                    }}
                    onMouseEnter={e => { if (status !== "sending") { e.currentTarget.style.opacity = "0.9"; e.currentTarget.style.transform = "scale(1.01)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(246,198,103,0.2)"; }}}
                    onMouseLeave={e => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "none"; }}
                  >
                    {status === "sending" ? "Sending…" : "Send message"}
                  </button>
                </form>
              )}
            </div>
          </SlideIn>
        </div>
      </div>
    </section>
  );
}
