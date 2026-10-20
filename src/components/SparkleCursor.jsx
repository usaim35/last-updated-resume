import { useEffect, useRef } from "react";
import { Sparkle } from "./Icons";

export default function SparkleCursor() {
  const ref = useRef(null);
  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    let x = window.innerWidth / 2, y = window.innerHeight / 2, tx = x, ty = y, s = 1, ts = 1, raf;
    const move = (e) => { tx = e.clientX; ty = e.clientY; };
    const over = (e) => { ts = e.target.closest && e.target.closest("a, button, input, label") ? 1.8 : 1; };
    const loop = () => {
      x += (tx - x) * 0.25; y += (ty - y) * 0.25; s += (ts - s) * 0.2;
      if (ref.current) ref.current.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%) scale(${s}) rotate(${(s - 1) * 60}deg)`;
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
    <div ref={ref} className="pointer-events-none fixed left-0 top-0 z-[100] hidden text-white mix-blend-difference [@media(pointer:fine)]:block">
      <Sparkle className="h-6 w-6" />
    </div>
  );
}