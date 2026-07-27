---
editUrl: false
next: false
prev: false
title: "TgbFormTanStackOptions"
---

> **TgbFormTanStackOptions**\<`TForm`\> = `object`

Defined in: [core/src/tanstack.ts:16](https://github.com/VueEasyForm/tgb-form/blob/95df69fa6a1ea04dca9545f750466416c757786b/packages/core/src/tanstack.ts#L16)

Additional options forwarded to `useForm` by [toTanStackOptions](/api/core/src/functions/totanstackoptions/).

## Type Parameters

### TForm

`TForm` *extends* [`FormDefinition`](/api/core/src/type-aliases/formdefinition/)

## Indexable

> \[`key`: `string`\]: `unknown`

## Properties

### onSubmit?

> `readonly` `optional` **onSubmit?**: (`props`) => `unknown` \| `Promise`\<`unknown`\>

Defined in: [core/src/tanstack.ts:17](https://github.com/VueEasyForm/tgb-form/blob/95df69fa6a1ea04dca9545f750466416c757786b/packages/core/src/tanstack.ts#L17)

#### Parameters

##### props

###### value

[`InferFormValues`](/api/core/src/type-aliases/inferformvalues/)\<`TForm`\>

#### Returns

`unknown` \| `Promise`\<`unknown`\>

***

### validators?

> `readonly` `optional` **validators?**: `Record`\<`string`, `unknown`\>

Defined in: [core/src/tanstack.ts:20](https://github.com/VueEasyForm/tgb-form/blob/95df69fa6a1ea04dca9545f750466416c757786b/packages/core/src/tanstack.ts#L20)
