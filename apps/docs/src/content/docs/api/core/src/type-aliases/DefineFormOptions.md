---
editUrl: false
next: false
prev: false
title: "DefineFormOptions"
---

> **DefineFormOptions** = `object`

Defined in: [core/src/schema/form.ts:17](https://github.com/VueEasyForm/tgb-form/blob/505349e0f3477e72b1dfc77322d867e6b64238da/packages/core/src/schema/form.ts#L17)

Optional registries used by [defineForm](/api/core/src/functions/defineform/) and [deserializeForm](/api/core/src/functions/deserializeform/).

## Properties

### renderers?

> `readonly` `optional` **renderers?**: [`RendererRegistry`](/api/core/src/type-aliases/rendererregistry/)

Defined in: [core/src/schema/form.ts:21](https://github.com/VueEasyForm/tgb-form/blob/505349e0f3477e72b1dfc77322d867e6b64238da/packages/core/src/schema/form.ts#L21)

Runtime registry used to resolve renderer component names and field-type defaults.

***

### validators?

> `readonly` `optional` **validators?**: [`ValidatorRegistry`](/api/core/src/type-aliases/validatorregistry/)

Defined in: [core/src/schema/form.ts:19](https://github.com/VueEasyForm/tgb-form/blob/505349e0f3477e72b1dfc77322d867e6b64238da/packages/core/src/schema/form.ts#L19)

Runtime registry used to resolve field custom validators by name.
