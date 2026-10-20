import { useRef } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ#%&*+=?";

export default function ScrambleText({ text, className = "" }) {
  const ref = useRef(null);
  const raf = useRef(0);
  const run = () => {
    cancelAnimationFrame(raf.current);
    let frame = 0;
    const total = text.length * 3;
    const tick = () => {
      const el = ref.current;
      if (!el) return;
      el.textContent = text
        .split("")
        .map((ch, i) => (i < frame / 3 || ch === " " ? ch : CHARS[Math.floor(Math.random() * CHARS.length)]))
        .join("");
      frame++;
      if (frame <= total) raf.current = requestAnimationFrame(tick);
      else el.textContent = text;
    };
    tick();
  };
  return <span ref={ref} onMouseEnter={run} className={className}>{text}</span>;
}