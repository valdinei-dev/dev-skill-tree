# Implementation Plan: Skill Overlay Accessibility

**Branch**: `009-skill-overlay-a11y` | **Date**: 2026-09-17 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/009-skill-overlay-a11y/spec.md`

**Note**: This template is filled in by the `/speckit-plan` command; its definition describes the execution workflow.

## Summary

Stop closed Create / Edit / Delete overlays from leaking into the page accessibility tree by mounting each native `<dialog>` only while open (Edit already does this). When open, name the dialog from its existing `h2` via `aria-labelledby`. On Cancel or Escape, return focus to the control that opened it. No dialog library. No shared Overlay component. Copy, 007 validation, and 008 reading headings stay.

## Technical Context

**Language/Version**: TypeScript 5, React 19.2, Next.js 16.3 App Router

**Primary Dependencies**: Existing stack. Native `<dialog>`. No a11y or dialog library.

**Storage**: Unchanged.

**Testing**: Manual browser + accessibility inspector + keyboard per [quickstart.md](./quickstart.md). `npm test` (006) must still pass. No new UI tests.

**Target Platform**: Desktop/laptop browsers

**Project Type**: Single Next.js web application (no backend)

**Performance Goals**: Identify an open overlay and return to the opener on the first try (SC-002 / SC-003)

**Constraints**: No component library. No table work. Do not rewrite 004/005/007/008 folders. Do not change overlay copy or Name is required.

**Scale/Scope**: `SkillList.tsx`, `SkillForm.tsx`, `SkillDetail.tsx`, `SkillEditForm.tsx`

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Gate | Pre-research | Post-design |
| --------- | ---- | ------------ | ----------- |
| I. MVP Scope Discipline | Catalog create/edit/delete overlays are included MVP | Pass | Pass |
| II. Skills Remain Independent | No new Skill fields | Pass | Pass |
| III. Jobs Stay Out Until a Later Spec | No Job UI | Pass | Pass |
| IV. User-Owned Priority and Knowledge | Overlay level selects unchanged | Pass | Pass |
| V. Simplicity Before Abstraction | Native dialog in existing files; no Overlay.tsx / library | Pass | Pass |
| Technical Constraints | Overlay hosts stay Client; storage unchanged | Pass | Pass |
| Scope Boundaries | Table and 008 reading markup out | Pass | Pass |

No unjustified violations. A shared dialog wrapper was considered and rejected (research.md).

## Project Structure

### Documentation (this feature)

```text
specs/009-skill-overlay-a11y/
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
components/skills/SkillList.tsx       # Mount Create only while open; restore focus to opener
components/skills/SkillForm.tsx       # aria-labelledby on Create Skill dialog
components/skills/SkillDetail.tsx     # Mount Delete only while open; labelledby; restore focus
components/skills/SkillEditForm.tsx   # aria-labelledby on Edit Skill dialog; opener focus via parent
lib/storage.ts                        # Unchanged
```

**Structure Decision**: Existing Client overlay files. No new route. No `Overlay.tsx`.

## Complexity Tracking

> No constitution violations requiring justification.

## Phase 0

Research decisions are in [research.md](./research.md). There are no remaining NEEDS CLARIFICATION items in Technical Context.

## Phase 1

- [data-model.md](./data-model.md) — no entity changes; overlay open/closed + opener focus
- [contracts/ui.md](./contracts/ui.md) — closed vs open overlay in the a11y tree; focus return
- [quickstart.md](./quickstart.md) — browser inspector + keyboard

Next command: `/speckit-tasks`.
