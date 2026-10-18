import { useState, useEffect, useCallback } from 'react'

/** True when the visitor has asked the OS to reduce motion. */
export const prefersReduced = () =>
  typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

/**
 * Theme state, persisted per visitor.
 *
 * index.html applies the saved value before first paint, so this hook only
 * has to keep the attribute and storage in sync after that. Every storage
 * call is guarded: a private window or blocked site data throws on access.
 */
export function useTheme() {
  const [theme, setTheme] = useState(() => {
    try {
      const saved = localStorage.getItem('usaim-theme')
      if (saved === 'light' || saved === 'dark') return saved
    } catch {
      /* storage unavailable */
    }
    try {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    } catch {
      return 'light'
    }
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    try {
      localStorage.setItem('usaim-theme', theme)
    } catch {
      /* storage unavailable — the choice just won't survive a reload */
    }
  }, [theme])

  const toggle = useCallback(() => setTheme((t) => (t === 'dark' ? 'light' : 'dark')), [])
  return [theme, toggle]
}

/**
 * Replays a fade-up as each .reveal element scrolls into view.
 * Elements are visible by default, so a missing observer costs nothing.
 */
export function useReveal() {
  useEffect(() => {
    if (prefersReduced() || !('IntersectionObserver' in window)) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in')
            observer.unobserve(entry.target)
          }
        })
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.06 },
    )

    document
      .querySelectorAll('.reveal:not(.in)')
      .forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  })
}

/** Which section id is currently under the top third of the viewport. */
export function useScrollSpy(ids) {
  const [active, setActive] = useState('')

  useEffect(() => {
    let frame = 0
    const onScroll = () => {
      if (frame) return
      frame = requestAnimationFrame(() => {
        frame = 0
        const probe = window.scrollY + window.innerHeight * 0.3
        let current = ''
        ids.forEach((id) => {
          const el = document.getElementById(id)
          if (el && el.offsetTop <= probe) current = id
        })
        setActive(current)
      })
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [ids])

  return active
}

/** How far down the page we are, 0–100, for the header progress bar. */
export function useScrollProgress() {
  const [pct, setPct] = useState(0)

  useEffect(() => {
    let frame = 0
    const onScroll = () => {
      if (frame) return
      frame = requestAnimationFrame(() => {
        frame = 0
        const max = document.documentElement.scrollHeight - window.innerHeight
        setPct(max > 0 ? Math.min(100, (window.scrollY / max) * 100) : 0)
      })
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  return pct
}

/**
 * Types each phrase out, holds it, erases it, moves to the next.
 * Starts on the full first phrase so the headline is complete at rest.
 */
export function useTypewriter(words, { typeMs = 72, eraseMs = 34, holdMs = 1500 } = {}) {
  const [text, setText] = useState(words[0])
  const reduced = prefersReduced()

  useEffect(() => {
    if (reduced) return

    let wordIndex = 0
    let charCount = words[0].length
    let erasing = true
    let timer

    const tick = () => {
      const word = words[wordIndex]

      if (erasing) {
        charCount -= 1
        setText(word.slice(0, charCount))
        if (charCount === 0) {
          erasing = false
          wordIndex = (wordIndex + 1) % words.length
        }
      } else {
        charCount += 1
        setText(word.slice(0, charCount))
        if (charCount === word.length) {
          erasing = true
          timer = setTimeout(tick, holdMs)
          return
        }
      }

      timer = setTimeout(tick, erasing ? eraseMs : typeMs)
    }

    timer = setTimeout(tick, holdMs)
    return () => clearTimeout(timer)
  }, [words, reduced, typeMs, eraseMs, holdMs])

  // With reduced motion the headline simply rests on the first phrase.
  return reduced ? words[0] : text
}

/**
 * Copy to clipboard with a "copied" flag keyed per button.
 * navigator.clipboard is refused in some embedded views, so there is a
 * selection-based fallback behind it.
 */
export function useCopy() {
  const [copied, setCopied] = useState('')

  const copy = useCallback(async (value, key) => {
    let ok = false

    try {
      await navigator.clipboard.writeText(value)
      ok = true
    } catch {
      try {
        const ta = document.createElement('textarea')
        ta.value = value
        ta.setAttribute('readonly', '')
        ta.style.position = 'fixed'
        ta.style.opacity = '0'
        document.body.appendChild(ta)
        ta.select()
        ok = typeof document.execCommand === 'function' && document.execCommand('copy')
        document.body.removeChild(ta)
      } catch {
        /* no clipboard route available — the value stays on screen to select */
      }
    }

    if (ok) {
      setCopied(key)
      setTimeout(() => setCopied((c) => (c === key ? '' : c)), 1800)
    }
    return ok
  }, [])

  return [copied, copy]
}

/**
 * Freezes the page behind an overlay.
 *
 * Padding replaces the scrollbar's width so the layout doesn't jump sideways
 * the moment the dialog opens — on macOS overlay scrollbars that width is 0
 * and nothing is added.
 */
export function useLockBodyScroll(locked) {
  useEffect(() => {
    if (!locked) return

    const { overflow, paddingRight } = document.body.style
    const gap = window.innerWidth - document.documentElement.clientWidth

    document.body.style.overflow = 'hidden'
    if (gap > 0) document.body.style.paddingRight = `${gap}px`

    return () => {
      document.body.style.overflow = overflow
      document.body.style.paddingRight = paddingRight
    }
  }, [locked])
}

/**
 * Global keyboard shortcut.
 *
 * `combo` is like 'mod+k' or 'escape' — "mod" is Cmd on a Mac and Ctrl
 * everywhere else. Keystrokes typed into an input are ignored unless the
 * shortcut carries a modifier, so "/" never steals a character from the
 * contact form while Cmd+K still works from inside it.
 */
export function useHotkey(combo, handler) {
  useEffect(() => {
    const parts = combo.toLowerCase().split('+')
    const key = parts[parts.length - 1]
    const needsMod = parts.includes('mod')

    const onKey = (event) => {
      if (event.key.toLowerCase() !== key) return
      if (needsMod !== (event.metaKey || event.ctrlKey)) return

      if (!needsMod) {
        const el = event.target
        const typing =
          el instanceof HTMLElement &&
          (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.isContentEditable)
        if (typing) return
      }

      event.preventDefault()
      handler(event)
    }

    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [combo, handler])
}

/**
 * Keeps Tab inside an open dialog and restores focus to whatever opened it.
 * Without this a keyboard user tabs straight out of the dialog and into the
 * page behind it, which is still there but inert.
 */
export function useFocusTrap(active, containerRef) {
  useEffect(() => {
    if (!active) return

    const opener = document.activeElement
    const container = containerRef.current
    if (!container) return

    const SELECTOR =
      'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select, [tabindex]:not([tabindex="-1"])'

    const focusables = () => Array.from(container.querySelectorAll(SELECTOR)).filter((el) => el.offsetParent !== null)

    // Move focus in, so the first Tab lands on the dialog's own content.
    const first = focusables()[0]
    if (first) first.focus()
    else container.focus()

    const onKey = (event) => {
      if (event.key !== 'Tab') return

      const items = focusables()
      if (items.length === 0) return

      const edge = event.shiftKey ? items[0] : items[items.length - 1]
      if (document.activeElement === edge) {
        event.preventDefault()
        ;(event.shiftKey ? items[items.length - 1] : items[0]).focus()
      }
    }

    container.addEventListener('keydown', onKey)
    return () => {
      container.removeEventListener('keydown', onKey)
      if (opener instanceof HTMLElement) opener.focus()
    }
  }, [active, containerRef])
}

/** True once the page has scrolled past `offset` pixels. */
export function useScrolledPast(offset = 600) {
  const [past, setPast] = useState(false)

  useEffect(() => {
    let frame = 0
    const onScroll = () => {
      if (frame) return
      frame = requestAnimationFrame(() => {
        frame = 0
        setPast(window.scrollY > offset)
      })
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [offset])

  return past
}

/**
 * Writes the cursor position onto the element as --mx / --my so CSS can put a
 * soft highlight under the pointer. Pure decoration: it is skipped entirely
 * under reduced motion and on touch, where there is no hover to follow.
 */
export function spotlight(event) {
  if (prefersReduced()) return
  const el = event.currentTarget
  const box = el.getBoundingClientRect()
  el.style.setProperty('--mx', `${event.clientX - box.left}px`)
  el.style.setProperty('--my', `${event.clientY - box.top}px`)
}

/** Smooth-scrolls to a section, respecting reduced motion. */
export function scrollToId(event, id) {
  if (event) event.preventDefault()
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: prefersReduced() ? 'auto' : 'smooth', block: 'start' })
  }
}
