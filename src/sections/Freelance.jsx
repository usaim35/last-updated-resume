import Reveal from "../components/Reveal";
import { freelance, site } from "../data/site";
import { Chat, Download } from "../components/Icons";

export default function Freelance() {
  return (
    <section className="relative overflow-hidden bg-black px-6 py-28 md:py-40">
      <div className="mx-auto grid max-w-6xl items-center gap-16 md:grid-cols-2">
        <Reveal>
          <span className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium">
            <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-emerald-400" />
            Available for freelance work
          </span>
          <h2 className="mt-8 font-round text-4xl leading-tight md:text-6xl">{freelance.headline}</h2>
          <a href={site.cv} download className="mt-12 inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 font-medium text-ti-900 transition hover:bg-crimson hover:text-white">
            <Download /> Download CV
          </a>
        </Reveal>

        <Reveal delay={0.15} className="relative mx-auto aspect-square w-full max-w-md">
          <div className="glow absolute inset-[8%] rounded-full bg-crimson shadow-[0_0_120px_40px_rgba(230,57,70,0.45)]" />
          <img src={freelance.image} alt={site.name} onError={(e) => { e.currentTarget.style.display = "none"; }} className="relative z-10 h-full w-full object-contain object-bottom" />
          <div className="absolute -bottom-6 left-0 z-20 max-w-xs rounded-2xl border border-white/10 bg-ti-800/85 p-5 backdrop-blur">
            <Chat className="h-6 w-6 text-emerald-400" />
            <p className="mt-3 text-sm leading-relaxed">{freelance.note}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}