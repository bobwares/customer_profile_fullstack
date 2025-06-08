# Task: Initialize Project Structure & Configuration

Use this prompt as the first step in your AI coding agent to scaffold the project before implementing individual features.

**Prompt:**

Project Setup: Client Profile Module — Initialize the repository and folder layout for a full-stack web & mobile application.

1. Create the following directories at project root:

  - `schema/` - JSON schema files defining domain objects.
  - `ui/` - Next.js frontend application.
  - `ui/src` - Frontend source code root.
  - `ui/src/__tests__/` - Unit tests for the UI.
  - `api/` - NestJS backend API.
  - `api/src` - Backend source code root.
  - `api/src/__tests__/` - Unit tests for the API.
  - `db/` - Database configuration.
  - `db/Dockerfile.postgres` - PostgreSQL image for local testing.
  - `e2e/` - End-to-end Playwright tests.
  - `version.md` - Project changelog.

2. Add README.md to ui/ and api/ directories.

3. Initialize language-specific setup:
  -  For JavaScript/TypeScript: `package.json` with scripts `build`, `start`, `test`.
  -  Provide `tsconfig.json` for both packages.
  -  Include `jest.config.js` inside `api/` and `ui/` packages.
  -  Add dependencies and devDependencies according to `AGENTS.md`.

4. Configure linting and formatting for the ui and api modules using **ESLint** and **Prettier**.

5. Create Makefile for `build`, `start`, `test`.

6. Commit message: `Task: Initialize Project Structure & Configuration`.

