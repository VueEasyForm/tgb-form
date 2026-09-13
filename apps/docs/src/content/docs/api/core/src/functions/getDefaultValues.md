---
editUrl: false
next: false
prev: false
title: 'getDefaultValues'
---

> **getDefaultValues**\<`TForm`>\>(`form`, `overrides?`): [`InferFormValues`](/api/core/src/type-aliases/inferformvalues/)\<`TForm`>\>

Defined in: [core/src/tanstack.ts:138](https://github.com/VueEasyForm/tgb-form/blob/c15b3d9af923dd134fe61f8d88685aed586346d1/packages/core/src/tanstack.ts#L138)

Extracts default values from a [FormDefinition](/api/core/src/type-aliases/formdefinition/), optionally merged
with a partial overrides payload (e.g. values restored from a database).

Overrides merge exactly like [toTanStackOptions](/api/core/src/functions/totanstackoptions/) `defaultValues`:
plain objects merge key-wise while arrays are replaced wholesale, so a
partial payload can never wipe unrelated sibling values.

## Type Parameters

### TForm

`TForm` _extends_ [`FormDefinition`](/api/core/src/type-aliases/formdefinition/)

## Parameters

### form

`TForm`

### overrides?

[`DeepPartial`](/api/core/src/type-aliases/deeppartial/)\<[`InferFormValues`](/api/core/src/type-aliases/inferformvalues/)\<`TForm`\>\>

## Returns

[`InferFormValues`](/api/core/src/type-aliases/inferformvalues/)\<`TForm`\>
