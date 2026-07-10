---
editUrl: false
next: false
prev: false
title: "CustomValidatorReference"
---

> **CustomValidatorReference** = `object`

Defined in: [core/src/schema/rules.ts:45](https://github.com/VueEasyForm/tgb-form/blob/116ebfe00d30a36ed6447b9ac893611229bfde62/packages/core/src/schema/rules.ts#L45)

Reference to a code-defined validator in a [ValidatorRegistry](/api/core/src/type-aliases/validatorregistry/).

## Properties

### message?

> `readonly` `optional` **message?**: `string`

Defined in: [core/src/schema/rules.ts:49](https://github.com/VueEasyForm/tgb-form/blob/116ebfe00d30a36ed6447b9ac893611229bfde62/packages/core/src/schema/rules.ts#L49)

Optional message passed to the custom validator factory.

***

### name

> `readonly` **name**: `string`

Defined in: [core/src/schema/rules.ts:47](https://github.com/VueEasyForm/tgb-form/blob/116ebfe00d30a36ed6447b9ac893611229bfde62/packages/core/src/schema/rules.ts#L47)

Registry name of the custom validator to run for the field.

***

### options?

> `readonly` `optional` **options?**: [`JsonObject`](/api/core/src/type-aliases/jsonobject/)

Defined in: [core/src/schema/rules.ts:51](https://github.com/VueEasyForm/tgb-form/blob/116ebfe00d30a36ed6447b9ac893611229bfde62/packages/core/src/schema/rules.ts#L51)

JSON-safe options passed to the custom validator factory.
