import "./index.css";
import { useRef, useState, useEffect } from "react";
import Nav from "./Nav";
import PageBackground from "./PageBackground";
import HeroSection from "./HeroSection";
import About from "./About";
import Projects from "./Projects";
import Skills from "./Skills";
import Contact from "./Contact";
import Footer from "./Footer";

export default function App() {
  const videoRef = useRef(null);
  const rafRef = useRef(null);
  const targetTime = useRef(0);
  const [scrollDark, setScrollDark] = useState(0);

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

  useEffect(() => {
    const onScroll = () => {
      const heroHeight = window.innerHeight;
      const progress = Math.min(Math.max(window.scrollY / (heroHeight * 0.85), 0), 1);
      setScrollDark(progress);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
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
    </>
  );
}
