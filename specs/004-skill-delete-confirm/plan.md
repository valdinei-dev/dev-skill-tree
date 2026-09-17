# Implementation Plan: Skill Delete Confirmation

**Branch**: `004-skill-delete-confirm` | **Date**: 2026-09-16 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/004-skill-delete-confirm/spec.md`

**Note**: This template is filled in by the `/speckit-plan` command; its definition describes the execution workflow.

## Summary

Skill Detail’s page Delete must open a native `<dialog>` confirmation before `deleteSkill` runs. Copy is locked (Delete Skill / named skill / cannot be undone / Cancel / Delete). Cancel and dismiss leave the skill in place. Overlay Delete still calls existing `deleteSkill` and `router.replace("/skills")`. Storage API and Skill fields stay unchanged. Do not use `window.confirm` or a new overlay library.

## Technical Context

**Language/Version**: TypeScript 5, React 19.2, Next.js 16.3 App Router

**Primary Dependencies**: Next.js, React, Tailwind CSS 4 (existing). Native `<dialog>` (same pattern as Create Skill). No new packages.

**Storage**: Unchanged. Confirmation is UI-only. `deleteSkill` in `lib/storage.ts` still removes an existing skill with no in-use guard. Overlay name comes from the persisted `skill.name` already loaded by `useSkills`.

**Testing**: Manual browser validation per [quickstart.md](./quickstart.md). No test runner.

**Target Platform**: Desktop/laptop browsers

**Project Type**: Single Next.js web application (no backend)

**Performance Goals**: Confirm-and-remove in under 30 seconds after Skill Detail is open (SC-004)

**Constraints**: First Delete must not call `deleteSkill`. No undo, soft-delete, or delete on My Skills. Do not rewrite `specs/001-skill-job-catalog/` in this feature.

**Scale/Scope**: One overlay on Skill Detail (`components/skills/SkillDetail.tsx`).

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Gate | Pre-research | Post-design |
| --------- | ---- | ------------ | ----------- |
| I. MVP Scope Discipline | Delete is included catalog capability | Pass | Pass |
| II. Skills Remain Independent | No new Skill fields; delete still unblocked | Pass | Pass |
| III. Jobs Stay Out Until a Later Spec | No in-use guard, no Job UI | Pass | Pass |
| IV. User-Owned Priority and Knowledge | Untouched | Pass | Pass |
| V. Simplicity Before Abstraction | Reuse `<dialog>` in SkillDetail; no confirm library | Pass | Pass |
| Technical Constraints | SkillDetail stays Client; storage module owns writes | Pass | Pass |
| Scope Boundaries | No recycle bin, undo, or list delete | Pass | Pass |

No unjustified violations. `window.confirm` and a shared Dialog component were considered and rejected (research.md).

## Project Structure

### Documentation (this feature)

```text
specs/004-skill-delete-confirm/
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
components/skills/SkillDetail.tsx   # Page Delete opens <dialog>; overlay Delete calls deleteSkill
lib/storage.ts                      # Unchanged deleteSkill API
```

**Structure Decision**: Existing app. Keep confirmation inside `SkillDetail.tsx`. Do not add a generic dialog package or a new route.

## Complexity Tracking

> No constitution violations requiring justification.

## Phase 0

Research decisions are in [research.md](./research.md). There are no remaining NEEDS CLARIFICATION items in Technical Context.

## Phase 1

- [data-model.md](./data-model.md) — no entity changes; overlay is transient UI state
- [contracts/ui.md](./contracts/ui.md) — Skill Detail delete confirmation
- [quickstart.md](./quickstart.md) — browser validation

Next command: `/speckit-tasks`.
