---
description: "Task list for Skill Delete Confirmation implementation"
---

# Tasks: Skill Delete Confirmation

**Input**: Design documents from `/specs/004-skill-delete-confirm/`

**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/

**Tests**: Not included. The spec and plan require manual browser validation via `quickstart.md`, not a test runner.

**Organization**: Tasks are grouped by user story so each story can be implemented and checked independently.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies on incomplete tasks)
- **[Story]**: User story label (US1–US2) on story-phase tasks only
- Every task includes an exact file path

## Path Conventions

Existing Next.js app at repo root. Touch `components/skills/SkillDetail.tsx` for behavior. Leave `lib/storage.ts` `deleteSkill` unchanged. Do not add a dialog library or a shared ConfirmDialog component.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Existing app. No new folders or packages.

- [x] T001 Confirm `components/skills/SkillDetail.tsx` stays a Client Component (`'use client'`) and do not add a dialog package per plan.md

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Confirmation is UI-only. Storage delete API stays the same.

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T002 Confirm `deleteSkill` in `lib/storage.ts` still removes an existing skill with no in-use guard per research.md; do not add a soft-delete field

**Checkpoint**: Storage is unchanged — overlay work can proceed in SkillDetail

---

## Phase 3: User Story 1 - Confirm before a skill is gone (Priority: P1) 🎯 MVP

**Goal**: Page Delete opens a native dialog with the locked copy. Overlay Delete removes the skill and returns to My Skills.

**Independent Test**: Open Skill Detail, choose page Delete, read heading Delete Skill, named skill, cannot be undone, Cancel and Delete. Confirm overlay Delete. Skill is gone on My Skills; old detail URL shows Skill not found.

### Implementation for User Story 1

- [x] T003 [US1] Change page Delete in `components/skills/SkillDetail.tsx` so it opens confirmation overlay state and does not call `deleteSkill`
- [x] T004 [US1] Add a native `<dialog>` in `components/skills/SkillDetail.tsx` using the `SkillForm` `showModal` / `close` pattern, with heading Delete Skill, body `You are about to delete the skill “{name}”. This cannot be undone.` using persisted `skill.name`, and Cancel then Delete
- [x] T005 [US1] Call `deleteSkill` and `router.replace("/skills")` only from overlay Delete in `components/skills/SkillDetail.tsx`

**Checkpoint**: Confirm path works (page Delete → overlay → overlay Delete → My Skills)

---

## Phase 4: User Story 2 - Back out without deleting (Priority: P2)

**Goal**: Cancel and dismiss close the overlay, stay on Skill Detail, and leave the skill in the catalog.

**Independent Test**: Page Delete, then Cancel (and separately Escape). Skill remains on Skill Detail and on My Skills. Overlay names the persisted skill, not an unsaved Name field.

### Implementation for User Story 2

- [x] T006 [US2] Wire Cancel, `onCancel`, and `onClose` in `components/skills/SkillDetail.tsx` to close the overlay without calling `deleteSkill`; remain on Skill Detail
- [x] T007 [P] [US2] Leave Create Skill overlay copy and behavior unchanged in `components/skills/SkillForm.tsx`

**Checkpoint**: Cancel and dismiss do not delete; create overlay still works

---

## Phase 5: Polish & Cross-Cutting Concerns

**Purpose**: Lint and browser check

- [x] T008 Run `npm run lint` and fix issues in `components/skills/SkillDetail.tsx`
- [x] T009 Execute Scenarios A–E in `specs/004-skill-delete-confirm/quickstart.md` against the running app

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies
- **Foundational (Phase 2)**: Depends on Setup — BLOCKS all user stories
- **User Story 1 (Phase 3)**: Depends on Foundational
- **User Story 2 (Phase 4)**: Depends on US1 overlay existing (same dialog)
- **Polish (Phase 5)**: Depends on US1 and US2

### User Story Dependencies

- **US1 (P1)**: After Foundational. Delivers confirmation + confirmed delete (MVP).
- **US2 (P2)**: After US1. Safe dismiss. Not a second overlay.

### Parallel Opportunities

- T007 (`SkillForm.tsx` verify-only) can run after T004 in parallel with T006
- T001–T006 are sequential on `SkillDetail.tsx` (except T002 is `lib/storage.ts` verify)

---

## Parallel Example: User Story 1

```text
Not applicable — US1 is sequential edits in components/skills/SkillDetail.tsx.
After T004: T007 (SkillForm verify) can proceed with T006 (cancel wiring).
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1–2 (SkillDetail stays Client; storage unchanged)
2. Complete Phase 3: overlay + confirmed delete
3. **STOP and VALIDATE**: page Delete does not remove; overlay Delete does
4. Then US2 cancel/dismiss + lint + quickstart A–E

### Incremental Delivery

1. Setup + storage constraint
2. US1 → confirm delete (MVP)
3. US2 → cancel and dismiss
4. Lint + quickstart A–E (include persisted name vs unsaved edit)

### Parallel Team Strategy

One developer; the code change is one file.

---

## Notes

- [P] = different files and no dependency on incomplete tasks
- Do not use `window.confirm`
- Do not extract a shared ConfirmDialog
- Do not rewrite `specs/001-skill-job-catalog/` in this feature
- Overlay name MUST be persisted `skill.name`, not the Name input
- Stop at any checkpoint to validate that story
