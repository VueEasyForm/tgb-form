---
editUrl: false
next: false
prev: false
title: "defineForm"
---

## Call Signature

> **defineForm**(`definition`, `options?`): [`RuntimeFormDefinition`](/api/core/src/type-aliases/runtimeformdefinition/)

Defined in: [core/src/schema/form.ts:76](https://github.com/VueEasyForm/tgb-form/blob/95df69fa6a1ea04dca9545f750466416c757786b/packages/core/src/schema/form.ts#L76)

Validates and normalizes a [FormDefinitionInput](/api/core/src/type-aliases/formdefinitioninput/).

### Parameters

#### definition

[`FormDefinitionInput`](/api/core/src/type-aliases/formdefinitioninput/)

#### options?

`undefined`

### Returns

[`RuntimeFormDefinition`](/api/core/src/type-aliases/runtimeformdefinition/)

## Call Signature

> **defineForm**\<`TOptions`\>(`definition`, `options`): [`RuntimeFormDefinition`](/api/core/src/type-aliases/runtimeformdefinition/)

Defined in: [core/src/schema/form.ts:80](https://github.com/VueEasyForm/tgb-form/blob/95df69fa6a1ea04dca9545f750466416c757786b/packages/core/src/schema/form.ts#L80)

Validates and normalizes a [FormDefinitionInput](/api/core/src/type-aliases/formdefinitioninput/).

### Type Parameters

#### TOptions

`TOptions` *extends* [`DefineFormOptions`](/api/core/src/type-aliases/defineformoptions/)

### Parameters

#### definition

[`FormDefinitionInput`](/api/core/src/type-aliases/formdefinitioninput/)\<`ComponentNameFromOptions`\<`TOptions`\>\>

#### options

`TOptions`

### Returns

[`RuntimeFormDefinition`](/api/core/src/type-aliases/runtimeformdefinition/)
