# Feature Specification: Skill Catalog Table

**Feature Branch**: `002-skill-catalog-table`

**Created**: 2026-09-16

**Status**: Draft

**Input**: User description: "My Skills should show a table of skills with columns Skill, Priority, and Knowledge so the user can tell which axis is which and scan both values without opening each skill. Rows are ordered by priority (highest first), then alphabetically by name within the same priority. No priority-only section headings. No automatic ranking or gap calculation."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Scan priority and knowledge in one view (Priority: P1)

A developer opens My Skills to decide what to study. They see every skill in a table whose column headings are Skill, Priority, and Knowledge. They can tell that a label such as Very High belongs to Priority or to Knowledge because the heading names the axis. They do not need to open a skill to learn those two values.

**Why this priority**: The catalog is used as a study list. Unlabeled groups and name-only rows hide the two judgments the user already recorded.

**Independent Test**: Seed at least six skills across three or more priority levels, with mixed knowledge. Open My Skills. Confirm the three headings, that each row shows name plus both level labels, and that higher priority appears before lower priority.

**Acceptance Scenarios**:

1. **Given** the user has one or more skills, **When** they view My Skills, **Then** they see a table with column headings Skill, Priority, and Knowledge, a Create Skill action, and one row per skill.
2. **Given** that table, **When** they read a heading, **Then** they can tell which column is Priority and which is Knowledge without relying on unlabeled section titles such as a lone "Very High".
3. **Given** a skill with Priority Very High and Knowledge High, **When** they view its row, **Then** Priority shows Very High and Knowledge shows High (English labels, not raw numbers).
4. **Given** skills with different priority levels, **When** they scan the table from top to bottom, **Then** higher priority appears before lower priority (Very High before High before Medium before Low before Very Low).
5. **Given** two or more skills that share the same priority, **When** they scan those rows, **Then** the names appear in alphabetical order (case-insensitive).
6. **Given** the user has no skills, **When** they view My Skills, **Then** they still see the empty catalog copy and Create your first skill; they do not see an empty table as the primary empty state.

---

### User Story 2 - Open a skill from the table (Priority: P2)

While scanning the table, the developer chooses a skill name and lands on the same Skill Detail they already use to read notes and edit the skill.

**Why this priority**: The table is for choosing; detail remains the place for notes, edit, and delete.

**Independent Test**: From My Skills, choose a listed skill name and confirm Skill Detail shows that skill's name, description, priority, knowledge, and notes.

**Acceptance Scenarios**:

1. **Given** a populated table, **When** the user chooses a skill name, **Then** they arrive at Skill Detail for that skill.
2. **Given** they opened a skill from the table, **When** they view the detail, **Then** they see the same fields as before this feature (name, description, priority, knowledge, notes).

---

### Edge Cases

- Priority and knowledge remain independent: a row MAY show Very High priority and Very Low knowledge, or the reverse.
- The product MUST NOT change, infer, or sort by a computed gap between priority and knowledge.
- Skills that share both the same priority and the same name may appear in any stable order among themselves.
- Empty description and empty notes do not appear as columns on My Skills.
- Create Skill overlay, Skill Detail, and persistence behave as in the existing catalog; this feature only changes how a non-empty My Skills list is presented and ordered.
- A leftover unlabeled priority heading (for example a section titled only "Very High") MUST NOT remain on My Skills.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: When My Skills has one or more skills, the product MUST present them as a table with exactly three data columns headed Skill, Priority, and Knowledge.
- **FR-002**: Each row MUST show that skill's name, priority label, and knowledge label.
- **FR-003**: Priority and knowledge on the table MUST use the same English labels as elsewhere: Very Low, Low, Medium, High, Very High. Stored values remain the discrete levels 1–5.
- **FR-004**: The table MUST be ordered by priority, highest first, then by skill name alphabetically (case-insensitive) when priority is equal. The product MUST NOT order rows by knowledge or by any derived score.
- **FR-005**: My Skills MUST NOT use unlabeled priority section headings as the primary way to group skills.
- **FR-006**: The product MUST NOT calculate, infer, recommend, or otherwise automate priority or knowledge when presenting the table.
- **FR-007**: Users MUST be able to open Skill Detail from the skill name in the table.
- **FR-008**: The empty My Skills state MUST remain "You don't have any skills yet." plus Create your first skill. Create Skill MUST remain available when the table is shown.
- **FR-009**: Description and notes MUST NOT appear as columns on My Skills.

### Key Entities

- **Skill**: Unchanged. Identity, name, description, priority (1–5), knowledge (1–5), notes. This feature only changes how name, priority, and knowledge are shown on My Skills.
- **Priority**: User-assigned importance; displayed as a labeled column, not as an unlabeled heading.
- **Knowledge**: User-assigned competence; displayed as a labeled column, independent of priority.

## Out of Scope

- Changing how priority or knowledge are stored or defaulted
- Sorting or filtering by knowledge, search, or a "study next" recommendation
- Visual stars or other non-label treatments of levels
- Showing description or notes on the list
- Changing Home, About, Skill Detail fields, or create/edit/delete flows beyond list presentation and the name link
- Jobs, import, accounts, or any entity beyond Skill

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: In a catalog of at least 6 skills across 3 or more priority levels, a reviewer who has not seen the old grouped list can state in one pass which column is Priority and which is Knowledge.
- **SC-002**: In that same catalog, a reviewer can confirm in one pass that higher-priority rows appear before lower-priority rows, and that names with the same priority are alphabetical.
- **SC-003**: 100% of sampled rows show both a priority label and a knowledge label that match the values shown on that skill's detail page.
- **SC-004**: Opening a skill from the table shows the same Skill Detail as opening that skill did before this feature, in under 5 seconds of navigation.
- **SC-005**: An empty catalog still completes the first-skill path without a table of empty columns as the only content.

## Assumptions

- The existing personal skill catalog (create, detail, edit, delete, persistence without an account) remains the foundation. This feature replaces only the non-empty My Skills presentation.
- UI language stays English, matching the catalog feature.
- Case-insensitive alphabetical order matches common name sorting (for example "next.js" and "Next.js" compare equal except for the letters themselves).
- The skill name is the control that opens Skill Detail; Priority and Knowledge cells are not separate destinations.
- Desktop/laptop remains the primary viewport; the three columns MUST stay readable enough to complete the scan without a dedicated mobile layout.
- Grouping by priority with headings was the previous presentation; replacing it with an ordered table is intentional.
- Folder `001-skill-job-catalog` is the prior catalog feature; this specification does not reintroduce Jobs.
