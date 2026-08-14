const COPIES = 4;

export default function Marquee({ items, className = "", outline = false, style }) {
  const words = items.join(" ");
  const render = (key) => (
    <span key={key} aria-hidden={key > 0}>
      {items.map((w, i) => (
        <span
          key={i}
          style={{
            fontFamily: "'Archivo', sans-serif",
            fontWeight: 800,
            textTransform: "uppercase",
            letterSpacing: "-0.02em",
            fontSize: "clamp(1.4rem, 4vw, 3rem)",
            lineHeight: 1,
            color: outline ? "transparent" : "inherit",
            WebkitTextStroke: outline ? "1px currentColor" : "none",
          }}
        >
          {w}
          <span style={{ display: "inline-block", marginLeft: "0.35em", color: "inherit" }}>✦</span>
        </span>
      ))}
    </span>
  );

  return (
    <div className={`marquee ${className}`} style={style} aria-label={words}>
      <div className="marquee__track">
        {Array.from({ length: COPIES }, (_, i) => render(i))}
      </div>
    </div>
  );
}
