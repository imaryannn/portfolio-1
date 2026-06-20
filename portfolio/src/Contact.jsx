import { useState } from "react";

const meta = [
  { label: "Response",     val: "Direct email reply" },
  { label: "Availability", val: "Open to new projects" },
  { label: "Turnaround",   val: "1–2 business days" },
];

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }));

  return (
    <section id="contact" className="section">
      <div className="container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "clamp(40px, 7vw, 112px)",
            alignItems: "center",
          }}
        >

          {/* Left — info */}
          <div>
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
                <div
                  key={label}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderRadius: "16px",
                    padding: "18px 24px",
                    background: "rgba(29,77,58,0.18)",
                    border: "1px solid rgba(255,255,255,0.055)",
                  }}
                >
                  <span style={{ fontSize: "13px", fontWeight: 500, color: "rgba(168,240,198,0.55)" }}>{label}</span>
                  <span style={{ fontSize: "14px", fontWeight: 600, color: "#F8F5EE" }}>{val}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — form */}
          <div
            className="glass-card"
            style={{ borderRadius: "28px", padding: "48px" }}
          >
            {sent ? (
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
                onSubmit={e => { e.preventDefault(); setSent(true); }}
                style={{ display: "flex", flexDirection: "column", gap: "24px" }}
              >
                {[
                  { id: "name",  label: "Your name",  type: "text",  placeholder: "Aryan" },
                  { id: "email", label: "Email",       type: "email", placeholder: "you@example.com" },
                ].map(({ id, label, type, placeholder }) => (
                  <div key={id} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    <label style={{ fontSize: "13px", fontWeight: 500, color: "rgba(248,245,238,0.45)" }}>{label}</label>
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
                        color: "#F8F5EE",
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(255,255,255,0.09)",
                        borderRadius: "14px",
                        outline: "none",
                        transition: "border-color 0.2s",
                      }}
                      onFocus={e => e.target.style.borderColor = "rgba(246,198,103,0.4)"}
                      onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.09)"}
                    />
                  </div>
                ))}

                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  <label style={{ fontSize: "13px", fontWeight: 500, color: "rgba(248,245,238,0.45)" }}>Message</label>
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
                      color: "#F8F5EE",
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.09)",
                      borderRadius: "14px",
                      outline: "none",
                      resize: "none",
                      transition: "border-color 0.2s",
                    }}
                    onFocus={e => e.target.style.borderColor = "rgba(246,198,103,0.4)"}
                    onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.09)"}
                  />
                </div>

                <button
                  type="submit"
                  style={{
                    width: "100%",
                    padding: "16px",
                    marginTop: "4px",
                    borderRadius: "14px",
                    fontSize: "15px",
                    fontWeight: 600,
                    background: "#F6C667",
                    color: "#0F2A1F",
                    border: "none",
                    cursor: "pointer",
                    transition: "opacity 0.2s, transform 0.15s",
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.opacity = "0.9"; e.currentTarget.style.transform = "scale(1.01)"; }}
                  onMouseLeave={e => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "scale(1)"; }}
                >
                  Send message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
