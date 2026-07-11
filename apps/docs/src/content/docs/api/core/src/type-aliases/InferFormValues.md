---
editUrl: false
next: false
prev: false
title: "InferFormValues"
---

> **InferFormValues**\<`TForm`\> = `{ readonly [TKey in keyof TForm["fields"]]: TForm["fields"][TKey]["defaultValue"] }`

Defined in: [core/src/tanstack.ts:9](https://github.com/VueEasyForm/tgb-form/blob/f18a2074ed91609dbede1c09a33dcf325f5c78db/packages/core/src/tanstack.ts#L9)

Infers form values from each [FieldDefinition.defaultValue](/api/core/src/type-aliases/fielddefinition/#defaultvalue).

## Type Parameters

### TForm

`TForm` *extends* [`FormDefinition`](/api/core/src/type-aliases/formdefinition/)
