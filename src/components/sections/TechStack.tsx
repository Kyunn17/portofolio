import { useState } from 'react'
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
        aside="An interactive 3D solar ecosystem revolving around the GitHub central engine, engineered for reliability, responsiveness, and scalable architectures."
      />

      {activeView === 'solar' ? (
        <Reveal>
          <SolarSystem3D activeView={activeView} onViewChange={setActiveView} />
        </Reveal>
      ) : (
        <div className="space-y-10">
          <SolarSystem3D activeView={activeView} onViewChange={setActiveView} />

          <div className="space-y-12">
            {techClusters.map((cluster, cIndex) => (
              <Reveal key={cluster.tier} delay={cIndex * 0.1}>
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
                          className="group flex flex-col justify-between rounded-2xl border border-line bg-card p-5 transition-all hover:border-fg"
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
        </div>
      )}
    </section>
  )
}

