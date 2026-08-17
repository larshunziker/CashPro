# Jest Publication Test Playbook

_Last updated: 2026-05-29_

This document captures practical test implementation lessons and best practices for writing publication-aware tests.

Use it when writing or fixing tests for BEO, CASH, and GM.

## Scope

- Unit and integration tests in `src/**/__tests__/`.
- Publication-aware test execution in this multi-publication repository.
- React + Redux + `react-helmet-async` patterns used by video components.

## Quick Checklist Before Writing Tests

- Confirm fixture data contains the exact fields needed by the behavior under test.
- Prefer stable assertions on function contracts (helper call args) over brittle DOM side effects.
- For language-specific tests across publications, ensure both UI locale and Redux state reflect the target language.
- In GM tests with multiple language variants, set both `IntlProvider locale` and Redux `settings.language`.
- Use `jest.spyOn` with namespace imports for helper assertions.
- Always restore mocks in `afterEach`.

## Publication-Aware Jest Execution

### What can fail

- Running publication tests with `APP=<publication>` and a lowercase path pattern can return `No tests found`.
- Reason: Jest `testMatch` can be scoped to publication alias paths (for example `src/BEO/**`, `src/CASH/**`, `src/GM/**`) while the filesystem path is lowercase.

### Recommended execution strategy

Use `--runTestsByPath` for deterministic targeted runs:

```bash
yarn jest --runInBand src/shared/helpers/__tests__/createVideoObjectJsonLd.js
yarn jest --runInBand --runTestsByPath src/cash/screens/App/components/VideoPlayer/__tests__/index.tsx
yarn jest --runInBand --runTestsByPath src/gaultmillau/screens/App/components/Video/__tests__/index.tsx
```

Use `APP=<publication>` only when the selected pattern matches the publication-scoped `testMatch` setup.

## Reliable Assertion Pattern for Schema / Helmet

### Problem observed

Reading schema scripts directly from `document.head` can be flaky depending on how `HelmetProvider` updates are batched.

### Preferred solution

Assert the helper call that builds the schema input.

- Import helper as namespace:
  - `import * as HelperModule from '.../helpers';`
- Spy:
  - `const helperSpy = jest.spyOn(HelperModule, 'helperFunctionName');`
- Assert expected arguments:
  - `expect(helperSpy).toHaveBeenCalledWith(expect.objectContaining({ expectedField: expectedValue }));`

This keeps the test focused on contract and publication-specific wiring.

## Publication-Specific Considerations

### Gaultmillau (GM) Language Variants

GM supports multiple language versions. When testing language-dependent logic:

- `IntlProvider locale="fr-CH"` alone is not sufficient.
- Also set Redux state for selector-driven language detection:

```ts
const frenchState = {
  ...initialState,
  settings: { language: 'fr' },
};
```

Always verify the correct language variant is used by both UI locale and Redux state.

## Common Pitfalls and Fixes

### 1) Fixture missing required fields

- Symptom: Expected value, got `undefined`.
- Fix: Ensure test fixture includes all fields required by the component or helper under test.

### 2) Wrong relative import depth in tests

- Symptom: `Cannot find module .../helpers`.
- Fix: Verify path from the test file location; prefer copying an existing nearby test import pattern.

### 3) Asserting only DOM output for schema

- Symptom: Intermittent failures or missing scripts.
- Fix: Assert helper invocations and arguments (contract-level tests).

### 4) Language-specific logic not working in GM tests

- Symptom: Expected French behavior, but German behavior is used.
- Fix: Set both `IntlProvider locale` and Redux `settings.language` to the target language in test state.

### 5) Router nesting in publication tests

- Symptom: `You cannot render a <Router> inside another <Router>`.
- Cause: Publication `ReduxProvider` wrappers may already inject `MemoryRouter` when no router context exists.
- Fix: Wrap `ReduxProvider` with `MemoryRouter` in the test tree when route control is needed:

```tsx
<MemoryRouter initialEntries={[pathname]}>
  <ReduxProvider initialState={initialState}>{children}</ReduxProvider>
</MemoryRouter>
```

This ensures the provider detects existing router context and does not create a second router.

### 6) Test file extension for JSX wrappers

- Symptom: Babel parser errors like `Unexpected token` at `<MemoryRouter ...>` in tests.
- Cause: JSX used in a `.ts` test file.
- Fix: Use `.tsx` for tests that render JSX wrappers (for example custom `wrapper` in `renderHook`).

### 7) Avoid replacing the entire `window` object in jsdom tests

- Symptom: React errors such as `Right-hand side of 'instanceof' is not an object` or cleanup race warnings.
- Cause: Replacing `global.window`/`window` with a plain object removes jsdom internals React depends on.
- Fix: Stub only the required property (for example `window.aiaibot`) with `Object.defineProperty`, and restore after tests.

```ts
Object.defineProperty(window, 'aiaibot', {
  configurable: true,
  value: mockAiaibot,
});
```

For unavailable cases, delete only that property:

```ts
delete (window as typeof window & { aiaibot?: unknown }).aiaibot;
```

### 8) Prefer stable local constants in tests for CSS class assertions

- Symptom: Flaky TS/module resolution warnings while importing small constant files in deep test paths.
- Fix: For pure assertion strings (for example body class names), using a local test constant can be acceptable when it improves test stability and avoids brittle import chains.

## Minimal Validation Set for Schema Changes

Run these when modifying schema or Helmet-related wiring:

```bash
yarn jest --runInBand src/shared/helpers/__tests__/
yarn jest --runInBand --runTestsByPath src/beobachter/screens/App/components/
yarn jest --runInBand --runTestsByPath src/cash/screens/App/components/
yarn jest --runInBand --runTestsByPath src/gaultmillau/screens/App/components/
```

## Maintenance Notes

- Keep this file updated when a new publication is added or when Jest matching strategy changes.
- If helper contracts change (for example `createSSRHelmet` arguments), update both this guide and affected tests immediately.

