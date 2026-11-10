import { useState, useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'motion/react'
import { RotateCw, Terminal, MapPin, Code2 } from 'lucide-react'
import { site } from '../../data/portfolio'

type LanyardBadgeProps = {
  portrait: string
  caption?: string
}

/**
 * Swiss-Editorial 3D Developer Pass & Lanyard UI.
 * - Theme-adaptive hanging strap and geometric clasp (works in both Dark and Clean modes)
 * - Interactive 3D spring tilt based on pointer coordinates
 * - Restrained editorial typography (11px minimum floor, zero fake skeuomorphic clutter)
 * - 3D card flip: Front (Portrait & Identity) / Back (Verifiable Engineering Dossier)
 * - Respects `prefers-reduced-motion`
 */
export function LanyardBadge({ portrait, caption }: LanyardBadgeProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isFlipped, setIsFlipped] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const reduceMotion = useReducedMotion()

  // Motion values for tilt (-0.5 to +0.5)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Smooth springs for 3D tilt
  const springConfig = { damping: 22, stiffness: 200, mass: 0.6 }
  const tiltX = useSpring(useTransform(mouseY, [-0.5, 0.5], [12, -12]), springConfig)
  const tiltY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-12, 12]), springConfig)

  // Subtle specular sheen coordinates (percentage 0 - 100%)
  const glareX = useTransform(mouseX, [-0.5, 0.5], [20, 80])
  const glareY = useTransform(mouseY, [-0.5, 0.5], [20, 80])

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!cardRef.current || reduceMotion) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    mouseX.set(x)
    mouseY.set(y)
    setIsHovered(true)
  }

  const handlePointerLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
    setIsHovered(false)
  }

  const handleFlip = () => {
    setIsFlipped((prev) => !prev)
  }

  return (
    <div className="relative flex w-full flex-col items-center">
      {/* 1. EDITORIAL LANYARD STRAP (Theme-adaptive monochrome) */}
      <div className="relative z-10 flex flex-col items-center">
        <div className="relative flex h-20 w-9 items-center justify-center overflow-hidden rounded-t-sm border-x border-t border-line bg-fg text-bg shadow-sm sm:h-24 sm:w-10">
          {/* Stitched side hairlines */}
          <div className="absolute inset-y-0 left-1.5 w-px bg-bg/20" />
          <div className="absolute inset-y-0 right-1.5 w-px bg-bg/20" />
          <span className="font-mono text-[11px] font-bold tracking-widest uppercase select-none [writing-mode:vertical-rl]">
            KF // 2026
          </span>
        </div>

        {/* Geometric Editorial Clasp */}
        <div className="relative -mt-0.5 h-3 w-11 rounded-xs border border-line bg-card shadow-xs" />
        <div className="relative -mt-0.5 flex flex-col items-center">
          <div className="h-3.5 w-3.5 rounded-full border-2 border-fg bg-bg" />
          <div className="-mt-1 h-2.5 w-1.5 rounded-b-xs bg-fg" />
        </div>
      </div>

      {/* 2. 3D PERSPECTIVE CONTAINER */}
      <div
        className="relative -mt-2 w-full max-w-[350px] select-none [perspective:1200px]"
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
      >
        <motion.div
          ref={cardRef}
          role="button"
          tabIndex={0}
          aria-label={`Interactive 3D Editorial ID Card for ${site.name}. Click or press Enter to flip between portrait and engineering dossier.`}
          onClick={handleFlip}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              handleFlip()
            }
          }}
          style={{
            rotateX: reduceMotion ? 0 : tiltX,
            rotateY: reduceMotion ? 0 : tiltY,
            transformStyle: 'preserve-3d',
          }}
          animate={
            isHovered || reduceMotion
              ? { rotateZ: 0, y: 0 }
              : {
                  rotateZ: [-0.8, 0.8, -0.8],
                  y: [-1.5, 1.5, -1.5],
                }
          }
          transition={{
            repeat: isHovered || reduceMotion ? 0 : Infinity,
            duration: 7,
            ease: 'easeInOut',
          }}
          className="relative cursor-pointer rounded-3xl p-1.5 focus:outline-none focus:ring-2 focus:ring-fg"
        >
          {/* Outer Editorial Frame */}
          <div className="relative w-full rounded-[22px] border border-line bg-card p-3 shadow-xl transition-shadow duration-300 hover:shadow-2xl [transform-style:preserve-3d]">
            {/* Top slotted eyelet for clasp */}
            <div className="mx-auto mb-3 h-2 w-10 rounded-full border border-line bg-bg" />

            {/* FLIPPABLE CARD WRAPPER */}
            <motion.div
              animate={{ rotateY: isFlipped ? 180 : 0 }}
              transition={{ duration: reduceMotion ? 0.01 : 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full [transform-style:preserve-3d]"
            >
              {/* ==================================================== */}
              {/* FRONT FACE: Editorial Portrait & Identity            */}
              {/* ==================================================== */}
              <div className="relative overflow-hidden rounded-2xl border border-line bg-bg p-4 [backface-visibility:hidden]">
                {/* Header Strip */}
                <div className="flex items-center justify-between border-b border-line pb-3">
                  <div className="flex items-center gap-2.5">
                    <span className="flex h-7 w-7 items-center justify-center rounded-md bg-fg font-display text-xs font-bold text-bg">
                      {site.monogram}
                    </span>
                    <div className="leading-tight">
                      <span className="block font-mono text-[11px] font-bold uppercase tracking-wider text-fg">
                        DEVELOPER INDEX
                      </span>
                      <span className="block font-mono text-[11px] text-muted">EDITION // 2026</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 rounded-full border border-line bg-card px-2.5 py-1 font-mono text-[11px] font-medium text-fg">
                    <span className="h-2 w-2 rounded-full bg-emerald-500" />
                    <span>ACTIVE</span>
                  </div>
                </div>

                {/* Portrait Frame */}
                <div className="relative mt-3.5 aspect-[4/4.4] w-full overflow-hidden rounded-xl border border-line bg-card">
                  <img
                    src={portrait}
                    alt={site.name}
                    className="h-full w-full object-cover contrast-115 grayscale transition-all duration-500 hover:scale-103 hover:grayscale-0"
                    loading="lazy"
                  />
                  <div className="absolute right-2.5 bottom-2.5 rounded-md border border-line bg-bg/90 px-2 py-1 font-mono text-[11px] tracking-wider text-fg backdrop-blur-sm">
                    06°55&apos;S 107°36&apos;E
                  </div>
                </div>

                {/* Identity Details */}
                <div className="mt-4 space-y-1">
                  <h3 className="font-display text-xl font-extrabold uppercase tracking-tight text-fg">
                    {site.name}
                  </h3>
                  <p className="font-mono text-xs font-semibold uppercase tracking-wider text-accent">
                    FULL-STACK ENGINEER &amp; STUDENT
                  </p>
                  <p className="font-mono text-[11px] text-muted">
                    {caption ?? 'Software Engineer & Creative Builder'}
                  </p>
                </div>

                {/* Footer Metadata Strip */}
                <div className="mt-4 flex items-center justify-between border-t border-line pt-3 font-mono text-[11px] text-muted">
                  <span>WEST JAVA, ID</span>
                  <span className="font-semibold text-fg">FLIP FOR DOSSIER →</span>
                </div>
              </div>

              {/* ==================================================== */}
              {/* BACK FACE: Verifiable Engineering Dossier            */}
              {/* ==================================================== */}
              <div className="absolute inset-0 flex flex-col justify-between overflow-hidden rounded-2xl border border-line bg-bg p-5 [backface-visibility:hidden] [transform:rotateY(180deg)]">
                <div className="space-y-4">
                  {/* Dossier Header */}
                  <div className="flex items-center justify-between border-b border-line pb-3">
                    <div>
                      <span className="block font-mono text-[11px] font-bold uppercase tracking-wider text-fg">
                        TECHNICAL DOSSIER
                      </span>
                      <span className="block font-mono text-[11px] text-muted">
                        VERIFIED ARCHITECTURE SPEC
                      </span>
                    </div>
                    <span className="flex h-7 w-7 items-center justify-center rounded-md border border-line bg-card font-display text-xs font-bold text-fg">
                      {site.monogram}
                    </span>
                  </div>

                  {/* Engineering Pillars */}
                  <div className="space-y-3 font-mono text-xs">
                    <div className="rounded-xl border border-line bg-card p-3">
                      <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase text-fg">
                        <Code2 className="h-3.5 w-3.5 text-accent" />
                        <span>Core Architecture</span>
                      </div>
                      <p className="mt-1 text-[11px] leading-relaxed text-muted">
                        React, Next.js, TypeScript, Tailwind CSS, Laravel REST APIs, PostgreSQL &amp; Databricks.
                      </p>
                    </div>

                    <div className="rounded-xl border border-line bg-card p-3">
                      <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase text-fg">
                        <Terminal className="h-3.5 w-3.5 text-accent" />
                        <span>Production Works</span>
                      </div>
                      <p className="mt-1 text-[11px] leading-relaxed text-muted">
                        CSV Template Validation (Databricks), LifeSync Health, and CritiPlay Platform.
                      </p>
                    </div>

                    <div className="rounded-xl border border-line bg-card p-3">
                      <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase text-fg">
                        <MapPin className="h-3.5 w-3.5 text-accent" />
                        <span>Base &amp; Availability</span>
                      </div>
                      <p className="mt-1 text-[11px] leading-relaxed text-muted">
                        Bandung, West Java — Open for Full-Stack &amp; Frontend Roles.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Editorial Monogram Stamp */}
                <div className="flex items-center justify-between border-t border-line pt-3 font-mono text-[11px]">
                  <span className="font-display text-xs font-bold uppercase tracking-tight text-fg">
                    {site.name}
                  </span>
                  <span className="text-muted">@Kyunn17</span>
                </div>
              </div>
            </motion.div>

            {/* Subtle Surface Specular Sheen */}
            <motion.div
              className="pointer-events-none absolute inset-0 rounded-[22px] transition-opacity duration-300"
              style={{
                opacity: isHovered ? 0.18 : 0,
                background: useTransform(
                  [glareX, glareY],
                  ([x, y]) =>
                    `radial-gradient(circle at ${x}% ${y}%, rgb(245 245 245 / 0.6) 0%, transparent 65%)`
                ),
              }}
            />
          </div>
        </motion.div>
      </div>

      {/* Flip Trigger Button */}
      <div className="mt-3 flex items-center gap-3">
        <button
          type="button"
          onClick={handleFlip}
          className="group inline-flex items-center gap-2 rounded-full border border-line bg-card px-4 py-2 font-mono text-xs text-fg transition-colors hover:border-fg hover:bg-fg hover:text-bg focus:outline-none focus:ring-2 focus:ring-fg"
        >
          <RotateCw className="h-3.5 w-3.5 transition-transform duration-500 group-hover:rotate-180" />
          <span>{isFlipped ? 'Show Portrait Front' : 'Flip Technical Dossier'}</span>
        </button>
      </div>
    </div>
  )
}
