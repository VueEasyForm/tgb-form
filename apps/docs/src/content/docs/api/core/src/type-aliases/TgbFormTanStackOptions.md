---
editUrl: false
next: false
prev: false
title: "TgbFormTanStackOptions"
---

> **TgbFormTanStackOptions**\<`TForm`\> = `object`

Defined in: [core/src/tanstack.ts:54](https://github.com/VueEasyForm/tgb-form/blob/505349e0f3477e72b1dfc77322d867e6b64238da/packages/core/src/tanstack.ts#L54)

Additional options forwarded to `useForm` by [toTanStackOptions](/api/core/src/functions/totanstackoptions/).

## Type Parameters

### TForm

`TForm` *extends* [`FormDefinition`](/api/core/src/type-aliases/formdefinition/)

## Indexable

> \[`key`: `string`\]: `unknown`

## Properties

### onSubmit?

> `readonly` `optional` **onSubmit?**: (`props`) => `unknown` \| `Promise`\<`unknown`\>

Defined in: [core/src/tanstack.ts:55](https://github.com/VueEasyForm/tgb-form/blob/505349e0f3477e72b1dfc77322d867e6b64238da/packages/core/src/tanstack.ts#L55)

#### Parameters

##### props

###### value

[`InferFormValues`](/api/core/src/type-aliases/inferformvalues/)\<`TForm`\>

#### Returns

`unknown` \| `Promise`\<`unknown`\>

***

### validators?

> `readonly` `optional` **validators?**: `Record`\<`string`, `unknown`\>

Defined in: [core/src/tanstack.ts:56](https://github.com/VueEasyForm/tgb-form/blob/505349e0f3477e72b1dfc77322d867e6b64238da/packages/core/src/tanstack.ts#L56)
