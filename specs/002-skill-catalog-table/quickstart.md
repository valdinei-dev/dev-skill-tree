# Quickstart: Skill Catalog Table

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

Open the printed local URL (typically `http://localhost:3000`). Use a catalog you can edit (or clear this origin’s site data and recreate skills).

## Scenario A — Empty state unchanged (SC-005)

1. With zero skills, open `/skills`.
2. Confirm “You don't have any skills yet.” and **Create your first skill**.
3. Confirm there is no Skill / Priority / Knowledge table as the only content.

## Scenario B — Table headings and labels (SC-001, SC-003)

1. Ensure at least six skills across three or more priority levels, with mixed knowledge (for example Web Vitals Very High / High, Angular High / Low).
2. Open My Skills.
3. Confirm column headings **Skill**, **Priority**, and **Knowledge**.
4. Confirm there are no section titles that are only “Very High” / “High” / etc.
5. Open one skill from the name. Confirm the Priority and Knowledge labels on the row match Skill Detail.

## Scenario C — Sort order (SC-002)

1. In the same catalog, scan top to bottom.
2. Confirm Very High rows appear before High, then Medium, Low, Very Low (skip empty levels).
3. Within one priority, confirm names are alphabetical (case-insensitive). Example: Angular before Next.js when both are High.

## Scenario D — Open from name (SC-004)

1. Choose a skill name in the Skill column.
2. Confirm Skill Detail shows name, description, priority, knowledge, and notes.
3. Priority and Knowledge cells on the table are not separate destinations.

## Scenario E — Create still works

1. From the table, **Create Skill**, submit a name only.
2. The overlay closes; the new row appears in the table in the correct sort position without a manual full reload.

## Stop

Stop the dev server when finished.
