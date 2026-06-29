import "./index.css";
import { useRef, useState, useEffect } from "react";
import Lenis from "lenis";
import Nav from "./Nav";
import PageBackground from "./PageBackground";
import HeroSection from "./HeroSection";
import About from "./About";
import Projects from "./Projects";
import Skills from "./Skills";
import Contact from "./Contact";
import Footer from "./Footer";
import { LenisScrollContext } from "./LenisScrollContext";

export default function App() {
  const videoRef = useRef(null);
  const rafRef = useRef(null);
  const targetTime = useRef(0);
  const lenisRef = useRef(null);
  const [scrollY, setScrollY] = useState(0);
  const [scrollDark, setScrollDark] = useState(0);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    lenis.on("scroll", (e) => {
      setScrollY(e.animatedScroll);
      const heroHeight = window.innerHeight;
      const progress = Math.min(Math.max(e.animatedScroll / (heroHeight * 0.85), 0), 1);
      setScrollDark(progress);
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const onLoaded = () => {
      video.pause();
      video.currentTime = video.duration / 2;
    };
    video.addEventListener("loadedmetadata", onLoaded);
    return () => video.removeEventListener("loadedmetadata", onLoaded);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const video = videoRef.current;
      if (!video || !video.duration) return;
      targetTime.current = (1 - e.clientX / window.innerWidth) * video.duration;
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        const v = videoRef.current;
        if (!v) return;
        if (v.fastSeek) v.fastSeek(targetTime.current);
        else v.currentTime = targetTime.current;
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <LenisScrollContext.Provider value={scrollY}>
      <PageBackground videoRef={videoRef} scrollDark={scrollDark} />
      <div className="page-content">
        <Nav />
        <HeroSection />
        <About />
        <Projects />
        <Skills />
        <Contact />
        <Footer />
      </div>
    </LenisScrollContext.Provider>
  );
}
