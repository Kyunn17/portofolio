import { Reveal } from '../ui/Reveal'
import { SectionHeader } from '../ui/SectionHeader'
import { sectionIndex, techStack } from '../../data/portfolio'

export function TechStack() {
  return (
    <section id="stack" className="section-shell">
      <SectionHeader
        index={sectionIndex('stack')}
        kicker="CAPABILITIES"
        title="TOOLS I WORK WITH."
        aside="A targeted stack honed for modern reliability, frontend responsiveness, and scalable backend infrastructure."
      />

      <Reveal>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {techStack.map((item, index) => {
            const Icon = item.icon
            const num = String(index + 1).padStart(2, '0')
            const isLast = index === techStack.length - 1

            return (
              <div
                key={item.name}
                className={`group flex h-40 flex-col justify-between rounded-2xl border border-line bg-card p-5 transition-all hover:border-fg ${
                  isLast ? 'sm:col-span-2 md:col-span-1' : ''
                }`}
              >
                <div className="flex items-center justify-between text-muted transition-colors group-hover:text-fg">
                  <Icon className="h-5 w-5" />
                  <span className="font-mono text-[10px]">{num}</span>
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold text-fg">{item.name}</h3>
                  <p className="mt-1 font-mono text-xs text-muted">{item.note}</p>
                </div>
              </div>
            )
          })}
        </div>
      </Reveal>
    </section>
  )
}

