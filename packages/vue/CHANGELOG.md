# @tgb-form/vue

## 0.0.6

### Patch Changes

- Type-safe arrays, deep-merged defaults, full TanStack options passthrough, and Vue 3.5 / pnpm 12 toolchain. See CHANGELOG migration notes.

### Migrating from 0.0.5

1. **Drop `as never` on `toValibotSchema()`.** The compiled schema is now
   typed and plugs directly into `useForm({ validators: { onSubmit } })`.
2. **Merge baselines with the library, not a shallow spread.**
   `{ ...getDefaultValues(definition), ...baseline }` wipes nested siblings
   on partial payloads; use instead:
   ```ts
   getDefaultValues(definition, baseline);
   // or
   useForm(toTanStackOptions(definition, { defaultValues: baseline, onSubmit }));
   ```
3. **`onSubmit: async ({ value }) =>` infers values** from a code-defined
   `definition` — remove manual `Record<string, unknown>` annotations.
4. **Vue peer is now `^3.5.0`.** No component API changes.

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
