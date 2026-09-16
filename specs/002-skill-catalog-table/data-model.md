# Data Model: Skill Catalog Table

This feature does not add or change persisted entities. Skill remains as in the catalog feature.

## Skill (unchanged)

| Field | Type | Notes for this feature |
| ----- | ---- | ---------------------- |
| `id` | string | Used only in the Skill Detail URL |
| `name` | string | Skill column; link target label |
| `description` | string | Not shown on My Skills |
| `priority` | 1–5 | Sorted descending; shown as English label |
| `knowledge` | 1–5 | Shown as English label; **not** a sort key |
| `notes` | string | Not shown on My Skills |

## View order (not persisted)

Apply to the in-memory list before rendering the table:

1. `priority` descending (`5` before `1`).
2. If equal, `name` ascending, case-insensitive (`sensitivity: "base"`).
3. If priority and name both compare equal, order among those rows may be stable but is unspecified.

Do **not** persist this order. Do **not** store a rank or gap field.

## Validation / invariants

| Rule | On failure |
| ---- | ---------- |
| Table shown with 0 skills | Forbidden; use empty-state copy instead |
| Sort by knowledge or `priority - knowledge` | Forbidden |
| Display raw `1`–`5` in the table | Forbidden; use Very Low … Very High |
| Write label strings into `skills` | Forbidden |

## Relationships

None. No Job entity.
