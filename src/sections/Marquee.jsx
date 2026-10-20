import { useRef } from "react";
import { gsap, useGSAP } from "../lib/gsap";

const WORDS = ["3D WEB", "REACT", "MOTION", "REAL-TIME", "NEXT.JS", "THREE.JS", "UI / UX"];

export default function Marquee() {
  const root = useRef(null);
  useGSAP(() => {
    const st = { trigger: root.current, start: "top bottom", end: "bottom top", scrub: 0.5 };
    gsap.fromTo(".mq-1", { xPercent: 0 }, { xPercent: -30, ease: "none", scrollTrigger: st });
    gsap.fromTo(".mq-2", { xPercent: -30 }, { xPercent: 0, ease: "none", scrollTrigger: { ...st } });
  }, { scope: root });

  const row = [...WORDS, ...WORDS, ...WORDS];
  return (
    <section ref={root} className="overflow-hidden border-y border-white/10 bg-black py-10" aria-hidden="true">
      <div className="mq-1 flex w-max gap-10 whitespace-nowrap font-head text-6xl font-bold md:text-8xl">
        {row.map((w, i) => (
          <span key={i} className={i % 2 ? "text-outline" : ""}>{w} <span className="text-crimson">{"\u2726"}</span></span>
        ))}
      </div>
      <div className="mq-2 mt-4 flex w-max gap-10 whitespace-nowrap font-head text-6xl font-bold md:text-8xl">
        {row.map((w, i) => (
          <span key={i} className={i % 2 ? "" : "text-outline"}>{w} <span className="text-crimson">{"\u2726"}</span></span>
        ))}
      </div>
    </section>
  );
}