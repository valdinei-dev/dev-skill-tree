# Quickstart: Skill Delete Confirmation

Manual browser validation. No test runner.

## Prerequisites

- Node.js able to run the project’s Next.js 16 app
- A desktop browser

## Setup

From the repository root:

```bash
npm install
npm run dev
```

Open the printed local URL (typically `http://localhost:3000`). Ensure at least two skills exist (create them on My Skills if needed). Use distinct names (for example **Keep Me** and **Remove Me**).

## Scenario A — Overlay before delete (SC-001, FR-001, FR-002, FR-007)

1. Open Skill Detail for **Remove Me**.
2. Choose page **Delete**.
3. Confirm the skill is still on the page and the overlay shows:
   - heading **Delete Skill**
   - You are about to delete the skill “Remove Me”. This cannot be undone.
   - **Cancel** and **Delete** only (no third action)
4. Confirm the overlay was not visible before step 2.

## Scenario B — Confirm removes (SC-003, SC-004)

1. From the open overlay on **Remove Me**, choose overlay **Delete**.
2. Confirm you are on My Skills and **Remove Me** is gone.
3. Confirm **Keep Me** is still listed.
4. Open the old detail URL for **Remove Me** and confirm **Skill not found**.

## Scenario C — Cancel keeps the skill (SC-002)

1. Open Skill Detail for **Keep Me**.
2. Choose page **Delete**, then **Cancel**.
3. Confirm you are still on Skill Detail for **Keep Me**.
4. Open My Skills and confirm **Keep Me** is listed.

## Scenario D — Dismiss keeps the skill (SC-002)

1. Open Skill Detail for **Keep Me**.
2. Choose page **Delete**.
3. Dismiss the overlay without choosing overlay Delete (Escape or equivalent).
4. Confirm the skill is still on Skill Detail and still listed on My Skills.

## Scenario E — Persisted name, not unsaved edit

1. Open Skill Detail for **Keep Me**.
2. Change the Name field to **Not Saved** but do not Save.
3. Choose page **Delete**.
4. Confirm the overlay names **Keep Me**, not **Not Saved**.
5. Cancel. Confirm the skill is still **Keep Me** in the catalog after Save is skipped.

## Stop

Stop the dev server when finished.
