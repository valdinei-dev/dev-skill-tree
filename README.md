# Dev Skill Tree

A personal knowledge manager for software developers. Track technical skills,
set how important they are and how well you know them, and keep notes for
study. Data stays in your browser — there is no account or backend in this MVP.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Use **My Skills** to
open the catalog (create from there if it is empty).

Run persistence contract checks (no UI):

```bash
npm test
npm run typecheck
```

## Routes

- `/` Home
- `/skills` My Skills
- `/skills/[id]` Skill detail
- `/about` About
