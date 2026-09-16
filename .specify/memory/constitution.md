<!--
Sync Impact Report
- Version change: 1.0.0 → 2.0.0
- Modified principles:
  - I. MVP Scope Discipline → I. MVP Scope Discipline (skill catalog only;
    job requirements removed from included MVP)
  - II. Skills Remain Independent → II. Skills Remain Independent (no longer
    defined in terms of Job associations)
  - III. Jobs Associate Existing Skills Only → III. Jobs Stay Out Until a
    Later Spec (incompatible redefinition: Job is out of MVP)
  - IV. User-Owned Priority and Knowledge → unchanged
  - V. Simplicity Before Abstraction → unchanged (Job overlays/routes dropped
    from implied surface)
- Added sections: none
- Removed sections: none
- Follow-up TODOs: update feature spec 001, data-model, research, contracts,
  plan, tasks, and remove Job from application code
-->

# Dev Skill Tree Constitution

## Core Principles

### I. MVP Scope Discipline

Dev Skill Tree is a client-side web app that helps developers track,
organize, and improve technical knowledge through a personal skill catalog.

Every change MUST map to an Included MVP capability (skills catalog,
priority, knowledge, notes, navigation, and `localStorage` persistence)
or to an approved constitution amendment. Features listed under Scope
Boundaries as out of MVP MUST NOT be implemented until this constitution
is amended or a post-MVP specification is ratified.

Rationale: A small product that can be used immediately is the goal.
Speculative features delay that outcome. Manual job entry was rejected
because it would not be used; that does not expand this MVP.

### II. Skills Remain Independent

A Skill is a reusable item in the user's personal catalog. A Skill MUST
be creatable, listable, editable, deletable, and persistable without any
other entity existing.

The Skill record is the single source of truth for its own `id`, `name`,
`description`, `priority`, `knowledge`, and `notes`. A Skill MUST NOT
embed job-posting fields (company, salary, application status, or a list
of jobs). Context about roles MAY live in `notes` as free text.

Rationale: Users study skills for their own growth. The catalog MUST
work as a study tool on its own.

### III. Jobs Stay Out Until a Later Spec

The MVP MUST NOT include a Job entity, a jobs collection, job routes,
job creation UI, or skill–job association. Skill deletion MUST NOT be
blocked by job references.

Automatic import of job postings, extraction of skills from postings,
and job-application tracking MUST NOT be added to justify bringing Jobs
back. A later ratified specification MAY introduce Jobs. Until then,
unused Job surface MUST NOT remain in the product.

Rationale: Unused screens teach the wrong habit and hide the real MVP.
Import is a different product, not a reason to keep a dead entity.

### IV. User-Owned Priority and Knowledge

Priority is how important the user considers a skill. Knowledge is the
user's current self-assessed level. Both MUST use the same discrete
integer scale `1`–`5` (`1` Very Low, `2` Low, `3` Medium, `4` High,
`5` Very High) and MUST remain independent of each other.

The user MUST set both values explicitly. The application MUST NOT
calculate, infer, recommend, or otherwise automate priority or knowledge
in the MVP. Internal numeric values MUST stay independent of UI
representation (labels, stars, or other visuals MAY change; stored
integers MUST NOT be derived by the app).

On create, unspecified Skill fields MUST default to `description = ""`,
`priority = 1`, `knowledge = 1`, and `notes = ""`. Only `name` is
required.

Rationale: The product records the user's judgment. Automatic
intelligence belongs to later versions, after the core catalog is stable.

### V. Simplicity Before Abstraction

Do not add functionality because it might be useful later. Do not add
architectural layers unless they solve a demonstrated problem. Prefer a
design that can evolve over one that anticipates every future version.

The storage module is a required abstraction: UI components MUST NOT call
`localStorage`, `JSON.parse`, or `JSON.stringify` directly. Additional
layers (generic repositories, state machines, analytics pipelines) MUST
NOT be introduced without a concrete MVP need.

Pages MUST remain Server Components where possible. Components that read
browser APIs or handle user interaction MUST be Client Components.
`"use client"` MUST NOT be added without a concrete client-side reason.

Rationale: Future resources, study, career, and analytics features are
cheaper to add when the MVP stays small and explicit.

## Technical Constraints

The MVP MUST run without a backend, database, authentication, user
accounts, or external APIs. Persistence MUST use browser `localStorage`
with one collection: `skills` (complete Skill objects). The MVP MUST NOT
read or write a `jobs` collection.

Persistence logic MUST live in a dedicated storage module (conceptually
`lib/storage.ts`) that exposes operations such as `getSkills`,
`getSkillById`, `createSkill`, `updateSkill`, and `deleteSkill`.
`getSkillById` MAY be implemented by reading `getSkills` and finding by
`id`. Callers MUST NOT need to know serialization details. `deleteSkill`
MUST remove the skill when it exists; it MUST NOT consult other entities.

Skill Detail MUST load Skill data on the client because the source is
`localStorage`. The route MAY remain a Server Component; the component
that reads storage MUST be a Client Component. Missing skills MUST
surface a not-found state; loading MUST surface an explicit loading
state.

The stack is Next.js App Router with React. Suggested routes for the MVP
are `/`, `/skills`, `/skills/[id]`, and `/about`. A global header MUST
provide Logo, Home, My Skills, and About. Logo MUST sit on the start
edge; the remaining items MUST sit on the end edge. Skill creation MUST
use a modal or drawer rather than a permanently visible form. This
layout is the intended starting structure, not a mandate to add extra
directories or frameworks.

## Scope Boundaries

Included in the MVP:

- Create, list, view, update, and delete skills; sort or group by
  priority (higher first)
- Store skill `name`, `description`, `priority`, `knowledge`, and `notes`
- Navigate from the skill list to Skill Detail
- Persist skills across browser sessions via `localStorage`

Explicitly out of MVP (MUST NOT ship until a later ratified spec):

- Job entity, job routes, job–skill association, job import, and
  automatic skill extraction from postings
- Authentication, accounts, backend, database, external APIs
- Job metadata: company, salary, URL, description, application status,
  application dates
- Automatic skill prioritization, frequency analytics, charts, dashboards
- AI features, recommendations, notifications, search
- Learning resources (articles, videos, docs, courses), interview
  questions, spaced repetition, study sessions
- Skill categories; a status field separate from knowledge level

Planned later versions (Resources, Study, Career Opportunities, Knowledge
Analytics, Advanced Features) MUST NOT shape MVP data models or UI beyond
keeping Skill as the source of truth. A future Job feature MUST be a
separate specification.

## Governance

This constitution supersedes informal practice, README defaults, and
ad-hoc implementation convenience. Specifications, plans, tasks, and
code MUST comply with it. Where a spec and this constitution conflict,
the constitution wins until it is amended.

Amendments MUST be written into `.specify/memory/constitution.md`, bump
the version, update **Last Amended**, and include a Sync Impact Report
comment describing principle and section changes. Versioning:

- MAJOR: removal or incompatible redefinition of a principle or invariant
- MINOR: new principle or section, or material expansion of guidance
- PATCH: clarification, wording, or non-semantic refinement

Compliance review: every specification, plan, and pull request MUST
verify that proposed work stays inside Scope Boundaries, preserves Skill
independence, keeps Jobs out of this MVP, keeps priority and knowledge
user-controlled, and routes persistence through the storage module.
Unjustified complexity MUST be rejected.

Runtime development guidance for this Next.js version lives in
`AGENTS.md`. Feature work MUST proceed through Spec Kit (`specify` →
`plan` → `tasks` → `implement`) rather than expanding the MVP informally.

**Version**: 2.0.0 | **Ratified**: 2026-09-10 | **Last Amended**: 2026-09-16
