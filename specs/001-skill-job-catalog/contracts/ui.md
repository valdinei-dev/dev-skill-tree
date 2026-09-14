# Contract: UI Routes and Surfaces

User-facing pages and overlays for the MVP. No backend routes.

## Routes

| Path | Page | Server / client |
| ---- | ---- | --------------- |
| `/` | Home hero + “Create Skills” | Server page; `Link` to `/skills` |
| `/skills` | My Skills list or empty state | Server page + client `SkillList` / `SkillForm` |
| `/skills/[id]` | Skill Detail | Server page awaits `params`, renders client `SkillDetail` |
| `/jobs` | Jobs list | Server page + client `JobList` / `JobForm` |
| `/jobs?create=1` | Jobs list with create overlay open | Same as `/jobs` |
| `/about` | Minimal about copy | Server page |

There is no `/jobs/[id]` route.

## Global header

Present on all pages (root layout). Items: Logo (home), Home, My Skills, Jobs, About. Implemented as a Server Component using `<Link>` from `next/link`.

## Overlays

| Overlay | Trigger | Fields |
| ------- | ------- | ------ |
| Create Skill | Empty-state “Create your first skill”; “Create Skill” on the list | Name (required), Description, Priority, Knowledge, Notes. Cancel / Create |
| Create Job | “Create Job” on Jobs; “Create Job” on My Skills → `/jobs?create=1` | Job Name (required), multi-select of existing skills. Cancel / Create |

Forms MUST NOT stay visible on the page when the overlay is closed. Native `<dialog>` is the MVP control.

## Copy (English)

| Situation | Text |
| --------- | ---- |
| Skills empty | “You don't have any skills yet.” / “Create your first skill” |
| Skill loading | “Loading...” |
| Skill missing | “Skill not found” |
| Delete blocked | “This skill is used by one or more jobs and cannot be deleted.” |
| Usage hint | “Used by N jobs” |
| Home CTA | “Create Skills” |
| Home intent | Communicate that the app helps developers track and improve technical skills |

Priority and knowledge options: Very Low, Low, Medium, High, Very High.

## Navigation rules

- Skill names on My Skills and on each job link to `/skills/{id}`.
- Unresolved job skill ids are not normal links.
- Jobs “My Skills” goes to `/skills`.
- After successful create, the new item is visible in the current list without a required full-page reload by the user (re-read storage and update the list).
