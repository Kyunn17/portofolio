import { useEffect, useState, useCallback } from 'react'
import {
  AnimatePresence,
  animate,
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from 'motion/react'

const GREETINGS = [
  'HELLO',
  'HOLA',
  'HALLO',
  'BONJOUR',
  'CIAO',
  'こんにちは',
  '안녕하세요',
  'OLÁ',
  'NAMASTE',
] as const

/**
 * Tracks whether the intro has already been completed in the current page session
 * so theme toggles or state updates never re-trigger it, while a full browser
 * refresh lets you experience the intro again.
 */
let hasCompletedIntroInPageSession = false

/**
 * Cinematic Interactive Portfolio Intro (`IntroOverlay.tsx`).
 *
 * - Minimalist, monochromatic, editorial full-screen entrance.
 * - Cycles greetings across 9 languages with smooth opacity transitions.
 * - On click (or Enter/Space), freezes the active greeting and opens a
 *   circular transparent glass lens at the exact viewport center `(50%, 50%)`
 *   that reveals the live portfolio underneath with subtle blur, optical
 *   refraction, and a specular glass rim before expanding past all 4 corners.
 */
export function IntroOverlay() {
  const prefersReducedMotion = useReducedMotion()

  const [isIntroVisible, setIsIntroVisible] = useState<boolean>(
    () => !hasCompletedIntroInPageSession
  )
  const [isEntering, setIsEntering] = useState<boolean>(false)
  const [activeGreeting, setActiveGreeting] = useState<number>(0)

  // Portal radius in `vmax` units (0vmax -> 145vmax full corner coverage)
  const portalRadius = useMotionValue(0)

  // All derived MotionValues declared unconditionally at the top (before any early return)
  const lensDiameter = useTransform(portalRadius, (r) => `${r * 2}vmax`)
  const lensBlur = useTransform(portalRadius, [0, 18, 75, 130], [12, 8, 2, 0])
  const lensRimOpacity = useTransform(portalRadius, [0, 5, 95, 140], [0, 0.9, 0.45, 0])
  const curtainOpacity = useTransform(portalRadius, [0, 80, 140], [1, 0.96, 0])

  // Radial mask that punches a transparent circular hole in the center of the intro screen
  const curtainMask = useMotionTemplate`radial-gradient(circle at 50% 50%, transparent ${portalRadius}vmax, black calc(${portalRadius}vmax + 1.5px))`
  // Circular clip path for the transparent glass lens layer
  const lensClipPath = useMotionTemplate`circle(${portalRadius}vmax at 50% 50%)`
  const lensBackdropFilter = useMotionTemplate`blur(${lensBlur}px)`

  // Lock page scroll while the intro overlay is visible
  useEffect(() => {
    if (!isIntroVisible) {
      document.body.style.overflow = ''
      return
    }
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [isIntroVisible])

  // Cycle greetings automatically while waiting (paused immediately when `isEntering` is true)
  useEffect(() => {
    if (!isIntroVisible || isEntering || prefersReducedMotion) return

    const interval = window.setInterval(() => {
      setActiveGreeting((prev) => (prev + 1) % GREETINGS.length)
    }, 1650)

    return () => window.clearInterval(interval)
  }, [isIntroVisible, isEntering, prefersReducedMotion])

  const handleEnter = useCallback(() => {
    if (isEntering || !isIntroVisible) return
    setIsEntering(true)
    hasCompletedIntroInPageSession = true

    // Clean up any leftover sessionStorage key from previous builds
    try {
      sessionStorage.removeItem('kf_intro_completed')
    } catch {
      /* ignore */
    }

    const duration = prefersReducedMotion ? 0.35 : 1.75

    animate(portalRadius, 145, {
      duration,
      ease: [0.65, 0, 0.15, 1],
      onComplete: () => {
        setIsIntroVisible(false)
      },
    })
  }, [isEntering, isIntroVisible, portalRadius, prefersReducedMotion])

  if (!isIntroVisible) return null

  const currentGreetingText = GREETINGS[activeGreeting]

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Portfolio Exhibition Entrance"
      onClick={handleEnter}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          handleEnter()
        }
      }}
      tabIndex={0}
      className="fixed inset-0 z-50 flex cursor-pointer items-center justify-center overflow-hidden select-none focus:outline-none"
    >
      {/* ================================================================ */}
      {/* LAYER 1: Transparent Glass Portal Lens (reveals live homepage)   */}
      {/* ================================================================ */}
      <motion.div
        aria-hidden="true"
        style={{
          clipPath: lensClipPath,
          WebkitClipPath: lensClipPath,
          backdropFilter: lensBackdropFilter,
          WebkitBackdropFilter: lensBackdropFilter,
        }}
        className="pointer-events-none absolute inset-0 z-10"
      />

      {/* Expanding Optical Glass Rim & Refraction Ring */}
      <motion.div
        aria-hidden="true"
        style={{
          width: lensDiameter,
          height: lensDiameter,
          opacity: lensRimOpacity,
        }}
        className="pointer-events-none absolute top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2 rounded-full border border-fg/40 shadow-[inset_0_0_48px_rgba(255,255,255,0.16)]"
      >
        <div className="absolute inset-2 rounded-full border border-fg/15" />
      </motion.div>

      {/* ================================================================ */}
      {/* LAYER 2: Monochromatic Intro Curtain (masked outside the circle) */}
      {/* ================================================================ */}
      <motion.div
        style={{
          opacity: curtainOpacity,
          maskImage: curtainMask,
          WebkitMaskImage: curtainMask,
        }}
        className="relative z-30 flex h-full w-full flex-col items-center justify-center bg-bg px-6 text-fg"
      >
        <div className="flex flex-col items-center justify-center text-center">
          {/* Interactive Greeting Typography */}
          <motion.div
            animate={
              isEntering
                ? { scale: 1.05, opacity: 0 }
                : { scale: 1, opacity: 1 }
            }
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="group relative flex min-h-[5.5rem] items-center justify-center sm:min-h-[7.5rem] md:min-h-[9rem]"
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={currentGreetingText}
                initial={
                  prefersReducedMotion
                    ? { opacity: 1 }
                    : { opacity: 0, y: 8 }
                }
                animate={{ opacity: 1, y: 0 }}
                exit={
                  prefersReducedMotion
                    ? { opacity: 0 }
                    : { opacity: 0, y: -8 }
                }
                transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                className="font-display text-5xl font-bold tracking-tight text-fg transition-transform duration-500 ease-out group-hover:scale-[1.03] sm:text-7xl md:text-8xl lg:text-9xl"
              >
                {currentGreetingText}
              </motion.span>
            </AnimatePresence>
          </motion.div>

          {/* Secondary Instruction */}
          <motion.p
            animate={isEntering ? { opacity: 0, y: 6 } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="mt-8 font-mono text-xs uppercase tracking-[0.3em] text-muted transition-colors duration-300 hover:text-fg"
          >
            CLICK TO ENTER
          </motion.p>
        </div>
      </motion.div>
    </div>
  )
}
