import { useRef, useEffect } from "react";

export default function HeroSection() {
  const videoRef   = useRef(null);
  const rafRef     = useRef(null);
  const targetTime = useRef(0);

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
      className="relative w-screen h-screen overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      <video
        ref={videoRef}
        src="/hero.mp4"
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Left fade — covers only left ~40% so creature in center/right stays visible */}
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(to right, rgba(15,42,31,0.97) 0%, rgba(15,42,31,0.85) 25%, rgba(15,42,31,0.2) 50%, transparent 65%)" }}
      />
      {/* Bottom fade into next section */}
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(to top, #0F2A1F 0%, transparent 30%)" }}
      />
      {/* Top fade for nav readability */}
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(to bottom, rgba(15,42,31,0.4) 0%, transparent 20%)" }}
      />

      {/* Content — left third, vertically centered, creature in center stays clear */}
      <div
        className="absolute inset-0 flex flex-col justify-center"
        style={{ paddingInline: "clamp(24px, 5vw, 80px)", maxWidth: "520px" }}
      >
        {/* Status pill */}
        <div className="glass inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full w-fit mb-6">
          <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#A8F0C6" }} />
          <span className="text-xs font-medium" style={{ color: "#A8F0C6" }}>Available for work</span>
        </div>

        {/* Name — constrained to left half so it never overlaps the creature */}
        <h1
          className="font-extrabold tracking-tight leading-[1.05] mb-5"
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: "clamp(2.8rem, 6vw, 6rem)",
            color: "#F8F5EE",
            maxWidth: "10ch",
          }}
        >
          Hi, I'm{" "}
          <span style={{ color: "#F6C667" }}>Aryan</span>
        </h1>

        {/* Subtitle */}
        <p
          className="text-sm leading-relaxed mb-8"
          style={{ color: "rgba(248,245,238,0.6)", maxWidth: "40ch" }}
        >
          Full stack developer building high-performance systems and
          immersive web experiences — from backend APIs to polished UIs.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap gap-3 mb-10">
          <a
            href="#projects"
            className="px-6 py-2.5 rounded-full text-sm font-semibold transition-all hover:opacity-90 hover:scale-105 active:scale-95"
            style={{ background: "#F6C667", color: "#0F2A1F" }}
          >
            View projects
          </a>
          <a
            href="#contact"
            className="glass px-6 py-2.5 rounded-full text-sm font-semibold transition-all hover:scale-105 active:scale-95"
            style={{ color: "#F8F5EE" }}
          >
            Get in touch
          </a>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap gap-8">
          {[
            { val: "5+",         label: "Projects shipped" },
            { val: "Full stack", label: "Specialisation" },
            { val: "Open",       label: "To new work" },
          ].map(({ val, label }) => (
            <div key={label}>
              <p className="text-lg font-bold" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: "#FFD95A" }}>{val}</p>
              <p className="text-xs mt-0.5" style={{ color: "rgba(248,245,238,0.4)" }}>{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-6 right-10 flex flex-col items-center gap-2 opacity-35">
        <span className="text-xs tracking-widest" style={{ color: "#F8F5EE", writingMode: "vertical-rl" }}>scroll</span>
        <div className="w-px h-8" style={{ background: "linear-gradient(to bottom, #F6C667, transparent)" }} />
      </div>
    </section>
  );
}
