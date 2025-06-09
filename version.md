# Version History

## 0.0.1 - 2025-06-08 06:58:24 UTC (main)
- Initial project structure and configuration.

## 0.0.2 - 2025-06-08 07:23:08 UTC (work)
- add tsconfig for ui and api
- create src directories with unit test folders
- add e2e test directory for Playwright

## 0.0.3 - 2025-06-08 07:33:36 UTC (work)
- move jest.config into ui/ and api/ packages
- add dependencies and devDependencies for testing and linting
- generated package-lock in ui

## 0.0.4 - 2025-06-08 07:40:38 UTC (work)
- update initialization task instructions with test directories and configuration details

## 0.0.5 - 2025-06-08 07:59:52 UTC (work)
- implement ProfileOverview components for web and mobile with tests
- add new mobile package configuration

## 0.0.6 - 2025-06-08 08:46:08 UTC (work)
- add metadata headers to config and test files
- update version numbers in profile components

## 0.0.7 - 2025-06-08 08:52:10 UTC (work)
- add edit form with validation and API integration in ProfileOverview
- add success and error handling with unit tests for web and mobile

## 0.0.8 - 2025-06-08 09:02:15 UTC (work)
- add Makefiles for build, start, test for ui, mobile, and api packages

## 0.0.9 - 2025-06-08 09:24:09 UTC (work)
- add install target to Makefiles and fix indentation
- create pages/index.tsx for Next.js build
- update Jest config for TSX transform

## 0.0.10 - 2025-06-08 09:53:18 UTC (work)
- add Next.js app router structure with globals.css, layout.tsx, page.module.css, page.tsx

## 0.0.11 - 2025-06-08 18:57:53 UTC (work)
- implement EditProfileForm component and integrate with ProfileOverview
- add NestJS profile API with update endpoint and integration tests

## 0.0.12 - 2025-06-09 00:15:57 UTC (work)
- implement GET /profile endpoint returning array of Profile
- fetch profiles in UI using base URL env variable
