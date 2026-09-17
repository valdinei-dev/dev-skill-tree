# Implementation Plan: Storage Contract Tests

**Branch**: `006-storage-contract-tests` | **Date**: 2026-09-16 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/006-storage-contract-tests/spec.md`

**Note**: This template is filled in by the `/speckit-plan` command; its definition describes the execution workflow.

## Summary

Add Vitest checks for the existing skill persistence contract in `lib/storage.ts`. Tests call only `getSkills`, `getSkillById`, `createSkill`, `updateSkill`, and `deleteSkill`. Each test starts empty by listing and deleting through `deleteSkill` (no reset helper on the module, no `localStorage` in tests). Do not change Skill fields or persistence behavior. Do not test UI or `useSkills`. Documented run: `npm test` → `vitest run`.

## Technical Context

**Language/Version**: TypeScript 5, React 19.2, Next.js 16.3 App Router

**Primary Dependencies**: Existing app stack. New devDependencies: `vitest`, `jsdom`, `vite-tsconfig-paths`. No `@testing-library/react`, no `@vitejs/plugin-react` unless a test file contains JSX (this feature does not).

**Storage**: Unchanged. Tests exercise the current `lib/storage.ts` API. Browser `localStorage` is provided by the jsdom test environment; tests MUST NOT read or write it directly.

**Testing**: Vitest with `environment: "jsdom"`. Config: `vitest.config.mts`. Colocated `lib/storage.test.ts`. Script `"test": "vitest run"`.

**Target Platform**: Node.js (developer machine / CI), jsdom — not a browser window opened by the maintainer

**Project Type**: Single Next.js web application (no backend)

**Performance Goals**: Full suite under 30 seconds (SC-004)

**Constraints**: Public API only. No dedicated clear/reset on storage. No corrupt-payload tests. No UI/E2E. Do not rewrite `specs/001-skill-job-catalog/` in this feature.

**Scale/Scope**: One runner config, one test file, one npm script, a README line for `npm test`.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Gate | Pre-research | Post-design |
| --------- | ---- | ------------ | ----------- |
| I. MVP Scope Discipline | Checks verify included persistence; no new product surface | Pass | Pass |
| II. Skills Remain Independent | No new Skill fields; operations stay skill-only | Pass | Pass |
| III. Jobs Stay Out Until a Later Spec | No jobs collection or tests | Pass | Pass |
| IV. User-Owned Priority and Knowledge | Asserts 1–5 and defaults; does not invent levels | Pass | Pass |
| V. Simplicity Before Abstraction | Runner + colocated tests; no reset API, no RTL | Pass | Pass |
| Technical Constraints | UI still must not touch `localStorage`; tests go through the storage module | Pass | Pass |
| Scope Boundaries | No export/import, no coverage gate, no E2E | Pass | Pass |

No unjustified violations. A test-only `clearSkills` export and Testing Library were considered and rejected (research.md).

## Project Structure

### Documentation (this feature)

```text
specs/006-storage-contract-tests/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   └── storage.md
└── tasks.md             # Phase 2 (/speckit-tasks — not created here)
```

### Source Code (repository root)

```text
lib/storage.ts            # Unchanged public API (tests must not add a reset export)
lib/storage.test.ts       # Contract checks (create in this feature)
lib/levels.ts             # Unchanged; storage already uses isSkillLevel
vitest.config.mts         # jsdom + tsconfig paths
package.json              # "test": "vitest run"; vitest, jsdom, vite-tsconfig-paths
README.md                 # Document npm test as the persistence-check command
```

**Structure Decision**: Existing app. Colocate tests next to `lib/storage.ts`. Do not add `__tests__/`, `src/`, or a generic test helpers package.

## Complexity Tracking

> No constitution violations requiring justification.

## Phase 0

Research decisions are in [research.md](./research.md). There are no remaining NEEDS CLARIFICATION items in Technical Context.

## Phase 1

- [data-model.md](./data-model.md) — Skill and operations unchanged; isolation is a test process, not a new entity
- [contracts/storage.md](./contracts/storage.md) — what the checks may call and what they must assert
- [quickstart.md](./quickstart.md) — `npm test` validation

Next command: `/speckit-tasks`.
