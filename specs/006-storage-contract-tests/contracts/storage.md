# Contract: Storage Persistence Checks

Automated checks of the existing skill persistence module. Not an HTTP API. Not a UI contract. Tests MUST NOT call `localStorage`, `JSON.parse`, or `JSON.stringify`. UI components remain bound by the catalog rule: they also MUST NOT call those APIs.

**Module under test**: `lib/storage.ts`  
**Check file**: `lib/storage.test.ts`  
**Operations** (catalog contract; this feature does not change signatures): see `specs/001-skill-job-catalog/contracts/storage.md` — `getSkills`, `getSkillById`, `createSkill`, `updateSkill`, `deleteSkill`.

## Allowed imports in the check file

- `getSkills`, `getSkillById`, `createSkill`, `updateSkill`, `deleteSkill` from the storage module
- Vitest (`describe`, `it`, `expect`, `beforeEach`)

MUST NOT import `useSkills`, skill components, or a test-only reset from storage (storage MUST NOT gain one).

## Isolation

Every check that requires an empty catalog MUST empty it by `getSkills()` + `deleteSkill` for each id (`beforeEach`). MUST NOT `localStorage.clear` or rewrite the `skills` key.

## Documented run (FR-007)

From the repository root, after install:

```bash
npm test
```

This MUST run `vitest run` and exit with a non-zero status if any check fails.

## Required assertions (map to spec)

### Create and read (US1 / FR-002)

| Check | Assert |
| ----- | ------ |
| Empty catalog | `getSkills()` is `[]` |
| Create name only | Returned skill has trimmed name; `description === ""`; `notes === ""`; `priority === 1`; `knowledge === 1`; `id` is a non-empty string |
| List after create | `getSkills()` includes that skill (same `id`) |
| Get existing | `getSkillById(id)` equals the created skill |
| Get missing | `getSkillById` for an id that is not in the catalog returns `null` |

### Update and delete (US2 / FR-003)

| Check | Assert |
| ----- | ------ |
| Update all patchable fields | `getSkillById` shows new name, description, priority, knowledge, notes; `id` unchanged |
| Update missing | `updateSkill` returns `null`; other skills unchanged |
| Delete existing | result `{ ok: true }`; skill absent from `getSkills()`; `getSkillById` is `null` |
| Delete missing | result `{ ok: false, reason: "not-found" }`; other skills unchanged |

### Invalid writes (US3 / FR-004)

| Check | Assert |
| ----- | ------ |
| Create `""` or whitespace name | Throws; `getSkills()` still empty (or unchanged) |
| Update existing with `""` or whitespace name | Throws; skill fields unchanged |
| Create or update with priority or knowledge outside 1–5 | Throws; catalog unchanged for that attempt |
| Invalid write with a valid skill present | That valid skill still listed with the same fields |

Whitespace-only names are the same class as empty names.

## Out of this contract

`useSkills`, overlays, malformed stored JSON, a `jobs` key, export/import, coverage thresholds.
