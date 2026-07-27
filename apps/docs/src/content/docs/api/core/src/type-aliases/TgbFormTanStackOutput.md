---
editUrl: false
next: false
prev: false
title: "TgbFormTanStackOutput"
---

> **TgbFormTanStackOutput**\<`TForm`\> = `Omit`\<[`TgbFormTanStackOptions`](/api/core/src/type-aliases/tgbformtanstackoptions/)\<`TForm`\>, `"validators"`\> & `object`

Defined in: [core/src/tanstack.ts:30](https://github.com/VueEasyForm/tgb-form/blob/95df69fa6a1ea04dca9545f750466416c757786b/packages/core/src/tanstack.ts#L30)

TanStack-compatible options generated from a [FormDefinition](/api/core/src/type-aliases/formdefinition/).

Omits `validators` from [TgbFormTanStackOptions](/api/core/src/type-aliases/tgbformtanstackoptions/) to avoid intersecting
user-provided function validators with the Standard Schema override for `onSubmit`.

## Type Declaration

### defaultValues

> `readonly` **defaultValues**: [`InferFormValues`](/api/core/src/type-aliases/inferformvalues/)\<`TForm`\>

### validators

> `readonly` **validators**: `object`

#### validators.onSubmit

> `readonly` **onSubmit**: `StandardSchemaV1`\<[`InferFormValues`](/api/core/src/type-aliases/inferformvalues/)\<`TForm`\>, `unknown`\>

## Type Parameters

### TForm

`TForm` *extends* [`FormDefinition`](/api/core/src/type-aliases/formdefinition/)
