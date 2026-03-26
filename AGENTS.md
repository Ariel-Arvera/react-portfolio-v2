# AGENTS.md

Guidance for coding agents working in `react-portfolio-reimagined`.

## 1) Project Snapshot

- Stack: React 18 + TypeScript + Vite + Tailwind CSS + shadcn/ui primitives.
- Routing: `react-router-dom` (`src/App.tsx`, `src/pages/*`).
- Animations: `framer-motion` and custom CSS animations.
- Data/style: local TS data files + CSS variables in `src/index.css`.
- Package manager: npm.

## 2) Build, Lint, Test Commands

Run from repo root: `E:\01_WorkSpace\portfolio-arvera-mock\react-portfolio-reimagined`.

### Install

- `npm install`

### Development

- `npm run dev` - start Vite dev server (port `8080`).
- `npm run preview` - preview production build.

### Build

- `npm run build` - production build.
- `npm run build:dev` - development-mode build.

### Lint & Test

- `npm run lint` - ESLint on all project files.
- `npm run test` - run all tests once (`vitest run`).
- `npm run test:watch` - run tests in watch mode.

### Run a single test

- `npx vitest run src/test/example.test.ts`
- Or: `npx vitest run -t "test name"`

### E2E (Playwright)

- `npx playwright test` - run all specs.
- `npx playwright test path/to/spec.ts` - run one spec.

## 3) Validation Order Before Handoff

1. `npm run lint`
2. `npm run test`
3. `npm run build`

Skip any step only if task scope is tiny and state why.

## 4) Code Style and Conventions

### Language & Typing

- TypeScript is not strict (`strict: false`), but write as if it were.
- Prefer explicit types for public APIs, complex state, context values, function params.
- Avoid `any`; use unions, generics, or narrowed `unknown`.
- Use `import type` for type-only imports.
- Use non-null assertions (`!`) only when DOM lifecycle guarantees are clear.

### Imports & Module Paths

- Use `@` alias for `src` imports (configured in Vite + TS paths).
- Import order: 1) external packages, 2) internal alias (`@/...`), 3) relative.
- One blank line between groups.
- Prefer named exports for utilities/hooks.

### Formatting

- Double quotes, semicolons, trailing commas.
- Concise arrow functions for simple components.
- Split long JSX prop lists across lines.
- Avoid unnecessary comments.

### Naming Conventions

- Components: PascalCase (`Navbar.tsx`, `HeroSection.tsx`).
- Hooks: `useX` camelCase (`useScrollAnimation.ts`).
- Context files: lowercase allowed (`context/language.tsx`).
- Utils: short camelCase (`cn`, `getSystemLanguage`).
- Constants: `UPPER_SNAKE_CASE` for true constants, camelCase for local config objects.

### React Patterns

- Functional components only.
- Side effects in `useEffect`; always return cleanup.
- Guard browser-only APIs (`window`, `document`, `navigator`, `localStorage`).
- For context hooks, throw clear error when provider is missing.
- Use `useMemo` only when recomputation cost matters.

### State & Data Flow

- Static content in data files (e.g., `src/data/cv-2.ts`).
- Transient UI state local to component/hook.
- Lift state only when multiple siblings need it.
- Use context to avoid prop drilling through many levels.

### Styling

- Tailwind is primary.
- Reuse design tokens from CSS variables in `src/index.css`.
- Use utility classes + existing helpers (`glass-card`, `gradient-text`).
- Keep dark/light behavior consistent with current `html.light` strategy.

### Error Handling

- Fail fast for impossible states (throw with actionable message).
- Handle runtime issues gracefully: guard null DOM nodes, handle absent browser APIs.
- For async code: use `try/catch` with user-safe fallback.
- Don't swallow errors silently.

### Testing

- Framework: Vitest + Testing Library + `jest-dom` (`src/test/setup.ts`).
- Tests as `*.test.ts(x)` or `*.spec.ts(x)` under `src/`.
- Test behavior, not implementation.
- Use accessible queries (`getByRole`, `getByText`) over brittle selectors.
- Mock timers/network/browser APIs as needed.

## 5) Lint Rules

- ESLint: `@eslint/js` + `typescript-eslint` recommended presets.
- `react-hooks` rules enabled.
- `react-refresh/only-export-components` warns (constant export allowed).
- `@typescript-eslint/no-unused-vars` is OFF.
- `dist` directory is ignored.

## 6) Repository Notes

- No CI workflow under `.github/workflows/`.
- `README.md` is minimal; rely on config files.
- Respect existing uncommitted changes; don't revert user work unintentionally.

## 7) Cursor/Copilot Rules

Checked locations (none found): `.cursorrules`, `.cursor/rules/`, `.github/copilot-instructions.md`.
If these are added later, treat them as higher-priority instructions.