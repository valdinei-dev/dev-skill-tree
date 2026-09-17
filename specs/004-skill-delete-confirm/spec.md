# Feature Specification: Skill Delete Confirmation

**Feature Branch**: `004-skill-delete-confirm`

**Created**: 2026-09-16

**Status**: Draft

**Input**: User description: "Before a skill is removed, Skill Detail must show a confirmation overlay. Title: Delete Skill. Body: You are about to delete the skill “{name}”. This cannot be undone. Actions: Cancel and Delete. The first Delete only opens the overlay. Cancel or dismissing the overlay leaves the skill in place. Confirming Delete still removes the skill and returns the user to My Skills. No undo after confirm."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Confirm before a skill is gone (Priority: P1)

A developer on Skill Detail wants to remove a skill they no longer need. Choosing Delete does not remove it yet. They see a confirmation overlay that names that skill and states the action cannot be undone. Choosing Delete in the overlay removes the skill. They land on My Skills and that skill is no longer in the catalog.

**Why this priority**: Delete today is a single choice with no way back. Notes and levels on that skill are personal study data. The product must stop accidental removal without making intentional cleanup harder than a second, explicit choice.

**Independent Test**: Open an existing skill, choose Delete, read the overlay (title, named skill, cannot be undone, Cancel and Delete), confirm Delete, and verify the skill is gone from My Skills.

**Acceptance Scenarios**:

1. **Given** the user is on Skill Detail for an existing skill, **When** they choose Delete on that page, **Then** a confirmation overlay opens and the skill is still in the catalog.
2. **Given** the confirmation overlay is open, **When** they view it, **Then** they see the heading "Delete Skill", the sentence "You are about to delete the skill “{name}”. This cannot be undone." with that skill's name in quotation marks, and exactly two actions labeled "Cancel" and "Delete".
3. **Given** the confirmation overlay is open, **When** they choose Delete, **Then** the skill is removed, they arrive at My Skills, and that skill no longer appears in the catalog or at its previous detail location.
4. **Given** the user just confirmed delete, **When** they view My Skills, **Then** the skill is gone without a required manual reload as a user step.

---

### User Story 2 - Back out without deleting (Priority: P2)

A developer opened Delete by mistake, or changed their mind after reading the warning. They dismiss the overlay with Cancel (or by closing it). They remain on Skill Detail. The skill, including notes and levels, is unchanged.

**Why this priority**: Confirmation only helps if backing out is obvious and safe. A warning that still deletes on dismiss would not reduce the fear of deleting.

**Independent Test**: Open Delete on a skill, choose Cancel (and separately close the overlay without choosing Delete), and confirm the skill is still on Skill Detail and in My Skills.

**Acceptance Scenarios**:

1. **Given** the confirmation overlay is open, **When** the user chooses Cancel, **Then** the overlay closes, they remain on Skill Detail for that skill, and the skill is not removed.
2. **Given** the confirmation overlay is open, **When** the user dismisses it without choosing Delete, **Then** the same outcome as Cancel: overlay closed, skill intact, still on Skill Detail.
3. **Given** the user cancelled or dismissed delete, **When** they open My Skills, **Then** that skill is still listed with the same name.

---

### Edge Cases

- The first Delete on Skill Detail MUST only open the overlay. It MUST NOT remove the skill.
- The overlay MUST use the persisted skill name (the name stored for that skill), not an unsaved edit still in the detail form.
- The overlay MUST NOT be a second Delete control on My Skills, Home, or the header.
- Create Skill overlay copy and behavior are unchanged.
- After a confirmed delete, visiting the old Skill Detail location MUST show the existing not-found state, not the confirmation overlay.
- There is no undo, restore, or recycle path after a confirmed Delete in the overlay.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Skill Detail MUST keep a Delete action. Choosing it MUST open a confirmation overlay and MUST NOT remove the skill by itself.
- **FR-002**: The confirmation overlay MUST use this copy: heading "Delete Skill"; body "You are about to delete the skill “{name}”. This cannot be undone." where `{name}` is the persisted name of that skill inside quotation marks; actions "Cancel" and "Delete" only.
- **FR-003**: Choosing Delete in the confirmation overlay MUST remove that skill and take the user to My Skills with the skill gone.
- **FR-004**: Choosing Cancel in the confirmation overlay MUST close the overlay, leave the user on Skill Detail, and MUST NOT remove the skill.
- **FR-005**: Dismissing the confirmation overlay without choosing Delete MUST have the same outcome as Cancel.
- **FR-006**: Delete MUST remain unblocked by other records. This feature adds confirmation only; it does not reintroduce in-use or dependency checks.
- **FR-007**: The confirmation overlay MUST NOT appear until the user chooses Delete on Skill Detail.

### Key Entities

None. This feature does not add, remove, or change Skill fields. The overlay only displays the existing skill name.

## Out of Scope

- Undo after a confirmed delete, soft-delete, recycle bin, or "type the name to confirm"
- Delete from My Skills, Home, or bulk delete
- Changing create, edit, or list behavior except as needed so delete still ends on My Skills
- Export/backup of the catalog
- Jobs, accounts, or new pages

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A reviewer who chooses Delete on Skill Detail can confirm in one look that the skill is not gone yet and that the overlay names that skill and states the action cannot be undone.
- **SC-002**: 100% of Cancel or dismiss attempts leave the skill in the catalog and keep the user on Skill Detail.
- **SC-003**: 100% of confirmed overlay Delete attempts remove that existing skill from the catalog and show My Skills without a required manual reload.
- **SC-004**: A user who intended to delete can finish confirm-and-remove in under 30 seconds after opening Skill Detail.

## Assumptions

- UI language stays English. The locked overlay copy is used word-for-word (skill name substituted).
- Delete remains only on Skill Detail, as in the catalog feature.
- This specification replaces the immediate-delete contract from `001-skill-job-catalog` User Story 4 / FR-011: the first Delete no longer removes the skill. Folder `001` stays historical for that point; `004` is the current delete confirmation. Successful confirm still satisfies the catalog outcome that the skill is gone.
- Dismiss without Delete includes Cancel and any usual way of closing an overlay (for example the overlay's close control or the platform's dismiss gesture). The product does not need a third labeled button.
- The persisted name is the name last saved for the skill. Unsaved form edits on Skill Detail are not a second source of truth for this overlay.
- No undo after confirm is an explicit product choice for this feature, not a later surprise.
- Create Skill already uses an overlay; delete confirmation should feel like the same kind of interruption, not a browser system prompt.
