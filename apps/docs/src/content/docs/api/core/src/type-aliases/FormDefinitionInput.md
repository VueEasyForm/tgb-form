---
editUrl: false
next: false
prev: false
title: "FormDefinitionInput"
---

> **FormDefinitionInput**\<`TComponentName`\> = `Omit`\<[`FormDefinition`](/api/core/src/type-aliases/formdefinition/), `"fields"`\> & `object`

Defined in: [core/src/schema/form.ts:59](https://github.com/VueEasyForm/tgb-form/blob/f18a2074ed91609dbede1c09a33dcf325f5c78db/packages/core/src/schema/form.ts#L59)

Authoring shape for forms. JSON-loaded forms use runtime validation; TypeScript
authored forms can also get component-name checking from a [RendererRegistry](/api/core/src/type-aliases/rendererregistry/).

## Type Declaration

### fields

> `readonly` **fields**: [`FormFieldsDefinitionInput`](/api/core/src/type-aliases/formfieldsdefinitioninput/)\<`TComponentName`\>

Top-level authoring field definitions keyed by form field name.

## Type Parameters

### TComponentName

`TComponentName` *extends* `string` = `string`
