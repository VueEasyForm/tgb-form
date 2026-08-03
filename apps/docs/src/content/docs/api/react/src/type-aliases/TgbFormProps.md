---
editUrl: false
next: false
prev: false
title: "TgbFormProps"
---

> **TgbFormProps**\<`TForm`\> = `object` & `Omit`\<`FormHTMLAttributes`\<`HTMLFormElement`\>, `"children"` \| `"onSubmit"`\>

Defined in: [react/src/TgbForm.tsx:18](https://github.com/VueEasyForm/tgb-form/blob/505349e0f3477e72b1dfc77322d867e6b64238da/packages/react/src/TgbForm.tsx#L18)

## Type Declaration

### children?

> `readonly` `optional` **children?**: `ReactNode`

### definition

> `readonly` **definition**: `TForm`

### fields?

> `readonly` `optional` **fields?**: readonly `string`[]

### instance?

> `readonly` `optional` **instance?**: `Record`\<`string`, `unknown`\>

### renderers?

> `readonly` `optional` **renderers?**: [`ReactRendererRegistry`](/api/react/src/type-aliases/reactrendererregistry/)

### tanstackOptions?

> `readonly` `optional` **tanstackOptions?**: [`TgbFormTanStackOptions`](/api/core/src/type-aliases/tgbformtanstackoptions/)\<`TForm`\>

## Type Parameters

### TForm

`TForm` *extends* [`RuntimeFormDefinition`](/api/core/src/type-aliases/runtimeformdefinition/) = [`RuntimeFormDefinition`](/api/core/src/type-aliases/runtimeformdefinition/)
