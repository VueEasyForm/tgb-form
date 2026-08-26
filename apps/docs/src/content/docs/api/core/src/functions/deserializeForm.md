---
editUrl: false
next: false
prev: false
title: "deserializeForm"
---

> **deserializeForm**\<`TForm`\>(`input`, `options?`): [`RuntimeFormDefinition`](/api/core/src/type-aliases/runtimeformdefinition/)\<`TForm`\>

Defined in: [core/src/schema/form.ts:159](https://github.com/VueEasyForm/tgb-form/blob/4abca4e321d3cb38a962279facfd6a43229347a1/packages/core/src/schema/form.ts#L159)

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
