---
editUrl: false
next: false
prev: false
title: "ValidatorRegistry"
---

> **ValidatorRegistry** = `object`

Defined in: [core/src/validator-registry.ts:28](https://github.com/VueEasyForm/tgb-form/blob/d3e8e4a8ab0c1ee39d9256e2e460c9593b8ce0cc/packages/core/src/validator-registry.ts#L28)

Runtime-only registry for [CustomValidatorReference](/api/core/src/type-aliases/customvalidatorreference/) values referenced by name in JSON.

## Properties

### get

> `readonly` **get**: (`name`) => [`ValidatorCompiler`](/api/core/src/type-aliases/validatorcompiler/) \| `undefined`

Defined in: [core/src/validator-registry.ts:30](https://github.com/VueEasyForm/tgb-form/blob/d3e8e4a8ab0c1ee39d9256e2e460c9593b8ce0cc/packages/core/src/validator-registry.ts#L30)

#### Parameters

##### name

`string`

#### Returns

[`ValidatorCompiler`](/api/core/src/type-aliases/validatorcompiler/) \| `undefined`

***

### has

> `readonly` **has**: (`name`) => `boolean`

Defined in: [core/src/validator-registry.ts:31](https://github.com/VueEasyForm/tgb-form/blob/d3e8e4a8ab0c1ee39d9256e2e460c9593b8ce0cc/packages/core/src/validator-registry.ts#L31)

#### Parameters

##### name

`string`

#### Returns

`boolean`

***

### names

> `readonly` **names**: () => readonly `string`[]

Defined in: [core/src/validator-registry.ts:32](https://github.com/VueEasyForm/tgb-form/blob/d3e8e4a8ab0c1ee39d9256e2e460c9593b8ce0cc/packages/core/src/validator-registry.ts#L32)

#### Returns

readonly `string`[]

***

### register

> `readonly` **register**: (`name`, `compiler`) => `ValidatorRegistry`

Defined in: [core/src/validator-registry.ts:29](https://github.com/VueEasyForm/tgb-form/blob/d3e8e4a8ab0c1ee39d9256e2e460c9593b8ce0cc/packages/core/src/validator-registry.ts#L29)

#### Parameters

##### name

`string`

##### compiler

[`ValidatorCompiler`](/api/core/src/type-aliases/validatorcompiler/)

#### Returns

`ValidatorRegistry`
