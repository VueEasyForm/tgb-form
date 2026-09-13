# @tgb-form/core

## 0.0.6

### Patch Changes

- Type-safe arrays, deep-merged defaults, full TanStack options passthrough, and Vue 3.5 / pnpm 12 toolchain. See CHANGELOG migration notes.

### Migrating from 0.0.5

1. **Array defaults are checked against `element`.** Mismatched entries are now a
   compile error instead of silently widening to `JsonValue[]`, and non-empty
   defaults infer the element type. Fix any new type errors by correcting the
   default or the element definition — they were latent bugs.
2. **Restore payloads via `getDefaultValues(form, overrides)`.** It replaces
   `{ ...getDefaultValues(form), ...baseline }` shallow spreads: plain objects
   merge key-wise (partial payloads keep siblings), arrays replace wholesale.
   `toTanStackOptions(form, { defaultValues: baseline })` merges the same way.
3. **Object defaults synthesize missing child keys.** A group default of `{}`
   now resolves to `{ street: '' }` from its children (explicit keys win), so
   runtime defaults match `InferFormValues` and satisfy the compiled schema.
   Adjust any code that relied on the raw `{}` passthrough.
4. **Explicit `validators.onSubmit` wins over the compiled schema** (previously
   the schema always overwrote it). Other `on*` validators, listeners, and
   submit handlers pass through untouched — the full TanStack `FormOptions`
   surface is accepted without redeclaring it.
5. **Drop `as never` casts on `toValibotSchema()`.** It now returns a schema
   typed by `InferFormValues`, directly assignable to TanStack validators.
6. **`JsonValue` arrays are `readonly`.** Annotate mutable locals accordingly
   if you mutate JSON values in place.

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
