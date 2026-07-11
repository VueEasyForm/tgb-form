---
editUrl: false
next: false
prev: false
title: "TgbFormTanStackOutput"
---

> **TgbFormTanStackOutput**\<`TForm`\> = [`TgbFormTanStackOptions`](/api/core/src/type-aliases/tgbformtanstackoptions/) & `object`

Defined in: [core/src/tanstack.ts:24](https://github.com/VueEasyForm/tgb-form/blob/f18a2074ed91609dbede1c09a33dcf325f5c78db/packages/core/src/tanstack.ts#L24)

TanStack-compatible options generated from a [FormDefinition](/api/core/src/type-aliases/formdefinition/).

## Type Declaration

### defaultValues

> `readonly` **defaultValues**: [`InferFormValues`](/api/core/src/type-aliases/inferformvalues/)\<`TForm`\>

### validators

> `readonly` **validators**: `Record`\<`string`, `unknown`\> & `object`

#### Type Declaration

##### onSubmit

> `readonly` **onSubmit**: `StandardSchemaV1`\<[`JsonObject`](/api/core/src/type-aliases/jsonobject/), `unknown`\>

## Type Parameters

### TForm

`TForm` *extends* [`FormDefinition`](/api/core/src/type-aliases/formdefinition/)
