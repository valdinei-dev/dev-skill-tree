# Contract: Name Required on Create and Edit Overlays

User-facing contract for invalid Name on Create Skill and Edit Skill. No HTTP API. Storage is not called until the name is valid after trim.

## Surfaces

| Overlay | File | Submit action |
| ------- | ---- | ------------- |
| Create Skill | `components/skills/SkillForm.tsx` | Create |
| Edit Skill | `components/skills/SkillEditForm.tsx` | Save |

Delete Skill is unchanged.

## Name field (both overlays)

| Item | Value |
| ---- | ----- |
| Visible label | Name |
| Invalid names | empty string; whitespace-only (trim) |
| Error copy | `Name is required` (exact) |
| When shown | After Create or Save with an invalid name only |
| Focus when shown | Name input |
| Assistive tech | Name marked invalid; error identified as belonging to Name (`aria-invalid` + `aria-describedby` on the error text) |
| Native tooltip | MUST NOT be the path for empty Name (no `required` intercept that skips the visible message) |

## Failed submit

- Overlay stays open.
- Catalog unchanged (no `createSkill` / `updateSkill`).
- Empty and whitespace: same copy, same place, same focus.

## Successful submit (valid name)

- Existing create/update behavior from 001/005: persist, close overlay.
- Error not visible after close.

## Cancel / dismiss

- Close without write. Error not left on My Skills or Skill Detail.

## Unchanged

Heading, other fields, Cancel/Create and Cancel/Save, native `<dialog>` `showModal` / `close` / `onCancel`.
