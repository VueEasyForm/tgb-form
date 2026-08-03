---
editUrl: false
next: false
prev: false
title: "InferFormValues"
---

> **InferFormValues**\<`TForm`\> = `{ -readonly [TKey in keyof TForm["fields"]]: InferFieldValue<TForm["fields"][TKey]> }`

Defined in: [core/src/tanstack.ts:47](https://github.com/VueEasyForm/tgb-form/blob/505349e0f3477e72b1dfc77322d867e6b64238da/packages/core/src/tanstack.ts#L47)

Infers the runtime form values shape from each field's [FieldDataType](/api/core/src/enumerations/fielddatatype/),
preserving literal keys on code-defined forms.

## Type Parameters

### TForm

`TForm` *extends* [`FormDefinition`](/api/core/src/type-aliases/formdefinition/)
