---
editUrl: false
next: false
prev: false
title: "InferFormValues"
---

> **InferFormValues**\<`TForm`\> = `{ readonly [TKey in keyof TForm["fields"]]: TForm["fields"][TKey]["defaultValue"] }`

Defined in: [core/src/tanstack.ts:9](https://github.com/VueEasyForm/tgb-form/blob/116ebfe00d30a36ed6447b9ac893611229bfde62/packages/core/src/tanstack.ts#L9)

Infers form values from each [FieldDefinition.defaultValue](/api/core/src/type-aliases/fielddefinition/#defaultvalue).

## Type Parameters

### TForm

`TForm` *extends* [`FormDefinition`](/api/core/src/type-aliases/formdefinition/)
