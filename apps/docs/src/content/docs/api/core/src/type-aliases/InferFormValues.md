---
editUrl: false
next: false
prev: false
title: 'InferFormValues'
---

> **InferFormValues**\<`TForm`> \> = `{ -readonly [TKey in keyof TForm["fields"]]: InferFieldValue<TForm["fields"][TKey]> }`

Defined in: [core/src/schema/infer.ts:39](https://github.com/VueEasyForm/tgb-form/blob/c15b3d9af923dd134fe61f8d88685aed586346d1/packages/core/src/schema/infer.ts#L39)

Infers the runtime form values shape from each field's [FieldDataType](/api/core/src/enumerations/fielddatatype/),
preserving literal keys on code-defined forms.

## Type Parameters

### TForm

`TForm` _extends_ [`FormDefinition`](/api/core/src/type-aliases/formdefinition/)
