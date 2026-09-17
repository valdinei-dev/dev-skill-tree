# Implementation Plan: Skill Detail View and Edit Overlay

**Branch**: `005-skill-view-edit` | **Date**: 2026-09-16 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/005-skill-view-edit/spec.md`

**Note**: This template is filled in by the `/speckit-plan` command; its definition describes the execution workflow.

## Summary

Skill Detail becomes a reading view (name, description, priority, knowledge, notes as labeled text). Edit opens a native `<dialog>` titled Edit Skill with the same five fields, Cancel, and Save. Save calls existing `updateSkill` and returns to the reading view. Cancel and dismiss discard. Delete confirmation from `004` stays on the reading view. Do not keep an always-on Save form on the page. Do not change `lib/storage.ts` or Create Skill.

## Technical Context

**Language/Version**: TypeScript 5, React 19.2, Next.js 16.3 App Router

**Primary Dependencies**: Next.js, React, Tailwind CSS 4 (existing). Native `<dialog>` (same pattern as Create Skill / Delete Skill). No new packages.

**Storage**: Unchanged. `updateSkill` in `lib/storage.ts` still patches an existing skill. Overlay loads persisted values from `useSkills()`.

**Testing**: Manual browser validation per [quickstart.md](./quickstart.md). No test runner.

**Target Platform**: Desktop/laptop browsers

**Project Type**: Single Next.js web application (no backend)

**Performance Goals**: Edit → Save in under 30 seconds after Skill Detail has loaded (SC-004)

**Constraints**: No always-on page Save. No inline field editing. No generic dialog library. Do not rewrite `specs/001-skill-job-catalog/` or `specs/004-skill-delete-confirm/` in this feature.

**Scale/Scope**: Reading layout in `components/skills/SkillDetail.tsx`; new edit overlay in `components/skills/SkillEditForm.tsx`.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Gate | Pre-research | Post-design |
| --------- | ---- | ------------ | ----------- |
| I. MVP Scope Discipline | View + update are included catalog capabilities | Pass | Pass |
| II. Skills Remain Independent | No new Skill fields | Pass | Pass |
| III. Jobs Stay Out Until a Later Spec | No Job UI | Pass | Pass |
| IV. User-Owned Priority and Knowledge | Overlay still offers user-set 1–5 labels | Pass | Pass |
| V. Simplicity Before Abstraction | Separate edit overlay; no shared “mode” form | Pass | Pass |
| Technical Constraints | SkillDetail stays Client; writes via storage module | Pass | Pass |
| Scope Boundaries | No auto-save, undo, or list edit | Pass | Pass |

No unjustified violations. Merging Create and Edit into one generic form was considered and rejected (research.md).

## Project Structure

### Documentation (this feature)

```text
specs/005-skill-view-edit/
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
components/skills/SkillDetail.tsx     # Reading view; Edit opens overlay; Delete overlay unchanged
components/skills/SkillEditForm.tsx   # Edit Skill <dialog>; Save → updateSkill
components/skills/SkillForm.tsx       # Create Skill — leave unchanged
lib/storage.ts                        # Unchanged updateSkill API
```

**Structure Decision**: Existing app. New edit overlay as a sibling of Create Skill, not a `mode` on `SkillForm`. No new route.

## Complexity Tracking

> No constitution violations requiring justification.

## Phase 0

Research decisions are in [research.md](./research.md). There are no remaining NEEDS CLARIFICATION items in Technical Context.

## Phase 1

- [data-model.md](./data-model.md) — no entity changes; edit overlay is transient UI state
- [contracts/ui.md](./contracts/ui.md) — reading view + Edit Skill overlay
- [quickstart.md](./quickstart.md) — browser validation

Next command: `/speckit-tasks`.
