import { useState } from 'react'
import { ArrowUpRight, Check, Copy } from 'lucide-react'
import { BrandIcon } from '../ui/BrandIcon'
import { Reveal } from '../ui/Reveal'
import { contact, sectionIndex, site, socials } from '../../data/portfolio'

export function Contact() {
  const [copied, setCopied] = useState(false)

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(site.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      /* clipboard write blocked */
    }
  }

  return (
    <section id="contact" className="section-shell">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
        {/* Left: Big Typographic Invitation */}
        <Reveal className="space-y-6 lg:col-span-7">
          <span className="kicker">[ {sectionIndex('contact')} / INQUIRIES &amp; COLLABORATION ]</span>
          <h2 className="font-display text-5xl font-black uppercase leading-[0.95] tracking-tighter sm:text-7xl md:text-8xl">
            LET&apos;S <br />
            <span className="text-fg">CONNECT.</span>
          </h2>
          <p className="max-w-lg pt-2 text-base font-light leading-relaxed text-muted sm:text-lg">
            {contact.intro}
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-6">
            <a
              href={`mailto:${site.email}`}
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
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
              <span>{contact.availability}</span>
            </div>
            <span>{contact.availabilityWindow}</span>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

