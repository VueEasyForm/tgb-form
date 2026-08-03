---
editUrl: false
next: false
prev: false
title: "deserializeForm"
---

> **deserializeForm**\<`TForm`\>(`input`, `options?`): [`RuntimeFormDefinition`](/api/core/src/type-aliases/runtimeformdefinition/)\<`TForm`\>

Defined in: [core/src/schema/form.ts:159](https://github.com/VueEasyForm/tgb-form/blob/505349e0f3477e72b1dfc77322d867e6b64238da/packages/core/src/schema/form.ts#L159)

Parses a JSON string or unknown value into a normalized [RuntimeFormDefinition](/api/core/src/type-aliases/runtimeformdefinition/).

Pass a [FormDefinition](/api/core/src/type-aliases/formdefinition/) type parameter (for example the inferred type of a
code-defined form) to preserve the underlying schema for [InferFormValues](/api/core/src/type-aliases/inferformvalues/).

## Type Parameters

### TForm

`TForm` *extends* [`FormDefinition`](/api/core/src/type-aliases/formdefinition/) = [`FormDefinition`](/api/core/src/type-aliases/formdefinition/)

## Parameters

### input

`unknown`

### options?

[`DefineFormOptions`](/api/core/src/type-aliases/defineformoptions/) = `{}`

## Returns

[`RuntimeFormDefinition`](/api/core/src/type-aliases/runtimeformdefinition/)\<`TForm`\>
