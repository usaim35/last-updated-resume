import { useState } from "react";
import Reveal from "../components/Reveal";
import Magnetic from "../components/Magnetic";
import { site } from "../data/site";
import { Mail, Phone, Pin, Copy, Check } from "../components/Icons";

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try { await navigator.clipboard.writeText(site.email); setCopied(true); setTimeout(() => setCopied(false), 1800); } catch (e) { /* ignore */ }
  };

  return (
    <section id="contact" className="relative overflow-hidden bg-white px-6 py-28 text-ti-900 md:py-36">
      <div className="pointer-events-none absolute -right-40 -top-40 h-96 w-96 rounded-full bg-crimson/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-crimson/10 blur-3xl" />
      <Reveal className="relative text-center">
        <h2 className="font-head text-4xl font-bold tracking-tight md:text-7xl">Got a project in mind?</h2>
        <p className="mx-auto mt-6 max-w-xl font-round leading-relaxed text-ti-600 md:text-lg">
          Tell me what you are building. I will reply with ideas and a clear plan, not a sales pitch.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Magnetic>
            <a href={`mailto:${site.email}`} data-cursor="Email" className="inline-block rounded-full bg-ti-900 px-10 py-5 font-semibold tracking-[0.15em] text-white transition hover:bg-crimson">SAY HELLO</a>
          </Magnetic>
          <Magnetic>
            <button onClick={copy} className="inline-flex items-center gap-2 rounded-full border border-ti-900/20 px-8 py-5 font-semibold transition hover:border-crimson hover:text-crimson">
              {copied ? <Check /> : <Copy />}{copied ? "Copied!" : "Copy email"}
            </button>
          </Magnetic>
        </div>
        <div className="mt-14 flex flex-wrap justify-center gap-x-12 gap-y-4 text-ti-600">
          <a href={`mailto:${site.email}`} className="flex items-center gap-3 hover:text-crimson"><Mail />{site.email}</a>
          <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="flex items-center gap-3 hover:text-crimson"><Phone />{site.phone}</a>
          <span className="flex items-center gap-3"><Pin />{site.location}</span>
        </div>
      </Reveal>
    </section>
  );
}