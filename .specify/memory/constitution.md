<!--
Sync Impact Report
- Version change: (unset template) → 1.0.0
- Modified principles:
  - [PRINCIPLE_1_NAME] → I. MVP Scope Discipline
  - [PRINCIPLE_2_NAME] → II. Skills Remain Independent
  - [PRINCIPLE_3_NAME] → III. Jobs Associate Existing Skills Only
  - [PRINCIPLE_4_NAME] → IV. User-Owned Priority and Knowledge
  - [PRINCIPLE_5_NAME] → V. Simplicity Before Abstraction
- Added sections:
  - Technical Constraints
  - Scope Boundaries
  - Governance (ratified)
- Removed sections: none (placeholders replaced)
- Follow-up TODOs: none
-->

# Dev Skill Tree Constitution

## Core Principles

### I. MVP Scope Discipline

Dev Skill Tree is a client-side web app that helps developers track,
organize, and improve technical knowledge by connecting a personal skill
catalog to job requirements.

Every change MUST map to an Included MVP capability (skills catalog,
priority, knowledge, notes, jobs, skill–job association, navigation, and
`localStorage` persistence) or to an approved constitution amendment.
Features listed under Scope Boundaries as out of MVP MUST NOT be
implemented until this constitution is amended or a post-MVP specification
is ratified.

Rationale: A small product that can be used immediately is the goal.
Speculative features delay that outcome.

### II. Skills Remain Independent

A Skill is a reusable item in the user's personal catalog. A Skill MUST
be creatable, listable, editable, and persistable with zero Job
associations. A Skill MUST NOT embed Job-specific fields or depend on a
Job existing.

The Skill record is the single source of truth for its own `id`, `name`,
`description`, `priority`, `knowledge`, and `notes`. Other entities MUST
reference a Skill by `id` rather than copy Skill fields.

Rationale: Users study skills for their own growth, not only because a
job currently requires them.

### III. Jobs Associate Existing Skills Only

A Job represents a job opportunity and its technical requirements. In the
MVP a Job MUST consist of `id`, `name`, and a list of Skill `id`s.

Creating a Job MUST NOT create a Skill. The user MUST create a Skill
before it can be associated with a Job. Jobs MUST store Skill identifiers
only; they MUST NOT duplicate Skill payloads.

A Skill associated with one or more Jobs MUST NOT be deleted. The UI MUST
disable deletion in that case and explain that the skill is in use. A
Skill with zero Job associations MAY be deleted.

The MVP MUST NOT include a Job detail page. Job lists MUST link each
associated skill to the existing Skill Detail route.

Rationale: Jobs exist to connect opportunities to the catalog, not to
become a second copy of skill data.

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
with two collections: `skills` (complete Skill objects) and `jobs`
(Job objects that reference Skill `id`s).

Persistence logic MUST live in a dedicated storage module (conceptually
`lib/storage.ts`) that exposes operations such as `getSkills`,
`getSkillById`, `createSkill`, `getJobs`, `getJobById`, and `createJob`.
`getSkillById` MAY be implemented by reading `getSkills` and finding by
`id`. Callers MUST NOT need to know serialization details.

Skill Detail MUST load Skill data on the client because the source is
`localStorage`. The route MAY remain a Server Component; the component
that reads storage MUST be a Client Component. Missing skills MUST
surface a not-found state; loading MUST surface an explicit loading
state.

The stack is Next.js App Router with React. Suggested routes for the MVP
are `/`, `/skills`, `/skills/[id]`, `/jobs`, and `/about`. A global header
MUST provide Logo, Home, My Skills, Jobs, and About. Skill and Job
creation MUST use a modal or drawer rather than a permanently visible
form. This layout is the intended starting structure, not a mandate to
add extra directories or frameworks.

## Scope Boundaries

Included in the MVP:

- Create, list, and view skills; sort or group by priority (higher first)
- Store skill `name`, `description`, `priority`, `knowledge`, and `notes`
- Create and list jobs; associate existing skills; show those skills
- Navigate from a skill list and from a job's skill to Skill Detail
- Persist data across browser sessions via `localStorage`

Explicitly out of MVP (MUST NOT ship until a later ratified spec):

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
keeping Skill as the source of truth and Job as an ID association.

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
independence and Job simplicity, keeps priority and knowledge
user-controlled, and routes persistence through the storage module.
Unjustified complexity MUST be rejected.

Runtime development guidance for this Next.js version lives in
`AGENTS.md`. Feature work MUST proceed through Spec Kit (`specify` →
`plan` → `tasks` → `implement`) rather than expanding the MVP informally.

**Version**: 1.0.0 | **Ratified**: 2026-09-10 | **Last Amended**: 2026-09-10
