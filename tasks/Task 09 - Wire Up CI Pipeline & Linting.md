# Task: Wire Up CI Pipeline & Linting

**Prompt:**
Infrastructure: CI/CD for Client Profile Module

Add a GitHub Actions workflow `ci-client-profile.yml` that runs on pull requests, executing:
- `npm install` or `pip install -r requirements.txt`
- Linting (ESLint / Flake8)
- Unit tests
- End-to-End API tests

Ensure artifacts (coverage reports) are uploaded and failures block merges.