# Muhammad Usaim — Portfolio

Portfolio site for a back-end & full-stack engineer. React 19 + Vite + Tailwind CSS 4,
with light/dark theming, a career timeline, a categorised stack, and thirteen
searchable projects — five of them linking straight to a live deployment.

Live: https://usaim.vercel.app

---

## Run it

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build → dist/
npm run preview    # serve the production build locally
npm run lint
```

---

## Project map

```
index.html                  SEO meta, JSON-LD, fonts, pre-paint theme script
src/
  main.jsx                  entry point
  App.jsx                   section order
  index.css                 design tokens, Tailwind theme bridge, composed classes
  data/
    content.js              ← ALL content lives here
  lib/
    hooks.js                theme, reveal-on-scroll, scroll spy, progress,
                            typewriter, clipboard, smooth scroll, scroll lock,
                            hotkeys, focus trap, cursor spotlight
  components/
    Header.jsx              sticky glass nav, scroll spy, progress bar, search,
                            theme toggle, mobile sheet
    Hero.jsx                headline, typing effect, CTAs, socials, stat strip
    PipelineCard.jsx        the animated CI/CD panel in the hero
    Experience.jsx          vertical career timeline
    Stack.jsx               four skill groups + education & certifications
    Projects.jsx            searchable, filterable project grid
    ProjectModal.jsx        full detail for one project (dialog / mobile sheet)
    CommandPalette.jsx      ⌘K — jump, search, open a live site, run an action
    BackToTop.jsx           floating return control, ringed with reading progress
    Contact.jsx             validated form + quick-connect cards
    Footer.jsx
    ui.jsx                  SectionHead, Tag, Btn
    Icon.jsx                name → Lucide component registry
    BrandIcons.jsx          GitHub / LinkedIn / WhatsApp marks
public/
  og.png                    1200×630 social preview card
  favicon.svg
```

---

## Changing the content

Everything readable on the site is in **`src/data/content.js`** — no component needs
editing to add a job, drop a project or rename a skill group.

| Export       | Drives                                                        |
| ------------ | ------------------------------------------------------------- |
| `PROFILE`    | name, bio, location, status, email, phone, all outbound links  |
| `PROFILE.roles` | the phrases the hero types through                         |
| `STATS`      | the four-up strip under the hero                               |
| `NAV`        | nav items — the `id` must match a `<section id="…">`           |
| `PIPELINE`   | stages and log lines in the hero's pipeline panel              |
| `EXPERIENCE` | timeline entries (`current: true` highlights the top one)      |
| `SKILLS`     | the four stack cards                                           |
| `EDUCATION`  | degrees and certifications                                     |
| `CATEGORIES` | project filter chips                                           |
| `PROJECTS`   | project cards                                                  |

A project's `category` must be one of `CATEGORIES`; the chip counts come from it.
`featured: true` adds the gradient rail and badge. `demo` and `code` are both
optional — a card renders whichever links it has.

### Icons

Icons are referenced by name (`icon: 'Server'`) and resolved in
`src/components/Icon.jsx`. To use a new one, import it from `lucide-react` at the top
of that file and add it to the `REGISTRY` object. Names: https://lucide.dev/icons

Lucide dropped brand logos in v1, so GitHub, LinkedIn and WhatsApp are hand-drawn
marks in `BrandIcons.jsx`.

---

## The colour system

Three states, because the visitor has three: explicit light, explicit dark, and
"follow the system" (no attribute at all — which is most people).

`src/index.css` declares every colour once on `:root` in its light value, then
redefines the tokens twice: inside `@media (prefers-color-scheme: dark)` guarded by
`:root:not([data-theme="light"])`, and again on `:root[data-theme="dark"]` so the
toggle overrides the OS in both directions.

Components never use a literal colour. They use Tailwind classes bridged to the
tokens in the `@theme inline` block:

| Class                             | Token               |
| --------------------------------- | ------------------- |
| `bg-bg` `bg-soft` `bg-card`       | page / band / card  |
| `text-fg` `text-muted` `text-subtle` | three text levels |
| `text-atext`                      | accent at text contrast (shifts per theme) |
| `border-line` `border-line2`      | borders             |
| `text-ok` `text-bad`              | form validation     |
| `grad-bg` `grad-text`             | indigo → violet gradient |

`inline` on `@theme` matters: it makes utilities emit `var(--bg)` directly instead of
capturing a snapshot, which is what lets them flip with the theme.

To re-skin the whole site, change the hex values in the three `:root` blocks. Nothing
else needs touching.

---

## Finding things

| Where                | What it does                                                       |
| -------------------- | ------------------------------------------------------------------ |
| Search box           | matches title, subtitle, stack, role, blurb and bullets             |
| **Live sites only**  | narrows to the projects with a `demo` URL                           |
| Category chips       | counts reflect the current search, and a chip with nothing in it is disabled |
| Any card             | click it (or its title, by keyboard) for the full detail dialog     |
| `←` `→` in a dialog  | walks the filtered list without closing                             |

### ⌘K

`⌘K` / `Ctrl K` — or `/` when you aren't typing in a field — opens the command
palette: every project, section, link and action in one searchable list. Arrow keys
move, `Enter` opens, `Esc` closes. The entries are built from `content.js`, so adding
a project adds it to the palette too.

---

## The contact form

There's no backend, so a valid submit doesn't claim to have sent anything. It hands
the filled-in message to something that really does send — the visitor's own mail
client or WhatsApp, both pre-composed — with "copy the draft" as the fallback.
Validation, error and success states are all real.

To post it directly instead, replace the `submit` handler in
`src/components/Contact.jsx` with a call to EmailJS, Formspree or your own endpoint;
the `values` object is already validated at that point.

---

## Accessibility & motion

- Every colour pair is checked in both themes; the accent shifts to `--accent-text`
  for text so it stays legible on either background.
- Content is visible at rest — the scroll reveal only replays a fade, so the page
  reads fine if JS or `IntersectionObserver` never runs.
- `prefers-reduced-motion` stops the typewriter, the pipeline loop, the float and all
  reveals, and switches anchor scrolling to instant.
- Labels, `aria-label`s on icon-only buttons, `aria-invalid` on failed fields, and a
  visible focus ring throughout.
- Both overlays are real dialogs: `role="dialog"`, `aria-modal`, a focus trap, `Esc`
  to close, and focus returned to whatever opened them. The page behind is scroll-locked,
  with the scrollbar's width replaced so the layout doesn't jump.
- A "skip to projects" link is the first thing in the tab order.
- The cursor spotlight is hover-and-fine-pointer only, so it costs a phone nothing.
- `Ctrl+P` prints as a clean CV: chrome removed, ink on white, link targets spelled
  out, and cards kept off page breaks.

---

## Deploying

`vercel.json` is set up for Vite on Vercel: SPA rewrites, immutable caching on
`/assets`, and the usual security headers. Push to `main` and Vercel builds it.

`resume.pdf` stays at the repo root — the hero's CV button links to the raw file on
GitHub, so replacing that one file updates the download with no redeploy.

`og:image` in `index.html` is an **absolute** URL. If you deploy anywhere other than
`usaim.vercel.app`, change the domain in the `og:image`, `twitter:image`, `og:url` and
`canonical` tags, or the social preview renders blank.
