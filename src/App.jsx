import { useCallback, useEffect, useRef, useState } from "react";

/* ================================================================
   ✏️  EDIT YOUR INFO HERE — the whole site is built from this data
   ================================================================ */
const RESUME_FILE = "/cv.pdf"; // your resume inside /public
const PHOTO = "/images/hero.jpg"; // your photo inside /public/images
const AVATAR = "/images/avatar.png"; // optional 3D avatar for the intro (falls back to PHOTO)

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

const EXPERIENCE = [
  {
    stage: "build", role: "Software Developer", company: "Fiztech", period: "2022 – 2023",
    points: [
      "Developed and maintained client-facing web apps with modern JavaScript frameworks and Node.js.",
      "Took part in the full lifecycle, from requirements gathering to final deployment.",
    ],
    tags: ["JavaScript", "Node.js", "Express", "REST APIs"],
  },
  {
    stage: "scale", role: "Software Developer", company: "Dev Studio", period: "2023 – 2024",
    points: [
      "Architected and deployed full-stack web apps with ASP.NET Core, React.js and REST APIs.",
      "Built responsive frontends and robust backend services in an agile team.",
    ],
    tags: ["ASP.NET Core", "React.js", "SQL Server", "REST APIs"],
  },
  {
    stage: "deploy", role: "Junior DevOps Engineer", company: "EOcean Private Limited", period: "2024 – Present", current: true,
    points: [
      "Automate end-to-end CI/CD pipelines and container workflows with Docker and Jenkins.",
      "Maintain server infrastructure and health monitoring for high availability and smooth releases.",
      "Work with cross-functional dev teams to remove deployment bottlenecks.",
    ],
    tags: ["Docker", "CI/CD", "Linux", "Nginx", "Jenkins", "Git"],
  },
];

/* 👉 Paste each project's real live link where it says "#" (TODO) */
const PROJECTS = [
  {
    name: "SafeZone",
    type: "Community Emergency Help Platform",
    category: "Web App",
    image: "/projects/safezone.png",
    live: "#", // TODO
    desc: "An emergency help platform for Karachi. People describe a flood, fire, medical or other emergency in a single WhatsApp message, in English, Urdu or Roman Urdu, with no account or form. It covers 78 areas across all seven districts, sends a first reply in under five seconds and hands each case to someone who can act. Includes a scan-to-WhatsApp QR code, an 'Ask SafeZone' chat assistant and dark mode.",
    tags: ["WhatsApp", "Multilingual", "Chat assistant", "Dark mode"],
  },
  {
    name: "Roudhatul Quran",
    type: "Online Quran Tutoring Platform",
    category: "Web App",
    image: "/projects/roudhatul-quran.png",
    live: "#", // TODO
    desc: "A platform for live one-on-one online Quran classes for every age and level: Noorani Qaida, Tajweed, Hifz, Tafseer and Islamic Studies. Features course listings, pricing plans, a free-trial flow, free learning resources, a blog, sign-in and sign-up, WhatsApp chat and light/dark themes.",
    tags: ["Courses", "Auth", "Pricing plans", "Blog"],
  },
  {
    name: "Dynemic Metals",
    type: "Manufacturer Website & Quote System",
    category: "Business",
    image: "/projects/dynemic-metals.png",
    live: "#", // TODO
    desc: "A B2B website for a Karachi metal-trim manufacturer established in 1999, making snap buttons, jeans buttons, rivets, eyelets and buckles. Features an interactive 3D product hero, a product catalogue, a request-a-quote list and dark mode.",
    tags: ["3D product", "Quote list", "Catalogue", "B2B"],
  },
  {
    name: "MyCryptoSpace",
    type: "Crypto Signals Dashboard",
    category: "Dashboard",
    image: "/projects/mycryptospace.png",
    live: "#", // TODO
    desc: "A trading-signals dashboard where entry, take-profit and stop-loss signals are pushed to users the moment they're posted. Includes login and sign-up authentication and an animated feature carousel.",
    tags: ["Real-time", "Auth", "Dashboard"],
  },
  {
    name: "EMIJESTY",
    type: "Fashion E-Commerce Storefront",
    category: "E-commerce",
    image: "/projects/emijesty.png",
    live: "#", // TODO
    desc: "A high-performance e-commerce frontend with dynamic product filtering, responsive sliders and automated Vercel deployment.",
    tags: ["Next.js", "React", "Vercel", "CSS Modules"],
  },
  {
    name: "Sick",
    type: "Fashion & Accessories Store",
    category: "E-commerce",
    image: "/projects/sick-store.png",
    live: "#", // TODO
    desc: "An online fashion store with product search, categories for men, women, jewelry and perfume, a wishlist and cart, currency and language switchers, and an animated hero banner.",
    tags: ["Search", "Cart & wishlist", "Multi-currency"],
  },
  {
    name: "ShopNest",
    type: "Enterprise Full-Stack Store",
    category: "E-commerce",
    image: "/projects/shopnest.png",
    live: "#", // TODO
    github: "https://github.com/usaim35", // TODO: exact repo link
    desc: "A full-stack store with inventory management, Stripe payment integration and a complete admin panel.",
    tags: ["ASP.NET Core", "React", "SQL Server", "Stripe"],
  },
  {
    name: "Jazz CMT",
    type: "Enterprise Management Portal",
    category: "Dashboard",
    image: "/projects/jazz-cmt.png",
    live: "#", // TODO
    desc: "A secure, branded sign-in portal for Jazz's CMT system, with username and password authentication and remember-me sessions.",
    tags: ["Enterprise", "Auth", "Telecom"],
  },
];

const EDUCATION = [
  { title: "DAE in Software Engineering", place: "Aligarh Institute of Technology", period: "2024 – Ongoing" },
  { title: "ASP.NET Professional Diploma", place: "Aptech Computer Education", period: "2021 – 2024" },
  { title: "Intermediate (Pre-Engineering)", place: "Govt. Gulshan College", period: "2022 – 2024" },
];

const STATS = [
  { to: 3, suffix: "+", label: "Years shipping code" },
  { to: PROJECTS.length, suffix: "", label: "Projects shipped" },
  { to: 24, suffix: "", label: "Technologies in my stack" },
  { to: 3, suffix: "", label: "Companies worked with" },
];

const WELCOME = [
  { w: "Welcome", l: "English" },
  { w: "خوش آمدید", l: "اردو", rtl: true },
  { w: "Bienvenue", l: "Français" },
  { w: "أهلاً وسهلاً", l: "العربية", rtl: true },
  { w: "Bienvenido", l: "Español" },
  { w: "Willkommen", l: "Deutsch" },
  { w: "Hoş geldiniz", l: "Türkçe" },
  { w: "स्वागत है", l: "हिन्दी" },
  { w: "ようこそ", l: "日本語" },
  { w: "欢迎", l: "中文" },
  { w: "Benvenuto", l: "Italiano" },
  { w: "Welcome", l: "English" },
];
const FLOW = ["code", "build", "test", "deploy"];

const SECTIONS = ["about", "skills", "experience", "projects", "contact"];

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
const pad = (n) => String(n).padStart(2, "0");
const hostOf = (p) => {
  try { return new URL(p.live).host; } catch { return p.name.toLowerCase().replace(/\s+/g, "") + " · live"; }
};
const hasLink = (u) => u && u !== "#";

/* ---------- Loader (3D welcome intro) ---------- */
function Loader({ onDone }) {
  const [pct, setPct] = useState(0);
  const [exit, setExit] = useState(false);
  const [src, setSrc] = useState(AVATAR);
  const doneRef = useRef(onDone);
  doneRef.current = onDone;

  useEffect(() => {
    let raf, start;
    const timers = [];
    const DUR = 3400;
    const tick = (t) => {
      if (!start) start = t;
      const p = Math.min((t - start) / DUR, 1);
      setPct(Math.round((1 - Math.pow(1 - p, 2.2)) * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else {
        timers.push(setTimeout(() => setExit(true), 350));
        timers.push(setTimeout(() => doneRef.current(), 1500));
      }
    };
    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); timers.forEach(clearTimeout); };
  }, []);

  const idx = Math.min(WELCOME.length - 1, Math.floor(pct / (100 / WELCOME.length)));
  const word = WELCOME[idx];
  const stageIdx = pct >= 100 ? 4 : Math.floor(pct / 25);
  const status = pct >= 100 ? "deployed · live ✓" : `pipeline: ${FLOW[stageIdx]}...`;

  return (
    <div className={`intro ${exit ? "exit" : ""}`}>
      <div className="intro-half top" />
      <div className="intro-half bottom" />
      <div className="intro-content">
        <div className="intro-floor" />
        <div className="intro-glow" />
        <div className="intro-bar mono"><span>MU / portfolio</span><span>Karachi, PK</span></div>

        <div className="intro-stage">
          <div className="gyro g1" /><div className="gyro g2" /><div className="gyro g3" />
          <div className="intro-avatar">
            {src
              ? <img src={src} alt="" onError={() => setSrc(src === AVATAR ? PHOTO : null)} />
              : <span>MU</span>}
          </div>
          <div className="orbit">
            {FLOW.map((f, i) => (
              <span key={f} className={`orbit-chip mono ${stageIdx > i ? "done" : stageIdx === i ? "on" : ""}`} style={{ "--i": i }}>
                {stageIdx > i ? "✓ " : ""}{f}
              </span>
            ))}
          </div>
        </div>

        <div className="intro-word-wrap">
          <span key={`w${idx}`} className="intro-word" dir={word.rtl ? "rtl" : "ltr"}>{word.w}</span>
          <span key={`l${idx}`} className="intro-lang mono">{word.l}</span>
        </div>

        <div className="intro-foot mono"><i className="pulse" /> {status}</div>
        <div className="intro-pct">{pct}<sup>%</sup></div>
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

/* ---------- Scroll progress bar ---------- */
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

/* ---------- Back to top with progress ring ---------- */
function BackToTop() {
  const ring = useRef(null);
  const [show, setShow] = useState(false);
  useEffect(() => {
    const f = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? window.scrollY / max : 0;
      setShow(window.scrollY > 600);
      if (ring.current) ring.current.style.strokeDashoffset = String(126 * (1 - p));
    };
    f();
    window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);
  return (
    <button className={`totop ${show ? "show" : ""}`} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Back to top">
      <svg viewBox="0 0 48 48"><circle cx="24" cy="24" r="20" className="ring-bg" /><circle ref={ring} cx="24" cy="24" r="20" className="ring" /></svg>
      <span>↑</span>
    </button>
  );
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
      el.style.transform = `translate(${(e.clientX - (r.left + r.width / 2)) * strength}px, ${(e.clientY - (r.top + r.height / 2)) * strength}px)`;
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
        setText(target.split("").map((c, k) =>
          k < (f / total) * target.length || c === " " ? c : chars[Math.floor(Math.random() * chars.length)]
        ).join(""));
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
function Terminal({ onMatrix }) {
  const [lines, setLines] = useState([{ t: "sys", v: "usaim-os v3.0 · type 'help' and press Enter" }]);
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
      "  matrix       ...you'll see",
      "  ls · whoami · date · clear",
      "  psst... try 'sudo hire usaim'",
    ],
    about: () => [ME.summary],
    skills: () => SKILLS.map((s) => `${s.title}: ${s.items.join(", ")}`),
    experience: () => [...EXPERIENCE].reverse().map((e) => `${e.period}  ${e.role} @ ${e.company}`),
    projects: () => PROJECTS.map((p, i) => `${pad(i + 1)}  ${p.name.padEnd(16)} ${p.type}`),
    contact: () => [`email:    ${ME.email}`, `phone:    ${ME.phone}`, `location: ${ME.location}`, `github:   ${ME.github}`],
    resume: () => { downloadResume(); return ["Fetching artifact resume.pdf ... done ✓"]; },
    "docker ps": () => ["CONTAINER ID   IMAGE          STATUS", "u5a1m3500001   usaim:latest   Up 3+ years (healthy)"],
    ls: () => ["about.txt  skills.json  experience.log  projects/  resume.pdf"],
    whoami: () => ["guest, but you could be my next employer 👀"],
    date: () => [new Date().toString()],
    matrix: () => { setTimeout(onMatrix, 400); return ["Loading the Matrix..."]; },
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
    e.stopPropagation();
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
          <div key={i} className={`tl ${l.t}`}>{l.t === "in" && <span className="prompt">guest@usaim:~$ </span>}{l.v}</div>
        ))}
        <div className="tl in">
          <span className="prompt">guest@usaim:~$ </span>
          <input ref={inp} value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={onKey}
            spellCheck="false" autoComplete="off" aria-label="Terminal input" />
        </div>
      </div>
      <div className="term-chips">
        {["help", "projects", "docker ps", "matrix", "sudo hire usaim"].map((c) => (
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
      el.style.setProperty("--fill", Math.min(1, Math.max(0, (window.innerHeight * 0.6 - r.top) / r.height)));
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

/* ---------- Project screenshot ---------- */
function Shot({ p, index }) {
  const [ok, setOk] = useState(true);
  useEffect(() => setOk(true), [p.image]);
  return ok && p.image
    ? <img src={p.image} alt={`${p.name} preview`} loading="lazy" onError={() => setOk(false)} />
    : <div className={`shot-fallback ${index % 2 ? "hue-b" : "hue-a"}`}><span>{p.name[0]}</span></div>;
}

/* ---------- Project card ---------- */
function ProjectCard({ p, index, onOpen }) {
  const spot = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--x", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--y", `${e.clientY - r.top}px`);
  };
  return (
    <div className="pcard hoverable" role="button" tabIndex={0} onMouseMove={spot}
      onClick={() => onOpen(index)} onKeyDown={(e) => e.key === "Enter" && onOpen(index)}>
      <div className="browser">
        <div className="browser-bar">
          <span className="d r" /><span className="d y" /><span className="d g" />
          <span className="url mono">{hostOf(p)}</span>
        </div>
        <div className="shot">
          <Shot p={p} index={index} />
          <div className="shot-overlay"><span className="mono">view details →</span></div>
        </div>
      </div>
      <div className="pinfo">
        <div className="pmeta mono">
          <span>{pad(index + 1)} · {p.category}</span>
          <span className="live"><i className="pulse" /> live</span>
        </div>
        <h3>{p.name}</h3>
        <p>{p.type}</p>
        <div className="tags">{p.tags.slice(0, 3).map((t) => <span key={t}>{t}</span>)}</div>
      </div>
    </div>
  );
}

/* ---------- Projects grid with filters ---------- */
function Projects({ onOpen }) {
  const cats = ["All", ...new Set(PROJECTS.map((p) => p.category))];
  const [cat, setCat] = useState("All");
  const list = cat === "All" ? PROJECTS : PROJECTS.filter((p) => p.category === cat);
  return (
    <>
      <div className="filters reveal">
        {cats.map((c) => (
          <button key={c} className={`filter ${cat === c ? "active" : ""}`} onClick={() => setCat(c)}>
            {c}<span className="count">{c === "All" ? PROJECTS.length : PROJECTS.filter((p) => p.category === c).length}</span>
          </button>
        ))}
      </div>
      <div className="pgrid reveal">
        {list.map((p) => <ProjectCard key={p.name} p={p} index={PROJECTS.indexOf(p)} onOpen={onOpen} />)}
      </div>
    </>
  );
}

/* ---------- Project popup ---------- */
function ProjectModal({ index, onClose, onNav }) {
  const p = PROJECTS[index];
  useEffect(() => {
    const k = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNav(1);
      if (e.key === "ArrowLeft") onNav(-1);
    };
    window.addEventListener("keydown", k);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", k); document.body.style.overflow = ""; };
  }, [onClose, onNav]);
  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-box" key={index} onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close">✕</button>
        <div className="modal-shot"><Shot p={p} index={index} /></div>
        <div className="modal-body">
          <span className="mono dim">{pad(index + 1)} / {pad(PROJECTS.length)} · {p.category}</span>
          <h3>{p.name}</h3>
          <p className="modal-type">{p.type}</p>
          <p>{p.desc}</p>
          <div className="tags">{p.tags.map((t) => <span key={t}>{t}</span>)}</div>
          <div className="modal-actions">
            {hasLink(p.live) && <a className="btn btn-small" href={p.live} target="_blank" rel="noreferrer">Visit live site ↗</a>}
            {hasLink(p.github) && <a className="btn btn-small btn-ghost" href={p.github} target="_blank" rel="noreferrer">GitHub ↗</a>}
          </div>
          <div className="modal-nav mono">
            <button onClick={() => onNav(-1)}>← prev</button>
            <button onClick={() => onNav(1)}>next →</button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Command palette (Ctrl + K) ---------- */
function Palette({ open, setOpen, actions }) {
  const [q, setQ] = useState("");
  const [sel, setSel] = useState(0);
  const inp = useRef(null);
  useEffect(() => {
    if (open) { setQ(""); setSel(0); setTimeout(() => inp.current?.focus(), 30); }
  }, [open]);
  if (!open) return null;
  const list = actions.filter((a) => a.label.toLowerCase().includes(q.toLowerCase()));
  const runIt = (a) => { setOpen(false); setTimeout(a.run, 50); };
  const onKey = (e) => {
    e.stopPropagation();
    if (e.key === "ArrowDown") { e.preventDefault(); setSel((x) => Math.min(x + 1, list.length - 1)); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setSel((x) => Math.max(x - 1, 0)); }
    else if (e.key === "Enter" && list[sel]) runIt(list[sel]);
    else if (e.key === "Escape") setOpen(false);
  };
  return (
    <div className="modal palette-wrap" onClick={() => setOpen(false)}>
      <div className="palette" onClick={(e) => e.stopPropagation()}>
        <input ref={inp} value={q} onChange={(e) => { setQ(e.target.value); setSel(0); }} onKeyDown={onKey}
          placeholder="Type a command or search..." aria-label="Command search" />
        <div className="plist">
          {list.map((a, k) => (
            <button key={a.label} className={`pitem ${k === sel ? "sel" : ""}`} onMouseEnter={() => setSel(k)} onClick={() => runIt(a)}>
              <span>{a.icon}</span>{a.label}
            </button>
          ))}
          {!list.length && <div className="pempty mono">No results</div>}
        </div>
        <div className="pfoot mono">↑↓ navigate · enter select · esc close</div>
      </div>
    </div>
  );
}

/* ---------- Matrix easter egg ---------- */
function Matrix({ onDone }) {
  const ref = useRef(null);
  useEffect(() => {
    const c = ref.current;
    const ctx = c.getContext("2d");
    c.width = window.innerWidth; c.height = window.innerHeight;
    const fs = 16;
    const drops = Array(Math.floor(c.width / fs)).fill(1);
    const chars = "アイウエオカキクケコサシスセソ01USAIM<>{}$#";
    const iv = setInterval(() => {
      ctx.fillStyle = "rgba(0,0,0,.08)";
      ctx.fillRect(0, 0, c.width, c.height);
      ctx.fillStyle = "#3dff9a";
      ctx.font = `${fs}px JetBrains Mono, monospace`;
      drops.forEach((y, i) => {
        ctx.fillText(chars[Math.floor(Math.random() * chars.length)], i * fs, y * fs);
        if (y * fs > c.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      });
    }, 40);
    const t = setTimeout(onDone, 7000);
    return () => { clearInterval(iv); clearTimeout(t); };
  }, [onDone]);
  return (
    <div className="matrix" onClick={onDone}>
      <canvas ref={ref} />
      <div className="matrix-msg mono">You found the easter egg. Now hire Usaim. <small>(click to exit)</small></div>
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
  const [imgOk, setImgOk] = useState(true);
  const [openProject, setOpenProject] = useState(null);
  const [palette, setPalette] = useState(false);
  const [matrix, setMatrix] = useState(false);
  const [active, setActive] = useState("");
  const toastTimer = useRef(null);

  const done = useCallback(() => setLoaded(true), []);
  const closeProject = useCallback(() => setOpenProject(null), []);
  const navProject = useCallback((d) => setOpenProject((i) => (i + d + PROJECTS.length) % PROJECTS.length), []);
  const endMatrix = useCallback(() => setMatrix(false), []);
  const startMatrix = useCallback(() => setMatrix(true), []);
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

  // reveal on scroll
  useEffect(() => {
    if (!loaded) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }),
      { threshold: 0.12 }
    );
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [loaded]);

  // active nav link
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); }),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    SECTIONS.forEach((id) => { const el = document.getElementById(id); if (el) io.observe(el); });
    return () => io.disconnect();
  }, []);

  // Ctrl+K palette + Konami code
  useEffect(() => {
    const seq = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];
    let pos = 0;
    const k = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") { e.preventDefault(); setPalette((p) => !p); return; }
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      pos = key === seq[pos] ? pos + 1 : key === seq[0] ? 1 : 0;
      if (pos === seq.length) { setMatrix(true); pos = 0; }
    };
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, []);

  const copyEmail = () =>
    navigator.clipboard.writeText(ME.email)
      .then(() => showToast("Email copied to clipboard ✓"))
      .catch(() => showToast(ME.email));

  const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  const actions = [
    ...SECTIONS.map((id) => ({ icon: "→", label: `Go to ${id[0].toUpperCase() + id.slice(1)}`, run: () => go(id) })),
    ...PROJECTS.map((p, i) => ({ icon: "◎", label: `Open project: ${p.name}`, run: () => setOpenProject(i) })),
    { icon: "◐", label: "Toggle dark / light mode", run: () => setTheme((t) => (t === "dark" ? "light" : "dark")) },
    { icon: "↓", label: "Download resume", run: downloadResume },
    { icon: "@", label: "Copy email address", run: copyEmail },
    { icon: "⌥", label: "Open GitHub", run: () => window.open(ME.github, "_blank") },
    { icon: "✆", label: "Message on WhatsApp", run: () => window.open(ME.whatsapp, "_blank") },
    { icon: "▦", label: "Enter the Matrix", run: startMatrix },
  ];

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
          {SECTIONS.map((id) => (
            <a key={id} href={`#${id}`} className={active === id ? "active" : ""}>{id[0].toUpperCase() + id.slice(1)}</a>
          ))}
        </nav>
        <div className="nav-actions">
          <button className="kbd-btn mono" onClick={() => setPalette(true)} aria-label="Open command menu">
            <span className="k">Ctrl K</span><span className="m">☰ Menu</span>
          </button>
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
              <p className="hero-tip mono hero-anim" style={{ animationDelay: "1.35s" }}>
                tip: press <kbd>Ctrl</kbd> + <kbd>K</kbd> to navigate like a developer
              </p>
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
              <Terminal onMatrix={startMatrix} />
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
                      <span className="mono dim">{pad(s.items.length)}</span>
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
            <Projects onOpen={setOpenProject} />
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

      <BackToTop />
      {openProject !== null && <ProjectModal index={openProject} onClose={closeProject} onNav={navProject} />}
      <Palette open={palette} setOpen={setPalette} actions={actions} />
      {matrix && <Matrix onDone={endMatrix} />}
      <div className={`toast ${toast ? "show" : ""}`}>{toast}</div>
    </>
  );
}