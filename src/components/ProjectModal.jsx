import { useRef } from 'react'
import { useLockBodyScroll, useFocusTrap } from '../lib/hooks.js'
import { Tag } from './ui.jsx'
import Icon from './Icon.jsx'

/**
 * Full detail for one project.
 *
 * The grid cards stay short so the section can be scanned; anything that
 * didn't fit — the whole blurb, every bullet, the full stack — lives here.
 */
export default function ProjectModal({ project, onClose, onNavigate }) {
  const panelRef = useRef(null)

  useLockBodyScroll(Boolean(project))
  useFocusTrap(Boolean(project), panelRef)

  if (!project) return null

  const onKeyDown = (event) => {
    if (event.key === 'Escape') {
      event.preventDefault()
      onClose()
    } else if (event.key === 'ArrowRight') {
      event.preventDefault()
      onNavigate(1)
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault()
      onNavigate(-1)
    }
  }

  return (
    <div
      className="fixed inset-0 z-[90] flex items-end sm:items-center justify-center sm:px-4 sm:py-8 overlay-in"
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
        aria-labelledby="project-modal-title"
        tabIndex={-1}
        onKeyDown={onKeyDown}
        className="panel-in relative w-full sm:max-w-[680px] max-h-[92vh] sm:max-h-[86vh] flex flex-col rounded-t-2xl sm:rounded-2xl border border-line bg-card shadow-[0_30px_80px_-20px_rgba(2,6,16,.6)] overflow-hidden outline-none"
      >
        {/* Grab handle — this sheet comes up from the bottom on a phone */}
        <span className="sm:hidden mx-auto mt-2.5 h-1 w-10 rounded-full bg-line2 shrink-0" aria-hidden="true" />

        <header className="flex items-start justify-between gap-4 p-5 sm:p-6 pb-4 border-b border-line">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className="mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded border border-line bg-soft text-subtle">
                {project.category}
              </span>
              {project.featured && (
                <span className="mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded grad-bg text-white">
                  Featured
                </span>
              )}
              {project.demo && (
                <span className="inline-flex items-center gap-1.5 mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-ok-soft text-ok">
                  <span className="h-1.5 w-1.5 rounded-full bg-ok ping" />
                  Live
                </span>
              )}
            </div>

            <h2
              id="project-modal-title"
              className="mt-3 font-display font-bold text-[clamp(1.25rem,4vw,1.6rem)] text-fg"
            >
              {project.title}
            </h2>
            <p className="mono text-[11.5px] text-subtle mt-1">{project.subtitle}</p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="grid place-items-center h-9 w-9 rounded-xl border border-line text-muted hover:text-fg hover:border-line2 transition-colors shrink-0 cursor-pointer"
          >
            <Icon name="X" size={17} />
          </button>
        </header>

        <div className="overflow-y-auto overscroll-contain p-5 sm:p-6 flex flex-col gap-6">
          <p className="text-[15px] text-muted">{project.blurb}</p>

          <div>
            <p className="eyebrow mb-3">What it does</p>
            <ul className="space-y-2.5">
              {project.points.map((point) => (
                <li key={point} className="flex gap-3 text-[14.5px] text-muted min-w-0">
                  <span className="mt-[3px] shrink-0 text-atext">
                    <Icon name="Check" size={14} />
                  </span>
                  <span className="min-w-0">{point}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="rounded-xl border border-line bg-soft p-4">
              <p className="eyebrow">My role</p>
              <p className="mt-1.5 text-[14px] text-fg">{project.role}</p>
            </div>
            <div className="rounded-xl border border-line bg-soft p-4">
              <p className="eyebrow">Context</p>
              <p className="mt-1.5 text-[14px] text-fg">{project.label}</p>
            </div>
          </div>

          <div>
            <p className="eyebrow mb-3">Built with</p>
            <div className="flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </div>
          </div>
        </div>

        <footer className="flex items-center justify-between gap-3 p-4 sm:px-6 border-t border-line bg-soft">
          <div className="hidden sm:flex items-center gap-1.5 mono text-[10.5px] text-subtle">
            <kbd className="px-1.5 py-0.5 rounded border border-line">←</kbd>
            <kbd className="px-1.5 py-0.5 rounded border border-line">→</kbd>
            <span>between projects</span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            {project.code && (
              <a
                href={project.code}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-[13.5px] border border-line bg-card text-muted hover:text-fg hover:border-line2 transition-colors"
              >
                <Icon name="Github" size={15} /> Code
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-[13.5px] grad-bg text-white hover:-translate-y-0.5 transition-transform duration-300"
              >
                <Icon name="ExternalLink" size={15} /> Visit live site
              </a>
            )}
          </div>
        </footer>
      </div>
    </div>
  )
}
