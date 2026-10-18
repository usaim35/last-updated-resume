import { SKILLS, EDUCATION } from '../data/content.js'
import { spotlight } from '../lib/hooks.js'
import { SectionHead } from './ui.jsx'
import Icon from './Icon.jsx'

export default function Stack() {
  return (
    <section id="stack" className="scroll-mt-24 py-16 sm:py-24 border-t border-line bg-soft">
      <div className="shell">
        <SectionHead
          index="02"
          eyebrow="Tech stack"
          title="What I build with"
          lede="Two core backends, a React frontend, relational databases first — and the automation tooling that keeps it all unattended."
        />

        <div className="mt-12 grid sm:grid-cols-2 gap-5">
          {SKILLS.map((group, i) => (
            <article
              key={group.title}
              onMouseMove={spotlight}
              className="reveal card glow spot p-5 sm:p-6 min-w-0"
              style={{ animationDelay: `${i * 70}ms` }}
            >
              <div className="flex items-center gap-3">
                <span className="grid place-items-center h-10 w-10 rounded-xl grad-bg text-white shrink-0">
                  <Icon name={group.icon} size={18} />
                </span>
                <div className="min-w-0">
                  <h3 className="font-display font-semibold text-[16px] text-fg">{group.title}</h3>
                  <p className="mono text-[10.5px] text-subtle">{group.items.length} technologies</p>
                </div>
              </div>

              <p className="mt-4 text-[14px] text-muted">{group.note}</p>

              <div className="mt-4 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span key={item} className="pill px-3 py-1.5 text-[12.5px] text-muted cursor-default">
                    {item}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>

        <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {EDUCATION.map((entry, i) => (
            <article
              key={entry.title}
              className="reveal card glow p-4 min-w-0"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <div className="flex items-center gap-2 text-atext">
                <Icon name={entry.icon} size={16} />
                <span className="mono text-[10.5px] uppercase tracking-wider text-subtle">{entry.period}</span>
              </div>
              <h3 className="mt-2.5 font-display font-semibold text-[14px] text-fg leading-snug">{entry.title}</h3>
              <p className="mt-1 text-[13px] text-muted">{entry.org}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
