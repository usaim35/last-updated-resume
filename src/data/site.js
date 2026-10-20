// ============================================================
//  YOUR DETAILS - edit anything marked TODO
// ============================================================

export const site = {
  name: "Muhammad Usaim",
  email: "usaimkhan24@gmail.com",
  phone: "+92 300 0000000",                            // TODO
  location: "Karachi, Pakistan",
  cv: "/cv.pdf",
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
  paragraphs: [
    "I build at the meeting point of design and engineering - from a 3D product website for a Karachi metal-trim manufacturer to a live crypto signals platform and an international online Quran academy for students around the world.",
    "My focus is interfaces that move: 3D scenes, smooth motion and real-time data, always shipped to production instead of left as a demo.",
  ],
};

export const stackIntro =
  "Tools I trust for speed, reliability and a clean workflow, from the first commit to deployment.";

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
  image: "/images/freelance.jpg",
  headline: "Built for clients. Engineered to last. Always shipping.",
  note: "Clear updates, honest timelines and clean code your next developer will thank you for.",
};

export const projects = [
  {
    slug: "dynemic-metals",
    title: "Dynemic Metals",
    image: "/projects/dynemic.png",
    summary:
      "A website for a Karachi garment-hardware manufacturer making snap buttons, jeans buttons, rivets, eyelets and buckles since 1999, with a live 3D product preview at its heart.",
    details:
      "Buyers can explore products in 3D, customise them with their own logo, learn how each part is made and build a quote list to send in one click.",
    stack: ["React", "Three.js", "Tailwind CSS"],
    live: "",
    features: [
      { title: "3D product preview", body: "A rotating 3D button with the brand logo engraved, rendered in realistic metal." },
      { title: "Customise", body: "Buyers see their own logo and finish on the product before ordering." },
      { title: "Quote list", body: "Add products to a quote list and request pricing in one step." },
      { title: "Light and dark mode", body: "A theme toggle so the catalogue reads well in any setting." },
    ],
    gallery: [],
    demo: null,
  },
  {
    slug: "mycryptospace",
    title: "MyCryptoSpace",
    image: "/projects/crypto.png",
    summary:
      "A crypto signals platform: entry, take-profit and stop-loss signals pushed straight to each member's dashboard the moment they are posted.",
    details:
      "Members sign up, log in and follow live trade signals in real time, with no delay between posting and delivery.",
    stack: ["React", "Node.js", "WebSockets"],
    live: "",
    features: [
      { title: "Live signals", body: "Entry, TP and SL levels delivered to the dashboard instantly." },
      { title: "Member accounts", body: "Sign-up and login so each trader has their own dashboard." },
      { title: "Real-time updates", body: "New signals appear without refreshing the page." },
      { title: "Onboarding slides", body: "A short intro carousel that explains the platform on the login screen." },
    ],
    gallery: [],
    demo: null,
  },
  {
    slug: "roudhatul-quran",
    title: "Roudhatul Quran Academy",
    image: "/projects/quran.png",
    summary:
      "An international online Quran academy with live one-on-one classes, a digital Noorani Qaida, Quran with English and Urdu translation, audio recitation and a student dashboard.",
    details:
      "Built end to end: course pages, multi-currency pricing, free learning tools that need no sign-in, and enrollment for students in any time zone.",
    stack: ["Next.js", "Tailwind CSS", "Vercel"],
    live: "https://rozatulquran.vercel.app/",
    features: [
      { title: "Digital Noorani Qaida", body: "Page-by-page reader with zoom and go-to-page controls." },
      { title: "Quran with Tarjuma", body: "Uthmani or IndoPak script with English and Urdu translation." },
      { title: "Audio recitation", body: "Surah-by-surah audio with repeat and seek." },
      { title: "Courses and dashboard", body: "Noorani Qaida, Tajweed and Hifz courses, pricing in six currencies and a student portal." },
    ],
    gallery: [],
    demo: null,
  },
  {
    slug: "sick-store",
    title: "Sick E-commerce Store",
    image: "/projects/store.png",
    summary:
      "A fashion and accessories online store with product search, categories for men, women, jewelry and perfume, a wishlist, a cart and currency and language switching.",
    details:
      "Designed to make browsing feel effortless, from the hero offers down to the cart.",
    stack: ["HTML", "CSS", "JavaScript"],
    live: "",
    features: [
      { title: "Product search", body: "Find any product instantly from the search bar." },
      { title: "Categories", body: "Men's, women's, jewelry, perfume and hot offers." },
      { title: "Wishlist and cart", body: "Save favourites and track cart items with live counters." },
      { title: "Currency and language", body: "Switch currency and language from the top bar." },
    ],
    gallery: [],
    demo: null,
  },
  {
    slug: "jazz-cmt",
    title: "Jazz CMT Portal",
    image: "/projects/jazz.png",
    summary:
      "A secure sign-in portal built for Jazz, one of Pakistan's largest telecom operators.",
    details:
      "A clean, focused login experience designed in the Jazz brand identity.",
    stack: ["HTML", "CSS", "JavaScript"],
    live: "",
    features: [
      { title: "Secure sign-in", body: "Username and password login with a remember-me option." },
      { title: "Brand-matched design", body: "Built in the Jazz red and yellow identity." },
    ],
    gallery: [],
    demo: null,
  },
];

export const practice = [];