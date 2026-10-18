import { PROFILE, STATS } from '../data/content.js'
import { useTypewriter, scrollToId } from '../lib/hooks.js'
import { Btn } from './ui.jsx'
import Icon from './Icon.jsx'
import PipelineCard from './PipelineCard.jsx'

const SOCIALS = [
  { icon: 'Github', href: PROFILE.links.github, label: 'GitHub' },
  { icon: 'Linkedin', href: PROFILE.links.linkedin, label: 'LinkedIn' },
  { icon: 'Mail', href: `mailto:${PROFILE.email}`, label: 'Email' },
  { icon: 'Whatsapp', href: PROFILE.links.whatsapp, label: 'WhatsApp' },
]

export default function Hero() {
  const typed = useTypewriter(PROFILE.roles)

  return (
    <section id="top" className="relative isolate overflow-hidden">
      <div className="gridwash absolute inset-0 -z-10" aria-hidden="true" />

      <div className="shell pt-12 pb-14 sm:pt-16 sm:pb-20">
        <div className="grid lg:grid-cols-[minmax(0,1.15fr)_minmax(0,.85fr)] gap-10 lg:gap-14 items-center">
          <div className="min-w-0">
            <div className="reveal inline-flex items-center gap-2 rounded-full border border-line bg-card px-3 py-1.5">
              <span className="relative grid place-items-center h-2 w-2">
                <span className="absolute h-2 w-2 rounded-full bg-ok opacity-60 ping" />
                <span className="h-2 w-2 rounded-full bg-ok" />
              </span>
              <span className="mono text-[11px] text-muted">{PROFILE.status}</span>
            </div>

            <h1 className="reveal mt-6 font-display font-extrabold text-[clamp(2.3rem,7vw,4rem)] text-fg">
              {PROFILE.name}
            </h1>

            <p className="reveal mt-3 font-display font-semibold text-[clamp(1.05rem,3.2vw,1.5rem)] min-h-[1.6em]">
              <span className="grad-text">{typed}</span>
              <span className="caret" aria-hidden="true" />
            </p>

            <p className="reveal mt-5 max-w-prose text-[16px] text-muted">{PROFILE.bio}</p>

            <div className="reveal mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-[13.5px] text-subtle">
              <span className="inline-flex items-center gap-1.5">
                <Icon name="MapPin" size={15} />
                {PROFILE.location}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Icon name="Briefcase" size={15} />
                Junior DevOps Engineer @ EOcean
              </span>
            </div>

            <div className="reveal mt-8 flex flex-wrap gap-3">
              <Btn href="#projects" onClick={(e) => scrollToId(e, 'projects')} iconAfter="ArrowRight">
                View Work
              </Btn>
              <Btn href="#contact" onClick={(e) => scrollToId(e, 'contact')} variant="ghost" icon="Send">
                Get in Touch
              </Btn>
              <Btn
                href={PROFILE.links.resume}
                target="_blank"
                rel="noopener noreferrer"
                variant="ghost"
                icon="Download"
              >
                CV
              </Btn>
            </div>

            <div className="reveal mt-7 flex items-center gap-2.5">
              {SOCIALS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  title={social.label}
                  className="grid place-items-center h-10 w-10 rounded-xl border border-line bg-card text-muted hover:text-atext hover:border-line2 hover:-translate-y-0.5 transition-all duration-300"
                >
                  <Icon name={social.icon} size={17} />
                </a>
              ))}
            </div>
          </div>

          <div className="reveal min-w-0">
            <div className="drift">
              <PipelineCard />
            </div>
          </div>
        </div>

        <div className="reveal mt-14 grid grid-cols-2 lg:grid-cols-4 gap-px rounded-2xl overflow-hidden border border-line bg-line">
          {STATS.map((stat) => (
            <div key={stat.label} className="bg-card px-5 py-5 min-w-0">
              <p className="font-display font-bold text-[clamp(1.6rem,4vw,2.1rem)] tnum grad-text">{stat.value}</p>
              <p className="mt-1 text-[13.5px] text-fg">{stat.label}</p>
              <p className="mono text-[10.5px] text-subtle truncate">{stat.note}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
