** Task: Initialize Project Structure & Configuration**

Use this prompt as the first step in your AI coding agent to scaffold the project before implementing individual features.

**Prompt:**

Project Setup: Client Profile Module — Initialize the repository and folder layout for a full-stack web & mobile application.

1. Create the following directories at project root:

- `ui/` - Next.js frontend application.
- `api/` - NestJS backend API.
- `schema/` - SQL and JSON files defining the database schema.
- `Dockerfile.postgres` - PostgreSQL image for local testing.
- `version.md` - Project changelog.

2. Add README.md to ui/ and api/ directories.

3. Initialize language-specific setup:
   -  For JavaScript/TypeScript: `package.json` with scripts `build`, `start`, `test`
      
4. Configure linting and formatting:
    
  - ESLint + Prettier for web & mobile code

5. Commit the initial structure with a meaningful commit message.

