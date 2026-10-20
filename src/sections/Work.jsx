import { useRef } from "react";
import { Link } from "react-router-dom";
import { gsap, useGSAP } from "../lib/gsap";
import { projects, intro } from "../data/site";
import { ArrowUpRight } from "../components/Icons";

const pad = (n) => String(n).padStart(2, "0");

export default function Work() {
  const sec = useRef(null);
  const pin = useRef(null);
  const track = useRef(null);
  const txt = useRef(null);

  useGSAP(() => {
    gsap.from(txt.current, { y: 40, opacity: 0, duration: 1.2, ease: "expo.out", scrollTrigger: { trigger: txt.current, start: "top 85%" } });
    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px)", () => {
      const dist = () => Math.max(0, track.current.scrollWidth - window.innerWidth);
      gsap.to(track.current, {
        x: () => -dist(), ease: "none",
        scrollTrigger: { trigger: pin.current, start: "center center", end: () => "+=" + dist(), pin: true, scrub: 1, invalidateOnRefresh: true },
      });
    });
  }, { scope: sec });

  return (
    <section id="work" ref={sec} className="relative overflow-hidden bg-black pb-24 pt-32">
      <div className="smoke" aria-hidden="true" />
      <p ref={txt} className="relative mx-auto max-w-3xl px-6 text-center font-round text-lg leading-relaxed text-white/70 md:text-2xl">
        {intro}
      </p>

      <div ref={pin} className="mt-20">
        <div ref={track} className="flex flex-col gap-8 px-4 lg:w-max lg:flex-row lg:px-6">
          {projects.map((p, i) => (
            <Link key={p.slug} to={`/work/${p.slug}`} className="group relative block aspect-[16/10] w-full overflow-hidden rounded-[1.75rem] border border-white/10 bg-[radial-gradient(circle_at_70%_20%,rgba(230,57,70,0.35),transparent_60%),linear-gradient(#1a1a1a,#0b0b0b)] lg:w-[44vw]">
              <img src={p.image} alt={p.title} loading="lazy" onError={(e) => { e.currentTarget.style.display = "none"; }} className="absolute inset-0 h-full w-full object-cover object-top transition duration-[1200ms] ease-out group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
              <span className="absolute right-5 top-5 rounded-full bg-black/45 px-4 py-2 text-sm backdrop-blur">{pad(i + 1)} / {pad(projects.length)}</span>
              <h3 className="absolute bottom-7 left-7 right-24 font-head text-2xl font-bold md:bottom-9 md:left-9 md:text-4xl">{p.title}</h3>
              <span className="absolute bottom-6 right-6 grid h-12 w-12 place-items-center rounded-full bg-white/15 backdrop-blur transition duration-500 group-hover:rotate-45 group-hover:bg-crimson">
                <ArrowUpRight />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}