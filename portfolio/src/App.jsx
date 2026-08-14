import "./index.css";
import { useCallback, useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { initLenis, destroyLenis } from "./lib/scroll";
import Cursor from "./components/Cursor";
import Preloader from "./components/Preloader";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Intro from "./components/Intro";
import Projects from "./components/Projects";
import Capabilities from "./components/Capabilities";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  const reduced = useReducedMotion();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!loaded) return;
    initLenis({ reducedMotion: reduced ?? false });
    return () => destroyLenis();
  }, [loaded, reduced]);

  const handlePreloadDone = useCallback(() => setLoaded(true), []);

  return (
    <>
      <Cursor />
      <Preloader onDone={handlePreloadDone} />
      <a
        href="#main"
        style={{
          position: "fixed",
          top: -100,
          left: 16,
          zIndex: 300,
          background: "#111111",
          color: "#F5EDC9",
          padding: "12px 20px",
          borderRadius: 999,
          fontFamily: "'Space Mono', monospace",
          fontSize: 12,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          transition: "top 0.2s ease",
        }}
        onFocus={(e) => (e.currentTarget.style.top = "16px")}
        onBlur={(e) => (e.currentTarget.style.top = "-100px")}
      >
        Skip to content
      </a>
      <Nav />
      <main id="main">
        <Hero />
        <Intro />
        <Projects />
        <Capabilities />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
