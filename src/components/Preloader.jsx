import { useRef, useState } from "react";
import { gsap, useGSAP } from "../lib/gsap";
import { site } from "../data/site";

export default function Preloader() {
  const root = useRef(null);
  const num = useRef(null);
  const [done, setDone] = useState(false);

  useGSAP(() => {
    const c = { v: 0 };
    const lenis = () => window.__lenis;
    gsap.timeline({
      onComplete: () => { window.__loaded = true; if (lenis()) lenis().start(); setDone(true); },
    })
      .call(() => { if (lenis()) lenis().stop(); }, [], 0.05)
      .to(c, {
        v: 100, duration: 1.8, ease: "power3.inOut",
        onUpdate: () => { if (num.current) num.current.textContent = String(Math.round(c.v)).padStart(3, "0"); },
      })
      .to(".pl-bar", { scaleX: 1, duration: 1.8, ease: "power3.inOut" }, 0)
      .to(".pl-word", { yPercent: -110, duration: 0.6, ease: "expo.in" }, "+=0.1")
      .to(root.current, { yPercent: -100, duration: 1, ease: "expo.inOut" }, "-=0.2");
  }, { scope: root });

  if (done) return null;
  return (
    <div ref={root} className="fixed inset-0 z-[200] flex flex-col justify-between bg-black p-6 md:p-10">
      <div className="overflow-hidden font-round text-xs tracking-[0.4em] text-white/50">
        <span className="pl-word block">LOADING PORTFOLIO</span>
      </div>
      <div className="flex items-end justify-between gap-6">
        <div className="overflow-hidden">
          <span className="pl-word block font-head text-4xl font-bold md:text-8xl">{site.name}<span className="text-crimson">.</span></span>
        </div>
        <span ref={num} className="font-head text-4xl font-bold tabular-nums text-crimson md:text-8xl">000</span>
      </div>
      <div className="pl-bar absolute bottom-0 left-0 h-[3px] w-full origin-left scale-x-0 bg-crimson" />
    </div>
  );
}