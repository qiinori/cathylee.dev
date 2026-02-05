# Personal Portfolio

A modern, responsive personal portfolio website built with React, Vite, and Tailwind-inspired CSS.

## Features
- **Dynamic Interactions**: Custom cursor, pixel background, and scroll animations.
- **Dark/Light Mode**: Theme persistence with local storage.
- **Responsive Design**: Mobile-first approach with a dedicated mobile menu.
- **Performance**: Optimized load times and smooth transitions.

## Application Architecture

### Tech Stack
- **Framework**: React 19 + Vite
- **Styling**: Vanilla CSS (Variables, Flexbox/Grid)
- **Testing**: Vitest (Unit) + Playwright (E2E)

### Project Structure
- `src/components/`: Reusable UI components (Navbar, Hero, Experience, etc.)
- `src/index.css`: Global styles and theme variables.
- `e2e/`: End-to-End test specifications.

## Development

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Dev Server**
   ```bash
   npm run dev
   ```

## Testing

This project uses a comprehensive testing strategy covering distinct units and full user flows.

### Unit Tests (Vitest)
Verifies individual component logic and rendering (e.g., Navbar toggles, Experience list rendering).

```bash
# Run all unit tests
npm test

# Run with UI preview
npx vitest --ui
```

### End-to-End Tests (Playwright)
Verifies critical user journeys in a real browser environment (e.g., Navigation, Theme Persistence, Mobile Menu).

```bash
# Run all E2E tests (headless)
npx playwright test

# Run tests with UI mode (trace viewer, time travel)
npx playwright test --ui

# Show HTML test report
npx playwright show-report
```
