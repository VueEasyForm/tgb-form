---
editUrl: false
next: false
prev: false
title: "FormDefinitionInput"
---

> **FormDefinitionInput**\<`TComponentName`\> = `Omit`\<[`FormDefinition`](/api/core/src/type-aliases/formdefinition/), `"fields"`\> & `object`

Defined in: [core/src/schema/form.ts:87](https://github.com/VueEasyForm/tgb-form/blob/505349e0f3477e72b1dfc77322d867e6b64238da/packages/core/src/schema/form.ts#L87)

Authoring shape for forms. JSON-loaded forms use runtime validation; TypeScript
authored forms can also get component-name checking from a [RendererRegistry](/api/core/src/type-aliases/rendererregistry/).

## Type Declaration

### fields

> `readonly` **fields**: [`FormFieldsDefinitionInput`](/api/core/src/type-aliases/formfieldsdefinitioninput/)\<`TComponentName`\>

Top-level authoring field definitions keyed by form field name.

## Type Parameters

### TComponentName

`TComponentName` *extends* `string` = `string`
