# Research: Skill Catalog

## 1. Keep the existing App Router tree (no `src/` move)

**Decision**: Leave routes in the existing root `app/` directory. Add `components/`, `lib/`, and `types/` at the repository root. Do not introduce a `src/` tree.

**Rationale**: The repo is already a Next.js 16 App Router app at `app/`. The constitution allows the MVP folder sketch as a suggestion, not a mandate, and forbids extra layers that do not solve a real problem. Moving files into `src/` would be churn with no user value. `@/*` already maps to the repo root.

**Alternatives considered**:
- `src/app` as in the MVP sketch — rejected; would relocate the working app for cosmetics.
- Feature folders under `app/(catalog)` — rejected; four routes do not need a route group.

## 2. Persistence only through `lib/storage.ts`

**Decision**: Browser `localStorage` with key `skills`. All read/write and JSON (de)serialization live in `lib/storage.ts`. UI components call functions only.

**Rationale**: Required by the constitution. Centralizing serialization keeps components ignorant of storage format.

**Alternatives considered**:
- IndexedDB — more capacity and async API; unnecessary for a small personal catalog.
- `sessionStorage` — does not survive a full browser restart.
- Per-component `localStorage` calls — forbidden by the constitution.
- Adding a generic repository layer — premature abstraction.
- Keeping a `jobs` collection unused — rejected; leftover surface violates principle III.

## 3. Storage API includes update and delete

**Decision**: Implement `updateSkill` and `deleteSkill` in the same module. `deleteSkill` removes the skill when it exists; it does not consult other entities.

**Rationale**: The spec requires skill edit and delete. Extending the storage module is cheaper and clearer than hiding writes in components.

**Alternatives considered**:
- Edit/delete only in UI state without storage functions — would break persistence and leak serialization.
- Soft-delete flag — extra field, not in the Skill model.
- Blocking delete while a job references the skill — obsolete after Jobs left the MVP.

## 4. Server pages, client islands

**Decision**: Route `page.tsx` files and `components/Header.tsx` stay Server Components. Mark `'use client'` only on `SkillList`, `SkillForm`, and `SkillDetail`.

Skill Detail: `app/skills/[id]/page.tsx` remains a Server Component. It awaits the Next.js 16 `params` Promise and passes `id` into the `SkillDetail` client island, which reads storage after mount.

**Rationale**: Matches Next.js 16 App Router docs (`params` is a `Promise`; `'use client'` is a boundary, not a file-by-file default) and constitution principle V.

**Alternatives considered**:
- Making every page a Client Component — unnecessary `'use client'`.
- Reading `localStorage` during render — hydration mismatch; must wait until mount.

## 5. No new npm dependencies

**Decision**: Use Next.js 16, React 19, TypeScript, and Tailwind CSS 4 only. Overlays use the native `<dialog>` element. IDs use `crypto.randomUUID()`. Navigation uses `<Link>`.

**Rationale**: Constitution: keep the MVP small. A dialog library, UUID package, or client state library does not solve a demonstrated problem.

**Alternatives considered**:
- Radix/Headless UI — accessible but extra dependency.
- Zustand/Context for catalog state — extra layer; lists can reload from storage after writes.
- Drawer-only pattern — spec allows modal or drawer; `<dialog>` is the smaller modal.

## 6. Jobs are out of this MVP

**Decision**: Remove the Job entity, `/jobs`, create-job overlay, `/jobs?create=1`, and in-use delete guards. Do not add job import or skill extraction to replace manual entry.

**Rationale**: The primary use is opening a skill to review priority, knowledge, and notes. Manual job-by-job entry would not be used. Import would be a different product (external data, mapping, duplicates) and must not keep a dead Jobs surface “until later”.

**Alternatives considered**:
- Keep Jobs as a thin list with create only on `/jobs` — still unused surface.
- Keep Jobs and add LinkedIn/job import — overengineering; constitution forbids it in this MVP.
- Encode role context as structured skill fields — rejected; `notes` is enough.

## 7. Manual validation only (no test runner)

**Decision**: Do not add Jest, Vitest, Playwright, or Testing Library in this MVP. Prove the feature with `quickstart.md` in the browser.

**Rationale**: Adding a runner now is scope expansion.

**Alternatives considered**:
- Vitest for `storage.ts` only — useful later, not required to plan or ship the MVP.

## 8. Level labels stay a display map

**Decision**: Store priority and knowledge as integers `1`–`5`. Map to English labels in `lib/levels.ts`. The UI never writes label strings into storage.

**Rationale**: Constitution: internal values stay independent of presentation.

**Alternatives considered**:
- Storing `"Very Low"` — breaks later localization and the numeric scale.
- Stars as the only representation — labels are specified for the MVP.

## 9. List grouping

**Decision**: Group skills by priority `5` … `1`. Omit empty groups. Within a group, sort by name (case-insensitive).

**Rationale**: Spec requires higher priority first. Name order inside a group is a stable, predictable default.

**Alternatives considered**:
- Flat sort by priority then name without headings — allowed by spec (“grouped or ordered”); headings make SC-003 easier to review.

## 10. Header layout

**Decision**: Logo on the start edge; Home, My Skills, and About on the end edge. Keep an explicit Home item even though Logo also goes to `/`.

**Rationale**: Adjacent Logo + Home with equal visual weight looked like two tabs to the same place. Spatial separation keeps both destinations (spec + accessibility) without removing Home.

**Alternatives considered**:
- Remove Home and use Logo only — would change the header contract more than needed.
- `My Jobs` naming — rejected with the Job entity; sounded like application tracking.
