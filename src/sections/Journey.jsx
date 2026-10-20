import { useRef } from "react";
import { gsap, useGSAP } from "../lib/gsap";
import { about, site, projects, stack } from "../data/site";
import { Sparkle } from "../components/Icons";
import Tilt from "../components/Tilt";

export default function Journey() {
  const root = useRef(null);

  useGSAP(() => {
    gsap.fromTo(".j-img", { clipPath: "inset(100% 0% 0% 0% round 28px)" }, {
      clipPath: "inset(0% 0% 0% 0% round 28px)", duration: 1.6, ease: "expo.inOut",
      scrollTrigger: { trigger: root.current, start: "top 75%" },
    });
    gsap.from(".j-txt", {
      y: 40, opacity: 0, duration: 1.1, stagger: 0.12, ease: "expo.out",
      scrollTrigger: { trigger: root.current, start: "top 65%" },
    });
    gsap.utils.toArray(".count").forEach((el) => {
      gsap.fromTo(el, { textContent: 0 }, {
        textContent: Number(el.dataset.to), duration: 1.8, ease: "power2.out", snap: { textContent: 1 },
        scrollTrigger: { trigger: el, start: "top 90%" },
      });
    });
  }, { scope: root });

  const stats = [[projects.length, "Projects shipped"], [stack.length, "Core tools"]];

  return (
    <section id="about" ref={root} className="bg-ti-700 px-4 py-24 md:py-32">
      <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2">
        <Tilt max={7} data-cursor="Hello" className="j-img group relative aspect-[4/5] overflow-hidden rounded-[1.75rem] bg-[linear-gradient(160deg,#3a3a3a,#1a1a1a)]">
          <img src={about.photo} alt={site.name} onError={(e) => { e.currentTarget.style.display = "none"; }}
            className="absolute inset-0 h-full w-full object-cover grayscale-[40%] transition duration-700 group-hover:scale-105 group-hover:grayscale-0" />
        </Tilt>
        <div>
          <p className="j-txt font-round text-xl uppercase tracking-[0.3em] md:text-2xl">My Journey</p>
          {about.paragraphs.map((t, i) => (
            <p key={i} className="j-txt mt-6 text-lg leading-relaxed text-white/90 md:text-xl">{t}</p>
          ))}
          <div className="j-txt mt-10 grid grid-cols-2 gap-4">
            {stats.map(([n, l]) => (
              <div key={l} className="rounded-2xl border border-white/10 bg-ti-800/60 p-5 transition hover:border-crimson/60">
                <p className="count font-head text-4xl font-bold text-crimson" data-to={n}>0</p>
                <p className="mt-1 text-sm text-white/60">{l}</p>
              </div>
            ))}
          </div>
          <Sparkle className="j-txt mt-10 h-7 w-7 text-crimson" />
        </div>
      </div>
    </section>
  );
}