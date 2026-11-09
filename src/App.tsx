import { Navbar } from './components/layout/Navbar'
import { Footer } from './components/layout/Footer'
import { Hero } from './components/sections/Hero'
import { About } from './components/sections/About'
import { Projects } from './components/sections/Projects'
import { TechStack } from './components/sections/TechStack'
import { Gym } from './components/sections/Gym'
import { Contact } from './components/sections/Contact'
import { Certificates } from './components/sections/Certificates'

export default function App() {
  return (
    <div className="relative">
      {/* Accessibility Skip Link */}
      <a
        href="#hero"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-full focus:bg-fg focus:px-4 focus:py-2 focus:font-mono focus:text-xs focus:text-bg focus:shadow-lg focus:outline-none"
      >
        Skip to Content
      </a>

      {/* Subtle tactile film grain overlay */}
      <div aria-hidden className="grain-overlay pointer-events-none fixed inset-0 z-50" />

      {/* Floating minimal navbar */}
      <Navbar />

      <main>
        {/* 1. Hero */}
        <Hero />

        {/* 2. About Me */}
        <About />

        {/* 3. Selected Projects */}
        <Projects />

        {/* 4. Tech Stack */}
        <TechStack />

        {/* 5. Gym Experience */}
        <Gym />

        {/* 6. Certificates */}
        <Certificates />

        {/* 7. Social Media / Connect */}
        <Contact />
      </main>

      {/* Minimal Footer */}
      <Footer />
    </div>
  )
}
