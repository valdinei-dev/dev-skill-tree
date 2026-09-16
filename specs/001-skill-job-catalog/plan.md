# Implementation Plan: Skill Catalog

**Branch**: `001-skill-job-catalog` | **Date**: 2026-09-16 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/001-skill-job-catalog/spec.md`

**Note**: This template is filled in by the `/speckit-plan` command; its definition describes the execution workflow. Updated 2026-09-16 when Jobs left the MVP (constitution v2.0.0).

## Summary

Ship a client-only Next.js App Router product where a developer maintains a personal skill catalog (name, description, user-set priority and knowledge on a 1–5 scale, notes). Data persists in `localStorage` through `lib/storage.ts`. Pages stay Server Components; list/form/detail islands that touch the browser or handle events are Client Components. No accounts, backend, jobs, new dependencies, or extra architectural layers.

## Technical Context

**Language/Version**: TypeScript 5, React 19.2, Next.js 16.3 App Router

**Primary Dependencies**: Next.js, React, React DOM, Tailwind CSS 4 (already in the repo). No new packages.

**Storage**: Browser `localStorage` collection `skills`, accessed only via `lib/storage.ts`

**Testing**: Manual browser validation per [quickstart.md](./quickstart.md). No test runner in this MVP.

**Target Platform**: Desktop/laptop browsers; same-origin, same-device persistence

**Project Type**: Single Next.js web application (no backend)

**Performance Goals**: Created items visible in the current list in under 5 seconds without a user-required full reload (SC-002); first skill path under 2 minutes (SC-001)

**Constraints**: No auth, API routes, or remote data. UI MUST NOT call `localStorage` or JSON serialize directly. `'use client'` only at interactive/storage boundaries. `params` on dynamic pages is a Promise (Next.js 16) and MUST be awaited in the Server Component page. No Job entity or `/jobs` route.

**Scale/Scope**: Four routes, one entity, one user per browser. Typical catalog size is tens of skills, not thousands.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Gate | Pre-research | Post-design |
| --------- | ---- | ------------ | ----------- |
| I. MVP Scope Discipline | Only included catalog, navigation, local persistence | Pass | Pass |
| II. Skills Remain Independent | Skills persist without other entities; no job fields on Skill | Pass | Pass |
| III. Jobs Stay Out Until a Later Spec | No Job type, jobs collection, job routes, or in-use delete | Pass | Pass |
| IV. User-Owned Priority and Knowledge | Discrete 1–5, independent, never auto-calculated; defaults 1 / empty strings | Pass | Pass |
| V. Simplicity Before Abstraction | One storage module; no extra layers or libraries; Server Components by default | Pass | Pass |
| Technical Constraints | No backend/auth; `lib/storage.ts`; client load for Skill Detail | Pass | Pass |
| Scope Boundaries | Out-of-MVP list not designed in | Pass | Pass |

No unjustified violations. `updateSkill` / `deleteSkill` extend the constitution’s storage API because the spec requires edit and delete; they live in the same module, not a new layer.

`src/` from the MVP sketch is **not** used. The existing root `app/` tree is kept (research decision 1).

## Project Structure

### Documentation (this feature)

```text
specs/001-skill-job-catalog/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   ├── storage.md
│   └── ui.md
└── tasks.md
```

### Source Code (repository root)

```text
app/
├── layout.tsx                 # Root layout + Header
├── page.tsx                   # Home hero
├── globals.css
├── about/
│   └── page.tsx
└── skills/
    ├── page.tsx
    └── [id]/
        └── page.tsx           # Server page; renders SkillDetail

components/
├── Header.tsx                 # Server Component, next/link
└── skills/
    ├── SkillList.tsx          # Client
    ├── SkillForm.tsx          # Client, <dialog>
    └── SkillDetail.tsx        # Client, load/edit/delete

lib/
├── storage.ts                 # localStorage boundary
└── levels.ts                  # 1–5 → English labels

types/
└── skill.ts
```

**Structure Decision**: Single existing Next.js app. Extend `app/` in place. Add only `components/`, `lib/`, and `types/` at the repo root. No `src/` move, no `backend/`, no test tree until a later spec adds automated testing. No `components/jobs/` or `types/job.ts`.

## Complexity Tracking

> No constitution violations requiring justification.

## Phase 0

Research decisions are in [research.md](./research.md). There are no remaining NEEDS CLARIFICATION items in Technical Context.

## Phase 1

- [data-model.md](./data-model.md) — Skill, scale, delete
- [contracts/storage.md](./contracts/storage.md) — persistence API
- [contracts/ui.md](./contracts/ui.md) — routes, overlays, copy
- [quickstart.md](./quickstart.md) — browser validation

Next command: `/speckit-tasks`.
