# Task: Create Application Service & Repository Interfaces

**Prompt:**
DDD/Application: ProfileApplicationService & ClientProfileRepository

Define an interface `IClientProfileRepository` with `findById(id)` and `save(aggregate)`.
Implement `ProfileApplicationService` methods `viewProfile()`, `updateProfileInfo()`, `uploadProfilePhoto()`, `changePrivacySetting()` using the repository and domain model.

Provide in-memory and stub implementations suitable for unit testing.

Tech Stack.

PostgreSQL 

generate json schema files for the domain.  save in project_root/schemas