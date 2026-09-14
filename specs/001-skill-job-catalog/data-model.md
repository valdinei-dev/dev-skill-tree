# Data Model: Skill and Job Catalog

## Skill

A reusable technical skill in the user's personal catalog. Independent of jobs.

| Field | Type | Required | Default | Rules |
| ----- | ---- | -------- | ------- | ----- |
| `id` | string | yes (system) | `crypto.randomUUID()` | Unique; stable; never edited by the user |
| `name` | string | yes | — | Trimmed; empty or whitespace-only is invalid |
| `description` | string | no | `""` | Free text |
| `priority` | integer | no | `1` | One of `1`, `2`, `3`, `4`, `5` |
| `knowledge` | integer | no | `1` | One of `1`, `2`, `3`, `4`, `5`; independent of `priority` |
| `notes` | string | no | `""` | Free text |

Duplicate `name` values are allowed. Identity is `id`.

### Priority and knowledge scale

| Value | English label |
| ----: | ------------- |
|     1 | Very Low |
|     2 | Low |
|     3 | Medium |
|     4 | High |
|     5 | Very High |

The product MUST NOT compute or suggest these values.

### Skill lifecycle

```text
created → listed / detailed / updated
        → deleted   (only if job references == 0)
```

- **Create**: overlay form; only `name` required; defaults applied for omitted fields.
- **Update**: from Skill Detail; same fields as create except `id` is unchanged.
- **Delete**: allowed only when no Job `skills` array contains this `id`. Otherwise the action is disabled and the UI explains the skill is in use (include the job count when known).

## Job

A job opportunity and its skill requirements. Does not own skill details.

| Field | Type | Required | Default | Rules |
| ----- | ---- | -------- | ------- | ----- |
| `id` | string | yes (system) | `crypto.randomUUID()` | Unique; stable |
| `name` | string | yes | — | Trimmed; empty or whitespace-only is invalid |
| `skills` | string[] | no | `[]` | Skill `id`s only; no duplicated skill payloads; unknown ids are kept but not shown as openable skills |

Jobs are create-and-list only in this MVP. No update, delete, or job detail entity/page.

### Job lifecycle

```text
created → listed (with resolved skill names)
```

Creating a job MUST NOT create a Skill.

## Relationships

```text
Skill 1 ──< referenced by >── * Job.skills[]
```

- Skill is the single source of truth for name, description, priority, knowledge, and notes.
- A Job displays skill names by resolving each id through the skill catalog.
- If an id cannot be resolved, the job still lists; that id is not rendered as a normal Skill Detail link.

## Persistence collections

Two `localStorage` collections (see `contracts/storage.md`):

```text
skills: Skill[]
jobs:   Job[]
```

No other collections in the MVP.

## Validation summary

| Rule | On failure |
| ---- | ---------- |
| Skill `name` missing/whitespace | Do not create or update; prompt for a name |
| Job `name` missing/whitespace | Do not create; prompt for a name |
| Priority/knowledge outside 1–5 | Reject write; UI only offers the five levels |
| Delete skill with job references | Refuse; explain in-use |
| Job skill picker | Existing catalog ids only |
