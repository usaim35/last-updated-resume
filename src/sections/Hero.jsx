import { useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { gsap, useGSAP } from "../lib/gsap";
import { goTo } from "../lib/nav";
import { hero } from "../data/site";
import Magnetic from "../components/Magnetic";
import HeroParticles from "../components/HeroParticles";

export default function Hero() {
  const root = useRef(null);
  const img = useRef(null);
  const txt = useRef(null);
  const nav = { pathname: useLocation().pathname, navigate: useNavigate() };

  useGSAP(() => {
    const delay = window.__loaded ? 0.1 : 2.4;
    const tl = gsap.timeline({ delay, defaults: { ease: "expo.out" } });
    tl.from(img.current, { scale: 1.25, opacity: 0, duration: 2.2 })
      .from(".hero-line", { yPercent: 110, rotate: 4, duration: 1.3, stagger: 0.12 }, 0.2)
      .from(".hero-fade", { y: 24, opacity: 0, duration: 1, stagger: 0.1 }, 0.7);
    gsap.to(".hero-inner", {
      yPercent: 18, opacity: 0.2, ease: "none",
      scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
    });
  }, { scope: root });

  const onMove = (e) => {
    const x = e.clientX / window.innerWidth - 0.5;
    const y = e.clientY / window.innerHeight - 0.5;
    gsap.to(img.current, { x: x * -36, y: y * -20, duration: 1.2, ease: "power3.out" });
    gsap.to(txt.current, { x: x * 14, y: y * 10, duration: 1.2, ease: "power3.out" });
  };

  return (
    <section id="home" ref={root} className="bg-ti-700 p-2 md:p-3">
      <div onMouseMove={onMove} className="relative h-[calc(100svh-1rem)] min-h-[600px] overflow-hidden rounded-[1.5rem] bg-black md:h-[calc(100svh-1.5rem)] md:rounded-[2rem]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_40%,rgba(230,57,70,0.35),transparent_55%)]" />
        <img ref={img} src={hero.image} alt="" onError={(e) => { e.currentTarget.style.display = "none"; }}
          className="absolute left-[-4%] top-[-4%] h-[108%] w-[108%] object-cover object-[70%_center]" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/30 to-black/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/40" />
        <HeroParticles />

        <div className="hero-inner relative z-10 flex h-full flex-col justify-center px-6 md:px-14">
          <div ref={txt}>
            <h1 className="font-head text-5xl font-bold leading-[1.02] tracking-tight md:text-7xl lg:text-8xl">
              <span className="block overflow-hidden"><span className="hero-line block origin-left">Welcome to</span></span>
              <span className="block overflow-hidden pb-2"><span className="hero-line block origin-left"><span className="shine">My Portfolio</span><span className="text-crimson">.</span></span></span>
            </h1>
            <p className="hero-fade mt-6 font-round text-lg leading-relaxed md:text-2xl">
              {hero.lines[0]}<br />{hero.lines[1]}
            </p>
          </div>
          <div className="hero-fade mt-8 flex gap-4">
            <Magnetic>
              <button onClick={() => goTo("#contact", nav)} className="rounded-full bg-white/85 px-8 py-4 font-round text-lg text-ti-900 transition hover:bg-crimson hover:text-white">Contact</button>
            </Magnetic>
            <Magnetic>
              <button onClick={() => goTo("#work", nav)} className="rounded-full border border-white/15 bg-ti-700/90 px-8 py-4 font-round text-lg transition hover:bg-white hover:text-ti-900">View Work</button>
            </Magnetic>
          </div>
        </div>

        <div className="hero-fade absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex">
          <div className="flex h-10 w-6 justify-center rounded-full border-2 border-white/40 pt-2">
            <span className="scroll-dot h-2 w-1 rounded-full bg-crimson" />
          </div>
          <span className="text-[10px] tracking-[0.3em] text-white/50">SCROLL</span>
        </div>

        <p className="hero-fade absolute bottom-8 right-6 z-10 hidden max-w-md font-round leading-relaxed text-white/85 md:right-14 lg:block">
          {hero.tagline}
        </p>
      </div>
    </section>
  );
}