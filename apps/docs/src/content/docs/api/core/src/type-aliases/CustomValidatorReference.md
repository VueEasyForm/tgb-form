---
editUrl: false
next: false
prev: false
title: "CustomValidatorReference"
---

> **CustomValidatorReference** = `object`

Defined in: [core/src/schema/rules.ts:45](https://github.com/VueEasyForm/tgb-form/blob/f18a2074ed91609dbede1c09a33dcf325f5c78db/packages/core/src/schema/rules.ts#L45)

Reference to a code-defined validator in a [ValidatorRegistry](/api/core/src/type-aliases/validatorregistry/).

## Properties

### message?

> `readonly` `optional` **message?**: `string`

Defined in: [core/src/schema/rules.ts:49](https://github.com/VueEasyForm/tgb-form/blob/f18a2074ed91609dbede1c09a33dcf325f5c78db/packages/core/src/schema/rules.ts#L49)

Optional message passed to the custom validator factory.

***

### name

> `readonly` **name**: `string`

Defined in: [core/src/schema/rules.ts:47](https://github.com/VueEasyForm/tgb-form/blob/f18a2074ed91609dbede1c09a33dcf325f5c78db/packages/core/src/schema/rules.ts#L47)

Registry name of the custom validator to run for the field.

***

### options?

> `readonly` `optional` **options?**: [`JsonObject`](/api/core/src/type-aliases/jsonobject/)

Defined in: [core/src/schema/rules.ts:51](https://github.com/VueEasyForm/tgb-form/blob/f18a2074ed91609dbede1c09a33dcf325f5c78db/packages/core/src/schema/rules.ts#L51)

JSON-safe options passed to the custom validator factory.
