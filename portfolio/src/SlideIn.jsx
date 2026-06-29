import { motion } from "framer-motion";

const DISTANCE = 500;

const variants = {
  left: { x: -DISTANCE },
  right: { x: DISTANCE },
  top: { y: -DISTANCE },
  bottom: { y: DISTANCE },
};

export default function SlideIn({ children, from = "left", delay = 0, style = {}, ...props }) {
  return (
    <motion.div
      initial={variants[from]}
      whileInView={{ x: 0, y: 0 }}
      viewport={{ once: false, margin: "-60px" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: delay / 1000 }}
      style={style}
      {...props}
    >
      {children}
    </motion.div>
  );
}
