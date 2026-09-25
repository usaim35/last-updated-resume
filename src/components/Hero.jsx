import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import characterImg from '../assets/character.svg';

const Hero = ({ theme, toggleTheme }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDownloadingResume, setIsDownloadingResume] = useState(false);
  const sectionRef = useRef(null);
  const cardRef = useRef(null);
  const glareRef = useRef(null);
  const spotlightRef = useRef(null);
  const cursorDotRef = useRef(null);
  const cursorRingRef = useRef(null);
  const contentRef = useRef(null);

  // Direct raw-GitHub link to resume.pdf — update the repo name below if you
  // move the file to a different repository or branch.
  const RESUME_URL = 'https://raw.githubusercontent.com/usaim35/last-updated-resume/main/resume.pdf';

  const downloadResume = async () => {
    setIsDownloadingResume(true);
    try {
      const res = await fetch(RESUME_URL);
      if (!res.ok) throw new Error('not found');
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'Muhammad_Usaim_Resume.pdf';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(() => URL.revokeObjectURL(url), 3000);
    } catch (err) {
      // Fallback: open directly if fetch/CORS fails, still lets them save it
      window.open(RESUME_URL, '_blank');
    } finally {
      setIsDownloadingResume(false);
    }
  };

  const developerRoles = [
    'CODE WITH PURPOSE // SHIP WITH CARE',
    'AUTOMATE THE BORING STUFF',
    'BUILT FOR PRODUCTION',
    'ALWAYS DEPLOYING // ALWAYS LEARNING'
  ];

  useEffect(() => {
    const section = sectionRef.current;
    const card = cardRef.current;
    const content = contentRef.current;
    if (!section || !card || !content) return;

    // --- GSAP CINEMATIC ENTRANCE ANIMATION ---
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    tl.fromTo(
      section.querySelector('header'),
      { y: -60, opacity: 0 },
      { y: 0, opacity: 1, duration: 1 }
    )
    .fromTo(
      content.querySelectorAll('.hero-anim-item'),
      { y: 50, opacity: 0, filter: "blur(10px)" },
      { y: 0, opacity: 1, filter: "blur(0px)", duration: 1.1, stagger: 0.12 },
      "-=0.7"
    )
    .fromTo(
      card,
      { scale: 0.75, opacity: 0, rotationY: 35, rotationX: -15 },
      { scale: 1, opacity: 1, rotationY: 0, rotationX: 0, duration: 1.4, ease: "back.out(1.2)" },
      "-=0.9"
    );

    // --- MOUSE PHYSICS & SPOTLIGHT TRACKING ---
    gsap.set([cursorDotRef.current, cursorRingRef.current], {
      scale: 0.5,
      opacity: 0,
      transformOrigin: "50% 50%"
    });

    const xToDot = gsap.quickTo(cursorDotRef.current, "x", { duration: 0.05, ease: "power2.out" });
    const yToDot = gsap.quickTo(cursorDotRef.current, "y", { duration: 0.05, ease: "power2.out" });
    
    const xToRing = gsap.quickTo(cursorRingRef.current, "x", { duration: 0.15, ease: "power3.out" });
    const yToRing = gsap.quickTo(cursorRingRef.current, "y", { duration: 0.15, ease: "power3.out" });

    const xTilt = gsap.quickTo(card, "rotationY", { duration: 0.4, ease: "power3.out" });
    const yTilt = gsap.quickTo(card, "rotationX", { duration: 0.4, ease: "power3.out" });
    const glareX = gsap.quickTo(glareRef.current, "x", { duration: 0.3, ease: "power2.out" });
    const glareY = gsap.quickTo(glareRef.current, "y", { duration: 0.3, ease: "power2.out" });

    const handleMouseMove = (e) => {
      const rect = section.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const dotSize = 12;
      const ringSize = 48;

      // Update Spotlight position instantly via inline style
      if (spotlightRef.current) {
        spotlightRef.current.style.transform = `translate3d(${x - 300}px, ${y - 300}px, 0)`;
      }

      // Update Custom Cursor coordinates
      xToDot(x - dotSize / 2);
      yToDot(y - dotSize / 2);
      xToRing(x - ringSize / 2);
      yToRing(y - ringSize / 2);

      // Card 3D Perspective Calculations
      const cardRect = card.getBoundingClientRect();
      const cardCenterX = cardRect.left + cardRect.width / 2 - rect.left;
      const cardCenterY = cardRect.top + cardRect.height / 2 - rect.top;

      const rotateX = -((y - cardCenterY) / (cardRect.height / 2)) * 16;
      const rotateY = ((x - cardCenterX) / (cardRect.width / 2)) * 16;

      xTilt(rotateY);
      yTilt(rotateX);

      // Holographic Glare mapping
      glareX((x - cardRect.left) - cardRect.width / 2);
      glareY((y - cardRect.top) - cardRect.height / 2);
    };

    const handleMouseEnter = () => {
      gsap.to([cursorDotRef.current, cursorRingRef.current], {
        opacity: 1,
        scale: 1,
        duration: 0.3,
        ease: "power2.out"
      });
      if (spotlightRef.current) gsap.to(spotlightRef.current, { opacity: 1, duration: 0.3 });
    };

    const handleMouseLeave = () => {
      gsap.to([cursorDotRef.current, cursorRingRef.current], {
        opacity: 0,
        scale: 0.5,
        duration: 0.3,
        ease: "power2.inOut"
      });
      if (spotlightRef.current) gsap.to(spotlightRef.current, { opacity: 0, duration: 0.3 });
      xTilt(0);
      yTilt(0);
    };

    section.addEventListener("mousemove", handleMouseMove);
    section.addEventListener("mouseenter", handleMouseEnter);
    section.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      section.removeEventListener("mousemove", handleMouseMove);
      section.removeEventListener("mouseenter", handleMouseEnter);
      section.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative w-full min-h-screen lg:h-screen bg-[#050505] overflow-hidden flex flex-col justify-between select-none lg:cursor-none"
    >
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: flex;
          width: max-content;
          animation: marquee 35s linear infinite;
        }
      `}</style>

      {/* 1. Cinematic Background Gradient & Marquee */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-black/90 to-[#050505] z-0">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden opacity-10">
          <div className="flex whitespace-nowrap animate-marquee">
            {[...developerRoles, ...developerRoles].map((role, idx) => (
              <span key={idx} className="text-[14vw] font-black text-[#f5b942] mx-8 uppercase tracking-tighter">
                {role} &bull;
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* 2. Direct Mouse Tracking Spotlight Beam (Glows wherever you move) */}
      <div
        ref={spotlightRef}
        className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full pointer-events-none z-10 opacity-0 blur-[90px] transition-opacity duration-300 hidden lg:block"
        style={{
          background: 'radial-gradient(circle, rgba(245,185,66,0.3) 0%, rgba(245,185,66,0.08) 40%, transparent 70%)'
        }}
      ></div>

      {/* 3. Main Content Layer */}
      <div ref={contentRef} className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-12 min-h-full flex flex-col justify-between pt-28 pb-10 sm:pb-12">
        
        {/* Top Netflix Cinematic Badge */}
        <div className="hero-anim-item flex items-center justify-between w-full">
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded bg-black/80 backdrop-blur-md md:backdrop-blur-2xl border border-[#f5b942]/40 text-[10px] sm:text-xs font-mono uppercase tracking-wider sm:tracking-widest text-white shadow-2xl">
            <span className="w-2 h-2 rounded-full bg-[#f5b942] animate-ping shrink-0"></span>
            <span className="text-[#f5b942] font-bold tracking-wider">FULL-STACK & DEVOPS ENGINEERING</span>
            <span className="text-white/40 hidden sm:inline">|</span>
            <span className="text-white/80 hidden sm:inline">FRONTEND • BACKEND • DEVOPS</span>
          </div>
          <div className="hidden md:flex items-center gap-2 text-xs font-mono text-white/50 tracking-wider">
            <span className="px-2 py-0.5 border border-white/20 rounded bg-black/40">DAE Software Engineering Technology</span>
            <span className="px-2 py-0.5 border border-white/20 rounded bg-black/40">2023 – 2026</span>
          </div>
        </div>

        {/* Main Center Cinematic Stage Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-8 lg:gap-8 my-auto py-6 lg:py-0">
          
          {/* Left Side: Developer Story & Description */}
          <div className="lg:col-span-5 flex flex-col items-start space-y-4 sm:space-y-5 text-left">
            <h1 className="hero-anim-item text-4xl sm:text-6xl md:text-7xl font-black tracking-tighter text-white leading-[0.95] drop-shadow-[0_15px_30px_rgba(0,0,0,0.9)] break-words">
              USAIM <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f5b942] via-[#ffd580] to-[#b8860b] drop-shadow-[0_0_35px_rgba(245,185,66,0.6)]">
                FULL-STACK Developer / Engineer
              </span>
            </h1>

            <div className="hero-anim-item flex flex-wrap items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-mono text-[#f5b942] font-bold">
              <span className="px-2 py-0.5 bg-[#f5b942]/10 border border-[#f5b942]/30 rounded text-[#f5b942]">DEVOPS • WEB DESIGN </span>
              <span className="text-white/40">•</span>
              <span>REST APIs • CI/CD</span>
              <span className="text-white/40">•</span>
              <span className="text-white/70">React • ASP.NET Core • Node.js • Docker • SQL Server</span>
            </div>

            <p className="hero-anim-item text-xs sm:text-sm md:text-base text-white/80 font-light leading-relaxed max-w-md drop-shadow">
              I build full-stack web applications, automate deployment pipelines, and design clean interfaces — combining modern frontend development with DevOps practices, REST APIs, and database-driven backends.
            </p>

            {/* Action Button Set */}
            <div className="hero-anim-item flex flex-wrap items-center gap-3 sm:gap-4 pt-2">
              <a
                href="#projects"
                className="px-6 sm:px-8 py-3 sm:py-3.5 bg-white text-black font-bold text-xs uppercase tracking-widest rounded hover:bg-[#f5b942] hover:text-black transition-all duration-300 shadow-[0_10px_35px_rgba(245,185,66,0.4)] flex items-center gap-2 hover:scale-105 active:scale-95"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
                View Projects
              </a>
              <a
                href="#contact"
                className="px-6 sm:px-8 py-3 sm:py-3.5 bg-neutral-900/80 text-white border border-white/20 font-bold text-xs uppercase tracking-widest rounded hover:bg-neutral-800 hover:border-[#f5b942]/60 hover:text-[#f5b942] transition-all duration-300 shadow-xl backdrop-blur-md flex items-center gap-2 hover:scale-105 active:scale-95"
              >
                <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                Contact Me
              </a>
              <button
                type="button"
                onClick={downloadResume}
                disabled={isDownloadingResume}
                className="px-6 sm:px-8 py-3 sm:py-3.5 bg-transparent text-[#f5b942] border border-[#f5b942]/50 font-bold text-xs uppercase tracking-widest rounded hover:bg-[#f5b942]/10 hover:border-[#f5b942] transition-all duration-300 flex items-center gap-2 hover:scale-105 active:scale-95 disabled:opacity-60 disabled:cursor-wait disabled:scale-100"
              >
                {isDownloadingResume ? (
                  <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="9" strokeOpacity="0.25" />
                    <path d="M21 12a9 9 0 0 0-9-9" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                    <path d="M12 3v12m0 0l-4-4m4 4l4-4M5 21h14" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
                {isDownloadingResume ? 'Downloading...' : 'Download Resume'}
              </button>
            </div>
          </div>

          {/* Center: Interactive 3D Holographic Tilt Developer Poster Frame */}
          <div className="lg:col-span-4 flex justify-center perspective-[1200px] w-full">
            <div 
              ref={cardRef}
              className="relative group transform-gpu transition-transform duration-100 ease-out will-change-transform max-w-full"
            >
              {/* Cinematic Cyan Neon Back Glow */}
              <div className="absolute -inset-3 bg-gradient-to-r from-[#f5b942]/60 via-[#b8860b]/40 to-[#8a6200]/20 rounded-3xl blur-3xl opacity-90 group-hover:opacity-100 animate-pulse duration-1000"></div>
              
              {/* Poster Card with Glossy Sheen */}
              <div className="relative w-[280px] sm:w-[320px] max-w-[calc(100vw-48px)] p-3 sm:p-3.5 bg-[#141414]/90 backdrop-blur-md md:backdrop-blur-2xl rounded-2xl border border-[#f5b942]/40 shadow-[0_0_30px_rgba(245,185,66,0.25)] overflow-hidden mx-auto">
                
                {/* Dynamic Specular Glare Layer */}
                <div 
                  ref={glareRef}
                  className="absolute inset-[-50%] w-[200%] h-[200%] bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none transform-gpu z-40"
                ></div>

                {/* Cinematic Cyber Developer Identity Card */}
                <div className="w-full h-[360px] sm:h-[410px] md:h-[430px] rounded-xl bg-gradient-to-b from-[#04161d] via-[#091114] to-[#05090b] border border-[#f5b942]/30 p-4 sm:p-5 md:p-6 flex flex-col justify-between relative overflow-hidden group-hover:scale-[1.01] transition-transform duration-500">
                  {/* Subtle Grid Accent */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#f5b94208_1px,transparent_1px),linear-gradient(to_bottom,#f5b94208_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>

                  {/* Character Image Container */}
                  <div className="relative z-10 my-auto w-full flex items-center justify-center py-1">
                    <div className="relative w-full max-w-[190px] sm:max-w-[230px] md:max-w-[245px] h-[180px] sm:h-[215px] md:h-[230px] rounded-xl bg-gradient-to-b from-[#f5b942]/10 via-[#041d26]/30 to-transparent border border-[#f5b942]/25 flex items-end justify-center overflow-hidden shadow-[inset_0_0_20px_rgba(245,185,66,0.08),0_10px_25px_rgba(0,0,0,0.5)]">
                      {/* Subtle Ambient Radial Glow Behind Character */}
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(245,185,66,0.22)_0%,rgba(245,185,66,0.05)_55%,transparent_75%)] pointer-events-none"></div>

                      {/* Character Transparent PNG */}
                      <img 
                        src={characterImg} 
                        alt="Muhammad Usaim - Full Stack Developer" 
                        className="relative z-10 max-h-full w-auto object-contain object-bottom drop-shadow-[0_8px_25px_rgba(245,185,66,0.35)] filter transition-transform duration-500 group-hover:scale-105 pointer-events-none select-none"
                      />
                    </div>
                  </div>

                  {/* Identity Bottom Section */}
                  <div className="relative z-10 text-center space-y-2 pt-1">
                    <div className="space-y-0.5">
                      <h4 className="text-lg md:text-xl font-black text-white tracking-widest uppercase drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
                        USAIM
                      </h4>
                      <p className="text-[9px] sm:text-[10px] font-mono uppercase tracking-widest text-[#f5b942] font-bold">
                        FULL STACK DEVELOPER / ENGINEER
                      </p>
                    </div>

                    {/* Subtle Divider Underneath */}
                    <div className="w-full pt-1 flex items-center gap-2">
                      <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#f5b942]/40 to-[#f5b942]/20"></div>
                      <span className="w-1.5 h-1.5 rounded-full bg-[#f5b942]/60 shadow-[0_0_6px_#f5b942]"></span>
                      <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-[#f5b942]/40 to-[#f5b942]/20"></div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* Right Side: Technical Specs & Stack */}
          <div className="hero-anim-item lg:col-span-3 flex flex-col items-start lg:items-end space-y-4 text-left lg:text-right w-full lg:w-auto">
            <div className="p-4 sm:p-5 bg-black/80 backdrop-blur-md md:backdrop-blur-2xl border border-white/15 rounded-xl shadow-2xl w-full sm:max-w-xs">
              <h3 className="text-xs font-mono uppercase tracking-widest text-[#f5b942] font-bold mb-2">CORE CAPABILITIES</h3>
              <p className="text-xs text-white/80 leading-relaxed font-light whitespace-pre-line">
                Full-Stack Development
DevOps & CI/CD Pipelines
REST APIs & Databases
Web Design & UI/UX
Automation Scripting
Docker & Linux
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Cinematic Ticker */}
        <div className="hero-anim-item flex items-center justify-between sm:justify-end text-[9px] sm:text-[10px] font-mono text-white/50 tracking-widest uppercase gap-2 sm:gap-3">
          <span>BUILD &bull; DEPLOY &bull; AUTOMATE &bull; REPEAT</span>
          <span className="w-8 sm:w-12 h-1 bg-[#f5b942] rounded-full inline-block shadow-[0_0_10px_#f5b942]"></span>
        </div>
      </div>

      {/* 4. Ultra Pro Max Custom Precision Cursor Suite */}
      <div
        ref={cursorDotRef}
        className="absolute top-0 left-0 z-50 pointer-events-none w-3 h-3 bg-[#f5b942] rounded-full shadow-[0_0_15px_#f5b942] hidden lg:block"
      ></div>

      <div
        ref={cursorRingRef}
        className="absolute top-0 left-0 z-50 pointer-events-none w-12 h-12 border border-[#f5b942]/60 rounded-full flex items-center justify-center backdrop-blur-[1px] hidden lg:block"
      ></div>

      {/* --- NETFLIX-THEMED DEVELOPER NAVBAR --- */}
      <header className="absolute top-0 inset-x-0 z-50 w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-5 sm:py-6 flex items-center justify-between pointer-events-auto">
        <a href="#home" className="text-2xl font-black text-[#f5b942] tracking-tighter flex items-center gap-2 drop-shadow-[0_2px_15px_rgba(245,185,66,0.8)]">
          USAIM<span className="w-1.5 h-1.5 rounded-full bg-white inline-block"></span>
        </a>
        <nav className="hidden md:flex items-center gap-8 text-xs font-mono uppercase tracking-widest text-white/80">
          <a href="#home" className="hover:text-[#f5b942] transition-colors">Home</a>
          <a href="#about" className="hover:text-[#f5b942] transition-colors">About</a>
          <a href="#experience" className="hover:text-[#f5b942] transition-colors">Experience</a>
          <a href="#expertise" className="hover:text-[#f5b942] transition-colors">Expertise</a>
          <a href="#skills" className="hover:text-[#f5b942] transition-colors">Skills</a>
          <a href="#projects" className="hover:text-[#f5b942] transition-colors">Projects</a>
          <a href="#contact" className="hover:text-[#f5b942] transition-colors">Contact</a>
        </nav>
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="social-icon-row flex items-center gap-2">
            <a href="https://x.com/CxGamer291310" target="_blank" rel="noopener noreferrer" title="X (Twitter)" className="social-icon-btn no-invert">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </a>
            <a href="https://discord.com/users/1135150580118077571" target="_blank" rel="noopener noreferrer" title="Discord" className="social-icon-btn no-invert">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.37a19.79 19.79 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.955 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.947 2.418-2.157 2.418Z"/></svg>
            </a>
            <a href="https://www.linkedin.com/in/muhammad-usaim-436367268/" target="_blank" rel="noopener noreferrer" title="LinkedIn" className="social-icon-btn no-invert">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            </a>
            <a href="https://wa.me/923242788466" target="_blank" rel="noopener noreferrer" title="WhatsApp" className="social-icon-btn no-invert">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347M12.05 22.06h-.005a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884"/></svg>
            </a>
            <a href="https://github.com/usaim35" target="_blank" rel="noopener noreferrer" title="GitHub" className="social-icon-btn no-invert">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
            </a>
          </div>
          <button
            type="button"
            onClick={toggleTheme}
            title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            className="theme-toggle-btn no-invert"
          >
            {theme === 'dark' ? (
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>
            ) : (
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
            )}
          </button>
          <a
            href="#contact"
            className="px-4 sm:px-5 py-2 rounded bg-[#f5b942] hover:bg-[#ffd580] text-black font-black text-xs uppercase tracking-widest transition-all duration-300 shadow-[0_0_25px_rgba(245,185,66,0.7)] hover:scale-105 active:scale-95"
          >
            Hire Me
          </a>
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="md:hidden p-2 rounded-lg bg-black/80 border border-white/20 text-[#f5b942] hover:border-[#f5b942] transition-colors focus:outline-none"
          >
            {isMobileMenuOpen ? (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Navigation Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-[#0d0d0d]/98 backdrop-blur-md md:backdrop-blur-2xl border-b border-[#f5b942]/30 shadow-[0_20px_40px_rgba(0,0,0,0.9)] py-5 px-6 flex flex-col gap-3">
            <nav className="flex flex-col gap-2 text-xs font-mono uppercase tracking-widest text-white/90">
              {[
                { name: 'Home', href: '#home' },
                { name: 'About', href: '#about' },
                { name: 'Experience', href: '#experience' },
                { name: 'Expertise', href: '#expertise' },
                { name: 'Skills', href: '#skills' },
                { name: 'Projects', href: '#projects' },
                { name: 'Contact', href: '#contact' },
              ].map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="py-2.5 px-3 rounded hover:bg-[#f5b942]/10 hover:text-[#f5b942] transition-colors border-l-2 border-transparent hover:border-[#f5b942]"
                >
                  {item.name}
                </a>
              ))}
            </nav>
            <div className="flex items-center justify-center gap-3 pt-3 border-t border-white/10 no-invert">
              <a href="https://x.com/CxGamer291310" target="_blank" rel="noopener noreferrer" title="X (Twitter)" className="social-icon-btn"><svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg></a>
              <a href="https://discord.com/users/1135150580118077571" target="_blank" rel="noopener noreferrer" title="Discord" className="social-icon-btn"><svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.37a19.79 19.79 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.955 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.947 2.418-2.157 2.418Z"/></svg></a>
              <a href="https://www.linkedin.com/in/muhammad-usaim-436367268/" target="_blank" rel="noopener noreferrer" title="LinkedIn" className="social-icon-btn"><svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg></a>
              <a href="https://wa.me/923242788466" target="_blank" rel="noopener noreferrer" title="WhatsApp" className="social-icon-btn"><svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347M12.05 22.06h-.005a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884"/></svg></a>
              <a href="https://github.com/usaim35" target="_blank" rel="noopener noreferrer" title="GitHub" className="social-icon-btn"><svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg></a>
            </div>
            <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-white/40">
              <span>USAIM // PORTFOLIO</span>
              <span className="text-[#f5b942] flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#f5b942] animate-ping"></span>
                AVAILABLE
              </span>
            </div>
          </div>
        )}
      </header>
    </section>
  );
};

export default Hero;