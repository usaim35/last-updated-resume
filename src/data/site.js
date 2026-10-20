// ============================================================
//  YOUR DETAILS - edit everything marked TODO
// ============================================================

export const site = {
  name: "Muhammad Usaim",
  email: "your.email@gmail.com",                       // TODO
  phone: "+92 300 0000000",                            // TODO
  location: "Karachi, Pakistan",
  cv: "/cv.pdf",                                       // put your CV at public/cv.pdf
  github: "https://github.com/usaim35",
  linkedin: "https://www.linkedin.com/in/your-handle", // TODO
};

export const hero = {
  image: "/images/hero.jpg",
  lines: ["I build 3D web experiences, and", "I ship them like real products."],
  tagline:
    "Full-stack developer building WebGL platforms, live dashboards and learning portals with React, Next.js and Three.js.",
};

export const intro =
  "As a developer I care about both sides of the screen: how a product feels to use and how it holds up in production. Fast, interactive, and built to be maintained.";

export const about = {
  photo: "/images/profile.jpg",
  // TODO: rewrite these two paragraphs in your own words
  paragraphs: [
    "I build at the meeting point of design and engineering - from a 3D hardware platform for a garment manufacturer to a live crypto trading dashboard and an international online Quran academy for students around the world.",
    "My focus is interfaces that move: WebGL scenes, smooth motion and real-time data, always shipped to production instead of left as a demo.",
  ],
};

export const stackIntro =
  "Tools I trust for speed, reliability and a clean workflow, from the first commit to deployment.";

// icon = slug from simpleicons.org (TODO: keep only what you really use)
export const stack = [
  { name: "React", icon: "react" },
  { name: "Next.js", icon: "nextdotjs" },
  { name: "Three.js", icon: "threedotjs" },
  { name: "GSAP", icon: "greensock" },
  { name: "Tailwind CSS", icon: "tailwindcss" },
  { name: "JavaScript", icon: "javascript" },
  { name: "Node.js", icon: "nodedotjs" },
  { name: "MongoDB", icon: "mongodb" },
  { name: "Git", icon: "git" },
  { name: "Vercel", icon: "vercel" },
];

export const ai = [
  { name: "Claude", icon: "claude" },
  { name: "ChatGPT", icon: "openai" },
  { name: "Copilot", icon: "githubcopilot" },
  { name: "Gemini", icon: "googlegemini" },
];

export const freelance = {
  image: "/images/freelance.png",
  headline: "Built for clients. Engineered to last. Always shipping.",
  note: "Clear updates, honest timelines and clean code your next developer will thank you for.",
};

// ============================================================
//  MAIN PROJECTS (slider + case study pages)
//  Screenshot size: 1600 x 1000 px (16:10) so nothing gets cropped
// ============================================================
export const projects = [
  {
    slug: "fastener-3d-platform",
    title: "Industrial Fasteners 3D Platform",
    image: "/projects/fasteners.jpg",
    summary:
      "A B2B platform for garment hardware - buttons, buckles and rivets - where buyers configure products in real-time 3D and follow every order from factory to delivery.",
    details:
      "It combines a 3D product configurator, a pneumatic button-fixing simulation, custom logo previews and a global shipping tracker in one experience.",
    stack: ["React", "Three.js", "React Three Fiber", "GSAP", "Node.js"], // TODO: confirm
    live: "", // TODO: add link if public
    features: [
      { title: "3D configurator", body: "Switch finish, type and custom logo with realistic metal rendering." },
      { title: "Pneumatic press simulation", body: "An animated fixing cycle that shows exactly how buttons are attached." },
      { title: "Global logistics view", body: "Animated shipping routes from Karachi to buyers worldwide." },
      { title: "Order workflow", body: "Production, quality control and shipping stages in one clear timeline." },
    ],
    gallery: [], // e.g. ["/projects/fasteners-2.jpg"]
    demo: null,
  },
  {
    slug: "crypto-ai-trading-bot",
    title: "Crypto AI Trading Dashboard",
    image: "/projects/crypto.jpg",
    summary:
      "A real-time trading dashboard for an AI trading bot: live candlestick charts, bot health monitors, strategy yield cards and wallet connection.",
    details:
      "Market data streams in live over WebSockets so traders see every move as it happens and can pause or run strategies instantly.",
    stack: ["React", "WebSockets", "Canvas", "Tailwind CSS", "Web3"], // TODO: confirm
    live: "",
    features: [
      { title: "Live candlestick charts", body: "Streaming market data rendered smoothly in real time." },
      { title: "AI bot monitors", body: "Status, win rate, profit and latency for every strategy." },
      { title: "Yield cards", body: "Clear summaries of returns and risk for each algorithm." },
      { title: "Wallet connection", body: "Connect a browser wallet in one click." },
    ],
    gallery: [],
    demo: null,
  },
  {
    slug: "roudhatul-quran",
    title: "Roudhatul Quran Academy",
    image: "/projects/quran.jpg",
    summary:
      "An international online Quran academy with live one-on-one classes, a digital Noorani Qaida, Quran with English and Urdu translation, audio recitation and a student dashboard.",
    details:
      "Built end to end: course pages, multi-currency pricing, free learning tools that need no sign-in, and enrollment for students in any time zone.",
    stack: ["Next.js", "Tailwind CSS", "Vercel"], // TODO: confirm
    live: "https://rozatulquran.vercel.app/",
    features: [
      { title: "Digital Noorani Qaida", body: "Page-by-page reader with zoom and go-to-page controls." },
      { title: "Quran with Tarjuma", body: "Uthmani or IndoPak script with English and Urdu translation." },
      { title: "Audio recitation", body: "Surah-by-surah audio with repeat and seek." },
      { title: "Courses and dashboard", body: "Noorani Qaida, Tajweed and Hifz courses, pricing in six currencies and a student portal." },
    ],
    gallery: [],
    // Optional "Try it" box. Example:
    // demo: { heading: "Explore the student dashboard", text: "Sign in with the read-only account.", email: "demo@example.com", password: "ViewOnly123", url: "https://..." },
    demo: null,
  },
];

// Extra cards for the fanned "Live Demos" deck (optional)
// { title: "Project name", image: "/projects/name.jpg", link: "https://..." }
export const practice = [];