# Implementation Plan: Skill Detail Reading Accessibility

**Branch**: `008-skill-detail-reading-a11y` | **Date**: 2026-09-17 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/008-skill-detail-reading-a11y/spec.md`

**Note**: This template is filled in by the `/speckit-plan` command; its definition describes the execution workflow.

## Summary

Replace the Skill Detail `dl`/`dt`/`dd` reading block with named heading + value pairs (`h2` + text) so Description, Priority, Knowledge, and Notes appear in the accessibility tree even when description or notes are empty. Name stays `h1`. Keep `labelForLevel`. Edit, Delete, and overlays unchanged. No “None”. No new packages.

## Technical Context

**Language/Version**: TypeScript 5, React 19.2, Next.js 16.3 App Router

**Primary Dependencies**: Existing stack. Native HTML headings. No a11y or dialog library.

**Storage**: Unchanged. Reading still comes from `useSkills()`.

**Testing**: Manual browser + accessibility inspector per [quickstart.md](./quickstart.md). `npm test` (006) must still pass. No new UI tests.

**Target Platform**: Desktop/laptop browsers

**Project Type**: Single Next.js web application (no backend)

**Performance Goals**: Open Skill Detail and identify all four fields (including empties) without extra navigation (SC-001 / SC-004)

**Constraints**: No filler copy. No table work. Do not rewrite `specs/005`. Do not change overlay a11y in this feature.

**Scale/Scope**: `components/skills/SkillDetail.tsx` reading markup only.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Gate | Pre-research | Post-design |
| --------- | ---- | ------------ | ----------- |
| I. MVP Scope Discipline | Reading the catalog skill is included MVP | Pass | Pass |
| II. Skills Remain Independent | No new Skill fields | Pass | Pass |
| III. Jobs Stay Out Until a Later Spec | No Job UI | Pass | Pass |
| IV. User-Owned Priority and Knowledge | Still `labelForLevel`, not raw-only numbers | Pass | Pass |
| V. Simplicity Before Abstraction | Markup change in SkillDetail; no new component file or lib | Pass | Pass |
| Technical Constraints | SkillDetail stays Client; storage module unchanged | Pass | Pass |
| Scope Boundaries | Overlays and table out of this spec | Pass | Pass |

No unjustified violations. Keeping `dl` with wrapper `div`s was considered and rejected (research.md).

## Project Structure

### Documentation (this feature)

```text
specs/008-skill-detail-reading-a11y/
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
components/skills/SkillDetail.tsx     # Reading fields: h1 name; h2+value for four fields
components/skills/SkillEditForm.tsx   # Unchanged
components/skills/SkillForm.tsx       # Unchanged
lib/storage.ts                        # Unchanged
```

**Structure Decision**: Existing Skill Detail. No `ReadingField.tsx`. No new route.

## Complexity Tracking

> No constitution violations requiring justification.

## Phase 0

Research decisions are in [research.md](./research.md). There are no remaining NEEDS CLARIFICATION items in Technical Context.

## Phase 1

- [data-model.md](./data-model.md) — no entity changes
- [contracts/ui.md](./contracts/ui.md) — reading field names in the a11y tree
- [quickstart.md](./quickstart.md) — browser + inspector

Next command: `/speckit-tasks`.
