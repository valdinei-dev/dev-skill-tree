# Implementation Plan: Skill Name Required Feedback

**Branch**: `007-skill-name-required` | **Date**: 2026-09-17 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/007-skill-name-required/spec.md`

**Note**: This template is filled in by the `/speckit-plan` command; its definition describes the execution workflow.

## Summary

Create Skill and Edit Skill stop using the browser empty-field tooltip for Name. Both overlays validate with `name.trim()`, show the visible text **Name is required** next to Name (`aria-invalid` / `aria-describedby`), focus Name, and do not call `createSkill` / `updateSkill`. Empty and whitespace take the same path. Native `<dialog>` stays. No component library. `lib/storage.ts` unchanged.

## Technical Context

**Language/Version**: TypeScript 5, React 19.2, Next.js 16.3 App Router

**Primary Dependencies**: Existing Next.js, React, Tailwind CSS 4. Native `<dialog>`. No new packages.

**Storage**: Unchanged. UI MUST NOT reach `createSkill` / `updateSkill` when the name is empty after trim (so the user never sees an uncaught throw). Persistence still trims a valid name.

**Testing**: Manual browser validation per [quickstart.md](./quickstart.md). Existing `npm test` (storage contract) MUST still pass; this feature does not add UI tests.

**Target Platform**: Desktop/laptop browsers

**Project Type**: Single Next.js web application (no backend)

**Performance Goals**: After the error, valid Create or Save (or Cancel) in under 30 seconds (SC-004)

**Constraints**: Same copy and presentation on create and edit. No `required`+`reportValidity()` split. No Radix/shadcn. Do not rewrite `specs/001` or `specs/005` in this feature.

**Scale/Scope**: `components/skills/SkillForm.tsx` and `components/skills/SkillEditForm.tsx` only.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Gate | Pre-research | Post-design |
| --------- | ---- | ------------ | ----------- |
| I. MVP Scope Discipline | Create/update name is included catalog capability | Pass | Pass |
| II. Skills Remain Independent | No new Skill fields | Pass | Pass |
| III. Jobs Stay Out Until a Later Spec | No Job UI | Pass | Pass |
| IV. User-Owned Priority and Knowledge | Untouched | Pass | Pass |
| V. Simplicity Before Abstraction | Visible error in each overlay; no shared form, no dialog lib | Pass | Pass |
| Technical Constraints | Writes still only via storage module, and only after a valid name | Pass | Pass |
| Scope Boundaries | No table/ficha a11y, no extra field errors | Pass | Pass |

No unjustified violations. A form component library was considered and rejected (research.md).

## Project Structure

### Documentation (this feature)

```text
specs/007-skill-name-required/
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
components/skills/SkillForm.tsx       # Create Skill: visible Name is required
components/skills/SkillEditForm.tsx   # Edit Skill: same error pattern
lib/storage.ts                        # Unchanged
```

**Structure Decision**: Existing overlays. Duplicate the small error pattern in both files (constitution V). No `NameField` extraction and no `mode` on SkillForm.

## Complexity Tracking

> No constitution violations requiring justification.

## Phase 0

Research decisions are in [research.md](./research.md). There are no remaining NEEDS CLARIFICATION items in Technical Context.

## Phase 1

- [data-model.md](./data-model.md) — no entity changes; name-error is transient overlay state
- [contracts/ui.md](./contracts/ui.md) — Name is required on Create and Edit
- [quickstart.md](./quickstart.md) — browser validation

Next command: `/speckit-tasks`.
