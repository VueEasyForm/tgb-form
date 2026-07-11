---
editUrl: false
next: false
prev: false
title: "InferFormValues"
---

> **InferFormValues**\<`TForm`\> = `{ readonly [TKey in keyof TForm["fields"]]: TForm["fields"][TKey]["defaultValue"] }`

Defined in: [core/src/tanstack.ts:9](https://github.com/VueEasyForm/tgb-form/blob/397eda42c5611a90c55569ab63ad273a22ef9b8c/packages/core/src/tanstack.ts#L9)

Infers form values from each [FieldDefinition.defaultValue](/api/core/src/type-aliases/fielddefinition/#defaultvalue).

## Type Parameters

### TForm

`TForm` *extends* [`FormDefinition`](/api/core/src/type-aliases/formdefinition/)
