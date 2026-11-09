---
name: Editorial Developer Portfolio
description: Minimalist editorial design system with dual dark/clean themes, brutalist-editorial typography, and micro-interactions
colors:
  dark-bg: "#111111"
  dark-card: "#181818"
  dark-border: "#262626"
  dark-fg: "#f5f5f5"
  dark-muted: "#999999"
  dark-accent: "#d6d6d6"
  clean-bg: "#f5f3ee"
  clean-card: "#ebe8e1"
  clean-border: "#ddd8ce"
  clean-fg: "#171717"
  clean-muted: "#77736d"
  clean-accent: "#a5a097"
  emerald-accent: "#10b981"
  amber-accent: "#fbbf24"
typography:
  display:
    fontFamily: "Syne, sans-serif"
    fontWeight: 700
    letterSpacing: "-0.03em"
  sans:
    fontFamily: "Plus Jakarta Sans, sans-serif"
    fontWeight: 300
    lineHeight: "1.65"
  mono:
    fontFamily: "Space Mono, monospace"
    letterSpacing: "0.08em"
    textTransform: "uppercase"
rounded:
  xs: "3px"
  sm: "8px"
  md: "12px"
  lg: "16px"
  xl: "24px"
  pill: "9999px"
---

# Design System: Editorial Developer Portfolio

## 1. Visual World & Aesthetic
An editorial minimalist aesthetic built for technical credibility and distinctive character. It rejects generic purple-gradient SaaS tropes in favor of:
- High contrast, neutral monochromes with functional status accents (emerald for online/valid, amber for in-progress/warning).
- Expressive display headlines set in **Syne** paired with a readable, restrained body font (**Plus Jakarta Sans**) and technical bracketed meta labels (**Space Mono**).
- Dual theme support (**Dark** `#111111` as default, **Clean** `#F5F3EE` as daytime editorial alternative) switched smoothly via CSS custom properties.
- Subtle background grain overlay and a 60px hairline editorial grid.

## 2. Layout & Spacing
- Container: centered `max-w-7xl` with `px-6`.
- Rhythm: major sections separated by `py-28` and subtle hairline border dividers (`border-line`).
- Asymmetric 12-column layouts (7/5 split for projects and gym experience; 5/7 split for about section).

## 3. Motion & Micro-Interactions
- Smooth, non-disruptive fade-ins (`Reveal` motion wrapper adhering to `prefers-reduced-motion`).
- Custom interactive circular lens reveal on photograph with desktop cursor tracking and mobile fallback buttons.
- Hover lift and image grayscale-to-color reveals.
- Responsive mobile menu drawer with smooth exit/entry animations.
