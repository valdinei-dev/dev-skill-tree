# Feature Specification: Skill and Job Catalog

**Feature Branch**: `001-skill-job-catalog`

**Created**: 2026-09-10

**Status**: Draft

**Input**: User description: "MVP for Developer Knowledge Manager: a personal skill catalog with user-set priority and knowledge, notes, jobs that reference existing skills, navigation from a job requirement to that skill, and persistence across browser sessions without accounts or a backend."

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

1. **Given** the user has one or more skills, **When** they view My Skills, **Then** they see the heading "My Skills", a "Create Skill" action, a "Create Job" action, and the skill names.
2. **Given** skills with different priority levels, **When** they view My Skills, **Then** skills are grouped or ordered so higher priority appears before lower priority.
3. **Given** a listed skill, **When** they choose that skill, **Then** they see Skill Detail for that skill.
4. **Given** Skill Detail is loading the skill, **When** the record is not yet available, **Then** they see "Loading...".
5. **Given** Skill Detail for a known skill, **When** loading finishes, **Then** they see name, description, priority, knowledge, and notes.
6. **Given** the user opens Skill Detail for an identifier that does not exist, **When** loading finishes, **Then** they see "Skill not found".
7. **Given** the user is on My Skills with existing skills, **When** they choose "Create Skill", **Then** the same create-skill overlay opens as in the empty state.
8. **Given** the user is on Skill Detail for an existing skill, **When** they change name, description, priority, knowledge, or notes and save, **Then** Skill Detail and My Skills show the updated values, including any new priority grouping.

---

### User Story 3 - Keep the catalog after leaving (Priority: P2)

A developer closes the product and returns later on the same device and browser. Skills and jobs they already created are still there. They do not sign in.

**Why this priority**: A catalog that disappears after a refresh cannot be used as a personal knowledge manager.

**Independent Test**: Create at least one skill and one job, fully leave the product, reopen it, and confirm both records are still listed with the same details.

**Acceptance Scenarios**:

1. **Given** the user created skills and jobs, **When** they leave and return in the same browser on the same device, **Then** those skills and jobs are still present with the same fields.
2. **Given** a returning user, **When** they open the product, **Then** they are not asked to create an account or sign in.

---

### User Story 4 - Record a job and its required skills (Priority: P3)

A developer records a job opportunity by name and attaches skills that already exist in their catalog. The product does not invent a new skill while they create the job. They can start this from My Skills or from Jobs.

**Why this priority**: Connecting jobs to the catalog is the second half of the product, but it depends on skills existing first.

**Independent Test**: Create two skills, open Jobs, create a job named "Frontend Engineer" selecting those skills, and confirm the job lists those skill names.

**Acceptance Scenarios**:

1. **Given** the user has no jobs, **When** they view Jobs, **Then** they see the Jobs heading, a way to create a job, a way to go to My Skills, and no job cards.
2. **Given** the user is on My Skills, **When** they choose "Create Job", **Then** they can reach the Jobs page and open the create-job overlay.
3. **Given** the user is on Jobs, **When** they choose "Create Job", **Then** a create-job overlay opens with Job Name, a control to select existing skills, Cancel, and Create. The form is not permanently visible on the page.
4. **Given** the create-job overlay is open, **When** they submit with an empty name, **Then** the job is not created.
5. **Given** the user has existing skills, **When** they create a job, **Then** they can select only those existing skills; the product does not create a skill as a side effect.
6. **Given** the user has no skills, **When** they open the create-job overlay, **Then** they cannot invent a skill there and are able to cancel and go to My Skills instead.
7. **Given** a job was created with selected skills, **When** they view Jobs, **Then** they see the job name and the names of the associated skills (resolved from the skill catalog, not a separate copy of skill details).
8. **Given** the user is on Jobs, **When** they choose "My Skills", **Then** they arrive at My Skills.
9. **Given** jobs exist, **When** they view Jobs, **Then** they see the list on this page; there is no separate job detail page.

---

### User Story 5 - Open a required skill from a job (Priority: P3)

While reviewing a job, a developer chooses a listed skill and lands on that skill's existing detail page so they can see priority, knowledge, and notes in one place.

**Why this priority**: This is the payoff of associating jobs with the catalog, and it reuses Skill Detail instead of a new job-centric skill view.

**Independent Test**: Open a job that lists "Web Vitals" and choose that name; confirm Skill Detail shows the same skill as opening it from My Skills.

**Acceptance Scenarios**:

1. **Given** a job lists associated skills, **When** the user chooses one of those skill names, **Then** they arrive at Skill Detail for that skill.
2. **Given** the user opened a skill from a job, **When** they view the detail, **Then** they see the same skill information they would see if they had opened it from My Skills.

---

### User Story 6 - Remove a skill that no job uses (Priority: P4)

A developer deletes a skill they no longer want, but only if no job lists it. If jobs still reference it, deletion stays unavailable and they see why.

**Why this priority**: Cleanup is useful but secondary to creating and navigating the catalog.

**Independent Test**: Create an unused skill and delete it (it disappears). Create a skill, attach it to a job, and confirm delete is blocked with an explanation.

**Acceptance Scenarios**:

1. **Given** a skill is not associated with any job, **When** the user chooses delete, **Then** the skill is removed and no longer appears in My Skills or Skill Detail.
2. **Given** a skill is associated with one or more jobs, **When** the user views delete, **Then** delete is disabled and they can see that the skill is used by jobs (for example, "Used by 3 jobs").
3. **Given** a skill is associated with one or more jobs, **When** they still attempt to delete it, **Then** the skill remains and they see a clear explanation such as "This skill is used by one or more jobs and cannot be deleted."

---

### User Story 7 - Move around the product (Priority: P4)

A developer always has a global header with Logo, Home, My Skills, Jobs, and About. About is a short, minimal page.

**Why this priority**: Navigation makes the other stories usable; it is not valuable on its own.

**Independent Test**: From any main page, use the header to reach Home, My Skills, Jobs, and About.

**Acceptance Scenarios**:

1. **Given** the user is on any main page, **When** they view the top of the page, **Then** they see Logo, Home, My Skills, Jobs, and About.
2. **Given** the user chooses a header destination, **When** navigation completes, **Then** they are on the matching page.
3. **Given** the user opens About, **When** the page loads, **Then** they see a brief description of the product (no extra sections required).

---

### Edge Cases

- Creating a skill with only whitespace in the name is treated as a missing name; the skill is not created.
- A skill may exist with no job associations; the catalog MUST allow that.
- A job may be created with a name and no selected skills; it appears in the job list with an empty skill list.
- Duplicate skill names are allowed; each skill remains a distinct record.
- If a job still references a skill that cannot be found (for example after unexpected data loss), the job list still shows the job and does not invent skill details; the missing skill is not presented as a normal openable catalog item.
- Priority and knowledge are independent: a skill may be Very High priority and Very Low knowledge, or the reverse.
- The product MUST NOT change priority or knowledge unless the user sets them.
- Closing the create overlay with Cancel discards the draft and creates nothing.
- After a successful create, the new skill or job is visible without requiring the user to invent a workaround (for example, they should not need to manually refresh as a required step).

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
- **FR-011**: Users MUST be able to delete a skill that is not associated with any job.
- **FR-012**: Users MUST NOT be able to delete a skill that is associated with one or more jobs. The product MUST disable that action and explain that the skill is in use.
- **FR-013**: Users MUST be able to create a job with a required name and an optional selection of existing skills.
- **FR-014**: Job creation MUST happen in an overlay (modal or drawer) and MUST NOT create a new skill as a side effect.
- **FR-015**: A job MUST reference existing skills only. Skill information shown on a job MUST come from the skill catalog, not from a copy stored on the job.
- **FR-016**: Users MUST be able to list all jobs on a single Jobs page, each showing its name and associated skill names. The MVP MUST NOT include a separate job detail page.
- **FR-017**: Each skill name shown on a job MUST be actionable and MUST open the same Skill Detail used from My Skills.
- **FR-018**: Users MUST be able to reach My Skills from Home ("Create Skills") and from Jobs ("My Skills"), and MUST be able to start job creation from both My Skills and Jobs.
- **FR-019**: The product MUST provide Home, My Skills, Skill Detail, Jobs, and About, plus a global header with Logo, Home, My Skills, Jobs, and About.
- **FR-020**: Home MUST contain a hero with a short product description and a primary "Create Skills" action. No additional home sections are required.
- **FR-021**: About MUST be a minimal page that briefly describes the product.
- **FR-022**: Skill Detail MUST show a loading state ("Loading...") until the skill is available, then either the skill fields or "Skill not found".
- **FR-023**: Skills and jobs MUST persist across sessions in the same browser on the same device without an account, sign-in, remote server, or shared database.
- **FR-024**: A skill MUST be creatable and usable with zero job associations.
- **FR-025**: The product MUST NOT require authentication or user accounts.

### Key Entities

- **Skill**: A reusable technical skill in the user's personal catalog. Attributes: identity, name, description, priority (1–5), knowledge (1–5), notes. Independent of jobs; may exist with no associations.
- **Job**: A job opportunity and its skill requirements. Attributes: identity, name, and references to existing skills. Does not own skill details.
- **Priority**: User-assigned importance of a skill on a five-level scale.
- **Knowledge**: User-assigned current competence for a skill on the same five-level scale, independent of priority.

## Out of Scope

The following MUST NOT be delivered in this MVP:

- Authentication, user accounts, remote backend, shared database, external services
- Job extras: company, salary, URL, description, application status, application dates
- Automatic prioritization, skill-frequency analytics, charts, dashboards
- AI features, recommendations, notifications, search
- Learning resources (articles, videos, documentation, courses), interview questions, spaced repetition, study sessions
- Skill categories
- A status field separate from knowledge level
- A dedicated job detail page
- Creating a skill automatically while creating a job
- Multi-device sync (data is expected to stay in one browser)

These may be specified later as separate features after this MVP is stable.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A first-time user can go from Home to a visible first skill in under 2 minutes using only a name.
- **SC-002**: After a skill is created, it appears in My Skills without a required manual reload as a user step, in under 5 seconds.
- **SC-003**: In a catalog of at least 6 skills across 3 or more priority levels, a reviewer can confirm in one pass that higher-priority skills appear before lower-priority skills.
- **SC-004**: In 100% of attempts, opening a skill from My Skills and opening the same skill from a job shows the same name, description, priority, knowledge, and notes.
- **SC-005**: After creating at least 3 skills and 2 jobs, leaving the product and returning in the same browser restores all of those records with matching fields.
- **SC-006**: 100% of attempted deletions of a skill used by one or more jobs leave the skill in place and show an in-use explanation.
- **SC-007**: 100% of attempted deletions of a skill used by zero jobs remove that skill from the catalog.
- **SC-008**: Users can complete create-skill, create-job, and open-skill-from-job flows without creating an account, in a single sitting.
- **SC-009**: A new user who has never created a skill can complete the empty-state create path on the first attempt without using header navigation as a workaround.

## Assumptions

- The single actor is a software developer using the product alone in one browser. There are no roles, sharing, or permissions.
- "Manage" a skill catalog includes viewing, creating, updating, and (when unused) deleting skills. Update happens from Skill Detail because the source MVP did not specify a separate edit page.
- Jobs are create-and-list only. Changing a job's name or skill list after create, and deleting a job, are out of this MVP unless a later spec adds them.
- A job may be saved with zero skills so name-only create stays consistent with skills. The user is expected to select skills at create time if they want associations, because job edit is out of scope.
- Duplicate skill names are allowed; identity is not the display name.
- UI language for this MVP is English. Priority and knowledge use the English labels Very Low, Low, Medium, High, and Very High. Localized labels (for example Portuguese) may be added later without changing the 1–5 scale.
- Persistence is local to one browser on one device, consistent with the project constitution. Users understand that clearing site data removes their catalog.
- Home has only the hero block. Extra marketing sections and a home "Create Job" call-to-action are deferred.
- About contains a short product summary only.
- "Create Job" from My Skills takes the user to Jobs and the create-job overlay; it does not create a job in the background.
- Visual treatment of levels (labels now; stars or other visuals later) may change; the five stored levels do not.
- The product is used on a typical desktop or laptop browser for the MVP; a dedicated mobile design is not required, but pages MUST remain usable enough to complete the primary flows.
