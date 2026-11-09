import { ArrowDownRight, ChevronDown, Compass, Mail, Terminal } from 'lucide-react'
import { BrandIcon } from '../ui/BrandIcon'
import { hero, site, socials } from '../../data/portfolio'

export function Hero() {
  return (
    <section
      id="hero"
      className="relative mx-auto flex min-h-screen max-w-7xl flex-col justify-between border-b border-line px-6 pt-32 pb-20"
    >
      {/* Top meta strip */}
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4 font-mono text-xs uppercase tracking-widest text-muted">
        <div className="flex items-center gap-3">
          <span className="rounded border border-line bg-card px-2 py-0.5">{hero.edition}</span>
          <span>{hero.location}</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5">
            <Compass className="h-3.5 w-3.5" /> {hero.coordinates}
          </span>
          <span className="hidden sm:inline">{hero.discipline}</span>
        </div>
      </div>

      {/* Main headline block */}
      <div className="my-auto py-8">
        <div className="mb-2 overflow-hidden">
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.3em] text-accent md:text-sm">{hero.kicker}</p>
        </div>

        <h1 className="mb-6 font-display text-5xl font-black leading-[0.92] tracking-tighter uppercase sm:text-7xl md:text-8xl lg:text-9xl">
          Hi, I&apos;m <br />
          <span className="text-fg">
            {site.name}.
          </span>
        </h1>

        <div className="mt-8 grid grid-cols-1 items-end gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h2 className="mb-4 font-display text-2xl font-medium leading-tight tracking-tight text-fg sm:text-3xl md:text-4xl">
              {hero.tagline.toUpperCase()}
            </h2>
            <p className="max-w-2xl text-base font-light leading-relaxed text-muted sm:text-lg">{hero.intro}</p>
          </div>

          <div className="flex flex-col justify-between gap-4 sm:flex-row lg:col-span-5 lg:flex-col lg:items-end">
            {/* CTAs */}
            <div className="flex items-center gap-4">
              <a
                href="#projects"
                className="group flex items-center gap-2 rounded-full bg-fg px-7 py-3.5 font-mono text-xs font-bold uppercase tracking-wider text-bg shadow-md transition-all hover:scale-[1.03]"
              >
                <span>Explore My Work</span>
                <ArrowDownRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
              </a>
              <a
                href="#contact"
                className="rounded-full border border-line px-7 py-3.5 font-mono text-xs uppercase tracking-wider text-fg transition-all hover:border-fg hover:bg-card"
              >
                Get In Touch
              </a>
            </div>

            {/* Social strip */}
            <div className="flex items-center gap-5 pt-4 font-mono text-sm text-muted">
              {socials.map((s) => (
                <a
                  key={s.key}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 transition-colors hover:text-fg"
                  aria-label={s.label}
                >
                  <BrandIcon name={s.key} className="h-4 w-4" />
                  <span className="text-xs">{s.short}</span>
                </a>
              ))}
              <a
                href={`mailto:${site.email}`}
                className="flex items-center gap-1.5 transition-colors hover:text-fg"
                aria-label="Email"
              >
                <Mail className="h-4 w-4" />
                <span className="text-xs">EMAIL</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom ticker & scroll indicator */}
      <div className="flex flex-col items-center justify-between gap-4 border-t border-line pt-8 font-mono text-xs text-muted sm:flex-row">
        <div className="flex items-center gap-6 overflow-hidden">
          <span className="flex items-center gap-2">
            <Terminal className="h-3.5 w-3.5" /> {hero.ticker}
          </span>
          <span className="hidden md:inline">•</span>
          <span className="hidden md:inline uppercase">{hero.style}</span>
        </div>
        <a href="#about" className="group flex items-center gap-2 transition-colors hover:text-fg">
          <span>SCROLL DOWN</span>
          <ChevronDown className="h-3.5 w-3.5 transition-transform group-hover:translate-y-0.5" />
        </a>
      </div>
    </section>
  )
}
