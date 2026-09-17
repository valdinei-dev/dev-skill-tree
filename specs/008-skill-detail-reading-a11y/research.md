# Research: Skill Detail Reading Accessibility

## 1. Stop using `dl`/`dt`/`dd` wrapped in `div`s

**Decision**: Remove the reading `<dl>` in `components/skills/SkillDetail.tsx`. Render each of Description, Priority, Knowledge, and Notes as an `h2` (visible label, existing muted text styles) plus a following value element (`p` or equivalent) with the current `min-h-6` empty treatment. Name stays the page `h1`.

**Rationale**: Spec FR-002 / SC-001. In this app’s accessibility snapshots, `dt`/`dd` inside extra `div`s did not surface as named fields; empty `dd` disappeared. Headings are first-class in the accessibility tree even when the next node has no text, so empty Description/Notes stay identifiable without “None” (FR-003).

**Alternatives considered**:
- Keep `dl` but flatten (no wrapper `div`) — HTML allows `div` in `dl`; the mapping was still unreliable in the inspector we used. Headings are the demonstrated fix.
- `aria-label` / `aria-labelledby` on anonymous `div`s — extra ARIA when a heading already names the block.
- Visible “None” — rejected in specify.

## 2. Associate level words with field names via the same heading + value pattern

**Decision**: Priority and Knowledge use `h2` + `labelForLevel(...)` as the value text. Keep the two-column visual grid. Do not show raw `1`–`5` as the only reading text.

**Rationale**: Spec FR-004 and constitution IV. The heading is the field name; the value is the existing human label.

**Alternatives considered**:
- Leave levels inside `dd` only — fails US1’s inspector check.
- Duplicate numbers and labels — noise; 005 already chose words.

## 3. Do not extract a shared reading-field component; leave overlays alone

**Decision**: Four heading+value blocks inline in `SkillDetail.tsx`. Do not add `ReadingField.tsx`. Do not change `SkillEditForm`, `SkillForm`, Delete dialog markup, or the My Skills table.

**Rationale**: Constitution V and spec FR-005 / FR-006. Four copies of a heading and a paragraph are cheaper than a new abstraction. Overlay a11y is a later slice.

**Alternatives considered**:
- Shared field component — one call site.
- Fix overlays in the same feature — out of spec; would mix reading vs interrupt.

## 4. Validate in the browser inspector, not a new test runner

**Decision**: Quickstart uses the running app and an accessibility snapshot/inspector. `npm test` still covers storage only.

**Rationale**: Same as 004/005/007 UI features. The acceptance criterion is “named in the accessibility tree,” which the browser tools already show.

**Alternatives considered**:
- Testing Library `getByRole('heading', { name: 'Description' })` — useful later; not required by this spec.
