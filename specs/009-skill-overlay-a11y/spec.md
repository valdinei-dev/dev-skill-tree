# Feature Specification: Skill Overlay Accessibility

**Feature Branch**: `009-skill-overlay-a11y`

**Created**: 2026-09-17

**Status**: Draft

**Input**: User description: "Create Skill, Edit Skill, and Delete Skill overlays must be identifiable to keyboard and assistive-technology users when they are open, using the existing titles Create Skill, Edit Skill, and Delete Skill. When an overlay is closed, its title and fields must not appear in the accessibility tree of the underlying page (My Skills or Skill Detail). After the user dismisses an overlay without leaving the page (Cancel, Escape), focus must return to the control that opened it (Create Skill, Edit, or Delete). Successful delete may leave the page as today. Do not change overlay copy, Name is required (007), reading ficha (008), or the My Skills table. No component library. No new Skill fields."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - A closed overlay is not part of the page (Priority: P1)

A developer is on My Skills or Skill Detail with no overlay open. Assistive technology presents the page they are on — the list or the ficha — not a second heading named Create Skill, Edit Skill, or Delete Skill, and not the overlay’s fields mixed into the page.

**Why this priority**: Today a closed overlay still leaks into the accessibility tree. After 008, Skill Detail’s reading headings are honest, but the page still announces overlay titles that are not on screen. That is the same class of bug: the tree does not match the UI.

**Independent Test**: Open My Skills with Create Skill closed. Confirm the page heading is My Skills and there is no Create Skill overlay title or overlay fields in the accessibility tree. Open Skill Detail with Edit and Delete closed. Confirm the reading headings from 008, and no Delete Skill / Edit Skill overlay as if it were part of the ficha.

**Acceptance Scenarios**:

1. **Given** My Skills is showing and Create Skill is closed, **When** an accessibility inspector or screen reader reviews the page, **Then** it does not present Create Skill as a heading or expose the create fields as part of that page.
2. **Given** Skill Detail is showing and neither Edit nor Delete is open, **When** they review the page, **Then** it does not present Edit Skill or Delete Skill as overlay content mixed into the reading view.
3. **Given** a closed overlay, **When** a sighted user looks at the screen, **Then** they still do not see the overlay (visual closed state is unchanged).

---

### User Story 2 - An open overlay has a name (Priority: P2)

A developer opens Create Skill, Edit Skill, or Delete Skill. They can tell — by looking or with assistive technology — which overlay they are in, using the existing titles.

**Why this priority**: Naming the interrupt is the point of opening it. Secondary to US1 because a leaking closed overlay pollutes every page visit; naming matters once the overlay is actually open.

**Independent Test**: Open each of the three overlays. Confirm the overlay is identifiable as Create Skill, Edit Skill, or Delete Skill in the accessibility tree (or equivalent), matching the visible title. Confirm 007 still shows Name is required on empty create/edit save.

**Acceptance Scenarios**:

1. **Given** the user chooses Create Skill, **When** the overlay is open, **Then** they and assistive technology can identify it as Create Skill.
2. **Given** the user chooses Edit on Skill Detail, **When** the overlay is open, **Then** they and assistive technology can identify it as Edit Skill.
3. **Given** the user chooses Delete on Skill Detail, **When** the confirmation is open, **Then** they and assistive technology can identify it as Delete Skill, with the existing confirmation copy.
4. **Given** Create or Edit is open, **When** they try to save with an empty name, **Then** Name is required still appears as in 007.

---

### User Story 3 - Closing returns to the control that opened it (Priority: P3)

A developer opens an overlay from Create Skill, Edit, or Delete, then dismisses it without leaving the page (Cancel or Escape). The next keyboard action is on that same control, not a jump to the top of the page or a random field.

**Why this priority**: Keyboard users should not hunt for the button they just used. Third because the tree (US1–US2) is the identification problem; focus return is the interrupt’s exit.

**Independent Test**: From My Skills, open Create Skill, press Escape or Cancel, Tab once — focus is on Create Skill. From Skill Detail, same for Edit and for Delete (cancel, do not confirm delete).

**Acceptance Scenarios**:

1. **Given** Create Skill was opened from its page control, **When** the user cancels or presses Escape, **Then** keyboard focus is back on Create Skill.
2. **Given** Edit Skill was opened from Edit, **When** they cancel or press Escape, **Then** keyboard focus is back on Edit.
3. **Given** Delete Skill was opened from Delete, **When** they cancel or press Escape (no delete), **Then** keyboard focus is back on Delete.
4. **Given** they confirm Delete and the skill is removed, **When** the app leaves Skill Detail as today, **Then** this story does not require restoring focus on the deleted page.

---

### Edge Cases

- Escape and Cancel MUST both restore focus to the opening control when the user stays on the page.
- Successful Create or Save MAY restore focus to the opening control if the user remains on the same page; they MUST NOT strand focus inside a closed overlay.
- Confirming Delete navigates away; focus return to Delete is not required.
- Overlay titles and button labels MUST stay Create Skill, Edit Skill, Delete Skill, Cancel, Create, Save, Delete.
- This feature MUST NOT change My Skills table structure, Skill Detail reading headings from 008, or Name is required from 007.
- No component library. No new Skill field.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: While Create Skill, Edit Skill, or Delete Skill is closed, the underlying page MUST NOT expose that overlay’s title or fields to assistive technology as if they were part of the page.
- **FR-002**: While one of those overlays is open, assistive technology MUST be able to identify it by its existing title (Create Skill, Edit Skill, or Delete Skill).
- **FR-003**: After the user dismisses an overlay and remains on the same page, keyboard focus MUST return to the control that opened it.
- **FR-004**: Overlay copy, validation (Name is required), reading-field headings on Skill Detail, and the My Skills table MUST remain as specified in 007, 008, and the catalog table feature.
- **FR-005**: This feature MUST NOT add a component library or a new Skill field.

### Key Entities

None. Skill fields and overlay actions are unchanged. This feature only changes how overlays are exposed when open or closed, and where focus goes after dismiss.

## Out of Scope

- My Skills table accessibility (row/column naming)
- Skill Detail reading-field structure (008)
- Changing Create / Edit / Delete copy or Name is required
- Component libraries
- Jobs, export, import, accounts

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% of visits to My Skills or Skill Detail with overlays closed present no overlay title as part of that page to an accessibility inspector or screen reader.
- **SC-002**: 100% of open Create Skill, Edit Skill, and Delete Skill overlays are identifiable by those titles to an accessibility inspector or screen reader.
- **SC-003**: After Cancel or Escape on any of the three overlays, a keyboard user can act on the opening control on the first try (no extra Tab hunt).
- **SC-004**: Sighted users still see the same overlay titles, fields, and buttons; they are not asked to learn new copy or a new layout.

## Assumptions

- UI language stays English. Overlay titles stay Create Skill, Edit Skill, Delete Skill.
- 004 / 005 / 007 remain the overlay behavior contracts; 009 only tightens identification, closed-state exposure, and focus return. Those folders stay historical.
- Successful Delete still navigates to My Skills; focus on the deleted Skill Detail is not required.
- Create Skill remains an overlay on My Skills, not a separate page.
- Edit Skill still mounts only while open; Create Skill and Delete Skill may remain in the page markup when closed as long as FR-001 holds.
- Keyboard Tab order inside an open overlay is already usable enough; this feature does not redesign field order.
- Overlay accessibility of the My Skills table is a later slice.
