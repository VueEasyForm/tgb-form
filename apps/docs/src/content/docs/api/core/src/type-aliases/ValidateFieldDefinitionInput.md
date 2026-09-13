---
editUrl: false
next: false
prev: false
title: 'ValidateFieldDefinitionInput'
---

> **ValidateFieldDefinitionInput**\<`T`> \> = `T` _extends_ `object` ? `TDefault` _extends_ readonly [`InferFieldValue`](/api/core/src/type-aliases/inferfieldvalue/)\<`TElement` & [`FieldDefinition`](/api/core/src/type-aliases/fielddefinition/)>\>[] ? `Omit`\<`T`, `"element"`> \> & `object` : `T` & `object` : `T` _extends_ `object` ? `Omit`\<`T`, `"fields"`> \> & `object` : `T`

Defined in: [core/src/schema/form.ts:122](https://github.com/VueEasyForm/tgb-form/blob/c15b3d9af923dd134fe61f8d88685aed586346d1/packages/core/src/schema/form.ts#L122)

Compile-time check that an array field's `defaultValue` entries match the
value type inferred from its `element` definition, recursing into nested
object fields and array elements.

A mismatch resolves the definition to an incompatible marker so
[defineForm](/api/core/src/functions/defineform/) fails at the call site instead of silently widening the
array to `JsonValue[]`.

## Type Parameters

### T

`T`
