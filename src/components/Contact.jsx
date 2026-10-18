import { useState } from 'react'
import { PROFILE } from '../data/content.js'
import { useCopy, spotlight } from '../lib/hooks.js'
import { SectionHead, Btn } from './ui.jsx'
import Icon from './Icon.jsx'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

/** Returns an object of field → message; empty means the form is valid. */
function validate(values) {
  const errors = {}

  if (!values.name.trim()) errors.name = 'Tell me who you are.'
  else if (values.name.trim().length < 2) errors.name = 'That looks a little short.'

  if (!values.email.trim()) errors.email = 'I need an address to reply to.'
  else if (!EMAIL_RE.test(values.email.trim())) errors.email = 'Check the address — it looks incomplete.'

  if (!values.message.trim()) errors.message = 'Add a line about what you need.'
  else if (values.message.trim().length < 12) errors.message = 'A little more detail helps me answer properly.'

  return errors
}

function Field({ id, label, type = 'text', rows, value, error, touched, onChange, onBlur, placeholder }) {
  const invalid = Boolean(touched && error)
  const valid = Boolean(touched && !error && value.trim())

  const className = `w-full rounded-xl border bg-card px-4 py-3 text-[14.5px] outline-none transition-all duration-200 ${
    invalid ? 'border-bad bg-bad-soft' : valid ? 'border-ok' : 'border-line focus:border-accent'
  } focus:shadow-[0_0_0_3px_var(--ring)]`

  return (
    <div className="min-w-0">
      <label htmlFor={id} className="flex items-center justify-between mb-1.5">
        <span className="mono text-[11px] uppercase tracking-wider text-subtle">{label}</span>
        {invalid && (
          <span className="inline-flex items-center gap-1 text-[11.5px] text-bad">
            <Icon name="CircleAlert" size={12} /> {error}
          </span>
        )}
        {valid && <Icon name="Check" size={13} className="text-ok" />}
      </label>

      {rows ? (
        <textarea
          id={id}
          name={id}
          rows={rows}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          className={className}
          aria-invalid={invalid}
        />
      ) : (
        <input
          id={id}
          name={id}
          type={type}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          className={className}
          aria-invalid={invalid}
        />
      )}
    </div>
  )
}

const EMPTY = { name: '', email: '', subject: '', message: '' }

const QUICK = [
  { icon: 'Mail', label: 'Email', value: PROFILE.email, href: `mailto:${PROFILE.email}`, copyable: true },
  { icon: 'Whatsapp', label: 'WhatsApp', value: PROFILE.phone, href: PROFILE.links.whatsapp, copyable: true },
  { icon: 'Linkedin', label: 'LinkedIn', value: 'muhammad-usaim', href: PROFILE.links.linkedin },
  { icon: 'Github', label: 'GitHub', value: 'usaim35', href: PROFILE.links.github },
]

export default function Contact() {
  const [values, setValues] = useState(EMPTY)
  const [touched, setTouched] = useState({})
  const [prepared, setPrepared] = useState(false)
  const [copied, copy] = useCopy()

  const errors = validate(values)
  const isValid = Object.keys(errors).length === 0

  const change = (e) => setValues((v) => ({ ...v, [e.target.name]: e.target.value }))
  const blur = (e) => setTouched((t) => ({ ...t, [e.target.name]: true }))

  const subject = values.subject.trim() || 'Project enquiry'
  const body = `${values.message.trim()}\n\n— ${values.name.trim()} (${values.email.trim()})`
  const draft = `Subject: ${subject}\n\n${body}`

  /**
   * There is no backend here, so nothing claims to have "sent" anything.
   * Instead the filled-in form hands off to a channel that really does send:
   * the visitor's own mail client, or WhatsApp, both pre-composed. Copying
   * the raw draft stays as the fallback for anyone with neither.
   *
   * Swap `submit` for a fetch to Formspree/EmailJS/your own endpoint if you
   * would rather it post directly.
   */
  const mailto = `mailto:${PROFILE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  const whatsapp = `${PROFILE.links.whatsapp}?text=${encodeURIComponent(`*${subject}*\n\n${body}`)}`

  const submit = (e) => {
    e.preventDefault()
    setTouched({ name: true, email: true, subject: true, message: true })
    if (isValid) setPrepared(true)
  }

  const reset = () => {
    setPrepared(false)
    setValues(EMPTY)
    setTouched({})
  }

  return (
    <section id="contact" className="scroll-mt-24 py-16 sm:py-24 border-t border-line bg-soft">
      <div className="shell">
        <SectionHead
          index="04"
          eyebrow="Contact"
          title="Let's talk about the work"
          lede="Full-time, contract or freelance. WhatsApp gets the quickest answer; email is better for anything detailed."
        />

        <div className="mt-12 grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] gap-6">
          {/* Quick connect */}
          <div className="reveal flex flex-col gap-4 min-w-0">
            {QUICK.map((item) => (
              <div key={item.label} onMouseMove={spotlight} className="card glow spot p-4 flex items-center gap-3 min-w-0">
                <span className="grid place-items-center h-10 w-10 rounded-xl bg-soft border border-line text-atext shrink-0">
                  <Icon name={item.icon} size={17} />
                </span>

                <div className="min-w-0 flex-1">
                  <p className="mono text-[10.5px] uppercase tracking-wider text-subtle">{item.label}</p>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-[14px] text-fg hover:text-atext transition-colors truncate"
                  >
                    {item.value}
                  </a>
                </div>

                {item.copyable && (
                  <button
                    type="button"
                    onClick={() => copy(item.value, item.label)}
                    aria-label={`Copy ${item.label}`}
                    className="grid place-items-center h-9 w-9 rounded-lg border border-line text-subtle hover:text-fg hover:border-line2 transition-colors shrink-0 cursor-pointer"
                  >
                    <Icon
                      name={copied === item.label ? 'Check' : 'Copy'}
                      size={15}
                      className={copied === item.label ? 'text-ok' : ''}
                    />
                  </button>
                )}
              </div>
            ))}

            <div className="card p-4 flex items-start gap-3 min-w-0">
              <span className="text-atext mt-0.5 shrink-0">
                <Icon name="Globe" size={17} />
              </span>
              <p className="text-[13.5px] text-muted min-w-0">
                Based in {PROFILE.location} (UTC+5), working remotely with international clients. Open to
                relocation — ask.
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="reveal card p-5 sm:p-7 min-w-0">
            {prepared ? (
              <div className="flex flex-col items-start gap-4">
                <span className="grid place-items-center h-12 w-12 rounded-2xl grad-bg text-white">
                  <Icon name="Check" size={22} />
                </span>

                <div>
                  <h3 className="font-display font-semibold text-[19px] text-fg">Your message is ready</h3>
                  <p className="mt-2 text-[14.5px] text-muted max-w-prose">
                    Pick how to send it — both buttons open with everything already filled in. Or copy the
                    draft and send it yourself to{' '}
                    <span className="mono text-fg select-all">{PROFILE.email}</span>.
                  </p>
                </div>

                <pre className="w-full overflow-x-auto rounded-xl border border-line bg-soft p-4 mono text-[12px] text-muted whitespace-pre-wrap">
                  {draft}
                </pre>

                <div className="flex flex-wrap gap-3 w-full">
                  <Btn href={mailto} icon="Mail" className="flex-1 sm:flex-none">
                    Send by email
                  </Btn>
                  <Btn
                    href={whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="ghost"
                    icon="Whatsapp"
                    className="flex-1 sm:flex-none"
                  >
                    Send on WhatsApp
                  </Btn>
                </div>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 pt-1">
                  <button
                    type="button"
                    onClick={() => copy(draft, 'draft')}
                    className="inline-flex items-center gap-1.5 text-[13px] text-muted hover:text-fg transition-colors cursor-pointer"
                  >
                    <Icon
                      name={copied === 'draft' ? 'Check' : 'Copy'}
                      size={14}
                      className={copied === 'draft' ? 'text-ok' : ''}
                    />
                    {copied === 'draft' ? 'Copied to clipboard' : 'Copy the draft instead'}
                  </button>
                  <button
                    type="button"
                    onClick={reset}
                    className="inline-flex items-center gap-1.5 text-[13px] text-muted hover:text-fg transition-colors cursor-pointer"
                  >
                    <Icon name="ArrowRight" size={14} />
                    Write another
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={submit} noValidate className="flex flex-col gap-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field
                    id="name"
                    label="Name"
                    placeholder="Your name"
                    value={values.name}
                    error={errors.name}
                    touched={touched.name}
                    onChange={change}
                    onBlur={blur}
                  />
                  <Field
                    id="email"
                    label="Email"
                    type="email"
                    placeholder="you@company.com"
                    value={values.email}
                    error={errors.email}
                    touched={touched.email}
                    onChange={change}
                    onBlur={blur}
                  />
                </div>

                <Field
                  id="subject"
                  label="Subject (optional)"
                  placeholder="Backend role · automation project · freelance"
                  value={values.subject}
                  error={null}
                  touched={false}
                  onChange={change}
                  onBlur={blur}
                />

                <Field
                  id="message"
                  label="Message"
                  rows={6}
                  placeholder="What are you building, and where does it hurt?"
                  value={values.message}
                  error={errors.message}
                  touched={touched.message}
                  onChange={change}
                  onBlur={blur}
                />

                <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                  <p className="mono text-[11px] text-subtle">Replies usually within a day</p>
                  <Btn as="button" type="submit" iconAfter="ArrowRight" icon="Send" className="w-full sm:w-auto">
                    Review &amp; send
                  </Btn>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
