import { useCallback, useEffect, useState } from 'react'

export type Theme = 'dark' | 'clean'

const STORAGE_KEY = 'theme'

function readInitialTheme(): Theme {
  if (typeof document === 'undefined') return 'dark'
  return document.documentElement.classList.contains('clean') ? 'clean' : 'dark'
}

/** Dark (default) ↔ Clean theme, persisted to localStorage. */
export function useTheme() {
  const [theme, setTheme] = useState<Theme>(readInitialTheme)

  useEffect(() => {
    const root = document.documentElement
    root.classList.remove('dark', 'clean')
    root.classList.add(theme)
    try {
      localStorage.setItem(STORAGE_KEY, theme)
    } catch {
      /* storage unavailable — ignore */
    }
  }, [theme])

  const toggleTheme = useCallback(() => {
    setTheme((t) => (t === 'dark' ? 'clean' : 'dark'))
  }, [])

  return { theme, toggleTheme }
}

