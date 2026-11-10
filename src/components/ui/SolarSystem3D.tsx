import { useState, useRef, type ComponentType } from 'react'
import { motion, useMotionValue, useSpring, AnimatePresence, useReducedMotion } from 'motion/react'
import { Pause, Play, RotateCcw, X, Compass } from 'lucide-react'
import {
  SiGithub,
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiTailwindcss,
  SiHtml5,
  SiLaravel,
  SiPhp,
  SiPostgresql,
  SiGit,
  SiDatabricks,
  SiPython,
} from 'react-icons/si'

export type PlanetTier = 'Frontend' | 'Backend' | 'Data Systems'

export type PlanetData = {
  id: string
  name: string
  tier: PlanetTier
  role: string
  description: string
  projects: string[]
  orbitIndex: number // 1 to 4
  orbitRadius: number // px on desktop base scale
  angleOffset: number // initial degree 0 - 360
  orbitDuration: number // seconds per revolution
  icon: ComponentType<{ className?: string }>
}

export const PLANETS: PlanetData[] = [
  // Orbit 1: Core Foundations (Inner Ring — 3 planets)
  {
    id: 'ts',
    name: 'TypeScript',
    tier: 'Frontend',
    role: 'Strict Typing & Contracts',
    description: 'Enforces type-safe domain models, strict API schemas, and predictable refactoring across full-stack applications.',
    projects: ['CSV Template Validation', 'Portfolio System'],
    orbitIndex: 1,
    orbitRadius: 110,
    angleOffset: 0,
    orbitDuration: 28,
    icon: SiTypescript,
  },
  {
    id: 'react',
    name: 'React',
    tier: 'Frontend',
    role: 'Declarative UI & State',
    description: 'Component lifecycles, custom hooks, interactive state machines, and composable client architectures.',
    projects: ['LifeSync', 'CritiPlay', 'Portfolio System'],
    orbitIndex: 1,
    orbitRadius: 110,
    angleOffset: 120,
    orbitDuration: 28,
    icon: SiReact,
  },
  {
    id: 'html5',
    name: 'HTML5',
    tier: 'Frontend',
    role: 'Semantic Document Structure',
    description: 'Accessible landmarks, semantic DOM hierarchy, keyboard navigation flow, and standards-compliant markup.',
    projects: ['CSV Template Validation', 'LifeSync', 'CritiPlay'],
    orbitIndex: 1,
    orbitRadius: 110,
    angleOffset: 240,
    orbitDuration: 28,
    icon: SiHtml5,
  },

  // Orbit 2: Application Frameworks (Ring 02 — 3 planets)
  {
    id: 'nextjs',
    name: 'Next.js',
    tier: 'Frontend',
    role: 'SSR & App Router Framework',
    description: 'Server-side rendering, route handlers, edge optimization, and full-stack React web applications.',
    projects: ['CSV Template Validation', 'LifeSync'],
    orbitIndex: 2,
    orbitRadius: 175,
    angleOffset: 40,
    orbitDuration: 40,
    icon: SiNextdotjs,
  },
  {
    id: 'tailwind',
    name: 'Tailwind CSS',
    tier: 'Frontend',
    role: 'Design Tokens & Fluid Grids',
    description: 'Utility-first token systems, dual dark/clean themes, and responsive editorial layouts.',
    projects: ['CSV Template Validation', 'LifeSync', 'CritiPlay'],
    orbitIndex: 2,
    orbitRadius: 175,
    angleOffset: 160,
    orbitDuration: 40,
    icon: SiTailwindcss,
  },
  {
    id: 'laravel',
    name: 'Laravel',
    tier: 'Backend',
    role: 'MVC Platform & REST APIs',
    description: 'Architecting modular backend services, Eloquent ORM models, authentication, and session security.',
    projects: ['CritiPlay'],
    orbitIndex: 2,
    orbitRadius: 175,
    angleOffset: 280,
    orbitDuration: 40,
    icon: SiLaravel,
  },

  // Orbit 3: Runtime & Relational Storage (Ring 03 — 3 planets)
  {
    id: 'postgres',
    name: 'PostgreSQL',
    tier: 'Backend',
    role: 'Relational Data Modeling',
    description: 'ACID-compliant relational schemas, indexed queries, foreign-key integrity, and structured storage.',
    projects: ['LifeSync', 'CritiPlay'],
    orbitIndex: 3,
    orbitRadius: 245,
    angleOffset: 20,
    orbitDuration: 54,
    icon: SiPostgresql,
  },
  {
    id: 'php',
    name: 'PHP',
    tier: 'Backend',
    role: 'Server-Side Runtime',
    description: 'Object-oriented backend execution, request validation middlewares, and REST API controllers.',
    projects: ['CritiPlay'],
    orbitIndex: 3,
    orbitRadius: 245,
    angleOffset: 140,
    orbitDuration: 54,
    icon: SiPhp,
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    tier: 'Frontend',
    role: 'ESNext & Asynchronous I/O',
    description: 'Event-driven browser interactivity, asynchronous data fetching, and client-side validation logic.',
    projects: ['CSV Template Validation', 'LifeSync', 'CritiPlay'],
    orbitIndex: 3,
    orbitRadius: 245,
    angleOffset: 260,
    orbitDuration: 54,
    icon: SiJavascript,
  },

  // Orbit 4: Data Systems & Version Control (Outer Ring — 3 planets)
  {
    id: 'databricks',
    name: 'Databricks',
    tier: 'Data Systems',
    role: 'Lakehouse & Volume Ingestion',
    description: 'Cloud data lakehouse integration, automated CSV volume uploads, and analytical data pipelines.',
    projects: ['CSV Template Validation'],
    orbitIndex: 4,
    orbitRadius: 315,
    angleOffset: 60,
    orbitDuration: 70,
    icon: SiDatabricks,
  },
  {
    id: 'python',
    name: 'Python',
    tier: 'Data Systems',
    role: 'Data Scripting & Automation',
    description: 'Data transformation pipelines, algorithmic scripting, and automated validation workflows.',
    projects: ['CSV Template Validation'],
    orbitIndex: 4,
    orbitRadius: 315,
    angleOffset: 180,
    orbitDuration: 70,
    icon: SiPython,
  },
  {
    id: 'git',
    name: 'Git',
    tier: 'Backend',
    role: 'Distributed Version Control',
    description: 'Structured branching workflows, pull-request reviews, and continuous deployment to Vercel.',
    projects: ['CSV Template Validation', 'LifeSync', 'CritiPlay'],
    orbitIndex: 4,
    orbitRadius: 315,
    angleOffset: 300,
    orbitDuration: 70,
    icon: SiGit,
  },
]

/**
 * Swiss-Editorial Monochrome 3D Solar System:
 * - Central Sun: GitHub monochrome core (`SiGithub`)
 * - 12 Planets: All 12 technologies from `portfolio.ts` across 4 concentric orbital rings
 * - Responsive scaling (`scale-[0.48] sm:scale-[0.75] md:scale-95 lg:scale-100`) so mobile viewports never clip outer rings
 * - Real engineering context in inspector card (applied projects & architectural role)
 * - Respects `prefers-reduced-motion`
 */
export function SolarSystem3D() {
  const reduceMotion = useReducedMotion()
  const [isPlaying, setIsPlaying] = useState(!reduceMotion)
  const [selectedPlanet, setSelectedPlanet] = useState<PlanetData | null>(null)
  const [hoveredPlanet, setHoveredPlanet] = useState<PlanetData | null>(null)
  const [activeTier, setActiveTier] = useState<PlanetTier | 'All'>('All')

  // 3D Camera Angles with Free Dragging
  const baseTiltX = 56
  const baseRotateZ = 0

  const cameraTiltX = useMotionValue(baseTiltX)
  const cameraRotateZ = useMotionValue(baseRotateZ)

  const springConfig = { damping: 28, stiffness: 160, mass: 0.6 }
  const smoothTiltX = useSpring(cameraTiltX, springConfig)
  const smoothRotateZ = useSpring(cameraRotateZ, springConfig)

  const isDragging = useRef(false)
  const dragStartPos = useRef({ x: 0, y: 0 })
  const startAngles = useRef({ tilt: baseTiltX, rot: baseRotateZ })

  const handlePointerDown = (e: React.PointerEvent) => {
    const target = e.target as HTMLElement
    if (target.closest('button') || target.closest('a')) return

    isDragging.current = true
    dragStartPos.current = { x: e.clientX, y: e.clientY }
    startAngles.current = {
      tilt: cameraTiltX.get(),
      rot: cameraRotateZ.get(),
    }
  }

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return
    const dx = e.clientX - dragStartPos.current.x
    const dy = e.clientY - dragStartPos.current.y

    cameraRotateZ.set(startAngles.current.rot + dx * 0.4)
    const newTilt = Math.min(Math.max(startAngles.current.tilt - dy * 0.25, 25), 75)
    cameraTiltX.set(newTilt)
  }

  const handlePointerUp = () => {
    isDragging.current = false
  }

  const resetCamera = () => {
    cameraTiltX.set(baseTiltX)
    cameraRotateZ.set(baseRotateZ)
  }

  const activeFocus = hoveredPlanet || selectedPlanet
  const isEffectivelyOrbiting = isPlaying && !selectedPlanet && !reduceMotion

  return (
    <div className="space-y-4">
      {/* Filter & Orbit Controls Sub-bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 font-mono text-xs">
        {/* Category Filter Pills (<=4 choices) */}
        <div className="flex flex-wrap items-center gap-1.5" role="group" aria-label="Filter technologies by architectural tier">
          {(['All', 'Frontend', 'Backend', 'Data Systems'] as const).map((tier) => {
            const count =
              tier === 'All'
                ? PLANETS.length
                : PLANETS.filter((p) => p.tier === tier).length
            const isActive = activeTier === tier

            return (
              <button
                key={tier}
                type="button"
                onClick={() => setActiveTier(tier)}
                className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] uppercase tracking-wider transition-colors ${
                  isActive
                    ? 'border border-fg bg-fg font-bold text-bg'
                    : 'border border-line bg-card text-muted hover:border-fg hover:text-fg'
                }`}
              >
                <span>{tier}</span>
                <span className={isActive ? 'text-bg/80' : 'text-muted'}>({count})</span>
              </button>
            )
          })}
        </div>

        {/* Playback & Camera Reset (2 focused controls) */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              if (selectedPlanet) {
                setSelectedPlanet(null)
                setIsPlaying(true)
              } else {
                setIsPlaying((p) => !p)
              }
            }}
            className="flex items-center gap-1.5 rounded-full border border-line bg-card px-3.5 py-1.5 text-[11px] uppercase tracking-wider text-fg transition-colors hover:border-fg"
            aria-label={isEffectivelyOrbiting ? 'Pause planetary orbits' : 'Resume planetary orbits'}
          >
            {isEffectivelyOrbiting ? (
              <>
                <Pause className="h-3.5 w-3.5" />
                <span>{selectedPlanet ? 'PAUSED (INSPECTING)' : 'PAUSE ORBIT'}</span>
              </>
            ) : (
              <>
                <Play className="h-3.5 w-3.5" />
                <span>{selectedPlanet ? 'RESUME ORBIT' : 'PLAY ORBIT'}</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={resetCamera}
            title="Reset 3D Perspective Angle"
            aria-label="Reset 3D Perspective Angle"
            className="flex items-center gap-1.5 rounded-full border border-line bg-card px-3 py-1.5 text-[11px] uppercase tracking-wider text-muted transition-colors hover:border-fg hover:text-fg"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">RESET ANGLE</span>
          </button>
        </div>
      </div>

      {/* 3D SOLAR ORRERY ARENA */}
      <div
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        className="relative flex h-[500px] w-full touch-pan-y items-center justify-center overflow-hidden rounded-3xl border border-line bg-card select-none cursor-grab active:cursor-grabbing [perspective:1400px] sm:h-[620px]"
      >
        {/* Top-Left Instruction Cue */}
        <div className="pointer-events-none absolute top-4 left-4 z-20 flex items-center gap-2 rounded-full border border-line bg-bg/90 px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-wider text-muted backdrop-blur-sm">
          <Compass className="h-3.5 w-3.5 text-fg" />
          <span>DRAG TO TILT 3D • TAP NODE TO INSPECT</span>
        </div>

        {/* Responsive Scale Wrapper so 630px orbit disk never clips on 320px-375px mobile */}
        <div className="flex items-center justify-center scale-[0.47] sm:scale-[0.74] md:scale-90 lg:scale-100 transition-transform duration-300 [transform-style:preserve-3d]">
          {/* 3D ROTATING ORRERY DISK */}
          <motion.div
            style={{
              rotateX: smoothTiltX,
              rotateZ: smoothRotateZ,
              transformStyle: 'preserve-3d',
            }}
            className="relative flex items-center justify-center [transform-style:preserve-3d]"
          >
            {/* 4 Concentric Editorial Orbital Rings */}
            {[110, 175, 245, 315].map((radius, idx) => (
              <div
                key={radius}
                style={{
                  width: `${radius * 2}px`,
                  height: `${radius * 2}px`,
                  transform: `translateZ(${idx * -2}px)`,
                }}
                className="pointer-events-none absolute rounded-full border border-line transition-colors"
              >
                <div className="absolute inset-0 rounded-full border border-dashed border-line/50" />
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded bg-card px-2 font-mono text-[11px] uppercase tracking-widest text-muted">
                  0{idx + 1}
                </span>
              </div>
            ))}

            {/* ======================================================== */}
            {/* THE SUN: SWISS-EDITORIAL MONOCHROME GITHUB CORE          */}
            {/* ======================================================== */}
            <div
              className="group relative z-30 flex items-center justify-center [transform-style:preserve-3d]"
              style={{ transform: 'translateZ(16px)' }}
            >
              {/* Outer Editorial Hairline Ring */}
              <div className="pointer-events-none absolute h-28 w-28 rounded-full border border-dashed border-line" />
              <div className="pointer-events-none absolute h-22 w-22 rounded-full border border-line bg-bg/60" />

              {/* Core GitHub Hub Button */}
              <a
                href="https://github.com/Kyunn17"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub Central Repository Hub — Open @Kyunn17 Profile"
                className="relative flex h-16 w-16 items-center justify-center rounded-full border-2 border-line bg-fg text-bg shadow-xl transition-transform duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-fg"
              >
                <SiGithub className="h-8 w-8 fill-current" aria-hidden="true" />

                <div className="pointer-events-none absolute -bottom-8 whitespace-nowrap rounded-md border border-line bg-bg px-2.5 py-0.5 font-mono text-[11px] font-bold tracking-wider text-fg uppercase shadow-sm">
                  GITHUB // CORE
                </div>
              </a>
            </div>

            {/* ======================================================== */}
            {/* THE PLANETS: 12 TECH STACK NODES                         */}
            {/* ======================================================== */}
            {PLANETS.map((planet) => {
              const isHovered = hoveredPlanet?.id === planet.id
              const isSelected = selectedPlanet?.id === planet.id
              const isHighlighted = isHovered || isSelected
              const isFilteredOut = activeTier !== 'All' && planet.tier !== activeTier
              const PlanetIcon = planet.icon

              return (
                <div
                  key={planet.id}
                  style={{
                    width: `${planet.orbitRadius * 2}px`,
                    height: `${planet.orbitRadius * 2}px`,
                    animation: `orbitSpin ${planet.orbitDuration}s linear infinite`,
                    animationPlayState: isEffectivelyOrbiting ? 'running' : 'paused',
                    opacity: isFilteredOut ? 0.2 : 1,
                    transition: 'opacity 0.3s ease',
                  }}
                  className="pointer-events-none absolute rounded-full [transform-style:preserve-3d]"
                >
                  <div
                    style={{
                      transform: `rotate(${planet.angleOffset}deg) translateX(${planet.orbitRadius}px)`,
                    }}
                    className="pointer-events-auto absolute top-1/2 left-1/2 -mt-6 -ml-6 flex h-12 w-12 items-center justify-center [transform-style:preserve-3d]"
                  >
                    <motion.div
                      style={{
                        transform: 'rotateX(-56deg)',
                      }}
                      className="relative flex flex-col items-center [transform-style:preserve-3d]"
                    >
                      {/* 48px Touch-First Node Button */}
                      <button
                        type="button"
                        onClick={() =>
                          setSelectedPlanet((prev) => (prev?.id === planet.id ? null : planet))
                        }
                        onPointerEnter={() => setHoveredPlanet(planet)}
                        onPointerLeave={() => setHoveredPlanet(null)}
                        className={`group relative flex h-12 w-12 items-center justify-center rounded-full border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-fg ${
                          isHighlighted
                            ? 'scale-125 border-fg bg-fg text-bg shadow-xl z-40'
                            : 'border-line bg-bg text-fg hover:scale-110 hover:border-fg shadow-md'
                        }`}
                        aria-label={`${planet.name} (${planet.tier}) — Click to inspect project usage`}
                      >
                        <PlanetIcon className="relative z-10 h-5 w-5 transition-transform group-hover:scale-110" />
                      </button>

                      {/* Readable 11px Label Pill */}
                      <div
                        className={`pointer-events-none mt-1.5 whitespace-nowrap rounded-full px-2.5 py-0.5 font-mono text-[11px] font-bold uppercase tracking-wider transition-all duration-200 ${
                          isHighlighted
                            ? 'bg-fg text-bg shadow-sm'
                            : 'border border-line bg-bg/95 text-fg'
                        }`}
                      >
                        {planet.name}
                      </div>
                    </motion.div>
                  </div>
                </div>
              )
            })}
          </motion.div>
        </div>

        {/* ======================================================== */}
        {/* 3. ENGINEERING INSPECTOR CARD (Real Project Telemetry)   */}
        {/* ======================================================== */}
        <AnimatePresence>
          {activeFocus && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="absolute top-14 right-3 left-3 z-40 rounded-2xl border border-line bg-bg/95 p-4 shadow-2xl backdrop-blur-md sm:top-4 sm:left-auto sm:right-4 sm:w-full sm:max-w-sm sm:p-5"
            >
              <div className="flex items-center justify-between border-b border-line pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-line bg-card text-fg">
                    <activeFocus.icon className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <h3 className="font-display text-base font-bold uppercase text-fg">
                      {activeFocus.name}
                    </h3>
                    <span className="font-mono text-[11px] text-accent">
                      {activeFocus.role}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <span className="rounded-full border border-line bg-card px-2.5 py-0.5 font-mono text-[11px] uppercase tracking-wider text-muted">
                    {activeFocus.tier}
                  </span>
                  {selectedPlanet && (
                    <button
                      type="button"
                      onClick={() => setSelectedPlanet(null)}
                      className="rounded-full p-1 text-muted hover:bg-card hover:text-fg"
                      aria-label="Close inspector"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>

              <p className="mt-3 text-xs font-light leading-relaxed text-muted">
                {activeFocus.description}
              </p>

              {/* Verifiable Project Usage instead of fake orbit numbers */}
              <div className="mt-3.5 border-t border-line pt-3 font-mono text-[11px]">
                <span className="block uppercase text-muted">APPLIED IN PRODUCTION WORKS:</span>
                <div className="mt-1.5 flex flex-wrap gap-1.5">
                  {activeFocus.projects.map((proj) => (
                    <a
                      key={proj}
                      href="#projects"
                      className="rounded-md border border-line bg-card px-2 py-0.5 text-[11px] font-semibold text-fg transition-colors hover:border-fg"
                    >
                      {proj}
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ======================================================== */}
        {/* 4. BOTTOM DIRECT-SELECT BAR (Accessible Mobile Touch)    */}
        {/* ======================================================== */}
        <div className="absolute bottom-3 left-3 right-3 z-30 sm:bottom-4 sm:left-4 sm:right-4">
          <div className="flex w-full items-center gap-2 overflow-x-auto rounded-2xl border border-line bg-bg/90 px-3 py-2 shadow-lg backdrop-blur-md">
            {PLANETS.filter((p) => activeTier === 'All' || p.tier === activeTier).map((planet) => {
              const isItemActive =
                selectedPlanet?.id === planet.id || hoveredPlanet?.id === planet.id
              const PlanetIcon = planet.icon

              return (
                <button
                  key={planet.id}
                  type="button"
                  onClick={() =>
                    setSelectedPlanet((prev) => (prev?.id === planet.id ? null : planet))
                  }
                  onPointerEnter={() => setHoveredPlanet(planet)}
                  onPointerLeave={() => setHoveredPlanet(null)}
                  className={`flex shrink-0 items-center gap-2 rounded-xl px-3 py-1.5 font-mono text-xs transition-colors ${
                    isItemActive
                      ? 'border border-fg bg-fg font-bold text-bg'
                      : 'border border-line bg-card text-muted hover:border-fg hover:text-fg'
                  }`}
                >
                  <PlanetIcon className="h-3.5 w-3.5" />
                  <span>{planet.name}</span>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes orbitSpin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  )
}
