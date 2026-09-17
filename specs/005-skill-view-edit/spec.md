# Feature Specification: Skill Detail View and Edit Overlay

**Feature Branch**: `005-skill-view-edit`

**Created**: 2026-09-16

**Status**: Draft

**Input**: User description: "Skill Detail (/skills/[id]) must show the skill as a reading view, not an always-on edit form. An Edit button opens an overlay titled Edit Skill with the skill fields. Overlay actions are Cancel and Save. Cancel or dismiss discards unsaved changes and returns to the reading view. Save persists and the reading view shows the updated skill. Delete stays on the reading view with the existing confirmation overlay."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Read a skill without entering edit (Priority: P1)

A developer opens a skill from My Skills on a study pass. They see that skill’s name, description, priority, knowledge, and notes as information to read. They are not looking at a form. They can choose Edit when they want to change something, and Delete remains available with the existing confirmation.

**Why this priority**: Sunday use is review. The current always-editable detail makes reading feel like data entry. The catalog only helps if opening a skill is first a ficha, then an optional edit.

**Independent Test**: Open an existing skill from My Skills. Confirm the five fields are visible as reading content (not as a save form), that Edit is present, and that Delete still opens the delete confirmation overlay.

**Acceptance Scenarios**:

1. **Given** the user opens Skill Detail for an existing skill, **When** the skill has loaded, **Then** they see name, description, priority, knowledge, and notes as reading content, not as an always-visible edit form with a Save action on that page.
2. **Given** the user is on that reading view, **When** they look for change and cleanup, **Then** they see an Edit action and the existing Delete action.
3. **Given** the user is on that reading view, **When** they choose Delete, **Then** the existing delete confirmation overlay still opens and the skill is not removed until they confirm there.
4. **Given** description or notes are empty, **When** they view Skill Detail, **Then** those fields are still identifiable (the user can tell the skill has no description or no notes yet).

---

### User Story 2 - Change a skill through Edit Skill (Priority: P2)

A developer on the reading view chooses Edit. An overlay titled Edit Skill opens with the current name, description, priority, knowledge, and notes. They change what they need and choose Save. The overlay closes. They remain on Skill Detail in the reading view, with the new values. If they changed the name, My Skills shows the new name.

**Why this priority**: Update is still required (catalog “manage” includes change after create). It must not take over the default detail screen.

**Independent Test**: Open a skill, choose Edit, change name (and optionally another field), Save, confirm the overlay is gone, the reading view shows the new values, and My Skills lists the new name.

**Acceptance Scenarios**:

1. **Given** the user is on Skill Detail reading view, **When** they choose Edit, **Then** an overlay opens with heading "Edit Skill" and fields for name, description, priority, knowledge, and notes filled with the persisted values.
2. **Given** the Edit Skill overlay is open, **When** they view the actions, **Then** they see exactly two actions labeled "Cancel" and "Save".
3. **Given** the Edit Skill overlay is open with a valid name, **When** they choose Save, **Then** the overlay closes, they remain on Skill Detail for that skill, and the reading view shows the saved values without a required manual reload.
4. **Given** the user saved a new name, **When** they view My Skills, **Then** that skill is listed under the new name.
5. **Given** the Edit Skill overlay is open, **When** they submit with an empty name, **Then** the skill is not updated and they are prompted to provide a name.

---

### User Story 3 - Back out of Edit without saving (Priority: P3)

A developer opened Edit and changed fields, then chose Cancel (or dismissed the overlay). They remain on Skill Detail. The skill still has the last saved values. The overlay is closed.

**Why this priority**: Edit as an overlay only helps if abandoning it is safe. A Cancel that still writes would punish exploration.

**Independent Test**: Open Edit, change the name, Cancel (and separately dismiss without Save). Confirm the reading view and My Skills still show the previous name.

**Acceptance Scenarios**:

1. **Given** the Edit Skill overlay is open with unsaved changes, **When** the user chooses Cancel, **Then** the overlay closes, they remain on the Skill Detail reading view, and the skill is unchanged.
2. **Given** the Edit Skill overlay is open with unsaved changes, **When** the user dismisses it without choosing Save, **Then** the same outcome as Cancel.
3. **Given** the user cancelled or dismissed Edit, **When** they open My Skills, **Then** the skill still uses the last saved name.

---

### Edge Cases

- The Edit overlay MUST NOT appear until the user chooses Edit on Skill Detail.
- Create Skill overlay copy and behavior are unchanged.
- Delete confirmation copy and behavior from `004-skill-delete-confirm` are unchanged and remain on the reading view, not inside Edit Skill.
- After a confirmed delete, visiting the old Skill Detail location still shows "Skill not found", not the reading view or Edit overlay.
- Loading remains "Loading..." until the skill is available; missing skills remain "Skill not found".
- Priority and knowledge on the reading view MUST remain the human-readable labels (Very Low through Very High), not a requirement to show raw numbers.
- Saving with only a name (other overlay fields left as loaded or emptied per existing field rules) MUST succeed; name stays required.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Skill Detail for an existing skill MUST present name, description, priority, knowledge, and notes as a reading view. It MUST NOT use an always-on edit form with Save on that page as the default presentation.
- **FR-002**: Skill Detail MUST provide an Edit action that opens the Edit Skill overlay and MUST NOT persist changes by itself.
- **FR-003**: The Edit Skill overlay MUST use heading "Edit Skill", the same five skill fields as create/update today, and exactly the actions "Cancel" and "Save".
- **FR-004**: The Edit Skill overlay MUST load the persisted skill values when it opens.
- **FR-005**: Choosing Save with a valid name MUST persist the overlay fields and close the overlay. The user MUST remain on Skill Detail and see the updated reading view without a required manual reload.
- **FR-006**: Choosing Save with a missing or whitespace-only name MUST NOT persist and MUST prompt for a name.
- **FR-007**: Choosing Cancel MUST close the overlay, leave the user on the Skill Detail reading view, and MUST NOT persist overlay edits.
- **FR-008**: Dismissing the Edit Skill overlay without Save MUST have the same outcome as Cancel.
- **FR-009**: Skill Detail MUST keep Delete on the reading view, using the existing delete confirmation overlay.
- **FR-010**: The Edit Skill overlay MUST NOT appear until the user chooses Edit.

### Key Entities

None. This feature does not add, remove, or change Skill fields. Update still writes the existing name, description, priority, knowledge, and notes.

## Out of Scope

- Inline editing on the reading view (fields becoming inputs without an overlay)
- A second Edit entry point on My Skills, Home, or the header
- Changing Create Skill, My Skills table, Home, or delete confirmation beyond keeping them working
- Export/backup, undo after save, or auto-save while typing
- Jobs, accounts, or new pages

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A reviewer who opens Skill Detail can confirm in one look that they are reading the skill, not filling a save form, and that Edit and Delete are both available.
- **SC-002**: 100% of Edit → Save attempts with a valid name leave the user on Skill Detail showing the new values, without a required manual reload.
- **SC-003**: 100% of Cancel or dismiss attempts leave the last saved skill unchanged.
- **SC-004**: A user who intended to change one field can finish Edit → Save in under 30 seconds after Skill Detail has loaded.

## Assumptions

- UI language stays English. Overlay heading is "Edit Skill". Overlay actions are "Cancel" and "Save" (not a second button labeled "Edit"). Save is the commit action because Edit already opened the overlay.
- This specification replaces the Skill Detail always-on edit form from `001-skill-job-catalog` (update still happens from Skill Detail, via overlay). Folder `001` stays historical for that presentation; `005` is the current view/edit contract. Delete confirmation stays `004`.
- Dismiss without Save includes Cancel and any usual way of closing an overlay. The product does not need a third labeled button.
- Empty description and notes remain allowed. The reading view still makes those fields identifiable rather than hiding that they exist.
- Priority and knowledge remain user-set 1–5 with English labels; the overlay still offers those five levels; the product does not infer them.
- Create Skill remains a separate overlay on My Skills. Edit Skill is a separate overlay on Skill Detail. They may look related; they are not the same action.
- The existing "Saved" message on the always-on form is not required on the reading view; closing the overlay after Save is enough feedback, plus seeing the updated ficha.
