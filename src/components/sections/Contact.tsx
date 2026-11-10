import { useState, type FormEvent } from 'react'
import { ArrowUpRight, Check, Copy, Send } from 'lucide-react'
import { SiGmail } from 'react-icons/si'
import { BrandIcon } from '../ui/BrandIcon'
import { Reveal } from '../ui/Reveal'
import { contact, sectionIndex, site, socials } from '../../data/portfolio'

export function Contact() {
  const [copied, setCopied] = useState(false)
  const [senderName, setSenderName] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(site.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      /* clipboard write blocked */
    }
  }

  const buildEmailParams = () => {
    const cleanName = senderName.trim()
    const cleanSubject = subject.trim() || 'Portfolio Inquiry — Collaboration'
    const finalSubject = cleanName ? `${cleanSubject} (from ${cleanName})` : cleanSubject
    const finalBody = message.trim()
      ? `${message.trim()}\n\n— ${cleanName || 'Sent from Portfolio'}`
      : `Hi Khairul,\n\nI came across your portfolio and would love to connect.`
    return { finalSubject, finalBody }
  }

  const handleGmailSend = (e: FormEvent) => {
    e.preventDefault()
    const { finalSubject, finalBody } = buildEmailParams()
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
      site.email
    )}&su=${encodeURIComponent(finalSubject)}&body=${encodeURIComponent(finalBody)}`
    window.open(gmailUrl, '_blank', 'noopener,noreferrer')
  }

  const handleMailtoFallback = () => {
    const { finalSubject, finalBody } = buildEmailParams()
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(
      finalSubject
    )}&body=${encodeURIComponent(finalBody)}`
  }

  return (
    <section id="contact" className="section-shell">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
        {/* Left: Big Typographic Invitation + Direct Gmail Send Form */}
        <Reveal className="space-y-6 lg:col-span-7">
          <span className="kicker">[ {sectionIndex('contact')} / INQUIRIES &amp; COLLABORATION ]</span>
          <h2 className="font-display text-5xl font-black uppercase leading-[0.95] tracking-tighter sm:text-7xl md:text-8xl">
            LET&apos;S <br />
            <span className="text-fg">CONNECT.</span>
          </h2>
          <p className="max-w-lg pt-2 text-base font-light leading-relaxed text-muted sm:text-lg">
            {contact.intro}
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a
              href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(site.email)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 font-display text-2xl font-bold text-fg transition-colors hover:text-accent sm:text-3xl"
            >
              <span>{site.email}</span>
              <ArrowUpRight className="h-6 w-6 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </a>

            <button
              type="button"
              onClick={handleCopyEmail}
              aria-label="Copy email address"
              className="inline-flex items-center gap-1.5 rounded-full border border-line bg-card px-3 py-1.5 font-mono text-xs text-muted transition-colors hover:border-fg hover:text-fg"
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>

          {/* Gmail Direct Compose & Send Interface */}
          <form
            onSubmit={handleGmailSend}
            className="mt-6 space-y-4 rounded-2xl border border-line bg-card p-6"
          >
            <div className="flex items-center justify-between border-b border-line pb-3 font-mono text-xs">
              <div className="inline-flex items-center gap-2 font-bold uppercase tracking-wider text-fg">
                <SiGmail className="h-4 w-4" />
                <span>Direct Gmail Send</span>
              </div>
              <span className="text-[11px] text-muted">TO: {site.email}</span>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="contact-sender-name"
                  className="mb-1.5 block font-mono text-[11px] uppercase tracking-wider text-muted"
                >
                  Your Name
                </label>
                <input
                  id="contact-sender-name"
                  type="text"
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  placeholder="e.g. Alex Rivera"
                  className="w-full rounded-xl border border-line bg-bg px-3.5 py-2.5 font-sans text-sm text-fg placeholder:text-muted/60 focus:border-fg focus:outline-none"
                />
              </div>

              <div>
                <label
                  htmlFor="contact-subject"
                  className="mb-1.5 block font-mono text-[11px] uppercase tracking-wider text-muted"
                >
                  Subject
                </label>
                <input
                  id="contact-subject"
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Project / Role / Collaboration"
                  className="w-full rounded-xl border border-line bg-bg px-3.5 py-2.5 font-sans text-sm text-fg placeholder:text-muted/60 focus:border-fg focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="contact-message"
                className="mb-1.5 block font-mono text-[11px] uppercase tracking-wider text-muted"
              >
                Message
              </label>
              <textarea
                id="contact-message"
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write a quick message and launch directly in Gmail..."
                className="w-full resize-none rounded-xl border border-line bg-bg px-3.5 py-2.5 font-sans text-sm text-fg placeholder:text-muted/60 focus:border-fg focus:outline-none"
              />
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                type="submit"
                className="inline-flex flex-1 items-center justify-center gap-2.5 rounded-xl bg-fg px-5 py-3 font-mono text-xs font-bold uppercase tracking-wider text-bg transition-opacity hover:opacity-90"
              >
                <SiGmail className="h-4 w-4" />
                <span>Send via Gmail</span>
                <Send className="h-3.5 w-3.5" />
              </button>

              <button
                type="button"
                onClick={handleMailtoFallback}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-line px-4 py-3 font-mono text-xs uppercase tracking-wider text-muted transition-colors hover:border-fg hover:text-fg"
              >
                <span>Mail App</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </form>
        </Reveal>

        {/* Right: Direct Channels Cards */}
        <Reveal delay={0.15} className="flex flex-col justify-between space-y-4 font-mono lg:col-span-5">
          <span className="mb-2 text-xs uppercase tracking-wider text-muted">DIRECT CHANNELS</span>

          {socials.map((s) => (
            <a
              key={s.key}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between rounded-2xl border border-line bg-card p-5 transition-all hover:border-fg"
            >
              <div className="flex items-center gap-3">
                <BrandIcon
                  name={s.key}
                  className="h-5 w-5 text-muted transition-colors group-hover:text-fg"
                />
                <span className="font-display text-base font-bold text-fg">{s.label.toUpperCase()}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted transition-colors group-hover:text-fg">
                <span>{s.handle}</span>
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </a>
          ))}

          {/* Availability Status Card */}
          <div className="mt-4 flex items-center justify-between rounded-2xl border border-line bg-card p-4 text-xs text-muted">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              <span>{contact.availability}</span>
            </div>
            <span>{contact.availabilityWindow}</span>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

