---
editUrl: false
next: false
prev: false
title: 'toTanStackOptions'
---

> **toTanStackOptions**\<`TForm`, `TOptions`>\>(`form`, `options?`): [`TgbFormTanStackOutput`](/api/core/src/type-aliases/tgbformtanstackoutput/)\<`TForm`, `TOptions`>\>

Defined in: [core/src/tanstack.ts:205](https://github.com/VueEasyForm/tgb-form/blob/c15b3d9af923dd134fe61f8d88685aed586346d1/packages/core/src/tanstack.ts#L205)

Builds TanStack Form Core options with [getDefaultValues](/api/core/src/functions/getdefaultvalues/) and [toValibotSchema](/api/core/src/functions/tovalibotschema/).

Accepts the full TanStack `FormOptions` surface for the inferred values —
validators, listeners, submit handlers — with user config taking precedence
over definition-derived values.

## Type Parameters

### TForm

`TForm` _extends_ [`FormDefinition`](/api/core/src/type-aliases/formdefinition/)

### TOptions

`TOptions` _extends_ [`TgbFormTanStackOptions`](/api/core/src/type-aliases/tgbformtanstackoptions/)\<`TForm`\> = [`TgbFormTanStackOptions`](/api/core/src/type-aliases/tgbformtanstackoptions/)\<`TForm`\>

## Parameters

### form

`TForm`

### options?

`TOptions`

## Returns

[`TgbFormTanStackOutput`](/api/core/src/type-aliases/tgbformtanstackoutput/)\<`TForm`, `TOptions`\>
