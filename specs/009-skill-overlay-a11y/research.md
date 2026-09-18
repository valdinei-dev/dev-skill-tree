# Research: Skill Overlay Accessibility

## 1. Unmount closed dialogs so they leave the accessibility tree

**Decision**: Render each overlay `<dialog>` only while it is open. Create Skill: mount `SkillForm` from `SkillList` only when `formOpen` (same pattern Edit already uses). Delete Skill: mount the confirm `<dialog>` in `SkillDetail` only when `confirmOpen`. Edit Skill already unmounts when closed — keep that.

**Rationale**: Spec FR-001 / SC-001. In this app’s inspector, a closed native `<dialog>` that stays in the DOM still exposed headings and fields (Create Skill on My Skills, Delete Skill on the ficha). Edit did not leak because it was not mounted. Removing the closed node is the demonstrated fix. Spec assumption allows markup to remain if FR-001 holds; unmount is how we meet FR-001 here.

**Alternatives considered**:
- Keep the node and rely on the user-agent `display: none` for closed `<dialog>` — failed in the inspector we used.
- `hidden` / `inert` / `aria-hidden` on a closed dialog — extra attributes while the node still exists; unmount matches Edit.
- A portal library — out of spec (FR-005).

## 2. Name the open dialog from the visible title

**Decision**: Give each overlay `h2` a stable `id` and set `aria-labelledby` on that `<dialog>` to the same id. Titles stay Create Skill, Edit Skill, Delete Skill. Do not add a second, invisible name.

**Rationale**: Spec FR-002 / SC-002. The title is already on screen. Associating the dialog with that heading makes the open overlay identifiable without new copy.

**Alternatives considered**:
- `aria-label="Create Skill"` duplicating the `h2` — two names for one title.
- Rely on the first heading inside `<dialog>` without `aria-labelledby` — inconsistent accessible name across browsers.
- Component library dialog — rejected in specify.

## 3. Restore focus to the opening control; do not trust unmount + native restore

**Decision**: On the click that opens an overlay, remember `event.currentTarget`. On close (Cancel, Escape, successful Create/Save while staying on the page), call `.focus()` on that element. Create has two openers (Create Skill vs Create your first skill); whichever was used gets focus back. Confirming Delete still navigates away — no restore on the deleted ficha.

**Rationale**: Spec FR-003 / SC-003. `showModal()` can restore focus on `close()`, but this app `preventDefault`s cancel and will unmount the dialog (decision 1), so native restore is not reliable. `autoFocus` on Name would also steal `document.activeElement` if capture happened after open.

**Alternatives considered**:
- Capture `document.activeElement` inside the dialog `useEffect` after `showModal` — too late; Name is focused.
- Only restore on Escape, not Cancel — spec requires both.
- Shared `useDialog` hook / `Overlay.tsx` — three call sites; constitution V. Inline refs on `SkillList` and `SkillDetail`.

## 4. Validate in the browser inspector and keyboard, not a new test runner

**Decision**: Quickstart uses the running app: accessibility snapshot for closed vs open, then Cancel/Escape focus. `npm test` still covers storage only.

**Rationale**: Same as 004–008 UI features. Acceptance is tree honesty and first-try focus, which the browser already shows.

**Alternatives considered**:
- Testing Library `toHaveAccessibleName` — useful later; not required by this spec.
