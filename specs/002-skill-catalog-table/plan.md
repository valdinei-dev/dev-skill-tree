# Implementation Plan: Skill Catalog Table

**Branch**: `002-skill-catalog-table` | **Date**: 2026-09-16 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/002-skill-catalog-table/spec.md`

**Note**: This template is filled in by the `/speckit-plan` command; its definition describes the execution workflow.

## Summary

Replace the unlabeled priority-grouped list on My Skills with a three-column table (Skill, Priority, Knowledge). Rows sort by priority descending, then by name (case-insensitive). Labels come from the existing 1–5 map. No storage, route, or Skill model changes. Skill name remains the link to Skill Detail. Empty catalog copy is unchanged.

## Technical Context

**Language/Version**: TypeScript 5, React 19.2, Next.js 16.3 App Router

**Primary Dependencies**: Next.js, React, React DOM, Tailwind CSS 4 (already in the repo). No new packages.

**Storage**: Unchanged. Browser `localStorage` collection `skills` via `lib/storage.ts`

**Testing**: Manual browser validation per [quickstart.md](./quickstart.md). No test runner in this feature.

**Target Platform**: Desktop/laptop browsers

**Project Type**: Single Next.js web application (no backend)

**Performance Goals**: Table matches Skill Detail labels (SC-003); opening a skill from a name stays under 5 seconds of navigation (SC-004)

**Constraints**: No Jobs, no derived sort, no knowledge-based order, no extra Client Component files without a client reason. `'use client'` stays on `SkillList`. Pages stay Server Components.

**Scale/Scope**: One surface (`/skills` non-empty list). Typical catalog: tens of skills.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Gate | Pre-research | Post-design |
| --------- | ---- | ------------ | ----------- |
| I. MVP Scope Discipline | List presentation only; still catalog + navigation | Pass | Pass |
| II. Skills Remain Independent | No new entity; Skill fields unchanged | Pass | Pass |
| III. Jobs Stay Out Until a Later Spec | No Job UI or storage | Pass | Pass |
| IV. User-Owned Priority and Knowledge | Display labels only; no inference or gap sort | Pass | Pass |
| V. Simplicity Before Abstraction | Change `SkillList` in place; native `<table>`; no new libraries | Pass | Pass |
| Technical Constraints | Existing storage module and routes | Pass | Pass |
| Scope Boundaries | No search, stars, recommendations, categories | Pass | Pass |

No unjustified violations. Constitution “sort or group by priority (higher first)” is satisfied by **sort** (ordered table), not group headings.

## Project Structure

### Documentation (this feature)

```text
specs/002-skill-catalog-table/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   └── ui.md
└── tasks.md             # Phase 2 (/speckit-tasks — not created here)
```

### Source Code (repository root)

```text
app/skills/page.tsx                 # Unchanged Server page
components/skills/SkillList.tsx     # Replace grouped list with table
components/skills/SkillForm.tsx     # Unchanged overlay
lib/levels.ts                       # Existing label map
lib/storage.ts                      # Unchanged
types/skill.ts                      # Unchanged
```

**Structure Decision**: Keep the existing Next.js app tree. Do not add `src/`, a `SkillTable` file, or a sort module unless implementation proves `SkillList` is unreadable. Default is one function in `SkillList.tsx`.

## Complexity Tracking

> No constitution violations requiring justification.

## Phase 0

Research decisions are in [research.md](./research.md). There are no remaining NEEDS CLARIFICATION items in Technical Context.

## Phase 1

- [data-model.md](./data-model.md) — view-order rules; Skill unchanged
- [contracts/ui.md](./contracts/ui.md) — table columns, sort, empty state
- [quickstart.md](./quickstart.md) — browser validation

Next command: `/speckit-tasks`.
