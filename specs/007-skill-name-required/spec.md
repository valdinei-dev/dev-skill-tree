# Feature Specification: Skill Name Required Feedback

**Feature Branch**: `007-skill-name-required`

**Created**: 2026-09-17

**Status**: Draft

**Input**: User description: "Create Skill and Edit Skill must treat an empty name and a whitespace-only name the same. Both must show the visible text Name is required next to Name, keep the overlay open, and not create or update. Do not use the browser’s empty-field tooltip as a second, different path. The message must be identifiable with the Name field for keyboard and assistive-technology users. Focus returns to Name. No component library. Storage rules unchanged."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - See why Create did not save a name (Priority: P1)

A developer opens Create Skill and submits with no name, or with only spaces. They stay in Create Skill. They see the exact words **Name is required** with the Name field. Nothing is added to the catalog. Empty and spaces look the same — not a browser tooltip for one and silence for the other.

**Why this priority**: Create is the first write. Today `""` and `"    "` do not get the same identifiable error. Without this, the catalog rule “name is required” is invisible for whitespace.

**Independent Test**: Open Create Skill. Submit with an empty Name; confirm the overlay stays open, the catalog is unchanged, and **Name is required** is visible with Name. Repeat with a Name of only spaces; confirm the same outcome and the same text.

**Acceptance Scenarios**:

1. **Given** Create Skill is open, **When** the user submits with Name empty, **Then** the overlay stays open, no skill is created, and they see "Name is required" associated with Name.
2. **Given** Create Skill is open, **When** the user submits with Name containing only spaces, **Then** the outcome is the same as empty Name: overlay open, nothing created, "Name is required" with Name.
3. **Given** the user just saw that error, **When** they look at Name, **Then** keyboard focus is on Name and a screen-reader user can tell that Name is invalid and that the message is "Name is required".
4. **Given** Create Skill is open, **When** the user has not yet submitted, **Then** "Name is required" is not shown.

---

### User Story 2 - See why Edit did not save a name (Priority: P2)

A developer on Edit Skill clears the name or replaces it with only spaces and chooses Save. They stay in Edit Skill. They see **Name is required** with Name. The persisted skill is unchanged.

**Why this priority**: The same catalog rule must hold when changing a skill. Secondary because create is the first encounter; Edit must not keep a different prompt.

**Independent Test**: Open Edit Skill on an existing skill. Save with empty Name; confirm overlay stays, skill unchanged, "Name is required" with Name. Repeat with spaces only.

**Acceptance Scenarios**:

1. **Given** Edit Skill is open for an existing skill, **When** the user saves with Name empty, **Then** the overlay stays open, the skill is not updated, and they see "Name is required" associated with Name.
2. **Given** Edit Skill is open, **When** the user saves with Name containing only spaces, **Then** the outcome is the same as empty Name.
3. **Given** the user just saw that error on Edit, **When** they look at Name, **Then** keyboard focus is on Name and a screen-reader user can tell that Name is invalid and that the message is "Name is required".
4. **Given** Edit Skill just opened, **When** the user has not yet saved, **Then** "Name is required" is not shown.

---

### User Story 3 - Recover with a real name (Priority: P3)

After seeing **Name is required**, the developer types a real name and submits. Create adds the skill and closes; Edit saves and closes. The error is gone. Cancel or dismiss still closes without writing.

**Why this priority**: An error that cannot be recovered from would block the catalog. Recovery is required but depends on US1/US2 existing.

**Independent Test**: Trigger "Name is required" on Create, type a name, submit; skill appears and overlay closes. Same on Edit: skill updates. Cancel after the error still does not write.

**Acceptance Scenarios**:

1. **Given** Create Skill is showing "Name is required", **When** the user enters a non-whitespace name and submits, **Then** a skill is created, the overlay closes, and the error is gone.
2. **Given** Edit Skill is showing "Name is required", **When** the user enters a non-whitespace name and saves, **Then** the skill is updated, the overlay closes, and the error is gone.
3. **Given** either overlay is showing "Name is required", **When** the user chooses Cancel or dismisses, **Then** the overlay closes, nothing is created or updated, and they are not stuck with that message on the page underneath.

---

### Edge Cases

- Empty Name and whitespace-only Name (after trimming) MUST use the same copy and the same presentation. MUST NOT use a browser empty-field tooltip for one case and silence or a different message for the other.
- The error MUST NOT appear until the user tries to Create or Save with an invalid name.
- Closing the overlay (Cancel or dismiss) MUST clear that error for the next open.
- Description, priority, knowledge, and notes are unchanged by this feature. Invalid name MUST NOT write any of those fields.
- Delete Skill confirmation is unchanged.
- A valid name with leading or trailing spaces MAY still be accepted if the stored name is the trimmed form (existing persistence rule); this feature only rejects names that are empty after trim.
- No new overlay library. Create Skill and Edit Skill remain the existing native overlays.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Create Skill MUST reject a name that is empty or only whitespace. It MUST NOT create a skill in that case.
- **FR-002**: Edit Skill MUST reject a name that is empty or only whitespace. It MUST NOT update the skill in that case.
- **FR-003**: In both overlays, that rejection MUST show the visible text "Name is required" associated with the Name field. The overlay MUST stay open.
- **FR-004**: Empty Name and whitespace-only Name MUST produce the same message and the same presentation. The product MUST NOT rely on the browser’s empty-field tooltip as a different path for `""`.
- **FR-005**: When that error is shown, keyboard focus MUST be on Name, and assistive technology MUST be able to identify Name as invalid and present "Name is required" as belonging to that field.
- **FR-006**: "Name is required" MUST NOT be visible until a Create or Save attempt with an invalid name.
- **FR-007**: After a successful Create or Save with a valid name, the overlay MUST close and the error MUST not remain. Cancel or dismiss MUST close without writing and MUST NOT leave the error on the underlying page.
- **FR-008**: Persistence rules for a valid name are unchanged. This feature MUST NOT add a Skill field, a component library, or a new overlay.

### Key Entities

None. Skill and name-required-after-trim stay as in the catalog. This feature only changes how Create and Edit tell the user that a name is missing.

## Out of Scope

- Component libraries (Radix, shadcn, Headless, and similar)
- Accessibility of My Skills table, Skill Detail reading view, or Delete Skill
- Errors for description, notes, priority, or knowledge
- Changing storage validation messages or throwing behavior
- Export, import, Jobs, accounts

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% of Create or Save attempts with an empty or whitespace-only name leave the overlay open, leave the catalog unchanged, and show "Name is required" with Name.
- **SC-002**: Empty Name and whitespace-only Name are indistinguishable in that error: same text, same place, same focus behavior.
- **SC-003**: A keyboard or assistive-technology user can tell that Name is the problem and get the words "Name is required" without relying on a browser tooltip that only appears for a fully empty field.
- **SC-004**: After seeing the error, a user can finish a valid Create or Save in under 30 seconds, or Cancel, without a stuck overlay.

## Assumptions

- UI language stays English. The locked copy is "Name is required" word-for-word.
- Whitespace-only means the name has no non-space characters after trimming. That matches the existing catalog rule used in persistence checks.
- Create Skill and Edit Skill stay separate overlays (constitution V). Both MUST get this feedback; they MUST NOT diverge on this error.
- This specification replaces the vague “prompt for a name” in `001` (create empty name) and `005` FR-006 (edit empty/whitespace name): the prompt is now this visible, associated message, not a browser-only tooltip. Folders `001` and `005` stay historical for that point.
- The error is a submit-time message, not a live warning while the overlay first opens.
- Native overlays remain; no design-system dialog.
