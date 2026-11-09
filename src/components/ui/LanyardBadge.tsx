import { useState, useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react'
import { RotateCw, ShieldCheck, Sparkles, Terminal } from 'lucide-react'
import { site } from '../../data/portfolio'

type LanyardBadgeProps = {
  portrait: string
  caption?: string
}

/**
 * 3D Lanyard ID Badge component.
 * Features:
 * - Hanging fabric lanyard strap with branded typography
 * - Metallic swivel hook and punch hole clasp
 * - Interactive 3D spring tilt based on cursor/touch position
 * - Specular acrylic glare reflection following cursor
 * - 3D card flip (front: photo ID pass, back: magnetic stripe & access credentials)
 * - Gentle ambient pendulum sway when idle
 */
export function LanyardBadge({ portrait, caption }: LanyardBadgeProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isFlipped, setIsFlipped] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  // Motion values for tilt (-0.5 to +0.5)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Smooth springs for 3D tilt
  const springConfig = { damping: 20, stiffness: 200, mass: 0.6 }
  const tiltX = useSpring(useTransform(mouseY, [-0.5, 0.5], [14, -14]), springConfig)
  const tiltY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-14, 14]), springConfig)

  // Dynamic glare coordinates (percentage 0 - 100%)
  const glareX = useTransform(mouseX, [-0.5, 0.5], [15, 85])
  const glareY = useTransform(mouseY, [-0.5, 0.5], [15, 85])

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
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
    <div className="relative flex flex-col items-center">
      {/* 1. LANYARD STRAP (Hanging Ribbon) */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Ribbon fabric */}
        <div className="relative h-20 w-8 overflow-hidden rounded-t-sm border-x border-line bg-gradient-to-b from-neutral-800 via-neutral-900 to-black shadow-md sm:h-24 sm:w-10">
          {/* Subtle woven texture lines */}
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:4px_4px]" />
          {/* Centered vertical brand line */}
          <div className="absolute inset-y-0 left-1/2 w-0.5 -translate-x-1/2 bg-white/10" />
          {/* Micro text on lanyard strap */}
          <div className="absolute inset-0 flex flex-col items-center justify-around py-1 font-mono text-[6px] tracking-widest text-neutral-400 select-none uppercase [writing-mode:vertical-rl]">
            <span>DEV ACCESS</span>
            <span>✦</span>
            <span>2026 PASS</span>
          </div>
        </div>

        {/* Metallic clamp / buckle */}
        <div className="relative -mt-1 h-3.5 w-9 rounded-sm border border-neutral-400/50 bg-gradient-to-r from-neutral-400 via-neutral-200 to-neutral-400 shadow-sm sm:w-11">
          <div className="absolute inset-x-1 top-1 h-0.5 bg-neutral-600/60" />
        </div>

        {/* Metallic swivel ring & hook clasp */}
        <div className="relative -mt-0.5 flex flex-col items-center">
          {/* Ring */}
          <div className="h-4 w-4 rounded-full border-2 border-neutral-300 bg-transparent shadow-inner" />
          {/* Snap hook tip reaching into punch hole */}
          <div className="-mt-1 h-3 w-1.5 rounded-b-sm bg-gradient-to-b from-neutral-300 to-neutral-400 shadow-sm" />
        </div>
      </div>

      {/* 2. 3D PERSPECTIVE CONTAINER */}
      <div
        className="relative -mt-2 w-full max-w-[340px] select-none [perspective:1200px]"
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
      >
        {/* Card outer envelope with 3D tilt and ambient pendulum sway */}
        <motion.div
          ref={cardRef}
          role="button"
          tabIndex={0}
          aria-label={`Interactive 3D ID Badge for ${site.name}. Click to flip.`}
          onClick={handleFlip}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              handleFlip()
            }
          }}
          style={{
            rotateX: tiltX,
            rotateY: tiltY,
            transformStyle: 'preserve-3d',
          }}
          animate={
            isHovered
              ? {}
              : {
                  rotateZ: [-1, 1, -1],
                  y: [-2, 2, -2],
                }
          }
          transition={{
            repeat: Infinity,
            duration: 6,
            ease: 'easeInOut',
          }}
          className="relative cursor-pointer focus:outline-none focus:ring-2 focus:ring-fg rounded-[28px] p-2"
        >
          {/* Plastic Pouch / Acrylic Outer Shell */}
          <div
            className="relative w-full rounded-[24px] border-2 border-line bg-card/60 p-3 shadow-2xl backdrop-blur-sm transition-shadow duration-300 hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)] [transform-style:preserve-3d]"
          >
            {/* Top punch hole for clasp hook */}
            <div className="mx-auto mb-3 h-2.5 w-10 rounded-full border border-line bg-bg shadow-inner" />

            {/* FLIPPABLE BADGE WRAPPER */}
            <motion.div
              animate={{ rotateY: isFlipped ? 180 : 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full [transform-style:preserve-3d]"
            >
              {/* ==================================================== */}
              {/* FRONT FACE (Photo ID Badge)                          */}
              {/* ==================================================== */}
              <div
                className="relative overflow-hidden rounded-2xl border border-line bg-bg p-4 shadow-sm [backface-visibility:hidden]"
              >
                {/* Header Strip */}
                <div className="flex items-center justify-between border-b border-line pb-3">
                  <div className="flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-md bg-fg font-display text-[10px] font-bold text-bg">
                      {site.monogram}
                    </span>
                    <div className="leading-tight">
                      <span className="block font-mono text-[9px] font-bold uppercase tracking-wider text-fg">
                        DEV ACCESS PASS
                      </span>
                      <span className="block font-mono text-[8px] text-muted">ID: #KF-2026-ENG</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 font-mono text-[8px] font-semibold text-emerald-400">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                    AUTHORIZED
                  </div>
                </div>

                {/* Photo Frame */}
                <div className="relative mt-3 aspect-[4/4.5] w-full overflow-hidden rounded-xl border border-line bg-card">
                  <img
                    src={portrait}
                    alt={site.name}
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                    loading="lazy"
                  />
                  {/* Photo overlay badge */}
                  <div className="absolute right-2 bottom-2 rounded-md border border-white/20 bg-black/60 px-1.5 py-0.5 font-mono text-[8px] tracking-widest text-white/90 backdrop-blur-sm">
                    BANDUNG // 06°55'S
                  </div>
                </div>

                {/* Identity Info */}
                <div className="mt-3.5 space-y-1">
                  <h3 className="font-display text-lg font-extrabold uppercase tracking-tight text-fg">
                    {site.name}
                  </h3>
                  <p className="font-mono text-xs font-semibold text-accent">
                    FULL-STACK ENGINEER &amp; STUDENT
                  </p>
                  <p className="font-mono text-[10px] text-muted">
                    {caption ?? 'React • TypeScript • Laravel • System Design'}
                  </p>
                </div>

                {/* Security elements & barcode */}
                <div className="mt-4 flex items-center justify-between border-t border-line pt-3 font-mono">
                  {/* Smart chip & Hologram */}
                  <div className="flex items-center gap-2">
                    {/* Simulated smart chip */}
                    <div className="flex h-5 w-6 items-center justify-center rounded border border-amber-500/40 bg-amber-500/15">
                      <div className="h-3 w-4 border-y border-amber-500/50" />
                    </div>
                    {/* Hologram sticker */}
                    <div className="flex items-center gap-1 rounded border border-line bg-gradient-to-tr from-stone-400/20 via-neutral-200/30 to-teal-400/20 px-1.5 py-0.5 text-[8px] text-muted">
                      <Sparkles className="h-2.5 w-2.5 text-accent" />
                      <span>SECURE</span>
                    </div>
                  </div>

                  {/* Simulated barcode */}
                  <div className="flex flex-col items-end">
                    <div className="flex h-4 items-center gap-[1px]">
                      {[2, 1, 3, 1, 2, 4, 1, 3, 2, 1, 3, 1, 2, 3, 1].map((w, idx) => (
                        <span
                          key={idx}
                          className="h-full bg-fg"
                          style={{ width: `${w}px` }}
                        />
                      ))}
                    </div>
                    <span className="text-[7px] text-muted">2609-KF-AUTH</span>
                  </div>
                </div>
              </div>

              {/* ==================================================== */}
              {/* BACK FACE (Credentials & Magnetic Stripe)             */}
              {/* ==================================================== */}
              <div
                className="absolute inset-0 overflow-hidden rounded-2xl border border-line bg-bg p-4 shadow-sm [backface-visibility:hidden] [transform:rotateY(180deg)]"
              >
                {/* Magnetic Stripe */}
                <div className="-mx-4 -mt-4 mb-4 h-9 bg-neutral-900 border-b border-line shadow-inner flex items-center px-4">
                  <span className="font-mono text-[7px] tracking-widest text-neutral-500 uppercase">
                    HIGH COERCIVITY MAGNETIC DATA STRIPE
                  </span>
                </div>

                <div className="space-y-3 font-mono">
                  <div className="flex items-center justify-between border-b border-line pb-2">
                    <span className="text-[10px] font-bold text-fg">SECURITY CLEARANCE</span>
                    <ShieldCheck className="h-3.5 w-3.5 text-accent" />
                  </div>

                  {/* Terminal permissions */}
                  <div className="space-y-1 text-[9px] text-muted">
                    <p className="flex items-center gap-1.5 text-fg">
                      <Terminal className="h-3 w-3 text-accent" />
                      <span>Terminal Root &amp; Deployment</span>
                    </p>
                    <p>• Git: Branch Protection Override</p>
                    <p>• Cloud: Production Cluster Access</p>
                    <p>• DB: Schema Migration Authorized</p>
                  </div>

                  {/* Signature field */}
                  <div className="rounded-lg border border-line bg-card p-2">
                    <span className="block text-[8px] uppercase text-muted">Bearer Signature</span>
                    <span className="block font-serif text-sm italic font-normal text-fg pt-1 tracking-wider">
                      Khairul Faridz
                    </span>
                  </div>

                  {/* Micro terms */}
                  <p className="text-[8px] leading-tight text-muted">
                    Property of Khairul Faridz workspace. If found, return to Bandung Engineering Lab or notify via GitHub @Kyunn17.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Specular Glare Reflection on acrylic pouch */}
            <motion.div
              className="pointer-events-none absolute inset-0 rounded-[22px] transition-opacity duration-300"
              style={{
                opacity: isHovered ? 0.35 : 0.1,
                background: useTransform(
                  [glareX, glareY],
                  ([x, y]) =>
                    `radial-gradient(circle at ${x}% ${y}%, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.1) 40%, transparent 70%)`
                ),
              }}
            />
          </div>
        </motion.div>
      </div>

      {/* Helper text & Flip trigger button */}
      <div className="mt-3 flex items-center gap-3">
        <button
          type="button"
          onClick={handleFlip}
          className="group inline-flex items-center gap-1.5 rounded-full border border-line bg-card px-3.5 py-1.5 font-mono text-[11px] text-muted transition-colors hover:border-fg hover:text-fg focus:outline-none focus:ring-1 focus:ring-fg"
        >
          <RotateCw className="h-3 w-3 transition-transform duration-500 group-hover:rotate-180" />
          <span>{isFlipped ? 'Show Front Pass' : 'Flip Lanyard ID'}</span>
        </button>
        <span className="hidden font-mono text-[10px] text-muted sm:inline-block">
          * Tilt with cursor or tap to flip
        </span>
      </div>
    </div>
  )
}

