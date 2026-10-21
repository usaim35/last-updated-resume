import { useCallback, useEffect, useRef, useState } from "react";

/* ================================================================
   ✏️  EDIT YOUR INFO HERE — the whole site is built from this data
   ================================================================ */
const RESUME_FILE = "/cv.pdf"; // your resume inside /public
const PHOTO = "/images/hero.jpg"; // your photo inside /public/images

const ME = {
  first: "Muhammad",
  last: "Usaim",
  location: "Karachi, Pakistan",
  email: "Usaimikhan24@gmail.com",
  phone: "+92 324 2788466",
  whatsapp: "https://wa.me/923242788466",
  github: "https://github.com/usaim35",
  summary:
    "Full-stack developer and junior DevOps engineer with 3+ years of experience. I build web apps end to end, then automate the pipelines that ship them: React frontends, ASP.NET and Node APIs, Docker, Jenkins and Linux servers.",
};

const ROLES = ["Full-Stack Developer", "DevOps Engineer", "Pipeline Builder", "API Engineer"];

const SKILLS = [
  { title: "DevOps & Cloud", icon: "⚙", items: ["Docker", "CI/CD Pipelines", "Linux", "Nginx", "Jenkins", "Azure", "Git/GitHub"] },
  { title: "Frontend", icon: "◧", items: ["React.js", "Next.js", "JavaScript (ES6+)", "TypeScript", "HTML5/CSS3", "Tailwind CSS", "Bootstrap"] },
  { title: "Backend", icon: "⌘", items: ["ASP.NET Core", "C#", "Node.js", "Express.js", "RESTful APIs", "Python"] },
  { title: "Databases", icon: "◉", items: ["SQL Server", "PostgreSQL", "MongoDB", "MySQL"] },
];

// Oldest first, so the pipeline ends at your current job
const EXPERIENCE = [
  {
    stage: "build",
    role: "Software Developer",
    company: "Fiztech",
    period: "2022 – 2023",
    points: [
      "Developed and maintained client-facing web apps with modern JavaScript frameworks and Node.js.",
      "Took part in the full lifecycle, from requirements gathering to final deployment.",
    ],
    tags: ["JavaScript", "Node.js", "Express", "REST APIs"],
  },
  {
    stage: "scale",
    role: "Software Developer",
    company: "Dev Studio",
    period: "2023 – 2024",
    points: [
      "Architected and deployed full-stack web apps with ASP.NET Core, React.js and REST APIs.",
      "Built responsive frontends and robust backend services in an agile team.",
    ],
    tags: ["ASP.NET Core", "React.js", "SQL Server", "REST APIs"],
  },
  {
    stage: "deploy",
    role: "Junior DevOps Engineer",
    company: "EOcean Private Limited",
    period: "2024 – Present",
    current: true,
    points: [
      "Automate end-to-end CI/CD pipelines and container workflows with Docker and Jenkins.",
      "Maintain server infrastructure and health monitoring for high availability and smooth releases.",
      "Work with cross-functional dev teams to remove deployment bottlenecks.",
    ],
    tags: ["Docker", "CI/CD", "Linux", "Nginx", "Jenkins", "Git"],
  },
];

const PROJECTS = [
  {
    name: "EMIJESTY",
    type: "Fashion E-Commerce Storefront",
    status: "Live project",
    desc: "A high-performance e-commerce frontend with dynamic product filtering, responsive sliders and automated Vercel deployment.",
    tags: ["Next.js", "React", "Vercel", "CSS Modules"],
    links: [{ label: "Live site ↗", href: "#" }], // TODO: paste your live link
    hue: "a",
  },
  {
    name: "ShopNest",
    type: "Enterprise Full-Stack Store",
    status: "Full-stack",
    desc: "A full-stack store with inventory management, Stripe payment integration and a complete admin panel.",
    tags: ["ASP.NET Core", "React", "SQL Server", "Stripe"],
    links: [{ label: "GitHub ↗", href: "https://github.com/usaim35" }], // TODO: paste repo link
    hue: "b",
  },
];

const EDUCATION = [
  { title: "DAE in Software Engineering", place: "Aligarh Institute of Technology", period: "2024 – Ongoing" },
  { title: "ASP.NET Professional Diploma", place: "Aptech Computer Education", period: "2021 – 2024" },
  { title: "Intermediate (Pre-Engineering)", place: "Govt. Gulshan College", period: "2022 – 2024" },
];

const STATS = [
  { to: 3, suffix: "+", label: "Years shipping code" },
  { to: 3, suffix: "", label: "Companies worked with" },
  { to: 24, suffix: "", label: "Technologies in my stack" },
  { to: 2, suffix: "", label: "Featured full projects" },
];

const BOOT = [
  "$ git clone github.com/usaim35/portfolio",
  "$ npm install --silent",
  "$ docker build -t usaim:latest .",
  "$ deploying to production...",
  "✓ Live. Welcome!",
];

/* ================================================================ */

function downloadResume() {
  const a = document.createElement("a");
  a.href = RESUME_FILE;
  a.download = "Muhammad-Usaim-Resume.pdf";
  document.body.appendChild(a);
  a.click();
  a.remove();
}

const canHover = () => window.matchMedia("(hover: hover)").matches;

/* ---------- Loader ---------- */
function Loader({ onDone }) {
  const [step, setStep] = useState(0);
  const [hide, setHide] = useState(false);
  useEffect(() => {
    if (step < BOOT.length) {
      const t = setTimeout(() => setStep((s) => s + 1), 360);
      return () => clearTimeout(t);
    }
    const t1 = setTimeout(() => setHide(true), 300);
    const t2 = setTimeout(onDone, 1000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [step, onDone]);
  return (
    <div className={`loader ${hide ? "hide" : ""}`}>
      <div className="loader-box mono">
        {BOOT.slice(0, step).map((l, i) => (
          <div key={i} className={l.startsWith("✓") ? "ok" : ""}>{l}</div>
        ))}
        <span className="caret">▋</span>
        <div className="loader-bar"><span style={{ width: `${(step / BOOT.length) * 100}%` }} /></div>
      </div>
    </div>
  );
}

/* ---------- Custom cursor ---------- */
function Cursor() {
  const dot = useRef(null);
  const ring = useRef(null);
  useEffect(() => {
    if (!canHover()) return;
    let x = -100, y = -100, rx = -100, ry = -100, raf;
    const move = (e) => {
      x = e.clientX; y = e.clientY;
      dot.current.style.transform = `translate(${x}px, ${y}px)`;
      ring.current.classList.toggle("big", !!e.target.closest("a, button, .hoverable"));
    };
    const loop = () => {
      rx += (x - rx) * 0.15; ry += (y - ry) * 0.15;
      ring.current.style.transform = `translate(${rx}px, ${ry}px)`;
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener("mousemove", move);
    loop();
    return () => { window.removeEventListener("mousemove", move); cancelAnimationFrame(raf); };
  }, []);
  return (<><div ref={dot} className="cursor-dot" /><div ref={ring} className="cursor-ring" /></>);
}

/* ---------- Scroll progress ---------- */
function ScrollProgress() {
  const ref = useRef(null);
  useEffect(() => {
    const f = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      ref.current.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
    };
    f();
    window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);
  return <div ref={ref} className="progress" />;
}

/* ---------- 3D tilt ---------- */
function Tilt({ children, className = "", max = 10 }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || !canHover()) return;
    const move = (e) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      el.style.transform = `perspective(1000px) rotateX(${-y * max}deg) rotateY(${x * max}deg)`;
      el.style.setProperty("--mx", `${(x + 0.5) * 100}%`);
      el.style.setProperty("--my", `${(y + 0.5) * 100}%`);
    };
    const leave = () => { el.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg)"; };
    el.addEventListener("mousemove", move);
    el.addEventListener("mouseleave", leave);
    return () => { el.removeEventListener("mousemove", move); el.removeEventListener("mouseleave", leave); };
  }, [max]);
  return <div ref={ref} className={`tilt ${className}`}>{children}</div>;
}

/* ---------- Magnetic wrapper ---------- */
function Magnetic({ children, strength = 0.3 }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!canHover()) return;
    const move = (e) => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - (r.left + r.width / 2);
      const y = e.clientY - (r.top + r.height / 2);
      el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
    };
    const leave = () => { el.style.transform = ""; };
    el.addEventListener("mousemove", move);
    el.addEventListener("mouseleave", leave);
    return () => { el.removeEventListener("mousemove", move); el.removeEventListener("mouseleave", leave); };
  }, [strength]);
  return <span ref={ref} className="magnetic">{children}</span>;
}

/* ---------- Scramble text ---------- */
function Scramble({ words }) {
  const [text, setText] = useState(words[0]);
  useEffect(() => {
    const chars = "!<>-_/[]{}=+*^?#01";
    let i = 0, frame;
    const run = () => {
      i = (i + 1) % words.length;
      const target = words[i];
      let f = 0;
      const total = 26;
      const tick = () => {
        f++;
        setText(
          target.split("").map((c, k) =>
            k < (f / total) * target.length || c === " " ? c : chars[Math.floor(Math.random() * chars.length)]
          ).join("")
        );
        if (f < total) frame = requestAnimationFrame(tick);
      };
      tick();
    };
    const timer = setInterval(run, 2800);
    return () => { clearInterval(timer); cancelAnimationFrame(frame); };
  }, [words]);
  return <span className="scramble mono">{text}</span>;
}

/* ---------- Hover letters ---------- */
function Letters({ text, className, start = 0 }) {
  return (
    <span className={className}>
      {text.split("").map((c, i) => (
        <span key={i} className="letter hoverable" style={{ animationDelay: `${start + i * 0.05}s` }}>{c}</span>
      ))}
    </span>
  );
}

/* ---------- Particle network ---------- */
function Network() {
  const ref = useRef(null);
  useEffect(() => {
    const c = ref.current;
    const ctx = c.getContext("2d");
    const dpr = window.devicePixelRatio || 1;
    let w, h, raf;
    const mouse = { x: -9999, y: -9999 };
    const resize = () => { w = c.width = c.offsetWidth * dpr; h = c.height = c.offsetHeight * dpr; };
    resize();
    const N = Math.min(85, Math.floor(window.innerWidth / 16));
    const pts = Array.from({ length: N }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.4 * dpr, vy: (Math.random() - 0.5) * 0.4 * dpr,
    }));
    const onMove = (e) => {
      const r = c.getBoundingClientRect();
      mouse.x = (e.clientX - r.left) * dpr; mouse.y = (e.clientY - r.top) * dpr;
    };
    const draw = () => {
      const col = getComputedStyle(document.documentElement).getPropertyValue("--accent-rgb").trim();
      ctx.clearRect(0, 0, w, h);
      for (const p of pts) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
        const dx = p.x - mouse.x, dy = p.y - mouse.y, d = Math.hypot(dx, dy);
        if (d < 140 * dpr && d > 0) { p.x += (dx / d) * 1.5; p.y += (dy / d) * 1.5; }
        ctx.fillStyle = `rgba(${col}, 0.7)`;
        ctx.beginPath(); ctx.arc(p.x, p.y, 1.6 * dpr, 0, Math.PI * 2); ctx.fill();
      }
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const d = Math.hypot(pts[i].x - pts[j].x, pts[i].y - pts[j].y);
          if (d < 120 * dpr) {
            ctx.strokeStyle = `rgba(${col}, ${0.18 * (1 - d / (120 * dpr))})`;
            ctx.lineWidth = dpr;
            ctx.beginPath(); ctx.moveTo(pts[i].x, pts[i].y); ctx.lineTo(pts[j].x, pts[j].y); ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);
  return <canvas ref={ref} className="network" />;
}

/* ---------- Count up ---------- */
function Counter({ to, suffix }) {
  const [n, setN] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      let start;
      const step = (t) => {
        if (!start) start = t;
        const p = Math.min((t - start) / 1400, 1);
        setN(Math.round((1 - Math.pow(1 - p, 3)) * to));
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
      io.disconnect();
    }, { threshold: 0.5 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, [to]);
  return <span ref={ref}>{n}{suffix}</span>;
}

/* ---------- Interactive terminal ---------- */
function Terminal() {
  const [lines, setLines] = useState([
    { t: "sys", v: "usaim-os v3.0 · type 'help' and press Enter" },
  ]);
  const [input, setInput] = useState("");
  const [hist, setHist] = useState([]);
  const [hi, setHi] = useState(-1);
  const body = useRef(null);
  const inp = useRef(null);

  const cmds = {
    help: () => [
      "Available commands:",
      "  about        who is usaim?",
      "  skills       tech stack",
      "  experience   work history",
      "  projects     things I built",
      "  contact      how to reach me",
      "  resume       download my CV",
      "  docker ps    check my status",
      "  ls · whoami · date · clear",
      "  psst... try 'sudo hire usaim'",
    ],
    about: () => [ME.summary],
    skills: () => SKILLS.map((s) => `${s.title}: ${s.items.join(", ")}`),
    experience: () => [...EXPERIENCE].reverse().map((e) => `${e.period}  ${e.role} @ ${e.company}`),
    projects: () => PROJECTS.map((p) => `${p.name}: ${p.type}`),
    contact: () => [`email:    ${ME.email}`, `phone:    ${ME.phone}`, `location: ${ME.location}`, `github:   ${ME.github}`],
    resume: () => { downloadResume(); return ["Fetching artifact Muhammad-Usaim-Resume.pdf ... done ✓"]; },
    "docker ps": () => [
      "CONTAINER ID   IMAGE          STATUS",
      "u5a1m3500001   usaim:latest   Up 3+ years (healthy)",
    ],
    ls: () => ["about.txt  skills.json  experience.log  projects/  resume.pdf"],
    whoami: () => ["guest, but you could be my next employer 👀"],
    date: () => [new Date().toString()],
    "sudo hire usaim": () => {
      setTimeout(() => { window.location.href = `mailto:${ME.email}?subject=Let's work together`; }, 900);
      return ["[sudo] password for recruiter: ********", "✓ Permission granted. Opening your email app..."];
    },
  };

  const run = (raw) => {
    const c = raw.trim().toLowerCase();
    if (!c) return;
    setHist((h) => [c, ...h]);
    setHi(-1);
    if (c === "clear") { setLines([]); return; }
    const out = cmds[c] ? cmds[c]() : [`command not found: ${c}. Type 'help'`];
    setLines((l) => [...l, { t: "in", v: raw }, ...out.map((v) => ({ t: cmds[c] ? "out" : "err", v }))]);
  };

  const onKey = (e) => {
    if (e.key === "Enter") { run(input); setInput(""); }
    else if (e.key === "ArrowUp") { e.preventDefault(); const n = Math.min(hi + 1, hist.length - 1); if (hist[n]) { setHi(n); setInput(hist[n]); } }
    else if (e.key === "ArrowDown") { e.preventDefault(); const n = hi - 1; setHi(Math.max(n, -1)); setInput(n >= 0 ? hist[n] : ""); }
    else if (e.key === "Tab") { e.preventDefault(); const m = Object.keys(cmds).find((k) => k.startsWith(input.toLowerCase())); if (m && input) setInput(m); }
  };

  useEffect(() => { if (body.current) body.current.scrollTop = body.current.scrollHeight; }, [lines]);

  return (
    <div className="terminal hoverable" onClick={() => inp.current?.focus({ preventScroll: true })}>
      <div className="term-bar">
        <span className="d r" /><span className="d y" /><span className="d g" />
        <span className="term-title mono">guest@usaim: ~</span>
      </div>
      <div className="term-body mono" ref={body}>
        {lines.map((l, i) => (
          <div key={i} className={`tl ${l.t}`}>
            {l.t === "in" && <span className="prompt">guest@usaim:~$ </span>}{l.v}
          </div>
        ))}
        <div className="tl in">
          <span className="prompt">guest@usaim:~$ </span>
          <input
            ref={inp} value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={onKey}
            spellCheck="false" autoComplete="off" aria-label="Terminal input"
          />
        </div>
      </div>
      <div className="term-chips">
        {["help", "skills", "docker ps", "resume", "sudo hire usaim"].map((c) => (
          <button key={c} className="mono" onClick={(e) => { e.stopPropagation(); run(c); }}>{c}</button>
        ))}
      </div>
    </div>
  );
}

/* ---------- Experience pipeline ---------- */
function Pipeline() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    const f = () => {
      const r = el.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, (window.innerHeight * 0.6 - r.top) / r.height));
      el.style.setProperty("--fill", p);
    };
    f();
    window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);
  return (
    <div className="pipe" ref={ref}>
      <div className="pipe-line" />
      {EXPERIENCE.map((e, i) => (
        <div key={i} className={`stage reveal ${e.current ? "current" : ""}`}>
          <span className="stage-dot" />
          <div className="stage-card hoverable">
            <div className="stage-top mono">
              <span>stage: {e.stage}</span>
              <span className={e.current ? "running" : "passed"}>{e.current ? "● running" : "✓ passed"}</span>
            </div>
            <h3>{e.role}</h3>
            <p className="company">{e.company} · <span className="mono">{e.period}</span></p>
            <ul>{e.points.map((p, k) => <li key={k}>{p}</li>)}</ul>
            <div className="tags">{e.tags.map((t) => <span key={t}>{t}</span>)}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ---------- Clock ---------- */
function Clock() {
  const [t, setT] = useState("");
  useEffect(() => {
    const f = () => setT(new Date().toLocaleTimeString("en-US", { timeZone: "Asia/Karachi", hour: "2-digit", minute: "2-digit", second: "2-digit" }));
    f();
    const i = setInterval(f, 1000);
    return () => clearInterval(i);
  }, []);
  return <span>{t}</span>;
}

/* ================================================================
   APP
   ================================================================ */
export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "dark");
  const [toast, setToast] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [flipped, setFlipped] = useState({});
  const [imgOk, setImgOk] = useState(true);
  const toastTimer = useRef(null);

  const done = useCallback(() => setLoaded(true), []);
  const showToast = useCallback((m) => {
    setToast(m);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(""), 2200);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => { document.body.style.overflow = loaded ? "" : "hidden"; }, [loaded]);

  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }),
      { threshold: 0.15 }
    );
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [loaded]);

  const copyEmail = () =>
    navigator.clipboard.writeText(ME.email)
      .then(() => showToast("Email copied to clipboard ✓"))
      .catch(() => showToast(ME.email));

  const marquee = SKILLS.flatMap((s) => s.items);

  return (
    <>
      {!loaded && <Loader onDone={done} />}
      <Cursor />
      <ScrollProgress />

      {/* NAV */}
      <header className={`nav ${scrolled ? "scrolled" : ""}`}>
        <a href="#top" className="brand">
          <span className="brand-mark mono">MU</span>
          <span className="brand-text"><b>{ME.first} {ME.last}</b><small>{ME.location}</small></span>
        </a>
        <nav className="links">
          <a href="#about">About</a><a href="#skills">Skills</a><a href="#experience">Experience</a>
          <a href="#projects">Projects</a><a href="#contact">Contact</a>
        </nav>
        <div className="nav-actions">
          <button className="theme-btn" onClick={() => setTheme(theme === "dark" ? "light" : "dark")} aria-label="Toggle theme">
            {theme === "dark" ? "☀" : "☾"}
          </button>
          <a className="btn btn-small" href={RESUME_FILE} download="Muhammad-Usaim-Resume.pdf">Resume ↓</a>
        </div>
      </header>

      <main className={loaded ? "ready" : ""} id="top">
        {/* HERO */}
        <section className="hero">
          <Network />
          <div className="container hero-grid">
            <div className="hero-left">
              <div className="badge mono hero-anim" style={{ animationDelay: ".1s" }}>
                <span className="pulse" /> Open to opportunities
              </div>
              <h1 className="hero-name">
                <Letters text={ME.first} className="line" start={0.2} />
                <Letters text={ME.last} className="line outline" start={0.6} />
              </h1>
              <p className="hero-role hero-anim" style={{ animationDelay: ".9s" }}>
                <span className="mono dim">&gt; </span><Scramble words={ROLES} />
              </p>
              <p className="hero-sub hero-anim" style={{ animationDelay: "1.05s" }}>
                I build web apps end to end, then automate the pipelines that ship them.
              </p>
              <div className="hero-actions hero-anim" style={{ animationDelay: "1.2s" }}>
                <Magnetic><a href="#projects" className="btn">View my work →</a></Magnetic>
                <Magnetic><a href={RESUME_FILE} download="Muhammad-Usaim-Resume.pdf" className="btn btn-ghost">Download Resume ↓</a></Magnetic>
              </div>
            </div>

            <div className="hero-right hero-anim" style={{ animationDelay: ".5s" }}>
              <Tilt className="hero-card" max={14}>
                <div className="photo">
                  {imgOk
                    ? <img src={PHOTO} alt={`${ME.first} ${ME.last}`} onError={() => setImgOk(false)} />
                    : <div className="photo-fallback">MU</div>}
                </div>
                <span className="float c1 mono">🐳 Docker</span>
                <span className="float c2 mono">⚛ React</span>
                <span className="float c3 mono">◆ ASP.NET</span>
                <span className="float c4 mono"><i className="pulse" /> pipeline: passing</span>
              </Tilt>
            </div>
          </div>
          <a href="#about" className="scroll-hint mono">scroll ↓</a>
        </section>

        {/* MARQUEE */}
        <div className="marquee">
          <div className="track">
            {[...marquee, ...marquee].map((m, i) => <span key={i} className="hoverable">{m} <i>✦</i></span>)}
          </div>
        </div>

        {/* STATS */}
        <section className="stats-sec">
          <div className="container stats">
            {STATS.map((s, i) => (
              <div key={i} className="stat reveal" style={{ transitionDelay: `${i * 0.1}s` }}>
                <strong><Counter to={s.to} suffix={s.suffix} /></strong>
                <span>{s.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ABOUT + TERMINAL */}
        <section id="about">
          <div className="container about-grid">
            <div className="reveal">
              <p className="label">About me</p>
              <h2 className="title">I write the code <em>and</em> the pipeline that ships it.</h2>
              <p className="lead">{ME.summary}</p>
              <p className="lead dim">Don't want to read? Talk to the terminal instead. It knows everything about me.</p>
            </div>
            <div className="reveal" style={{ transitionDelay: ".15s" }}>
              <Terminal />
            </div>
          </div>
        </section>

        {/* SKILLS */}
        <section id="skills" className="alt">
          <div className="container">
            <p className="label reveal">Tech stack</p>
            <h2 className="title reveal">Tools I use to <em>build, ship and run</em> software.</h2>
            <div className="skills">
              {SKILLS.map((s, i) => (
                <div key={s.title} className="reveal" style={{ transitionDelay: `${i * 0.1}s` }}>
                  <Tilt className="skill-card" max={8}>
                    <div className="skill-head">
                      <span className="skill-icon">{s.icon}</span>
                      <h3>{s.title}</h3>
                      <span className="mono dim">{String(s.items.length).padStart(2, "0")}</span>
                    </div>
                    <div className="chips">{s.items.map((it) => <span key={it} className="hoverable">{it}</span>)}</div>
                  </Tilt>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* EXPERIENCE */}
        <section id="experience">
          <div className="container">
            <p className="label reveal">Experience</p>
            <h2 className="title reveal">My career, as a <em>deployment pipeline</em>.</h2>
            <Pipeline />
          </div>
        </section>

        {/* PROJECTS */}
        <section id="projects" className="alt">
          <div className="container">
            <p className="label reveal">Selected work</p>
            <h2 className="title reveal">Projects that <em>made it to production</em>.</h2>
            <div className="projects">
              {PROJECTS.map((p, i) => (
                <div key={p.name} className="reveal" style={{ transitionDelay: `${i * 0.15}s` }}>
                  <div
                    className={`flip hoverable ${flipped[i] ? "flipped" : ""}`}
                    onClick={() => setFlipped((f) => ({ ...f, [i]: !f[i] }))}
                  >
                    <div className="flip-inner">
                      <div className={`face front hue-${p.hue}`}>
                        <span className="proj-num mono">0{i + 1}</span>
                        <div className="blob" />
                        <div>
                          <span className="proj-status mono">{p.status}</span>
                          <h3>{p.name}</h3>
                          <p>{p.type}</p>
                          <div className="tags">{p.tags.map((t) => <span key={t}>{t}</span>)}</div>
                          <span className="flip-hint mono">hover or tap to flip ↻</span>
                        </div>
                      </div>
                      <div className="face back">
                        <span className="mono dim">// {p.name.toLowerCase()}</span>
                        <p className="proj-desc">{p.desc}</p>
                        <div className="proj-links">
                          {p.links.map((l) => (
                            <a key={l.label} href={l.href} target="_blank" rel="noreferrer" className="btn btn-small" onClick={(e) => e.stopPropagation()}>{l.label}</a>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* EDUCATION */}
        <section id="education">
          <div className="container">
            <p className="label reveal">Education</p>
            <h2 className="title reveal">Still <em>learning</em>, always.</h2>
            <div className="edu">
              {EDUCATION.map((e, i) => (
                <div key={e.title} className="edu-card reveal hoverable" style={{ transitionDelay: `${i * 0.1}s` }}>
                  <span className="mono dim">{e.period}</span>
                  <h3>{e.title}</h3>
                  <p>{e.place}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="contact">
          <div className="container">
            <p className="label reveal">Contact</p>
            <h2 className="big-cta reveal">Let's deploy something <em>great</em> together.</h2>
            <div className="contact-grid reveal">
              <button className="contact-card" onClick={copyEmail}>
                <span className="mono dim">email · click to copy</span><b>{ME.email}</b>
              </button>
              <a className="contact-card" href={ME.whatsapp} target="_blank" rel="noreferrer">
                <span className="mono dim">whatsapp</span><b>{ME.phone}</b>
              </a>
              <a className="contact-card" href={ME.github} target="_blank" rel="noreferrer">
                <span className="mono dim">github</span><b>@usaim35</b>
              </a>
              <a className="contact-card" href={RESUME_FILE} download="Muhammad-Usaim-Resume.pdf">
                <span className="mono dim">resume.pdf</span><b>Download CV ↓</b>
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container foot mono">
          <span>© {new Date().getFullYear()} {ME.first} {ME.last}</span>
          <span>Karachi · <Clock /></span>
          <span><i className="pulse" /> all systems operational</span>
        </div>
      </footer>

      <div className={`toast ${toast ? "show" : ""}`}>{toast}</div>
    </>
  );
}