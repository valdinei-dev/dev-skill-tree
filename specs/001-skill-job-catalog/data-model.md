# Data Model: Skill Catalog

## Skill

A reusable technical skill in the user's personal catalog.

| Field | Type | Required | Default | Rules |
| ----- | ---- | -------- | ------- | ----- |
| `id` | string | yes (system) | `crypto.randomUUID()` | Unique; stable; never edited by the user |
| `name` | string | yes | — | Trimmed; empty or whitespace-only is invalid |
| `description` | string | no | `""` | Free text |
| `priority` | integer | no | `1` | One of `1`, `2`, `3`, `4`, `5` |
| `knowledge` | integer | no | `1` | One of `1`, `2`, `3`, `4`, `5`; independent of `priority` |
| `notes` | string | no | `""` | Free text; MAY mention roles or postings as unstructured context |

Duplicate `name` values are allowed. Identity is `id`.

A Skill MUST NOT store job identifiers, company, salary, or application status.

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
        → deleted
```

- **Create**: overlay form; only `name` required; defaults applied for omitted fields.
- **Update**: from Skill Detail; same fields as create except `id` is unchanged.
- **Delete**: always allowed for an existing skill. There is no in-use guard.

## Job

Not an entity in this MVP. A later specification MAY introduce Job. Until then the catalog MUST NOT persist a jobs collection or skill–job references.

## Relationships

None. Skill is the only catalog entity.

## Persistence collections

One `localStorage` collection (see `contracts/storage.md`):

```text
skills: Skill[]
```

The MVP MUST NOT read or write a `jobs` key. Leftover `jobs` data from an earlier revision MAY remain in the browser unused.

## Validation summary

| Rule | On failure |
| ---- | ---------- |
| Skill `name` missing/whitespace | Do not create or update; prompt for a name |
| Priority/knowledge outside 1–5 | Reject write; UI only offers the five levels |
| Delete missing skill | No-op / not-found; catalog unchanged |
