import { useRef, useEffect } from "react";

export default function HeroSection() {
  const videoRef    = useRef(null);
  const rafRef      = useRef(null);
  const targetTime  = useRef(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const onLoaded = () => { video.pause(); video.currentTime = video.duration / 2; };
    video.addEventListener("loadedmetadata", onLoaded);
    return () => video.removeEventListener("loadedmetadata", onLoaded);
  }, []);

  const handleMouseMove = (e) => {
    const video = videoRef.current;
    if (!video || !video.duration) return;
    targetTime.current = (1 - e.clientX / window.innerWidth) * video.duration;
    if (rafRef.current) return;
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null;
      const v = videoRef.current;
      if (!v) return;
      if (v.fastSeek) v.fastSeek(targetTime.current);
      else v.currentTime = targetTime.current;
    });
  };

  return (
    <section
      id="home"
      onMouseMove={handleMouseMove}
      style={{ position: "relative", width: "100vw", height: "100vh", overflow: "hidden" }}
    >
      {/* Video */}
      <video
        ref={videoRef}
        src="/hero.mp4"
        muted
        playsInline
        preload="auto"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
      />

      {/* Gradient overlays — dark on left and bottom, clear on right for creature */}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(15,42,31,0.97) 0%, rgba(15,42,31,0.7) 30%, rgba(15,42,31,0.1) 55%, transparent 70%)" }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, #0F2A1F 0%, transparent 25%)" }} />

      {/* Content */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingInline: "clamp(24px, 5vw, 96px)",
        }}
      >
        {/* Left — badge + name + subtitle */}
        <div style={{ display: "flex", flexDirection: "column", maxWidth: "380px" }}>
          <h1
            style={{
              fontFamily: "'Bitcount Grid Double', monospace",
              fontSize: "clamp(4rem, 9vw, 9rem)",
              fontWeight: 800,
              lineHeight: 0.95,
              textTransform: "uppercase",
              marginBottom: "20px",
              color: "#F8F5EE",
            }}
          >
            Hi, I'm<br /><span style={{ color: "#F6C667" }}>Aryan</span>
          </h1>

          <p
            style={{
              fontSize: "15px",
              lineHeight: 1.75,
              color: "rgba(248,245,238,0.6)",
            }}
          >
            Full stack developer building high-performance systems and
            immersive web experiences — from backend APIs to polished UIs.
          </p>
        </div>

        {/* Right — project stats */}
        <div style={{ display: "flex", flexDirection: "column", gap: "28px", maxWidth: "220px" }}>
          {[
            { val: "5+",      label: "Projects shipped",  accent: "#FFD95A" },
            { val: "Full stack", label: "Specialisation",  accent: "#A8F0C6" },
            { val: "Open",    label: "To new work",        accent: "#F6C667" },
          ].map(({ val, label, accent }) => (
            <div key={label} style={{ borderLeft: `2px solid ${accent}44`, paddingLeft: "16px" }}>
              <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "20px", fontWeight: 700, color: accent, lineHeight: 1 }}>{val}</p>
              <p style={{ fontSize: "12px", color: "rgba(248,245,238,0.45)", marginTop: "5px" }}>{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom center — CTAs */}
      <div
        style={{
          position: "absolute",
          bottom: "48px",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: "12px",
        }}
      >
        <a
          href="#projects"
          style={{
            padding: "12px 28px",
            borderRadius: "99px",
            fontSize: "14px",
            fontWeight: 600,
            background: "#F6C667",
            color: "#0F2A1F",
            textDecoration: "none",
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            transition: "opacity 0.2s",
          }}
          onMouseEnter={e => e.currentTarget.style.opacity = "0.88"}
          onMouseLeave={e => e.currentTarget.style.opacity = "1"}
        >
          View projects
        </a>
        <a
          href="#contact"
          style={{
            padding: "12px 28px",
            borderRadius: "99px",
            fontSize: "14px",
            fontWeight: 600,
            color: "#F8F5EE",
            textDecoration: "none",
            background: "rgba(255,244,214,0.07)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(246,198,103,0.18)",
            transition: "opacity 0.2s",
          }}
          onMouseEnter={e => e.currentTarget.style.opacity = "0.75"}
          onMouseLeave={e => e.currentTarget.style.opacity = "1"}
        >
          Get in touch
        </a>
      </div>


    </section>
  );
}
