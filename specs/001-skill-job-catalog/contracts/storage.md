# Contract: Storage Module

Internal persistence interface used by client components. Not an HTTP API. Components MUST NOT call `localStorage`, `JSON.parse`, or `JSON.stringify`.

**Module**: `lib/storage.ts`

## Collections

| Key | Value |
| --- | ----- |
| `skills` | JSON array of Skill objects |

Missing or invalid JSON is treated as an empty array.

The module MUST NOT read or write a `jobs` key.

## Operations

### `getSkills(): Skill[]`

Returns all skills. Order in storage is insertion order; the UI applies priority grouping.

### `getSkillById(id: string): Skill | null`

MAY be implemented as `getSkills().find(...)`. Returns `null` when not found.

### `createSkill(input: { name: string; description?: string; priority?: number; knowledge?: number; notes?: string }): Skill`

- Trims `name`. Throws or returns a validation error if name is empty after trim.
- Applies defaults: `description = ""`, `priority = 1`, `knowledge = 1`, `notes = ""`.
- Assigns `id` with `crypto.randomUUID()`.
- Appends to `skills` and returns the stored Skill.

### `updateSkill(id: string, patch: Partial<Omit<Skill, "id">>): Skill | null`

- Updates the matching skill. `id` does not change.
- Trims `name` when present; rejects empty name.
- Returns `null` if the skill does not exist.

### `deleteSkill(id: string): { ok: true } | { ok: false; reason: "not-found" }`

- If the skill does not exist, return `{ ok: false, reason: "not-found" }`.
- Otherwise remove it from `skills` and return `{ ok: true }`.
- MUST NOT consult other collections.

## Invariants

1. Writes MUST NOT invent priority or knowledge; only persist user-supplied or default values.
2. All functions that touch the DOM storage API MUST be called from the browser (client components after mount).
3. There is no Job type, `createJob`, `getJobs`, or `countJobsUsingSkill` in this module.
