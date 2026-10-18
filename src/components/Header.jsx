import { useState, useEffect, useMemo } from 'react'
import { NAV, PROFILE } from '../data/content.js'
import { useScrollSpy, useScrollProgress, useLockBodyScroll, scrollToId } from '../lib/hooks.js'
import Icon from './Icon.jsx'

/**
 * "⌘K" on a Mac, "Ctrl K" everywhere else.
 *
 * Read once at module load rather than in state: this is a browser-only
 * build, so the value can never change between renders and putting it in an
 * effect would only cost a second pass.
 */
const MOD_KEY = (() => {
  if (typeof navigator === 'undefined') return 'Ctrl'
  const platform = navigator.userAgentData?.platform || navigator.platform || ''
  return /mac|iphone|ipad|ipod/i.test(platform) ? '⌘' : 'Ctrl'
})()

export default function Header({ theme, toggleTheme, onOpenPalette }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const ids = useMemo(() => NAV.map((n) => n.id), [])
  const active = useScrollSpy(ids)
  const progress = useScrollProgress()

  useLockBodyScroll(open)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // A phone rotated to landscape can leave the sheet open over a desktop
  // layout; close it once the desktop nav is back.
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)')
    const onChange = (e) => e.matches && setOpen(false)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  const go = (event, id) => {
    setOpen(false)
    scrollToId(event, id)
  }

  return (
    <header
      className={`glass sticky top-0 z-50 border-b transition-colors duration-300 ${
        scrolled ? 'border-line' : 'border-transparent'
      }`}
    >
      {/* Reading progress */}
      <div className="h-[2px] w-full">
        <div className="h-full grad-bg transition-[width] duration-150 ease-out" style={{ width: `${progress}%` }} />
      </div>

      <div className="shell flex items-center justify-between py-3">
        <a href="#top" onClick={(e) => go(e, 'top')} className="flex items-center gap-2.5 shrink-0">
          <span className="grid place-items-center h-9 w-9 rounded-xl grad-bg text-white font-display font-bold text-[13px] tracking-tight">
            {PROFILE.initials}
          </span>
          <span className="hidden sm:block leading-tight min-w-0">
            <span className="block font-display font-semibold text-[14px] text-fg">{PROFILE.name}</span>
            <span className="block mono text-[10.5px] text-subtle">back-end · devops</span>
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-1" aria-label="Sections">
          {NAV.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => go(e, item.id)}
              className={`relative px-3.5 py-2 rounded-lg text-[14px] transition-colors duration-200 ${
                active === item.id ? 'text-fg' : 'text-muted hover:text-fg'
              }`}
            >
              {item.label}
              <span
                className={`absolute left-3.5 right-3.5 -bottom-0.5 h-px grad-bg transition-opacity duration-300 ${
                  active === item.id ? 'opacity-100' : 'opacity-0'
                }`}
              />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {/* Desktop: a real search affordance. Phones get the icon only. */}
          <button
            type="button"
            onClick={onOpenPalette}
            aria-label="Open command palette"
            className="hidden md:inline-flex items-center gap-2 h-9 pl-3 pr-2 rounded-xl border border-line bg-card text-subtle hover:text-fg hover:border-line2 transition-colors duration-200 cursor-pointer"
          >
            <Icon name="Search" size={15} />
            <span className="text-[13px]">Search</span>
            <kbd className="mono text-[10px] px-1.5 py-0.5 rounded border border-line bg-soft">{MOD_KEY} K</kbd>
          </button>

          <button
            type="button"
            onClick={onOpenPalette}
            aria-label="Search"
            className="md:hidden grid place-items-center h-9 w-9 rounded-xl border border-line text-muted hover:text-fg hover:border-line2 transition-colors duration-200 cursor-pointer"
          >
            <Icon name="Search" size={17} />
          </button>

          <a
            href={PROFILE.links.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="hidden sm:grid place-items-center h-9 w-9 rounded-xl border border-line text-muted hover:text-fg hover:border-line2 transition-colors duration-200"
          >
            <Icon name="Github" size={17} />
          </a>

          <button
            type="button"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            className="grid place-items-center h-9 w-9 rounded-xl border border-line text-muted hover:text-atext hover:border-line2 transition-colors duration-200 cursor-pointer"
          >
            <Icon name={theme === 'dark' ? 'Sun' : 'Moon'} size={17} />
          </button>

          <a
            href="#contact"
            onClick={(e) => go(e, 'contact')}
            className="hidden lg:inline-flex items-center gap-2 h-9 px-4 rounded-xl grad-bg text-white text-[13.5px] font-medium hover:-translate-y-0.5 transition-transform duration-300"
          >
            Hire me
          </a>

          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
            aria-expanded={open}
            className="md:hidden grid place-items-center h-9 w-9 rounded-xl border border-line text-fg cursor-pointer"
          >
            <Icon name={open ? 'X' : 'Menu'} size={18} />
          </button>
        </div>
      </div>

      {/* Mobile panel */}
      <div
        className={`md:hidden overflow-hidden transition-[max-height,opacity] duration-300 ${
          open ? 'max-h-[460px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="shell pb-5 flex flex-col gap-1 border-t border-line pt-3">
          {NAV.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => go(e, item.id)}
              className={`flex items-center justify-between px-3 py-3 rounded-xl text-[15px] transition-colors ${
                active === item.id ? 'text-fg bg-soft' : 'text-muted hover:text-fg hover:bg-soft'
              }`}
            >
              {item.label}
              <Icon name="ChevronRight" size={16} />
            </a>
          ))}

          <div className="mt-2 grid grid-cols-2 gap-2">
            <a
              href={PROFILE.links.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-3 py-3 rounded-xl border border-line text-[14.5px] text-fg"
            >
              <Icon name="Download" size={16} /> CV
            </a>
            <a
              href="#contact"
              onClick={(e) => go(e, 'contact')}
              className="inline-flex items-center justify-center gap-2 px-3 py-3 rounded-xl grad-bg text-white text-[14.5px] font-medium"
            >
              <Icon name="Send" size={16} /> Hire me
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}
