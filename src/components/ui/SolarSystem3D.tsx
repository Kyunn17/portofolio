import { useState, useRef, type ComponentType } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react'
import { Pause, Play, Sparkles, Orbit, Grid, ExternalLink } from 'lucide-react'
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

export type PlanetData = {
  id: string
  name: string
  tier: 'Frontend' | 'Backend' | 'Data Systems'
  description: string
  orbitIndex: number // 1 to 4
  orbitRadius: number // px on desktop
  angleOffset: number // initial degree 0 - 360
  orbitDuration: number // seconds per revolution
  icon: ComponentType<{ className?: string }>
}

export const PLANETS: PlanetData[] = [
  // Orbit 1: Core Systems (Inner orbit)
  {
    id: 'ts',
    name: 'TypeScript',
    tier: 'Frontend',
    description: 'Strict type safety, robust interfaces & clean architecture',
    orbitIndex: 1,
    orbitRadius: 105,
    angleOffset: 45,
    orbitDuration: 22,
    icon: SiTypescript,
  },
  {
    id: 'react',
    name: 'React',
    tier: 'Frontend',
    description: 'Component lifecycles, hooks & reactive state management',
    orbitIndex: 1,
    orbitRadius: 105,
    angleOffset: 225,
    orbitDuration: 22,
    icon: SiReact,
  },

  // Orbit 2: Application Frameworks
  {
    id: 'nextjs',
    name: 'Next.js',
    tier: 'Frontend',
    description: 'Server-side rendering, App Router & edge deployment',
    orbitIndex: 2,
    orbitRadius: 175,
    angleOffset: 0,
    orbitDuration: 34,
    icon: SiNextdotjs,
  },
  {
    id: 'tailwind',
    name: 'Tailwind CSS',
    tier: 'Frontend',
    description: 'Utility-first tokens, dark/clean themes & fluid layouts',
    orbitIndex: 2,
    orbitRadius: 175,
    angleOffset: 120,
    orbitDuration: 34,
    icon: SiTailwindcss,
  },
  {
    id: 'laravel',
    name: 'Laravel',
    tier: 'Backend',
    description: 'Modular MVC backend architecture, Eloquent ORM & APIs',
    orbitIndex: 2,
    orbitRadius: 175,
    angleOffset: 240,
    orbitDuration: 34,
    icon: SiLaravel,
  },

  // Orbit 3: Engines & Databases
  {
    id: 'postgres',
    name: 'PostgreSQL',
    tier: 'Backend',
    description: 'Relational data modeling, ACID transactions & schemas',
    orbitIndex: 3,
    orbitRadius: 245,
    angleOffset: 60,
    orbitDuration: 48,
    icon: SiPostgresql,
  },
  {
    id: 'php',
    name: 'PHP',
    tier: 'Backend',
    description: 'Object-oriented server scripting & request lifecycle',
    orbitIndex: 3,
    orbitRadius: 245,
    angleOffset: 180,
    orbitDuration: 48,
    icon: SiPhp,
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    tier: 'Frontend',
    description: 'Modern ESNext standards, asynchronous I/O & events',
    orbitIndex: 3,
    orbitRadius: 245,
    angleOffset: 300,
    orbitDuration: 48,
    icon: SiJavascript,
  },

  // Orbit 4: Data Systems & Cloud Infrastructure
  {
    id: 'databricks',
    name: 'Databricks',
    tier: 'Data Systems',
    description: 'Lakehouse analytics, ETL pipelines & distributed compute',
    orbitIndex: 4,
    orbitRadius: 315,
    angleOffset: 30,
    orbitDuration: 64,
    icon: SiDatabricks,
  },
  {
    id: 'python',
    name: 'Python',
    tier: 'Data Systems',
    description: 'Data transformation, programmatic scripts & automation',
    orbitIndex: 4,
    orbitRadius: 315,
    angleOffset: 150,
    orbitDuration: 64,
    icon: SiPython,
  },
  {
    id: 'git',
    name: 'Git',
    tier: 'Backend',
    description: 'Distributed version control, branching & release pipelines',
    orbitIndex: 4,
    orbitRadius: 315,
    angleOffset: 270,
    orbitDuration: 64,
    icon: SiGit,
  },
]

type SolarSystem3DProps = {
  activeView: 'solar' | 'grid'
  onViewChange: (view: 'solar' | 'grid') => void
}

/**
 * 3D Solar System component where:
 * - Central Sun: Glowing GitHub logo (source of all code and commits)
 * - Planets: Tech stack technologies orbiting at calculated radii and velocities
 * - Interactive 3D tilt responding to cursor movement
 * - Planet hover telemetry card with details and category
 */
export function SolarSystem3D({ activeView, onViewChange }: SolarSystem3DProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isPlaying, setIsPlaying] = useState(true)
  const [selectedPlanet, setSelectedPlanet] = useState<PlanetData | null>(null)
  const [hoveredPlanet, setHoveredPlanet] = useState<PlanetData | null>(null)

  // Cursor 3D tilt tracking
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Spring physics for tilt: 3D perspective angle
  const springCfg = { damping: 25, stiffness: 180, mass: 0.8 }
  const tiltX = useSpring(useTransform(mouseY, [-0.5, 0.5], [64, 48]), springCfg) // Base ~56 deg slant
  const tiltY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-12, 12]), springCfg)

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    mouseX.set(x)
    mouseY.set(y)
  }

  const handlePointerLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  const activeFocus = hoveredPlanet || selectedPlanet

  return (
    <div className="space-y-6">
      {/* Interactive Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line pb-4 font-mono text-xs">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 rounded-full border border-line bg-card px-3 py-1 text-muted">
            <span className="h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
            <span className="text-fg font-semibold uppercase">ORBITAL SYSTEM</span>
            <span>// 11 PLANETS</span>
          </div>
          <button
            type="button"
            onClick={() => setIsPlaying((p) => !p)}
            className="flex items-center gap-1.5 rounded-full border border-line bg-card px-3 py-1 text-muted transition-colors hover:border-fg hover:text-fg"
            aria-label={isPlaying ? 'Pause planetary orbits' : 'Resume planetary orbits'}
          >
            {isPlaying ? (
              <>
                <Pause className="h-3 w-3" />
                <span>PAUSE ORBITS</span>
              </>
            ) : (
              <>
                <Play className="h-3 w-3" />
                <span>RESUME</span>
              </>
            )}
          </button>
        </div>

        {/* View Switcher: 3D Solar System vs List Grid */}
        <div className="flex items-center gap-1 rounded-full border border-line bg-card p-1">
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
            <span>GRID VIEW</span>
          </button>
        </div>
      </div>

      {/* 3D Solar Arena */}
      <div
        ref={containerRef}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        className="relative flex h-[580px] w-full items-center justify-center overflow-hidden rounded-3xl border border-line bg-card/60 select-none [perspective:1400px] sm:h-[640px]"
      >
        {/* Subtle celestial radial lighting */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.04)_0%,transparent_70%)]" />

        {/* Dynamic 3D Solar Disk Container (Tilted in 3D Space) */}
        <motion.div
          style={{
            rotateX: tiltX,
            rotateZ: tiltY,
            transformStyle: 'preserve-3d',
          }}
          className="relative flex items-center justify-center [transform-style:preserve-3d]"
        >
          {/* 4 Concentric Orbital Rings */}
          {[105, 175, 245, 315].map((radius, idx) => (
            <div
              key={radius}
              style={{
                width: `${radius * 2}px`,
                height: `${radius * 2}px`,
              }}
              className="pointer-events-none absolute rounded-full border border-line/50 transition-colors"
            >
              {/* Subtle orbital ring dash accent */}
              <div className="absolute inset-0 rounded-full border border-dashed border-line/30" />
              {/* Ring label */}
              <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-card px-2 font-mono text-[8px] uppercase tracking-widest text-muted/60">
                RING 0{idx + 1}
              </span>
            </div>
          ))}

          {/* ========================================================= */}
          {/* THE SUN: CENTRAL GITHUB ENGINE                            */}
          {/* ========================================================= */}
          <div
            className="group relative z-30 flex items-center justify-center [transform-style:preserve-3d]"
            style={{ transform: 'translateZ(10px)' }}
          >
            {/* Outer solar corona pulse */}
            <div className="absolute h-28 w-28 animate-ping rounded-full bg-amber-400/10 [animation-duration:4s]" />
            <div className="absolute h-24 w-24 rounded-full bg-amber-500/20 blur-xl" />
            <div className="absolute h-20 w-20 rounded-full border border-amber-400/40 shadow-[0_0_40px_rgba(251,191,36,0.35)]" />

            {/* Solar Core Button (Links to GitHub) */}
            <a
              href="https://github.com/Kyunn17"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub Sun Core - View Khairul Faridz GitHub"
              className="relative flex h-16 w-16 items-center justify-center rounded-full border-2 border-amber-300 bg-gradient-to-tr from-amber-600 via-amber-400 to-amber-200 text-black shadow-2xl transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-amber-400"
            >
              {/* GitHub Official Logo */}
              <SiGithub className="h-8 w-8 fill-current drop-shadow" aria-hidden="true" />

              {/* Sun Flare Label */}
              <div className="pointer-events-none absolute -bottom-7 rounded-md border border-amber-500/30 bg-black/80 px-2 py-0.5 font-mono text-[9px] font-bold tracking-wider text-amber-300 uppercase backdrop-blur-sm">
                GITHUB // CORE
              </div>
            </a>
          </div>

          {/* ========================================================= */}
          {/* THE PLANETS: TECH STACK ORBITS                           */}
          {/* ========================================================= */}
          {PLANETS.map((planet) => {
            const isHovered = hoveredPlanet?.id === planet.id
            const isSelected = selectedPlanet?.id === planet.id
            const isHighlighted = isHovered || isSelected
            const PlanetIcon = planet.icon

            return (
              <div
                key={planet.id}
                style={{
                  width: `${planet.orbitRadius * 2}px`,
                  height: `${planet.orbitRadius * 2}px`,
                  animation: `orbitRotate ${planet.orbitDuration}s linear infinite`,
                  animationPlayState: isPlaying ? 'running' : 'paused',
                }}
                className="pointer-events-none absolute rounded-full [transform-style:preserve-3d]"
              >
                {/* Planet Placement on the Ring */}
                <div
                  style={{
                    transform: `rotate(${planet.angleOffset}deg) translateX(${planet.orbitRadius}px)`,
                  }}
                  className="pointer-events-auto absolute top-1/2 left-1/2 -mt-4.5 -ml-4.5 flex h-9 w-9 items-center justify-center [transform-style:preserve-3d]"
                >
                  {/* Counter-rotate so planet always faces camera upright */}
                  <motion.button
                    type="button"
                    onClick={() =>
                      setSelectedPlanet((prev) => (prev?.id === planet.id ? null : planet))
                    }
                    onPointerEnter={() => setHoveredPlanet(planet)}
                    onPointerLeave={() => setHoveredPlanet(null)}
                    style={{
                      transform: 'rotateX(-56deg)', // Counter the solar system base tilt
                    }}
                    className={`group relative flex h-9 w-9 items-center justify-center rounded-full border transition-all duration-300 focus:outline-none ${
                      isHighlighted
                        ? 'scale-125 border-fg bg-fg text-bg shadow-[0_0_20px_rgba(255,255,255,0.4)]'
                        : 'border-line bg-card text-fg hover:scale-110 hover:border-fg'
                    }`}
                    aria-label={`Planet ${planet.name} (${planet.tier})`}
                  >
                    {/* Planetary body official logo */}
                    <PlanetIcon className="h-4.5 w-4.5 transition-transform group-hover:scale-110" />

                    {/* Planet Mini Label */}
                    <span
                      className={`pointer-events-none absolute -bottom-5 whitespace-nowrap rounded px-1.5 py-0.2 font-mono text-[8px] uppercase tracking-wider transition-opacity duration-200 ${
                        isHighlighted
                          ? 'bg-fg text-bg opacity-100'
                          : 'bg-card/90 text-muted opacity-70 group-hover:opacity-100'
                      }`}
                    >
                      {planet.name}
                    </span>
                  </motion.button>
                </div>
              </div>
            )
          })}
        </motion.div>

        {/* ========================================================= */}
        {/* HUD / TELEMETRY INSPECTOR CARD                           */}
        {/* ========================================================= */}
        <div className="pointer-events-none absolute bottom-4 left-4 right-4 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-end">
          {activeFocus ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="pointer-events-auto max-w-sm rounded-2xl border border-line bg-bg/95 p-4 shadow-2xl backdrop-blur-md"
            >
              <div className="flex items-center justify-between gap-3 border-b border-line pb-2 font-mono text-xs">
                <span className="flex items-center gap-1.5 font-bold uppercase text-fg">
                  <Sparkles className="h-3 w-3 text-accent" />
                  {activeFocus.name}
                </span>
                <span className="rounded border border-line bg-card px-2 py-0.5 text-[9px] uppercase text-muted">
                  {activeFocus.tier}
                </span>
              </div>
              <p className="mt-2 text-xs font-light text-muted leading-relaxed">
                {activeFocus.description}
              </p>
              <div className="mt-3 flex items-center justify-between font-mono text-[10px] text-muted border-t border-line/60 pt-2">
                <span>ORBIT RADIUS: {activeFocus.orbitRadius}PX</span>
                <span>VELOCITY: {activeFocus.orbitDuration}S/REV</span>
              </div>
            </motion.div>
          ) : (
            <div className="rounded-xl border border-line bg-bg/70 px-3.5 py-2 font-mono text-[11px] text-muted backdrop-blur-sm">
              ✦ Hover or tap any planet to inspect telemetry • Drag to tilt in 3D
            </div>
          )}

          {/* GitHub Sun Link Pill */}
          <a
            href="https://github.com/Kyunn17"
            target="_blank"
            rel="noreferrer"
            className="pointer-events-auto inline-flex items-center gap-2 rounded-full border border-line bg-card px-4 py-2 font-mono text-xs text-muted transition-colors hover:border-fg hover:text-fg"
          >
            <span>GitHub Core Engine</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>

      {/* Global CSS animation for continuous orbit revolution */}
      <style>{`
        @keyframes orbitRotate {
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
