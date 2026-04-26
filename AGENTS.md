# AGENTS.md - Patchline coding agent rules

This repo is a Vue demo site managed by patchline-worker. A coding agent is
invoked when a maintainer adds either `approve-for-claude` or
`approve-for-codex` to a Patchline issue. The issue body is the source of truth.

## Hard Rules

- Make the smallest possible diff to satisfy the issue. One PR, one logical
  change.
- Do not edit dependencies, lockfiles, CI, deployment config, secrets, or agent
  config unless the issue explicitly asks for a setup change.
- Do not edit `backend/**` for normal website content changes.
- Prefer editing the Vue frontend only: `frontend/src/**` and `frontend/public/**`.
- If the request is ambiguous, comment on the issue asking for clarification
  instead of guessing.

## Editable Areas

- `frontend/src/views/**` - page-level Vue views
- `frontend/src/components/**` - shared Vue components, if present
- `frontend/src/content/**` - structured content, if added later
- `frontend/src/data/**` - structured data, if added later
- `frontend/public/images/**` - images
- `frontend/public/files/**` - PDFs and downloads

## PR Conventions

- Title: `[client-request] <short summary>`
- Body must include `Closes #<issue-number>`
- Include a short summary of changed files and any ambiguity encountered.
