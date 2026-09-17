# Contract: Skill Delete Confirmation

User-facing contract for Skill Detail delete. No HTTP API. Storage writes happen only when the user chooses Delete inside the overlay.

## Surface

Skill Detail (`/skills/{id}`) — existing Client island `components/skills/SkillDetail.tsx`.

The confirmation overlay MUST NOT appear on Home, My Skills, About, or in the header.

## Page Delete

| Item | Value |
| ---- | ----- |
| Label | Delete |
| Effect | Opens the confirmation overlay |
| Catalog | Unchanged until overlay Delete |

MUST NOT remove the skill.

## Confirmation overlay

Shown only after page Delete. Copy is word-for-word (name substituted):

| Item | Value |
| ---- | ----- |
| Heading | Delete Skill |
| Body | You are about to delete the skill “{name}”. This cannot be undone. |
| `{name}` | Persisted skill name, inside quotation marks |
| Actions | Cancel, then Delete (exactly two) |

### Cancel or dismiss

Closes the overlay. User stays on Skill Detail. Skill unchanged.

### Overlay Delete

Calls existing `deleteSkill`. On success, user goes to My Skills (`/skills`) and the skill is gone. Visiting `/skills/{id}` afterward shows “Skill not found”, not this overlay.

## Unchanged

- Create Skill overlay
- Save on Skill Detail
- `deleteSkill` signature and “no in-use guard”
- My Skills table and empty state
