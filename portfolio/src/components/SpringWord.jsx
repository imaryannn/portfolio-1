import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

const DAMP = 0.12;

export default function SpringWord({ text = "BUILDING." }) {
  const wrapRef = useRef(null);
  const lettersRef = useRef([]);
  const reduced = useReducedMotion();

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap || reduced) return;

    const els = lettersRef.current.filter(Boolean);
    const springs = els.map(() => ({ x: 0, y: 0, r: 0, s: 1 }));
    const target = { x: 0, y: 0 };
    let raf = 0;

    const onMove = (e) => {
      const r = wrap.getBoundingClientRect();
      target.x = e.clientX - (r.left + r.width / 2);
      target.y = e.clientY - (r.top + r.height / 2);
    };

    const onLeave = () => {
      target.x = 0;
      target.y = 0;
    };

    wrap.addEventListener("mousemove", onMove);
    wrap.addEventListener("mouseleave", onLeave);

    const loop = () => {
      els.forEach((el, i) => {
        const s = springs[i];
        const isDot = el.textContent === ".";
        const nudge = isDot ? 0.5 : 1;
        const tx = Math.max(-3, Math.min(3, target.x * 0.06 * nudge * (0.75 + (i % 3) * 0.15)));
        const ty = Math.max(-2, Math.min(2, target.y * 0.05 * nudge * (0.7 + (i % 2) * 0.2)));
        const tr = Math.max(-1.5, Math.min(1.5, target.x * 0.012 * (i % 2 ? -1 : 1)));
        const ts = 1 + Math.min(0.03, Math.abs(target.x) * 0.0002);

        s.x += (tx - s.x) * DAMP;
        s.y += (ty - s.y) * DAMP;
        s.r += (tr - s.r) * DAMP;
        s.s += (ts - s.s) * DAMP;

        el.style.transform = `translate3d(${s.x.toFixed(2)}px, ${s.y.toFixed(2)}px, 0) rotate(${s.r.toFixed(2)}deg) scale(${s.s.toFixed(3)})`;
      });
      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      wrap.removeEventListener("mousemove", onMove);
      wrap.removeEventListener("mouseleave", onLeave);
    };
  }, [reduced]);

  return (
    <span ref={wrapRef} className="hero-word-spring">
      {text.split("").map((letter, i) => (
        <span
          key={i}
          ref={(el) => {
            lettersRef.current[i] = el;
          }}
          className="hero-letter"
        >
          {letter}
        </span>
      ))}
    </span>
  );
}
