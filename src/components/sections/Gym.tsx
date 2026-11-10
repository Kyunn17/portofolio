import { useRef, useState } from 'react'
import { Dumbbell } from 'lucide-react'
import { Reveal } from '../ui/Reveal'
import { SectionHeader } from '../ui/SectionHeader'
import { type BeyondModeKey, gym, sectionIndex } from '../../data/portfolio'

function SupermanLogo({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {/* Classic 5-sided Superman Diamond Shield */}
      <path d="M5.5 3.5h13L22 9l-10 12L2 9l3.5-5.5Z" />
      {/* Stylized S-emblem curves inside the shield */}
      <path d="M15.2 7.5c-1.2-.8-3.8-.9-4.9.2-1.1 1 .1 2.2 2.2 2.6 2.3.4 3.2 1.6 2.1 3.1-1.1 1.4-3.7 1.3-5.2.1" />
    </svg>
  )
}

export function Gym() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeMode, setActiveMode] = useState<BeyondModeKey>('gym')
  const [lensPos, setLensPos] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)
  const [isFullyRevealed, setIsFullyRevealed] = useState(false)

  const currentMode = gym.modes[activeMode]
  const lensRadius = 96 // 192px / 2 = 96px radius

  const handleSelectMode = (mode: BeyondModeKey) => {
    if (mode === activeMode) return
    setActiveMode(mode)
    setIsFullyRevealed(false)
    setIsHovered(false)
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isFullyRevealed || !containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    setLensPos({ x, y })
    setIsHovered(true)
  }

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (isFullyRevealed || !containerRef.current) return
    const touch = e.touches[0]
    if (!touch) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = touch.clientX - rect.left
    const y = touch.clientY - rect.top
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
            <span className="block font-display text-sm font-semibold text-accent">
              {currentMode.quote}
            </span>
            <span className="text-[11px] text-muted">
              Switch between Gym Reveal and Superman interface below.
            </span>
          </div>
        }
      />

      {/* Mode Switcher Bar: 2 Buttons for 2 Interfaces */}
      <Reveal className="mb-10 flex flex-wrap items-center justify-between gap-4 border-b border-line pb-6">
        <div
          role="tablist"
          aria-label="Beyond the Code interface mode"
          className="inline-flex items-center gap-2 rounded-2xl border border-line bg-card p-1.5"
        >
          <button
            type="button"
            role="tab"
            aria-selected={activeMode === 'gym'}
            onClick={() => handleSelectMode('gym')}
            className={`inline-flex items-center gap-2.5 rounded-xl px-4 py-2.5 font-mono text-xs font-bold uppercase tracking-wider transition-all ${
              activeMode === 'gym'
                ? 'bg-fg text-bg shadow-sm'
                : 'text-muted hover:text-fg'
            }`}
          >
            <Dumbbell className="h-4 w-4" />
            <span>Gym Reveal</span>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={activeMode === 'superman'}
            onClick={() => handleSelectMode('superman')}
            className={`inline-flex items-center gap-2.5 rounded-xl px-4 py-2.5 font-mono text-xs font-bold uppercase tracking-wider transition-all ${
              activeMode === 'superman'
                ? 'bg-fg text-bg shadow-sm'
                : 'text-muted hover:text-fg'
            }`}
          >
            <SupermanLogo className="h-4 w-4" />
            <span>Superman</span>
          </button>
        </div>

        <div className="flex items-center gap-3 font-mono text-xs text-muted">
          <span className="uppercase tracking-widest">
            INTERFACE // {activeMode === 'gym' ? '01 — CONDITIONING' : '02 — ALTER EGO'}
          </span>
        </div>
      </Reveal>

      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
        {/* Interactive Lens Frame (Col 1-7) */}
        <Reveal className="flex flex-col items-center lg:col-span-7">
          <div className="relative w-full max-w-md">
            {/* Framing Card */}
            <div
              ref={containerRef}
              role="button"
              tabIndex={0}
              aria-label={`Toggle full ${currentMode.buttonLabel} photograph reveal`}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              onTouchStart={handleTouchMove}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleMouseLeave}
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
                src={currentMode.baseImage}
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
                  key={currentMode.revealImage}
                  src={currentMode.revealImage}
                  alt={currentMode.revealAlt}
                  className="h-full w-full select-none object-cover"
                  loading="lazy"
                />
              </div>

              {/* Circular glass lens indicator & border (desktop only, follows cursor) */}
              <div
                className={`pointer-events-none absolute hidden h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white/60 shadow-2xl backdrop-blur-[1px] transition-opacity duration-200 md:block ${
                  isHovered && !isFullyRevealed ? 'opacity-100' : 'opacity-0'
                }`}
                style={{
                  left: `${lensPos.x}px`,
                  top: `${lensPos.y}px`,
                }}
              >
                {/* Reflection accent */}
                <div className="pointer-events-none absolute inset-2 rounded-full border border-white/20" />
                <div className="absolute top-3 left-4 inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-black/70 px-2.5 py-0.5 font-mono text-[11px] uppercase tracking-widest text-white/90">
                  {activeMode === 'gym' ? (
                    <Dumbbell className="h-3 w-3" />
                  ) : (
                    <SupermanLogo className="h-3 w-3" />
                  )}
                  <span>{currentMode.lensTag}</span>
                </div>
              </div>

              {/* Status Badge */}
              <div className="absolute top-4 left-4 flex items-center gap-2 rounded-full border border-line bg-bg/90 px-3 py-1 font-mono text-[11px] tracking-wider uppercase text-muted backdrop-blur-md">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                <span>
                  {isFullyRevealed
                    ? `FULL ${currentMode.lensTag} ACTIVE (CLICK TO RESET)`
                    : `HOVER / CLICK TO REVEAL ${currentMode.buttonLabel.toUpperCase()}`}
                </span>
              </div>

              {/* Bottom Mode Watermark Pill */}
              <div className="pointer-events-none absolute right-4 bottom-4 inline-flex items-center gap-2 rounded-full border border-line bg-bg/85 px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-fg backdrop-blur-md">
                {activeMode === 'gym' ? (
                  <Dumbbell className="h-3.5 w-3.5" />
                ) : (
                  <SupermanLogo className="h-3.5 w-3.5" />
                )}
                <span>{currentMode.buttonLabel}</span>
              </div>
            </div>

            {/* Action Controls (Desktop & Mobile) */}
            <div className="mt-4 flex w-full items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setIsFullyRevealed(true)}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-fg py-3 px-4 text-center font-mono text-xs font-bold uppercase tracking-wider text-bg transition-opacity hover:opacity-90"
              >
                {activeMode === 'gym' ? (
                  <Dumbbell className="h-3.5 w-3.5" />
                ) : (
                  <SupermanLogo className="h-3.5 w-3.5" />
                )}
                <span>
                  {activeMode === 'gym' ? 'Full Gym Reveal' : 'Full Superman Reveal'}
                </span>
              </button>
              <button
                type="button"
                onClick={() => setIsFullyRevealed(false)}
                className="rounded-xl border border-line py-3 px-5 text-center font-mono text-xs uppercase tracking-wider text-muted transition-colors hover:border-fg hover:text-fg"
              >
                Reset Lens
              </button>
            </div>

            <p className="mt-3 hidden text-center font-mono text-[11px] text-muted md:block">
              * Move cursor across photograph to examine lens detail, or click to toggle full view.
            </p>
          </div>
        </Reveal>

        {/* Editorial Commentary Interface (Col 8-12) */}
        <Reveal key={activeMode} delay={0.1} className="space-y-6 lg:col-span-5">
          <div className="inline-flex items-center gap-2 rounded-full border border-line px-3 py-1 font-mono text-xs text-accent">
            {activeMode === 'gym' ? (
              <Dumbbell className="h-3.5 w-3.5" />
            ) : (
              <SupermanLogo className="h-3.5 w-3.5" />
            )}
            <span>{currentMode.badge.toUpperCase()}</span>
          </div>

          <h3 className="font-display text-3xl font-bold uppercase leading-tight text-fg sm:text-4xl">
            {currentMode.title}
          </h3>

          {currentMode.paragraphs.map((p, i) => (
            <p key={i} className="text-base font-light leading-relaxed text-muted">
              {p}
            </p>
          ))}

          {/* Pillars */}
          <div className="space-y-3 border-t border-line pt-4 font-mono text-xs">
            {currentMode.pillars.map((pillar, i) => (
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

