# Task: Generate End-to-End API Tests

**Prompt:**
PRD Integration: End-to-End Tests for Client Profile APIs

Using your preferred HTTP testing framework (e.g., SuperTest for Node, pytest+requests for Python), write tests that:
1. GET `/api/profile/get` returns a valid profile schema.
2. POST `/api/profile/update` correctly updates fields.
3. File upload to `/api/profile/photo` stores the image and returns a URL.
4. PATCH `/api/profile/settings` toggles privacy flags.

Include setup/teardown for test data and mock authentication.