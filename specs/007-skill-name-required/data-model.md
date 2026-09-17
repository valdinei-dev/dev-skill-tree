# Data Model: Skill Name Required Feedback

This feature does not add, remove, or change persisted entities.

Skill remains `id`, `name`, `description`, `priority`, `knowledge`, `notes`. Name is still required after trim. `createSkill` / `updateSkill` still throw on empty name; the overlays MUST NOT call them when `name.trim()` is empty.

## Overlay state (not persisted)

Each of Create Skill and Edit Skill has a local **name error** flag:

- **Hidden** (default): overlay opened or last close; user has not failed a Create/Save in this open cycle.
- **Shown**: user submitted Create or Save with a name that is empty after trim. Message text is exactly `Name is required`.

Transitions:

```text
overlay closed or just opened → error hidden
  → Create/Save with empty or whitespace name → error shown (no storage write)
  → Create/Save with a name that has non-space characters → storage write → overlay closes → error hidden
  → Cancel or dismiss → overlay closes → error hidden (no storage write)
```

Closing MUST reset the flag so the next open does not show the message (FR-006, FR-007).
