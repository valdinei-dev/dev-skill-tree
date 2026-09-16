# Implementation Plan: Home My Skills Action

**Branch**: `003-home-my-skills` | **Date**: 2026-09-16 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/003-home-my-skills/spec.md`

**Note**: This template is filled in by the `/speckit-plan` command; its definition describes the execution workflow.

## Summary

Change Home's single primary action from "Create Skills" to "My Skills". Destination stays `/skills`. The label does not depend on catalog contents. `app/page.tsx` remains a Server Component with a static `Link`. Empty-state create on My Skills is unchanged. README getting-started copy should match.

## Technical Context

**Language/Version**: TypeScript 5, React 19.2, Next.js 16.3 App Router

**Primary Dependencies**: Next.js, React, Tailwind CSS 4 (existing). No new packages.

**Storage**: Unchanged. Home MUST NOT read `localStorage` or `useSkills`.

**Testing**: Manual browser validation per [quickstart.md](./quickstart.md). No test runner.

**Target Platform**: Desktop/laptop browsers

**Project Type**: Single Next.js web application (no backend)

**Performance Goals**: One click from Home to My Skills (SC-002); first-skill path still under 2 minutes (SC-003)

**Constraints**: No `'use client'` on Home. No second CTA. No catalog-dependent label. Header unchanged.

**Scale/Scope**: One string (and matching README line) on `/`.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Gate | Pre-research | Post-design |
| --------- | ---- | ------------ | ----------- |
| I. MVP Scope Discipline | Navigation copy on included Home | Pass | Pass |
| II. Skills Remain Independent | No Skill field changes | Pass | Pass |
| III. Jobs Stay Out Until a Later Spec | No Job UI | Pass | Pass |
| IV. User-Owned Priority and Knowledge | Untouched | Pass | Pass |
| V. Simplicity Before Abstraction | Static Server `Link`; no Client island | Pass | Pass |
| Technical Constraints | Pages stay Server where possible | Pass | Pass |
| Scope Boundaries | No extra Home sections | Pass | Pass |

No unjustified violations. Reading storage on Home to swap the label was considered and rejected (spec FR-003).

## Project Structure

### Documentation (this feature)

```text
specs/003-home-my-skills/
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
app/page.tsx                 # Hero Link label: My Skills → /skills
README.md                    # Getting-started CTA wording
```

**Structure Decision**: Existing app. Do not add a Home client component.

## Complexity Tracking

> No constitution violations requiring justification.

## Phase 0

Research decisions are in [research.md](./research.md). There are no remaining NEEDS CLARIFICATION items in Technical Context.

## Phase 1

- [data-model.md](./data-model.md) — no entity changes
- [contracts/ui.md](./contracts/ui.md) — Home CTA
- [quickstart.md](./quickstart.md) — browser validation

Next command: `/speckit-tasks`.
