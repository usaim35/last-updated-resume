import { useLocation, useNavigate } from "react-router-dom";
import { site } from "../data/site";
import { goTo, LINKS } from "../lib/nav";
import { Github, Linkedin } from "./Icons";

export default function Footer() {
  const nav = { pathname: useLocation().pathname, navigate: useNavigate() };
  return (
    <footer className="bg-black px-6 pb-10 pt-16">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 md:flex-row md:justify-between">
        <p className="font-round text-2xl font-semibold">{site.name}</p>
        <ul className="flex flex-wrap justify-center gap-8 text-white/70">
          {LINKS.map(([label, hash]) => (
            <li key={hash}>
              <a href={hash} onClick={(e) => { e.preventDefault(); goTo(hash, nav); }} className="transition hover:text-crimson">{label}</a>
            </li>
          ))}
        </ul>
        <div className="flex gap-3">
          <a href={site.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="grid h-11 w-11 place-items-center rounded-full bg-white/10 hover:bg-crimson"><Github /></a>
          <a href={site.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="grid h-11 w-11 place-items-center rounded-full bg-white/10 hover:bg-crimson"><Linkedin /></a>
        </div>
      </div>
      <p className="mt-14 border-t border-white/10 pt-8 text-center text-sm text-white/45">
        {"Designed & Developed by Usaim | \u00A9 All Rights Reserved"}
      </p>
    </footer>
  );
}