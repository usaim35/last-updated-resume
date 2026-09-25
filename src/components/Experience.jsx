import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    tag: 'EOCEAN PRIVATE LIMITED',
    company: 'EOcean Private Limited',
    role: 'Junior DevOps Engineer',
    period: 'Jun 2025 – Present',
    duration: 'CURRENT ROLE',
    bullets: [
      <>Managing <strong className="text-white font-medium">CI/CD pipelines, container orchestration, and deployment automation</strong> across production infrastructure.</>,
      <>Maintaining server infrastructure, monitoring system health, and collaborating with development teams to streamline software delivery.</>,
    ],
    tags: ['Docker', 'CI/CD', 'Linux', 'Nginx', 'Git'],
  },
  {
    tag: 'SEAMNIA (PRIVATE) LIMITED',
    company: 'Seamnia (Private) Limited',
    role: 'Web Designer',
    period: 'Feb 2026 – Aug 2026',
    duration: '6 MONTHS DURATION',
    bullets: [
      <>Designed and built <strong className="text-white font-medium">responsive, modern websites</strong> for a 6-month engagement, translating client briefs into pixel-perfect interfaces.</>,
      <>Focused on cross-browser consistency, UI/UX best practices, and high-converting web design.</>,
    ],
    tags: ['Web Design', 'UI/UX', 'HTML/CSS', 'Figma', 'Responsive Design'],
  },
  {
    tag: 'DEV STUDIO',
    company: 'Dev Studio',
    role: 'Software Developer',
    period: '2023 – 2024',
    duration: '1 YEAR',
    bullets: [
      <>Developed full-stack web applications using <strong className="text-white font-medium">ASP.NET Core and React</strong>, delivering responsive UIs and robust backend APIs.</>,
      <>Collaborated on multiple client projects following agile development practices.</>,
    ],
    tags: ['ASP.NET', 'React', 'SQL Server', 'REST APIs'],
  },
  {
    tag: 'TELEX GLOBAL',
    company: 'Telex Global',
    role: 'American Website Sales Specialist',
    period: '2023',
    duration: 'CONTRACT',
    bullets: [
      <>Managed American website sales operations via Discord, handling client communications and closing web development deals for the US market.</>,
    ],
    tags: ['Sales', 'Client Management', 'US Market'],
  },
  {
    tag: 'FIZTECH',
    company: 'Fiztech',
    role: 'Software Developer',
    period: '2022 – 2023',
    duration: '1 YEAR',
    bullets: [
      <>Built and maintained web applications using modern JavaScript frameworks and backend technologies across the full development lifecycle.</>,
    ],
    tags: ['JavaScript', 'Node.js', 'Web Dev', 'APIs'],
  },
  {
    tag: 'HELLO INTERNATIONAL',
    company: 'Hello International',
    role: 'Team Leader (Promoted from Calling Agent)',
    period: '2021 – 2022',
    duration: '1 YEAR',
    bullets: [
      <>Started as a Calling Agent and was promoted to Team Leader, managing a team, training new hires, and handling performance metrics.</>,
    ],
    tags: ['Team Leadership', 'Communication', 'Training'],
  },
];

const Experience = () => {
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    gsap.fromTo(
      cardRefs.current,
      { y: 60, opacity: 0, scale: 0.97 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.9,
        stagger: 0.15,
        ease: "power4.out",
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
          toggleActions: "play none none reverse"
        }
      }
    );

    const cleanups = [];
    cardRefs.current.forEach((card) => {
      if (!card) return;
      const handleMouseMove = (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
      };
      card.addEventListener('mousemove', handleMouseMove);
      cleanups.push(() => card.removeEventListener('mousemove', handleMouseMove));
    });
    return () => cleanups.forEach((fn) => fn());
  }, []);

  const addToRefs = (el) => {
    if (el && !cardRefs.current.includes(el)) {
      cardRefs.current.push(el);
    }
  };

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative w-full bg-[#050505] text-white py-16 md:py-24 px-4 sm:px-6 md:px-12 flex flex-col justify-center select-none overflow-hidden border-t border-white/5"
    >
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[500px] max-w-full h-[500px] bg-[#f5b942]/10 rounded-full blur-[55px] md:blur-[150px] pointer-events-none"></div>

      <div className="relative z-10 max-w-7xl mx-auto w-full space-y-8 md:space-y-12">

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 sm:px-3.5 py-1.5 rounded bg-black/80 backdrop-blur-sm md:backdrop-blur-xl border border-[#f5b942]/40 text-[10px] sm:text-[11px] font-mono uppercase tracking-wider sm:tracking-widest text-white shadow-xl">
              <span className="w-1.5 h-1.5 rounded-full bg-[#f5b942] animate-ping"></span>
              <span className="text-[#f5b942] font-bold">02</span>
              <span className="text-white/40">|</span>
              <span>CAREER TIMELINE</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-black text-white tracking-tight leading-tight break-words">
              ENGINEERING EXPERIENCE <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f5b942] via-[#ffd580] to-[#b8860b] drop-shadow-[0_0_25px_rgba(245,185,66,0.35)]">
                FROM CODE TO PRODUCTION.
              </span>
            </h2>
          </div>
          <p className="text-white/60 text-xs md:text-sm font-light leading-relaxed max-w-xs">
            Six roles across DevOps, full-stack development, web design, and team leadership — from Calling Agent to Junior DevOps Engineer.
          </p>
        </div>

        <div className="space-y-5 sm:space-y-6">
          {experiences.map((exp, i) => (
            <div
              key={i}
              ref={addToRefs}
              className="w-full p-6 sm:p-8 md:p-10 bg-[#141414]/90 backdrop-blur-md md:backdrop-blur-2xl border border-white/10 rounded-2xl sm:rounded-3xl shadow-2xl relative group hover:border-[#f5b942]/60 transition-all duration-500 overflow-hidden"
            >
              <div
                className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: 'radial-gradient(500px circle at var(--mouse-x) var(--mouse-y), rgba(245,185,66,0.18), transparent 70%)'
                }}
              ></div>

              <div className="relative z-10 space-y-5 sm:space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
                  <div>
                    <div className="inline-block text-[9px] sm:text-[10px] font-mono font-bold tracking-widest uppercase text-[#f5b942] bg-[#f5b942]/10 px-2.5 py-1 rounded border border-[#f5b942]/20 mb-2">
                      {exp.tag}
                    </div>
                    <h3 className="text-lg sm:text-xl md:text-3xl font-black text-white tracking-tight">
                      {exp.company}
                    </h3>
                    <p className="text-xs sm:text-sm md:text-base text-[#f5b942] font-mono font-medium mt-1">
                      {exp.role}
                    </p>
                  </div>

                  <div className="flex flex-row sm:flex-col items-start sm:items-end justify-between sm:justify-start gap-1">
                    <span className="text-xs sm:text-sm font-mono text-white/90 bg-white/5 border border-white/10 px-3 sm:px-4 py-1.5 rounded-full">
                      {exp.period}
                    </span>
                    <span className="text-[10px] sm:text-[11px] font-mono text-white/40 mt-1 sm:mt-1.5 tracking-wider">
                      {exp.duration}
                    </span>
                  </div>
                </div>

                <ul className="space-y-2.5 sm:space-y-3 text-xs sm:text-sm text-white/80 font-light leading-relaxed">
                  {exp.bullets.map((bullet, bi) => (
                    <li key={bi} className="flex items-start gap-2.5 sm:gap-3.5">
                      <span className="text-[#f5b942] font-bold text-lg leading-none mt-0.5">&#8250;</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                <div className="pt-3 border-t border-white/10 flex flex-wrap items-center gap-2">
                  {exp.tags.map((tag, ti) => (
                    <span
                      key={ti}
                      className="px-3 py-1 rounded bg-white/[0.04] border border-white/10 text-[11px] font-mono text-white/80 group-hover:border-[#f5b942]/30 transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Experience;
