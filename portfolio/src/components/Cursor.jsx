import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

function cursorSupported() {
  if (typeof window === "undefined") return false;
  return !window.matchMedia("(pointer: coarse)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export default function Cursor() {
  const dotRef = useRef(null);
  const viewRef = useRef(null);
  const [enabled] = useState(cursorSupported);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!enabled || reduced) return;

    const dot = dotRef.current;
    const view = viewRef.current;
    if (!dot || !view) return;

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let viewX = x;
    let viewY = y;
    let viewScale = 0;
    let viewOpacity = 0;
    let dotScale = 1;
    let dotOpacity = 1;
    let raf = null;
    let labelEl = null;
    let interactive = false;

    const onMove = (e) => {
      x = e.clientX;
      y = e.clientY;
    };

    const onOver = (e) => {
      const t = e.target.closest("a, button, [data-cursor]");
      labelEl = null;
      interactive = false;
      if (t) {
        const label = t.getAttribute("data-cursor-label");
        if (label) {
          view.textContent = label;
          labelEl = t;
        } else {
          interactive = true;
        }
        document.body.style.cursor = "none";
      }
    };

    const onOut = (e) => {
      if (e.target.closest("a, button, [data-cursor]")) {
        document.body.style.cursor = "";
      }
      labelEl = null;
      interactive = false;
    };

    const loop = () => {
      viewX += (x - viewX) * 0.16;
      viewY += (y - viewY) * 0.16;

      const viewTarget = labelEl ? 1 : 0;
      viewScale += (viewTarget - viewScale) * 0.18;
      viewOpacity += (viewTarget - viewOpacity) * 0.18;
      view.style.transform = `translate3d(${viewX}px, ${viewY}px, 0) scale(${viewScale})`;
      view.style.opacity = viewOpacity;

      const dotScaleTarget = labelEl ? 0 : interactive ? 3.2 : 1;
      dotScale += (dotScaleTarget - dotScale) * 0.18;
      dotOpacity += (labelEl ? 0 : 1 - dotOpacity) * 0.18;
      dot.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${dotScale})`;
      dot.style.opacity = dotOpacity;

      raf = requestAnimationFrame(loop);
    };

    document.body.style.cursor = "none";
    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver, { passive: true });
    document.addEventListener("mouseout", onOut, { passive: true });
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      cancelAnimationFrame(raf);
      document.body.style.cursor = "";
    };
  }, [enabled, reduced]);

  if (reduced || !enabled) return null;

  return (
    <>
      <div className="cursor-view" ref={viewRef} aria-hidden="true">VIEW</div>
      <div className="cursor-dot" ref={dotRef} aria-hidden="true" />
    </>
  );
}
