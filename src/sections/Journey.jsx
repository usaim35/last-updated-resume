import { useRef } from "react";
import { gsap, useGSAP } from "../lib/gsap";
import { about, site } from "../data/site";
import { Sparkle } from "../components/Icons";

export default function Journey() {
  const root = useRef(null);
  useGSAP(() => {
    gsap.fromTo(".j-img", { clipPath: "inset(100% 0% 0% 0%)" }, {
      clipPath: "inset(0% 0% 0% 0%)", duration: 1.6, ease: "expo.inOut",
      scrollTrigger: { trigger: root.current, start: "top 75%" },
    });
    gsap.from(".j-txt", {
      y: 40, opacity: 0, duration: 1.1, stagger: 0.12, ease: "expo.out",
      scrollTrigger: { trigger: root.current, start: "top 65%" },
    });
  }, { scope: root });

  return (
    <section id="about" ref={root} className="bg-ti-700 px-4 py-24 md:py-32">
      <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2">
        <div className="j-img relative aspect-[4/5] overflow-hidden rounded-[1.75rem] bg-[linear-gradient(160deg,#3a3a3a,#1a1a1a)]">
          <img src={about.photo} alt={site.name} onError={(e) => { e.currentTarget.style.display = "none"; }} className="absolute inset-0 h-full w-full object-cover" />
        </div>
        <div>
          <p className="j-txt font-round text-xl uppercase tracking-[0.3em] md:text-2xl">My Journey</p>
          {about.paragraphs.map((t, i) => (
            <p key={i} className="j-txt mt-6 text-lg leading-relaxed text-white/90 md:text-xl">{t}</p>
          ))}
          <Sparkle className="j-txt mt-10 h-7 w-7 text-crimson" />
        </div>
      </div>
    </section>
  );
}