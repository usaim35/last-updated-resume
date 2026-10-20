import { useState } from "react";

// Shows the WHOLE screenshot (no cropping) on a blurred copy of itself
export default function ProjectImage({ src, alt = "" }) {
  const [ok, setOk] = useState(true);
  if (!ok) {
    return <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(230,57,70,0.35),transparent_60%),linear-gradient(#1a1a1a,#0b0b0b)]" />;
  }
  return (
    <div className="absolute inset-0 overflow-hidden bg-ti-900">
      <img src={src} alt="" aria-hidden="true" onError={() => setOk(false)} className="absolute inset-0 h-full w-full scale-125 object-cover opacity-50 blur-2xl" />
      <img src={src} alt={alt} loading="lazy" className="relative h-full w-full object-contain transition duration-[1200ms] ease-out group-hover:scale-[1.04]" />
    </div>
  );
}