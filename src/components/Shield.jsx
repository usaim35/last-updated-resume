import { useEffect, useState } from "react";

// Production-only deterrent: blocks right-click, image dragging and DevTools shortcuts.
export default function Shield() {
  const [locked, setLocked] = useState(false);

  useEffect(() => {
    if (!import.meta.env.PROD) return;
    const menu = (e) => e.preventDefault();
    const drag = (e) => { if (e.target.closest && e.target.closest("img")) e.preventDefault(); };
    const keys = (e) => {
      const mod = e.ctrlKey || e.metaKey;
      const blocked =
        e.key === "F12" ||
        (mod && e.shiftKey && ["KeyI", "KeyJ", "KeyC"].includes(e.code)) ||
        (e.metaKey && e.altKey && ["KeyI", "KeyJ", "KeyC", "KeyU"].includes(e.code)) ||
        (mod && ["KeyU", "KeyS"].includes(e.code));
      if (blocked) { e.preventDefault(); e.stopPropagation(); }
    };
    document.addEventListener("contextmenu", menu);
    document.addEventListener("dragstart", drag);
    window.addEventListener("keydown", keys, true);

    const trap = new Function("debugger");
    const id = setInterval(() => {
      const t = performance.now();
      trap();
      if (performance.now() - t > 120) setLocked(true);
    }, 1500);

    return () => {
      document.removeEventListener("contextmenu", menu);
      document.removeEventListener("dragstart", drag);
      window.removeEventListener("keydown", keys, true);
      clearInterval(id);
    };
  }, []);

  if (!locked) return null;
  return (
    <div className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-black/95 backdrop-blur-xl">
      <p className="font-round text-xs tracking-[0.4em] text-crimson">PROTECTED</p>
      <h2 className="mt-4 font-head text-4xl font-bold">Inspection is disabled.</h2>
      <button onClick={() => window.location.reload()} className="mt-8 rounded-full border border-white/20 px-6 py-3 text-sm hover:bg-crimson">
        Close DevTools and reload
      </button>
    </div>
  );
}