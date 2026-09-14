# Contract: Storage Module

Internal persistence interface used by client components. Not an HTTP API. Components MUST NOT call `localStorage`, `JSON.parse`, or `JSON.stringify`.

**Module**: `lib/storage.ts`

## Collections

| Key | Value |
| --- | ----- |
| `skills` | JSON array of Skill objects |
| `jobs` | JSON array of Job objects |

Missing or invalid JSON is treated as an empty array for that collection.

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

### `deleteSkill(id: string): { ok: true } | { ok: false; reason: "in-use"; jobCount: number } | { ok: false; reason: "not-found" }`

- If any job’s `skills` includes `id`, return `{ ok: false, reason: "in-use", jobCount }`.
- If the skill does not exist, return `{ ok: false, reason: "not-found" }`.
- Otherwise remove it from `skills` and return `{ ok: true }`.

### `getJobs(): Job[]`

Returns all jobs in insertion order.

### `getJobById(id: string): Job | null`

Find by id. Unused by UI in this MVP; part of the constitution API.

### `createJob(input: { name: string; skills?: string[] }): Job`

- Trims `name`. Rejects empty name.
- `skills` defaults to `[]`. Each entry MUST be an existing skill id; ignore or reject unknown ids (do not create skills). Prefer ignoring unknown ids so a stale picker cannot invent records.
- Assigns `id` with `crypto.randomUUID()`.
- Appends to `jobs` and returns the stored Job.

### `countJobsUsingSkill(id: string): number`

Count of jobs whose `skills` array includes `id`. Used to disable delete and show “Used by N jobs”.

## Invariants

1. Jobs never store skill name, description, priority, knowledge, or notes.
2. Writes MUST NOT invent priority or knowledge; only persist user-supplied or default values.
3. All functions that touch the DOM storage API MUST be called from the browser (client components after mount).
