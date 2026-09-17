# Feature Specification: Storage Contract Tests

**Feature Branch**: `006-storage-contract-tests`

**Created**: 2026-09-16

**Status**: Draft

**Input**: User description: "Add automated checks for the skill persistence contract so a maintainer can change how skills are saved and learn immediately if create, read, update, or delete broke. Checks use only the public persistence operations the catalog already uses (list, get one, create, update, delete). Each check starts from an empty catalog by deleting existing skills through that same delete operation, then creating what it needs. No dedicated reset, no rewriting raw stored data, no UI or hook checks. Out of scope: malformed stored payloads, export/import, Jobs."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Trust create and read after a persistence change (Priority: P1)

A maintainer changes how skills are saved. They run the automated persistence checks. Create with only a name stores a skill that can be listed and opened by its identifier, with empty description and notes and the lowest priority and knowledge. The catalog UI is not required for this confidence.

**Why this priority**: Without create and read holding, there is no catalog. This is the first slice that still delivers value if it is the only one implemented.

**Independent Test**: Start from an empty catalog using only public delete, create a skill with only a name, and confirm list and get-by-id return that skill with the create defaults.

**Acceptance Scenarios**:

1. **Given** the catalog has no skills, **When** the checks list skills, **Then** the list is empty.
2. **Given** the catalog has no skills, **When** a skill is created with only a name, **Then** that skill can be retrieved by its identifier with the given name, empty description, empty notes, priority Very Low, and knowledge Very Low.
3. **Given** a skill was just created, **When** the checks list skills, **Then** that skill is in the list.
4. **Given** a skill exists, **When** the checks request an identifier that is not that skill, **Then** they receive the existing not-found result for get-by-id (no skill).

---

### User Story 2 - Trust update and delete after a persistence change (Priority: P2)

A maintainer changes update or delete. They run the automated checks. Changing an existing skill’s fields persists. Removing an existing skill leaves it gone from list and get-by-id. Removing an identifier that is not in the catalog reports not-found and does not empty the rest of the catalog.

**Why this priority**: Sunday notes and cleanup only stay safe if update and delete keep their current contract. Secondary to create/read because a catalog that can be created is already useful.

**Independent Test**: Create a skill through the public create operation, update its fields, confirm get-by-id shows the new values, delete it, confirm it is gone, then delete a missing identifier and confirm not-found.

**Acceptance Scenarios**:

1. **Given** an existing skill, **When** the checks update name, description, priority, knowledge, and notes with valid values, **Then** get-by-id returns those new values and the identifier is unchanged.
2. **Given** an identifier that is not in the catalog, **When** the checks update that identifier, **Then** they receive the existing not-found result for update (no skill) and other skills are unchanged.
3. **Given** an existing skill, **When** the checks delete it, **Then** the result is success, the skill is absent from the list, and get-by-id for that identifier returns no skill.
4. **Given** an identifier that is not in the catalog, **When** the checks delete it, **Then** the result is not-found and any other skills remain.

---

### User Story 3 - Reject invalid writes without corrupting the catalog (Priority: P3)

A maintainer changes validation. They run the automated checks. A missing or whitespace-only name does not create or update a skill. A priority or knowledge outside the 1–5 scale does not create or update a skill. Skills that were already valid stay as they were.

**Why this priority**: Invalid writes are less common than the happy path, but a migration that “helpfully” accepts empty names or invented levels would silently break the catalog rules.

**Independent Test**: From an empty catalog, attempt create and update with empty/whitespace names and out-of-range levels; confirm those writes do not succeed and any pre-existing valid skill is unchanged.

**Acceptance Scenarios**:

1. **Given** the catalog has no skills, **When** the checks create with an empty name or a name that is only whitespace, **Then** no skill is added.
2. **Given** an existing skill, **When** the checks update it with an empty or whitespace-only name, **Then** the skill keeps its previous name and other fields.
3. **Given** a create or update that supplies priority or knowledge outside 1–5, **When** the checks run that write, **Then** the write does not succeed and the catalog is unchanged for that attempt.
4. **Given** a valid skill already exists, **When** an invalid create or update is attempted, **Then** that valid skill is still listed with the same fields.

---

### Edge Cases

- Isolation: each automated check that needs an empty catalog MUST reach empty only by listing skills and deleting each one through the public delete operation, then creating what that check needs. It MUST NOT use a dedicated “clear catalog” operation that the product does not already expose, and MUST NOT rewrite or erase the raw stored payload.
- Whitespace-only names are treated the same as empty names (no create, no name change on update).
- Update MUST NOT change a skill’s identifier.
- Checks MUST use only the public persistence operations: list, get one, create, update, delete.
- Malformed or incomplete data already sitting in storage is out of scope; these checks do not plant or repair raw stored payloads.
- The catalog UI, Skill Detail overlays, and any live list-subscription used by screens are out of scope.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The project MUST include automated checks that exercise the existing skill persistence operations (list, get one, create, update, delete) without opening the catalog UI.
- **FR-002**: Those checks MUST cover: empty catalog; create with name only and create defaults; get-by-id for an existing skill and for a missing identifier; list containing a created skill.
- **FR-003**: Those checks MUST cover: update of name, description, priority, knowledge, and notes on an existing skill; update of a missing identifier; delete of an existing skill; delete of a missing identifier with not-found and other skills left intact.
- **FR-004**: Those checks MUST cover rejection of empty and whitespace-only names on create and update, and rejection of priority or knowledge outside 1–5 on create and update, without removing or altering unrelated valid skills.
- **FR-005**: Each check MUST isolate from the others by using only public list and delete to empty the catalog when an empty start is required. The feature MUST NOT add a persistence operation whose only purpose is resetting storage for checks.
- **FR-006**: Checks MUST NOT read, write, or clear the raw stored payload, and MUST NOT require a new Skill field, a new catalog screen, or a change to create/update/delete behavior. This feature adds verification of the current contract, not a new persistence product.
- **FR-007**: A maintainer MUST be able to run the full set of these checks as one documented action and see a clear pass or fail for the set.

### Key Entities

- **Skill**: Unchanged. Identifier, name, description, priority (1–5), knowledge (1–5), and notes. Checks assert this existing record; they do not extend it.
- **Persistence operations**: The existing catalog operations list, get one, create, update, and delete. Create requires a non-empty name after trimming; optional fields default as in the constitution. Delete of a missing skill reports not-found. Update of a missing skill reports no skill.

## Out of Scope

- Checks of Home, My Skills, Skill Detail, Create/Edit/Delete overlays, or any screen-level subscription to the catalog
- Planting malformed JSON, incomplete skill records, or desynchronized in-memory copies to simulate corruption
- A dedicated reset/clear API, export, import, or backup UI
- Jobs, accounts, backend, or a second persistence collection
- Changing validation messages shown in the UI
- A coverage-percentage gate or end-to-end browser suite

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% of the persistence behaviors listed in FR-002, FR-003, and FR-004 have an automated check that can fail on its own if that behavior breaks.
- **SC-002**: A maintainer can obtain pass/fail for the full set without opening Home, My Skills, or Skill Detail.
- **SC-003**: 100% of checks that require an empty catalog actually start empty; leftover skills from a previous check never satisfy a later check by accident.
- **SC-004**: The full set of persistence contract checks finishes in under 30 seconds on a typical development machine.

## Assumptions

- Persistence operations already exist and already match the constitution (defaults, name required, levels 1–5, delete not-found). This feature does not redesign those rules.
- The stakeholder is the person who changes how skills are saved, not a Sunday reader of the catalog. No new user-facing copy or screen.
- Isolation through public delete is an explicit choice: checks will not prove what happens when stored data is already corrupt.
- A check runner and file layout are planning concerns; this spec only requires one documented way to run the set (FR-007).
- UI language and catalog screens stay as they are after 003–005.
- Constitution Scope Boundaries still apply: no Jobs, no accounts, no new entity.
