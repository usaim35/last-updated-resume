import { EXPERIENCE } from '../data/content.js'
import { spotlight } from '../lib/hooks.js'
import { SectionHead, Tag } from './ui.jsx'
import Icon from './Icon.jsx'

export default function Experience() {
  return (
    <section id="work" className="scroll-mt-24 py-16 sm:py-24 border-t border-line">
      <div className="shell">
        <SectionHead
          index="01"
          eyebrow="Career timeline"
          title="Six roles, one direction"
          lede="Customer-facing work, then development, then operations — which is why I'm comfortable on both sides of a handover."
        />

        <ol className="mt-12 relative">
          {/* The spine the markers sit on */}
          <span className="absolute left-[15px] top-2 bottom-2 w-px bg-line md:left-[19px]" aria-hidden="true" />

          {EXPERIENCE.map((job, i) => (
            <li
              key={job.company}
              className="reveal relative pl-11 md:pl-14 pb-8 last:pb-0"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <span
                className={`absolute left-0 top-1.5 grid place-items-center h-8 w-8 md:h-10 md:w-10 rounded-xl border ${
                  job.current ? 'border-transparent grad-bg text-white' : 'border-line bg-card text-subtle'
                }`}
              >
                <Icon name={job.current ? 'Zap' : 'Briefcase'} size={16} />
              </span>

              <article onMouseMove={spotlight} className="card glow spot p-5 sm:p-6">
                <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-2">
                  <div className="min-w-0">
                    <h3 className="font-display font-semibold text-[17px] text-fg">{job.role}</h3>
                    <p className="mt-0.5 text-[14px] text-atext">{job.company}</p>
                  </div>
                  <div className="text-left sm:text-right shrink-0">
                    <p className="mono text-[11.5px] text-fg tnum">{job.period}</p>
                    <p className="mono text-[10.5px] text-subtle uppercase tracking-wider">{job.meta}</p>
                  </div>
                </div>

                <ul className="mt-4 space-y-2">
                  {job.points.map((point) => (
                    <li key={point} className="flex gap-2.5 text-[14.5px] text-muted min-w-0">
                      <span className="mt-[9px] h-1 w-1 rounded-full bg-accent2 shrink-0" />
                      <span className="min-w-0">{point}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {job.tags.map((tag) => (
                    <Tag key={tag}>{tag}</Tag>
                  ))}
                </div>
              </article>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
