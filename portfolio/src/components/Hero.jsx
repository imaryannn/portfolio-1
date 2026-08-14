import { motion, useReducedMotion } from "framer-motion";
import HeroLottie from "./HeroLottie";
import SpringWord from "./SpringWord";

const ease = [0.22, 1, 0.36, 1];

function RevealWord({ children, className, delay = 0 }) {
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
  const reduced = useReducedMotion();

  return (
    <section id="home" className="hero">
      <HeroLottie />

      <div className="container hero-content">
        <h1 className="hero__title">
          <RevealWord delay={0.02} className="hero__word hero__word--lead">
            <SpringWord text="I'm Aryan." />
          </RevealWord>
          <RevealWord delay={0.1} className="hero__word">
            <SpringWord text="Just" />
          </RevealWord>
          <div className="hero__headline">
            <RevealWord delay={0.18} className="hero__word hero__word--line2">
              <SpringWord text="BUILDING." />
            </RevealWord>
          </div>
        </h1>
        <motion.p
          className="hero__tag"
          initial={reduced ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.26, ease }}
        >
          whatever comes to mind.
        </motion.p>
      </div>

      <div className="hero__foot">
        <motion.p
          className="label-mono label-mono--lg"
          initial={false}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8, ease }}
        >
          [ 07 ] SHIPPED PRODUCTS
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
