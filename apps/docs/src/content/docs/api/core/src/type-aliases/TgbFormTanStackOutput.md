---
editUrl: false
next: false
prev: false
title: "TgbFormTanStackOutput"
---

> **TgbFormTanStackOutput**\<`TForm`\> = `Omit`\<[`TgbFormTanStackOptions`](/api/core/src/type-aliases/tgbformtanstackoptions/)\<`TForm`\>, `"validators"`\> & `object`

Defined in: [core/src/tanstack.ts:66](https://github.com/VueEasyForm/tgb-form/blob/505349e0f3477e72b1dfc77322d867e6b64238da/packages/core/src/tanstack.ts#L66)

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
