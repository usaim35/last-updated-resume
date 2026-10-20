import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { site } from "../data/site";
import { goTo, LINKS } from "../lib/nav";
import { Mail, Menu, Close, Sparkle, Github, Linkedin } from "./Icons";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const nav = { pathname: useLocation().pathname, navigate: useNavigate() };

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => {
    const l = window.__lenis;
    if (open) l && l.stop(); else l && l.start();
  }, [open]);

  const go = (e, hash) => {
    e.preventDefault();
    const wasOpen = open;
    setOpen(false);
    setTimeout(() => goTo(hash, nav), wasOpen ? 350 : 0);
  };

  const iconBtn = "grid h-11 w-11 place-items-center rounded-full bg-white/10 transition hover:bg-crimson";

  return (
    <>
      <header className="fixed inset-x-0 top-4 z-50 px-3 md:top-5">
        <nav className={`mx-auto flex max-w-6xl items-center justify-between rounded-full border border-white/15 py-2.5 pl-6 pr-3 backdrop-blur-xl transition-colors duration-500 md:pl-8 ${scrolled ? "bg-ti-800/75" : "bg-white/5"}`}>
          <a href="#home" onClick={(e) => go(e, "#home")} className="font-round text-lg font-semibold tracking-wide md:text-xl">
            {site.name}
          </a>
          <ul className="hidden items-center gap-10 text-[15px] font-medium md:flex">
            {LINKS.map(([label, hash]) => (
              <li key={hash}>
                <a href={hash} onClick={(e) => go(e, hash)} className="transition hover:text-crimson">{label}</a>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-2.5">
            <a href={`mailto:${site.email}`} aria-label="Email" className={iconBtn}><Mail /></a>
            <button onClick={() => setOpen(true)} aria-label="Open menu" className={iconBtn}><Menu /></button>
          </div>
        </nav>
      </header>

      <div onClick={() => setOpen(false)} className={`fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm transition-opacity duration-500 ${open ? "opacity-100" : "pointer-events-none opacity-0"}`} />

      <aside className={`fixed right-0 top-0 z-[61] flex h-full w-full max-w-md flex-col bg-gradient-to-b from-ti-800 via-ti-900 to-black p-8 transition-transform duration-700 ease-[cubic-bezier(.7,0,.2,1)] md:p-10 ${open ? "translate-x-0" : "translate-x-full"}`}>
        <div className="relative flex items-center justify-center">
          <Sparkle className="h-8 w-8 text-crimson" />
          <button onClick={() => setOpen(false)} aria-label="Close menu" className={`absolute right-0 ${iconBtn}`}><Close /></button>
        </div>
        <ul className="mt-16 space-y-5">
          {LINKS.map(([label, hash], i) => (
            <li key={hash} style={{ transitionDelay: open ? `${150 + i * 70}ms` : "0ms" }} className={`transition-all duration-700 ${open ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"}`}>
              <a href={hash} onClick={(e) => go(e, hash)} className="font-head text-5xl font-medium transition hover:text-crimson">{label}</a>
            </li>
          ))}
        </ul>
        <div className="mt-auto flex gap-3 border-t border-white/10 pt-8">
          <a href={site.github} target="_blank" rel="noreferrer" aria-label="GitHub" className={iconBtn}><Github /></a>
          <a href={site.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className={iconBtn}><Linkedin /></a>
          <a href={`mailto:${site.email}`} aria-label="Email" className={iconBtn}><Mail /></a>
        </div>
      </aside>
    </>
  );
}