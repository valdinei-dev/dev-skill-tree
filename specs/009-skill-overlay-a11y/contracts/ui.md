# Contract: Skill Overlay Accessibility

User-facing contract for Create Skill, Edit Skill, and Delete Skill. No HTTP API. No storage writes.

## Surfaces

| Overlay | Opens from | Host file |
| ------- | ---------- | --------- |
| Create Skill | Create Skill or Create your first skill on My Skills | `SkillList.tsx` + `SkillForm.tsx` |
| Edit Skill | Edit on Skill Detail | `SkillDetail.tsx` + `SkillEditForm.tsx` |
| Delete Skill | Delete on Skill Detail | `SkillDetail.tsx` |

## Closed

MUST NOT expose the overlay title as a heading or the overlay fields as part of the underlying page.

MAY expose the opening **controls** (buttons named Create Skill, Create your first skill, Edit, Delete).

Skill Detail reading headings from `008` stay. My Skills table structure stays.

## Open

| Overlay | Accessible name |
| ------- | --------------- |
| Create | **Create Skill** (visible title) |
| Edit | **Edit Skill** (visible title) |
| Delete | **Delete Skill** (visible title) |

Copy, fields, and Name is required (`007`) unchanged.

## Dismiss (same page)

Cancel or Escape MUST move keyboard focus to the control that opened the overlay.

Successful Create or Save while remaining on the page MUST NOT leave focus inside a closed overlay; restore to the opener.

Confirming Delete navigates away; focus on Delete is not required.

## Loading / missing

"Loading..." and "Skill not found" have no overlays. This contract does not apply there.
