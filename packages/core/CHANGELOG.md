# @tgb-form/core

## 0.0.4

### Patch Changes

- Better type-safety

  We've improved type-inferencing across the library.

## 0.0.3

### Patch Changes

- Type-safety enforcement and dependencies upgrade.

  - Previously depend too much on any/unknown/never castings, now correctly handling strict type-safety based on the input schemas.
  - Dependencies are upgraded.

## 0.0.2

### Patch Changes

- Vue SFC, React stress test

  - Migrate Vue components of the Vue adapter from `defineComponent()` to SFCs for better development ergonomic.
  - Added a stress test for the React adapter to catch excessive re-renders at our level, reducing the performance risk to the users.
  - Added form-builder integration coverage for built-in validation rules.
