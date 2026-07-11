---
editUrl: false
next: false
prev: false
title: "DefineFormOptions"
---

> **DefineFormOptions** = `object`

Defined in: [core/src/schema/form.ts:16](https://github.com/VueEasyForm/tgb-form/blob/397eda42c5611a90c55569ab63ad273a22ef9b8c/packages/core/src/schema/form.ts#L16)

Optional registries used by [defineForm](/api/core/src/functions/defineform/) and [deserializeForm](/api/core/src/functions/deserializeform/).

## Properties

### renderers?

> `readonly` `optional` **renderers?**: [`RendererRegistry`](/api/core/src/type-aliases/rendererregistry/)

Defined in: [core/src/schema/form.ts:20](https://github.com/VueEasyForm/tgb-form/blob/397eda42c5611a90c55569ab63ad273a22ef9b8c/packages/core/src/schema/form.ts#L20)

Runtime registry used to resolve renderer component names and field-type defaults.

***

### validators?

> `readonly` `optional` **validators?**: [`ValidatorRegistry`](/api/core/src/type-aliases/validatorregistry/)

Defined in: [core/src/schema/form.ts:18](https://github.com/VueEasyForm/tgb-form/blob/397eda42c5611a90c55569ab63ad273a22ef9b8c/packages/core/src/schema/form.ts#L18)

Runtime registry used to resolve field custom validators by name.
