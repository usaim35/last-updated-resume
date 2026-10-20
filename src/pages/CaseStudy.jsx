import { useCallback, useEffect, useRef, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { gsap, useGSAP } from "../lib/gsap";
import { projects } from "../data/site";
import { ArrowUpRight, Copy, Check, Close } from "../components/Icons";
import Reveal from "../components/Reveal";
import Tilt from "../components/Tilt";
import Magnetic from "../components/Magnetic";
import ProjectImage from "../components/ProjectImage";

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
            {live && <a href={live} target="_blank" rel="noreferrer" className="rounded-full border border-white/25 px-6 py-3.5 transition hover:border-crimson">Visit Live</a>}
          </div>
        </div>
      </div>
    </Reveal>
  );
}

function Lightbox({ src, onClose }) {
  useEffect(() => {
    if (!src) return;
    const l = window.__lenis;
    if (l) l.stop();
    const key = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", key);
    return () => { window.removeEventListener("keydown", key); if (l) l.start(); };
  }, [src, onClose]);
  if (!src) return null;
  return (
    <div onClick={onClose} className="fixed inset-0 z-[150] flex items-center justify-center bg-black/90 p-4 backdrop-blur-md md:p-10">
      <img src={src} alt="" className="max-h-full max-w-full rounded-2xl shadow-2xl" />
      <button aria-label="Close" className="absolute right-5 top-5 grid h-12 w-12 place-items-center rounded-full bg-white/10 hover:bg-crimson"><Close /></button>
    </div>
  );
}

export default function CaseStudy() {
  const { slug } = useParams();
  const root = useRef(null);
  const [zoom, setZoom] = useState("");
  const close = useCallback(() => setZoom(""), []);
  const i = projects.findIndex((p) => p.slug === slug);

  useGSAP(() => {
    if (i < 0) return;
    gsap.from(".cs-fade", { y: 30, opacity: 0, duration: 1.1, stagger: 0.08, ease: "expo.out", delay: 0.1 });
    gsap.fromTo(".cs-img", { clipPath: "inset(0% 100% 0% 0% round 28px)" }, { clipPath: "inset(0% 0% 0% 0% round 28px)", duration: 1.6, ease: "expo.inOut" });
  }, { scope: root, dependencies: [slug], revertOnUpdate: true });

  if (i < 0) return <Navigate to="/" replace />;
  const p = projects[i];
  const next = projects[(i + 1) % projects.length];
  const prev = projects[(i - 1 + projects.length) % projects.length];
  const num = String(i + 1).padStart(2, "0");

  return (
    <main ref={root} className="min-h-screen bg-ti-700 pb-10 pt-36">
      <section className="mx-auto max-w-6xl px-6">
        <Link to="/#work" className="cs-fade text-sm text-white/50 transition hover:text-crimson">&larr; Back to work</Link>
        <p className="cs-fade mt-10 font-round text-sm tracking-[0.4em] text-white/60">CASE STUDY &middot; {num} OVERVIEW</p>

        <div className="mt-12 grid items-center gap-12 lg:grid-cols-2">
          <Tilt max={6} onClick={() => setZoom(p.image)} data-cursor="Zoom"
            className="cs-img relative cursor-zoom-in rounded-[1.75rem] border border-white/15 bg-ti-800/60 p-3 shadow-[0_40px_100px_-40px_rgba(230,57,70,0.45)]">
            <div className="group relative aspect-[16/10] overflow-hidden rounded-2xl">
              <ProjectImage src={p.image} alt={p.title} />
            </div>
          </Tilt>
          <div>
            <h1 className="cs-fade font-head text-4xl font-bold leading-tight md:text-6xl">{p.title}</h1>
            <p className="cs-fade mt-6 text-lg leading-relaxed text-white/75">{p.summary}</p>
            <p className="cs-fade mt-5 leading-relaxed text-white/60">{p.details}</p>
            <div className="cs-fade mt-8 flex flex-wrap gap-2.5">
              {p.stack.map((s) => (
                <span key={s} className="rounded-full border border-white/20 px-4 py-2 text-sm transition hover:-translate-y-0.5 hover:border-crimson hover:text-crimson">{s}</span>
              ))}
            </div>
            {p.live && (
              <Magnetic className="cs-fade mt-10">
                <a href={p.live} target="_blank" rel="noreferrer" data-cursor="Open" className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 font-medium text-ti-900 transition hover:bg-crimson hover:text-white">
                  Visit Live <ArrowUpRight className="h-4 w-4" />
                </a>
              </Magnetic>
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
              <Tilt max={6} className="relative h-full overflow-hidden rounded-2xl border border-white/10 bg-ti-800/70 p-7 transition-[border-color] hover:border-crimson/60">
                <p className="font-mono text-sm text-crimson">{String(k + 1).padStart(2, "0")}</p>
                <h3 className="mt-3 font-head text-xl font-bold">{f.title}</h3>
                <p className="mt-2 leading-relaxed text-white/60">{f.body}</p>
              </Tilt>
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
                <Tilt max={5} onClick={() => setZoom(src)} data-cursor="Zoom" className="relative cursor-zoom-in overflow-hidden rounded-2xl border border-white/10 bg-ti-800 p-2">
                  <img src={src} alt="" loading="lazy" className="w-full rounded-xl" />
                </Tilt>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {p.demo && <TryIt demo={p.demo} live={p.live} />}

      <div className="mx-auto mt-32 grid max-w-6xl gap-px border-t border-white/10 px-6 pt-16 md:grid-cols-2">
        <Link to={`/work/${prev.slug}`} className="group">
          <p className="font-round text-sm tracking-[0.35em] text-white/50">&larr; PREVIOUS</p>
          <p className="mt-3 font-head text-2xl font-bold transition group-hover:text-crimson md:text-4xl">{prev.title}</p>
        </Link>
        <Link to={`/work/${next.slug}`} className="group mt-10 md:mt-0 md:text-right">
          <p className="font-round text-sm tracking-[0.35em] text-white/50">NEXT &rarr;</p>
          <p className="mt-3 font-head text-2xl font-bold transition group-hover:text-crimson md:text-4xl">{next.title}</p>
        </Link>
      </div>

      <Lightbox src={zoom} onClose={close} />
    </main>
  );
}