---
description: "Task list for Skill Detail View and Edit Overlay implementation"
---

# Tasks: Skill Detail View and Edit Overlay

**Input**: Design documents from `/specs/005-skill-view-edit/`

**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/

**Tests**: Not included. The spec and plan require manual browser validation via `quickstart.md`, not a test runner.

**Organization**: Tasks are grouped by user story so each story can be implemented and checked independently.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies on incomplete tasks)
- **[Story]**: User story label (US1–US3) on story-phase tasks only
- Every task includes an exact file path

## Path Conventions

Existing Next.js app at repo root. Reading view in `components/skills/SkillDetail.tsx`. New overlay in `components/skills/SkillEditForm.tsx`. Leave `lib/storage.ts` and `components/skills/SkillForm.tsx` unchanged. Do not add a `mode` prop to Create Skill or a dialog library.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Existing app. No new folders or packages.

- [x] T001 Confirm `components/skills/SkillDetail.tsx` stays a Client Component (`'use client'`) and do not add a dialog package per plan.md

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Update stays on the existing storage API. Create Skill stays create-only.

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T002 Confirm `updateSkill` in `lib/storage.ts` still patches an existing skill per research.md; do not add auto-save
- [x] T003 Confirm `components/skills/SkillForm.tsx` stays create-only; do not add an edit `mode` per plan.md

**Checkpoint**: Storage and Create Skill are unchanged — reading view and a separate edit overlay can proceed

---

## Phase 3: User Story 1 - Read a skill without entering edit (Priority: P1) 🎯 MVP

**Goal**: Skill Detail is a labeled reading ficha with Edit and Delete. No page-level Save form.

**Independent Test**: Open an existing skill. See name, description, priority, knowledge, and notes as reading content. Edit and Delete are present. Delete still opens Delete Skill. Empty description/notes still show their labels.

### Implementation for User Story 1

- [x] T004 [US1] Replace the always-on page `<form>` and Save control in `components/skills/SkillDetail.tsx` with a reading view: name as heading, labeled description, priority and knowledge via `labelForLevel`, labeled notes; keep labels visible when description or notes are empty
- [x] T005 [US1] Add an Edit action on the reading view in `components/skills/SkillDetail.tsx` that sets `editOpen` and does not call `updateSkill`
- [x] T006 [US1] Keep the Delete Skill confirmation `<dialog>` on the reading view in `components/skills/SkillDetail.tsx` per `004-skill-delete-confirm`

**Checkpoint**: Opening a skill is review, not a save form. Delete still confirms.

---

## Phase 4: User Story 2 - Change a skill through Edit Skill (Priority: P2)

**Goal**: Edit opens Edit Skill. Save with a valid name persists via `updateSkill` and returns to the reading view.

**Independent Test**: Edit → change name → Save. Overlay closes. Reading view and My Skills show the new name. Empty name does not save.

### Implementation for User Story 2

- [x] T007 [P] [US2] Create `components/skills/SkillEditForm.tsx` using the `SkillForm` `showModal` / `close` pattern, heading Edit Skill, fields Name Description Priority Knowledge Notes from the persisted `skill` prop, and Cancel then Save
- [x] T008 [US2] Call `updateSkill` from Save in `components/skills/SkillEditForm.tsx` when name is non-empty, then close; use `reportValidity` and skip `updateSkill` when name is empty or whitespace
- [x] T009 [US2] Mount `SkillEditForm` from `components/skills/SkillDetail.tsx` when `editOpen` is true, remount each open so fields load current persisted values, and stay on Skill Detail after Save

**Checkpoint**: Edit → Save updates the ficha without a page-level form

---

## Phase 5: User Story 3 - Back out of Edit without saving (Priority: P3)

**Goal**: Cancel and dismiss close Edit Skill and leave the last saved skill unchanged.

**Independent Test**: Edit, change name, Cancel (and separately Escape). Reading view and My Skills keep the previous name.

### Implementation for User Story 3

- [x] T010 [US3] Wire Cancel, `onCancel`, and `onClose` in `components/skills/SkillEditForm.tsx` to close without calling `updateSkill`
- [x] T011 [P] [US3] Leave Create Skill overlay copy and behavior unchanged in `components/skills/SkillForm.tsx`

**Checkpoint**: Abandoned edits do not write; create overlay still works

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Lint and browser check

- [x] T012 Run `npm run lint` and fix issues in `components/skills/SkillDetail.tsx` and `components/skills/SkillEditForm.tsx`
- [x] T013 Execute Scenarios A–G in `specs/005-skill-view-edit/quickstart.md` against the running app

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies
- **Foundational (Phase 2)**: Depends on Setup — BLOCKS all user stories
- **User Story 1 (Phase 3)**: Depends on Foundational
- **User Story 2 (Phase 4)**: Depends on US1 `editOpen` on Skill Detail
- **User Story 3 (Phase 5)**: Depends on US2 overlay existing
- **Polish (Phase 6)**: Depends on US1–US3

### User Story Dependencies

- **US1 (P1)**: After Foundational. Delivers the reading ficha (MVP).
- **US2 (P2)**: After US1. Edit Skill overlay + Save.
- **US3 (P3)**: After US2. Safe dismiss. Not a second overlay.

### Parallel Opportunities

- T007 (`SkillEditForm.tsx`) can start after Foundational in parallel with T004–T006 (`SkillDetail.tsx`)
- T011 (`SkillForm.tsx` verify-only) can run after T003 in parallel with T010
- T002 and T003 are verify-only on different files and can run together

---

## Parallel Example: User Story 1

```text
T004–T006 are sequential on components/skills/SkillDetail.tsx.
In parallel, T007 can create components/skills/SkillEditForm.tsx for US2.
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1–2 (Client SkillDetail; storage and Create unchanged)
2. Complete Phase 3: reading view + Edit + Delete overlay
3. **STOP and VALIDATE**: opening a skill is review
4. Then US2 Save + US3 Cancel + lint + quickstart A–G

### Incremental Delivery

1. Setup + storage/create constraints
2. US1 → reading ficha (MVP)
3. US2 → Edit Skill Save
4. US3 → Cancel/dismiss
5. Lint + quickstart A–G

### Parallel Team Strategy

One developer. SkillEditForm can be drafted while the reading view lands in SkillDetail.

---

## Notes

- [P] = different files and no dependency on incomplete tasks
- Do not generalize `SkillForm` with a `mode` prop
- Do not keep page-level Save or a “Saved” toast on the reading view
- Remount Edit Skill each open so Cancel does not leak into the next Edit
- Do not rewrite `specs/001-skill-job-catalog/` or `specs/004-skill-delete-confirm/`
- Stop at any checkpoint to validate that story
