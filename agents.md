# GitHub Copilot Instructions for rasch-stack Project

_Last updated: 2026-06-01_

## Project Overview

This project is a multi-publication React-based web application. **Active publications**: Beobachter (BEO), Cash (CASH), and Gaultmillau (GM).
It is designed to handle high traffic with a focus on performance, accessibility, and maintainability.

**Note:** Only BEO, CASH, and GM publications will be updated in future changes. Other publications in the codebase (Handelszeitung, Schweizer Illustrierte) are no longer actively maintained.

## General Guidelines

- Follow best practices for React and TypeScript development.
- Ensure code is modular, reusable, and well-documented.
- Adhere to the project's coding standards and conventions outlined below.
- Use English language for all code comments, documentation, and communication (including assistant responses).

## Github branch naming convention

- Use the following prefixes for branch names:
- `feature/` for new features
- `hotfix/` for urgent fixes
- branch names should be in lowercase and use hyphens to separate words,
- the ticket number (uppercase) should be included if applicable, e.g., `feature/PNT-1234-add-new-header`
- use the title from the ticket to create a descriptive branch name.

## Technology Stack & Versions

### Core Framework

- **React**: ^18.2.0
- **Redux**: ^4.2.1
- **TypeScript**: ^5.1.6
- **Node.js**: >=22.0.0

### Development Tools

- **ESLint**: ^8.46.0
- **Postcss**: ^8.4.49
- **Prettier**: ^3.0.1
- **Jest**: 29.6.2
- **Yarn**: 3.2.1

### A/B Testing, Monitoring & Analytics

- **GrowthBook**: ^1.6.1

## Project Structure

### Key Directories

- `src/common/components/` – main React components
- `src/common/hooks/` – custom hooks
- `src/shared/hooks/` – shared hooks
- `src/shared/helpers/` – helper functions (equivalent to utils)
- `config/` – configuration files
- E2E tests: `tests-e2e/`
- Publications and domain logic: `src/beobachter/` (BEO), `src/cash/` (CASH), `src/gaultmillau/` (GM)

## Code Standards & Conventions

### TypeScript Configuration

- Target: ES2020
- Module resolution: bundler
- JSX: react-jsx
- No implicit any
- No unused locals/params
- In this repository, TypeScript source files use the `.tsx` extension (including helper files); prefer `.tsx` when locating or creating TypeScript files.

### Styling Guidelines

- Keep styles colocated with their respective components when possible.
- Avoid global styles except for resets and typography.
- Use variables for colors, spacing, and typography to ensure consistency.
- Ensure all styles are responsive and accessible (e.g., sufficient color contrast, focus states).
- Remove unused styles to keep the codebase clean.

### Style Variables Location

- Publication-specific style variables are stored in each publication's `assets/styles/variables.legacy.css.js` file.
  - Example (BEO): `src/beobachter/screens/App/assets/styles/variables.legacy.css.js`
- Shared default style variables are stored in `src/common/assets/styles/variablesDefault.legacy.css`.
- When adding or updating design tokens, prefer publication variables first, and fall back to shared defaults only when the token is truly cross-publication.

## Multi-Publication Architecture

### Publications

- **Beobachter**
- **Cash**
- **Gaultmillau**

Publication shortcuts for Copilot and developers:
Beobachter = BEO
Gaultmillau = GM
Cash = CASH
Use these shortcuts in comments, code, and documentation for clarity.

### Environment Files

- Publication-specific environment files: e.g. `src/beobachter/.env/.env.develop`, `.env.localhost`, `.env.master`, `.env.performance`, `.env.stage`, `.env.update` (each publication may have its own .env directory with files for different environments)

## Key Features & Components

- **Multi-publication architecture:** Actively supports three publications (Beobachter/BEO, Cash/CASH, Gaultmillau/GM) within a single React application.
- **Performance optimization:** Designed for high traffic with code splitting, bundle analysis, and use of React.memo.
- **Accessibility:** Follows best practices to ensure the application is usable by all users.
- **Environment configuration:** Publication-specific `.env` files for flexible environment management.
- **Modular components:** All UI elements are built as reusable, TypeScript-based functional components.
- **Testing:** Unit tests implemented with Jest, organized in `__tests__/` directories.
- **Routing and locale support:** Handles publication-specific routing and locale features.

## Development Guidelines

### Component Development

- Use **TypeScript** for all components
- Prefer **functional components** with hooks
- Follow **accessibility** best practices
- For in-app navigation links, prefer `src/common/components/Link` (`import Link from '../../../../../common/components/Link';`) instead of raw `<a href="...">` when feasible

### Testing

- Use **Jest** for unit tests
- Test files in the `__tests__/` directory (optional testing coverage)
- With Yarn 3.2.1, run Jest as `yarn jest <path-or-pattern> --runInBand` when needed for focused local runs
- Do not use `yarn -s jest ...` (unsupported shorthand flag in this setup)
- For publication-specific Jest execution pitfalls, helper-spy assertion patterns, and validated commands, see `docs/testing/JEST_PUBLICATION_TEST_PLAYBOOK.md`

#### Copilot Test Generation Playbook (Fast Path)

- If the user asks to "create tests" and provides a target file path, create the test directly without extra discovery steps unless behavior is ambiguous.
- Use this placement rule by default:
  - `src/<publication>/<...>/<name>.ts(x)` -> `src/<publication>/<...>/__tests__/<name>.test.tsx`
  - `src/shared/<...>/<name>.ts(x)` -> `src/shared/<...>/__tests__/<name>.test.tsx`
  - `src/common/<...>/<name>.ts(x)` -> `src/common/<...>/__tests__/<name>.test.tsx`
- Use this minimum test matrix:
  - expected/happy-path behavior
  - fallback behavior
  - default-parameter behavior (if applicable)
  - side effect behavior (if function writes to `global`, `window`, `document`, storage, cookies, or URL)
- For module function mocks in TS/Jest, prefer namespace imports and spies:
  - `import * as moduleName from '...';`
  - `jest.spyOn(moduleName, 'fnName')`
- For global object mutation tests, use safe setup/restore:
  - `Object.defineProperty(global, 'location', { configurable: true, value: { href: '' } })`
  - restore original in `afterAll`
  - run `jest.restoreAllMocks()` in `afterEach`
- Keep TypeScript mock values compatible with declared union types. If fallback logic depends on unknown input but type is narrow, use a valid fallback value from the union (for example `''` from OS detection helpers).
- Default command to validate a single new unit test file:
  - `APP=<publication> yarn jest --runInBand <absolute-or-relative-test-file-path>`
- Use English for all test names and comments.

### Performance

- Implement **code splitting** where appropriate
- Use **React.memo** for expensive components
- Optimize **bundle size** with webpack analysis

## Code Review Focus Areas

### Performance

- Adhere to WebVitals best practices, with emphasis on avoiding introducing Cumulative Layout Shift
- Monitor **bundle size** impact
- Check for **memory leaks**
- Verify **lazy loading** implementation
- Test **mobile performance**

### Multi-Publication

- Verify **publication-specific** logic
- Check **environment variable** usage
- Test **locale-specific** features
- Validate **routing** for all publications

## Important Notes for Code Reviews

1. **Always try to reuse patterns found in similar components / folders if they exist**

This project serves millions of concurrent users and requires high reliability, performance, and accessibility standards.
