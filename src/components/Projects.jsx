import { useState, useMemo } from 'react'
import { PROJECTS, CATEGORIES, PROFILE } from '../data/content.js'
import { spotlight } from '../lib/hooks.js'
import { SectionHead, Tag, Btn } from './ui.jsx'
import ProjectModal from './ProjectModal.jsx'
import Icon from './Icon.jsx'

/** Everything a card can be matched on, lowercased once per project. */
const HAYSTACK = new Map(
  PROJECTS.map((p) => [
    p.title,
    [p.title, p.subtitle, p.category, p.role, p.label, p.blurb, ...p.tags, ...p.points].join(' ').toLowerCase(),
  ]),
)

function ProjectCard({ project, delay, onOpen }) {
  return (
    <article
      onMouseMove={spotlight}
      className="reveal card glow spot group relative flex flex-col p-5 sm:p-6 min-w-0"
      style={{ animationDelay: `${delay}ms` }}
    >
      {project.featured && <span className="absolute inset-x-4 top-0 h-px grad-bg" aria-hidden="true" />}

      <div className="flex items-start justify-between gap-3">
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
                <span className="h-1.5 w-1.5 rounded-full bg-ok ping" aria-hidden="true" />
                Live
              </span>
            )}
          </div>

          {/*
            The title button is the card's primary action. ::after stretches
            it over the whole card, so a click anywhere opens the detail —
            while the real links below sit on z-10 and keep their own target.
          */}
          <h3 className="mt-3 font-display font-semibold text-[17px] text-fg">
            <button
              type="button"
              onClick={() => onOpen(project)}
              className="text-left after:absolute after:inset-0 after:rounded-2xl after:content-[''] group-hover:text-atext transition-colors duration-300 cursor-pointer"
            >
              {project.title}
              <span className="sr-only"> — open project details</span>
            </button>
          </h3>
          <p className="mono text-[11px] text-subtle mt-0.5">{project.subtitle}</p>
        </div>

        <span className="mono text-[10.5px] text-subtle shrink-0 text-right">{project.label}</span>
      </div>

      <p className="mt-4 text-[14.5px] text-muted">{project.blurb}</p>

      <ul className="mt-4 space-y-2">
        {project.points.map((point) => (
          <li key={point} className="flex gap-2.5 text-[13.5px] text-muted min-w-0">
            <span className="mt-[3px] shrink-0 text-atext">
              <Icon name="Check" size={13} />
            </span>
            <span className="min-w-0">{point}</span>
          </li>
        ))}
      </ul>

      <div className="mt-5 flex flex-wrap gap-1.5">
        {project.tags.map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </div>

      <div className="mt-auto pt-5">
        <div className="pt-4 border-t border-line flex items-center justify-between gap-3">
          <span className="mono text-[11px] text-subtle truncate">{project.role}</span>

          <div className="relative z-10 flex items-center gap-2 shrink-0">
            {project.code && (
              <a
                href={project.code}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[12.5px] border border-line text-muted hover:text-fg hover:border-line2 transition-colors duration-200"
              >
                <Icon name="Github" size={13} /> Code
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[12.5px] grad-bg text-white hover:-translate-y-0.5 transition-transform duration-300"
              >
                <Icon name="ExternalLink" size={13} /> Live demo
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  )
}

export default function Projects() {
  const [filter, setFilter] = useState('All')
  const [query, setQuery] = useState('')
  const [liveOnly, setLiveOnly] = useState(false)
  const [open, setOpen] = useState(null)

  const liveCount = useMemo(() => PROJECTS.filter((p) => p.demo).length, [])

  // Search and the live toggle narrow the pool; the chips then slice it, so
  // the chip counts always describe what clicking one would actually show.
  const pool = useMemo(() => {
    const q = query.trim().toLowerCase()
    return PROJECTS.filter((p) => {
      if (liveOnly && !p.demo) return false
      if (q && !HAYSTACK.get(p.title).includes(q)) return false
      return true
    })
  }, [query, liveOnly])

  const shown = filter === 'All' ? pool : pool.filter((p) => p.category === filter)

  const clear = () => {
    setFilter('All')
    setQuery('')
    setLiveOnly(false)
  }

  // Arrow keys inside the modal walk the list the visitor is actually looking at.
  const navigate = (step) => {
    const index = shown.findIndex((p) => p.title === open?.title)
    if (index === -1 || shown.length < 2) return
    setOpen(shown[(index + step + shown.length) % shown.length])
  }

  const byCategory = CATEGORIES.map((category) => ({
    category,
    count: category === 'All' ? pool.length : pool.filter((p) => p.category === category).length,
  }))

  return (
    <section id="projects" className="scroll-mt-24 py-16 sm:py-24 border-t border-line">
      <div className="shell">
        <SectionHead
          index="03"
          eyebrow="Featured projects"
          title="Things I've shipped"
          lede={`Most of these started as “someone does this a hundred times a day”. ${PROJECTS.length} projects, ${liveCount} of them running live right now — open any card for the full story.`}
        />

        {/* Controls */}
        <div className="reveal mt-8 flex flex-col gap-3">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1 min-w-0">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-subtle pointer-events-none">
                <Icon name="Search" size={16} />
              </span>
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by name, stack or problem — try “invoice” or “FastAPI”"
                aria-label="Search projects"
                className="w-full rounded-xl border border-line bg-card pl-10 pr-4 py-2.5 text-[14px] outline-none transition-all duration-200 focus:border-accent focus:shadow-[0_0_0_3px_var(--ring)]"
              />
            </div>

            <button
              type="button"
              onClick={() => setLiveOnly((v) => !v)}
              aria-pressed={liveOnly}
              className={`inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-[13.5px] border transition-all duration-300 cursor-pointer shrink-0 ${
                liveOnly
                  ? 'border-transparent grad-bg text-white'
                  : 'border-line bg-card text-muted hover:text-fg hover:border-line2'
              }`}
            >
              <span
                className={`h-1.5 w-1.5 rounded-full ${liveOnly ? 'bg-white' : 'bg-ok ping'}`}
                aria-hidden="true"
              />
              Live sites only
              <span className={`mono text-[10.5px] tnum ${liveOnly ? 'text-white/70' : 'text-subtle'}`}>
                {liveCount}
              </span>
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            {byCategory.map(({ category, count }) => {
              const on = filter === category

              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setFilter(category)}
                  disabled={count === 0 && !on}
                  className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-[13px] border transition-all duration-300 ${
                    on
                      ? 'border-transparent grad-bg text-white cursor-pointer'
                      : count === 0
                        ? 'border-line bg-card text-subtle opacity-40 cursor-not-allowed'
                        : 'border-line bg-card text-muted hover:text-fg hover:border-line2 cursor-pointer'
                  }`}
                >
                  {category}
                  <span className={`mono text-[10.5px] tnum ${on ? 'text-white/70' : 'text-subtle'}`}>{count}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Grid */}
        {shown.length === 0 ? (
          <div className="reveal mt-10 card p-10 text-center">
            <span className="grid place-items-center h-12 w-12 mx-auto rounded-2xl bg-soft border border-line text-subtle">
              <Icon name="Search" size={20} />
            </span>
            <p className="mt-4 text-[15px] text-fg">No project matches that.</p>
            <p className="mt-1 text-[14px] text-muted">Try a different term, or clear the filters.</p>
            <div className="mt-5 flex justify-center">
              <Btn as="button" type="button" variant="ghost" onClick={clear} icon="X">
                Clear filters
              </Btn>
            </div>
          </div>
        ) : (
          <div className="mt-8 grid lg:grid-cols-2 gap-5 items-stretch">
            {shown.map((project, i) => (
              <ProjectCard key={project.title} project={project} delay={i * 55} onOpen={setOpen} />
            ))}
          </div>
        )}

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Btn
            href={PROFILE.links.github}
            target="_blank"
            rel="noopener noreferrer"
            variant="ghost"
            icon="Github"
            iconAfter="ArrowUpRight"
          >
            More on GitHub
          </Btn>
        </div>
      </div>

      <ProjectModal project={open} onClose={() => setOpen(null)} onNavigate={navigate} />
    </section>
  )
}
