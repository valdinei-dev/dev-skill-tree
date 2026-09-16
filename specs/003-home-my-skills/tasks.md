---
description: "Task list for Home My Skills Action implementation"
---

# Tasks: Home My Skills Action

**Input**: Design documents from `/specs/003-home-my-skills/`

**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/

**Tests**: Not included. The spec and plan require manual browser validation via `quickstart.md`, not a test runner.

**Organization**: Tasks are grouped by user story so each story can be implemented and checked independently.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies on incomplete tasks)
- **[Story]**: User story label (US1–US2) on story-phase tasks only
- Every task includes an exact file path

## Path Conventions

Existing Next.js app at repo root. Touch `app/page.tsx` and `README.md` only. Do not add a Home client component or read storage on Home.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Existing app. No new folders or packages.

- [x] T001 Confirm `app/page.tsx` stays a Server Component (no `'use client'`) and keep a single `Link` to `/skills` per plan.md

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Home must not branch on catalog data.

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T002 Confirm `app/page.tsx` does not import `useSkills`, `getSkills`, or any storage module per research.md

**Checkpoint**: Home remains a static Server page — label change can proceed

---

## Phase 3: User Story 1 - Return to the catalog from Home (Priority: P1) 🎯 MVP

**Goal**: Home’s only primary action is labeled My Skills and goes to My Skills.

**Independent Test**: With at least one skill, open Home. Primary action is My Skills, not Create Skills. Choosing it shows the catalog table.

### Implementation for User Story 1

- [x] T003 [US1] Change the Home primary action label from Create Skills to My Skills on the existing `Link` to `/skills` in `app/page.tsx`. Do not add a second hero button.

**Checkpoint**: Returning user path works (Home → catalog)

---

## Phase 4: User Story 2 - First visit still reaches create (Priority: P2)

**Goal**: The same Home action still lands empty users on My Skills create-first copy. Home label does not change when the catalog is empty.

**Independent Test**: Empty catalog. Home → My Skills → “You don't have any skills yet.” / Create your first skill → create with a name only.

### Implementation for User Story 2

- [x] T004 [US2] Leave empty-state copy and Create your first skill unchanged in `components/skills/SkillList.tsx`; do not add catalog-dependent logic to `app/page.tsx`

**Checkpoint**: First-skill path still works after the Home label change

---

## Phase 5: Polish & Cross-Cutting Concerns

**Purpose**: Docs, lint, browser check

- [x] T005 [P] Replace Home “Create Skills” wording in `README.md` so getting started matches My Skills
- [x] T006 Run `npm run lint` and fix issues in `app/page.tsx`
- [x] T007 Execute Scenarios A–D in `specs/003-home-my-skills/quickstart.md` against the running app

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies
- **Foundational (Phase 2)**: Depends on Setup — BLOCKS all user stories
- **User Story 1 (Phase 3)**: Depends on Foundational
- **User Story 2 (Phase 4)**: Depends on US1 label change (same Home control); SkillList should already be correct
- **Polish (Phase 5)**: Depends on US1 (README can start after T003)

### User Story Dependencies

- **US1 (P1)**: After Foundational. Delivers the Home CTA (MVP).
- **US2 (P2)**: After US1. Confirms empty My Skills is unchanged. Not a second Home button.

### Parallel Opportunities

- T005 (`README.md`) can run after T003 in parallel with T004 (`SkillList.tsx` is verify-only)
- T001–T003 are sequential on `app/page.tsx`

---

## Parallel Example: User Story 1

```text
Not applicable — US1 is a single edit in app/page.tsx.
After T003: README (T005) and US2 verify (T004) can proceed together.
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1–2 (Home stays Server, no storage)
2. Complete Phase 3: label My Skills
3. **STOP and VALIDATE**: Home with an existing catalog
4. Then US2 / empty catalog + README + quickstart

### Incremental Delivery

1. Setup + constraints
2. US1 → Home CTA (MVP)
3. US2 → confirm first-skill path
4. README + lint + quickstart A–D

### Parallel Team Strategy

One developer; the code change is one file.

---

## Notes

- [P] = different files and no dependency on incomplete tasks
- Do not add `'use client'` to `app/page.tsx`
- Do not read `localStorage` on Home
- Do not rewrite `specs/001-skill-job-catalog/` in this feature
- Stop at any checkpoint to validate that story
