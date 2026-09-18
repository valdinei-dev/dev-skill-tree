# Data Model: Skill Overlay Accessibility

This feature does not add, remove, or change persisted entities.

Skill remains `id`, `name`, `description`, `priority`, `knowledge`, `notes`. Overlay open flags stay client UI state (`formOpen`, `editOpen`, `confirmOpen`).

## Overlay session (not persisted)

| State | Meaning |
| ----- | ------- |
| Closed | Dialog not mounted. Page tree must not include overlay title or overlay fields. Page controls Create Skill / Edit / Delete may still be named. |
| Open | Dialog mounted and shown. Accessible name is the existing title. |
| Dismissed, same page | Overlay closed; keyboard focus on the control that opened it. |
| Delete confirmed | Navigate away as today; no focus restore on the removed Skill Detail. |
