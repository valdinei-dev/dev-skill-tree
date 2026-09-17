---
description: "Task list for Storage Contract Tests implementation"
---

# Tasks: Storage Contract Tests

**Input**: Design documents from `/specs/006-storage-contract-tests/`

**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/

**Tests**: This feature **is** the automated checks. Story tasks add assertions in `lib/storage.test.ts`. Do not treat that as TDD-for-new-storage: `lib/storage.ts` already implements the contract and MUST stay behavior-unchanged (spec FR-006).

**Organization**: Tasks are grouped by user story so each story can be implemented and checked independently.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies on incomplete tasks)
- **[Story]**: User story label (US1–US3) on story-phase tasks only
- Every task includes an exact file path

## Path Conventions

Existing Next.js app at repo root. Checks live in `lib/storage.test.ts`. Runner config is `vitest.config.mts`. Do not add `__tests__/`, RTL, `@vitejs/plugin-react`, or a reset/clear export on `lib/storage.ts`.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Vitest runner so `npm test` can execute storage checks.

- [x] T001 Add devDependencies `vitest`, `jsdom`, and `vite-tsconfig-paths` and script `"test": "vitest run"` in `package.json`
- [x] T002 [P] Create `vitest.config.mts` with `environment: "jsdom"` and `vite-tsconfig-paths` per `specs/006-storage-contract-tests/plan.md` (no React plugin, no `globals: true`)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Isolation helper in the test file only. Storage module stays the product API.

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T003 Create `lib/storage.test.ts` that imports `describe`, `it`, `expect`, `beforeEach` from `vitest` and only `getSkills`, `getSkillById`, `createSkill`, `updateSkill`, `deleteSkill` from `lib/storage.ts`; add a local `emptyCatalog` helper and `beforeEach` that deletes every skill via `deleteSkill`; do not use `concurrent` and do not touch `localStorage` in this file
- [x] T004 [P] Confirm `lib/storage.ts` has no test-only reset/clear export and do not add one per `specs/006-storage-contract-tests/research.md`

**Checkpoint**: `npm test` can load the file; each example starts from an empty catalog through the public API

---

## Phase 3: User Story 1 - Trust create and read after a persistence change (Priority: P1) 🎯 MVP

**Goal**: Automated checks that empty list, create-with-name-only (defaults), list, and get-by-id (existing and missing) match the current contract.

**Independent Test**: `npm test` passes the US1 examples in `lib/storage.test.ts` with US2/US3 not required yet.

### Implementation for User Story 1

- [x] T005 [US1] Add checks in `lib/storage.test.ts` that `getSkills()` is `[]` after `emptyCatalog`, and that `createSkill` with only a name returns trimmed name, `description === ""`, `notes === ""`, `priority === 1`, `knowledge === 1`, and a non-empty string `id`, and that `getSkills()` includes that skill
- [x] T006 [US1] Add checks in `lib/storage.test.ts` that `getSkillById` of the created id returns that skill and `getSkillById` of an id not in the catalog returns `null` per `specs/006-storage-contract-tests/contracts/storage.md`

**Checkpoint**: Create/read contract is covered. Maintainer can stop here for MVP.

---

## Phase 4: User Story 2 - Trust update and delete after a persistence change (Priority: P2)

**Goal**: Automated checks for update (all fields, missing id) and delete (existing, not-found) without emptying unrelated skills.

**Independent Test**: `npm test` passes US2 examples. Create a skill in the example via `createSkill`, then update/delete.

### Implementation for User Story 2

- [x] T007 [US2] Add checks in `lib/storage.test.ts` that updating name, description, priority, knowledge, and notes persists those values with `id` unchanged, and that `updateSkill` for a missing id returns `null` while other skills stay unchanged
- [x] T008 [US2] Add checks in `lib/storage.test.ts` that `deleteSkill` of an existing id returns `{ ok: true }` and the skill is gone from `getSkills()` and `getSkillById`, and that delete of a missing id returns `{ ok: false, reason: "not-found" }` while other skills stay unchanged

**Checkpoint**: Update/delete contract is covered alongside US1

---

## Phase 5: User Story 3 - Reject invalid writes without corrupting the catalog (Priority: P3)

**Goal**: Empty/whitespace names and levels outside 1–5 do not persist; valid skills stay intact.

**Independent Test**: `npm test` passes US3 examples (throw + catalog unchanged).

### Implementation for User Story 3

- [x] T009 [US3] Add checks in `lib/storage.test.ts` that `createSkill` with `""` or whitespace-only name throws and adds no skill, and that `updateSkill` with `""` or whitespace-only name throws and leaves the existing skill unchanged
- [x] T010 [US3] Add checks in `lib/storage.test.ts` that create or update with priority or knowledge outside 1–5 throws and leaves the catalog unchanged, including when a valid skill already exists

**Checkpoint**: Invalid writes cannot silently rewrite the catalog

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Documented run, lint, quickstart, storage API unchanged

- [x] T011 [P] Document `npm test` as the persistence-check command in `README.md`
- [x] T012 Run `npm test` and confirm Scenarios A–D in `specs/006-storage-contract-tests/quickstart.md` (full suite passes, under 30 seconds, exit non-zero would mean a contract break)
- [x] T013 Run `npm run lint` and fix issues in `lib/storage.test.ts` and `vitest.config.mts`
- [x] T014 Confirm `lib/storage.ts` public operations and validation messages are unchanged (no reset API, no Result-type rewrite of throws)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies
- **Foundational (Phase 2)**: Depends on Setup — BLOCKS all user stories
- **User Story 1 (Phase 3)**: Depends on Foundational (`lib/storage.test.ts` + `beforeEach`)
- **User Story 2 (Phase 4)**: Same file as US1; add after US1 so examples stay readable
- **User Story 3 (Phase 5)**: Same file; add after US2
- **Polish (Phase 6)**: Depends on US1–US3 for the full `npm test` run; T011 and T014 can start once Setup exists

### User Story Dependencies

- **US1 (P1)**: After Foundational. Deliverable MVP: create/read checks.
- **US2 (P2)**: After US1 only because all checks share `lib/storage.test.ts`. Independently about update/delete.
- **US3 (P3)**: After US1 (needs `createSkill` in examples). Shares the file with US2.

### Parallel Opportunities

- T001 (`package.json`) and T002 (`vitest.config.mts`) in Setup
- T003 (`lib/storage.test.ts`) and T004 (`lib/storage.ts` verify-only) in Foundational
- T011 (`README.md`) in parallel with T014 (`lib/storage.ts` verify-only) during Polish
- US1–US3 are **not** [P] with each other: they all edit `lib/storage.test.ts`

---

## Parallel Example: Setup

```text
T001 package.json (vitest, jsdom, vite-tsconfig-paths, "test": "vitest run")
T002 vitest.config.mts (jsdom + tsconfig paths)
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Vitest + `npm test` script
2. Complete Phase 2: `lib/storage.test.ts` isolation via public delete
3. Complete Phase 3: create/read checks
4. **STOP and VALIDATE**: `npm test` passes US1
5. Then US2 update/delete, US3 invalid writes, README + lint + quickstart

### Incremental Delivery

1. Setup + isolation helper
2. US1 → create/read (MVP)
3. US2 → update/delete
4. US3 → invalid writes
5. README + `npm test` + lint + confirm storage unchanged

### Parallel Team Strategy

One developer. Story tasks are sequential on `lib/storage.test.ts`. Setup files can land in parallel.

---

## Notes

- [P] = different files and no dependency on incomplete tasks
- Tests call only the public storage API; never `localStorage` or a reset export
- Do not install `@testing-library/react` or `@vitejs/plugin-react` in this feature
- Do not change `createSkill` / `updateSkill` / `deleteSkill` behavior to make tests prettier
- Do not rewrite `specs/001-skill-job-catalog/`
- Stop at any checkpoint to validate that story with `npm test`
