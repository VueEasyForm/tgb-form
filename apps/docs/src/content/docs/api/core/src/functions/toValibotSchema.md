---
editUrl: false
next: false
prev: false
title: 'toValibotSchema'
---

> **toValibotSchema**\<`TForm`>\>(`form`): `BaseSchema`\<[`InferFormValues`](/api/core/src/type-aliases/inferformvalues/)\<`TForm`>\>, [`InferFormValues`](/api/core/src/type-aliases/inferformvalues/)\<`TForm`>\>, `BaseIssue`\<`unknown`>>\>\>

Defined in: [core/src/valibot-compiler.ts:14](https://github.com/VueEasyForm/tgb-form/blob/c15b3d9af923dd134fe61f8d88685aed586346d1/packages/core/src/valibot-compiler.ts#L14)

Compiles a normalized [FormDefinition](/api/core/src/type-aliases/formdefinition/) into a Valibot object schema
typed by [InferFormValues](/api/core/src/type-aliases/inferformvalues/), so it plugs into TanStack validators
without further casting at the call site.

## Type Parameters

### TForm

`TForm` _extends_ [`FormDefinition`](/api/core/src/type-aliases/formdefinition/)

## Parameters

### form

[`RuntimeFormDefinition`](/api/core/src/type-aliases/runtimeformdefinition/)\<`TForm`\>

## Returns

`BaseSchema`\<[`InferFormValues`](/api/core/src/type-aliases/inferformvalues/)\<`TForm`\>, [`InferFormValues`](/api/core/src/type-aliases/inferformvalues/)\<`TForm`\>, `BaseIssue`\<`unknown`\>\>
