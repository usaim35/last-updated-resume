import Reveal from "../components/Reveal";
import { stack, ai, stackIntro } from "../data/site";

const hide = (e) => { e.currentTarget.style.display = "none"; };

export default function Stack() {
  return (
    <section className="overflow-hidden bg-black py-28 md:py-36">
      <Reveal className="px-6 text-center">
        <p className="font-round text-sm tracking-[0.4em] text-crimson">BUILT WITH</p>
        <h2 className="mx-auto mt-4 max-w-4xl font-head text-4xl font-bold tracking-tight md:text-6xl">A Production-Grade Toolchain</h2>
        <p className="mx-auto mt-5 max-w-2xl font-round leading-relaxed text-white/60 md:text-lg">{stackIntro}</p>
      </Reveal>

      <div className="relative mt-16 [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
        <div className="marquee flex w-max gap-5">
          {[...stack, ...stack].map((s, i) => (
            <div key={i} className="flex h-36 w-36 shrink-0 flex-col items-center justify-center gap-4 rounded-2xl border border-white/10 bg-ti-800/70 transition hover:-translate-y-1 hover:border-crimson">
              <img src={`https://cdn.simpleicons.org/${s.icon}/d4d4d4`} alt="" className="h-11 w-11" onError={hide} />
              <span className="text-sm text-white/60">{s.name}</span>
            </div>
          ))}
        </div>
      </div>

      <Reveal className="mt-24 px-6 text-center">
        <p className="font-round text-sm tracking-[0.4em] text-crimson">AI STUDIO</p>
        <div className="mx-auto mt-10 flex max-w-4xl flex-wrap items-center justify-center gap-x-14 gap-y-8">
          {ai.map((a) => (
            <div key={a.name} className="flex items-center gap-3 font-head text-2xl text-white/45 transition hover:text-white">
              <img src={`https://cdn.simpleicons.org/${a.icon}/9ca3af`} alt="" className="h-8 w-8" onError={hide} />
              {a.name}
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}