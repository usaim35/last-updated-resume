import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const expertiseData = [
  {
    number: "01",
    title: "Frontend Engineering",
    text: "Crafting responsive, high-performance interfaces with React, Next.js, modern JavaScript, Tailwind CSS, and Bootstrap, backed by smooth animated interactions.",
    tag: "UI & CLIENT DEVELOPMENT",
    gradient: "from-[#04161d] via-[#091114] to-[#05090b]"
  },
  {
    number: "02",
    title: "Backend & RESTful APIs",
    text: "Building secure and scalable backend services and REST APIs using ASP.NET Core, C#, and Node.js/Express, with database-backed authentication and protected endpoints.",
    tag: "API & BACKEND SERVICES",
    gradient: "from-[#03141a] via-[#080f12] to-[#05080a]"
  },
  {
    number: "03",
    title: "DevOps & Automation",
    text: "Managing CI/CD pipelines, container orchestration with Docker, server infrastructure, and deployment automation — plus enterprise portal automation with Node.js and Puppeteer.",
    tag: "CI/CD & INFRASTRUCTURE",
    gradient: "from-[#051820] via-[#0a1215] to-[#060a0c]"
  },
  {
    number: "04",
    title: "Data & Web Design",
    text: "Designing and working with SQL Server, PostgreSQL, and MongoDB, alongside responsive web design, UI/UX, and pixel-perfect interfaces built in Figma.",
    tag: "DATABASES & DESIGN",
    gradient: "from-[#04151b] via-[#091013] to-[#05090a]"
  }
];

const Expertise = () => {
  const containerRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    const cards = cardRefs.current;
    if (!cards.length) return;

    const mm = gsap.matchMedia();

    // Heavy scroll-scrubbed blur/scale stacking effect — desktop only (expensive filter repaints on mobile)
    mm.add("(min-width: 768px)", () => {
      cards.forEach((card, index) => {
        if (index === cards.length - 1) return; // Keep the top-most card fully focused

        gsap.to(card, {
          scale: 0.92 - index * 0.025,
          y: -15 - index * 8,
          filter: "blur(6px)",
          opacity: 0.4,
          scrollTrigger: {
            trigger: card,
            start: `top ${90 + index * 20}px`,
            end: "bottom top",
            scrub: true,
          }
        });
      });
    });

    // Simple fade-in on mobile instead of the heavy stacking effect
    mm.add("(max-width: 767px)", () => {
      gsap.fromTo(cards, { y: 30, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.6, stagger: 0.12, ease: "power2.out",
        scrollTrigger: { trigger: containerRef.current, start: "top 80%", toggleActions: "play none none reverse" }
      });
    });

    // Magnetic mouse highlight per card
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

    return () => {
      mm.revert();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  const addToRefs = (el) => {
    if (el && !cardRefs.current.includes(el)) {
      cardRefs.current.push(el);
    }
  };

  return (
    <section
      id="expertise"
      ref={containerRef}
      className="relative w-full bg-[#050505] text-white py-16 md:py-20 px-4 sm:px-6 md:px-12 select-none overflow-hidden"
    >
      {/* Cinematic Cyan Ambient Glow */}
      <div className="absolute top-1/3 left-1/4 w-[450px] max-w-full h-[450px] bg-[#f5b942]/10 rounded-full blur-[50px] md:blur-[140px] pointer-events-none"></div>

      <div className="relative z-10 max-w-6xl mx-auto w-full space-y-8 md:space-y-12">
        
        {/* Compact Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2">
          <div className="space-y-3 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-black/80 backdrop-blur-sm md:backdrop-blur-xl border border-[#f5b942]/40 text-[10px] sm:text-[11px] font-mono uppercase tracking-wider sm:tracking-widest text-white shadow-xl">
              <span className="w-1.5 h-1.5 rounded-full bg-[#f5b942] animate-ping"></span>
              <span className="text-[#f5b942] font-bold">03</span>
              <span className="text-white/40">|</span>
              <span>CORE COMPETENCIES</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-black text-white tracking-tight leading-tight break-words">
              TECHNICAL EXPERTISE <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f5b942] via-[#ffd580] to-[#b8860b] drop-shadow-[0_0_25px_rgba(245,185,66,0.35)]">
                WHAT I BUILD & HOW I BUILD IT.
              </span>
            </h2>
          </div>
          <p className="text-white/60 text-xs md:text-sm font-light leading-relaxed max-w-xs">
            Building full-stack applications, reliable backend services, AI-powered solutions, and scalable data-driven systems.
          </p>
        </div>

        {/* Compact 1-on-1 Gradient Stacking Container */}
        <div className="relative flex flex-col gap-6 sm:gap-8 pb-16 sm:pb-20">
          {expertiseData.map((item, index) => (
            <div
              key={index}
              ref={addToRefs}
              className={`sticky w-full p-5 sm:p-6 md:p-8 rounded-2xl bg-gradient-to-br ${item.gradient} backdrop-blur-md md:backdrop-blur-2xl border border-white/10 shadow-[0_20px_45px_rgba(0,0,0,0.85)] flex flex-col justify-between min-h-[200px] sm:min-h-[230px] md:min-h-[250px] transform-gpu transition-all overflow-hidden group hover:border-[#f5b942]/50`}
              style={{
                zIndex: index + 1,
                top: `${80 + index * 14}px`
              }}
            >
              {/* Dynamic Mouse Spotlight Highlight */}
              <div 
                className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
                style={{
                  background: 'radial-gradient(350px circle at var(--mouse-x) var(--mouse-y), rgba(245,185,66,0.18), transparent 70%)'
                }}
              ></div>

              {/* Cyan Accent Stripe */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-[2px] bg-gradient-to-r from-transparent via-[#f5b942] to-transparent z-10"></div>

              {/* Card Header Top */}
              <div className="flex items-center justify-between w-full mb-3 sm:mb-4 relative z-10">
                <span className="text-[9px] sm:text-[10px] font-mono font-bold uppercase tracking-widest text-[#f5b942] px-2 sm:px-2.5 py-0.5 rounded bg-[#f5b942]/10 border border-[#f5b942]/25">
                  {item.tag}
                </span>
                <span className="text-xl sm:text-2xl md:text-3xl font-mono font-black text-white/20">
                  {item.number}
                </span>
              </div>

              {/* Card Body */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-4 items-center my-auto relative z-10">
                <div className="lg:col-span-5">
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-white tracking-tight leading-snug group-hover:text-[#f5b942] transition-colors duration-300">
                    {item.title}
                  </h3>
                </div>
                <div className="lg:col-span-7">
                  <p className="text-xs sm:text-sm text-white/70 font-light leading-relaxed">
                    {item.text}
                  </p>
                </div>
              </div>

              {/* Subtle Cyan Corner Dot */}
              <div className="absolute bottom-4 right-4 w-1.5 h-1.5 rounded-full bg-[#f5b942] group-hover:shadow-[0_0_10px_#f5b942] z-10 transition-all"></div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Expertise;