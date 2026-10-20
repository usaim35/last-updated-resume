import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "./lib/gsap";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SparkleCursor from "./components/SparkleCursor";
import Shield from "./components/Shield";
import Preloader from "./components/Preloader";
import ScrollProgress from "./components/ScrollProgress";
import Home from "./pages/Home";
import CaseStudy from "./pages/CaseStudy";

export default function App() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if ("scrollRestoration" in window.history) window.history.scrollRestoration = "manual";
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true });
    window.__lenis = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (t) => lenis.raf(t * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    return () => {
      window.removeEventListener("load", refresh);
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    const l = window.__lenis;
    const t1 = setTimeout(() => ScrollTrigger.refresh(), 150);
    let t2;
    if (hash) {
      t2 = setTimeout(() => {
        const el = document.querySelector(hash);
        if (el) { if (l) l.scrollTo(el, { duration: 1.2 }); else el.scrollIntoView(); }
      }, 350);
    } else if (l) l.scrollTo(0, { immediate: true });
    else window.scrollTo(0, 0);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [pathname, hash]);

  return (
    <>
      <Shield />
      <Preloader />
      <SparkleCursor />
      <ScrollProgress />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/work/:slug" element={<CaseStudy />} />
        <Route path="*" element={<Home />} />
      </Routes>
      <Footer />
    </>
  );
}