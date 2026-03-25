# AGENTS.md

Guidance for coding agents working in `react-portfolio-reimagined`.

## 1) Project Snapshot

- Stack: React 18 + TypeScript + Vite + Tailwind CSS + shadcn/ui primitives.
- Routing: `react-router-dom` (`src/App.tsx`, `src/pages/*`).
- Animations: `framer-motion` and custom CSS animations.
- Data/style approach: local TS data files + CSS variables in `src/index.css`.
- Package manager: npm (`package-lock.json` is present).
- Responde siempre en Español

## 2) Build, Lint, Test Commands

Run from repo root: `E:\01_WorkSpace\portfolio-arvera-mock\react-portfolio-reimagined`.

### Install

- `npm install`

### Local development

- `npm run dev` - start Vite dev server (configured for port `8080`).
- `npm run preview` - preview production build.

### Build

- `npm run build` - production build.
- `npm run build:dev` - development-mode build.

### Lint

- `npm run lint` - ESLint on all project files.

### Unit tests (Vitest)

- `npm run test` - run all tests once (`vitest run`).
- `npm run test:watch` - run tests in watch mode (`vitest`).

### Run a single test file

- `npx vitest run src/test/example.test.ts`
- Alternative: `npm run test -- src/test/example.test.ts`

### Run a single test by name

- `npx vitest run -t "should pass"`
- With file + name filter: `npx vitest run src/test/example.test.ts -t "should pass"`

### Optional E2E (Playwright)

- Config exists: `playwright.config.ts`.
- Run all: `npx playwright test`
- Run one spec: `npx playwright test path/to/spec.ts`
- Run one test title: `npx playwright test -g "test name"`

## 3) Validation Order Before Handoff

Use this order unless task scope is tiny:

1. `npm run lint`
2. `npm run test` (or targeted test command when appropriate)
3. `npm run build`

If you skip any step, state exactly what was skipped and why.

## 4) Code Style and Conventions

### Language and typing

- TypeScript is not strict (`strict: false`), but write code as if strict were enabled.
- Prefer explicit types for public APIs, complex state, context values, and function params.
- Keep `any` as a last resort; prefer unions, generics, and narrowed unknown values.
- Use `import type` for type-only imports.
- Use non-null assertions (`!`) only when DOM lifecycle guarantees are clear.

### Imports and module paths

- Use alias `@` for `src` imports (configured in Vite + TS paths).
- Prefer import grouping in this order:
  1) external packages,
  2) internal alias imports (`@/...`),
  3) relative imports.
- Keep one blank line between groups.
- Prefer named exports for utilities/hooks unless file already uses default export pattern.

### Formatting

- Match existing formatting:
  - double quotes,
  - semicolons,
  - trailing commas where formatter inserts them,
  - concise arrow functions for simple components.
- Keep JSX readable; split long prop lists across lines.
- Avoid unnecessary comments; code should be self-explanatory.

### Naming conventions

- Components: PascalCase (`Navbar.tsx`, `HeroSection.tsx`).
- Hooks: `useX` camelCase (`useScrollAnimation.ts`, `useTypingEffect.ts`).
- Context modules: lowercase file names are allowed (example: `context/language.tsx`).
- Utility functions: short, intention-revealing camelCase (`cn`, `getSystemLanguage`).
- Constants:
  - `UPPER_SNAKE_CASE` for true constants,
  - camelCase for local/static config objects used within a module.

### React patterns

- Functional components only.
- Keep side effects inside `useEffect`; always return cleanup for subscriptions/timers.
- Guard browser-only APIs (`window`, `document`, `navigator`, `localStorage`) for SSR safety.
- For context hooks, throw clear runtime errors when provider is missing.
- Prefer derived values with `useMemo` only when recomputation cost or stability matters.

### State and data flow

- Keep static portfolio content in data files (see `src/data/cv-2.ts`) when practical.
- Keep transient UI state local to component/hook.
- Lift state only when multiple siblings need it.
- Avoid prop drilling through many levels; use context when cross-tree sharing is required.

### Styling

- Tailwind is primary styling mechanism.
- Reuse design tokens from CSS variables in `src/index.css`.
- Prefer utility classes + existing helper classes (`glass-card`, `gradient-text`, etc.).
- Keep dark/light behavior consistent with current `html.light` strategy.
- Avoid introducing a second styling paradigm unless required.

### Error handling

- Fail fast for impossible states (throw with actionable message).
- Handle expected runtime issues gracefully:
  - guard null DOM nodes,
  - handle absent browser APIs,
  - avoid crashing on optional content.
- For async code, use `try/catch` and return user-safe fallback behavior.
- Do not swallow errors silently; log or surface intentionally.

### Testing conventions

- Framework: Vitest + Testing Library + `jest-dom` (`src/test/setup.ts`).
- Place tests as `*.test.ts(x)` or `*.spec.ts(x)` under `src/`.
- Test behavior, not implementation details.
- Prefer accessible queries (`getByRole`, `getByText`) over brittle selectors.
- Keep tests deterministic; mock timers/network/browser APIs as needed.

## 5) Lint Rules in Effect (Highlights)

- ESLint uses `@eslint/js` + `typescript-eslint` recommended presets.
- `react-hooks` recommended rules are enabled.
- `react-refresh/only-export-components` warns (constant export allowed).
- `@typescript-eslint/no-unused-vars` is currently OFF.
- Directory `dist` is ignored by lint.

## 6) Repository-specific Notes

- There is currently no CI workflow file under `.github/workflows/`.
- `README.md` is minimal; rely on config files as source of truth.
- Respect existing uncommitted changes; do not revert user work unintentionally.

## 7) Cursor/Copilot Rule Files

Checked locations:

- `.cursorrules`
- `.cursor/rules/`
- `.github/copilot-instructions.md`

No Cursor/Copilot instruction files were found at the time this AGENTS.md was generated.
If these files are added later, treat them as higher-priority repository instructions and merge them into this guide.
