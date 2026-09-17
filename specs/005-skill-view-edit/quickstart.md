# Quickstart: Skill Detail View and Edit Overlay

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

Open the printed local URL (typically `http://localhost:3000`). Ensure a skill named **Keep Me** exists (create it on My Skills if needed), with a description or notes you can recognize, and a second skill if you want extra catalog context.

## Scenario A — Reading view (SC-001, FR-001, FR-002, FR-009)

1. Open Skill Detail for **Keep Me**.
2. Confirm you see name, description, priority, knowledge, and notes as reading content (not inputs waiting to Save).
3. Confirm there is **Edit** and **Delete**, and no page-level **Save**.
4. Choose **Delete** and confirm the existing **Delete Skill** overlay still opens. Cancel it.

## Scenario B — Empty optional fields stay identifiable

1. Create or open a skill with empty description and empty notes (name only is enough).
2. Confirm Description and Notes are still labeled so it is clear those fields exist and are empty.

## Scenario C — Overlay copy and loaded values (FR-003, FR-004, FR-010)

1. Open Skill Detail for **Keep Me**. Confirm Edit Skill is not showing yet.
2. Choose **Edit**.
3. Confirm heading **Edit Skill**, the five fields filled from the persisted skill, and only **Cancel** and **Save**.

## Scenario D — Save updates the ficha and the list (SC-002, SC-004)

1. In Edit Skill, change Name to **Kept Skill** (optionally tweak notes).
2. Choose **Save**.
3. Confirm the overlay is closed, you are still on Skill Detail, and the reading view shows **Kept Skill**.
4. Open My Skills and confirm the list shows **Kept Skill**, not **Keep Me**.

## Scenario E — Empty name does not save (FR-006)

1. Open Edit on **Kept Skill**.
2. Clear Name and choose **Save**.
3. Confirm the overlay stays open, the catalog name is unchanged, and you are prompted to provide a name.
4. Cancel.

## Scenario F — Cancel discards (SC-003)

1. Open Edit on **Kept Skill**. Change Name to **Discarded**.
2. Choose **Cancel**.
3. Confirm the reading view still says **Kept Skill**.
4. Open My Skills and confirm **Kept Skill**.

## Scenario G — Dismiss discards (SC-003)

1. Open Edit on **Kept Skill**. Change Name to **Also Discarded**.
2. Dismiss the overlay without Save (Escape or equivalent).
3. Confirm the reading view and My Skills still say **Kept Skill**.

## Stop

Stop the dev server when finished.
