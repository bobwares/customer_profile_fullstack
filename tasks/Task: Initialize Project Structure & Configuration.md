** Task: Initialize Project Structure & Configuration**

Use this prompt as the first step in your AI coding agent to scaffold the project before implementing individual features.

**Prompt:**

Project Setup: Client Profile Module — Initialize the repository and folder layout for a full-stack web & mobile application.

1. Create the following directories at project root:

- `schema/` - JSON schema files defining domain objects for the application.
- `ui/`  - Next.js frontend application.
- `api/` - NestJS backend API.
- `db/`  - Database configuration
- `db/Dockerfile.postgres` - PostgreSQL image for local testing.
- `./version.md` - Project changelog.

2. Add README.md to ui/ and api/ directories.

3. Initialize language-specific setup:
   -  For JavaScript/TypeScript: `package.json` with scripts `build`, `start`, `test`
      
4. Configure linting and formatting for the ui and api modules.
    
5. Commit message: Task: Initialize Project Structure & Configuration.

