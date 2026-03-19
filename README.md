# cathylee.dev

A modern, responsive personal portfolio website built with React, Vite, and Framer Motion.

**Live**: [cathylee.dev](https://cathylee.dev)

## Features

- **Interactive Dashboard Mockup**: 1:1 replica of the LLM Sentinel dashboard rendered inside a MacBook device frame with animated KPIs, SVG charts, and interactive time range picker
- **Rich Animations**: Scroll reveals, spring physics, stagger effects, count-up numbers, and chart line drawing via Framer Motion
- **Dark/Light Mode**: Theme persistence with local storage
- **Dynamic Interactions**: Custom cursor, pixel background, and scroll-snap sections
- **Responsive Design**: Mobile-first approach with hamburger menu and adaptive layouts
- **Performance**: Lazy-loaded below-the-fold sections, optimized load times

## Tech Stack

- **Framework**: React 19 + Vite 7
- **Animation**: Framer Motion 12
- **Routing**: React Router 7
- **Styling**: Vanilla CSS (variables, flexbox/grid)
- **Testing**: Vitest (unit) + Playwright (E2E)
- **Deployment**: Vercel (auto-deploy on push to main)

## Project Structure

```
src/
├── App.jsx              # Router: / (Home) and /archive
├── content.js           # All portfolio/experience data
├── components/
│   ├── Hero.jsx         # Landing section
│   ├── Portfolio.jsx    # Demo section + project grid
│   ├── SentinelMockup.jsx  # Interactive dashboard mockup
│   ├── Experience.jsx   # Work experience timeline
│   ├── Footer.jsx       # Contact links
│   ├── Archive.jsx      # /archive — full project list
│   ├── Navbar.jsx       # Nav with mobile hamburger
│   ├── PixelBackground.jsx  # Animated background
│   ├── CustomCursor.jsx # Custom cursor effect
│   ├── ScrambleText.jsx # Text scramble animation
│   └── SplashScreen.jsx # Loading screen
├── styles/
│   ├── index.css        # Import aggregator
│   ├── base/            # reset.css, variables.css
│   ├── layout/          # responsive.css
│   └── sections/        # Per-section styles
```

## Development

```bash
npm install
npm run dev
```

## Testing

### Unit Tests (Vitest)

```bash
npm test
npx vitest --ui    # with UI preview
```

### End-to-End Tests (Playwright)

```bash
npx playwright test              # headless
npx playwright test --ui         # UI mode
npx playwright show-report       # HTML report
```
