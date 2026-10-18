import Icon from './Icon.jsx'

/** Numbered section heading: mono eyebrow, display title, optional lede. */
export function SectionHead({ index, eyebrow, title, lede }) {
  return (
    <div className="reveal max-w-prose">
      <div className="flex items-center gap-3">
        <span className="mono text-[11.5px] tracking-[.16em] uppercase text-atext">{index}</span>
        <span className="h-px w-8 bg-line2" />
        <span className="eyebrow">{eyebrow}</span>
      </div>
      <h2 className="mt-4 font-display text-[clamp(1.75rem,4.2vw,2.6rem)] font-bold text-fg">{title}</h2>
      {lede && <p className="mt-3 text-muted text-[15.5px]">{lede}</p>}
    </div>
  )
}

/** Small monospace technology tag. */
export function Tag({ children }) {
  return (
    <span className="mono text-[11px] px-2.5 py-1 rounded-md border border-line bg-soft text-muted whitespace-nowrap">
      {children}
    </span>
  )
}

/**
 * Button / link.
 * `as="button"` renders a real button (use it for form submits); anything
 * else renders an <a>. `icon` sits before the label, `iconAfter` after it
 * and slides right on hover.
 */
export function Btn({ as: Comp = 'a', variant = 'solid', icon, iconAfter, children, className = '', ...rest }) {
  const base =
    'group inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-[14.5px] font-medium transition-all duration-300 select-none cursor-pointer'

  const styles = {
    solid:
      'grad-bg text-white shadow-[0_8px_24px_-10px_var(--glow)] hover:shadow-[0_14px_32px_-10px_var(--glow)] hover:-translate-y-0.5 active:translate-y-0',
    ghost: 'border border-line bg-card text-fg hover:border-line2 hover:-translate-y-0.5 active:translate-y-0',
    quiet: 'text-muted hover:text-fg',
  }

  return (
    <Comp className={`${base} ${styles[variant]} ${className}`} {...rest}>
      {icon && <Icon name={icon} size={17} />}
      <span>{children}</span>
      {iconAfter && (
        <Icon name={iconAfter} size={17} className="transition-transform duration-300 group-hover:translate-x-1" />
      )}
    </Comp>
  )
}
