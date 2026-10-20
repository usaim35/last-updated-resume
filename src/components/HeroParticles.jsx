import { useEffect, useRef } from "react";

// 3D star-field: particles fly toward you and steer with the mouse
export default function HeroParticles({ count = 260 }) {
  const ref = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const c = ref.current;
    const ctx = c.getContext("2d");
    let w = 0, h = 0, raf = 0, visible = true;
    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
    const pts = Array.from({ length: count }, () => ({
      x: (Math.random() - 0.5) * 2, y: (Math.random() - 0.5) * 2, z: Math.random(), red: Math.random() < 0.25,
    }));

    const size = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = c.clientWidth; h = c.clientHeight;
      c.width = w * dpr; c.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    const move = (e) => { mouse.tx = e.clientX / window.innerWidth - 0.5; mouse.ty = e.clientY / window.innerHeight - 0.5; };

    function loop() {
      cancelAnimationFrame(raf);
      if (!visible) return;
      mouse.x += (mouse.tx - mouse.x) * 0.05;
      mouse.y += (mouse.ty - mouse.y) * 0.05;
      ctx.clearRect(0, 0, w, h);
      const cx = w / 2 + mouse.x * w * 0.3;
      const cy = h / 2 + mouse.y * h * 0.3;
      for (const p of pts) {
        p.z -= 0.0025;
        if (p.z <= 0.02) { p.z = 1; p.x = (Math.random() - 0.5) * 2; p.y = (Math.random() - 0.5) * 2; }
        const k = 0.5 / p.z;
        const sx = cx + p.x * k * w * 0.5;
        const sy = cy + p.y * k * h * 0.5;
        if (sx < -10 || sx > w + 10 || sy < -10 || sy > h + 10) continue;
        const r = Math.max(0.3, (1 - p.z) * 2.2);
        const a = (1 - p.z) * 0.9;
        ctx.beginPath();
        ctx.fillStyle = p.red ? `rgba(230,57,70,${a})` : `rgba(255,255,255,${a * 0.75})`;
        ctx.arc(sx, sy, r, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(loop);
    }

    const io = new IntersectionObserver(([en]) => { visible = en.isIntersecting; if (visible) loop(); });
    size();
    window.addEventListener("resize", size);
    window.addEventListener("mousemove", move);
    io.observe(c);
    loop();
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", size);
      window.removeEventListener("mousemove", move);
    };
  }, [count]);

  return <canvas ref={ref} className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true" />;
}