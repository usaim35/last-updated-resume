import { useState, useMemo, useRef, useEffect, useCallback } from 'react'
import { PROJECTS, NAV, PROFILE } from '../data/content.js'
import { useLockBodyScroll, useFocusTrap, scrollToId } from '../lib/hooks.js'
import Icon from './Icon.jsx'

/**
 * ⌘K palette: jump to a section, open a live site, or fire an action.
 *
 * Everything the header and the project grid can do is reachable from here
 * without the mouse — which is mostly for the one visitor in twenty who
 * tries ⌘K on a portfolio, and costs nothing for the rest.
 */

const GROUP_ORDER = ['Projects', 'Sections', 'Links', 'Actions']

/** Case-insensitive substring match across every searchable field. */
function matches(item, query) {
  if (!query) return true
  return item.haystack.includes(query.toLowerCase())
}

export default function CommandPalette({ onClose, theme, toggleTheme, onCopyEmail }) {
  const [query, setQuery] = useState('')
  const [cursor, setCursor] = useState(0)

  const panelRef = useRef(null)
  const listRef = useRef(null)

  // App mounts this only while the palette is open, so every open starts
  // from a clean query and the focus trap can claim the input on mount.
  useLockBodyScroll(true)
  useFocusTrap(true, panelRef)

  const run = useCallback(
    (action) => {
      onClose()
      // Let the overlay unmount before scrolling or opening a tab, so the
      // scroll lock is already released when the jump happens.
      requestAnimationFrame(() => action())
    },
    [onClose],
  )

  const items = useMemo(() => {
    const list = []

    PROJECTS.forEach((project) => {
      const target = project.demo || project.code
      list.push({
        id: `project-${project.title}`,
        group: 'Projects',
        label: project.title,
        hint: project.subtitle,
        icon: project.demo ? 'Rocket' : 'CodeXml',
        badge: project.demo ? 'Live' : null,
        haystack: [project.title, project.subtitle, project.category, ...project.tags].join(' ').toLowerCase(),
        action: () => window.open(target, '_blank', 'noopener,noreferrer'),
      })
    })

    NAV.forEach((item) => {
      list.push({
        id: `nav-${item.id}`,
        group: 'Sections',
        label: item.label,
        hint: `Jump to ${item.label.toLowerCase()}`,
        icon: 'ArrowDown',
        haystack: `${item.label} ${item.id}`.toLowerCase(),
        action: () => scrollToId(null, item.id),
      })
    })

    list.push(
      {
        id: 'link-github',
        group: 'Links',
        label: 'GitHub',
        hint: 'github.com/usaim35',
        icon: 'Github',
        haystack: 'github code repositories source',
        action: () => window.open(PROFILE.links.github, '_blank', 'noopener,noreferrer'),
      },
      {
        id: 'link-linkedin',
        group: 'Links',
        label: 'LinkedIn',
        hint: 'Professional profile',
        icon: 'Linkedin',
        haystack: 'linkedin profile network',
        action: () => window.open(PROFILE.links.linkedin, '_blank', 'noopener,noreferrer'),
      },
      {
        id: 'link-whatsapp',
        group: 'Links',
        label: 'WhatsApp',
        hint: PROFILE.phone,
        icon: 'Whatsapp',
        haystack: `whatsapp message chat ${PROFILE.phone}`,
        action: () => window.open(PROFILE.links.whatsapp, '_blank', 'noopener,noreferrer'),
      },
      {
        id: 'action-email',
        group: 'Actions',
        label: 'Copy email address',
        hint: PROFILE.email,
        icon: 'Copy',
        haystack: `copy email address ${PROFILE.email}`,
        action: () => onCopyEmail(),
      },
      {
        id: 'action-cv',
        group: 'Actions',
        label: 'Download CV',
        hint: 'PDF résumé',
        icon: 'Download',
        haystack: 'download cv resume pdf',
        action: () => window.open(PROFILE.links.resume, '_blank', 'noopener,noreferrer'),
      },
      {
        id: 'action-theme',
        group: 'Actions',
        label: theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode',
        hint: 'Toggle the colour theme',
        icon: theme === 'dark' ? 'Sun' : 'Moon',
        haystack: 'theme dark light mode colour color toggle',
        action: () => toggleTheme(),
      },
    )

    return list
  }, [theme, toggleTheme, onCopyEmail])

  const results = useMemo(() => items.filter((item) => matches(item, query.trim())), [items, query])

  // Grouped for display, but `results` stays the flat list the cursor indexes.
  const grouped = useMemo(() => {
    const map = new Map()
    results.forEach((item) => {
      if (!map.has(item.group)) map.set(item.group, [])
      map.get(item.group).push(item)
    })
    return GROUP_ORDER.filter((group) => map.has(group)).map((group) => [group, map.get(group)])
  }, [results])

  // Keep the highlighted row visible when arrowing past the fold.
  useEffect(() => {
    const el = listRef.current?.querySelector('[data-active="true"]')
    if (el) el.scrollIntoView({ block: 'nearest' })
  }, [cursor, results.length])

  const onKeyDown = (event) => {
    if (event.key === 'Escape') {
      event.preventDefault()
      onClose()
    } else if (event.key === 'ArrowDown') {
      event.preventDefault()
      setCursor((c) => (results.length ? (c + 1) % results.length : 0))
    } else if (event.key === 'ArrowUp') {
      event.preventDefault()
      setCursor((c) => (results.length ? (c - 1 + results.length) % results.length : 0))
    } else if (event.key === 'Enter') {
      event.preventDefault()
      const item = results[cursor]
      if (item) run(item.action)
    }
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center px-4 pt-[12vh] pb-6 overlay-in"
      role="presentation"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div className="absolute inset-0 bg-[rgba(2,6,16,.68)] backdrop-blur-[5px]" aria-hidden="true" />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
        tabIndex={-1}
        onKeyDown={onKeyDown}
        className="panel-in relative w-full max-w-[600px] rounded-2xl border border-line bg-card shadow-[0_30px_80px_-20px_rgba(2,6,16,.6)] overflow-hidden outline-none"
      >
        <div className="flex items-center gap-3 px-4 border-b border-line">
          <Icon name="Search" size={17} className="text-subtle shrink-0" />
          <input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setCursor(0)
            }}
            placeholder="Search projects, sections, links…"
            aria-label="Search"
            className="flex-1 bg-transparent py-4 text-[15px] outline-none focus-visible:outline-none placeholder:text-subtle"
          />
          <kbd className="mono text-[10px] px-1.5 py-1 rounded border border-line text-subtle shrink-0">ESC</kbd>
        </div>

        <div ref={listRef} className="max-h-[52vh] overflow-y-auto overscroll-contain py-2">
          {results.length === 0 ? (
            <p className="px-4 py-10 text-center text-[14px] text-subtle">
              Nothing matches “{query}”.
            </p>
          ) : (
            grouped.map(([group, rows]) => (
              <div key={group} className="px-2 pb-1">
                <p className="eyebrow px-2 pt-2 pb-1">{group}</p>

                {rows.map((item) => {
                  const index = results.indexOf(item)
                  const active = index === cursor

                  return (
                    <button
                      key={item.id}
                      type="button"
                      data-active={active}
                      onMouseMove={() => setCursor(index)}
                      onClick={() => run(item.action)}
                      className={`w-full flex items-center gap-3 px-2.5 py-2.5 rounded-xl text-left transition-colors duration-150 cursor-pointer ${
                        active ? 'bg-soft' : ''
                      }`}
                    >
                      <span
                        className={`grid place-items-center h-8 w-8 rounded-lg border shrink-0 transition-colors duration-150 ${
                          active ? 'border-transparent grad-bg text-white' : 'border-line bg-soft text-subtle'
                        }`}
                      >
                        <Icon name={item.icon} size={15} />
                      </span>

                      <span className="min-w-0 flex-1">
                        <span className="flex items-center gap-2">
                          <span className="text-[14px] text-fg truncate">{item.label}</span>
                          {item.badge && (
                            <span className="mono text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-ok-soft text-ok shrink-0">
                              {item.badge}
                            </span>
                          )}
                        </span>
                        <span className="block mono text-[11px] text-subtle truncate">{item.hint}</span>
                      </span>

                      {active && <Icon name="CornerDownLeft" size={14} className="text-subtle shrink-0" />}
                    </button>
                  )
                })}
              </div>
            ))
          )}
        </div>

        <div className="flex items-center justify-between gap-3 px-4 py-2.5 border-t border-line bg-soft">
          <span className="mono text-[10.5px] text-subtle">
            {results.length} result{results.length === 1 ? '' : 's'}
          </span>
          <span className="hidden sm:flex items-center gap-3 mono text-[10.5px] text-subtle">
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded border border-line">↑</kbd>
              <kbd className="px-1.5 py-0.5 rounded border border-line">↓</kbd> navigate
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded border border-line">↵</kbd> open
            </span>
          </span>
        </div>
      </div>
    </div>
  )
}
