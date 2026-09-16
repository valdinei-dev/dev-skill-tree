---
description: "Task list for Skill Catalog implementation"
---

# Tasks: Skill Catalog

**Input**: Design documents from `/specs/001-skill-job-catalog/`

**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/

**Tests**: Not included. The spec and plan require manual browser validation via `quickstart.md`, not a test runner.

**Organization**: Tasks are grouped by user story so each story can be implemented and checked independently.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies on incomplete tasks)
- **[Story]**: User story label (US1–US5) on story-phase tasks only
- Every task includes an exact file path

## Path Conventions

Existing Next.js app at repo root (`app/`). Add `components/`, `lib/`, and `types/` as in plan.md. Do not introduce `src/`.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Folders and product identity on the existing Next.js 16 app

- [x] T001 Create `components/skills/`, `lib/`, and `types/` directories at the repository root per plan.md
- [x] T002 Replace default Create Next App title and description with Dev Skill Tree metadata in `app/layout.tsx`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Types, level labels, storage module, and global header. MUST finish before any user story.

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T003 [P] Add the Skill type (`id`, `name`, `description`, `priority`, `knowledge`, `notes`) in `types/skill.ts`
- [x] T005 [P] Add the 1–5 English label map (Very Low … Very High) in `lib/levels.ts`
- [x] T006 Implement `getSkills`, `getSkillById`, `createSkill`, `updateSkill`, and `deleteSkill` against `localStorage` key `skills` in `lib/storage.ts`
- [x] T007 [P] Add the Header Server Component (Logo, Home, My Skills, About) using `next/link` in `components/Header.tsx`
- [x] T008 Render `Header` above page children in `app/layout.tsx`

**Checkpoint**: Foundation ready — user story implementation can begin

---

## Phase 3: User Story 1 - Create the first skill (Priority: P1) 🎯 MVP

**Goal**: A first-time user goes from Home to My Skills, opens a create overlay, and sees a named skill in the catalog.

**Independent Test**: Empty catalog. Home → Create Skills → empty state → Create your first skill → submit name only → skill appears in the list. Empty name does not create.

### Implementation for User Story 1

- [x] T009 [P] [US1] Replace the default home page with a hero (track/improve technical skills) and a Create Skills `Link` to `/skills` in `app/page.tsx`
- [x] T010 [P] [US1] Implement the create-skill `<dialog>` (Name required; Description, Priority, Knowledge, Notes optional; defaults empty / 1; Cancel) in `components/skills/SkillForm.tsx`
- [x] T011 [P] [US1] Implement SkillList empty state (“You don't have any skills yet.” / Create your first skill) and a post-create name list that re-reads `getSkills()` in `components/skills/SkillList.tsx`
- [x] T012 [US1] Compose SkillList and SkillForm on the My Skills route in `app/skills/page.tsx`

**Checkpoint**: User Story 1 is usable alone (home + create + list)

---

## Phase 4: User Story 2 - Browse skills and open a skill (Priority: P2)

**Goal**: Skills are grouped by priority (high first). Opening a skill shows detail, loading, not-found, and in-place edit.

**Independent Test**: Seed several priorities. Confirm Very High appears before lower groups. Open a skill, edit a field, confirm list and detail update. Open `/skills/not-a-real-id` and see Skill not found after Loading...

### Implementation for User Story 2

- [x] T013 [P] [US2] Group skills by priority 5…1 (omit empty groups; name sort inside a group) and add Create Skill in `components/skills/SkillList.tsx`
- [x] T014 [US2] Make each skill name a `Link` to `/skills/[id]` in `components/skills/SkillList.tsx`
- [x] T015 [P] [US2] Implement SkillDetail client island: Loading..., found fields, Skill not found, and save via `updateSkill` in `components/skills/SkillDetail.tsx`
- [x] T016 [US2] Add the Skill Detail Server Component page that awaits `params` and passes `id` to SkillDetail in `app/skills/[id]/page.tsx`

**Checkpoint**: User Stories 1 and 2 work independently

---

## Phase 5: User Story 3 - Keep the catalog after leaving (Priority: P2)

**Goal**: Skills created in this browser survive a full leave-and-return with no sign-in.

**Independent Test**: Create a skill, close the tab, reopen the same origin, confirm the skill and its fields are still listed. No account prompt.

### Implementation for User Story 3

- [x] T017 [US3] Ensure SkillList and SkillDetail load only after mount from `lib/storage.ts` (no SSR `localStorage`, no in-memory-only catalog) in `components/skills/SkillList.tsx` and `components/skills/SkillDetail.tsx`

**Checkpoint**: Refresh/reopen restores skills without auth

---

## Phase 6: User Story 4 - Remove a skill (Priority: P4)

**Goal**: Any existing skill can be deleted from Skill Detail. It disappears from My Skills.

**Independent Test**: Create a skill, delete it, confirm it is gone and Delete is not blocked.

### Implementation for User Story 4

- [x] T024 [US4] Add delete via `deleteSkill` in `components/skills/SkillDetail.tsx` (no in-use guard)

**Checkpoint**: Delete removes the skill

---

## Phase 7: User Story 5 - Move around the product (Priority: P4)

**Goal**: Header destinations work. About is a short product page. Logo is visually separated from nav items.

**Independent Test**: From any main page, Header reaches Home, My Skills, and About. About shows a brief description only. No Jobs item.

### Implementation for User Story 5

- [x] T025 [P] [US5] Add a minimal About page in `app/about/page.tsx`
- [x] T026 [P] [US5] Header targets `/`, `/skills`, and `/about` with Logo on the start edge in `components/Header.tsx`

**Checkpoint**: All four routes are reachable from the header

---

## Phase 8: Remove Jobs from the MVP (constitution v2.0.0)

**Purpose**: Align code with constitution 2.0.0 after Jobs were cut from the spec.

- [x] T030 Remove Job types and storage (`getJobs`, `createJob`, `countJobsUsingSkill`, `useJobs`, `jobs` key) from `lib/storage.ts` and delete `types/job.ts`
- [x] T031 Delete `components/jobs/JobForm.tsx`, `components/jobs/JobList.tsx`, and `app/jobs/page.tsx`
- [x] T032 Remove Create Job from `components/skills/SkillList.tsx`
- [x] T033 Remove in-use delete UI from `components/skills/SkillDetail.tsx`
- [x] T034 Remove Jobs from `components/Header.tsx` and place Logo on the start edge, remaining items on the end edge
- [x] T035 Remove job-association copy from `app/layout.tsx`, `app/page.tsx`, `app/about/page.tsx`, and `README.md`
- [x] T036 Run `npm run lint` on touched application files

---

## Phase 9: Polish & Cross-Cutting Concerns

**Purpose**: Docs and end-to-end check across stories

- [x] T027 [P] Update product purpose and `npm run dev` instructions in `README.md`
- [x] T028 Run `npm run lint` and fix issues in touched `app/`, `components/`, `lib/`, and `types/` files
- [x] T029 Execute Scenarios A–E in `specs/001-skill-job-catalog/quickstart.md` against the running app

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies
- **Foundational (Phase 2)**: Depends on Setup — BLOCKS all user stories
- **User Stories (Phases 3–7)**: Depend on Foundational
- **Remove Jobs (Phase 8)**: Aligns shipped code with constitution v2.0.0
- **Polish (Phase 9)**: Depends on the stories you intend to ship

### User Story Dependencies

- **US1 (P1)**: After Foundational only
- **US2 (P2)**: After Foundational; extends SkillList and adds Skill Detail
- **US3 (P2)**: After US1
- **US4 (P4)**: After US2 (delete lives on Skill Detail)
- **US5 (P4)**: After Foundational (Header already exists); About can be built anytime after Phase 2

### Parallel Opportunities

- T003, T005, T007 together (Phase 2)
- T009, T010, T011 together (US1), then T012
- T013 and T015 together (US2)
- T025 and T026 together (US5)
- T030–T035 together on different files

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Home → empty My Skills → create skill with name only

### Incremental Delivery

1. Setup + Foundational
2. US1 → first skill (MVP)
3. US2 → browse, detail, edit
4. US3 → confirm persistence
5. US4 → delete
6. US5 → About + header
7. Phase 8 if an earlier revision still has Jobs
8. Polish / quickstart A–E

---

## Notes

- [P] = different files and no dependency on incomplete tasks
- Do not add npm packages, a test runner, or a `src/` tree
- UI components must call `lib/storage.ts` only — never `localStorage` / `JSON.parse` / `JSON.stringify`
- Pages stay Server Components; `'use client'` only on SkillList, SkillForm, SkillDetail
- Stop at any checkpoint to validate that story
- Historical Job tasks (former T004, T018–T023, job-guarded delete) were removed from this list when constitution v2.0.0 cut Jobs from the MVP
