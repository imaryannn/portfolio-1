import { motion } from "framer-motion";

const variants = {
  bottom: { y: 60 },
  left: { x: -60 },
  right: { x: 60 },
  top: { y: -60 },
};

export default function FadeIn({ children, from = "bottom", delay = 0, style = {}, ...props }) {
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
