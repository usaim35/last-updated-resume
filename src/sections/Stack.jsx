import { useRef } from "react";
import { gsap } from "../lib/gsap";
import Reveal from "../components/Reveal";
import Tilt from "../components/Tilt";
import { stack, ai, stackIntro } from "../data/site";

const hide = (e) => { e.currentTarget.style.display = "none"; };
const icon = (slug, color) => `https://cdn.simpleicons.org/${slug}/${color}`;
const FACES = ["rotateY(0deg)", "rotateY(90deg)", "rotateY(180deg)", "rotateY(-90deg)", "rotateX(90deg)", "rotateX(-90deg)"];

function Cube() {
  const wrap = useRef(null);
  const move = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    gsap.to(wrap.current, {
      rotateY: ((e.clientX - r.left) / r.width - 0.5) * 50,
      rotateX: -((e.clientY - r.top) / r.height - 0.5) * 50,
      duration: 0.8, ease: "power3.out",
    });
  };
  const leave = () => gsap.to(wrap.current, { rotateX: 0, rotateY: 0, duration: 1.2, ease: "elastic.out(1, 0.4)" });

  return (
    <div className="cube-scene mx-auto mt-16 grid h-64 w-64 place-items-center" onMouseMove={move} onMouseLeave={leave} data-cursor="3D">
      <div ref={wrap} className="cube relative h-40 w-40">
        <div className="cube-spin relative h-full w-full">
          {stack.slice(0, 6).map((s, i) => (
            <div key={s.name} className="cube-face flex flex-col items-center justify-center gap-2 rounded-2xl border border-crimson/40 bg-ti-800 shadow-[inset_0_0_40px_rgba(230,57,70,0.25)]"
              style={{ transform: `${FACES[i]} translateZ(80px)` }}>
              <img src={icon(s.icon, "e5e5e5")} alt="" className="h-12 w-12" onError={hide} />
              <span className="text-xs text-white/60">{s.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Stack() {
  return (
    <section className="overflow-hidden bg-black py-28 md:py-36">
      <Reveal className="px-6 text-center">
        <p className="font-round text-sm tracking-[0.4em] text-crimson">BUILT WITH</p>
        <h2 className="mx-auto mt-4 max-w-4xl font-head text-4xl font-bold tracking-tight md:text-6xl">A Production-Grade Toolchain</h2>
        <p className="mx-auto mt-5 max-w-2xl font-round leading-relaxed text-white/60 md:text-lg">{stackIntro}</p>
      </Reveal>

      <Cube />

      <div className="relative mt-16 [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
        <div className="marquee flex w-max gap-5 py-4">
          {[...stack, ...stack].map((s, i) => (
            <Tilt key={i} max={14} scale={1.08} className="relative flex h-36 w-36 shrink-0 flex-col items-center justify-center gap-4 overflow-hidden rounded-2xl border border-white/10 bg-ti-800/70 transition-[border-color] hover:border-crimson">
              <img src={icon(s.icon, "d4d4d4")} alt="" className="h-11 w-11" onError={hide} />
              <span className="text-sm text-white/60">{s.name}</span>
            </Tilt>
          ))}
        </div>
      </div>

      <Reveal className="mt-24 px-6 text-center">
        <p className="font-round text-sm tracking-[0.4em] text-crimson">AI STUDIO</p>
        <div className="mx-auto mt-10 flex max-w-4xl flex-wrap items-center justify-center gap-x-14 gap-y-8">
          {ai.map((a) => (
            <div key={a.name} className="flex items-center gap-3 font-head text-2xl text-white/45 transition duration-300 hover:-translate-y-1 hover:text-white">
              <img src={icon(a.icon, "9ca3af")} alt="" className="h-8 w-8" onError={hide} />
              {a.name}
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}