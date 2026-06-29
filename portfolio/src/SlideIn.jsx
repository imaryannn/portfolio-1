import { motion } from "framer-motion";

const DISTANCE = 400;

const variants = {
  left: { x: -DISTANCE },
  right: { x: DISTANCE },
  top: { y: -DISTANCE },
  bottom: { y: DISTANCE },
};

export default function SlideIn({ children, from = "left", delay = 0, style = {}, ...props }) {
  const isMobile = typeof window !== "undefined" && window.innerWidth <= 768;

  if (isMobile) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "0px" }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: delay / 1000 }}
        style={style}
        {...props}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, ...variants[from] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: delay / 1000 }}
      style={style}
      {...props}
    >
      {children}
    </motion.div>
  );
}
