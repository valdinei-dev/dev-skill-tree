# Research: Home My Skills Action

## 1. Keep Home a Server Component with a static label

**Decision**: Change only the visible text of the existing `<Link href="/skills">` in `app/page.tsx` from "Create Skills" to "My Skills". Do not call `useSkills`, `getSkills`, or any browser storage API on Home.

**Rationale**: Spec FR-003: label and destination are the same whether the catalog is empty or not. Constitution V: `'use client'` needs a concrete client reason. There is none if the button never branches.

**Alternatives considered**:
- Client island that shows "Create Skills" vs "My Skills" after reading `localStorage` — rejected in specify (option B). Causes loading or a wrong first paint.
- Two Home buttons — rejected; spec wants one primary action.
- Label "Open catalog" / "Continue studying" — rejected; user locked **My Skills** to match the header.

## 2. Create stays on My Skills

**Decision**: Do not add a create overlay or Create Skill button on Home. Empty users still use "Create your first skill" on `/skills`.

**Rationale**: Spec US2. Home's job is to enter the catalog; My Skills already owns create.

**Alternatives considered**:
- Keep "Create Skills" on Home for empty users only — same as rejected option B.

## 3. README follows the product

**Decision**: Update the getting-started sentence in `README.md` so it does not tell people to click Create Skills on Home.

**Rationale**: Otherwise docs contradict SC-001 after ship.

**Alternatives considered**:
- Leave README — would document a button that no longer exists.

## 4. Do not rewrite `001` artifacts in this feature

**Decision**: `003` is the current Home CTA contract. Leave historical `specs/001-skill-job-catalog/` text as shipped-then-superseded unless a later docs pass is requested.

**Rationale**: Avoid a large historical rewrite for one label. Plan and `003` contracts are the source of truth going forward.

**Alternatives considered**:
- Patch every 001 mention of Create Skills — churn; not required to ship 003.
