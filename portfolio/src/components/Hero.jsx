import { motion, useReducedMotion } from "framer-motion";
import HeroArtwork from "./HeroArtwork";
import SpringWord from "./SpringWord";

const ease = [0.22, 1, 0.36, 1];

function RevealWord({ children, className = "", delay = 0 }) {
  const reduced = useReducedMotion();
  return (
    <motion.span
      className={`block ${className}`}
      initial={reduced ? false : { opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay, ease }}
    >
      {children}
    </motion.span>
  );
}

export default function Hero() {
  return (
    <section id="home" className="hero">
      <HeroArtwork />

      <div className="container hero-content">
        <h1 className="hero__title" aria-label="Hi, I’m Aryan">
          <RevealWord delay={0.02} className="hero__word hero__word--lead">
            Hi, I’m
          </RevealWord>
          <RevealWord delay={0.1} className="hero__word hero__word--name">
            <SpringWord text="Aryan" />
          </RevealWord>
        </h1>
        <p className="hero__subhead">
          <RevealWord delay={0.18}>Here’s what I’ve built.</RevealWord>
        </p>
      </div>

      <div className="hero__foot">
        <motion.p
          className="label-mono label-mono--lg"
          initial={false}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8, ease }}
        >
          [ 08 ] SHIPPED PRODUCTS
        </motion.p>

        <motion.p
          className="label-mono label-mono--lg"
          initial={false}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1, ease }}
        >
          DIGITAL PRODUCTS · WEB · AI
        </motion.p>
      </div>
    </section>
  );
}
