function frameSrc(index) {
  return `/frames/frame-${String(index + 1).padStart(4, "0")}.jpg`;
}

export default function PageBackground({ frameIndex = 0, scrollDark = 0 }) {
  return (
    <div className="page-bg" aria-hidden="true">
      <img
        className="page-bg-video"
        src={frameSrc(frameIndex)}
        alt=""
      />
      <div className="page-bg-overlay-left" />
      <div
        className="page-bg-overlay-scroll"
        style={{ opacity: scrollDark * 0.72 }}
      />
    </div>
  );
}
