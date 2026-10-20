import { useEffect, useRef } from "react";
import { Sparkle } from "./Icons";

export default function SparkleCursor() {
  const star = useRef(null);
  const label = useRef(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    let x = window.innerWidth / 2, y = window.innerHeight / 2, tx = x, ty = y, s = 1, ts = 1, raf;
    const move = (e) => { tx = e.clientX; ty = e.clientY; };
    const over = (e) => {
      const t = e.target.closest ? e.target.closest("[data-cursor], a, button, input, label") : null;
      ts = t ? 1.8 : 1;
      const text = t ? t.getAttribute("data-cursor") : "";
      if (label.current) {
        label.current.textContent = text || "";
        label.current.style.opacity = text ? "1" : "0";
      }
    };
    const loop = () => {
      x += (tx - x) * 0.25; y += (ty - y) * 0.25; s += (ts - s) * 0.2;
      if (star.current) star.current.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%) scale(${s}) rotate(${(s - 1) * 60}deg)`;
      if (label.current) label.current.style.transform = `translate3d(${x + 22}px, ${y + 14}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    loop();
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div ref={star} className="pointer-events-none fixed left-0 top-0 z-[100] hidden text-white mix-blend-difference [@media(pointer:fine)]:block">
        <Sparkle className="h-6 w-6" />
      </div>
      <span ref={label} className="pointer-events-none fixed left-0 top-0 z-[100] hidden rounded-full bg-crimson px-3 py-1 text-xs font-semibold uppercase tracking-widest text-white opacity-0 transition-opacity duration-300 [@media(pointer:fine)]:block" />
    </>
  );
}