---
editUrl: false
next: false
prev: false
title: 'deserializeForm'
---

> **deserializeForm**\<`TForm`>\>(`input`, `options?`): [`RuntimeFormDefinition`](/api/core/src/type-aliases/runtimeformdefinition/)\<`TForm`>\>

Defined in: [core/src/schema/form.ts:211](https://github.com/VueEasyForm/tgb-form/blob/c15b3d9af923dd134fe61f8d88685aed586346d1/packages/core/src/schema/form.ts#L211)

Parses a JSON string or unknown value into a normalized [RuntimeFormDefinition](/api/core/src/type-aliases/runtimeformdefinition/).

Pass a [FormDefinition](/api/core/src/type-aliases/formdefinition/) type parameter (for example the inferred type of a
code-defined form) to preserve the underlying schema for [InferFormValues](/api/core/src/type-aliases/inferformvalues/).

## Type Parameters

### TForm

`TForm` _extends_ [`FormDefinition`](/api/core/src/type-aliases/formdefinition/) = [`FormDefinition`](/api/core/src/type-aliases/formdefinition/)

## Parameters

### input

`unknown`

### options?

[`DefineFormOptions`](/api/core/src/type-aliases/defineformoptions/) = `{}`

## Returns

[`RuntimeFormDefinition`](/api/core/src/type-aliases/runtimeformdefinition/)\<`TForm`\>
