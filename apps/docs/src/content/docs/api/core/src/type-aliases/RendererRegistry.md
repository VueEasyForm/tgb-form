---
editUrl: false
next: false
prev: false
title: "RendererRegistry"
---

> **RendererRegistry**\<`TByName`, `TByType`\> = `object`

Defined in: [core/src/renderer-registry.ts:7](https://github.com/VueEasyForm/tgb-form/blob/116ebfe00d30a36ed6447b9ac893611229bfde62/packages/core/src/renderer-registry.ts#L7)

Registry used by framework adapters to resolve [FieldDefinition](/api/core/src/type-aliases/fielddefinition/) values to user components.

## Type Parameters

### TByName

`TByName` *extends* `Readonly`\<`Record`\<`string`, `unknown`\>\> = `Readonly`\<`Record`\<`string`, `unknown`\>\>

### TByType

`TByType` *extends* `Partial`\<`Readonly`\<`Record`\<[`FieldDataType`](/api/core/src/enumerations/fielddatatype/), `unknown`\>\>\> = `Partial`\<`Readonly`\<`Record`\<[`FieldDataType`](/api/core/src/enumerations/fielddatatype/), `unknown`\>\>\>

## Properties

### byName

> `readonly` **byName**: `TByName`

Defined in: [core/src/renderer-registry.ts:13](https://github.com/VueEasyForm/tgb-form/blob/116ebfe00d30a36ed6447b9ac893611229bfde62/packages/core/src/renderer-registry.ts#L13)

***

### byType

> `readonly` **byType**: `TByType`

Defined in: [core/src/renderer-registry.ts:14](https://github.com/VueEasyForm/tgb-form/blob/116ebfe00d30a36ed6447b9ac893611229bfde62/packages/core/src/renderer-registry.ts#L14)
