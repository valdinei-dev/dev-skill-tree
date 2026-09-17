# Quickstart: Storage Contract Tests

Automated validation. No catalog UI and no `npm run dev` required for this feature.

## Prerequisites

- Node.js able to install and run the project
- Dependencies installed (`npm install`), including the Vitest devDependencies from this feature

## Setup

From the repository root:

```bash
npm install
```

## Scenario A — Documented run (SC-002, SC-004, FR-007)

1. Run `npm test`.
2. Confirm the process exits successfully and reports that the storage contract checks passed.
3. Confirm it finished in under 30 seconds.

## Scenario B — Create and read (US1 / FR-002)

Covered by `npm test` (empty list, create with name only and defaults, list contains it, get-by-id existing and missing). No browser.

If isolating a failure: the create/read examples in [contracts/storage.md](./contracts/storage.md) are the assertions that must pass.

## Scenario C — Update, delete, and invalid writes (US2, US3 / FR-003, FR-004)

Covered by the same `npm test` run (update fields and missing id; delete existing and not-found; empty/whitespace name and out-of-range levels leave the catalog unchanged).

## Scenario D — Isolation (SC-003, FR-005)

Covered by `npm test`: leftover skills from one check must not make a later “empty catalog” or “unchanged catalog” assertion pass by accident. Checks empty via public delete only (see [data-model.md](./data-model.md)).

## Fail signal

If a persistence rule in `lib/storage.ts` breaks (for example create accepting an empty name), `npm test` MUST exit non-zero. Do not “fix” that by weakening the test.

## Stop

No dev server to stop. Watch mode is not the documented command.
