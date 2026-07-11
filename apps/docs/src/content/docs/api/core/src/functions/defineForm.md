---
editUrl: false
next: false
prev: false
title: "defineForm"
---

## Call Signature

> **defineForm**(`definition`, `options?`): [`RuntimeFormDefinition`](/api/core/src/type-aliases/runtimeformdefinition/)

Defined in: [core/src/schema/form.ts:76](https://github.com/VueEasyForm/tgb-form/blob/d3e8e4a8ab0c1ee39d9256e2e460c9593b8ce0cc/packages/core/src/schema/form.ts#L76)

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

Defined in: [core/src/schema/form.ts:80](https://github.com/VueEasyForm/tgb-form/blob/d3e8e4a8ab0c1ee39d9256e2e460c9593b8ce0cc/packages/core/src/schema/form.ts#L80)

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
