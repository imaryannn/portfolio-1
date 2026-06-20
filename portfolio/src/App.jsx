import "./index.css";
import { useState, useEffect } from "react";
import Nav from "./Nav";
import HeroSection from "./HeroSection";
import About from "./About";
import Projects from "./Projects";
import Skills from "./Skills";
import Contact from "./Contact";
import Footer from "./Footer";

export default function App() {
  const [bgOpacity, setBgOpacity] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const heroHeight = window.innerHeight;
      // Start fading at 80% through hero, fully visible by 100%
      const progress = Math.min(Math.max((window.scrollY - heroHeight * 0.8) / (heroHeight * 0.2), 0), 1);
      setBgOpacity(progress);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <Nav />
      <HeroSection />

      <div
        className="relative"
        style={{
          backgroundImage: "url('/bg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center top",
          backgroundAttachment: "fixed",
        }}
      >
        {/* Dark overlay — thins out as hero scrolls away, revealing the bg image */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "rgba(15,42,31,1)", opacity: 1 - bgOpacity * 0.35, transition: "opacity 0.05s linear" }}
        />
        {/* Green tint overlay — always on top to mute the image */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "rgba(15,42,31,0.55)", backdropFilter: "blur(6px)", WebkitBackdropFilter: "blur(6px)" }}
        />
        <div className="relative">
          <About />
          <Projects />
          <Skills />
          <Contact />
          <Footer />
        </div>
      </div>
    </>
  );
}
