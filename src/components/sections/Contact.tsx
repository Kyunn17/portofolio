import { useState, type FormEvent } from 'react'
import { ArrowUpRight, Check, Copy, Send, Sparkles } from 'lucide-react'
import { motion } from 'motion/react'
import { SiGmail } from 'react-icons/si'
import { BrandIcon } from '../ui/BrandIcon'
import { Reveal } from '../ui/Reveal'
import { contact, sectionIndex, site, socials } from '../../data/portfolio'

const INTENT_PRESETS = [
  {
    label: '🚀 Project Collaboration',
    subject: 'Project Inquiry — Web / Engineering Collaboration',
    body: `Hi Khairul,\n\nI’d love to discuss an upcoming project collaboration with you. Here are a few details:\n\n• Project Scope:\n• Timeline:\n• Tech Stack:`,
  },
  {
    label: '💼 Role / Hiring',
    subject: 'Career Opportunity — Software Engineering Role',
    body: `Hi Khairul,\n\nWe were impressed by your engineering portfolio and would love to explore an opportunity with our team.`,
  },
  {
    label: '☕ Tech Coffee Chat',
    subject: 'Quick Tech Chat — Engineering & Design',
    body: `Hi Khairul,\n\nJust wanted to say hi and connect regarding software engineering and tech stacks!`,
  },
]

export function Contact() {
  const [copied, setCopied] = useState(false)
  const [senderName, setSenderName] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [activePreset, setActivePreset] = useState<string | null>(null)

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(site.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      /* clipboard write blocked */
    }
  }

  const handleApplyPreset = (preset: (typeof INTENT_PRESETS)[number]) => {
    setActivePreset(preset.label)
    setSubject(preset.subject)
    setMessage(preset.body)
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
        {/* Left: Big Typographic Invitation + Dynamic Gmail Send Form */}
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

            <motion.button
              type="button"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleCopyEmail}
              aria-label="Copy email address"
              className="inline-flex items-center gap-1.5 rounded-full border border-line bg-card px-3.5 py-1.5 font-mono text-xs text-muted shadow-xs transition-colors hover:border-fg hover:text-fg"
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
            </motion.button>
          </div>

          {/* Dynamic Gmail Direct Compose & Send Interface */}
          <form
            onSubmit={handleGmailSend}
            className="mt-6 space-y-4 rounded-3xl border border-line bg-card p-6 shadow-xl"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line pb-3.5 font-mono text-xs">
              <div className="inline-flex items-center gap-2 font-bold uppercase tracking-wider text-fg">
                <SiGmail className="h-4 w-4 text-red-500" />
                <span>Direct Gmail Send</span>
              </div>
              <div className="flex items-center gap-2 text-[11px] text-muted">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                <span>ONLINE // TO: {site.email}</span>
              </div>
            </div>

            {/* Quick Intent Chips */}
            <div className="space-y-1.5">
              <span className="block font-mono text-[11px] uppercase tracking-wider text-muted">
                QUICK INTENT // CLICK TO AUTOFILL
              </span>
              <div className="flex flex-wrap gap-2">
                {INTENT_PRESETS.map((preset) => {
                  const isSelected = activePreset === preset.label
                  return (
                    <button
                      key={preset.label}
                      type="button"
                      onClick={() => handleApplyPreset(preset)}
                      className={`inline-flex items-center gap-1.5 rounded-xl border px-3 py-1.5 font-mono text-[11px] transition-all duration-200 ${
                        isSelected
                          ? 'border-fg bg-fg font-semibold text-bg shadow-sm'
                          : 'border-line bg-bg/60 text-muted hover:border-fg hover:text-fg'
                      }`}
                    >
                      <span>{preset.label}</span>
                    </button>
                  )
                })}
              </div>
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
                  className="w-full rounded-xl border border-line bg-bg px-3.5 py-2.5 font-sans text-sm text-fg placeholder:text-muted/60 transition-colors focus:border-fg focus:outline-none"
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
                  onChange={(e) => {
                    setSubject(e.target.value)
                    setActivePreset(null)
                  }}
                  placeholder="Project / Role / Collaboration"
                  className="w-full rounded-xl border border-line bg-bg px-3.5 py-2.5 font-sans text-sm text-fg placeholder:text-muted/60 transition-colors focus:border-fg focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="contact-message"
                className="mb-1.5 block font-mono text-[11px] uppercase tracking-wider text-muted"
              >
                Message Body
              </label>
              <textarea
                id="contact-message"
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write your note or use a quick intent chip above..."
                className="w-full resize-none rounded-xl border border-line bg-bg px-3.5 py-2.5 font-sans text-sm text-fg placeholder:text-muted/60 transition-colors focus:border-fg focus:outline-none"
              />
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex flex-1 items-center justify-center gap-2.5 rounded-xl bg-fg px-5 py-3 font-mono text-xs font-bold uppercase tracking-wider text-bg shadow-sm transition-opacity hover:opacity-95"
              >
                <SiGmail className="h-4 w-4 text-red-500" />
                <span>Open in Gmail</span>
                <Send className="h-3.5 w-3.5" />
              </motion.button>

              <motion.button
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleMailtoFallback}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-line bg-card px-4 py-3 font-mono text-xs uppercase tracking-wider text-muted transition-colors hover:border-fg hover:text-fg"
              >
                <span>Default Mail App</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </motion.button>
            </div>
          </form>
        </Reveal>

        {/* Right: Direct Channels Cards */}
        <Reveal delay={0.15} className="flex flex-col justify-between space-y-4 font-mono lg:col-span-5">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-wider text-muted">DIRECT CHANNELS</span>
            <span className="inline-flex items-center gap-1.5 text-[11px] text-accent">
              <Sparkles className="h-3 w-3" />
              <span>ACTIVE SOCIALS</span>
            </span>
          </div>

          {socials.map((s) => (
            <motion.a
              key={s.key}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ x: 4 }}
              className="group flex items-center justify-between rounded-2xl border border-line bg-card p-5 shadow-xs transition-all hover:border-fg hover:shadow-md"
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
            </motion.a>
          ))}

          {/* Availability Status Card */}
          <div className="mt-4 flex items-center justify-between rounded-2xl border border-line bg-card p-4 text-xs text-muted shadow-xs">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-bold text-fg">{contact.availability}</span>
            </div>
            <span>{contact.availabilityWindow}</span>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

