import { useState, useRef, type ComponentType } from 'react'
import { motion, useMotionValue, useSpring, AnimatePresence } from 'motion/react'
import {
  Pause,
  Play,
  RotateCcw,
  Orbit,
  Grid,
  X,
  Compass,
} from 'lucide-react'
import {
  SiGithub,
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiTailwindcss,
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
  description: string
  role: string
  orbitIndex: number // 1 to 4
  orbitRadius: number // px on desktop
  angleOffset: number // initial degree 0 - 360
  orbitDuration: number // seconds per revolution
  icon: ComponentType<{ className?: string }>
}

export const PLANETS: PlanetData[] = [
  // Orbit 1: Core Foundation (Inner)
  {
    id: 'ts',
    name: 'TypeScript',
    tier: 'Frontend',
    role: 'Strict Typing & Safe Contracts',
    description: 'Enforces type-safe domain models, robust interfaces, and predictable refactoring across full-stack applications.',
    orbitIndex: 1,
    orbitRadius: 110,
    angleOffset: 30,
    orbitDuration: 24,
    icon: SiTypescript,
  },
  {
    id: 'react',
    name: 'React',
    tier: 'Frontend',
    role: 'Declarative State & Reactive UI',
    description: 'Component lifecycles, custom hooks, micro-animations, and composable client architectures.',
    orbitIndex: 1,
    orbitRadius: 110,
    angleOffset: 210,
    orbitDuration: 24,
    icon: SiReact,
  },

  // Orbit 2: Application Frameworks
  {
    id: 'nextjs',
    name: 'Next.js',
    tier: 'Frontend',
    role: 'Full-Stack SSR & App Router',
    description: 'Server components, edge rendering, SEO optimization, and unified API endpoints.',
    orbitIndex: 2,
    orbitRadius: 175,
    angleOffset: 0,
    orbitDuration: 36,
    icon: SiNextdotjs,
  },
  {
    id: 'tailwind',
    name: 'Tailwind CSS',
    tier: 'Frontend',
    role: 'Design Tokens & Fluid Layouts',
    description: 'Utility-first typography, bespoke dark/clean theme systems, and responsive editorial layout grids.',
    orbitIndex: 2,
    orbitRadius: 175,
    angleOffset: 120,
    orbitDuration: 36,
    icon: SiTailwindcss,
  },
  {
    id: 'laravel',
    name: 'Laravel',
    tier: 'Backend',
    role: 'MVC Framework & REST API Core',
    description: 'Architecting scalable business services, database migrations, authentication, and secure session management.',
    orbitIndex: 2,
    orbitRadius: 175,
    angleOffset: 240,
    orbitDuration: 36,
    icon: SiLaravel,
  },

  // Orbit 3: Engines & Data Stores
  {
    id: 'postgres',
    name: 'PostgreSQL',
    tier: 'Backend',
    role: 'Relational Modeling & Transactions',
    description: 'ACID-compliant relational schemas, indexed queries, complex joins, and transactional consistency.',
    orbitIndex: 3,
    orbitRadius: 245,
    angleOffset: 50,
    orbitDuration: 50,
    icon: SiPostgresql,
  },
  {
    id: 'php',
    name: 'PHP',
    tier: 'Backend',
    role: 'Server Runtime & Request Lifecycle',
    description: 'Object-oriented server services, backend middlewares, and REST API controllers.',
    orbitIndex: 3,
    orbitRadius: 245,
    angleOffset: 170,
    orbitDuration: 50,
    icon: SiPhp,
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    tier: 'Frontend',
    role: 'ESNext Scripting & Async I/O',
    description: 'Event-driven browser interfaces, DOM manipulation, asynchronous promises, and real-time data streaming.',
    orbitIndex: 3,
    orbitRadius: 245,
    angleOffset: 290,
    orbitDuration: 50,
    icon: SiJavascript,
  },

  // Orbit 4: Data Systems & Cloud Infrastructure (Outer)
  {
    id: 'databricks',
    name: 'Databricks',
    tier: 'Data Systems',
    role: 'Lakehouse Analytics & ETL Pipelines',
    description: 'Ingesting large-scale CSV volumes, automated schema validation, and cloud data warehousing.',
    orbitIndex: 4,
    orbitRadius: 320,
    angleOffset: 40,
    orbitDuration: 68,
    icon: SiDatabricks,
  },
  {
    id: 'python',
    name: 'Python',
    tier: 'Data Systems',
    role: 'Automation & Data Engineering',
    description: 'Programmatic automation scripts, schema validation logic, and data transformation routines.',
    orbitIndex: 4,
    orbitRadius: 320,
    angleOffset: 160,
    orbitDuration: 68,
    icon: SiPython,
  },
  {
    id: 'git',
    name: 'Git',
    tier: 'Backend',
    role: 'Version Control & Deployment Flow',
    description: 'Branch protection strategies, continuous integration pipelines, and release management.',
    orbitIndex: 4,
    orbitRadius: 320,
    angleOffset: 280,
    orbitDuration: 68,
    icon: SiGit,
  },
]

type SolarSystem3DProps = {
  activeView: 'solar' | 'grid'
  onViewChange: (view: 'solar' | 'grid') => void
}

/**
 * Enhanced 3D Solar System Tech Stack:
 * - Truly 3D: Free-drag camera rotation (orbit controls), depth perspective, atmospheric planetary spheres.
 * - Dynamic: Variable speed multipliers, active pause on selection, smooth inertia.
 * - Touch-First & Effortlessly Visible: Minimum 48px touch targets, always-accessible bottom tech dock, category filter tabs.
 */
export function SolarSystem3D({ activeView, onViewChange }: SolarSystem3DProps) {
  const arenaRef = useRef<HTMLDivElement>(null)

  // Interactive Playback State
  const [isPlaying, setIsPlaying] = useState(true)
  const [speedMultiplier, setSpeedMultiplier] = useState<number>(1)
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

  // Dragging State
  const isDragging = useRef(false)
  const dragStartPos = useRef({ x: 0, y: 0 })
  const startAngles = useRef({ tilt: baseTiltX, rot: baseRotateZ })

  const handlePointerDown = (e: React.PointerEvent) => {
    // Only drag if not clicking a button directly
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

    // Horizontal drag rotates the system in 3D (rotateZ)
    const newRot = startAngles.current.rot + dx * 0.4
    cameraRotateZ.set(newRot)

    // Vertical drag tilts the camera angle (clamped between 25 and 75 deg)
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

  return (
    <div className="space-y-6">
      {/* ============================================================ */}
      {/* 1. TOP CONTROLS & FILTER BAR                                */}
      {/* ============================================================ */}
      <div className="flex flex-col gap-4 border-b border-line pb-4 font-mono text-xs sm:flex-row sm:items-center sm:justify-between">
        {/* Tier Filter Tabs */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-[11px] uppercase tracking-wider text-muted mr-1 hidden sm:inline">
            FILTER:
          </span>
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
                className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] uppercase tracking-wider transition-all ${
                  isActive
                    ? 'border border-fg bg-fg font-bold text-bg shadow-sm'
                    : 'border border-line bg-card text-muted hover:border-fg/50 hover:text-fg'
                }`}
              >
                <span>{tier}</span>
                <span className={`text-[9px] ${isActive ? 'text-bg/80' : 'text-muted'}`}>
                  ({count})
                </span>
              </button>
            )
          })}
        </div>

        {/* Orbit Speed & View Modes */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Play/Pause */}
          <button
            type="button"
            onClick={() => setIsPlaying((p) => !p)}
            className="flex items-center gap-1.5 rounded-full border border-line bg-card px-3 py-1 text-muted transition-colors hover:border-fg hover:text-fg"
            aria-label={isPlaying ? 'Pause planetary orbits' : 'Resume planetary orbits'}
          >
            {isPlaying ? (
              <>
                <Pause className="h-3 w-3" />
                <span className="hidden sm:inline">PAUSE</span>
              </>
            ) : (
              <>
                <Play className="h-3 w-3" />
                <span className="hidden sm:inline">RESUME</span>
              </>
            )}
          </button>

          {/* Speed Toggles */}
          <div className="flex items-center rounded-full border border-line bg-card p-0.5">
            {[0.5, 1, 2].map((spd) => (
              <button
                key={spd}
                type="button"
                onClick={() => setSpeedMultiplier(spd)}
                className={`rounded-full px-2 py-0.5 text-[10px] uppercase transition-colors ${
                  speedMultiplier === spd
                    ? 'bg-fg font-bold text-bg'
                    : 'text-muted hover:text-fg'
                }`}
              >
                {spd}x
              </button>
            ))}
          </div>

          {/* Reset Camera Angle */}
          <button
            type="button"
            onClick={resetCamera}
            title="Reset 3D Camera Angle"
            className="flex h-7 w-7 items-center justify-center rounded-full border border-line bg-card text-muted transition-colors hover:border-fg hover:text-fg"
          >
            <RotateCcw className="h-3 w-3" />
          </button>

          {/* View Switcher: 3D Solar vs Grid */}
          <div className="flex items-center gap-1 rounded-full border border-line bg-card p-1 ml-1">
            <button
              type="button"
              onClick={() => onViewChange('solar')}
              className={`flex items-center gap-1.5 rounded-full px-3 py-1 transition-colors ${
                activeView === 'solar'
                  ? 'bg-fg font-bold text-bg shadow-sm'
                  : 'text-muted hover:text-fg'
              }`}
            >
              <Orbit className="h-3.5 w-3.5" />
              <span>3D SOLAR</span>
            </button>
            <button
              type="button"
              onClick={() => onViewChange('grid')}
              className={`flex items-center gap-1.5 rounded-full px-3 py-1 transition-colors ${
                activeView === 'grid'
                  ? 'bg-fg font-bold text-bg shadow-sm'
                  : 'text-muted hover:text-fg'
              }`}
            >
              <Grid className="h-3.5 w-3.5" />
              <span>GRID</span>
            </button>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 2. 3D SOLAR SYSTEM ARENA                                     */}
      {/* ============================================================ */}
      <div
        ref={arenaRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        className="relative flex h-[580px] w-full items-center justify-center overflow-hidden rounded-3xl border border-line bg-card/60 select-none cursor-grab active:cursor-grabbing [perspective:1400px] sm:h-[680px]"
      >
        {/* Celestial Depth Background Lighting */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.06)_0%,transparent_65%)]" />

        {/* Drag Helper Cue in Top Left */}
        <div className="pointer-events-none absolute top-4 left-4 z-20 flex items-center gap-2 rounded-full border border-line bg-bg/80 px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider text-muted backdrop-blur-md">
          <Compass className="h-3.5 w-3.5 text-accent animate-spin [animation-duration:12s]" />
          <span>DRAG TO ROTATE 3D • TAP PLANETS TO INSPECT</span>
        </div>

        {/* 3D ROTATING ORRERY DISK */}
        <motion.div
          style={{
            rotateX: smoothTiltX,
            rotateZ: smoothRotateZ,
            transformStyle: 'preserve-3d',
          }}
          className="relative flex items-center justify-center [transform-style:preserve-3d]"
        >
          {/* Concentric 3D Orbital Rings with Depth Accents */}
          {[110, 175, 245, 320].map((radius, idx) => (
            <div
              key={radius}
              style={{
                width: `${radius * 2}px`,
                height: `${radius * 2}px`,
                transform: `translateZ(${idx * -2}px)`,
              }}
              className="pointer-events-none absolute rounded-full border border-line/60 transition-colors"
            >
              {/* Concentric dashed ring line */}
              <div className="absolute inset-0 rounded-full border border-dashed border-line/30" />
              {/* Planetary Ring Label */}
              <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-card/90 px-2 font-mono text-[8px] uppercase tracking-widest text-muted/60">
                RING 0{idx + 1}
              </span>
            </div>
          ))}

          {/* ======================================================== */}
          {/* THE SUN: MULTI-LAYERED GITHUB CORE                       */}
          {/* ======================================================== */}
          <div
            className="group relative z-30 flex items-center justify-center [transform-style:preserve-3d]"
            style={{ transform: 'translateZ(18px)' }}
          >
            {/* Outer Solar Corona Plasma Wave */}
            <div className="absolute h-32 w-32 animate-ping rounded-full bg-amber-400/10 [animation-duration:4s]" />
            <div className="absolute h-28 w-28 rounded-full bg-amber-500/25 blur-2xl" />
            <div className="absolute h-24 w-24 rounded-full border-2 border-amber-300/40 shadow-[0_0_50px_rgba(251,191,36,0.45)]" />

            {/* Rotating Solar Accretion Ring */}
            <div className="absolute h-36 w-36 rounded-full border border-dashed border-amber-400/20 animate-spin [animation-duration:40s]" />

            {/* Core Sun Button */}
            <a
              href="https://github.com/Kyunn17"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub Central Engine - Open Profile"
              className="relative flex h-18 w-18 items-center justify-center rounded-full border-2 border-amber-300 bg-gradient-to-tr from-amber-600 via-amber-400 to-amber-200 text-black shadow-[0_0_40px_rgba(251,191,36,0.6)] transition-all duration-300 hover:scale-115 focus:outline-none focus:ring-4 focus:ring-amber-400/50"
            >
              {/* Official GitHub Logo */}
              <SiGithub className="h-9 w-9 fill-current drop-shadow-md" aria-hidden="true" />

              {/* Sun Solar Tag */}
              <div className="pointer-events-none absolute -bottom-7.5 whitespace-nowrap rounded-md border border-amber-500/40 bg-black/85 px-2 py-0.5 font-mono text-[9px] font-bold tracking-wider text-amber-300 uppercase shadow-md backdrop-blur-md">
                GITHUB // CENTRAL ENGINE
              </div>
            </a>
          </div>

          {/* ======================================================== */}
          {/* THE PLANETS: 11 SPHERICAL TECH STACK BODIES              */}
          {/* ======================================================== */}
          {PLANETS.map((planet) => {
            const isHovered = hoveredPlanet?.id === planet.id
            const isSelected = selectedPlanet?.id === planet.id
            const isHighlighted = isHovered || isSelected

            // Category filter state
            const isFilteredOut = activeTier !== 'All' && planet.tier !== activeTier

            // Effective orbit period considering speed multiplier
            const effectiveDuration = planet.orbitDuration / speedMultiplier
            const isOrbiting = isPlaying && !selectedPlanet // Pause smoothly if a planet is selected

            const PlanetIcon = planet.icon

            return (
              <div
                key={planet.id}
                style={{
                  width: `${planet.orbitRadius * 2}px`,
                  height: `${planet.orbitRadius * 2}px`,
                  animation: `orbitSpin ${effectiveDuration}s linear infinite`,
                  animationPlayState: isOrbiting ? 'running' : 'paused',
                  opacity: isFilteredOut ? 0.25 : 1,
                  transition: 'opacity 0.3s ease',
                }}
                className="pointer-events-none absolute rounded-full [transform-style:preserve-3d]"
              >
                {/* Planet Location on its Ring */}
                <div
                  style={{
                    transform: `rotate(${planet.angleOffset}deg) translateX(${planet.orbitRadius}px)`,
                  }}
                  className="pointer-events-auto absolute top-1/2 left-1/2 -mt-6 -ml-6 flex h-12 w-12 items-center justify-center [transform-style:preserve-3d]"
                >
                  {/* Counter-rotation to keep planet upright */}
                  <motion.div
                    style={{
                      transform: 'rotateX(-56deg)',
                    }}
                    className="relative flex flex-col items-center [transform-style:preserve-3d]"
                  >
                    {/* Generous Hitbox Button (Min 48px Touch Target) */}
                    <button
                      type="button"
                      onClick={() =>
                        setSelectedPlanet((prev) => (prev?.id === planet.id ? null : planet))
                      }
                      onPointerEnter={() => setHoveredPlanet(planet)}
                      onPointerLeave={() => setHoveredPlanet(null)}
                      className={`group relative flex h-12 w-12 items-center justify-center rounded-full border-2 transition-all duration-300 focus:outline-none ${
                        isHighlighted
                          ? 'scale-130 border-fg bg-fg text-bg shadow-[0_0_30px_rgba(255,255,255,0.6)] z-40'
                          : 'border-line/80 bg-card text-fg hover:scale-115 hover:border-fg shadow-lg'
                      }`}
                      aria-label={`Planet ${planet.name} (${planet.tier}) - Click to inspect`}
                    >
                      {/* 3D Spherical Specular Light Overlay */}
                      <div className="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(circle_at_32%_32%,rgba(255,255,255,0.35)_0%,rgba(255,255,255,0.05)_45%,rgba(0,0,0,0.5)_100%)]" />

                      {/* Official Tech Logo */}
                      <PlanetIcon className="relative z-10 h-5 w-5 drop-shadow transition-transform group-hover:scale-110" />

                      {/* Subtle Orbital Pulse Halo when highlighted */}
                      {isHighlighted && (
                        <span className="absolute inset-0 -m-1.5 animate-ping rounded-full border border-fg opacity-60" />
                      )}
                    </button>

                    {/* Highly Visible Tech Label Pill */}
                    <div
                      className={`pointer-events-none mt-1 whitespace-nowrap rounded-full px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider transition-all duration-200 ${
                        isHighlighted
                          ? 'bg-fg text-bg shadow-md scale-105'
                          : 'border border-line/60 bg-bg/90 text-fg/80 backdrop-blur-sm'
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

        {/* ======================================================== */}
        {/* 3. SPOTLIGHT TELEMETRY HUD DRAWER                        */}
        {/* ======================================================== */}
        <AnimatePresence>
          {activeFocus && (
            <motion.div
              initial={{ opacity: 0, y: 16, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.96 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="absolute top-4 right-4 z-40 w-full max-w-sm rounded-2xl border-2 border-line bg-bg/95 p-5 shadow-2xl backdrop-blur-lg sm:top-6 sm:right-6"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-line pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-card border border-line text-fg">
                    <activeFocus.icon className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <h4 className="font-display text-base font-bold uppercase text-fg">
                      {activeFocus.name}
                    </h4>
                    <span className="font-mono text-[10px] text-accent">
                      {activeFocus.role}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <span className="rounded-full border border-line bg-card px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-wider text-muted">
                    {activeFocus.tier}
                  </span>
                  {selectedPlanet && (
                    <button
                      type="button"
                      onClick={() => setSelectedPlanet(null)}
                      className="rounded-full p-1 text-muted hover:bg-card hover:text-fg"
                      aria-label="Close telemetry"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>
              </div>

              {/* Description & Capabilities */}
              <p className="mt-3 text-xs font-light leading-relaxed text-muted">
                {activeFocus.description}
              </p>

              {/* Orbital Telemetry Metrics */}
              <div className="mt-4 grid grid-cols-2 gap-2 border-t border-line/60 pt-3 font-mono text-[10px]">
                <div className="rounded-lg border border-line/60 bg-card p-2">
                  <span className="block text-muted text-[8px] uppercase">ORBIT RADIUS</span>
                  <span className="font-bold text-fg">{activeFocus.orbitRadius} PX (RING 0{activeFocus.orbitIndex})</span>
                </div>
                <div className="rounded-lg border border-line/60 bg-card p-2">
                  <span className="block text-muted text-[8px] uppercase">ORBIT VELOCITY</span>
                  <span className="font-bold text-fg">{activeFocus.orbitDuration}S / REVOLUTION</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ======================================================== */}
        {/* 4. QUICK PLANET DOCK (BOTTOM TOUCH SELECTOR)             */}
        {/* ======================================================== */}
        <div className="absolute bottom-3 left-3 right-3 z-30 flex flex-col gap-2 sm:bottom-4 sm:left-4 sm:right-4">
          {/* Horizontal Swipeable Dock */}
          <div className="flex w-full items-center gap-2 overflow-x-auto rounded-2xl border border-line bg-bg/85 px-3 py-2.5 shadow-xl backdrop-blur-md">
            <span className="shrink-0 font-mono text-[10px] font-bold uppercase tracking-wider text-muted hidden md:inline">
              TECH DOCK:
            </span>

            {PLANETS.map((planet) => {
              const isSelected = selectedPlanet?.id === planet.id
              const isHovered = hoveredPlanet?.id === planet.id
              const isItemActive = isSelected || isHovered
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
                  className={`flex shrink-0 items-center gap-2 rounded-xl px-3 py-1.5 font-mono text-xs transition-all ${
                    isItemActive
                      ? 'border border-fg bg-fg font-bold text-bg shadow-md scale-105'
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

      {/* Global CSS Keyframe for Smooth Continuous Orbit */}
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
