---
editUrl: false
next: false
prev: false
title: "RuntimeFormDefinition"
---

> **RuntimeFormDefinition**\<`TForm`\> = `TForm` & `object`

Defined in: [core/src/schema/form.ts:99](https://github.com/VueEasyForm/tgb-form/blob/4abca4e321d3cb38a962279facfd6a43229347a1/packages/core/src/schema/form.ts#L99)

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

`TForm` *extends* [`FormDefinition`](/api/core/src/type-aliases/formdefinition/) = [`FormDefinition`](/api/core/src/type-aliases/formdefinition/)
