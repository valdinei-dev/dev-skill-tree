# Quickstart: Skill Overlay Accessibility

Manual browser validation. Use the accessibility snapshot (headings/fields) and keyboard, not only the visual overlay.

## Prerequisites

- Node.js able to run the project’s Next.js 16 app
- A desktop browser

## Setup

From the repository root:

```bash
npm install
npm run dev
```

Open the printed local URL. From My Skills, ensure at least one skill exists (or create **Keep Me**). Also run `npm test` once (006 storage contract must still pass).

## Scenario A — Closed Create is not on the page (US1, SC-001)

1. Open **My Skills** with Create Skill closed.
2. Confirm the page heading is **My Skills**.
3. In the accessibility tree, confirm there is **no** heading **Create Skill** and **no** overlay Name/Description fields. A **button** named Create Skill (or Create your first skill on an empty catalog) is expected.

## Scenario B — Closed Edit/Delete are not on the ficha (US1, SC-001)

1. Open Skill Detail for an existing skill with Edit and Delete closed.
2. Confirm reading headings from `008` (Description, Priority, Knowledge, Notes).
3. In the accessibility tree, confirm there is **no** heading **Edit Skill** or **Delete Skill**, and no overlay form fields. **Edit** and **Delete** buttons remain.

## Scenario C — Open overlays are named (US2, SC-002)

1. Open Create Skill. Confirm the overlay is identified as **Create Skill**. Cancel.
2. From Skill Detail, open Edit. Confirm **Edit Skill**. Cancel.
3. Open Delete. Confirm **Delete Skill** and the existing confirmation copy. Cancel.
4. Optional: in Edit or Create, clear Name and Save — **Name is required** still appears (`007`).

## Scenario D — Focus returns (US3, SC-003)

1. On My Skills, click **Create Skill**, then Cancel or Escape. Confirm focus is on **Create Skill** (Tab is not required to find it).
2. On Skill Detail, click **Edit**, then Cancel or Escape. Confirm focus is on **Edit**.
3. Click **Delete**, then Cancel or Escape. Confirm focus is on **Delete**. Do not confirm delete.

## Scenario E — Empty catalog opener

1. If the catalog is empty (or use a browser with no skills), open **Create your first skill**, then Cancel or Escape.
2. Confirm closed tree has no Create Skill **heading**, and focus is back on **Create your first skill**.

## Stop

Stop the dev server when finished.
