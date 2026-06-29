import "./index.css";
import { useState, useEffect } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";
import Nav from "./Nav";
import PageBackground from "./PageBackground";
import HeroSection from "./HeroSection";
import About from "./About";
import Projects from "./Projects";
import Skills from "./Skills";
import Contact from "./Contact";
import Footer from "./Footer";

const FRAME_COUNT = 145;

export default function App() {
  const [frameIndex, setFrameIndex] = useState(Math.floor(FRAME_COUNT / 2));
  const [scrollDark, setScrollDark] = useState(0);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const heroHeight = window.innerHeight;
    const progress = Math.min(Math.max(latest / (heroHeight * 0.85), 0), 1);
    setScrollDark(progress);
  });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const idx = Math.floor((1 - e.clientX / window.innerWidth) * FRAME_COUNT);
      setFrameIndex(Math.max(0, Math.min(FRAME_COUNT - 1, idx)));
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <>
      <PageBackground frameIndex={frameIndex} scrollDark={scrollDark} />
      <div className="page-content">
        <Nav />
        <HeroSection />
        <About />
        <Projects />
        <Skills />
        <Contact />
        <Footer />
      </div>
    </>
  );
}
