# Research: Skill Detail View and Edit Overlay

## 1. Reading view in SkillDetail, not an always-on form

**Decision**: Replace the page `<form>` and Save control in `components/skills/SkillDetail.tsx` with labeled reading content: name as heading, description, priority and knowledge via `labelForLevel`, notes. Keep field labels visible when description or notes are empty. Page actions: Edit and Delete.

**Rationale**: Spec FR-001 / SC-001. Sunday use is review. Empty optional fields must stay identifiable (spec US1).

**Alternatives considered**:
- Keep inputs disabled until Edit — still looks like a form.
- Hide empty description/notes — rejected; spec requires those fields to remain identifiable.
- Inline edit (click field to type) — out of scope.

## 2. Separate Edit Skill overlay, do not generalize SkillForm

**Decision**: Add `components/skills/SkillEditForm.tsx` using the same `<dialog>` / `showModal` / `close` / `onCancel` pattern as Create Skill. Heading Edit Skill. Fields match create. Actions Cancel then Save. Save calls `updateSkill` then `onClose`. Leave `SkillForm.tsx` as create-only.

**Rationale**: Spec: Create and Edit are not the same action. Constitution V: a `mode` prop on SkillForm is an extra abstraction for two call sites. Duplicating the five fields once is cheaper than a shared form framework. Create stays untouched.

**Alternatives considered**:
- `SkillForm` with `mode: "create" | "edit"` — couples two overlays; higher risk of regressing create.
- Edit fields inline in SkillDetail next to the delete dialog — SkillDetail would own two forms and the reading view.
- Dialog library — extra dependency; rejected in 001/004.

## 3. Remount the edit form each time it opens

**Decision**: Drive the overlay with `editOpen` in SkillDetail. Pass persisted `skill` into SkillEditForm. Remount when opening (for example `key` tied to open cycle) so `defaultValue` loads current storage, not leftover unsaved typing from a cancelled session.

**Rationale**: Spec FR-004 and US3. Uncontrolled fields keep the first mount’s `defaultValue`. Without remount, Cancel then Edit again would show discarded edits.

**Alternatives considered**:
- Fully controlled inputs — more state than this overlay needs.
- Reset via `form.reset()` only — easy to miss if the dialog stays mounted.

## 4. `updateSkill` unchanged; no Saved toast on the reading view

**Decision**: Keep `lib/storage.ts` `updateSkill` as-is. Do not add auto-save. After Save, close the overlay; `useSkills()` already re-reads. Do not keep the page-level “Saved” message.

**Rationale**: Spec assumption: closing the overlay plus the updated ficha is enough. Storage already notifies subscribers.

**Alternatives considered**:
- Auto-save on each keystroke — out of scope; would write on Cancel paths if mishandled.
- Keep “Saved” on the reading view — leftover from the always-on form.

## 5. Delete overlay stays on the reading view

**Decision**: Keep the `004` Delete Skill `<dialog>` in SkillDetail. Do not move Delete into Edit Skill.

**Rationale**: Spec FR-009. Cleanup is a reading-view action, not an edit-form action.

**Alternatives considered**:
- Delete only inside Edit — extra step to remove a skill; contradicts 004.

## 6. Do not rewrite `001` or `004` artifacts in this feature

**Decision**: `005` is the current view/edit contract. Leave historical `001` always-on form wording and `004` delete contracts as shipped unless a later docs pass is requested.

**Rationale**: Same approach as `003`/`004` vs older specs.

**Alternatives considered**:
- Patch every 001 “edit on Skill Detail” line — churn; not required to ship 005.
