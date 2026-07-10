---
editUrl: false
next: false
prev: false
title: "TgbFormTanStackOutput"
---

> **TgbFormTanStackOutput**\<`TForm`\> = [`TgbFormTanStackOptions`](/api/core/src/type-aliases/tgbformtanstackoptions/) & `object`

Defined in: [core/src/tanstack.ts:24](https://github.com/VueEasyForm/tgb-form/blob/116ebfe00d30a36ed6447b9ac893611229bfde62/packages/core/src/tanstack.ts#L24)

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
