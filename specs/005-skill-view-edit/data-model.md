# Data Model: Skill Detail View and Edit Overlay

This feature does not add, remove, or change persisted entities.

Skill remains as in the catalog feature (`id`, `name`, `description`, `priority`, `knowledge`, `notes`). `updateSkill` still patches the matching record. Name remains required (trimmed; whitespace-only is invalid). Description and notes may be empty. Priority and knowledge stay independent 1–5.

## Overlay state (not persisted)

The Edit Skill overlay is open or closed in Skill Detail only. Closed is the default. Opening it MUST NOT write the catalog. Closing it without Save MUST NOT write the catalog.

When the overlay opens, field values are the persisted Skill at that moment.

## Lifecycle (view / edit path)

```text
Skill Detail, reading view, overlay closed
  → Edit → overlay open (skill still stored as last save)
  → Cancel or dismiss → overlay closed (skill still last save)
  → Save with valid name → skill updated → reading view shows new values
  → Save with empty name → no write; overlay stays open with a name prompt
```

Delete remains the `004` path from the reading view. It does not go through Edit Skill.
