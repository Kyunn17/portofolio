import { ArrowDownRight, ChevronDown, Compass, Mail, Terminal } from 'lucide-react'
import { SiSpotify } from 'react-icons/si'
import { BrandIcon } from '../ui/BrandIcon'
import { Reveal } from '../ui/Reveal'
import {
  hero,
  site,
  socials,
  SPOTIFY_PLAYLIST_EMBED_URL,
  spotifySection,
} from '../../data/portfolio'

export function Hero() {
  return (
    <section
      id="hero"
      className="relative mx-auto flex min-h-screen max-w-7xl flex-col justify-between border-b border-line px-4 pt-24 pb-12 sm:px-6 sm:pt-32 sm:pb-16"
    >
      {/* Top meta strip */}
      <div className="mb-6 flex flex-col items-start justify-between gap-3 font-mono text-xs uppercase tracking-widest text-muted sm:mb-8 sm:flex-row sm:items-center sm:gap-4">
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <span className="rounded border border-line bg-card px-2 py-0.5">{hero.edition}</span>
          <span>{hero.location}</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5">
            <Compass className="h-3.5 w-3.5 shrink-0" /> {hero.coordinates}
          </span>
          <span className="hidden sm:inline">{hero.discipline}</span>
        </div>
      </div>

      {/* Main Hero Grid: Left (Headline, Intro & Actions) / Right (On Repeat Spotify Embed) */}
      <div className="my-auto grid grid-cols-1 items-center gap-10 py-6 lg:grid-cols-12 lg:gap-12">
        {/* Left Column: Headline, Tagline, Intro, CTAs & Socials (7 cols) */}
        <div className="space-y-6 lg:col-span-7">
          <div>
            <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.25em] text-accent sm:mb-3 sm:text-xs">
              {hero.kicker}
            </p>
            <h1 className="font-display text-4xl font-black leading-[0.95] tracking-tighter uppercase sm:text-6xl sm:leading-[0.93] md:text-7xl lg:text-[4.5rem] xl:text-[5.25rem]">
              Hi, I&apos;m <br />
              <span className="text-fg">{site.name}.</span>
            </h1>
          </div>

          <div className="space-y-3">
            <h2 className="font-display text-lg font-medium leading-tight tracking-tight text-fg sm:text-2xl md:text-3xl">
              {hero.tagline.toUpperCase()}
            </h2>
            <p className="max-w-xl text-sm font-light leading-relaxed text-muted sm:text-base">
              {hero.intro}
            </p>
          </div>

          {/* CTAs & Social Strip */}
          <div className="flex flex-col gap-5 pt-2 sm:flex-row sm: flex-wrap sm:items-center sm:justify-between">
            <div className="flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:items-center">
              <a
                href="#projects"
                className="group flex items-center justify-center gap-2 rounded-full bg-fg px-6 py-3 text-center font-mono text-xs font-bold uppercase tracking-wider text-bg shadow-md transition-all hover:scale-[1.03]"
              >
                <span>Explore My Work</span>
                <ArrowDownRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
              </a>
              <a
                href="#contact"
                className="flex items-center justify-center rounded-full border border-line px-6 py-3 text-center font-mono text-xs uppercase tracking-wider text-fg transition-all hover:border-fg hover:bg-card"
              >
                Get In Touch
              </a>
            </div>

            <div className="flex flex-wrap items-center gap-4 font-mono text-sm text-muted sm:gap-5">
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

        {/* Right Column: Personal Soundtrack / Spotify Embed (5 cols) */}
        <Reveal delay={0.1} className="w-full lg:col-span-5">
          <div className="w-full rounded-2xl border border-line bg-card p-4 shadow-xl sm:p-5">
            <div className="flex items-center justify-between border-b border-line pb-2.5 font-mono text-[11px] uppercase tracking-widest text-muted">
              <span>{spotifySection.label}</span>
              <SiSpotify className="h-4 w-4 text-fg" aria-hidden="true" />
            </div>

            <div className="mt-3 mb-3.5 flex flex-col justify-between gap-1 sm:flex-row sm:items-baseline">
              <h3 className="font-display text-lg font-extrabold uppercase tracking-tight text-fg sm:text-xl">
                {spotifySection.title}
              </h3>
              <p className="text-xs font-light text-muted">
                {spotifySection.subtitle}
              </p>
            </div>

            <iframe
              src={SPOTIFY_PLAYLIST_EMBED_URL}
              width="100%"
              height={352}
              title="On Repeat — Khairul Faridz Personal Spotify Playlist"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              className="block w-full rounded-xl border-0"
              style={{ borderRadius: '12px' }}
            />
          </div>
        </Reveal>
      </div>

      {/* Bottom ticker & scroll indicator */}
      <div className="mt-6 flex flex-col items-center justify-between gap-4 border-t border-line pt-6 font-mono text-xs text-muted sm:flex-row sm:pt-8">
        <div className="flex flex-wrap items-center justify-center gap-3 overflow-hidden text-center sm:justify-start sm:gap-6 sm:text-left">
          <span className="flex items-center gap-2">
            <Terminal className="h-3.5 w-3.5 shrink-0" /> {hero.ticker}
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
