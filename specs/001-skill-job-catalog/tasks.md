---
description: "Task list for Skill and Job Catalog implementation"
---

# Tasks: Skill and Job Catalog

**Input**: Design documents from `/specs/001-skill-job-catalog/`

**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/

**Tests**: Not included. The spec and plan require manual browser validation via `quickstart.md`, not a test runner.

**Organization**: Tasks are grouped by user story so each story can be implemented and checked independently.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies on incomplete tasks)
- **[Story]**: User story label (US1–US7) on story-phase tasks only
- Every task includes an exact file path

## Path Conventions

Existing Next.js app at repo root (`app/`). Add `components/`, `lib/`, and `types/` as in plan.md. Do not introduce `src/`.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Folders and product identity on the existing Next.js 16 app

- [x] T001 Create `components/skills/`, `components/jobs/`, `lib/`, and `types/` directories at the repository root per plan.md
- [x] T002 Replace default Create Next App title and description with Dev Skill Tree metadata in `app/layout.tsx`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Types, level labels, storage module, and global header. MUST finish before any user story.

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T003 [P] Add the Skill type (`id`, `name`, `description`, `priority`, `knowledge`, `notes`) in `types/skill.ts`
- [x] T004 [P] Add the Job type (`id`, `name`, `skills: string[]`) in `types/job.ts`
- [x] T005 [P] Add the 1–5 English label map (Very Low … Very High) in `lib/levels.ts`
- [x] T006 Implement `getSkills`, `getSkillById`, `createSkill`, `updateSkill`, `deleteSkill`, `getJobs`, `getJobById`, `createJob`, and `countJobsUsingSkill` against `localStorage` keys `skills` and `jobs` in `lib/storage.ts`
- [x] T007 [P] Add the Header Server Component (Logo, Home, My Skills, Jobs, About) using `next/link` in `components/Header.tsx`
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

## Phase 6: User Story 4 - Record a job and its required skills (Priority: P3)

**Goal**: Create jobs from Jobs or My Skills (`/jobs?create=1`). Jobs list names plus resolved skill names. Creating a job never creates a skill.

**Independent Test**: Create two skills, create “Frontend Engineer” selecting them, confirm the job card lists those names. Create a name-only job. Empty Jobs shows heading + Create Job + My Skills.

### Implementation for User Story 4

- [x] T018 [P] [US4] Implement the create-job `<dialog>` (Job Name required; multi-select existing skills only; Cancel / Create; no skill creation) in `components/jobs/JobForm.tsx`
- [x] T019 [P] [US4] Implement JobList empty state and job cards that resolve skill names via `getSkills()` in `components/jobs/JobList.tsx`
- [x] T020 [US4] Compose JobList and JobForm on the Jobs route in `app/jobs/page.tsx`
- [x] T021 [US4] Add Create Job as a link to `/jobs?create=1` in `components/skills/SkillList.tsx`
- [x] T022 [US4] Open JobForm when `create=1` and `router.replace('/jobs')` on close in `components/jobs/JobList.tsx`

**Checkpoint**: Jobs can be created and listed without a job detail page

---

## Phase 7: User Story 5 - Open a required skill from a job (Priority: P3)

**Goal**: Skill names on a job open the same Skill Detail as My Skills. Unresolved ids are not normal links.

**Independent Test**: From a job card, open Web Vitals (or equivalent). Detail matches the catalog entry.

### Implementation for User Story 5

- [x] T023 [US5] Link each resolved job skill name to `/skills/[id]` and do not link unresolved ids in `components/jobs/JobList.tsx`

**Checkpoint**: Job → skill uses the existing detail page

---

## Phase 8: User Story 6 - Remove a skill that no job uses (Priority: P4)

**Goal**: Unused skills can be deleted. Skills referenced by jobs cannot; show usage count and the in-use explanation.

**Independent Test**: Delete an unused skill (gone). On a skill used by jobs, delete is disabled, “Used by N jobs” is visible, and a forced delete attempt keeps the skill and explains why.

### Implementation for User Story 6

- [x] T024 [US6] Add usage count, disabled delete when `countJobsUsingSkill` > 0, `deleteSkill`, and the in-use message in `components/skills/SkillDetail.tsx`

**Checkpoint**: Delete rules match the data-model invariants

---

## Phase 9: User Story 7 - Move around the product (Priority: P4)

**Goal**: Header destinations work. About is a short product page.

**Independent Test**: From any main page, Header reaches Home, My Skills, Jobs, and About. About shows a brief description only.

### Implementation for User Story 7

- [x] T025 [P] [US7] Add a minimal About page in `app/about/page.tsx`
- [x] T026 [P] [US7] Verify Header targets `/`, `/skills`, `/jobs`, and `/about` in `components/Header.tsx`

**Checkpoint**: All five routes are reachable from the header

---

## Phase 10: Polish & Cross-Cutting Concerns

**Purpose**: Docs and end-to-end check across stories

- [x] T027 [P] Update product purpose and `npm run dev` instructions in `README.md`
- [x] T028 Run `npm run lint` and fix issues in touched `app/`, `components/`, `lib/`, and `types/` files
- [x] T029 Execute Scenarios A–E in `specs/001-skill-job-catalog/quickstart.md` against the running app

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies
- **Foundational (Phase 2)**: Depends on Setup — BLOCKS all user stories
- **User Stories (Phase 3–9)**: Depend on Foundational; then follow priority or the story graph below
- **Polish (Phase 10)**: Depends on the stories you intend to ship

### User Story Dependencies

- **US1 (P1)**: After Foundational only
- **US2 (P2)**: After Foundational; extends SkillList and adds Skill Detail (needs US1 list/form in practice)
- **US3 (P2)**: After US1 (and US2 if validating detail after reload). Full spec (skills + jobs) needs US4 as well
- **US4 (P3)**: After Foundational + US1 (job picker needs existing skills)
- **US5 (P3)**: After US4 and US2 (links to Skill Detail)
- **US6 (P4)**: After US2 and US4 (delete uses job references)
- **US7 (P4)**: After Foundational (Header already exists); About can be built anytime after Phase 2

### Within Each User Story

- Shared types/storage before UI
- Client islands before the Server Component pages that compose them
- Story complete before the next priority unless working in parallel on different files

### Parallel Opportunities

- T003, T004, T005, T007 together (Phase 2)
- T009, T010, T011 together (US1), then T012
- T013 and T015 together (US2)
- T018 and T019 together (US4)
- T025 and T026 together (US7)
- T027 can run beside T028

---

## Parallel Example: User Story 1

```bash
# After Phase 2, launch US1 UI in parallel:
Task: "Replace home hero in app/page.tsx"
Task: "Implement create-skill dialog in components/skills/SkillForm.tsx"
Task: "Implement empty state and list in components/skills/SkillList.tsx"

# Then compose:
Task: "Compose My Skills page in app/skills/page.tsx"
```

## Parallel Example: User Story 4

```bash
Task: "Implement JobForm in components/jobs/JobForm.tsx"
Task: "Implement JobList in components/jobs/JobList.tsx"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Home → empty My Skills → create skill with name only
5. Demo if ready

### Incremental Delivery

1. Setup + Foundational
2. US1 → first skill (MVP)
3. US2 → browse, detail, edit
4. US3 → confirm persistence
5. US4 → jobs
6. US5 → job → skill
7. US6 → guarded delete
8. US7 → About + header check
9. Polish / quickstart A–E

### Parallel Team Strategy

1. Pair on Setup + Foundational
2. Then: Developer A on US1→US2→US3, Developer B on US4→US5 (after US1 exists for picker data), Developer C on US7 About
3. US6 last (needs skills + jobs)

---

## Notes

- [P] = different files and no dependency on incomplete tasks
- Do not add npm packages, a test runner, or a `src/` tree
- UI components must call `lib/storage.ts` only — never `localStorage` / `JSON.parse` / `JSON.stringify`
- Pages stay Server Components; `'use client'` only on SkillList, SkillForm, SkillDetail, JobList, JobForm
- Stop at any checkpoint to validate that story
