# Quickstart: Skill Catalog

Manual browser validation for the MVP. No test runner is added in this phase.

## Prerequisites

- Node.js able to run the project’s Next.js 16 app
- A desktop browser

## Setup

From the repository root:

```bash
npm install
npm run dev
```

Open the printed local URL (typically `http://localhost:3000`). Use a clean profile or clear this origin’s site data so `skills` starts empty.

## Scenario A — First skill (P1)

1. Open `/`. Confirm a short hero about tracking technical skills and a **Create Skills** action. Copy does not describe job tracking as a current feature.
2. Choose **Create Skills**. You are on My Skills.
3. Confirm empty copy: “You don't have any skills yet.” and **Create your first skill**.
4. Open the overlay. Leave Name empty and submit — the skill is not created.
5. Enter `React` only. Create.
6. `React` appears in the list and is openable. There is no **Create Job** action.

Expected: under 2 minutes (SC-001); no account prompt (SC-006).

## Scenario B — Browse, edit, priority (P2)

1. Create skills: `TypeScript` (High), `Web Vitals` (Very High), `Module Federation` (Very Low), plus three more across at least three levels (SC-003).
2. Confirm groups or order show Very High before High before lower levels.
3. Open `Web Vitals`. Confirm loading, then name, description, priority, knowledge, notes.
4. Change knowledge to Medium and save. Return to My Skills; the change remains.
5. Open `/skills/not-a-real-id`. Confirm “Skill not found” after “Loading...”.

## Scenario C — Persistence (P2)

1. After Scenarios A–B, close the tab.
2. Reopen the same origin.
3. Skills are still present with the same fields (SC-004).

## Scenario D — Delete (P4)

1. Open `Module Federation`. Delete. It disappears from My Skills (SC-005).
2. Confirm there is no “Used by N jobs” copy and Delete is not disabled.

## Scenario E — Navigation (P4)

1. Header: Logo is on the left; Home, My Skills, and About are on the right. There is no Jobs item.
2. Logo and Home both reach `/`. My Skills and About reach their pages.
3. About is a short product blurb with no job-association claim.
4. `/jobs` is not a product destination.

## Stop

Stop the dev server when finished. Clearing site data resets the catalog.
