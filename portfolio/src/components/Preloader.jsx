import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const HELLOS = [
  "Hello",
  "नमस्ते",
  "నమస్తే",
  "Hola",
  "Bonjour",
  "Hallo",
  "Ciao",
  "Olá",
  "こんにちは",
  "你好",
  "안녕하세요",
  "مرحبا",
  "Salam",
];

const HOLD = 380;
const FINAL = 700;

export default function Preloader({ onDone }) {
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [exit, setExit] = useState(false);
  const [gone, setGone] = useState(false);

  const skip = reduced;

  useEffect(() => {
    if (skip) {
      onDone();
      return;
    }
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [skip, onDone]);

  useEffect(() => {
    if (exit || gone || skip) return;
    const last = index >= HELLOS.length - 1;
    const t = setTimeout(() => {
      if (last) setExit(true);
      else setIndex((i) => i + 1);
    }, last ? FINAL : HOLD);
    return () => clearTimeout(t);
  }, [index, exit, gone, skip]);

  if (gone || skip) return null;

  const word = HELLOS[index];

  return (
    <motion.div
      className="preloader"
      role="status"
      aria-label="Welcome"
      animate={exit ? { y: "-100%" } : { y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      onAnimationComplete={() => {
        if (exit) {
          setGone(true);
          onDone();
        }
      }}
    >
      <div className="preloader__inner">
        <AnimatePresence mode="sync" initial={false}>
          <motion.span
            key={index}
            className="preloader__word"
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            exit={{ y: "-100%", opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.65, 0, 0.35, 1] }}
          >
            {word}
          </motion.span>
        </AnimatePresence>
      </div>

      <div className="preloader__bar">
        <motion.span
          className="preloader__bar-inner"
          animate={{ width: exit ? "100%" : `${((index + 1) / HELLOS.length) * 100}%` }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        />
      </div>
    </motion.div>
  );
}
