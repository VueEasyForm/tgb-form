---
editUrl: false
next: false
prev: false
title: "TgbFormTanStackOptions"
---

> **TgbFormTanStackOptions**\<`TForm`\> = `object`

Defined in: [core/src/tanstack.ts:54](https://github.com/VueEasyForm/tgb-form/blob/4abca4e321d3cb38a962279facfd6a43229347a1/packages/core/src/tanstack.ts#L54)

Additional options forwarded to `useForm` by [toTanStackOptions](/api/core/src/functions/totanstackoptions/).

## Type Parameters

### TForm

`TForm` *extends* [`FormDefinition`](/api/core/src/type-aliases/formdefinition/)

## Indexable

> \[`key`: `string`\]: `unknown`

## Properties

### defaultValues?

> `readonly` `optional` **defaultValues?**: `Partial`\<[`InferFormValues`](/api/core/src/type-aliases/inferformvalues/)\<`TForm`\>\>

Defined in: [core/src/tanstack.ts:57](https://github.com/VueEasyForm/tgb-form/blob/4abca4e321d3cb38a962279facfd6a43229347a1/packages/core/src/tanstack.ts#L57)

***

### onSubmit?

> `readonly` `optional` **onSubmit?**: (`props`) => `unknown`

Defined in: [core/src/tanstack.ts:55](https://github.com/VueEasyForm/tgb-form/blob/4abca4e321d3cb38a962279facfd6a43229347a1/packages/core/src/tanstack.ts#L55)

#### Parameters

##### props

###### value

[`InferFormValues`](/api/core/src/type-aliases/inferformvalues/)\<`TForm`\>

#### Returns

`unknown`

***

### validators?

> `readonly` `optional` **validators?**: `Record`\<`string`, `unknown`\>

Defined in: [core/src/tanstack.ts:56](https://github.com/VueEasyForm/tgb-form/blob/4abca4e321d3cb38a962279facfd6a43229347a1/packages/core/src/tanstack.ts#L56)
