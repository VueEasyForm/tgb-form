---
editUrl: false
next: false
prev: false
title: "RuntimeFormDefinition"
---

> **RuntimeFormDefinition** = [`FormDefinition`](/api/core/src/type-aliases/formdefinition/) & `object`

Defined in: [core/src/schema/form.ts:26](https://github.com/VueEasyForm/tgb-form/blob/397eda42c5611a90c55569ab63ad273a22ef9b8c/packages/core/src/schema/form.ts#L26)

Normalized [FormDefinition](/api/core/src/type-aliases/formdefinition/) with optional runtime-only [ValidatorRegistry](/api/core/src/type-aliases/validatorregistry/).

## Type Declaration

### renderers?

> `readonly` `optional` **renderers?**: [`RendererRegistry`](/api/core/src/type-aliases/rendererregistry/)

Runtime-only renderer registry attached by [defineForm](/api/core/src/functions/defineform/) when provided.

### validators?

> `readonly` `optional` **validators?**: [`ValidatorRegistry`](/api/core/src/type-aliases/validatorregistry/)

Runtime-only validator registry attached by [defineForm](/api/core/src/functions/defineform/) when provided.
