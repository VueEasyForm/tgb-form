---
editUrl: false
next: false
prev: false
title: "RendererRegistry"
---

> **RendererRegistry**\<`TByName`, `TByType`\> = `object`

Defined in: [core/src/renderer-registry.ts:7](https://github.com/VueEasyForm/tgb-form/blob/f18a2074ed91609dbede1c09a33dcf325f5c78db/packages/core/src/renderer-registry.ts#L7)

Registry used by framework adapters to resolve [FieldDefinition](/api/core/src/type-aliases/fielddefinition/) values to user components.

## Type Parameters

### TByName

`TByName` *extends* `Readonly`\<`Record`\<`string`, `unknown`\>\> = `Readonly`\<`Record`\<`string`, `unknown`\>\>

### TByType

`TByType` *extends* `Partial`\<`Readonly`\<`Record`\<[`FieldDataType`](/api/core/src/enumerations/fielddatatype/), `unknown`\>\>\> = `Partial`\<`Readonly`\<`Record`\<[`FieldDataType`](/api/core/src/enumerations/fielddatatype/), `unknown`\>\>\>

## Properties

### byName

> `readonly` **byName**: `TByName`

Defined in: [core/src/renderer-registry.ts:13](https://github.com/VueEasyForm/tgb-form/blob/f18a2074ed91609dbede1c09a33dcf325f5c78db/packages/core/src/renderer-registry.ts#L13)

***

### byType

> `readonly` **byType**: `TByType`

Defined in: [core/src/renderer-registry.ts:14](https://github.com/VueEasyForm/tgb-form/blob/f18a2074ed91609dbede1c09a33dcf325f5c78db/packages/core/src/renderer-registry.ts#L14)
