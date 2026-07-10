---
editUrl: false
next: false
prev: false
title: "InferFormValues"
---

> **InferFormValues**\<`TForm`\> = `{ readonly [TKey in keyof TForm["fields"]]: TForm["fields"][TKey]["defaultValue"] }`

Defined in: [core/src/tanstack.ts:9](https://github.com/VueEasyForm/tgb-form/blob/4e15a707001bbfb670d3e50c73bdd285a920798e/packages/core/src/tanstack.ts#L9)

Infers form values from each [FieldDefinition.defaultValue](/api/core/src/type-aliases/fielddefinition/#defaultvalue).

## Type Parameters

### TForm

`TForm` *extends* [`FormDefinition`](/api/core/src/type-aliases/formdefinition/)
