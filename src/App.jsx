import { useState, useCallback } from 'react'
import { PROFILE } from './data/content.js'
import { useTheme, useReveal, useHotkey, useCopy } from './lib/hooks.js'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import Experience from './components/Experience.jsx'
import Stack from './components/Stack.jsx'
import Projects from './components/Projects.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'
import CommandPalette from './components/CommandPalette.jsx'
import BackToTop from './components/BackToTop.jsx'
import Icon from './components/Icon.jsx'

export default function App() {
  const [theme, toggleTheme] = useTheme()
  const [paletteOpen, setPaletteOpen] = useState(false)
  const [copied, copy] = useCopy()

  useReveal()

  // ⌘K / Ctrl+K from anywhere, "/" when not typing into a field.
  useHotkey(
    'mod+k',
    useCallback(() => setPaletteOpen((v) => !v), []),
  )
  useHotkey(
    '/',
    useCallback(() => setPaletteOpen(true), []),
  )

  const copyEmail = useCallback(() => copy(PROFILE.email, 'palette-email'), [copy])

  return (
    <>
      <a
        href="#projects"
        className="sr-only focus:not-sr-only focus:fixed focus:z-[110] focus:top-3 focus:left-3 focus:rounded-xl focus:px-4 focus:py-2.5 focus:grad-bg focus:text-white focus:text-[14px]"
      >
        Skip to projects
      </a>

      <Header theme={theme} toggleTheme={toggleTheme} onOpenPalette={() => setPaletteOpen(true)} />

      <main>
        <Hero />
        <Experience />
        <Stack />
        <Projects />
        <Contact />
      </main>

      <Footer onOpenPalette={() => setPaletteOpen(true)} />

      <BackToTop />

      {paletteOpen && (
        <CommandPalette
          onClose={() => setPaletteOpen(false)}
          theme={theme}
          toggleTheme={toggleTheme}
          onCopyEmail={copyEmail}
        />
      )}

      {/* Confirmation for the palette's copy action, which happens after the
          palette has already closed and would otherwise be silent. */}
      <div
        role="status"
        aria-live="polite"
        className={`fixed z-[95] left-1/2 -translate-x-1/2 bottom-6 flex items-center gap-2 rounded-xl border border-line bg-card px-4 py-2.5 shadow-[var(--shadow)] transition-all duration-300 ${
          copied === 'palette-email'
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-3 pointer-events-none'
        }`}
      >
        <Icon name="Check" size={15} className="text-ok" />
        <span className="text-[13.5px] text-fg">Email copied</span>
      </div>
    </>
  )
}
