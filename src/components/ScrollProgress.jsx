import { useEffect, useRef, useState } from "react";

export default function ScrollProgress() {
  const bar = useRef(null);
  const ring = useRef(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const on = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? window.scrollY / max : 0;
      if (bar.current) bar.current.style.transform = `scaleX(${p})`;
      if (ring.current) ring.current.style.strokeDashoffset = String(113 - 113 * p);
      setShow(window.scrollY > 600);
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  const top = () => {
    if (window.__lenis) window.__lenis.scrollTo(0, { duration: 1.6 });
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <div ref={bar} className="fixed left-0 top-0 z-[70] h-[3px] w-full origin-left scale-x-0 bg-crimson" />
      <button onClick={top} aria-label="Back to top" data-cursor="Top"
        className={`fixed bottom-6 right-6 z-[70] grid h-14 w-14 place-items-center rounded-full bg-ti-800/80 backdrop-blur transition duration-500 hover:bg-crimson ${show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"}`}>
        <svg className="absolute inset-0 -rotate-90" viewBox="0 0 40 40">
          <circle cx="20" cy="20" r="18" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="2" />
          <circle ref={ring} cx="20" cy="20" r="18" fill="none" stroke="#E63946" strokeWidth="2" strokeDasharray="113" strokeDashoffset="113" strokeLinecap="round" />
        </svg>
        <svg viewBox="0 0 24 24" className="relative h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 19V5M5 12l7-7 7 7" />
        </svg>
      </button>
    </>
  );
}