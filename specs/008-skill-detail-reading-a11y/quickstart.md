# Quickstart: Skill Detail Reading Accessibility

Manual browser validation. Use the accessibility snapshot or inspector (headings), not only the visual layout.

## Prerequisites

- Node.js able to run the project’s Next.js 16 app
- A desktop browser

## Setup

From the repository root:

```bash
npm install
npm run dev
```

Open the printed local URL. From My Skills:

1. Create **Keep Me** with a recognizable description and notes (and any priority/knowledge).
2. Create **Name Only** with name only (empty description and notes).

Also run `npm test` once (006 storage contract must still pass).

## Scenario A — Named fields with content (US1, US2, SC-001, SC-002)

1. Open Skill Detail for **Keep Me**.
2. Confirm the page heading is **Keep Me**, and you see Description, Priority, Knowledge, Notes as reading content (not inputs).
3. In the accessibility tree, confirm headings **Description**, **Priority**, **Knowledge**, and **Notes** (not only Edit/Delete).
4. Confirm Priority and Knowledge show level words (e.g. Very Low), not unlabeled raw numbers.

## Scenario B — Empty description and notes still named (US1, FR-003, SC-003)

1. Open Skill Detail for **Name Only**.
2. Confirm Description and Notes labels are still visible.
3. In the accessibility tree, confirm headings **Description** and **Notes** exist even though the values are empty.
4. Confirm there is no “None”, “—”, or “Empty” filler.

## Scenario C — Edit still works (US3, FR-005)

1. From **Keep Me**, choose **Edit**.
2. Confirm Edit Skill opens. Cancel (or Save with the same name).

## Scenario D — Delete still works (US3)

1. From **Keep Me**, choose **Delete**.
2. Confirm Delete Skill opens with the existing copy. Cancel.

## Scenario E — Loading / not found unchanged

1. Confirm a missing id still shows **Skill not found** (optional: visit `/skills/not-a-real-id`).

## Stop

Stop the dev server when finished.
