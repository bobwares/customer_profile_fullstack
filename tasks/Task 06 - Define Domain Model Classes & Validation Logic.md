# Task: Define Domain Model Classes & Validation Logic

**Prompt:**
DDD: ClientProfileContext — Implement the `ClientProfile` aggregate in TypeScript (or Python) with:
- Value objects `EmailAddress`, `PhoneNumber`, `ProfilePhoto`, `PrivacySettings`, each enforcing PRD invariants.
- Methods `updatePersonalInfo()`, `uploadPhoto()`, `togglePrivacyOption()`.

Include unit tests that verify validation errors for invalid email formats, oversized photos, and unsupported file types.