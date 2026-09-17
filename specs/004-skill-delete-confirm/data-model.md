# Data Model: Skill Delete Confirmation

This feature does not add, remove, or change persisted entities.

Skill remains as in the catalog feature (`id`, `name`, `description`, `priority`, `knowledge`, `notes`). `deleteSkill` still removes the matching record from the `skills` collection when it exists.

## Overlay state (not persisted)

The confirmation overlay is open or closed in Skill Detail only. It is not stored. Closed is the default. Opening it MUST NOT write the catalog. Closing it without overlay Delete MUST NOT write the catalog.

The name shown in the overlay is the persisted Skill `name` for the open detail record.

## Lifecycle (delete path)

```text
Skill Detail, overlay closed
  → page Delete → overlay open (skill still stored)
  → Cancel or dismiss → overlay closed (skill still stored)
  → overlay Delete → skill deleted → My Skills
```

There is no deleted/archived state on Skill.
