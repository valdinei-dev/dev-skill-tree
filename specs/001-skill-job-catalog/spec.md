# Feature Specification: Skill Catalog

**Feature Branch**: `001-skill-job-catalog`

**Created**: 2026-09-10

**Updated**: 2026-09-16

**Status**: Draft

**Input**: User description: "MVP for Developer Knowledge Manager: a personal skill catalog with user-set priority and knowledge, notes, navigation to skill detail, and persistence across browser sessions without accounts or a backend. Jobs are out of this MVP."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Create the first skill (Priority: P1)

A developer opens the product for the first time, understands that it helps them track technical skills, and creates their first skill from an empty catalog. They must provide a name. They may add a short description, priority, knowledge level, and notes. If they skip optional fields, the skill is still created with the lowest priority and knowledge levels and empty text.

**Why this priority**: Without a skill catalog there is no product. This is the first valuable action a new user can complete.

**Independent Test**: Start with no skills. From Home, go to My Skills, create a skill with only a name, and confirm it appears in the catalog.

**Acceptance Scenarios**:

1. **Given** the user has never created a skill, **When** they open Home, **Then** they see a short explanation that the product helps developers track and improve technical skills and a primary action labeled "Create Skills".
2. **Given** the user is on Home, **When** they choose "Create Skills", **Then** they arrive at My Skills.
3. **Given** the user has no skills, **When** they view My Skills, **Then** they see "You don't have any skills yet." and an action "Create your first skill".
4. **Given** the empty My Skills page, **When** they choose "Create your first skill", **Then** a create-skill overlay (modal or drawer) opens; the form is not permanently visible on the page.
5. **Given** the create-skill overlay is open, **When** they submit with an empty name, **Then** the skill is not created and they are prompted to provide a name.
6. **Given** the create-skill overlay is open, **When** they submit a name and leave other fields blank, **Then** a skill is created with empty description, empty notes, priority Very Low, and knowledge Very Low, and the overlay closes.
7. **Given** the user just created a skill, **When** they view My Skills, **Then** that skill is listed and can be opened.

---

### User Story 2 - Browse skills by importance and open a skill (Priority: P2)

A developer with an existing catalog scans skills grouped or ordered by priority (most important first), creates another skill when needed, and opens a skill to read its full details.

**Why this priority**: The catalog only helps if the user can find important skills quickly and review what they recorded.

**Independent Test**: Seed several skills with different priorities. Open My Skills, confirm higher-priority skills appear first, and open one skill to see name, description, priority, knowledge, and notes.

**Acceptance Scenarios**:

1. **Given** the user has one or more skills, **When** they view My Skills, **Then** they see the heading "My Skills", a "Create Skill" action, and the skill names.
2. **Given** skills with different priority levels, **When** they view My Skills, **Then** skills are grouped or ordered so higher priority appears before lower priority.
3. **Given** a listed skill, **When** they choose that skill, **Then** they see Skill Detail for that skill.
4. **Given** Skill Detail is loading the skill, **When** the record is not yet available, **Then** they see "Loading...".
5. **Given** Skill Detail for a known skill, **When** loading finishes, **Then** they see name, description, priority, knowledge, and notes.
6. **Given** the user opens Skill Detail for an identifier that does not exist, **When** loading finishes, **Then** they see "Skill not found".
7. **Given** the user is on My Skills with existing skills, **When** they choose "Create Skill", **Then** the same create-skill overlay opens as in the empty state.
8. **Given** the user is on Skill Detail for an existing skill, **When** they change name, description, priority, knowledge, or notes and save, **Then** Skill Detail and My Skills show the updated values, including any new priority grouping.

---

### User Story 3 - Keep the catalog after leaving (Priority: P2)

A developer closes the product and returns later on the same device and browser. Skills they already created are still there. They do not sign in.

**Why this priority**: A catalog that disappears after a refresh cannot be used as a personal knowledge manager.

**Independent Test**: Create at least one skill, fully leave the product, reopen it, and confirm the record is still listed with the same details.

**Acceptance Scenarios**:

1. **Given** the user created skills, **When** they leave and return in the same browser on the same device, **Then** those skills are still present with the same fields.
2. **Given** a returning user, **When** they open the product, **Then** they are not asked to create an account or sign in.

---

### User Story 4 - Remove a skill (Priority: P4)

A developer deletes a skill they no longer want. The skill is removed from the catalog and can no longer be opened.

**Why this priority**: Cleanup is useful but secondary to creating and reviewing the catalog.

**Independent Test**: Create a skill and delete it from Skill Detail; it disappears from My Skills and its detail URL shows not found.

**Acceptance Scenarios**:

1. **Given** a skill exists, **When** the user chooses delete on Skill Detail, **Then** the skill is removed and no longer appears in My Skills or Skill Detail.
2. **Given** the user just deleted a skill, **When** they view My Skills, **Then** that skill is gone without requiring a manual reload as a user step.

---

### User Story 5 - Move around the product (Priority: P4)

A developer always has a global header with Logo, Home, My Skills, and About. About is a short, minimal page. Logo sits on the start edge; Home, My Skills, and About sit on the end edge.

**Why this priority**: Navigation makes the other stories usable; it is not valuable on its own.

**Independent Test**: From any main page, use the header to reach Home, My Skills, and About. Confirm Logo and Home both reach Home, with Logo visually separated from the nav items.

**Acceptance Scenarios**:

1. **Given** the user is on any main page, **When** they view the top of the page, **Then** they see Logo on the start edge and Home, My Skills, and About on the end edge.
2. **Given** the user chooses a header destination, **When** navigation completes, **Then** they are on the matching page.
3. **Given** the user chooses the Logo, **When** navigation completes, **Then** they are on Home.
4. **Given** the user opens About, **When** the page loads, **Then** they see a brief description of the product (no extra sections required).

---

### Edge Cases

- Creating a skill with only whitespace in the name is treated as a missing name; the skill is not created.
- Duplicate skill names are allowed; each skill remains a distinct record.
- Priority and knowledge are independent: a skill may be Very High priority and Very Low knowledge, or the reverse.
- The product MUST NOT change priority or knowledge unless the user sets them.
- Closing the create overlay with Cancel discards the draft and creates nothing.
- After a successful create, the new skill is visible without requiring the user to invent a workaround (for example, they should not need to manually refresh as a required step).
- There is no Jobs page, job overlay, or skill–job association. A leftover `/jobs` URL is not a product destination.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Users MUST be able to create a skill with a name and optional description, priority, knowledge, and notes.
- **FR-002**: Skill name MUST be required. Description, priority, knowledge, and notes MUST be optional at create time.
- **FR-003**: When optional skill fields are omitted, the product MUST store empty description, empty notes, priority 1 (Very Low), and knowledge 1 (Very Low).
- **FR-004**: Users MUST be able to list all skills and open a skill to see name, description, priority, knowledge, and notes.
- **FR-005**: The skills list MUST present skills grouped or ordered by priority so higher priority appears first.
- **FR-006**: Users MUST set priority and knowledge themselves using five discrete levels: 1 Very Low, 2 Low, 3 Medium, 4 High, 5 Very High. The product MUST NOT calculate, infer, or recommend these values.
- **FR-007**: Priority and knowledge MUST be stored and treated as independent values.
- **FR-008**: The interface MUST show priority and knowledge as human-readable labels (or equivalent visuals) mapped from the five levels. Stored values MUST remain the numeric levels, independent of how they are shown.
- **FR-009**: Skill creation MUST happen in an overlay (modal or drawer), not as a form that stays on the page at all times.
- **FR-010**: Users MUST be able to update an existing skill's name, description, priority, knowledge, and notes from Skill Detail so "manage catalog" includes change after create.
- **FR-011**: Users MUST be able to delete a skill from Skill Detail. Delete MUST NOT be blocked by other records.
- **FR-012**: Users MUST be able to reach My Skills from Home ("Create Skills").
- **FR-013**: The product MUST provide Home, My Skills, Skill Detail, and About, plus a global header with Logo, Home, My Skills, and About. The product MUST NOT provide a Jobs page or job-creation action.
- **FR-014**: Home MUST contain a hero with a short product description and a primary "Create Skills" action. No additional home sections are required.
- **FR-015**: About MUST be a minimal page that briefly describes the product as a personal skill catalog. It MUST NOT describe job tracking or job–skill association as a current capability.
- **FR-016**: Skill Detail MUST show a loading state ("Loading...") until the skill is available, then either the skill fields or "Skill not found".
- **FR-017**: Skills MUST persist across sessions in the same browser on the same device without an account, sign-in, remote server, or shared database.
- **FR-018**: The product MUST NOT require authentication or user accounts.

### Key Entities

- **Skill**: A reusable technical skill in the user's personal catalog. Attributes: identity, name, description, priority (1–5), knowledge (1–5), notes.
- **Priority**: User-assigned importance of a skill on a five-level scale.
- **Knowledge**: User-assigned current competence for a skill on the same five-level scale, independent of priority.

## Out of Scope

The following MUST NOT be delivered in this MVP:

- Job entity, job routes, associating skills with job postings, importing jobs, extracting skills from postings
- Authentication, user accounts, remote backend, shared database, external services
- Job extras: company, salary, URL, description, application status, application dates
- Automatic prioritization, skill-frequency analytics, charts, dashboards
- AI features, recommendations, notifications, search
- Learning resources (articles, videos, documentation, courses), interview questions, spaced repetition, study sessions
- Skill categories
- A status field separate from knowledge level
- Multi-device sync (data is expected to stay in one browser)

These may be specified later as separate features after this MVP is stable.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A first-time user can go from Home to a visible first skill in under 2 minutes using only a name.
- **SC-002**: After a skill is created, it appears in My Skills without a required manual reload as a user step, in under 5 seconds.
- **SC-003**: In a catalog of at least 6 skills across 3 or more priority levels, a reviewer can confirm in one pass that higher-priority skills appear before lower-priority skills.
- **SC-004**: After creating at least 3 skills, leaving the product and returning in the same browser restores all of those records with matching fields.
- **SC-005**: 100% of attempted deletions of an existing skill remove that skill from the catalog.
- **SC-006**: Users can complete create-skill and open-skill flows without creating an account, in a single sitting.
- **SC-007**: A new user who has never created a skill can complete the empty-state create path on the first attempt without using header navigation as a workaround.
- **SC-008**: From every main page, Logo is visually separated from Home / My Skills / About, and both Logo and Home reach Home.

## Assumptions

- The single actor is a software developer using the product alone in one browser. There are no roles, sharing, or permissions.
- "Manage" a skill catalog includes viewing, creating, updating, and deleting skills. Update and delete happen from Skill Detail because there is no separate edit page.
- Duplicate skill names are allowed; identity is not the display name.
- UI language for this MVP is English. Priority and knowledge use the English labels Very Low, Low, Medium, High, and Very High. Localized labels (for example Portuguese) may be added later without changing the 1–5 scale.
- Persistence is local to one browser on one device, consistent with the project constitution. Users understand that clearing site data removes their catalog.
- Home has only the hero block.
- About contains a short product summary only.
- Visual treatment of levels (labels now; stars or other visuals later) may change; the five stored levels do not.
- The product is used on a typical desktop or laptop browser for the MVP; a dedicated mobile design is not required, but pages MUST remain usable enough to complete the primary flows.
- Jobs were modeled in an earlier revision of this feature and then removed: the primary use is opening a skill to review priority, knowledge, and notes. Manual job-by-job entry would not be used. Automatic job import is a later product, not part of this MVP. Role context, if needed, belongs in skill notes.
- Folder name `001-skill-job-catalog` is historical; this specification is the skill catalog only.
