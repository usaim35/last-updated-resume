import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // --- Cinematic Stagger Entrance on Scroll ---
    gsap.fromTo(
      cardRefs.current,
      { y: 80, opacity: 0, scale: 0.95 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1,
        stagger: 0.2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // --- Interactive Magnetic Mouse Spotlight per Bento Card ---
    const cards = cardRefs.current;
    const handleMouseMove = (e, card) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    };

    cards.forEach((card) => {
      if (!card) return;
      const listener = (e) => handleMouseMove(e, card);
      card.addEventListener('mousemove', listener);
      return () => card.removeEventListener('mousemove', listener);
    });

  }, []);

  const addToRefs = (el) => {
    if (el && !cardRefs.current.includes(el)) {
      cardRefs.current.push(el);
    }
  };

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative w-full min-h-screen bg-[#050505] text-white py-20 md:py-32 px-4 sm:px-6 md:px-12 flex flex-col justify-center select-none overflow-hidden"
    >
      {/* Background Cinematic Cyan Ambient Glows */}
      <div className="absolute top-1/4 left-10 w-[500px] max-w-full h-[500px] bg-[#f5b942]/10 rounded-full blur-[60px] md:blur-[160px] pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-[500px] max-w-full h-[500px] bg-[#b8860b]/10 rounded-full blur-[60px] md:blur-[160px] pointer-events-none"></div>

      <div className="relative z-10 max-w-7xl mx-auto w-full space-y-12 md:space-y-16">
        
        {/* Section Header */}
        <div className="flex flex-col items-start space-y-3 sm:space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded bg-black/80 backdrop-blur-md md:backdrop-blur-2xl border border-[#f5b942]/40 text-[10px] sm:text-xs font-mono uppercase tracking-wider sm:tracking-widest text-white shadow-2xl">
            <span className="w-2 h-2 rounded-full bg-[#f5b942] animate-ping"></span>
            <span className="text-[#f5b942] font-bold">01</span>
            <span className="text-white/40">|</span>
            <span>ABOUT THE DEVELOPER</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-black tracking-tighter text-white break-words">
            ABOUT THE DEVELOPER<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f5b942] via-[#ffd580] to-[#b8860b] drop-shadow-[0_0_30px_rgba(245,185,66,0.4)]">
              BUILDING WITH PURPOSE.
            </span>
          </h2>
        </div>

        {/* Bento Grid Layout with Interactive Mouse Light Tracking */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6">
          
          {/* Card 1: Bio & Academic Core (Span 7) */}
          <div
            ref={addToRefs}
            className="md:col-span-7 p-6 sm:p-8 md:p-12 bg-[#141414]/90 backdrop-blur-md md:backdrop-blur-2xl border border-white/10 rounded-2xl sm:rounded-3xl md:rounded-[2.5rem] shadow-2xl flex flex-col justify-between relative group hover:border-[#f5b942]/60 transition-all duration-500 overflow-hidden"
          >
            {/* Real-time mouse hover spotlight highlight */}
            <div 
              className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background: 'radial-gradient(400px circle at var(--mouse-x) var(--mouse-y), rgba(245,185,66,0.15), transparent 70%)'
              }}
            ></div>

            <div className="absolute top-0 right-0 p-6 sm:p-8 text-white/5 font-mono text-5xl sm:text-7xl font-black pointer-events-none">
              01
            </div>
            
            <div className="space-y-4 sm:space-y-5 relative z-10">
              <h3 className="text-xs font-mono uppercase tracking-widest text-[#f5b942] font-bold">Cast & Background</h3>
              <p className="text-base sm:text-lg md:text-xl font-medium text-white/90 leading-relaxed">
                I am <span className="text-white font-bold drop-shadow">Muhammad Usaim</span>, a Software Developer and Junior DevOps Engineer focused on building scalable web applications and streamlining deployment pipelines.
              </p>
              <p className="text-xs sm:text-sm md:text-base text-white/60 font-light leading-relaxed">
                My experience spans full-stack development, DevOps automation, web design, and cloud operations. I work with ASP.NET Core, C#, React, Next.js, Node.js, Docker, SQL Server, PostgreSQL and MongoDB. I enjoy solving complex problems and turning ideas into practical, reliable software — currently working as a Junior DevOps Engineer at EOcean Private Limited.
              </p>
            </div>
            
            <div className="pt-6 sm:pt-8 flex flex-wrap gap-1.5 sm:gap-2 relative z-10">
              <span className="px-3 sm:px-3.5 py-1 sm:py-1.5 rounded bg-white/5 border border-white/10 text-[11px] sm:text-xs font-mono text-white/80">Full Stack Engineer</span>
              <span className="px-3 sm:px-3.5 py-1 sm:py-1.5 rounded bg-white/5 border border-white/10 text-[11px] sm:text-xs font-mono text-white/80">DevOps Engineer</span>
              <span className="px-3 sm:px-3.5 py-1 sm:py-1.5 rounded bg-white/5 border border-white/10 text-[11px] sm:text-xs font-mono text-white/80">REST APIs</span>
              <span className="px-3 sm:px-3.5 py-1 sm:py-1.5 rounded bg-white/5 border border-white/10 text-[11px] sm:text-xs font-mono text-white/80">Web Design</span>
              <span className="px-3 sm:px-3.5 py-1 sm:py-1.5 rounded bg-white/5 border border-white/10 text-[11px] sm:text-xs font-mono text-white/80">CI/CD Automation</span>
              <span className="px-3 sm:px-3.5 py-1 sm:py-1.5 rounded bg-white/5 border border-white/10 text-[11px] sm:text-xs font-mono text-white/80">Docker & Linux</span>
            </div>
          </div>

          {/* Card 2: Education & Certifications (Span 5) */}
          <div
            ref={addToRefs}
            className="md:col-span-5 p-6 sm:p-8 md:p-12 bg-[#141414]/90 backdrop-blur-md md:backdrop-blur-2xl border border-white/10 rounded-2xl sm:rounded-3xl md:rounded-[2.5rem] shadow-2xl flex flex-col justify-between relative group hover:border-[#f5b942]/60 transition-all duration-500 overflow-hidden"
          >
            {/* Real-time mouse hover spotlight highlight */}
            <div 
              className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background: 'radial-gradient(400px circle at var(--mouse-x) var(--mouse-y), rgba(245,185,66,0.15), transparent 70%)'
              }}
            ></div>

            <div className="absolute top-0 right-0 p-6 sm:p-8 text-white/5 font-mono text-5xl sm:text-7xl font-black pointer-events-none">
              02
            </div>
            
            <div className="space-y-4 relative z-10">
              <h3 className="text-xs font-mono uppercase tracking-widest text-[#f5b942] font-bold">Education & Credentials</h3>
              <ul className="space-y-3 text-xs md:text-sm text-white/80 font-light">
                <li className="flex items-start gap-2 sm:gap-2.5">
                  <span className="text-[#f5b942] font-bold">&#8250;</span>
                  <div>
                    <span className="text-white font-semibold">Aligarh Institute of Technology</span> — DAE Software Engineering Technology (2023 – 2026)
                    <div className="text-white/50 text-[10px] sm:text-[11px] font-mono">Karachi | Completed</div>
                  </div>
                </li>
                <li className="flex items-start gap-2 sm:gap-2.5">
                  <span className="text-[#f5b942] font-bold">&#8250;</span>
                  <div>
                    <span className="text-white font-semibold">Aptech Computer Education</span> — ASP.NET Professional Diploma (2021 – 2024)
                  </div>
                </li>
                <li className="flex items-start gap-2 sm:gap-2.5">
                  <span className="text-[#f5b942] font-bold">&#8250;</span>
                  <div>
                    <span className="text-white font-semibold">Gulshan College</span> — Intermediate, Pre-Engineering (2022 – 2024)
                  </div>
                </li>
                <li className="flex items-start gap-2 sm:gap-2.5 pt-1 border-t border-white/10">
                  <span className="text-[#f5b942] font-bold">&#8250;</span>
                  <div>
                    <strong className="text-white">Certified Agentic AI Architect</strong> — Panaversity (Levels 1–4)
                  </div>
                </li>
                <li className="flex items-start gap-2 sm:gap-2.5">
                  <span className="text-[#f5b942] font-bold">&#8250;</span>
                  <div>
                    <strong className="text-white">Certified Agent Factory Builder + CCA-F</strong> — Panaversity
                  </div>
                </li>
              </ul>
            </div>
            
            <div className="pt-4 font-mono text-xs text-white/40 relative z-10">
              // ACADEMIC & CERTIFIED CREDENTIALS
            </div>
          </div>

          {/* Card 3: Technical Ecosystem (Span 12) */}
          <div
            ref={addToRefs}
            className="md:col-span-12 p-6 sm:p-8 md:p-12 bg-[#141414]/90 backdrop-blur-md md:backdrop-blur-2xl border border-white/10 rounded-2xl sm:rounded-3xl md:rounded-[2.5rem] shadow-2xl flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 hover:border-[#f5b942]/60 transition-all duration-500 overflow-hidden relative group"
          >
            {/* Real-time mouse hover spotlight highlight */}
            <div 
              className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background: 'radial-gradient(500px circle at var(--mouse-x) var(--mouse-y), rgba(245,185,66,0.15), transparent 70%)'
              }}
            ></div>

            <div className="space-y-2 text-left relative z-10">
              <h3 className="text-xs font-mono uppercase tracking-widest text-[#f5b942] font-bold">Production Tech Stack</h3>
              <p className="text-sm sm:text-base md:text-lg font-semibold text-white">Full-stack, DevOps automation, and database architectures</p>
            </div>
            
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 relative z-10">
              {['C#', 'ASP.NET Core', 'React', 'Next.js', 'Node.js', 'Express', 'n8n', 'SQL Server', 'PostgreSQL', 'MongoDB', 'Docker', 'Nginx'].map((tech, idx) => (
                <span
                  key={idx}
                  className="px-3 sm:px-4 py-1.5 sm:py-2 rounded bg-white/[0.04] border border-white/10 text-[11px] sm:text-xs font-mono uppercase tracking-wider text-white shadow-inner hover:bg-[#f5b942]/20 hover:border-[#f5b942]/40 hover:scale-105 transition-all"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default About;