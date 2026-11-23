import { useRef, useState } from "react";

const mediaPath = `${import.meta.env.BASE_URL}showreel/portfolio-showreel`;

export default function Showreel() {
  const videoRef = useRef(null);
  const [soundOn, setSoundOn] = useState(true);

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
    <section id="showreel" className="section--tight showreel" aria-labelledby="showreel-title">
      <div className="container">
        <div className="showreel__header">
          <h2 id="showreel-title" className="display display--md">
            Show<em className="display--italic">reel</em>
          </h2>
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
        </div>
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
      </div>
    </section>
  );
}
