# Contract: Skill Detail Reading Fields

User-facing contract for the loaded Skill Detail reading view. No HTTP API. No storage writes.

## Surface

Skill Detail (`/skills/{id}`) after the skill has loaded (not Loading / not found). File: `components/skills/SkillDetail.tsx`.

## Reading structure

| Item | Presentation | Accessibility |
| ---- | ------------ | ------------- |
| Name | Page heading (`h1`) | Heading named with the skill name |
| Description | Label + reading value | Heading **Description** present even if value is empty |
| Priority | Label + `labelForLevel` | Heading **Priority** + level words |
| Knowledge | Label + `labelForLevel` | Heading **Knowledge** + level words |
| Notes | Label + reading value | Heading **Notes** present even if value is empty |

MUST NOT use a filler such as “None” for empty text.

MUST NOT present an always-on Save form on this view.

## Unchanged

| Control | Behavior |
| ------- | -------- |
| Edit | Opens Edit Skill (`005` / `007`) |
| Delete | Opens Delete Skill (`004`) |

Create Skill, My Skills table, and overlay internals are out of this contract.

## Loading / missing

"Loading..." and "Skill not found" unchanged. The four reading headings are not required in those states.
