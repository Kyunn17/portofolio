import { useRef, useState } from 'react'
import { Dumbbell, Sparkles, Activity, ShieldCheck, Zap, RotateCcw, Maximize2 } from 'lucide-react'
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from 'motion/react'
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
  const [isHovered, setIsHovered] = useState(false)
  const [isFullyRevealed, setIsFullyRevealed] = useState(false)
  const [activePillarIndex, setActivePillarIndex] = useState<number | null>(null)
  const reduceMotion = useReducedMotion()

  const currentMode = gym.modes[activeMode]
  const lensRadius = 104 // 208px / 2 = 104px radius

  // 3D Tilt motion values (-0.5 to 0.5)
  const mouseNormX = useMotionValue(0)
  const mouseNormY = useMotionValue(0)

  // Spring configs for fluid physics
  const springConfig = { damping: 24, stiffness: 220, mass: 0.5 }
  const tiltX = useSpring(useTransform(mouseNormY, [-0.5, 0.5], [10, -10]), springConfig)
  const tiltY = useSpring(useTransform(mouseNormX, [-0.5, 0.5], [-10, 10]), springConfig)

  // Fluid spring coordinates for the circular lens
  const rawLensX = useMotionValue(200)
  const rawLensY = useMotionValue(250)
  const springLensConfig = { damping: 28, stiffness: 300, mass: 0.35 }
  const lensX = useSpring(rawLensX, springLensConfig)
  const lensY = useSpring(rawLensY, springLensConfig)

  // Specular sheen tracking
  const glareX = useTransform(mouseNormX, [-0.5, 0.5], [15, 85])
  const glareY = useTransform(mouseNormY, [-0.5, 0.5], [15, 85])

  // Clip path dynamic template
  const clipPathStyle = useTransform([lensX, lensY], ([x, y]) => {
    if (isFullyRevealed) return 'circle(150% at 50% 50%)'
    if (isHovered) return `circle(${lensRadius}px at ${x}px ${y}px)`
    return 'circle(0px at 50% 50%)'
  })

  const handleSelectMode = (mode: BeyondModeKey) => {
    if (mode === activeMode) return
    setActiveMode(mode)
    setIsFullyRevealed(false)
    setActivePillarIndex(null)
  }

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    rawLensX.set(x)
    rawLensY.set(y)

    if (!reduceMotion) {
      mouseNormX.set(x / rect.width - 0.5)
      mouseNormY.set(y / rect.height - 0.5)
    }

    setIsHovered(true)
  }

  const handlePointerLeave = () => {
    if (!isFullyRevealed) {
      setIsHovered(false)
    }
    mouseNormX.set(0)
    mouseNormY.set(0)
  }

  const handleToggleReveal = () => {
    setIsFullyRevealed((prev) => !prev)
  }

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
              Interactive 3D lens examination &amp; dynamic mode switch.
            </span>
          </div>
        }
      />

      {/* Dynamic Segmented Mode Switcher */}
      <Reveal className="mb-10 flex flex-wrap items-center justify-between gap-4 border-b border-line pb-6">
        <div
          role="tablist"
          aria-label="Beyond the Code interface mode"
          className="relative inline-flex items-center gap-1.5 rounded-2xl border border-line bg-card p-1.5 shadow-sm"
        >
          {/* Gym Button */}
          <button
            type="button"
            role="tab"
            aria-selected={activeMode === 'gym'}
            onClick={() => handleSelectMode('gym')}
            className={`relative z-10 inline-flex items-center gap-2.5 rounded-xl px-5 py-2.5 font-mono text-xs font-bold uppercase tracking-wider transition-colors duration-200 ${
              activeMode === 'gym' ? 'text-bg' : 'text-muted hover:text-fg'
            }`}
          >
            {activeMode === 'gym' && (
              <motion.div
                layoutId="beyond-active-pill"
                transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                className="absolute inset-0 -z-10 rounded-xl bg-fg shadow-md"
              />
            )}
            <Dumbbell className="h-4 w-4" />
            <span>Gym Reveal</span>
            <span className="hidden rounded-md border border-line/30 px-1.5 py-0.5 text-[11px] sm:inline">
              01
            </span>
          </button>

          {/* Superman Button */}
          <button
            type="button"
            role="tab"
            aria-selected={activeMode === 'superman'}
            onClick={() => handleSelectMode('superman')}
            className={`relative z-10 inline-flex items-center gap-2.5 rounded-xl px-5 py-2.5 font-mono text-xs font-bold uppercase tracking-wider transition-colors duration-200 ${
              activeMode === 'superman' ? 'text-bg' : 'text-muted hover:text-fg'
            }`}
          >
            {activeMode === 'superman' && (
              <motion.div
                layoutId="beyond-active-pill"
                transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                className="absolute inset-0 -z-10 rounded-xl bg-fg shadow-md"
              />
            )}
            <SupermanLogo className="h-4 w-4" />
            <span>Superman</span>
            <span className="hidden rounded-md border border-line/30 px-1.5 py-0.5 text-[11px] sm:inline">
              02
            </span>
          </button>
        </div>

        {/* Live Interface Telemetry Status */}
        <div className="flex items-center gap-3 font-mono text-xs text-muted">
          <span className="inline-flex items-center gap-2 rounded-full border border-line bg-card px-3 py-1 text-[11px]">
            <span
              className={`h-2 w-2 rounded-full ${
                activeMode === 'gym' ? 'bg-emerald-500' : 'bg-red-500 animate-pulse'
              }`}
            />
            <span className="font-semibold text-fg">
              {activeMode === 'gym' ? 'PHYSICAL RIGOR' : 'ALTER EGO PROTOCOL'}
            </span>
          </span>
          <span className="hidden text-[11px] uppercase tracking-widest sm:inline">
            // LIVE 3D PERSPECTIVE
          </span>
        </div>
      </Reveal>

      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
        {/* ========================================================= */}
        {/* Left: Interactive 3D Perspective Photo Frame (Col 1-7)    */}
        {/* ========================================================= */}
        <Reveal className="flex flex-col items-center lg:col-span-7">
          <div className="relative w-full max-w-md select-none [perspective:1200px]">
            {/* 3D Motion Card Container */}
            <motion.div
              ref={containerRef}
              role="button"
              tabIndex={0}
              aria-label={`Toggle full ${currentMode.buttonLabel} photograph reveal`}
              onPointerMove={handlePointerMove}
              onPointerLeave={handlePointerLeave}
              onClick={handleToggleReveal}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  handleToggleReveal()
                }
              }}
              style={{
                rotateX: reduceMotion ? 0 : tiltX,
                rotateY: reduceMotion ? 0 : tiltY,
                transformStyle: 'preserve-3d',
              }}
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.2 }}
              className="group relative aspect-[4/5] w-full cursor-pointer overflow-hidden rounded-3xl border border-line bg-card shadow-2xl focus:outline-none focus:ring-2 focus:ring-fg md:cursor-none"
            >
              {/* Base Image (White shirt attire) */}
              <img
                src={currentMode.baseImage}
                alt="Khairul Faridz - Developer Daily Attire"
                className="h-full w-full select-none object-cover"
                loading="lazy"
              />

              {/* Reveal Layer (Masked by spring-driven circular lens or full reveal) */}
              <motion.div
                className="pointer-events-none absolute inset-0 transition-opacity duration-300"
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
              </motion.div>

              {/* Specular Dynamic Sheen */}
              <motion.div
                className="pointer-events-none absolute inset-0 rounded-3xl transition-opacity duration-300"
                style={{
                  opacity: isHovered ? 0.16 : 0,
                  background: useTransform(
                    [glareX, glareY],
                    ([x, y]) =>
                      `radial-gradient(circle at ${x}% ${y}%, rgb(255 255 255 / 0.8) 0%, transparent 60%)`
                  ),
                }}
              />

              {/* Smooth Spring Glass Lens Ring (Desktop Pointer Follower) */}
              <motion.div
                className={`pointer-events-none absolute hidden h-52 w-52 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white/70 shadow-2xl backdrop-blur-[1px] transition-opacity duration-200 md:block ${
                  isHovered && !isFullyRevealed ? 'opacity-100' : 'opacity-0'
                }`}
                style={{
                  left: lensX,
                  top: lensY,
                }}
              >
                {/* Internal Lens Bezel & Refraction Accent */}
                <div className="pointer-events-none absolute inset-2 rounded-full border border-white/30" />
                <div className="pointer-events-none absolute inset-4 rounded-full border border-white/10" />

                {/* Central Micro Crosshair */}
                <div className="absolute inset-0 flex items-center justify-center opacity-40">
                  <div className="h-4 w-px bg-white" />
                  <div className="absolute h-px w-4 bg-white" />
                </div>

                {/* Tactical Tag Pill */}
                <div className="absolute top-3 left-4 inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-black/75 px-2.5 py-0.5 font-mono text-[11px] font-bold uppercase tracking-widest text-white shadow-lg backdrop-blur-md">
                  {activeMode === 'gym' ? (
                    <Dumbbell className="h-3 w-3 text-emerald-400" />
                  ) : (
                    <SupermanLogo className="h-3 w-3 text-red-400" />
                  )}
                  <span>{currentMode.lensTag}</span>
                </div>
              </motion.div>

              {/* Status Header Badge */}
              <div className="absolute top-4 left-4 flex items-center gap-2 rounded-full border border-line bg-bg/90 px-3.5 py-1.5 font-mono text-[11px] tracking-wider uppercase text-fg backdrop-blur-md shadow-sm">
                <span
                  className={`h-2 w-2 rounded-full ${
                    isFullyRevealed
                      ? 'bg-amber-400'
                      : activeMode === 'gym'
                        ? 'bg-emerald-500'
                        : 'bg-red-500 animate-pulse'
                  }`}
                />
                <span className="font-semibold">
                  {isFullyRevealed
                    ? `FULL ${currentMode.lensTag} (CLICK TO RESET)`
                    : `HOVER / TAP TO REVEAL`}
                </span>
              </div>

              {/* Watermark Pill */}
              <div className="pointer-events-none absolute right-4 bottom-4 inline-flex items-center gap-2 rounded-full border border-line bg-bg/85 px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-fg backdrop-blur-md shadow-sm">
                {activeMode === 'gym' ? (
                  <Activity className="h-3.5 w-3.5 text-emerald-500" />
                ) : (
                  <Zap className="h-3.5 w-3.5 text-amber-500" />
                )}
                <span className="font-bold">{currentMode.buttonLabel}</span>
              </div>
            </motion.div>

            {/* Quick Interactive Action Toolbar */}
            <div className="mt-4 flex w-full items-center justify-between gap-3 font-mono text-xs">
              <motion.button
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsFullyRevealed(true)}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-fg py-3 px-4 text-center font-bold uppercase tracking-wider text-bg shadow-sm transition-opacity hover:opacity-95"
              >
                <Maximize2 className="h-3.5 w-3.5" />
                <span>
                  {activeMode === 'gym' ? 'Full Form Reveal' : 'Full Alter Ego View'}
                </span>
              </motion.button>

              <motion.button
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsFullyRevealed(false)}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-line bg-card py-3 px-4 uppercase tracking-wider text-muted transition-colors hover:border-fg hover:text-fg"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>Reset</span>
              </motion.button>
            </div>

            <p className="mt-3 text-center font-mono text-[11px] text-muted">
              * Fluid 3D perspective enabled. Move cursor to examine details, or tap full reveal.
            </p>
          </div>
        </Reveal>

        {/* ========================================================= */}
        {/* Right: Dynamic Interface Display (Col 8-12)               */}
        {/* ========================================================= */}
        <div className="lg:col-span-5">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeMode}
              initial={{ opacity: 0, y: 16, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -16, filter: 'blur(4px)' }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-6"
            >
              {/* Badge & Mode Tagline */}
              <div className="flex flex-wrap items-center gap-2">
                <div className="inline-flex items-center gap-2 rounded-full border border-line bg-card px-3 py-1 font-mono text-xs font-semibold text-accent">
                  {activeMode === 'gym' ? (
                    <Dumbbell className="h-3.5 w-3.5" />
                  ) : (
                    <SupermanLogo className="h-3.5 w-3.5" />
                  )}
                  <span>{currentMode.badge.toUpperCase()}</span>
                </div>

                <span className="font-mono text-[11px] text-muted">
                  {activeMode === 'gym' ? '// REGIMEN 01' : '// REGIMEN 02'}
                </span>
              </div>

              <div>
                <h3 className="font-display text-3xl font-black uppercase leading-tight tracking-tight text-fg sm:text-4xl">
                  {currentMode.title}
                </h3>
                <p className="mt-2 font-mono text-xs text-muted">
                  {currentMode.subtitle}
                </p>
              </div>

              {/* Dynamic Telemetry Stats Grid */}
              <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3">
                {currentMode.stats.map((stat) => (
                  <motion.div
                    key={stat.label}
                    whileHover={{ y: -2 }}
                    className="rounded-xl border border-line bg-card p-3 transition-colors hover:border-fg"
                  >
                    <span className="block font-mono text-[11px] font-bold uppercase tracking-wider text-muted">
                      {stat.label}
                    </span>
                    <span className="mt-1 block font-display text-base font-extrabold uppercase text-fg">
                      {stat.value}
                    </span>
                    <span className="mt-0.5 block font-mono text-[11px] text-muted/80">
                      {stat.detail}
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* Editorial Paragraphs */}
              <div className="space-y-3">
                {currentMode.paragraphs.map((p, i) => (
                  <p key={i} className="text-sm font-light leading-relaxed text-muted sm:text-base">
                    {p}
                  </p>
                ))}
              </div>

              {/* Interactive Core Pillars with Hover State */}
              <div className="space-y-2.5 border-t border-line pt-4 font-mono text-xs">
                <span className="block font-mono text-[11px] font-bold uppercase tracking-wider text-muted">
                  CORE TENETS // HOVER TO INSPECT
                </span>

                {currentMode.pillars.map((pillar, i) => {
                  const isActive = activePillarIndex === i
                  return (
                    <div
                      key={pillar.title}
                      onMouseEnter={() => setActivePillarIndex(i)}
                      onMouseLeave={() => setActivePillarIndex(null)}
                      className={`cursor-pointer rounded-xl border p-3 transition-all duration-200 ${
                        isActive
                          ? 'border-fg bg-card/80 shadow-sm'
                          : 'border-line bg-card/30 hover:border-line hover:bg-card/60'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-fg">
                            {String(i + 1).padStart(2, '0')}.
                          </span>
                          <strong className="uppercase text-fg">{pillar.title}</strong>
                        </div>
                        {isActive && (
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-accent">
                            <Sparkles className="h-3 w-3" />
                            <span>ACTIVE</span>
                          </span>
                        )}
                      </div>
                      <p className="mt-1.5 text-[11px] leading-relaxed text-muted">
                        {pillar.body}
                      </p>
                    </div>
                  )
                })}
              </div>

              {/* Dynamic Interactive Tag Chips */}
              <div className="flex flex-wrap items-center gap-2 pt-2">
                {currentMode.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1.5 rounded-full border border-line bg-card px-3 py-1 font-mono text-[11px] text-muted transition-colors hover:border-fg hover:text-fg"
                  >
                    <ShieldCheck className="h-3 w-3 text-accent" />
                    <span>{tag}</span>
                  </span>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

