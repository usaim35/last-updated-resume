import { useState, useEffect } from 'react'
import { PIPELINE } from '../data/content.js'
import { prefersReduced } from '../lib/hooks.js'
import Icon from './Icon.jsx'

/**
 * The hero's release pipeline.
 *
 * It idles on the finished state, runs through the stages, pauses on green,
 * then starts again — the extra ticks in the modulo are that pause. With
 * reduced motion it simply sits on the completed run.
 */
export default function PipelineCard() {
  const reduced = prefersReduced()
  const [tick, setTick] = useState(0)

  useEffect(() => {
    if (reduced) return
    // Two ticks past the last stage: the pause on green before it loops.
    const id = setInterval(() => setTick((t) => (t + 1) % (PIPELINE.length + 2)), 1250)
    return () => clearInterval(id)
  }, [reduced])

  const stage = reduced ? PIPELINE.length - 1 : Math.min(tick, PIPELINE.length - 1)
  const pct = ((stage + 1) / PIPELINE.length) * 100
  const done = stage === PIPELINE.length - 1

  return (
    <div className="card glow relative overflow-hidden p-5 sm:p-6 shadow-[var(--shadow)]">
      <div className="absolute inset-x-0 top-0 h-px grad-bg opacity-70" />

      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 min-w-0">
          <span className="grid place-items-center h-8 w-8 rounded-lg bg-soft border border-line text-atext shrink-0">
            <Icon name="GitBranch" size={16} />
          </span>
          <div className="min-w-0">
            <p className="mono text-[11.5px] text-fg truncate">pipeline · main</p>
            <p className="mono text-[10.5px] text-subtle truncate">eocean / production</p>
          </div>
        </div>
        <span className="mono text-[10.5px] px-2 py-1 rounded-md border border-line bg-soft text-ok whitespace-nowrap">
          {done ? 'passing' : 'running'}
        </span>
      </div>

      <div className="mt-5 h-1.5 w-full rounded-full bg-soft border border-line overflow-hidden">
        <div className="h-full grad-bg transition-[width] duration-500 ease-out" style={{ width: `${pct}%` }} />
      </div>

      <ol className="mt-5 grid grid-cols-5 gap-1.5">
        {PIPELINE.map((step, i) => {
          const complete = i < stage
          const current = i === stage

          return (
            <li key={step.label} className="flex flex-col items-center gap-2 min-w-0">
              <span
                className={`grid place-items-center h-9 w-9 rounded-xl border transition-all duration-300 ${
                  complete
                    ? 'border-transparent grad-bg text-white'
                    : current
                      ? 'border-transparent grad-bg text-white ping'
                      : 'border-line bg-soft text-subtle'
                }`}
              >
                <Icon name={complete ? 'Check' : step.icon} size={15} />
              </span>
              <span
                className={`mono text-[9.5px] text-center truncate w-full ${
                  current || complete ? 'text-fg' : 'text-subtle'
                }`}
              >
                {step.label}
              </span>
            </li>
          )
        })}
      </ol>

      <div className="mt-5 rounded-xl border border-line bg-soft p-3 h-[112px] overflow-hidden">
        {PIPELINE.map((step, i) => (
          <p
            key={step.label}
            className={`mono text-[10.5px] leading-[1.9] truncate transition-opacity duration-300 ${
              i < stage ? 'text-subtle opacity-100' : i === stage ? 'text-fg opacity-100' : 'opacity-0'
            }`}
          >
            {step.log}
          </p>
        ))}
      </div>
    </div>
  )
}
