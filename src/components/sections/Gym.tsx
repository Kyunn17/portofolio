import { useRef, useState } from 'react'
import { Dumbbell } from 'lucide-react'
import { Reveal } from '../ui/Reveal'
import { SectionHeader } from '../ui/SectionHeader'
import { gym, sectionIndex } from '../../data/portfolio'

export function Gym() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [lensPos, setLensPos] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)
  const [isFullyRevealed, setIsFullyRevealed] = useState(false)

  const lensRadius = 96 // 192px / 2 = 96px radius

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isFullyRevealed || !containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    setLensPos({ x, y })
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    if (!isFullyRevealed) {
      setIsHovered(false)
    }
  }

  const handleClick = () => {
    setIsFullyRevealed((prev) => !prev)
  }

  const clipPathStyle = isFullyRevealed
    ? 'circle(150% at 50% 50%)'
    : isHovered
      ? `circle(${lensRadius}px at ${lensPos.x}px ${lensPos.y}px)`
      : 'circle(0px at 50% 50%)'

  return (
    <section id="gym" className="section-shell">
      <SectionHeader
        index={sectionIndex('gym')}
        kicker="DISCIPLINE &amp; FORM"
        title="BEYOND THE CODE."
        aside={
          <div>
            <span className="block font-display text-sm font-semibold text-accent">{gym.quote}</span>
            <span className="text-[11px] text-muted">Interactive circular glass lens reveal.</span>
          </div>
        }
      />

      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
        {/* Interactive Lens Frame (Col 1-7) */}
        <Reveal className="flex flex-col items-center lg:col-span-7">
          <div className="relative w-full max-w-md">
            {/* Framing Card */}
            <div
              ref={containerRef}
              role="button"
              tabIndex={0}
              aria-label="Toggle full conditioning photograph reveal"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              onClick={handleClick}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  handleClick()
                }
              }}
              className="group relative aspect-[4/5] w-full cursor-pointer select-none overflow-hidden rounded-3xl border border-line bg-card shadow-2xl focus:outline-none focus:ring-2 focus:ring-fg md:cursor-none"
            >
              {/* Base Image (White shirt attire) */}
              <img
                src={gym.baseImage}
                alt="Khairul Faridz - Developer Daily Attire"
                className="h-full w-full select-none object-cover"
                loading="lazy"
              />

              {/* Reveal Layer (Masked by circular lens or full reveal) */}
              <div
                className="pointer-events-none absolute inset-0 transition-[clip-path] duration-150 ease-out"
                style={{
                  clipPath: clipPathStyle,
                  WebkitClipPath: clipPathStyle,
                }}
              >
                <img
                  src={gym.revealImage}
                  alt="Khairul Faridz - Athletic Conditioning"
                  className="h-full w-full select-none object-cover"
                  loading="lazy"
                />
              </div>

              {/* Circular glass lens indicator & border (desktop only, follows cursor) */}
              <div
                className={`pointer-events-none absolute hidden h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white/60 shadow-[0_0_35px_rgba(255,255,255,0.25)] backdrop-blur-[1px] transition-opacity duration-200 md:block ${
                  isHovered && !isFullyRevealed ? 'opacity-100' : 'opacity-0'
                }`}
                style={{
                  left: `${lensPos.x}px`,
                  top: `${lensPos.y}px`,
                }}
              >
                {/* Reflection accent */}
                <div className="pointer-events-none absolute inset-2 rounded-full border border-white/20" />
                <div className="absolute top-3 left-4 rounded-full border border-white/10 bg-black/50 px-2 py-0.5 font-mono text-[9px] uppercase tracking-widest text-white/80">
                  FORM REVEAL
                </div>
              </div>

              {/* Status Badge */}
              <div className="absolute top-4 left-4 flex items-center gap-2 rounded-full border border-line bg-bg/90 px-3 py-1 font-mono text-[10px] tracking-wider uppercase text-muted backdrop-blur-md">
                <span className="h-2 w-2 animate-ping rounded-full bg-emerald-500" />
                <span>
                  {isFullyRevealed ? 'FULL REVEAL ACTIVE (CLICK TO RESET)' : 'HOVER / CLICK TO REVEAL'}
                </span>
              </div>
            </div>

            {/* Mobile Controls (Touch-friendly fallback) */}
            <div className="mt-4 flex w-full items-center justify-between gap-3 md:hidden">
              <button
                type="button"
                onClick={() => setIsFullyRevealed(true)}
                className="flex-1 rounded-xl bg-fg py-3 px-4 text-center font-mono text-xs font-bold uppercase tracking-wider text-bg transition-opacity hover:opacity-90"
              >
                Reveal Form
              </button>
              <button
                type="button"
                onClick={() => setIsFullyRevealed(false)}
                className="rounded-xl border border-line py-3 px-5 text-center font-mono text-xs uppercase tracking-wider text-muted transition-colors hover:text-fg"
              >
                Reset
              </button>
            </div>

            <p className="mt-3 hidden text-center font-mono text-[11px] text-muted md:block">
              * Move cursor across photograph to examine lens detail, or click to toggle full view.
            </p>
          </div>
        </Reveal>

        {/* Editorial Commentary (Col 8-12) */}
        <Reveal delay={0.15} className="space-y-6 lg:col-span-5">
          <div className="inline-flex items-center gap-2 rounded-full border border-line px-3 py-1 font-mono text-xs text-accent">
            <Dumbbell className="h-3.5 w-3.5" />
            <span>{gym.badge.toUpperCase()}</span>
          </div>

          <h3 className="font-display text-3xl font-bold uppercase leading-tight text-fg sm:text-4xl">
            {gym.title}
          </h3>

          {gym.paragraphs.map((p, i) => (
            <p key={i} className="text-base font-light leading-relaxed text-muted">
              {p}
            </p>
          ))}

          {/* Pillars */}
          <div className="space-y-3 border-t border-line pt-4 font-mono text-xs">
            {gym.pillars.map((pillar, i) => (
              <div key={pillar.title} className="flex items-start gap-3">
                <span className="font-bold text-fg">{String(i + 1).padStart(2, '0')}.</span>
                <div>
                  <strong className="block uppercase text-fg">{pillar.title}</strong>
                  <span className="text-muted">{pillar.body}</span>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

