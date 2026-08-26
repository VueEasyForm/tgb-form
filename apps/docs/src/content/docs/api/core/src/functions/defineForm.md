---
editUrl: false
next: false
prev: false
title: "defineForm"
---

## Call Signature

> **defineForm**\<`TForm`\>(`definition`, `options?`): [`RuntimeFormDefinition`](/api/core/src/type-aliases/runtimeformdefinition/)\<`TForm`\>

Defined in: [core/src/schema/form.ts:115](https://github.com/VueEasyForm/tgb-form/blob/4abca4e321d3cb38a962279facfd6a43229347a1/packages/core/src/schema/form.ts#L115)

Validates and normalizes a [FormDefinitionInput](/api/core/src/type-aliases/formdefinitioninput/) while preserving the literal field shape.

### Type Parameters

#### TForm

`TForm` *extends* [`FormDefinitionInput`](/api/core/src/type-aliases/formdefinitioninput/)\<`string`\>

### Parameters

#### definition

`TForm`

#### options?

`undefined`

### Returns

[`RuntimeFormDefinition`](/api/core/src/type-aliases/runtimeformdefinition/)\<`TForm`\>

## Call Signature

> **defineForm**\<`TOptions`, `TForm`\>(`definition`, `options`): [`RuntimeFormDefinition`](/api/core/src/type-aliases/runtimeformdefinition/)\<`TForm`\>

Defined in: [core/src/schema/form.ts:119](https://github.com/VueEasyForm/tgb-form/blob/4abca4e321d3cb38a962279facfd6a43229347a1/packages/core/src/schema/form.ts#L119)

Validates and normalizes a [FormDefinitionInput](/api/core/src/type-aliases/formdefinitioninput/) while preserving the literal field shape.

### Type Parameters

#### TOptions

`TOptions` *extends* [`DefineFormOptions`](/api/core/src/type-aliases/defineformoptions/)

#### TForm

`TForm` *extends* [`FormDefinitionInput`](/api/core/src/type-aliases/formdefinitioninput/)\<`ComponentNameFromOptions`\<`TOptions`\>\>

### Parameters

#### definition

`TForm`

#### options

`TOptions`

### Returns

[`RuntimeFormDefinition`](/api/core/src/type-aliases/runtimeformdefinition/)\<`TForm`\>
