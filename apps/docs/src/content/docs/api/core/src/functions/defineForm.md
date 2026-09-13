---
editUrl: false
next: false
prev: false
title: 'defineForm'
---

## Call Signature

> **defineForm**\<`TForm`>\>(`definition`, `options?`): [`RuntimeFormDefinition`](/api/core/src/type-aliases/runtimeformdefinition/)\<`TForm`>\>

Defined in: [core/src/schema/form.ts:164](https://github.com/VueEasyForm/tgb-form/blob/c15b3d9af923dd134fe61f8d88685aed586346d1/packages/core/src/schema/form.ts#L164)

Validates and normalizes a [FormDefinitionInput](/api/core/src/type-aliases/formdefinitioninput/) while preserving the literal field shape.

### Type Parameters

#### TForm

`TForm` _extends_ [`FormDefinitionInput`](/api/core/src/type-aliases/formdefinitioninput/)\<`string`\>

### Parameters

#### definition

`TForm` & [`ValidateFormDefinitionInput`](/api/core/src/type-aliases/validateformdefinitioninput/)\<`TForm`\>

#### options?

`undefined`

### Returns

[`RuntimeFormDefinition`](/api/core/src/type-aliases/runtimeformdefinition/)\<`TForm`\>

## Call Signature

> **defineForm**\<`TOptions`, `TForm`>\>(`definition`, `options`): [`RuntimeFormDefinition`](/api/core/src/type-aliases/runtimeformdefinition/)\<`TForm`>\>

Defined in: [core/src/schema/form.ts:168](https://github.com/VueEasyForm/tgb-form/blob/c15b3d9af923dd134fe61f8d88685aed586346d1/packages/core/src/schema/form.ts#L168)

Validates and normalizes a [FormDefinitionInput](/api/core/src/type-aliases/formdefinitioninput/) while preserving the literal field shape.

### Type Parameters

#### TOptions

`TOptions` _extends_ [`DefineFormOptions`](/api/core/src/type-aliases/defineformoptions/)

#### TForm

`TForm` _extends_ [`FormDefinitionInput`](/api/core/src/type-aliases/formdefinitioninput/)\<`ComponentNameFromOptions`\<`TOptions`\>\>

### Parameters

#### definition

`TForm` & [`ValidateFormDefinitionInput`](/api/core/src/type-aliases/validateformdefinitioninput/)\<`TForm`\>

#### options

`TOptions`

### Returns

[`RuntimeFormDefinition`](/api/core/src/type-aliases/runtimeformdefinition/)\<`TForm`\>
