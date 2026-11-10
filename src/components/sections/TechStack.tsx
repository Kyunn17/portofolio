import { useState } from 'react'
import { Orbit, Grid } from 'lucide-react'
import { Reveal } from '../ui/Reveal'
import { SectionHeader } from '../ui/SectionHeader'
import { SolarSystem3D } from '../ui/SolarSystem3D'
import { sectionIndex, techClusters } from '../../data/portfolio'

export function TechStack() {
  const [activeView, setActiveView] = useState<'solar' | 'grid'>('solar')

  return (
    <section id="stack" className="section-shell">
      <SectionHeader
        index={sectionIndex('stack')}
        kicker="CAPABILITIES &amp; ECOSYSTEM"
        title="TOOLS I WORK WITH."
        aside={
          <div className="flex flex-col items-start gap-3 md:items-end">
            <span>
              A targeted stack honed for modern reliability, frontend responsiveness, and scalable backend infrastructure.
            </span>
            {/* Clean View Switcher */}
            <div
              role="group"
              aria-label="Switch tech stack view mode"
              className="inline-flex items-center gap-1 rounded-full border border-line bg-card p-1 font-mono text-xs"
            >
              <button
                type="button"
                onClick={() => setActiveView('solar')}
                className={`flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[11px] uppercase tracking-wider transition-colors ${
                  activeView === 'solar'
                    ? 'bg-fg font-bold text-bg shadow-xs'
                    : 'text-muted hover:text-fg'
                }`}
              >
                <Orbit className="h-3.5 w-3.5" />
                <span>3D Solar</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveView('grid')}
                className={`flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[11px] uppercase tracking-wider transition-colors ${
                  activeView === 'grid'
                    ? 'bg-fg font-bold text-bg shadow-xs'
                    : 'text-muted hover:text-fg'
                }`}
              >
                <Grid className="h-3.5 w-3.5" />
                <span>Grid Matrix</span>
              </button>
            </div>
          </div>
        }
      />

      {activeView === 'solar' ? (
        <Reveal>
          <SolarSystem3D />
        </Reveal>
      ) : (
        <div className="space-y-12">
          {techClusters.map((cluster, cIndex) => (
            <Reveal key={cluster.tier} delay={cIndex * 0.08}>
              <div className="space-y-4">
                <div className="flex flex-col justify-between gap-1 border-b border-line pb-2 sm:flex-row sm:items-baseline">
                  <h3 className="font-display text-lg font-bold uppercase tracking-tight text-fg">
                    {cluster.tier}
                  </h3>
                  <span className="font-mono text-xs text-muted">{cluster.tagline}</span>
                </div>

                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                  {cluster.items.map((item) => {
                    const Icon = item.icon

                    return (
                      <div
                        key={item.name}
                        className="group flex flex-col justify-between rounded-2xl border border-line bg-card p-5 transition-colors hover:border-fg"
                      >
                        <div className="flex items-center justify-between text-muted transition-colors group-hover:text-fg">
                          <Icon className="h-5 w-5" />
                        </div>
                        <div className="pt-4">
                          <h4 className="font-display text-base font-bold text-fg">{item.name}</h4>
                          <p className="mt-1 font-mono text-xs text-muted">{item.note}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      )}
    </section>
  )
}
