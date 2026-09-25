# Muhammad Usaim — Portfolio

A cinematic, animated portfolio built with React, Vite, Tailwind CSS, and GSAP.

## Run locally

```bash
npm install
npm run dev
```

## Build for production

```bash
npm run build
```

## Deploy to Vercel

1. Push this project to a GitHub repository.
2. Go to [vercel.com](https://vercel.com), click **New Project**, and import the repo.
3. Vercel auto-detects Vite — just click **Deploy**. No extra config needed.

## Contact form (optional)

The contact form uses [EmailJS](https://www.emailjs.com/) to send messages without a backend.
See `.env.example` for setup steps. Until configured, the form will show a friendly
"not yet connected" message instead of failing silently — connect your own EmailJS
account by copying `.env.example` to `.env` and filling in your keys, then add the same
three `VITE_EMAILJS_*` variables in your Vercel project's Environment Variables settings.

## Tech stack

- React 19 + Vite
- Tailwind CSS v4
- GSAP + ScrollTrigger (scroll animations, cursor tracking, card tilt)
- EmailJS (contact form)
