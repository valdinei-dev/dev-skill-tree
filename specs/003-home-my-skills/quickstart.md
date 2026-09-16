# Quickstart: Home My Skills Action

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

Open the printed local URL (typically `http://localhost:3000`).

## Scenario A — Label (SC-001)

1. Open `/`.
2. Confirm the hero still describes tracking technical skills.
3. Confirm the primary action is **My Skills**, not **Create Skills**.
4. Confirm there is only one such primary action on the hero.

## Scenario B — Returning user (SC-002, SC-004)

1. Ensure at least one skill exists (create one on My Skills if needed).
2. Open Home and choose **My Skills**.
3. Confirm you are on My Skills and see the catalog (table), not only the empty-state create prompt.

## Scenario C — First-time path (SC-002, SC-003)

1. Use a clean profile or clear this origin’s site data so `skills` is empty.
2. Open `/`, choose **My Skills**.
3. Confirm “You don't have any skills yet.” and **Create your first skill**.
4. Create a skill with a name only. It appears in the catalog.

## Scenario D — Header still matches

1. From Home, confirm header **My Skills** also goes to `/skills`.
2. Home CTA and header item use the same words and the same destination.

## Stop

Stop the dev server when finished.
