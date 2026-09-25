import { useEffect, useState } from 'react';

const FloatingActions = () => {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 500);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="no-invert fixed bottom-5 right-5 z-[9997] flex flex-col items-end gap-3">
      {showTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Back to top"
          className="w-11 h-11 rounded-full bg-black/70 border border-white/15 backdrop-blur-md flex items-center justify-center text-white hover:border-[#f5b942] hover:text-[#f5b942] transition-all duration-300 shadow-lg"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 19V5M5 12l7-7 7 7" />
          </svg>
        </button>
      )}
      <a
        href="https://wa.me/923242788466?text=Hi%20Usaim!%20I%20saw%20your%20portfolio%20and%20I%27d%20like%20to%20connect."
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="relative w-14 h-14 rounded-full bg-gradient-to-br from-[#25d366] to-[#128c7e] flex items-center justify-center shadow-[0_6px_25px_rgba(37,211,102,0.5)] hover:scale-110 transition-transform duration-300"
      >
        <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-red-500 border-2 border-[#050505] animate-pulse"></span>
        <svg className="w-7 h-7" viewBox="0 0 24 24" fill="#fff">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347M12.05 22.06h-.005a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884" />
        </svg>
      </a>
    </div>
  );
};

export default FloatingActions;
