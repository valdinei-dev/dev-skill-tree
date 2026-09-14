# Quickstart: Skill and Job Catalog

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

Open the printed local URL (typically `http://localhost:3000`). Use a clean profile or clear this origin’s site data so `skills` and `jobs` start empty.

## Scenario A — First skill (P1)

1. Open `/`. Confirm a short hero about tracking technical skills and a **Create Skills** action.
2. Choose **Create Skills**. You are on My Skills.
3. Confirm empty copy: “You don't have any skills yet.” and **Create your first skill**.
4. Open the overlay. Leave Name empty and submit — the skill is not created.
5. Enter `React` only. Create.
6. `React` appears in the list and is openable.

Expected: under 2 minutes (SC-001); no account prompt (SC-008).

## Scenario B — Browse, edit, priority (P2)

1. Create skills: `TypeScript` (High), `Web Vitals` (Very High), `Module Federation` (Very Low), plus three more across at least three levels (SC-003).
2. Confirm groups or order show Very High before High before lower levels.
3. Open `Web Vitals`. Confirm loading, then name, description, priority, knowledge, notes.
4. Change knowledge to Medium and save. Return to My Skills; the change remains.
5. Open `/skills/not-a-real-id`. Confirm “Skill not found” after “Loading...”.

## Scenario C — Jobs and navigation (P3)

1. From My Skills choose **Create Job**. You land on Jobs with the create overlay open (or can open it immediately).
2. Cancel. Confirm the form is gone.
3. Create job `Frontend Engineer` selecting `React`, `TypeScript`, `Web Vitals`.
4. Create job `Empty Role` with no skills. It appears with an empty skill list.
5. On `Frontend Engineer`, choose `Web Vitals`. Skill Detail matches the catalog entry (SC-004).
6. Header: Home, My Skills, Jobs, About all work. About is a short product blurb.

## Scenario D — Persistence (P2)

1. After Scenarios A–C, close the tab.
2. Reopen the same origin.
3. Skills and both jobs are still present with the same fields (SC-005).

## Scenario E — Delete rules (P4)

1. Open `Module Federation` (unused). Delete. It disappears from My Skills (SC-007).
2. Open `React` (used by a job). Delete is disabled; usage count is visible.
3. If delete is still invoked, `React` remains and the in-use explanation appears (SC-006).

## Stop

Stop the dev server when finished. Clearing site data resets the catalog.
