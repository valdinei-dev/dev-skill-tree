# Research: Storage Contract Tests

## 1. Vitest as the runner; `vitest run` as the documented command

**Decision**: Add Vitest. `package.json` script `"test": "vitest run"`. Config file `vitest.config.mts` at the repo root. Optional watch (`vitest` with no `run`) is not the documented FR-007 action.

**Rationale**: Next.js 16 App Router testing guide recommends Vitest for unit tests (`node_modules/next/dist/docs/01-app/02-guides/testing/vitest.md`). Spec FR-007 and SC-002 need one action with a finite pass/fail. Default `vitest` watch never exits; `vitest run` does, and the suite is small enough for SC-004.

**Alternatives considered**:
- Node built-in `node:test` — no jsdom/`@/` path helper in one place; weaker fit for a Next app.
- Jest — extra stack; Next’s current guide is Vitest.
- Playwright / E2E — spec out of scope; would open the UI.
- `"test": "vitest"` (watch) as the only script — fails FR-007’s clear pass/fail for implement and CI.

## 2. jsdom environment; skip React Testing Library and the React Vite plugin

**Decision**: `test.environment: "jsdom"` so `window` and `localStorage` exist and `canUseStorage()` in `lib/storage.ts` is true. Install `jsdom` and `vite-tsconfig-paths` (for `@/` from `tsconfig.json`). Do not install `@testing-library/react`, `@testing-library/dom`, or `@vitejs/plugin-react` in this feature.

**Rationale**: Storage is a Client module that uses `localStorage`. jsdom is what the Next.js Vitest guide specifies. This spec forbids UI and `useSkills` checks, so RTL and the React plugin are unused weight (constitution V). Tests import named storage functions only; `"use client"` is a bundler hint and does not require JSX.

**Alternatives considered**:
- Follow the Next.js guide’s full install (RTL + `@vitejs/plugin-react`) — needed for component tests, not this contract.
- `happy-dom` — lighter, but the project’s Next docs say jsdom.
- Node environment with a hand-rolled `localStorage` stub — extra test-only surface; jsdom already provides the browser APIs the module expects.

## 3. Isolation via public delete, helper stays in the test file

**Decision**: In `lib/storage.test.ts`, a local helper (for example `emptyCatalog`) lists `getSkills()` and `deleteSkill` for each id. Call it from `beforeEach`. Do not export a reset/clear from `lib/storage.ts`. Do not call `localStorage.clear`, `localStorage.setItem`, or `JSON.parse` in tests. Do not enable `concurrent` on these tests.

**Rationale**: Spec FR-005 / FR-006 and locked approach 1. The in-memory cache in storage updates on `persistSkills`, so emptying through `deleteSkill` also clears what `getSkills()` returns. One colocated file plus sequential tests avoids two workers sharing one module instance.

**Alternatives considered**:
- Test-only `clearSkills` on the storage module — extra product API the UI would never call.
- `localStorage.clear()` in `beforeEach` — bypasses the contract and leaves `skillsCache` stale (false confidence).
- Dynamic `import()` per test to reset the module — more machinery than delete-all.

## 4. Colocate `lib/storage.test.ts`; do not test `useSkills`

**Decision**: One file `lib/storage.test.ts` importing `describe` / `it` / `expect` / `beforeEach` from `vitest` (no globals). Import only `getSkills`, `getSkillById`, `createSkill`, `updateSkill`, `deleteSkill`. Do not render React. Do not import skill components.

**Rationale**: Spec FR-001 and out-of-scope UI. Colocation matches a single module under test; a `__tests__/` tree is an extra folder for one file. Explicit Vitest imports are easier to study than `globals: true`.

**Alternatives considered**:
- `__tests__/storage.test.ts` as in the Next.js page example — fine for pages; unnecessary here.
- Also testing `useSkills` with `renderHook` — requires RTL and is a screen subscription, out of spec.

## 5. Assert current validation behavior; do not change storage

**Decision**: Empty/whitespace names and levels outside 1–5 already throw in `lib/storage.ts` (`Name is required`, `Level must be between 1 and 5`) before persist. Tests MUST expect the write not to succeed (throw) and the catalog to be unchanged. Do not switch throws to result objects in this feature. Do not mock `crypto.randomUUID`; assert the returned `id` is a non-empty string and that update does not change it.

**Rationale**: Spec FR-006: verification of the current contract, not a new persistence product. 001 storage contract already allows throw on empty name.

**Alternatives considered**:
- Soften storage to return `{ ok: false }` so tests avoid exceptions — behavior change, out of spec.
- Mock UUIDs — hides the real create path; not required to assert identity stability.

## 6. Do not rewrite `001` artifacts in this feature

**Decision**: `006` is the current automated-check contract. Leave `specs/001-skill-job-catalog/` wording (including “no test runner in this phase”) historical. Link the 001 storage operations from this feature’s contract instead of copying the whole file.

**Rationale**: Same approach as `003`/`004`/`005` vs older specs.

**Alternatives considered**:
- Patch 001 quickstart to mention Vitest — churn; not required to ship 006.
