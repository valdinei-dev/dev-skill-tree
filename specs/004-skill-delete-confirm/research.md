# Research: Skill Delete Confirmation

## 1. Native `<dialog>` on Skill Detail, not `window.confirm`

**Decision**: Add a `<dialog>` in `components/skills/SkillDetail.tsx`, wired like Create Skill (`showModal` / `close`, `onCancel` + `onClose`). Page Delete sets overlay open. Overlay Cancel and dismiss close it without calling `deleteSkill`. Overlay Delete calls `deleteSkill` then `router.replace("/skills")`.

**Rationale**: Spec assumes the same kind of interruption as Create Skill, not a browser system prompt. Constitution V: no extra library. `SkillForm` already proves this pattern.

**Alternatives considered**:
- `window.confirm` — rejected in specify; copy and two labeled actions would not match the locked overlay.
- Radix / Headless UI dialog — extra dependency for one confirmation.
- Extract a shared `ConfirmDialog` component — premature; one overlay, one file.

## 2. Call `deleteSkill` only after overlay confirm

**Decision**: Leave `lib/storage.ts` `deleteSkill` as-is (remove if found; no in-use guard). Do not add a soft-delete flag or undo buffer. The page Delete button MUST NOT call `deleteSkill`.

**Rationale**: Spec FR-006: confirmation only. Soft-delete and undo are out of scope and would change the Skill model.

**Alternatives considered**:
- Soft-delete field — extra Skill attribute; constitution and spec forbid it here.
- Toast undo — needs a retained copy and a timer; rejected in specify.
- Block delete for “in use” — obsolete after Jobs left the MVP.

## 3. Overlay name is persisted `skill.name`

**Decision**: Render the locked sentence with `skill.name` from `useSkills()` (the stored record). Do not read the Name input’s current value.

**Rationale**: Spec edge case: unsaved form edits are not a second source of truth. Uncontrolled `defaultValue` fields can differ from storage; delete still removes the stored skill.

**Alternatives considered**:
- Read the live input — would confirm a name that might never have been saved.
- Require Save before Delete — extra step; not in the spec.

## 4. Dismiss equals Cancel

**Decision**: Escape / dialog cancel, backdrop dismiss, and the Cancel button all close the overlay and skip `deleteSkill`. Stay on Skill Detail. Put Cancel before Delete in the DOM so the first focusable control is the safe action (same order as Create Skill).

**Rationale**: Spec FR-004 and FR-005. Focusing Delete first would make Enter/space easy to confirm by accident.

**Alternatives considered**:
- Backdrop click still deletes — would violate “dismiss without Delete”.
- A third Close control besides Cancel — spec says it is unnecessary.

## 5. Do not rewrite `001` artifacts in this feature

**Decision**: `004` is the current delete-confirmation contract. Leave historical `specs/001-skill-job-catalog/` immediate-delete wording unless a later docs pass is requested.

**Rationale**: Same approach as `003` vs Home “Create Skills”. Successful overlay Delete still ends on My Skills with the skill gone.

**Alternatives considered**:
- Patch every 001 delete scenario — churn; not required to ship 004.
