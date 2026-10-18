/**
 * Every word and link on the site lives here.
 *
 * Nothing below is referenced by shape anywhere else — the components read
 * these arrays and render whatever is in them — so you can add a role, drop a
 * project or rename a skill group without touching a component.
 *
 * `icon` values are Lucide icon names (see src/components/Icon.jsx for the
 * registry; add an import there if you use a name that isn't listed yet).
 */

export const PROFILE = {
  name: 'Muhammad Usaim',
  initials: 'MU',
  title: 'Back-End & Full-Stack Engineer',
  // Cycled by the typing effect in the hero.
  roles: [
    'Back-End & Full-Stack Engineer',
    'Junior DevOps Engineer @ EOcean',
    'Automation Engineer',
    'CI/CD & Container Pipelines',
  ],
  location: 'Karachi, Pakistan',
  status: 'Open to full-time, contract & freelance',
  email: 'usaimkhan24@gmail.com',
  phone: '+92 324 2788466',
  bio: 'I build web applications end to end — ASP.NET Core or Node on the backend, React or Next.js on the front — then automate whatever is still being done by hand around them. Invoices, portal exports, campaign approvals: most of what I ship exists because someone was repeating the same task a hundred times a day.',
  links: {
    github: 'https://github.com/usaim35',
    linkedin: 'https://www.linkedin.com/in/muhammad-usaim-436367268/',
    whatsapp: 'https://wa.me/923242788466',
    resume: 'https://raw.githubusercontent.com/usaim35/last-updated-resume/main/resume.pdf',
  },
}

export const STATS = [
  { value: '4+', label: 'Years shipping', note: 'since 2021' },
  { value: '13', label: 'Projects delivered', note: '5 live right now' },
  { value: '6', label: 'Roles held', note: 'agent → DevOps' },
  { value: '0', label: 'Manual invoices left', note: 'at Dynemic Metals' },
]

export const NAV = [
  { id: 'work', label: 'Experience' },
  { id: 'stack', label: 'Stack' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
]

/** The animated release pipeline in the hero. */
export const PIPELINE = [
  { label: 'checkout', icon: 'GitBranch', log: '$ git fetch --prune && git checkout main' },
  { label: 'build', icon: 'Terminal', log: '> dotnet build  ·  npm ci && npm run build' },
  { label: 'image', icon: 'Box', log: '> docker build -t app:2.4.1 .   layers cached' },
  { label: 'deploy', icon: 'Server', log: '> compose up -d   nginx reload   0 downtime' },
  { label: 'verify', icon: 'Check', log: '✓ health 200  ·  p95 118ms  ·  release OK' },
]

export const EXPERIENCE = [
  {
    company: 'EOcean Private Limited',
    role: 'Junior DevOps Engineer',
    period: 'Jun 2025 — Present',
    meta: 'Current role',
    current: true,
    points: [
      'Run CI/CD pipelines, container orchestration and deployment automation across production infrastructure.',
      'Maintain server infrastructure and system-health monitoring so releases stay repeatable instead of hand-run.',
      'Work alongside the development teams to shorten the path from commit to production.',
    ],
    tags: ['Docker', 'CI/CD', 'Linux', 'Nginx', 'Jenkins', 'Git'],
  },
  {
    company: 'Seamnia (Private) Limited',
    role: 'Web Designer',
    period: 'Feb 2026 — Aug 2026',
    meta: '6-month engagement',
    points: [
      'Designed and built responsive marketing sites, turning client briefs into pixel-accurate interfaces.',
      'Owned cross-browser consistency and UI/UX decisions through to handover.',
    ],
    tags: ['UI/UX', 'Figma', 'HTML/CSS', 'Responsive Design'],
  },
  {
    company: 'Dev Studio',
    role: 'Software Developer',
    period: '2023 — 2024',
    meta: '1 year',
    points: [
      'Built full-stack web applications in ASP.NET Core and React — responsive frontends and the APIs behind them.',
      'Delivered across several concurrent client projects on agile practices.',
    ],
    tags: ['ASP.NET Core', 'React', 'SQL Server', 'REST APIs'],
  },
  {
    company: 'Telex Global',
    role: 'American Website Sales Specialist',
    period: '2023',
    meta: 'Contract',
    points: [
      'Managed US-market website sales entirely over Discord — client communication through to closing web development deals.',
    ],
    tags: ['Client Management', 'US Market', 'Scoping'],
  },
  {
    company: 'Fiztech',
    role: 'Software Developer',
    period: '2022 — 2023',
    meta: '1 year',
    points: [
      'Built and maintained client-facing web applications with modern JavaScript frameworks and Node backends.',
      'Worked the full lifecycle, from requirements gathering to deployment.',
    ],
    tags: ['JavaScript', 'Node.js', 'Express', 'REST APIs'],
  },
  {
    company: 'Hello International',
    role: 'Team Leader — promoted from Calling Agent',
    period: '2021 — 2022',
    meta: 'First role',
    points: [
      'Promoted from Calling Agent to Team Leader: managed a team, trained new hires and owned performance metrics.',
    ],
    tags: ['Team Leadership', 'Training', 'Communication'],
  },
]

export const SKILLS = [
  {
    title: 'Backend',
    icon: 'Server',
    note: 'Two core stacks — C#/.NET for product work, Node for automation.',
    items: ['C#', 'ASP.NET Core', 'Node.js', 'Express.js', 'REST API Design', 'Python', 'Socket.IO', 'Auth & RBAC'],
  },
  {
    title: 'Frontend',
    icon: 'CodeXml',
    note: 'Mobile-first, verified down to 390px before anything ships.',
    items: ['React', 'Next.js', 'TypeScript', 'JavaScript (ES6+)', 'Tailwind CSS', 'HTML5 / CSS3', 'Bootstrap', 'Framer Motion'],
  },
  {
    title: 'Databases',
    icon: 'Database',
    note: 'Schema design and multi-database architecture, relational first.',
    items: ['SQL Server', 'PostgreSQL', 'MySQL', 'MongoDB', 'Schema Design', 'Query Tuning'],
  },
  {
    title: 'DevOps & Automation',
    icon: 'Wrench',
    note: 'The day job — plus the automation that replaced the manual step.',
    items: ['Docker', 'CI/CD Pipelines', 'Jenkins', 'Linux', 'Nginx', 'Git / GitHub', 'Azure', 'PM2', 'n8n', 'Puppeteer', 'Metabase', 'Vercel'],
  },
]

export const EDUCATION = [
  {
    title: 'DAE, Software Engineering Technology',
    org: 'Aligarh Institute of Technology, Karachi',
    period: '2023 — 2026',
    icon: 'GraduationCap',
  },
  {
    title: 'ASP.NET Professional Diploma',
    org: 'Aptech Computer Education',
    period: '2021 — 2024',
    icon: 'GraduationCap',
  },
  {
    title: 'Certified Agentic AI Architect — Levels 1–4',
    org: 'Panaversity',
    period: 'Completed',
    icon: 'Award',
  },
  {
    title: 'Certified Agent Factory Builder (CCA-F)',
    org: 'Panaversity',
    period: 'Completed',
    icon: 'Award',
  },
]

export const CATEGORIES = ['All', 'Automation', 'Full Stack', 'Frontend', 'Data & BI']

/**
 * `category` must be one of CATEGORIES (the filter chips count from it).
 * `featured` adds the gradient rail and the Featured badge.
 * `demo` and `code` are both optional — a card renders whichever it has.
 */
export const PROJECTS = [
  {
    title: 'SafeZone',
    subtitle: 'WhatsApp-first disaster triage',
    category: 'Full Stack',
    label: 'CODE//CONNECT’26',
    role: 'Frontend Developer',
    featured: true,
    blurb:
      'A triage system for Karachi’s monsoon season. Anyone messages one number in English, Urdu or Roman Urdu; the system works out what happened, where, and who is at risk, then routes the case to nearby volunteers — and, after a human approves it, to an official service.',
    points: [
      'Intake over the WhatsApp Cloud API in three languages — no app to install',
      'Type-to-filter area combobox replaced a 78-item dropdown: keyboard-navigable, punctuation-insensitive',
      'Admin-gated control room wired to live data over REST and server-sent events',
    ],
    tags: ['React 19', 'TypeScript', 'Tailwind 4', 'Framer Motion', 'FastAPI', 'PostgreSQL'],
    demo: 'https://safezone.fly.dev/',
    code: 'https://github.com/usaim35',
  },
  {
    title: 'Roudhatul Quran',
    subtitle: 'International online Qur’an academy',
    category: 'Full Stack',
    label: 'Live on Vercel',
    role: 'Full Stack Developer',
    featured: true,
    blurb:
      'A live one-to-one Qur’an academy for students in any timezone. The design decision that shaped it: everything a visitor needs to start reading is free and needs no account, so the trial is the product rather than a form in front of it.',
    points: [
      'Free, sign-in-free tools — Noorani Qaida reader, Qur’an in Uthmani or IndoPak script with English and Urdu translation, audio and video recitation, a Namaz guide',
      'Course catalogue and class plans priced per schedule, shown in the visitor’s currency, with the first three classes free',
      'Student dashboard for joining live classes, replaying lessons and the daily Hadith',
    ],
    tags: ['Next.js', 'React', 'Tailwind CSS', 'Auth & Dashboard', 'Vercel'],
    demo: 'https://rozatulquran.vercel.app/',
    code: 'https://github.com/usaim35/roudhatul-quran-tutor',
  },
  {
    title: 'Order-to-Invoice Mail Integration',
    subtitle: 'Outlook → Gmail → invoice',
    category: 'Automation',
    label: 'International client',
    role: 'Backend & Automation',
    featured: true,
    blurb:
      'Orders arrived as free-form email and someone retyped every one of them into an invoice. That middle step is gone — the mail lands, the invoice comes out, and a human only approves it.',
    points: [
      'Parses sender, line items, quantities and totals out of inconsistent email formats',
      'Reconciles against the customer record, then renders the invoice in the client’s own template',
      'Labels processed mail so nothing is ever read — or billed — twice',
    ],
    tags: ['Node.js', 'Gmail API', 'Outlook / IMAP', 'SMTP', 'MySQL'],
    code: 'https://github.com/usaim35',
  },
  {
    title: 'Dynemic Metals — Invoice Generator',
    subtitle: 'Hundreds of invoices a day, by hand',
    category: 'Automation',
    label: 'Live on Vercel',
    role: 'Backend Developer',
    featured: true,
    blurb:
      'Built around how the client already worked rather than asking them to change. They send order details — typed, or as a photo of a handwritten slip — and the invoice comes back in their exact company format.',
    points: [
      'Parses and validates typed input or an image of a handwritten order slip',
      'Renders to the company’s existing invoice pattern, down to the column order',
      'A daily job batches every invoice into one Excel workbook and emails it out',
    ],
    tags: ['Node.js', 'Excel Automation', 'Image Parsing', 'Cron Jobs', 'SMTP'],
    demo: 'https://dynamicmetal.vercel.app/',
    code: 'https://github.com/usaim35',
  },
  {
    title: 'Enterprise Portal Automation (CMT)',
    subtitle: 'Unattended data pipeline',
    category: 'Automation',
    label: 'Telecom infrastructure',
    role: 'Automation Engineer',
    blurb:
      'An automated backend for a major Pakistani network service provider: a headless browser pipeline under PM2 that signs into the enterprise portal and pulls the day’s data with no one watching.',
    points: [
      'Authenticates, navigates the reporting views and extracts the day’s data on a schedule',
      'Handles session expiry and retries, so a transient portal failure delays a run instead of breaking the series',
      'Writes to MySQL and emits daily records plus a rolled-up monthly CSV',
    ],
    tags: ['Node.js', 'Puppeteer', 'MySQL', 'PM2', 'CSV Reports'],
    code: 'https://github.com/usaim35',
  },
  {
    title: 'CampaignHub',
    subtitle: 'Approvals where managers already are',
    category: 'Automation',
    label: 'Marketing platform',
    role: 'Full Stack Developer',
    blurb:
      'SMS and email campaigns to thousands of recipients in one tap. The interesting constraint was approvals: managers would not log into another dashboard, so the approval step moved into WhatsApp.',
    points: [
      'An n8n workflow pushes the approval request to WhatsApp; a reply there releases the send',
      'Delivery progress streams back to the dashboard over Socket.IO',
      'Recipient lists, templates and send history kept in MySQL',
    ],
    tags: ['n8n', 'Node.js', 'React', 'Socket.IO', 'MySQL', 'WhatsApp'],
    code: 'https://github.com/usaim35',
  },
  {
    title: 'FlowBridge',
    subtitle: 'n8n workflow hub',
    category: 'Automation',
    label: 'Workflow automation',
    role: 'Automation Engineer',
    blurb:
      'A collection of production n8n workflows connecting forms, databases and messaging platforms — the recurring manual steps nobody should still be doing.',
    points: [
      'Form submissions routed to the right owner by rule',
      'Records synced between tools that have no native integration',
      'Error branches that alert instead of failing silently',
    ],
    tags: ['n8n', 'Webhooks', 'MySQL', 'Scheduling'],
    code: 'https://github.com/usaim35',
  },
  {
    title: 'Invoice Generator',
    subtitle: 'Billing web app',
    category: 'Full Stack',
    label: 'Product',
    role: 'Full Stack Developer',
    blurb:
      'The general-purpose version of the invoicing problem I kept solving one client at a time. Build line items, apply tax and discounts, save reusable clients, export a branded PDF or share a payable link.',
    points: [
      'Totals and tax computed server-side, so a tampered browser can’t change a figure',
      'Sequential per-month invoice numbers and reusable client/product records',
      'Dashboard tracks every invoice from draft → sent → overdue → paid',
    ],
    tags: ['React', 'Node.js', 'Express', 'MySQL', 'PDF Generation'],
    code: 'https://github.com/usaim35',
  },
  {
    title: 'ShopNest',
    subtitle: 'Full-stack commerce platform',
    category: 'Full Stack',
    label: 'E-commerce',
    role: 'Full Stack Developer',
    blurb:
      'An ASP.NET Core Web API behind a React storefront: catalogue and inventory management, persistent cart, Stripe checkout and an admin dashboard for products, stock and order status.',
    points: [
      'Stripe checkout with webhook-confirmed orders',
      'Database-backed auth and roles with protected admin endpoints',
      'Inventory and order status managed from a single dashboard',
    ],
    tags: ['ASP.NET Core', 'C#', 'React', 'SQL Server', 'Stripe'],
    code: 'https://github.com/usaim35',
  },
  {
    title: 'Emijesty',
    subtitle: 'Fashion e-commerce storefront',
    category: 'Frontend',
    label: 'Live on Vercel',
    role: 'Frontend Developer',
    blurb:
      'A complete storefront frontend — category navigation, product grids with responsive imagery and a testimonials section — deployed and publicly reachable.',
    points: [
      'Hero banner slider tuned to stay smooth on mobile',
      'Responsive product grids and category navigation',
      'Deployed on Vercel with preview builds per push',
    ],
    tags: ['Next.js', 'React', 'CSS Modules', 'Vercel'],
    demo: 'https://emijesty.vercel.app/',
    code: 'https://github.com/usaim35',
  },
  {
    title: 'Dynemic Metals — Company Site',
    subtitle: 'Built around page weight',
    category: 'Frontend',
    label: 'Live on Vercel',
    role: 'Frontend Developer',
    blurb:
      'A marketing site for a Karachi garment-accessories manufacturer — snap buttons, eyelets, buckles, rivets — whose buyers browse on phones on patchy connections, so the whole build was shaped around how much it costs to load.',
    points: [
      'Product catalogue, an eight-step “how we work” flow and a company timeline back to 1999',
      'Quality-assurance and certification sections (EN71, EN1811, OEKO-TEX 100) that buyers ask for first',
      'Compressed, lazy-loaded gallery and no carousel library; enquiries route to the owner with the product pre-filled',
    ],
    tags: ['Next.js', 'React', 'Tailwind CSS', 'SEO'],
    demo: 'https://dynamicmetals.vercel.app/',
    code: 'https://github.com/usaim35',
  },
  {
    title: 'Metabase Analytics Suite',
    subtitle: 'Dashboards leadership actually reads',
    category: 'Data & BI',
    label: 'Business intelligence',
    role: 'BI Developer',
    blurb:
      'A full Metabase setup for a large company. The work was mostly in the modelling: shaping the SQL so dashboards answer business questions instead of exposing raw tables.',
    points: [
      'Interactive dashboards with drill-downs, filters and KPI cards',
      'SQL models written against business questions, not table structure',
      'Leadership reads the numbers without asking anyone to run a query',
    ],
    tags: ['Metabase', 'SQL', 'Data Visualization', 'Dashboards'],
    code: 'https://github.com/usaim35',
  },
  {
    title: 'DB Manager',
    subtitle: 'Single-file database dashboard',
    category: 'Data & BI',
    label: 'Internal tooling',
    role: 'Internal Tools',
    blurb:
      'For the moments when opening a full SQL client is overkill: browse tables, edit a row inline, export the current view, and switch databases from one dropdown.',
    points: [
      'Inline row editing and one-click CSV export of the current view',
      'Multi-database switching from a single connection dropdown',
      'Deliberately one file, so it drops onto any server with no build step',
    ],
    tags: ['Metabase API', 'JavaScript', 'MySQL', 'CSV Export'],
    code: 'https://github.com/usaim35',
  },
]
