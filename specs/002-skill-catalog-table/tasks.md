---
description: "Task list for Skill Catalog Table implementation"
---

# Tasks: Skill Catalog Table

**Input**: Design documents from `/specs/002-skill-catalog-table/`

**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/

**Tests**: Not included. The spec and plan require manual browser validation via `quickstart.md`, not a test runner.

**Organization**: Tasks are grouped by user story so each story can be implemented and checked independently.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies on incomplete tasks)
- **[Story]**: User story label (US1–US2) on story-phase tasks only
- Every task includes an exact file path

## Path Conventions

Existing Next.js app at repo root. Change only `components/skills/SkillList.tsx` unless polish says otherwise. Do not add `src/`, `SkillTable.tsx`, or npm packages.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: This feature extends the existing catalog app. No new folders or dependencies.

- [x] T001 Confirm `app/skills/page.tsx` stays a Server Component that only renders `SkillList`; do not add packages or a `SkillTable` file per plan.md

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: View-order rule used by the table. MUST finish before user story UI.

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T002 Replace `groupByPriority` with a sort of skills by `priority` descending then `name` (case-insensitive `localeCompare` with `sensitivity: "base"`) in `components/skills/SkillList.tsx`. Do not sort by knowledge or a gap.

**Checkpoint**: Ordered array ready — table markup can use it

---

## Phase 3: User Story 1 - Scan priority and knowledge in one view (Priority: P1) 🎯 MVP

**Goal**: Non-empty My Skills is a three-column table with labeled Priority and Knowledge. Empty state is unchanged.

**Independent Test**: Seed at least six skills across three or more priority levels with mixed knowledge. Open My Skills. Confirm headings Skill, Priority, Knowledge; each row shows both labels; higher priority first; same priority is A–Z; no lone “Very High” section titles. Empty catalog still shows “You don't have any skills yet.” and Create your first skill.

### Implementation for User Story 1

- [x] T003 [US1] Render a native `<table>` (`<thead>` / `<th>` Skill, Priority, Knowledge; one `<tbody>` row per sorted skill) using `labelForLevel` in `components/skills/SkillList.tsx`
- [x] T004 [US1] Remove unlabeled priority `<h2>` groups and the name-only `<ul>` from the non-empty branch in `components/skills/SkillList.tsx`; keep Create Skill and the empty-state copy; do not add description or notes columns

**Checkpoint**: User Story 1 is usable alone (scan the catalog)

---

## Phase 4: User Story 2 - Open a skill from the table (Priority: P2)

**Goal**: The skill name opens the existing Skill Detail. Priority and Knowledge stay plain text.

**Independent Test**: From the table, choose a skill name. Skill Detail shows name, description, priority, knowledge, and notes. Priority/Knowledge cells are not links.

### Implementation for User Story 2

- [x] T005 [US2] Wrap the Skill column name in `next/link` to `/skills/[id]` in `components/skills/SkillList.tsx`; leave Priority and Knowledge as text

**Checkpoint**: User Stories 1 and 2 work together on the same table

---

## Phase 5: Polish & Cross-Cutting Concerns

**Purpose**: Lint and end-to-end check

- [x] T006 Run `npm run lint` and fix issues in `components/skills/SkillList.tsx`
- [x] T007 Execute Scenarios A–E in `specs/002-skill-catalog-table/quickstart.md` against the running app

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies
- **Foundational (Phase 2)**: Depends on Setup — BLOCKS all user stories
- **User Story 1 (Phase 3)**: Depends on Foundational; same file as T002
- **User Story 2 (Phase 4)**: Depends on US1 table markup (same file)
- **Polish (Phase 5)**: Depends on US1 and US2

### User Story Dependencies

- **US1 (P1)**: After Foundational. Delivers the scannable table (MVP).
- **US2 (P2)**: After US1. Adds the name link. Cannot run in parallel with US1 (both edit `components/skills/SkillList.tsx`).

### Within Each User Story

- Sort (T002) before table markup (T003)
- Table columns (T003) before removing old groups (T004) if doing them separately; they may be one edit pass
- Name link (T005) after the Skill column exists
- Lint and quickstart last

### Parallel Opportunities

- None during US1/US2: a single file (`SkillList.tsx`)
- T001 does not conflict with later tasks if it only verifies `app/skills/page.tsx`

---

## Parallel Example: User Story 1

```text
Not applicable — T003 and T004 both edit components/skills/SkillList.tsx.
Run them sequentially (or as one implementation pass that still checks off both).
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (sort)
3. Complete Phase 3: User Story 1 (table)
4. **STOP and VALIDATE**: My Skills table headings, labels, order, empty state
5. Demo if ready (names may be text until US2)

### Incremental Delivery

1. Setup + sort
2. US1 → table (MVP)
3. US2 → name links
4. Polish / quickstart A–E

### Parallel Team Strategy

One developer; do not split US1 and US2 across people on the same file.

---

## Notes

- [P] = different files and no dependency on incomplete tasks (unused here)
- Do not add npm packages, a test runner, `src/`, or `SkillTable.tsx`
- Do not change `lib/storage.ts` or `types/skill.ts`
- Do not sort by knowledge or `priority - knowledge`
- UI components must still call `lib/storage.ts` only — never `localStorage` directly
- Stop at any checkpoint to validate that story
