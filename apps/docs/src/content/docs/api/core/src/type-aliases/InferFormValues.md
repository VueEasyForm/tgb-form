---
editUrl: false
next: false
prev: false
title: "InferFormValues"
---

> **InferFormValues**\<`TForm`\> = `{ readonly [TKey in keyof TForm["fields"]]: TForm["fields"][TKey]["defaultValue"] }`

Defined in: [core/src/tanstack.ts:9](https://github.com/VueEasyForm/tgb-form/blob/d3e8e4a8ab0c1ee39d9256e2e460c9593b8ce0cc/packages/core/src/tanstack.ts#L9)

Infers form values from each [FieldDefinition.defaultValue](/api/core/src/type-aliases/fielddefinition/#defaultvalue).

## Type Parameters

### TForm

`TForm` *extends* [`FormDefinition`](/api/core/src/type-aliases/formdefinition/)
