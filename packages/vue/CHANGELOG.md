# @tgb-form/vue

## 0.0.5

### Patch Changes

- Fixed `toTanStackOptions` blindly overriding caller-provided `defaultValues` (initial values) with schema `defaultValue`s. Schema defaults are now the base, and any `defaultValues` passed through `options` override per field, so `useForm` no longer loses initial values.

  Type-system hardening and bug fixes:
  - `serializeForm` now accepts `RuntimeFormDefinition` (its real input) instead of `FormDefinition`, removing a silencing cast that hid the fact that nothing was being stripped.
  - `createRendererRegistry` preserves `TByName`/`TByType` literal keys by reference instead of spreading them into a widened object, eliminating the whole-object `as RendererRegistry` cast.
  - `describeValue` no longer stringifies objects/arrays as `[object Object]` in validation error messages.
  - `TgbFormTanStackOptions.defaultValues` is now a typed (`Partial<InferFormValues<TForm>>`) option rather than an untyped index-signature value.

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
