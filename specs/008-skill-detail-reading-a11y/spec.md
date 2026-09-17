# Feature Specification: Skill Detail Reading Accessibility

**Feature Branch**: `008-skill-detail-reading-a11y`

**Created**: 2026-09-17

**Status**: Draft

**Input**: User description: "Skill Detail’s reading view must name Description, Priority, Knowledge, and Notes for keyboard and assistive-technology users, including when description or notes are empty. Do not add a None placeholder. Name stays the page heading. Keep the reading view (not a form). Edit and Delete stay as they are. No component library. No My Skills table work."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Read every field, including empty ones (Priority: P1)

A developer opens a skill on a study pass. They can tell, by looking or with assistive technology, that the skill has Description, Priority, Knowledge, and Notes. If description or notes have no text, those fields are still there as labeled reading slots — not missing, and not replaced by the word “None”. The name is the page title. They are not in a form.

**Why this priority**: Sunday use is review. Today the labels are visible on screen, but Description and empty Notes often disappear from the accessibility tree, so a keyboard or screen-reader pass is only name, Edit, and Delete.

**Independent Test**: Open a skill that has description and notes, and one that has empty description and notes. Confirm all four field labels are present visually and in the accessibility tree (or equivalent inspector). Confirm empty fields are still named. Confirm there is no “None” filler and no page-level Save form.

**Acceptance Scenarios**:

1. **Given** Skill Detail has loaded for an existing skill, **When** the user (or an accessibility inspector) reviews the reading view, **Then** they can identify Description, Priority, Knowledge, and Notes as named reading content, and the skill name as the page heading.
2. **Given** description is empty, **When** they view Skill Detail, **Then** Description is still identifiable as a field with no description text yet (no “None” or similar filler required).
3. **Given** notes are empty, **When** they view Skill Detail, **Then** Notes is still identifiable as a field with no notes text yet (no “None” or similar filler required).
4. **Given** the reading view is showing, **When** they look for data entry, **Then** they do not see an always-on save form; Edit and Delete remain the page actions.

---

### User Story 2 - Levels stay readable as words (Priority: P2)

A developer reading Priority and Knowledge still sees the human labels (Very Low through Very High), not a requirement to read raw numbers. Assistive technology presents those same words with their field names.

**Why this priority**: Constitution: stored integers stay independent of UI labels. The a11y pass must not regress 005’s readable levels.

**Independent Test**: Open a skill with a known priority and knowledge. Confirm the reading view shows the level words, named as Priority and Knowledge, not only unlabeled numbers.

**Acceptance Scenarios**:

1. **Given** a skill with Priority and Knowledge set, **When** the reading view has loaded, **Then** those two fields are named Priority and Knowledge and show the existing human-readable level labels.
2. **Given** a screen-reader or accessibility inspector, **When** it reaches those fields, **Then** it can associate the level words with Priority and Knowledge.

---

### User Story 3 - Edit and Delete still work from the ficha (Priority: P3)

After the reading structure change, Edit still opens Edit Skill, and Delete still opens the existing confirmation. The catalog is not rewritten.

**Why this priority**: Accessibility of reading must not break the 004/005/007 overlays. Secondary because the ficha is the new value; overlays already exist.

**Independent Test**: From the updated reading view, choose Edit (overlay opens, 007 name rules still apply) and Delete (Delete Skill confirmation still opens). Cancel both.

**Acceptance Scenarios**:

1. **Given** the user is on the reading view, **When** they choose Edit, **Then** Edit Skill still opens as today (including “Name is required” from `007` when they save an empty name).
2. **Given** the user is on the reading view, **When** they choose Delete, **Then** the existing Delete Skill confirmation still opens and does not delete until they confirm.
3. **Given** Loading or Skill not found, **When** those states show, **Then** they remain "Loading..." and "Skill not found"; the reading field list is not required there.

---

### Edge Cases

- Empty description and empty notes MUST remain labeled. MUST NOT hide the field. MUST NOT require a “None”, “—”, or “Empty” placeholder.
- Name is the page heading, not a fifth labeled block that duplicates the title.
- Priority and Knowledge MUST keep human-readable labels from the existing level list.
- This feature MUST NOT change Create Skill, My Skills table, Delete copy, or Edit Skill fields.
- Assistive technology MUST be able to name each reading field without relying on visual layout alone (for example CSS columns).
- No component library.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Skill Detail’s loaded reading view MUST present the skill name as the page heading and MUST present Description, Priority, Knowledge, and Notes as named reading fields (not as an always-on edit form).
- **FR-002**: Those four field names MUST be available to assistive technology, not only as on-screen styling.
- **FR-003**: When description is empty, Description MUST still be identifiable. When notes are empty, Notes MUST still be identifiable. The product MUST NOT require a filler word such as “None”.
- **FR-004**: Priority and Knowledge MUST show the existing human-readable level labels and MUST be named as those fields for assistive technology.
- **FR-005**: Edit and Delete MUST remain on the reading view with their existing overlay behavior (`005` / `007` for Edit, `004` for Delete).
- **FR-006**: This feature MUST NOT add a component library, a new Skill field, or table changes on My Skills.

### Key Entities

None. Skill fields are unchanged. This feature only changes how the reading view exposes those fields.

## Out of Scope

- My Skills table accessibility
- Dialog title/`aria` work on Create, Edit, or Delete overlays (except that they must keep working)
- Visible “None” / placeholder copy for empty text
- Component libraries
- Jobs, export, import, accounts

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% of loaded Skill Detail reading views expose named Description, Priority, Knowledge, and Notes to an accessibility inspector or screen reader, including when description or notes are empty.
- **SC-002**: A sighted user still sees the same four labels and level words; they are not asked to use a form to read the skill.
- **SC-003**: Empty description or notes never require a filler word; the field name is enough to know the slot exists.
- **SC-004**: From the reading view, a user can still open Edit or Delete on the first try without a new page or a missing control.

## Assumptions

- UI language stays English. Field labels stay Description, Priority, Knowledge, Notes.
- Name as page heading is enough; it is not duplicated as a “Name” row.
- No “None” is an explicit product choice from this specify lock, extending `005` “empty fields stay identifiable” to assistive technology without adding placeholder copy.
- `005` remains the view/edit overlay contract; `008` only tightens reading-field identification. Folder `005` stays historical.
- Overlay accessibility (dialog naming, focus return) is a later slice, not this feature.
