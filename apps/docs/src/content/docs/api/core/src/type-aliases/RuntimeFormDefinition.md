---
editUrl: false
next: false
prev: false
title: 'RuntimeFormDefinition'
---

> **RuntimeFormDefinition**\<`TForm`> \> = `TForm` & `object`

Defined in: [core/src/schema/form.ts:100](https://github.com/VueEasyForm/tgb-form/blob/c15b3d9af923dd134fe61f8d88685aed586346d1/packages/core/src/schema/form.ts#L100)

Normalized [FormDefinition](/api/core/src/type-aliases/formdefinition/) that preserves the literal shape of the
authoring [FormDefinitionInput](/api/core/src/type-aliases/formdefinitioninput/) it was built from.

## Type Declaration

### renderers?

> `readonly` `optional` **renderers?**: [`RendererRegistry`](/api/core/src/type-aliases/rendererregistry/)

Runtime-only renderer registry attached by [defineForm](/api/core/src/functions/defineform/) when provided.

### validators?

> `readonly` `optional` **validators?**: [`ValidatorRegistry`](/api/core/src/type-aliases/validatorregistry/)

Runtime-only validator registry attached by [defineForm](/api/core/src/functions/defineform/) when provided.

## Type Parameters

### TForm

`TForm` _extends_ [`FormDefinition`](/api/core/src/type-aliases/formdefinition/) = [`FormDefinition`](/api/core/src/type-aliases/formdefinition/)
