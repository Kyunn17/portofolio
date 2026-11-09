# Khairul Faridz — Developer Portfolio

Personal developer portfolio with an editorial minimalist aesthetic, dual dark/clean themes, and interactive showcases.

## Tech Stack
- **Framework:** React 19 + TypeScript + Vite
- **Styling:** Tailwind CSS v4 (dual Dark & Clean theme system)
- **Animation:** Motion for React
- **Icons:** Lucide React + custom SVG brand icons
- **Quality:** Impeccable craft engine

---

## Deployment on Vercel

When importing this repository into Vercel, use the following settings (already pre-configured in `vercel.json`):

| Setting | Value |
| --- | --- |
| **Framework Preset** | `Vite` |
| **Build Command** | `npm run build` |
| **Output Directory** | `dist` |
| **Install Command** | `npm install` |

### Deploy via Vercel Dashboard (Recommended)
1. Push your code to GitHub.
2. Go to [vercel.com](https://vercel.com) and log in.
3. Click **"Add New..."** → **"Project"**.
4. Import your GitHub repository (`portofolio`).
5. Vercel will automatically detect `Vite`, `npm run build`, and `dist`.
6. Click **Deploy**.

### Deploy via Vercel CLI
```bash
# 1. Install Vercel CLI (if not already installed)
npm install -g vercel

# 2. Deploy to preview
vercel

# 3. Deploy to production
vercel --prod
```

---

## Local Development

```bash
# Install dependencies
npm install

# Start local development server
npm run dev

# Run quality & anti-pattern audit
npm run audit

# Build for production
npm run build

# Preview production build locally
npm run preview
```
