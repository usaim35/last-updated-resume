import { useRef } from "react";
import { gsap } from "../lib/gsap";

// 3D tilt + light glare that follows the mouse
export default function Tilt({ as: Tag = "div", children, className = "", max = 10, scale = 1.02, glare = true, ...rest }) {
  const ref = useRef(null);
  const fine = () => window.matchMedia("(pointer: fine)").matches;

  const move = (e) => {
    if (!fine()) return;
    const el = ref.current;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    gsap.to(el, { rotateY: (px - 0.5) * max * 2, rotateX: -(py - 0.5) * max * 2, scale, transformPerspective: 900, duration: 0.5, ease: "power3.out" });
    el.style.setProperty("--gx", px * 100 + "%");
    el.style.setProperty("--gy", py * 100 + "%");
  };
  const leave = () => gsap.to(ref.current, { rotateX: 0, rotateY: 0, scale: 1, duration: 0.9, ease: "elastic.out(1, 0.45)" });

  return (
    <Tag ref={ref} onMouseMove={move} onMouseLeave={leave} className={`tilt ${className}`} {...rest}>
      {children}
      {glare && <span className="glare" aria-hidden="true" />}
    </Tag>
  );
}