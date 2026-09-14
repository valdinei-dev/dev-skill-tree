# Research: Skill and Job Catalog

## 1. Keep the existing App Router tree (no `src/` move)

**Decision**: Leave routes in the existing root `app/` directory. Add `components/`, `lib/`, and `types/` at the repository root. Do not introduce a `src/` tree.

**Rationale**: The repo is already a Next.js 16 App Router app at `app/`. The constitution allows the MVP folder sketch as a suggestion, not a mandate, and forbids extra layers that do not solve a real problem. Moving files into `src/` would be churn with no user value. `@/*` already maps to the repo root.

**Alternatives considered**:
- `src/app` as in the MVP sketch — rejected; would relocate the working app for cosmetics.
- Feature folders under `app/(catalog)` — rejected; five routes do not need a route group.

## 2. Persistence only through `lib/storage.ts`

**Decision**: Browser `localStorage` with keys `skills` and `jobs`. All read/write and JSON (de)serialization live in `lib/storage.ts`. UI components call functions only.

**Rationale**: Required by the constitution. Centralizing serialization keeps components ignorant of storage format and makes the deletion invariant enforceable in one place.

**Alternatives considered**:
- IndexedDB — more capacity and async API; unnecessary for a small personal catalog.
- `sessionStorage` — does not survive a full browser restart.
- Per-component `localStorage` calls — forbidden by the constitution.
- Adding a generic repository layer — premature abstraction.

## 3. Storage API includes update and delete

**Decision**: Implement the constitution’s conceptual API plus `updateSkill` and `deleteSkill`. `deleteSkill` MUST refuse when any job references the skill and MUST report how many jobs use it. `getJobById` is included for completeness even though the MVP has no job detail page.

**Rationale**: The spec requires skill edit and guarded delete. Extending the storage module is cheaper and clearer than hiding writes in components.

**Alternatives considered**:
- Edit/delete only in UI state without storage functions — would break persistence and leak serialization.
- Soft-delete flag — extra field, not in the Skill model.

## 4. Server pages, client islands

**Decision**: Route `page.tsx` files and `components/Header.tsx` stay Server Components. Mark `'use client'` only on `SkillList`, `SkillForm`, `SkillDetail`, `JobList`, and `JobForm` (and a thin page wrapper only if a page itself must read search params).

Skill Detail: `app/skills/[id]/page.tsx` remains a Server Component. It awaits the Next.js 16 `params` Promise and passes `id` into the `SkillDetail` client island, which reads storage after mount.

**Rationale**: Matches Next.js 16 App Router docs (`params` is a `Promise`; `'use client'` is a boundary, not a file-by-file default) and constitution principle V.

**Alternatives considered**:
- Making every page a Client Component — unnecessary `'use client'`.
- Reading `localStorage` during render — hydration mismatch; must wait until mount.

## 5. No new npm dependencies

**Decision**: Use Next.js 16, React 19, TypeScript, and Tailwind CSS 4 only. Overlays use the native `<dialog>` element. IDs use `crypto.randomUUID()`. Navigation uses `<Link>` except where a button must change the URL (then `useRouter` from `next/navigation`).

**Rationale**: Constitution: keep the MVP small. A dialog library, UUID package, or client state library does not solve a demonstrated problem.

**Alternatives considered**:
- Radix/Headless UI — accessible but extra dependency.
- Zustand/Context for catalog state — extra layer; lists can reload from storage after writes.
- Drawer-only pattern — spec allows modal or drawer; `<dialog>` is the smaller modal.

## 6. Open create-job from My Skills via `/jobs?create=1`

**Decision**: The My Skills "Create Job" action is a link to `/jobs?create=1`. `JobList` (or a jobs client wrapper) reads `create` with `useSearchParams`. When it is `1`, the create-job `<dialog>` opens. After create or cancel, replace the URL with `/jobs` so a refresh does not reopen the dialog.

**Rationale**: Spec: Create Job from My Skills must reach Jobs and open the overlay, not create a job in the background. Search params avoid a global store.

**Alternatives considered**:
- Shared React context for “pending overlay” — extra layer.
- Opening a job form on the skills page — duplicates the job overlay and risks creating jobs off the Jobs page.

## 7. Manual validation only (no test runner)

**Decision**: Do not add Jest, Vitest, Playwright, or Testing Library in this MVP. Prove the feature with `quickstart.md` in the browser.

**Rationale**: The constitution lists automated testing as post-MVP (V6). Adding a runner now is scope expansion.

**Alternatives considered**:
- Vitest for `storage.ts` only — useful later, not required to plan or ship the MVP.

## 8. Level labels stay a display map

**Decision**: Store priority and knowledge as integers `1`–`5`. Map to English labels in `lib/levels.ts`. The UI never writes label strings into storage.

**Rationale**: Constitution: internal values stay independent of presentation.

**Alternatives considered**:
- Storing `"Very Low"` — breaks later localization and the numeric scale.
- Stars as the only representation — labels are specified for the MVP.

## 9. List grouping

**Decision**: Group skills by priority `5` … `1`. Omit empty groups. Within a group, sort by name (case-insensitive). Jobs list in insertion order (newest last), matching “create and list” with no job sort requirement.

**Rationale**: Spec requires higher priority first. Name order inside a group is a stable, predictable default.

**Alternatives considered**:
- Flat sort by priority then name without headings — allowed by spec (“grouped or ordered”); headings match the MVP examples and make SC-003 easier to review.
- Newest-first jobs — not specified; insertion order is simpler.
