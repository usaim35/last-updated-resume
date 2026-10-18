import { PROFILE } from '../data/content.js'
import { prefersReduced } from '../lib/hooks.js'
import Icon from './Icon.jsx'

const LINKS = [
  { icon: 'Github', href: PROFILE.links.github, label: 'GitHub' },
  { icon: 'Linkedin', href: PROFILE.links.linkedin, label: 'LinkedIn' },
  { icon: 'Mail', href: `mailto:${PROFILE.email}`, label: 'Email' },
]

export default function Footer({ onOpenPalette }) {
  const toTop = (event) => {
    event.preventDefault()
    window.scrollTo({ top: 0, behavior: prefersReduced() ? 'auto' : 'smooth' })
  }

  return (
    <footer className="border-t border-line py-10">
      <div className="shell flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
        <div className="min-w-0">
          <p className="font-display font-semibold text-[15px] text-fg">{PROFILE.name}</p>
          <p className="mono text-[11px] text-subtle mt-0.5">
            {PROFILE.title} · {PROFILE.location}
          </p>
          <p className="mono text-[11px] text-subtle mt-2">
            © {new Date().getFullYear()} · Built with React, Vite and Tailwind ·{' '}
            <button
              type="button"
              onClick={onOpenPalette}
              className="underline decoration-dotted underline-offset-2 hover:text-fg transition-colors cursor-pointer"
            >
              Press ⌘K
            </button>
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          {LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.label}
              className="grid place-items-center h-9 w-9 rounded-xl border border-line text-subtle hover:text-fg hover:border-line2 transition-colors"
            >
              <Icon name={link.icon} size={16} />
            </a>
          ))}

          <a
            href="#top"
            onClick={toTop}
            aria-label="Back to top"
            className="grid place-items-center h-9 w-9 rounded-xl border border-line text-subtle hover:text-fg hover:border-line2 transition-colors"
          >
            <Icon name="ArrowDown" size={16} className="rotate-180" />
          </a>
        </div>
      </div>
    </footer>
  )
}
