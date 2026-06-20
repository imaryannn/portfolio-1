import { useState } from "react";

const meta = [
  { label: "Response",     val: "Direct email reply" },
  { label: "Availability", val: "Open to new projects" },
  { label: "Turnaround",   val: "1–2 business days" },
];

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));

  const inputStyle = {
    width: "100%",
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.09)",
    borderRadius: "14px",
    padding: "12px 16px",
    fontSize: "14px",
    color: "#F8F5EE",
    outline: "none",
    transition: "border-color 0.2s",
  };

  return (
    <section id="contact" className="py-24">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* Left */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest mb-5" style={{ color: "#A8F0C6" }}>Contact</p>
            <h2
              className="font-extrabold leading-tight tracking-tight mb-5"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "clamp(2rem, 4vw, 3.5rem)", color: "#F8F5EE" }}
            >
              Let's build<br />
              <span style={{ color: "#F6C667" }}>something great.</span>
            </h2>
            <p className="text-sm leading-relaxed mb-10" style={{ color: "rgba(248,245,238,0.5)", maxWidth: "42ch" }}>
              Have a project in mind or just want to chat? Drop a message and I'll get back to you directly.
            </p>

            <div className="flex flex-col gap-3">
              {meta.map(({ label, val }) => (
                <div
                  key={label}
                  className="flex items-center justify-between rounded-2xl px-5 py-4"
                  style={{ background: "rgba(29,77,58,0.2)", border: "1px solid rgba(255,255,255,0.06)" }}
                >
                  <span className="text-xs font-medium" style={{ color: "rgba(168,240,198,0.55)" }}>{label}</span>
                  <span className="text-sm font-semibold" style={{ color: "#F8F5EE" }}>{val}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="glass-card rounded-3xl p-8 lg:p-10">
            {sent ? (
              <div className="py-16 flex flex-col items-center gap-4 text-center">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-lg"
                  style={{ background: "rgba(168,240,198,0.1)", border: "1px solid rgba(168,240,198,0.25)", color: "#A8F0C6" }}
                >
                  ✓
                </div>
                <p className="font-bold text-base" style={{ color: "#F8F5EE" }}>Message sent!</p>
                <p className="text-sm" style={{ color: "rgba(248,245,238,0.4)" }}>I'll get back to you within 1–2 days.</p>
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="flex flex-col gap-5">
                {[
                  { id: "name",  label: "Your name",  type: "text",  placeholder: "Aryan" },
                  { id: "email", label: "Email",       type: "email", placeholder: "you@example.com" },
                ].map(({ id, label, type, placeholder }) => (
                  <div key={id} className="flex flex-col gap-2">
                    <label className="text-xs font-medium" style={{ color: "rgba(248,245,238,0.45)" }}>{label}</label>
                    <input type={type} required placeholder={placeholder} value={form[id]} onChange={set(id)} style={inputStyle} />
                  </div>
                ))}

                <div className="flex flex-col gap-2">
                  <label className="text-xs font-medium" style={{ color: "rgba(248,245,238,0.45)" }}>Message</label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Tell me about your project…"
                    value={form.message}
                    onChange={set("message")}
                    style={{ ...inputStyle, resize: "none" }}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-2xl text-sm font-semibold transition-all hover:opacity-90 hover:scale-[1.01] active:scale-[0.99] mt-1"
                  style={{ background: "#F6C667", color: "#0F2A1F" }}
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
