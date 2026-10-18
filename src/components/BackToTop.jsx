import { useScrolledPast, useScrollProgress, prefersReduced } from '../lib/hooks.js'
import Icon from './Icon.jsx'

/**
 * Floating return-to-top control.
 *
 * The ring around it is the same reading progress the header shows, drawn as
 * a conic gradient so the button doubles as a "how much is left" indicator.
 * It stays out of the tab order and out of the way until the visitor is far
 * enough down that scrolling back would actually be tedious.
 */
export default function BackToTop() {
  const visible = useScrolledPast(700)
  const progress = useScrollProgress()

  const toTop = () => window.scrollTo({ top: 0, behavior: prefersReduced() ? 'auto' : 'smooth' })

  return (
    <button
      type="button"
      onClick={toTop}
      aria-label="Back to top"
      tabIndex={visible ? 0 : -1}
      aria-hidden={!visible}
      className={`fixed z-40 right-4 bottom-4 sm:right-6 sm:bottom-6 grid place-items-center h-12 w-12 rounded-full transition-all duration-300 cursor-pointer ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3 pointer-events-none'
      }`}
      style={{
        background: `conic-gradient(var(--accent) ${progress}%, var(--border) ${progress}%)`,
      }}
    >
      <span className="grid place-items-center h-[42px] w-[42px] rounded-full bg-card text-fg shadow-[var(--shadow)]">
        <Icon name="ArrowUp" size={18} />
      </span>
    </button>
  )
}
