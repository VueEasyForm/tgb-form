---
editUrl: false
next: false
prev: false
title: "FormDefinitionInput"
---

> **FormDefinitionInput**\<`TComponentName`\> = `Omit`\<[`FormDefinition`](/api/core/src/type-aliases/formdefinition/), `"fields"`\> & `object`

Defined in: [core/src/schema/form.ts:59](https://github.com/VueEasyForm/tgb-form/blob/116ebfe00d30a36ed6447b9ac893611229bfde62/packages/core/src/schema/form.ts#L59)

Authoring shape for forms. JSON-loaded forms use runtime validation; TypeScript
authored forms can also get component-name checking from a [RendererRegistry](/api/core/src/type-aliases/rendererregistry/).

## Type Declaration

### fields

> `readonly` **fields**: [`FormFieldsDefinitionInput`](/api/core/src/type-aliases/formfieldsdefinitioninput/)\<`TComponentName`\>

Top-level authoring field definitions keyed by form field name.

## Type Parameters

### TComponentName

`TComponentName` *extends* `string` = `string`
