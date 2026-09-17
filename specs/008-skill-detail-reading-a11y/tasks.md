---
description: "Task list for Skill Detail Reading Accessibility implementation"
---

# Tasks: Skill Detail Reading Accessibility

**Input**: Design documents from `/specs/008-skill-detail-reading-a11y/`

**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/

**Tests**: Not included. Spec and plan require manual browser + accessibility inspector via `quickstart.md`. Existing `npm test` (006) must still pass.

**Organization**: Tasks are grouped by user story so each story can be implemented and checked independently.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies on incomplete tasks)
- **[Story]**: User story label (US1–US3) on story-phase tasks only
- Every task includes an exact file path

## Path Conventions

Existing Next.js app at repo root. Reading markup lives in `components/skills/SkillDetail.tsx`. Do not add `ReadingField.tsx`, a component library, or table changes. Leave `SkillForm.tsx` and `SkillEditForm.tsx` unchanged.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Existing Skill Detail. No new packages or routes.

- [x] T001 Confirm `components/skills/SkillDetail.tsx` stays a Client Component and do not add an a11y or dialog package in `package.json`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Persistence and overlays stay the product APIs.

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T002 Confirm `lib/storage.ts` is unchanged and do not add `components/skills/ReadingField.tsx` per `specs/008-skill-detail-reading-a11y/research.md`

**Checkpoint**: Reading markup can change in SkillDetail without a new abstraction.

---

## Phase 3: User Story 1 - Read every field, including empty ones (Priority: P1) 🎯 MVP

**Goal**: Description, Priority, Knowledge, and Notes are named headings in the reading view, including when description or notes are empty. No “None”. Name stays `h1`. Not a save form.

**Independent Test**: Open a skill with content and one with empty description/notes. Accessibility tree shows headings Description, Priority, Knowledge, Notes. Empty fields still named. No filler copy. No page Save.

### Implementation for User Story 1

- [x] T003 [US1] Replace the reading `<dl>` / `<dt>` / `<dd>` block in `components/skills/SkillDetail.tsx` with `h2` labels Description, Priority, Knowledge, and Notes plus value elements; keep `min-h-6` for empty description and notes; do not render “None” or similar
- [x] T004 [US1] Keep the skill name as `h1` in `components/skills/SkillDetail.tsx` and do not add a page-level Save form or a duplicate Name row

**Checkpoint**: Inspector lists the four field headings even when description/notes are empty.

---

## Phase 4: User Story 2 - Levels stay readable as words (Priority: P2)

**Goal**: Priority and Knowledge values remain `labelForLevel` words under those headings, not unlabeled raw numbers.

**Independent Test**: Open a skill with known levels. Headings Priority and Knowledge sit with Very Low–Very High (or the stored level’s label), not only `1`–`5`.

### Implementation for User Story 2

- [x] T005 [US2] Use `labelForLevel` for the Priority and Knowledge values under their `h2`s in `components/skills/SkillDetail.tsx`; keep the existing two-column visual grouping

**Checkpoint**: Level words are associated with named Priority and Knowledge headings.

---

## Phase 5: User Story 3 - Edit and Delete still work from the ficha (Priority: P3)

**Goal**: Edit Skill and Delete Skill overlays still open from the reading view. Loading / not found unchanged.

**Independent Test**: From the new reading view, Edit opens Edit Skill; Delete opens Delete Skill. Cancel both. Missing id still Skill not found.

### Implementation for User Story 3

- [x] T006 [US3] Keep the Edit button and `SkillEditForm` mount in `components/skills/SkillDetail.tsx` (`005` / `007` behavior)
- [x] T007 [US3] Keep the Delete Skill confirmation `<dialog>` in `components/skills/SkillDetail.tsx` per `004-skill-delete-confirm`
- [x] T008 [P] [US3] Leave Create Skill overlay unchanged in `components/skills/SkillForm.tsx`
- [x] T009 [P] [US3] Leave Edit Skill overlay internals unchanged in `components/skills/SkillEditForm.tsx`
- [x] T010 [US3] Keep "Loading..." and "Skill not found" in `components/skills/SkillDetail.tsx` without requiring the four reading headings in those states

**Checkpoint**: Overlays and empty/missing states still work.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Lint, storage tests, browser + inspector

- [x] T011 Run `npm run lint` and fix issues in `components/skills/SkillDetail.tsx`
- [x] T012 Run `npm test` and confirm `lib/storage.test.ts` still passes
- [x] T013 Execute Scenarios A–E in `specs/008-skill-detail-reading-a11y/quickstart.md` against the running app, including the accessibility tree for the four field headings

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies
- **Foundational (Phase 2)**: Depends on Setup — BLOCKS all user stories
- **User Story 1 (Phase 3)**: Depends on Foundational; replaces `dl` in `SkillDetail.tsx`
- **User Story 2 (Phase 4)**: Same file; after US1 headings exist
- **User Story 3 (Phase 5)**: After US1 so Edit/Delete sit on the new reading markup
- **Polish (Phase 6)**: Depends on US1–US3

### User Story Dependencies

- **US1 (P1)**: After Foundational. Named reading fields (MVP).
- **US2 (P2)**: After US1. Level words under those headings.
- **US3 (P3)**: After US1. Overlay verify; `SkillForm` / `SkillEditForm` can be checked in parallel.

### Parallel Opportunities

- T001 and T002 are verify-only on different files
- T008 (`SkillForm.tsx`) and T009 (`SkillEditForm.tsx`) after T002
- US1–US2 are **not** [P]: they share `SkillDetail.tsx`

---

## Parallel Example: User Story 3

```text
T008 components/skills/SkillForm.tsx (verify-only)
T009 components/skills/SkillEditForm.tsx (verify-only)
T006–T007 sequential on SkillDetail.tsx
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1–2
2. Complete Phase 3: `h2` reading fields, empty description/notes still named
3. **STOP and VALIDATE**: accessibility tree shows the four headings
4. Then US2 level words, US3 overlays, lint + `npm test` + quickstart A–E

### Incremental Delivery

1. Setup + no new abstraction
2. US1 → named fields (MVP)
3. US2 → `labelForLevel`
4. US3 → Edit/Delete/loading
5. Lint + `npm test` + browser inspector

### Parallel Team Strategy

One developer. Overlay files can be verified while SkillDetail markup lands.

---

## Notes

- [P] = different files and no dependency on incomplete tasks
- Do not add “None” or a shared ReadingField component
- Do not change the My Skills table or overlay a11y in this feature
- Do not rewrite `specs/005-skill-view-edit/`
- Verify UI in the browser, including headings in the accessibility snapshot
- Stop at any checkpoint to validate that story
