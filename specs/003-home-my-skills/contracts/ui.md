# Contract: Home Primary Action

User-facing contract for `/`. No HTTP API. Storage is not used on this page.

## Surface

`/` — existing Server page (`app/page.tsx`). Hero plus one primary action.

## Primary action

| Item | Value |
| ---- | ----- |
| Label | My Skills |
| Destination | `/skills` (My Skills) |
| Count | Exactly one primary action |

The label and destination MUST NOT depend on whether skills exist.

MUST NOT use the label Create Skills on this action.

Header "My Skills" remains a separate control with the same destination.

## Unchanged

- Hero heading and supporting copy (track/improve technical skills) MAY stay as they are.
- My Skills empty state: “You don't have any skills yet.” / “Create your first skill”
- Create Skill overlay on My Skills
- Catalog table on My Skills when skills exist
