---
editUrl: false
next: false
prev: false
title: "FieldDefinitionInput"
---

> **FieldDefinitionInput**\<`TComponentName`\> = `Omit`\<[`FieldDefinition`](/api/core/src/type-aliases/fielddefinition/), `"component"` \| `"element"` \| `"fields"`\> & `object`

Defined in: [core/src/schema/form.ts:36](https://github.com/VueEasyForm/tgb-form/blob/4e15a707001bbfb670d3e50c73bdd285a920798e/packages/core/src/schema/form.ts#L36)

Authoring shape for [FieldDefinition](/api/core/src/type-aliases/fielddefinition/), narrowed by [RendererRegistry](/api/core/src/type-aliases/rendererregistry/) names when provided.

## Type Declaration

### component?

> `readonly` `optional` **component?**: `TComponentName`

Renderer registry name, narrowed to known names when renderers are provided.

### element?

> `readonly` `optional` **element?**: `FieldDefinitionInput`\<`TComponentName`\>

Element authoring definition for array-valued fields.

### fields?

> `readonly` `optional` **fields?**: [`FormFieldsDefinitionInput`](/api/core/src/type-aliases/formfieldsdefinitioninput/)\<`TComponentName`\>

Child authoring definitions for object-valued fields.

## Type Parameters

### TComponentName

`TComponentName` *extends* `string` = `string`
