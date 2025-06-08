# Task: Implement “Edit Personal Info” Form & API Integration

**Prompt:**
PRD §2.2: Edit Personal Info — As a user, I can edit name, email, phone, and address.

In the `ProfileOverview` component’s edit mode, render a form with controlled inputs for `fullName`, `email`, `phone`, and `address`.
- Validate email format and phone pattern inline.
- On ‘Save’, call `POST /api/profile/update` with changed fields.
- Show success toast on 200, inline errors on validation or server failure.

Generate the form component, integrate with backend, and include Jest + React Testing Library tests covering success and error flows.