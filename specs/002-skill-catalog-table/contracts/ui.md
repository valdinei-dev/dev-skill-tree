# Contract: My Skills Table

User-facing contract for the non-empty My Skills list. No HTTP API. Storage remains `lib/storage.ts` as in the catalog feature (read-only for this screen besides create overlay).

## Surface

`/skills` — existing Server page plus client `SkillList`.

## Empty catalog

Unchanged:

- Copy: “You don't have any skills yet.”
- Action: “Create your first skill”
- No table with only headers

## Non-empty catalog

Must include:

- Heading “My Skills”
- “Create Skill” (opens the existing overlay)
- A table with exactly three columns

### Columns (left to right)

| Heading | Cell |
| ------- | ---- |
| Skill | Skill `name`; this text is the control that opens `/skills/{id}` |
| Priority | English label of `priority` (Very Low … Very High) |
| Knowledge | English label of `knowledge` (Very Low … Very High) |

Priority and Knowledge cells MUST NOT be links.

### Order

Top to bottom: higher `priority` first; same priority → name A–Z, case-insensitive.

### Forbidden on this surface

- Section headings that are only a level label (for example “Very High”)
- Description or notes columns
- Sorting by knowledge or by a derived score
- Numeric level display in place of labels

## Overlay

Create Skill `<dialog>` is unchanged (Name required; optional description, priority, knowledge, notes). After a successful create, the new row MUST appear in the table in the correct sort position without a required full-page reload by the user.
