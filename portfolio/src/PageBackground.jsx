export default function PageBackground({ videoRef, scrollDark = 0 }) {
  return (
    <div className="page-bg" aria-hidden="true">
      <video
        ref={videoRef}
        className="page-bg-video"
        src="/hero.mp4"
        muted
        playsInline
        preload="auto"
      />
      <div className="page-bg-overlay-left" />
      <div
        className="page-bg-overlay-scroll"
        style={{ opacity: scrollDark * 0.72 }}
      />
    </div>
  );
}
