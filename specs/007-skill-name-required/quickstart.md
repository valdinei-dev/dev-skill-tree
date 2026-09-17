# Quickstart: Skill Name Required Feedback

Manual browser validation. Native dialogs; no new packages.

## Prerequisites

- Node.js able to run the project’s Next.js 16 app
- A desktop browser

## Setup

From the repository root:

```bash
npm install
npm run dev
```

Open the printed local URL (typically `http://localhost:3000`). Ensure at least one skill exists for Edit scenarios (create **Keep Me** from My Skills if needed).

Also run `npm test` once: storage contract from `006` must still pass.

## Scenario A — Create, empty name (US1, FR-001, FR-003, FR-006)

1. Open My Skills → Create Skill.
2. Confirm **Name is required** is not visible yet.
3. Leave Name empty and choose **Create**.
4. Confirm the overlay is still open, My Skills did not gain a nameless skill, and **Name is required** is visible with Name.
5. Confirm Name is focused. Confirm there is no separate browser empty-field tooltip as the only feedback.

## Scenario B — Create, whitespace name (US1, SC-002)

1. In Create Skill, type spaces only in Name and choose **Create**.
2. Confirm the same outcome as Scenario A: overlay open, nothing created, same **Name is required** text and place.

## Scenario C — Create recovers (US3)

1. With the error showing, type **Recovered Skill** and choose **Create**.
2. Confirm the overlay closes and My Skills lists **Recovered Skill**.
3. Confirm **Name is required** is not on the page.

## Scenario D — Edit, empty and whitespace (US2)

1. Open Skill Detail for **Keep Me** → **Edit**.
2. Confirm **Name is required** is not visible.
3. Clear Name and choose **Save**. Confirm overlay stays, reading view still **Keep Me**, **Name is required** with Name focused.
4. Type spaces only and **Save**. Confirm the same message and that **Keep Me** is unchanged.

## Scenario E — Edit recovers (US3)

1. With the error showing, type **Kept Skill** and **Save**.
2. Confirm overlay closed, reading view **Kept Skill**, no error text on the page.

## Scenario F — Cancel after error (US3, FR-007)

1. Open Create Skill, submit empty Name, then **Cancel**.
2. Confirm no new skill and no **Name is required** on My Skills.
3. Open Create Skill again; confirm the error is not already showing.

## Scenario G — Assistive association (SC-003)

1. Trigger **Name is required** on Create or Edit.
2. Confirm the error text is in the page (not only a tooltip).
3. With a screen reader or accessibility inspector, confirm Name is invalid and described by **Name is required**.

## Stop

Stop the dev server when finished.
