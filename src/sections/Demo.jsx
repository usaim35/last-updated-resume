import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Reveal from "../components/Reveal";
import { projects, practice } from "../data/site";

export default function Demo() {
  const items = [
    ...projects.map((p) => ({ title: p.title, image: p.image, to: `/work/${p.slug}` })),
    ...practice.map((p) => ({ title: p.title, image: p.image, href: p.link })),
  ];
  const [fan, setFan] = useState(false);
  const [hot, setHot] = useState(-1);
  const [k, setK] = useState(1);

  useEffect(() => {
    const r = () => setK(window.innerWidth < 768 ? 0.45 : 1);
    r();
    window.addEventListener("resize", r);
    return () => window.removeEventListener("resize", r);
  }, []);

  const n = items.length;
  const spread = fan || k < 1;

  return (
    <section id="demo" className="overflow-hidden bg-[#d4d4d8] px-6 py-28 text-ti-900 md:py-36">
      <Reveal className="text-center">
        <p className="font-round text-sm tracking-[0.4em] text-crimson">LIVE DEMOS</p>
        <h2 className="mx-auto mt-4 max-w-4xl font-head text-4xl font-bold leading-tight md:text-6xl">Projects You Can Explore Right Now</h2>
        <p className="mx-auto mt-5 max-w-2xl font-round text-ti-600 md:text-lg">Hover the deck to fan it out, then open any card for the full case study.</p>
      </Reveal>

      <div className="relative mx-auto mt-20 h-[360px] max-w-5xl md:h-[440px]" onMouseEnter={() => setFan(true)} onMouseLeave={() => { setFan(false); setHot(-1); }}>
        {items.map((it, i) => {
          const c = i - (n - 1) / 2;
          const rot = c * (spread ? 8 : 4);
          const x = c * (spread ? 170 : 80) * k;
          const y = Math.abs(c) * (spread ? 22 : 10) - (hot === i ? 40 : 0);
          const style = { transform: `translateX(calc(-50% + ${x}px)) translateY(${y}px) rotate(${rot}deg)`, zIndex: hot === i ? 50 : i + 1 };
          const cls = "absolute left-1/2 top-0 block h-80 w-56 origin-bottom overflow-hidden rounded-3xl border border-white/60 bg-[linear-gradient(160deg,#2b2b2b,#0b0b0b)] shadow-[0_30px_60px_-20px_rgba(0,0,0,0.5)] transition-transform duration-500 ease-out md:h-96 md:w-64";
          const inner = (
            <>
              <img src={it.image} alt={it.title} loading="lazy" onError={(e) => { e.currentTarget.style.display = "none"; }} className="absolute inset-0 h-full w-full object-cover object-left-top" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
              <p className="absolute bottom-5 left-5 right-5 font-head text-xl font-bold text-white">{it.title}</p>
            </>
          );
          return it.to ? (
            <Link key={i} to={it.to} style={style} className={cls} onMouseEnter={() => setHot(i)}>{inner}</Link>
          ) : (
            <a key={i} href={it.href} target="_blank" rel="noreferrer" style={style} className={cls} onMouseEnter={() => setHot(i)}>{inner}</a>
          );
        })}
      </div>
    </section>
  );
}