import { useEffect, useRef, useState } from "react";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

const mediaPath = `${import.meta.env.BASE_URL}showreel/portfolio-showreel`;

export default function Showreel() {
  const videoRef = useRef(null);
  const [soundOn, setSoundOn] = useState(true);

  const trackRef = useRef(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: trackRef, offset: ["start start", "end end"] });
  const inset = useTransform(scrollYProgress, [0, 0.78], ["10%", "0%"]);

  useEffect(() => {
    const video = videoRef.current;
    if (!("IntersectionObserver" in window)) return;

    let inView = false;
    let blocked = false;

    function startPlayback() {
      blocked = false;
      video.play().catch((error) => {
        if (!inView || error.name !== "NotAllowedError") return;
        blocked = true;
      });
    }

    function retryPlayback(event) {
      if (blocked && !event.composedPath().includes(video)) startPlayback();
    }

    function clearPlaybackBlock() {
      blocked = false;
    }

    const observer = new IntersectionObserver(([entry]) => {
      const visible = entry.intersectionRatio >= 0.5;
      if (visible === inView) return;
      inView = visible;
      if (!visible) {
        blocked = false;
        video.pause();
      } else {
        startPlayback();
      }
    }, { threshold: 0.5 });

    observer.observe(video);
    video.addEventListener("playing", clearPlaybackBlock);
    window.addEventListener("click", retryPlayback);
    window.addEventListener("keydown", retryPlayback);
    return () => {
      inView = false;
      observer.disconnect();
      video.removeEventListener("playing", clearPlaybackBlock);
      window.removeEventListener("click", retryPlayback);
      window.removeEventListener("keydown", retryPlayback);
      video.pause();
    };
  }, []);

  function toggleSound() {
    const video = videoRef.current;
    if (video.muted || video.volume === 0) {
      if (video.volume === 0) video.volume = 1;
      video.muted = false;
    } else {
      video.muted = true;
    }
  }

  return (
    <section id="showreel" className="showreel" aria-labelledby="showreel-title">
      <div className="container showreel__header">
        <h2 id="showreel-title" className="display display--md">
          Show<em className="display--italic">reel</em>
        </h2>
      </div>
      <div className="showreel__track" ref={trackRef}>
        <div className="showreel__stage">
          <motion.div className="showreel__frame" style={reducedMotion ? undefined : { inset }}>
            <button
              type="button"
              className="showreel__sound label-mono"
              role="switch"
              aria-label="Showreel sound"
              aria-checked={soundOn}
              aria-controls="showreel-video"
              onClick={toggleSound}
            >
              Sound
              <span className="showreel__switch" aria-hidden="true" />
            </button>
            <video
              ref={videoRef}
              id="showreel-video"
              className="showreel__video"
              aria-label="Aryan’s portfolio showreel"
              controls
              playsInline
              preload="metadata"
              width="1920"
              height="1080"
              poster={`${mediaPath}.webp`}
              src={`${mediaPath}.mp4`}
              onVolumeChange={({ currentTarget }) => {
                setSoundOn(!currentTarget.muted && currentTarget.volume > 0);
              }}
            >
              <a href={`${mediaPath}.mp4`}>Download the portfolio showreel</a>
            </video>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
