## About

Application Name: Client Profile Module

### Product Design Document

READ PRD.md

### Domain Driven Design Document

READ domain_driven_design_document.md
   
### Versioning

- create file version.md with updated version number and list of changes. Include date and time of change and branch name.
- Start version at 0.0.1
- Update version each time the code is updated.
- Update only code or configuration files that have changed.

### Coding Rules

Read coding_rules.md

### **Full-Stack Technology Stack (NestJS + Next.js)**

**Backend – NestJS (Node.js + TypeScript):**

* TypeScript (ECMAScript 2022) for type-safe backend development.
* NestJS for scalable, modular server-side applications.
* Express or Fastify as the underlying HTTP adapter.
* TypeORM, Prisma, or Mongoose for database access (PostgreSQL, MySQL, MongoDB).
* class-validator + class-transformer for DTO validation.
* Passport.js with JWT for authentication.
* @nestjs/config for environment-based configuration management.
* BullMQ (backed by Redis) for background jobs and queue processing.
* Swagger via `@nestjs/swagger` for automatic API documentation.
* Jest for unit and integration testing.
* Winston or Pino for structured logging.
* Event-driven architecture support using `@nestjs/event-emitter` or message brokers (Kafka, RabbitMQ).

**Frontend – Next.js (React + TypeScript):**

* TypeScript for type-safe frontend development.
* Next.js for server-side rendering (SSR), static generation (SSG), and hybrid rendering.
* Tailwind CSS for utility-first, responsive styling.
* Zustand for global state management.
* React Hook Form + Zod/Yup for form state management and validation.
* Axios or native Fetch API for communicating with the NestJS backend.
* NextAuth.js for authentication workflows including OAuth and JWT.
* Jest + React Testing Library for component-level testing.
* ESLint + Prettier for linting and consistent code formatting.
* Webpack (default) or Vite (with plugin) for optimized builds.
