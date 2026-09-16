# Contract: UI Routes and Surfaces

User-facing pages and overlays for the MVP. No backend routes.

## Routes

| Path | Page | Server / client |
| ---- | ---- | --------------- |
| `/` | Home hero + “Create Skills” | Server page; `Link` to `/skills` |
| `/skills` | My Skills list or empty state | Server page + client `SkillList` / `SkillForm` |
| `/skills/[id]` | Skill Detail | Server page awaits `params`, renders client `SkillDetail` |
| `/about` | Minimal about copy | Server page |

There is no `/jobs` route and no `/jobs?create=1` overlay trigger.

## Global header

Present on all pages (root layout). Items: Logo (home) on the start edge; Home, My Skills, About on the end edge. Implemented as a Server Component using `<Link>` from `next/link`.

## Overlays

| Overlay | Trigger | Fields |
| ------- | ------- | ------ |
| Create Skill | Empty-state “Create your first skill”; “Create Skill” on the list | Name (required), Description, Priority, Knowledge, Notes. Cancel / Create |

Forms MUST NOT stay visible on the page when the overlay is closed. Native `<dialog>` is the MVP control.

There is no create-job overlay.

## Copy (English)

| Situation | Text |
| --------- | ---- |
| Skills empty | “You don't have any skills yet.” / “Create your first skill” |
| Skill loading | “Loading...” |
| Skill missing | “Skill not found” |
| Home CTA | “Create Skills” |
| Home intent | Communicate that the app helps developers track and improve technical skills |

Priority and knowledge options: Very Low, Low, Medium, High, Very High.

Home, About, and metadata MUST NOT describe connecting skills to job opportunities as a current capability.

## Navigation rules

- Skill names on My Skills link to `/skills/{id}`.
- After successful create, the new skill is visible in the current list without a required full-page reload by the user (re-read storage and update the list).
- After successful delete, the user returns to My Skills and the skill is gone.
