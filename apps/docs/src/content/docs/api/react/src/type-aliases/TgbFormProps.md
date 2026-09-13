---
editUrl: false
next: false
prev: false
title: 'TgbFormProps'
---

> **TgbFormProps**\<`TForm`> \> = `object` & `Omit`\<`FormHTMLAttributes`\<`HTMLFormElement`>\>, `"children"` \| `"onSubmit"`>\>

Defined in: [react/src/TgbForm.tsx:18](https://github.com/VueEasyForm/tgb-form/blob/c15b3d9af923dd134fe61f8d88685aed586346d1/packages/react/src/TgbForm.tsx#L18)

## Type Declaration

### children?

> `readonly` `optional` **children?**: `ReactNode`

### definition

> `readonly` **definition**: `TForm`

### fields?

> `readonly` `optional` **fields?**: readonly `string`[]

### instance?

> `readonly` `optional` **instance?**: `Record`\<`string`, `unknown`>\>

### renderers?

> `readonly` `optional` **renderers?**: [`ReactRendererRegistry`](/api/react/src/type-aliases/reactrendererregistry/)

### tanstackOptions?

> `readonly` `optional` **tanstackOptions?**: [`TgbFormTanStackOptions`](/api/core/src/type-aliases/tgbformtanstackoptions/)\<`TForm`>\>

## Type Parameters

### TForm

`TForm` _extends_ [`RuntimeFormDefinition`](/api/core/src/type-aliases/runtimeformdefinition/) = [`RuntimeFormDefinition`](/api/core/src/type-aliases/runtimeformdefinition/)
