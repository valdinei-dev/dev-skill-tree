# Research: Skill Name Required Feedback

## 1. Visible message in the form, not `reportValidity` / native tooltip

**Decision**: After submit, if `!name.trim()`, set overlay-local error state and render the text `Name is required` next to Name. Do not call `form.reportValidity()` or `setCustomValidity` as the user-facing path. Do not call `createSkill` / `updateSkill` until the name is valid.

**Rationale**: Spec FR-003 / FR-004 / SC-002. `required` + `reportValidity()` shows a tooltip for `""` and nothing for `"    "`. `setCustomValidity` still uses the browser bubble, which the spec rejects as the different path. A DOM text node is what assistive technology and sighted users share.

**Alternatives considered**:
- Keep `required` and add `pattern=".*\\S.*"` — still a native bubble; empty vs pattern messages can differ by browser.
- `setCustomValidity("Name is required")` then `reportValidity()` — same tooltip UI the spec wants to leave.
- Let `createSkill` throw and catch — uncaught/console path; storage already throws, but the overlay must not rely on that for UX.

## 2. Disable native constraint validation on these forms

**Decision**: Remove `required` from the Name input (or set `noValidate` on the form). Both empty and whitespace hit the same `trim` check in `handleSubmit`.

**Rationale**: HTML constraint validation runs before `onSubmit` when the field is empty. That is exactly the split the user hit in manual testing. Spec FR-004.

**Alternatives considered**:
- Leave `required` and only special-case whitespace — two UIs remain.
- `noValidate` plus keep `required` for semantics — `required` with `noValidate` does not block submit; still prefer one JS path so empty and spaces cannot diverge later.

## 3. Associate the message with Name (`aria-invalid` / `aria-describedby`) and focus Name

**Decision**: When the error is shown: Name `aria-invalid="true"`; `aria-describedby` points at the error element’s `id`; call `focus()` on the Name input. When the error is hidden: omit `aria-invalid` (or `false`) and omit `aria-describedby`. Error element is not in the DOM (or is not exposed) until a failed submit.

**Rationale**: Spec FR-005 / FR-006 / SC-003. Focus plus described-by is the minimum association without a component library.

**Alternatives considered**:
- `role="alert"` only, no `aria-describedby` — announcement may fire, but Name is not identified as the invalid control.
- Live region instead of focus — weaker for “the field is the problem.”

## 4. Duplicate the pattern in SkillForm and SkillEditForm; no shared field component

**Decision**: Implement the same trim check, copy, ARIA, and focus in `SkillForm.tsx` and `SkillEditForm.tsx`. Reset error state when the overlay closes (`open` becomes false) so the next open is clean (FR-006 / FR-007).

**Rationale**: Constitution V and spec assumption: Create and Edit stay separate overlays. Two call sites do not justify a `NameField` or a `mode` form.

**Alternatives considered**:
- Extract `NameField` — extra abstraction for one string and two attributes.
- Merge overlays — rejected in 005.

## 5. Do not change storage; do not add a dialog library; validate in the browser

**Decision**: Leave `lib/storage.ts` as-is. Leave native `<dialog>`. Manual quickstart in the browser. Do not add Testing Library for this feature. `npm test` must still pass (006).

**Rationale**: Spec FR-008 and out of scope. Storage already rejects empty names; the bug is UI feedback. Radix/shadcn were rejected in specify as solving a problem this feature does not have.

**Alternatives considered**:
- Radix Dialog + Field — out of spec; constitution V.
- New Vitest tests for the overlays — useful later; this spec is user-visible feedback, checked in the browser like 004/005.
