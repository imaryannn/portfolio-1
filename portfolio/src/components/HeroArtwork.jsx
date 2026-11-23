import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

const SIZE = 640;
const RADIUS = 250;
const TAU = 2 * Math.PI;

function createRosette() {
  const path = new Path2D();

  // Use the opening showreel artwork's eight skewed ellipses.
  for (let petal = 0; petal < 8; petal++) {
    const angle = petal * TAU / 8;
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);

    for (let i = 0; i < 58; i++) {
      const sample = i * TAU / 57;
      const x = RADIUS * (0.54 + 0.455 * Math.cos(sample));
      const y = RADIUS * (0.18 * Math.sin(sample) + 0.16 * Math.cos(sample));
      const px = x * cos - y * sin;
      const py = x * sin + y * cos;
      if (i === 0) path.moveTo(px, py);
      else path.lineTo(px, py);
    }
    path.closePath();
  }

  return path;
}

function drawArtwork(ctx, rosette, seconds) {
  ctx.clearRect(0, 0, SIZE, SIZE);
  const angle = -0.18 + seconds * 0.23;
  const depthScale = RADIUS / 636;

  for (let layer = 10; layer >= 0; layer--) {
    ctx.save();
    ctx.translate(
      SIZE / 2 + layer * 4 * depthScale,
      SIZE / 2 - 12 + layer * 8 * depthScale,
    );
    ctx.rotate(angle);
    ctx.fillStyle = layer === 0 ? "#fb6547" : "#181916";
    ctx.fill(rosette);
    ctx.restore();
  }
}

export default function HeroArtwork() {
  const canvasRef = useRef(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = canvas.height = SIZE * ratio;
    ctx.scale(ratio, ratio);

    const rosette = createRosette();
    let elapsed = 0;
    drawArtwork(ctx, rosette, elapsed);
    if (reducedMotion || !("IntersectionObserver" in window)) return;

    let previous;
    let frame;

    function animate(now) {
      if (previous !== undefined) elapsed += Math.min(now - previous, 40) / 1000;
      previous = now;
      drawArtwork(ctx, rosette, elapsed);
      frame = requestAnimationFrame(animate);
    }

    const observer = new IntersectionObserver(([entry]) => {
      cancelAnimationFrame(frame);
      previous = undefined;
      if (entry.isIntersecting) frame = requestAnimationFrame(animate);
    });

    observer.observe(canvas);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [reducedMotion]);

  return <canvas ref={canvasRef} className="hero-artwork" aria-hidden="true" />;
}
