# Research: Skill Catalog Table

## 1. Native HTML table, not grouped headings or a div grid

**Decision**: Render a native `<table>` with `<thead>` / `<th>` headings Skill, Priority, Knowledge and one `<tbody>` row per skill. Remove the current `<h2>` priority groups and `<ul>` of names.

**Rationale**: The spec requires a table whose headings name the axes. Native table markup matches that contract, is readable by assistive tech, and needs no extra dependency. Group headings labeled only “Very High” are explicitly forbidden.

**Alternatives considered**:
- Keep groups and add Knowledge on each row — headings still unlabeled; Priority column would duplicate the group.
- CSS grid that looks like a table — weaker semantics; spec asked for a table.
- A table library — extra package; constitution V.

## 2. Sort in the list island, reuse existing name compare

**Decision**: In `SkillList`, sort a copy of `skills` by `priority` descending, then `name.localeCompare(..., { sensitivity: "base" })`. Do not sort by `knowledge`. Do not compute `priority - knowledge`.

**Rationale**: Same name compare as today’s within-group sort. Priority order 5→1 matches “highest first”. Knowledge stays a displayed field only (constitution IV).

**Alternatives considered**:
- Sort by knowledge within a priority — rejected in specify.
- Extract `lib/sortSkills.ts` — premature unless the comparator is reused or tested in this feature (no test runner).

## 3. Change `SkillList` in place

**Decision**: Replace the non-empty-list markup inside `components/skills/SkillList.tsx`. Keep empty state, Create Skill, and `SkillForm` as they are. `app/skills/page.tsx` stays a Server Component.

**Rationale**: One client island already reads storage and handles the overlay. A new `SkillTable.tsx` would split presentation without a new client reason.

**Alternatives considered**:
- New `SkillTable` component — extra file; no second consumer.
- Making the page a Client Component — unnecessary `'use client'`.

## 4. Skill name is the only link

**Decision**: Wrap the skill name in `next/link` to `/skills/[id]`. Priority and Knowledge cells are text.

**Rationale**: Spec assumption: name opens detail; other columns are not destinations. Matches User Story 2.

**Alternatives considered**:
- Entire row clickable — slightly nicer hit area; easier to mis-click and harder to select text. Not specified; skip.

## 5. Labels from `lib/levels.ts`

**Decision**: Display `labelForLevel(skill.priority)` and `labelForLevel(skill.knowledge)`. Never write labels into storage.

**Rationale**: Constitution: stored integers stay independent of presentation. Existing map is Very Low … Very High.

**Alternatives considered**:
- Stars — out of spec.
- Showing `5` in the table — fails FR-003.

## 6. No storage or model change

**Decision**: Do not add fields, collections, or functions to `lib/storage.ts` / `types/skill.ts`.

**Rationale**: This feature is presentation and view-order only.

**Alternatives considered**:
- Persisting a “list sort preference” — not specified; extra state.
