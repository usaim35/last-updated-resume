import { useRef } from "react";
import { gsap, useGSAP } from "../lib/gsap";

export default function Reveal({ children, className = "", y = 40, delay = 0 }) {
  const ref = useRef(null);
  useGSAP(() => {
    gsap.from(ref.current, {
      y, opacity: 0, duration: 1.1, delay, ease: "expo.out",
      scrollTrigger: { trigger: ref.current, start: "top 88%" },
    });
  }, { scope: ref });
  return <div ref={ref} className={className}>{children}</div>;
}