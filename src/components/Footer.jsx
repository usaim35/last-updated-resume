import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#050505] text-white py-12 md:py-16 px-4 sm:px-6 md:px-12 border-t border-white/10 select-none relative z-10">
      <div className="max-w-7xl mx-auto flex flex-col space-y-8 sm:space-y-12">
        
        {/* Top Section: Brand & Quick Links */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 sm:gap-8 pb-8 sm:pb-12 border-b border-white/10">
          <div className="space-y-1.5 sm:space-y-2">
            <div className="text-2xl font-black text-[#f5b942] tracking-tighter flex items-center gap-2 drop-shadow-[0_2px_15px_rgba(245,185,66,0.8)]">
              USAIM<span className="w-1.5 h-1.5 rounded-full bg-white inline-block"></span>
            </div>
            <p className="text-[11px] sm:text-xs font-mono text-white/50 tracking-wider sm:tracking-widest uppercase">
             // BUILD • DEPLOY • AUTOMATE • REPEAT &bull; 2026
            </p>
          </div>

          {/* Quick Navigation Links */}
          <nav className="flex flex-wrap gap-4 sm:gap-6 md:gap-8 text-xs font-mono uppercase tracking-wider sm:tracking-widest text-white/70">
            <a href="#home" className="hover:text-[#f5b942] transition-colors">Home</a>
            <a href="#about" className="hover:text-[#f5b942] transition-colors">About</a>
            <a href="#experience" className="hover:text-[#f5b942] transition-colors">Experience</a>
            <a href="#expertise" className="hover:text-[#f5b942] transition-colors">Expertise</a>
            <a href="#skills" className="hover:text-[#f5b942] transition-colors">Skills</a>
            <a href="#projects" className="hover:text-[#f5b942] transition-colors">Projects</a>
            <a href="#contact" className="hover:text-[#f5b942] transition-colors">Contact</a>
          </nav>
        </div>

        {/* Middle Section: Socials & External Profiles */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-6 text-xs font-mono text-white/60">
          <div className="flex items-center gap-4 sm:gap-5">
            {/* GitHub Icon */}
            <a 
              href="https://github.com/usaim35"
              target="_blank"
              rel="noopener noreferrer"
              title="GitHub Profile"
              className="text-white/60 hover:text-[#f5b942] transition-all duration-300 hover:drop-shadow-[0_0_10px_rgba(245,185,66,0.8)]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-label="GitHub"
              >
                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>

            <span className="text-white/20 font-mono text-sm">//</span>

            {/* X (Twitter) Icon */}
            <a 
              href="https://x.com/CxGamer291310"
              target="_blank"
              rel="noopener noreferrer"
              title="X (Twitter) Profile"
              className="text-white/60 hover:text-[#f5b942] transition-all duration-300 hover:drop-shadow-[0_0_10px_rgba(245,185,66,0.8)]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-label="X (Twitter)"
              >
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>

            {/* WhatsApp Icon */}
            <a 
              href="https://wa.me/923242788466"
              target="_blank"
              rel="noopener noreferrer"
              title="WhatsApp"
              className="text-white/60 hover:text-[#f5b942] transition-all duration-300 hover:drop-shadow-[0_0_10px_rgba(245,185,66,0.8)]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-label="WhatsApp"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347M12.05 22.06h-.005a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884"/>
              </svg>
            </a>
          </div>

          <div className="text-white/40 tracking-wider sm:tracking-widest uppercase break-words">
            LOCATION: KARACHI, SINDH, PK
          </div>
        </div>

        {/* Bottom Copyright & Cinematic Tagline */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-4 pt-6 border-t border-white/5 text-[10px] sm:text-[11px] font-mono text-white/40 uppercase tracking-wider sm:tracking-widest">
          <p>&copy; {new Date().getFullYear()} Muhammad Usaim. All Rights Reserved.</p>
          <p className="text-[#f5b942]/80">AVAILABLE FOR HIRE &bull; BUILT WITH REACT & GSAP</p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;