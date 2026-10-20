import { useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { gsap, useGSAP } from "../lib/gsap";
import { goTo } from "../lib/nav";
import { hero } from "../data/site";

export default function Hero() {
  const root = useRef(null);
  const img = useRef(null);
  const nav = { pathname: useLocation().pathname, navigate: useNavigate() };

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
    tl.from(img.current, { scale: 1.2, opacity: 0, duration: 2.2 })
      .from(".hero-line", { yPercent: 110, duration: 1.3, stagger: 0.12 }, 0.3)
      .from(".hero-fade", { y: 24, opacity: 0, duration: 1, stagger: 0.1 }, 0.8);
    gsap.to(".hero-inner", {
      yPercent: 15, ease: "none",
      scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
    });
  }, { scope: root });

  const onMove = (e) => {
    const x = e.clientX / window.innerWidth - 0.5;
    const y = e.clientY / window.innerHeight - 0.5;
    gsap.to(img.current, { x: x * -30, y: y * -18, duration: 1.2, ease: "power3.out" });
  };

  return (
    <section id="home" ref={root} className="bg-ti-700 p-2 md:p-3">
      <div onMouseMove={onMove} className="relative h-[calc(100svh-1rem)] min-h-[600px] overflow-hidden rounded-[1.5rem] bg-black md:h-[calc(100svh-1.5rem)] md:rounded-[2rem]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_40%,rgba(230,57,70,0.35),transparent_55%)]" />
        <img ref={img} src={hero.image} alt="" onError={(e) => { e.currentTarget.style.display = "none"; }} className="absolute left-[-4%] top-[-4%] h-[108%] w-[108%] object-cover object-[70%_center]" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/30 to-black/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/40" />

        <div className="hero-inner relative z-10 flex h-full flex-col justify-center px-6 md:px-14">
          <h1 className="font-head text-5xl font-bold leading-[1.02] tracking-tight md:text-7xl lg:text-8xl">
            <span className="block overflow-hidden"><span className="hero-line block">Welcome to</span></span>
            <span className="block overflow-hidden pb-2"><span className="hero-line block">My Portfolio<span className="text-crimson">.</span></span></span>
          </h1>
          <p className="hero-fade mt-6 font-round text-lg leading-relaxed md:text-2xl">
            {hero.lines[0]}<br />{hero.lines[1]}
          </p>
          <div className="hero-fade mt-8 flex gap-4">
            <button onClick={() => goTo("#contact", nav)} className="rounded-full bg-white/80 px-8 py-4 font-round text-lg text-ti-900 transition hover:bg-crimson hover:text-white">Contact</button>
            <button onClick={() => goTo("#work", nav)} className="rounded-full bg-ti-700/90 px-8 py-4 font-round text-lg transition hover:bg-white hover:text-ti-900">View Work</button>
          </div>
        </div>

        <p className="hero-fade absolute bottom-8 right-6 z-10 hidden max-w-md font-round leading-relaxed text-white/85 md:right-14 md:block">
          {hero.tagline}
        </p>
      </div>
    </section>
  );
}