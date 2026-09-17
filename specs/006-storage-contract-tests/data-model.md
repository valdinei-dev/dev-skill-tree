# Data Model: Storage Contract Tests

This feature does not add, remove, or change persisted entities.

Skill remains as in the catalog feature (`id`, `name`, `description`, `priority`, `knowledge`, `notes`). Persistence operations remain `getSkills`, `getSkillById`, `createSkill`, `updateSkill`, and `deleteSkill` as in the catalog storage contract.

## Validation (unchanged; checks must assert)

- **Name** (create and update when `name` is present): trim; empty or whitespace-only MUST NOT persist. Current module throws.
- **Priority / knowledge** (create and update when the field is present): MUST be 1–5. Out of range MUST NOT persist. Current module throws. Unspecified on create defaults to `1`.
- **Description / notes** on create when omitted: `""`.
- **id**: assigned on create; update MUST NOT change it.
- **getSkillById** missing: `null`.
- **updateSkill** missing: `null`.
- **deleteSkill** missing: `{ ok: false, reason: "not-found" }`.
- **deleteSkill** existing: `{ ok: true }` and the skill is gone from list and get-by-id.

## Isolation (test process, not an entity)

There is no Clear Catalog record and no new storage key.

For each check that needs an empty catalog:

```text
getSkills() → for each skill, deleteSkill(id) → catalog empty
→ create only what this check needs (if any)
```

That sequence is the only allowed empty-start. It MUST NOT become a public persistence operation.

## Lifecycle (not a product state machine)

```text
beforeEach: empty via public delete
  → create / get / list / update / delete as the check requires
  → assert through public operations only
  → next check repeats empty via public delete
```
