# Contract: Skill Detail Reading View and Edit Overlay

User-facing contract for Skill Detail view and update. No HTTP API. Storage writes happen only when the user chooses Save inside Edit Skill (or confirms Delete in the existing overlay).

## Surface

Skill Detail (`/skills/{id}`) — existing Client island `components/skills/SkillDetail.tsx`.

Edit Skill overlay MUST NOT appear on Home, My Skills, About, or in the header.

## Reading view

Shown after the skill has loaded (not during "Loading..." / "Skill not found").

| Item | Presentation |
| ---- | ------------ |
| Name | Reading text (page heading) |
| Description | Labeled reading text (label remains if empty) |
| Priority | Labeled human-readable level |
| Knowledge | Labeled human-readable level |
| Notes | Labeled reading text (label remains if empty) |

Page actions: **Edit**, **Delete**. MUST NOT show a page-level **Save**.

## Edit action

| Item | Value |
| ---- | ----- |
| Label | Edit |
| Effect | Opens the Edit Skill overlay |
| Catalog | Unchanged until overlay Save |

## Edit Skill overlay

Shown only after Edit. Copy and actions:

| Item | Value |
| ---- | ----- |
| Heading | Edit Skill |
| Fields | Name, Description, Priority, Knowledge, Notes (persisted values when opened) |
| Actions | Cancel, then Save (exactly two) |

### Cancel or dismiss

Closes the overlay. User stays on the Skill Detail reading view. Skill unchanged.

### Save

Name required (same rule as create). On valid name, calls existing `updateSkill`, closes overlay, stays on Skill Detail. Reading view and My Skills reflect the saved record without a required full-page reload.

On empty/whitespace name: no write; prompt for a name.

## Delete (unchanged from 004)

Still on the reading view. Page Delete opens Delete Skill confirmation. Overlay Delete still removes the skill and goes to My Skills.

## Unchanged

- Create Skill overlay on My Skills
- `updateSkill` / `deleteSkill` signatures
- My Skills table and empty state
- Home, header, About
