---
editUrl: false
next: false
prev: false
title: 'TgbFormTanStackOutput'
---

> **TgbFormTanStackOutput**\<`TForm`, `TOptions`> \> = `Omit`\<`TOptions`, `"defaultValues"` \| `"validators"`> \> & `object`

Defined in: [core/src/tanstack.ts:122](https://github.com/VueEasyForm/tgb-form/blob/c15b3d9af923dd134fe61f8d88685aed586346d1/packages/core/src/tanstack.ts#L122)

TanStack-compatible options generated from a [FormDefinition](/api/core/src/type-aliases/formdefinition/).

`TOptions` preserves the exact user-supplied config (inferred with `const`),
so every supported `on*` keeps its type. Merge order is always:
user-supplied TanStack config wins, then the definition-derived values
(`defaultValues`, `onSubmit` schema), then everything else passes through
untouched.

## Type Declaration

### defaultValues

> `readonly` **defaultValues**: `FormValues`\<`TForm`>\>

### validators

> `readonly` **validators**: `OutputValidators`\<`TForm`, `TOptions`>\>

## Type Parameters

### TForm

`TForm` _extends_ [`FormDefinition`](/api/core/src/type-aliases/formdefinition/)

### TOptions

`TOptions` _extends_ [`TgbFormTanStackOptions`](/api/core/src/type-aliases/tgbformtanstackoptions/)\<`TForm`\> = [`TgbFormTanStackOptions`](/api/core/src/type-aliases/tgbformtanstackoptions/)\<`TForm`\>
