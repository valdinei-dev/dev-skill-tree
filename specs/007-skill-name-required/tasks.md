---
description: "Task list for Skill Name Required Feedback implementation"
---

# Tasks: Skill Name Required Feedback

**Input**: Design documents from `/specs/007-skill-name-required/`

**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/

**Tests**: Not included. Spec and plan require manual browser validation via `quickstart.md`. Existing `npm test` (006) must still pass; do not add overlay tests in this feature.

**Organization**: Tasks are grouped by user story so each story can be implemented and checked independently.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies on incomplete tasks)
- **[Story]**: User story label (US1–US3) on story-phase tasks only
- Every task includes an exact file path

## Path Conventions

Existing Next.js app at repo root. Create in `components/skills/SkillForm.tsx`. Edit in `components/skills/SkillEditForm.tsx`. Leave `lib/storage.ts` unchanged. Do not add a shared `NameField`, a form `mode`, or a dialog library.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Existing overlays. No new packages or routes.

- [x] T001 Confirm `components/skills/SkillForm.tsx` and `components/skills/SkillEditForm.tsx` keep native `<dialog>` and do not add a component-library dependency in `package.json`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Storage stays the product API. Native `required` + `reportValidity` MUST NOT remain the empty-name path.

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T002 Confirm `lib/storage.ts` `createSkill` / `updateSkill` and throw messages stay unchanged; do not catch storage throws as the overlay UX per `specs/007-skill-name-required/research.md`

**Checkpoint**: Persistence contract untouched. Overlays can add a visible name error without a library.

---

## Phase 3: User Story 1 - See why Create did not save a name (Priority: P1) 🎯 MVP

**Goal**: Create Skill shows **Name is required** for empty and whitespace names, same presentation, no native empty-field tooltip, no `createSkill`.

**Independent Test**: Open Create Skill. Submit empty Name, then spaces-only. Overlay stays open, catalog unchanged, **Name is required** with Name focused. Message not shown before submit.

### Implementation for User Story 1

- [x] T003 [US1] Remove `required` from the Name input in `components/skills/SkillForm.tsx` and stop using `form.reportValidity()` for the invalid-name path so empty and whitespace both reach `name.trim()` in `handleSubmit`
- [x] T004 [US1] On invalid name in `components/skills/SkillForm.tsx`, skip `createSkill`, keep the overlay open, render visible `Name is required` associated with Name (`aria-invalid` / `aria-describedby`), and focus the Name input
- [x] T005 [US1] Keep `Name is required` hidden in `components/skills/SkillForm.tsx` until a failed Create in that open cycle (FR-006)

**Checkpoint**: Create empty vs spaces looks the same. Browser tooltip is not the empty-name path.

---

## Phase 4: User Story 2 - See why Edit did not save a name (Priority: P2)

**Goal**: Edit Skill uses the same error as Create. No `updateSkill` on invalid name.

**Independent Test**: Edit an existing skill. Save empty Name, then spaces-only. Overlay stays, skill unchanged, **Name is required** with Name focused. Not shown on first open.

### Implementation for User Story 2

- [x] T006 [P] [US2] Remove `required` from the Name input in `components/skills/SkillEditForm.tsx` and stop using `form.reportValidity()` for the invalid-name path so empty and whitespace both reach `name.trim()` in `handleSubmit`
- [x] T007 [US2] On invalid name in `components/skills/SkillEditForm.tsx`, skip `updateSkill`, keep the overlay open, render visible `Name is required` associated with Name (`aria-invalid` / `aria-describedby`), and focus the Name input
- [x] T008 [US2] Keep `Name is required` hidden in `components/skills/SkillEditForm.tsx` until a failed Save in that open cycle (FR-006)

**Checkpoint**: Edit matches Create on this error. Reading view still last save.

---

## Phase 5: User Story 3 - Recover with a real name (Priority: P3)

**Goal**: Valid Create/Save after the error still persists and closes. Cancel/dismiss closes without write and the next open has no leftover message.

**Independent Test**: After the error, type a real name and Create/Save — overlay closes, catalog updates, no error on the page. Cancel after the error — nothing written; reopen overlay without the message.

### Implementation for User Story 3

- [x] T009 [P] [US3] Keep successful Create in `components/skills/SkillForm.tsx` calling `createSkill` then close; clear the name-error flag when `open` becomes false
- [x] T010 [P] [US3] Keep successful Save in `components/skills/SkillEditForm.tsx` calling `updateSkill` then close; clear the name-error flag when `open` becomes false
- [x] T011 [US3] Confirm Cancel and dismiss in `components/skills/SkillForm.tsx` and `components/skills/SkillEditForm.tsx` still close without storage writes while the name error is showing

**Checkpoint**: Error is recoverable. It does not leak onto My Skills or Skill Detail.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Lint, storage tests, browser quickstart

- [x] T012 Run `npm run lint` and fix issues in `components/skills/SkillForm.tsx` and `components/skills/SkillEditForm.tsx`
- [x] T013 Run `npm test` and confirm `lib/storage.test.ts` still passes
- [x] T014 Execute Scenarios A–G in `specs/007-skill-name-required/quickstart.md` against the running app

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies
- **Foundational (Phase 2)**: Depends on Setup — BLOCKS all user stories
- **User Story 1 (Phase 3)**: Depends on Foundational (`SkillForm.tsx`)
- **User Story 2 (Phase 4)**: Depends on Foundational only (`SkillEditForm.tsx`); can proceed in parallel with US1
- **User Story 3 (Phase 5)**: Depends on US1 and US2 error paths existing
- **Polish (Phase 6)**: Depends on US1–US3

### User Story Dependencies

- **US1 (P1)**: After Foundational. Create Skill feedback (MVP).
- **US2 (P2)**: After Foundational. Same pattern on Edit; different file.
- **US3 (P3)**: After US1 and US2. Reset on close + successful submit.

### Parallel Opportunities

- T006 (`SkillEditForm.tsx`) can start with T003–T005 (`SkillForm.tsx`) after T002
- T009 and T010 after their respective overlays have the error path
- T001 and T002 are verify-only on different files and can run together

---

## Parallel Example: User Story 1 and 2

```text
T003–T005 components/skills/SkillForm.tsx (Create)
T006–T008 components/skills/SkillEditForm.tsx (Edit) — parallel after T002
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1–2 (native dialog; storage unchanged)
2. Complete Phase 3: Create Skill **Name is required**
3. **STOP and VALIDATE**: empty and spaces look the same on Create
4. Then US2 Edit, US3 recover/reset, lint + `npm test` + quickstart A–G

### Incremental Delivery

1. Setup + storage constraint
2. US1 → Create feedback (MVP)
3. US2 → Edit feedback
4. US3 → recover and clear on close
5. Lint + `npm test` + quickstart A–G in the browser

### Parallel Team Strategy

One developer. Create and Edit files can be edited in parallel after Foundational.

---

## Notes

- [P] = different files and no dependency on incomplete tasks
- Do not extract a shared Name field or merge Create/Edit
- Do not use `required` + native tooltip as the empty-name path
- Do not rewrite `specs/001-skill-job-catalog/` or `specs/005-skill-view-edit/`
- Verify UI in the browser (user rule); `npm test` does not cover these overlays
- Stop at any checkpoint to validate that story
