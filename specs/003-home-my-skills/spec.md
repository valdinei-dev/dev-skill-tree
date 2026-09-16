# Feature Specification: Home My Skills Action

**Feature Branch**: `003-home-my-skills`

**Created**: 2026-09-16

**Status**: Draft

**Input**: User description: "Home should always use one primary action labeled My Skills that goes to the skill catalog. The label does not change if the catalog is empty or full. First-time users still reach the empty My Skills state. Do not branch the button by reading whether skills exist."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Return to the catalog from Home (Priority: P1)

A developer who already has skills opens Home. The primary action is labeled My Skills, matching the header. Choosing it takes them to My Skills so they can scan the catalog and study. The product does not tell them to "create" when they already have a catalog.

**Why this priority**: The product is used as a study list. Home currently pushes create, which is the wrong job for a returning user.

**Independent Test**: With at least one skill saved, open Home, confirm the primary action says My Skills, choose it, and confirm the catalog list (or table) is shown.

**Acceptance Scenarios**:

1. **Given** the user is on Home, **When** they view the hero, **Then** they see a short product description and a single primary action labeled "My Skills".
2. **Given** the user is on Home, **When** they choose "My Skills", **Then** they arrive at My Skills.
3. **Given** the user already has skills, **When** they choose Home's "My Skills", **Then** they see their catalog, not a create-first message as the only content.
4. **Given** the user is on Home, **When** they view the primary action, **Then** they do not see "Create Skills" as that action's label.

---

### User Story 2 - First visit still reaches create (Priority: P2)

A developer with no skills opens Home and chooses the same My Skills action. They land on the empty My Skills page and can still create the first skill from that page.

**Why this priority**: Changing the Home label must not break the first-skill path. Create stays on My Skills, where the empty state already lives.

**Independent Test**: With an empty catalog, open Home, choose My Skills, confirm empty copy and Create your first skill, then create a skill with a name only.

**Acceptance Scenarios**:

1. **Given** the user has no skills, **When** they choose Home's "My Skills", **Then** they see "You don't have any skills yet." and "Create your first skill".
2. **Given** that empty My Skills page, **When** they create a skill with only a name, **Then** the skill appears in the catalog.
3. **Given** an empty catalog and a catalog with skills, **When** they view Home, **Then** the primary action label is My Skills in both cases.

---

### Edge Cases

- Home still has exactly one primary action. No second Home button (for example Create Skill beside My Skills).
- The Home action MUST NOT change label or destination based on whether skills already exist.
- Header "My Skills" and Home "My Skills" both go to the same My Skills page.
- Hero copy may stay about tracking and improving skills; this feature only changes the primary action label and the rule that it is stable.
- Empty-state and Create Skill overlay on My Skills are unchanged.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Home MUST show a single primary action labeled "My Skills".
- **FR-002**: Choosing that action MUST take the user to My Skills.
- **FR-003**: The Home primary action label and destination MUST be the same whether the catalog is empty or not.
- **FR-004**: Home MUST NOT use "Create Skills" as the primary action label.
- **FR-005**: Home MUST NOT add extra sections or extra primary actions beyond the existing hero plus this one action.
- **FR-006**: An empty catalog MUST still be completable from My Skills after arriving from Home (empty copy and create-first-skill action remain).

### Key Entities

None. This feature does not add or change Skill fields.

## Out of Scope

- Changing the Home button based on catalog contents
- Changing header labels or routes
- Changing My Skills table, empty state, or create overlay beyond what US2 already requires to keep working
- Jobs, accounts, or new pages

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A reviewer on Home can confirm in one look that the primary action is My Skills and that Create Skills is not that label.
- **SC-002**: 100% of attempts to choose Home's primary action arrive at My Skills, for both empty and non-empty catalogs.
- **SC-003**: A first-time user can still go from Home to a visible first skill in under 2 minutes using only a name (empty My Skills → create).
- **SC-004**: A returning user with at least one skill reaches the catalog from Home's primary action in one choice, without being told to create as the Home CTA.

## Assumptions

- The existing My Skills page (empty state, create overlay, catalog table) remains the destination.
- UI language stays English. The header already uses "My Skills"; Home matches that word-for-word.
- A single stable CTA is enough: empty users get create on the next page; returning users get the catalog.
- This specification replaces the Home CTA contract from `001-skill-job-catalog` (that feature required the label "Create Skills"). Folder `001` is historical for this point; `003` is the current Home action.
- Home does not need to know how many skills exist.
