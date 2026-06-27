import { useEffect, useRef, useState } from "react";

export default function FadeIn({ children, from = "bottom", delay = 0, style = {}, ...props }) {
  const ref = useRef(null);
  const [progress, setProgress] = useState(-1);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = 1 - (rect.bottom / (vh + rect.height));
      setProgress(p);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const entering = progress < 0;
  const leaving = progress > 0.75;

  const inAmount = entering ? 1 : 0;
  const outAmount = leaving ? (progress - 0.75) / 0.25 : 0;
  const amount = Math.min(Math.max(entering ? inAmount : outAmount, 0), 1);
  const opacity = entering ? Math.max(1 - inAmount, 0) : Math.max(1 - outAmount, 0);

  const getTransform = () => {
    if (!entering && !leaving) return "translate(0,0)";
    const pct = `${amount * 100}%`;
    if (entering) {
      if (from === "left")  return `translateX(-${pct})`;
      if (from === "right") return `translateX(${pct})`;
      if (from === "top")   return `translateY(-${pct})`;
      return `translateY(${pct})`;
    }
    if (from === "left")  return `translateX(${pct})`;
    if (from === "right") return `translateX(-${pct})`;
    if (from === "top")   return `translateY(${pct})`;
    return `translateY(-${pct})`;
  };

  return (
    <div
      ref={ref}
      style={{
        opacity,
        transform: getTransform(),
        transition: `opacity 0.05s linear, transform 0.05s linear`,
        transitionDelay: entering ? `${delay}ms` : "0ms",
        willChange: "transform, opacity",
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
}
