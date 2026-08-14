import { useEffect, useRef, useState } from "react";
import lottie from "lottie-web/build/player/lottie_light.min.js";
import { useReducedMotion } from "framer-motion";

const INK = [0.0667, 0.0667, 0.0667, 1];
const CREAM = [0.9608, 0.9294, 0.7882, 1];

function swatch(c) {
  return c.map((v) => Math.round(v * 1000) / 1000).join(",");
}

function paint(data) {
  const walk = (node) => {
    if (!node || typeof node !== "object") return;
    if (Array.isArray(node)) {
      node.forEach(walk);
      return;
    }
    if (node.ty === "fl" && node.c && Array.isArray(node.c.k) && node.c.k.length >= 3) {
      const s = swatch(node.c.k);
      const ink = s === "0.341,0.106,0.184" || s === "0.1,0.09,0.11" || s === "0.1,0.09,0.11,1";
      const cream = s === "1,1,1" || s === "1,1,1,1";
      if (ink) node.c.k = node.c.k.length === 4 ? INK.slice() : INK.slice(0, 3);
      else if (cream) node.c.k = node.c.k.length === 4 ? CREAM.slice() : CREAM.slice(0, 3);
    }
    Object.values(node).forEach(walk);
  };
  walk(data);
  return data;
}

export default function HeroLottie() {
  const ref = useRef(null);
  const [data, setData] = useState(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    let alive = true;
    fetch("/scene-1.json")
      .then((r) => r.json())
      .then((raw) => {
        if (alive) setData(paint(raw));
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el || !data) return;

    const anim = lottie.loadAnimation({
      container: el,
      renderer: "svg",
      loop: true,
      autoplay: !reduced,
      animationData: data,
    });

    if (reduced) anim.goToAndStop(160, true);

    return () => anim.destroy();
  }, [data, reduced]);

  return <div ref={ref} className="hero-lottie" aria-hidden="true" />;
}
