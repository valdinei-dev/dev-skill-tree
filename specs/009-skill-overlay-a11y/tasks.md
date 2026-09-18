---
description: "Task list for Skill Overlay Accessibility implementation"
---

# Tasks: Skill Overlay Accessibility

**Input**: Design documents from `/specs/009-skill-overlay-a11y/`

**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/

**Tests**: Not included. Spec and plan require manual browser inspector + keyboard via `quickstart.md`. Existing `npm test` (006) must still pass.

**Organization**: Tasks are grouped by user story so each story can be implemented and checked independently.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies on incomplete tasks)
- **[Story]**: User story label (US1–US3) on story-phase tasks only
- Every task includes an exact file path

## Path Conventions

Existing Next.js app at repo root. Overlays live in `SkillList.tsx`, `SkillForm.tsx`, `SkillDetail.tsx`, and `SkillEditForm.tsx`. Do not add `Overlay.tsx`, a dialog library, or My Skills table changes. Leave `lib/storage.ts` and Skill Detail reading headings (`008`) unchanged.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Existing Client overlays. No new packages or routes.

- [x] T001 Confirm overlay hosts stay Client Components (`components/skills/SkillList.tsx`, `SkillForm.tsx`, `SkillDetail.tsx`, `SkillEditForm.tsx`) and do not add a dialog package in `package.json`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Persistence and reading ficha stay the product APIs.

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T002 Confirm `lib/storage.ts` is unchanged and do not add `components/skills/Overlay.tsx` per `specs/009-skill-overlay-a11y/research.md`

**Checkpoint**: Overlay a11y can land in the existing dialog files.

---

## Phase 3: User Story 1 - A closed overlay is not part of the page (Priority: P1) 🎯 MVP

**Goal**: Closed Create / Edit / Delete must not expose overlay titles or fields in the page accessibility tree. Opening controls may remain.

**Independent Test**: My Skills with Create closed — no heading Create Skill, no overlay fields. Skill Detail with Edit/Delete closed — 008 reading headings only; no Edit Skill / Delete Skill overlay headings.

### Implementation for User Story 1

- [x] T003 [P] [US1] Mount `SkillForm` in `components/skills/SkillList.tsx` only while create is open (do not leave a closed Create `<dialog>` in the DOM)
- [x] T004 [US1] Keep Edit Skill unmounted when closed in `components/skills/SkillDetail.tsx` (`editOpen` already gates `SkillEditForm`)
- [x] T005 [US1] Mount the Delete Skill `<dialog>` in `components/skills/SkillDetail.tsx` only while confirm is open; keep `showModal` when it mounts

**Checkpoint**: Inspector on the closed pages shows page content and opener buttons, not overlay headings/fields.

---

## Phase 4: User Story 2 - An open overlay has a name (Priority: P2)

**Goal**: Open overlays are identifiable as Create Skill, Edit Skill, or Delete Skill from the existing visible titles. 007 Name is required unchanged.

**Independent Test**: Open each overlay; inspector names it with that title. Empty-name Save still shows Name is required.

### Implementation for User Story 2

- [x] T006 [P] [US2] Set `aria-labelledby` on the Create Skill `<dialog>` to the existing `h2` id in `components/skills/SkillForm.tsx`
- [x] T007 [P] [US2] Set `aria-labelledby` on the Edit Skill `<dialog>` to the existing `h2` id in `components/skills/SkillEditForm.tsx`
- [x] T008 [US2] Set `aria-labelledby` on the Delete Skill `<dialog>` to the existing `h2` id in `components/skills/SkillDetail.tsx`

**Checkpoint**: Each open overlay has an accessible name matching its visible title.

---

## Phase 5: User Story 3 - Closing returns to the control that opened it (Priority: P3)

**Goal**: Cancel and Escape restore focus to the opener. Create Skill vs Create your first skill both count. Confirm delete still navigates away.

**Independent Test**: Open each overlay, Cancel or Escape, focus is on the opener. Do not confirm delete.

### Implementation for User Story 3

- [x] T009 [P] [US3] Remember the clicked opener in `components/skills/SkillList.tsx` and `.focus()` it in `onClose` (Create Skill and Create your first skill)
- [x] T010 [US3] Remember the Edit and Delete buttons in `components/skills/SkillDetail.tsx` and `.focus()` the opener on Cancel/Escape (skip restore after confirmed delete)

**Checkpoint**: Keyboard dismiss returns to the opener on the same page.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Lint, storage tests, browser inspector + keyboard

- [x] T011 Run `npm run lint` and fix issues in `components/skills/SkillList.tsx`, `SkillForm.tsx`, `SkillDetail.tsx`, and `SkillEditForm.tsx`
- [x] T012 Run `npm test` and confirm `lib/storage.test.ts` still passes
- [x] T013 Execute Scenarios A–E in `specs/009-skill-overlay-a11y/quickstart.md` against the running app (closed tree, open names, focus return, empty-catalog opener)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies
- **Foundational (Phase 2)**: Depends on Setup — BLOCKS all user stories
- **User Story 1 (Phase 3)**: Unmount closed dialogs (MVP)
- **User Story 2 (Phase 4)**: Name open dialogs; Delete labelledby after T005
- **User Story 3 (Phase 5)**: Focus restore on SkillList / SkillDetail after US1 mount gates exist
- **Polish (Phase 6)**: Depends on US1–US3

### User Story Dependencies

- **US1 (P1)**: After Foundational. Closed tree honesty (MVP).
- **US2 (P2)**: After US1 for Delete (`SkillDetail.tsx`). Create/Edit labelledby can start once those files are free.
- **US3 (P3)**: After US1 so close still unmounts; SkillList focus vs SkillDetail focus are different files.

### Parallel Opportunities

- T003 (`SkillList.tsx`) with T004–T005 (`SkillDetail.tsx`)
- T006 (`SkillForm.tsx`) with T007 (`SkillEditForm.tsx`)
- T009 (`SkillList.tsx`) with T010 (`SkillDetail.tsx`)
- T008 is **not** [P] with T005: same `SkillDetail.tsx`

---

## Parallel Example: User Story 2

```text
T006 components/skills/SkillForm.tsx
T007 components/skills/SkillEditForm.tsx
T008 after T005 on SkillDetail.tsx
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1–2
2. Complete Phase 3: closed overlays leave the tree
3. **STOP and VALIDATE**: inspector on My Skills and Skill Detail with overlays closed
4. Then US2 names, US3 focus, lint + `npm test` + quickstart A–E

### Incremental Delivery

1. Setup + no Overlay.tsx
2. US1 → unmount closed dialogs (MVP)
3. US2 → `aria-labelledby`
4. US3 → focus restore
5. Lint + `npm test` + browser

### Parallel Team Strategy

One developer. SkillList and SkillForm can move while SkillDetail/SkillEditForm land.

---

## Notes

- [P] = different files and no dependency on incomplete tasks
- Do not add a dialog library or `Overlay.tsx`
- Do not change overlay copy, Name is required, or 008 reading headings
- Capture the opener on click (`currentTarget`), not `document.activeElement` after `autoFocus` on Name
- Verify UI in the browser (inspector + keyboard)
- Stop at any checkpoint to validate that story
