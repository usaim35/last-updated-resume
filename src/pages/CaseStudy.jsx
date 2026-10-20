import { useRef, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { gsap, useGSAP } from "../lib/gsap";
import { projects } from "../data/site";
import { ArrowUpRight, Copy, Check } from "../components/Icons";
import Reveal from "../components/Reveal";

function TryIt({ demo, live }) {
  const [copied, setCopied] = useState("");
  const copy = async (key, value) => {
    try { await navigator.clipboard.writeText(value); setCopied(key); setTimeout(() => setCopied(""), 1500); } catch (e) { /* ignore */ }
  };
  return (
    <Reveal className="mx-auto mt-28 max-w-6xl px-6">
      <div className="grid gap-10 rounded-[2rem] border border-white/10 bg-ti-600/60 p-8 md:p-12 lg:grid-cols-2">
        <div>
          <p className="font-round text-sm tracking-[0.35em] text-white/60">04 TRY IT</p>
          <h2 className="mt-3 font-head text-3xl font-bold md:text-5xl">{demo.heading}</h2>
          <p className="mt-5 leading-relaxed text-white/60">{demo.text}</p>
        </div>
        <div className="space-y-3">
          {[["EMAIL", demo.email], ["PASSWORD", demo.password]].map(([key, value]) => (
            <div key={key} className="flex items-center justify-between rounded-2xl bg-ti-700 px-5 py-4">
              <div>
                <p className="text-xs tracking-[0.3em] text-white/50">{key}</p>
                <p className="mt-1 font-mono">{value}</p>
              </div>
              <button onClick={() => copy(key, value)} className="flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm transition hover:border-crimson">
                {copied === key ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                {copied === key ? "Copied" : "Copy"}
              </button>
            </div>
          ))}
          <div className="flex flex-wrap gap-3 pt-3">
            {demo.url && (
              <a href={demo.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 font-medium text-ti-900 transition hover:bg-crimson hover:text-white">
                Open Dashboard <ArrowUpRight className="h-4 w-4" />
              </a>
            )}
            {live && (
              <a href={live} target="_blank" rel="noreferrer" className="rounded-full border border-white/25 px-6 py-3.5 transition hover:border-crimson">Visit Live</a>
            )}
          </div>
        </div>
      </div>
    </Reveal>
  );
}

export default function CaseStudy() {
  const { slug } = useParams();
  const root = useRef(null);
  const i = projects.findIndex((p) => p.slug === slug);

  useGSAP(() => {
    if (i < 0) return;
    gsap.from(".cs-fade", { y: 30, opacity: 0, duration: 1.1, stagger: 0.08, ease: "expo.out", delay: 0.1 });
    gsap.fromTo(".cs-img", { clipPath: "inset(0% 100% 0% 0% round 28px)" }, { clipPath: "inset(0% 0% 0% 0% round 28px)", duration: 1.6, ease: "expo.inOut" });
  }, { scope: root, dependencies: [slug], revertOnUpdate: true });

  if (i < 0) return <Navigate to="/" replace />;
  const p = projects[i];
  const next = projects[(i + 1) % projects.length];
  const num = String(i + 1).padStart(2, "0");

  return (
    <main ref={root} className="min-h-screen bg-ti-700 pb-10 pt-36">
      <section className="mx-auto max-w-6xl px-6">
        <Link to="/#work" className="cs-fade text-sm text-white/50 transition hover:text-crimson">&larr; Back to work</Link>
        <p className="cs-fade mt-10 font-round text-sm tracking-[0.4em] text-white/60">CASE STUDY &middot; {num} OVERVIEW</p>

        <div className="mt-12 grid items-center gap-12 lg:grid-cols-2">
          <div className="cs-img rounded-[1.75rem] border border-white/15 bg-ti-800/60 p-3 shadow-[0_40px_100px_-40px_rgba(230,57,70,0.35)]">
            <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-[radial-gradient(circle_at_70%_20%,rgba(230,57,70,0.35),transparent_60%),linear-gradient(#1a1a1a,#0b0b0b)]">
              <img src={p.image} alt={p.title} onError={(e) => { e.currentTarget.style.display = "none"; }} className="absolute inset-0 h-full w-full object-cover object-top" />
            </div>
          </div>
          <div>
            <h1 className="cs-fade font-head text-4xl font-bold leading-tight md:text-6xl">{p.title}</h1>
            <p className="cs-fade mt-6 text-lg leading-relaxed text-white/75">{p.summary}</p>
            <p className="cs-fade mt-5 leading-relaxed text-white/60">{p.details}</p>
            <div className="cs-fade mt-8 flex flex-wrap gap-2.5">
              {p.stack.map((s) => (
                <span key={s} className="rounded-full border border-white/20 px-4 py-2 text-sm">{s}</span>
              ))}
            </div>
            {p.live && (
              <a href={p.live} target="_blank" rel="noreferrer" className="cs-fade mt-10 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 font-medium text-ti-900 transition hover:bg-crimson hover:text-white">
                Visit Live <ArrowUpRight className="h-4 w-4" />
              </a>
            )}
          </div>
        </div>
      </section>

      <section className="mx-auto mt-28 max-w-6xl px-6">
        <Reveal>
          <p className="font-round text-sm tracking-[0.35em] text-white/60">02 KEY FEATURES</p>
          <h2 className="mt-3 font-head text-3xl font-bold md:text-5xl">What makes it work</h2>
        </Reveal>
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {p.features.map((f, k) => (
            <Reveal key={f.title} delay={k * 0.05}>
              <div className="h-full rounded-2xl border border-white/10 bg-ti-800/70 p-7 transition hover:border-crimson/60">
                <p className="font-mono text-sm text-crimson">{String(k + 1).padStart(2, "0")}</p>
                <h3 className="mt-3 font-head text-xl font-bold">{f.title}</h3>
                <p className="mt-2 leading-relaxed text-white/60">{f.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {p.gallery && p.gallery.length > 0 && (
        <section className="mx-auto mt-28 max-w-6xl px-6">
          <Reveal><p className="font-round text-sm tracking-[0.35em] text-white/60">03 GALLERY</p></Reveal>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {p.gallery.map((src) => (
              <Reveal key={src}>
                <div className="rounded-2xl border border-white/10 bg-ti-800 p-2">
                  <img src={src} alt="" loading="lazy" className="w-full rounded-xl" />
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {p.demo && <TryIt demo={p.demo} live={p.live} />}

      <Link to={`/work/${next.slug}`} className="group mx-auto mt-32 block max-w-6xl border-t border-white/10 px-6 pt-16">
        <p className="font-round text-sm tracking-[0.35em] text-white/50">NEXT PROJECT</p>
        <p className="mt-4 font-head text-4xl font-bold transition group-hover:text-crimson md:text-7xl">{next.title} &rarr;</p>
      </Link>
    </main>
  );
}