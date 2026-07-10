---
editUrl: false
next: false
prev: false
title: "createRendererRegistry"
---

> **createRendererRegistry**\<`TByName`, `TByType`\>(`registry`): [`RendererRegistry`](/api/core/src/type-aliases/rendererregistry/)\<`TByName`, `TByType`\>

Defined in: [core/src/renderer-registry.ts:25](https://github.com/VueEasyForm/tgb-form/blob/116ebfe00d30a36ed6447b9ac893611229bfde62/packages/core/src/renderer-registry.ts#L25)

Creates a [RendererRegistry](/api/core/src/type-aliases/rendererregistry/) while preserving literal renderer names for type checking.

## Type Parameters

### TByName

`TByName` *extends* `Readonly`\<`Record`\<`string`, `unknown`\>\> = \{ \}

### TByType

`TByType` *extends* `Partial`\<`Readonly`\<`Record`\<[`FieldDataType`](/api/core/src/enumerations/fielddatatype/), `unknown`\>\>\> = \{ \}

## Parameters

### registry

#### byName?

`TByName`

#### byType?

`TByType`

## Returns

[`RendererRegistry`](/api/core/src/type-aliases/rendererregistry/)\<`TByName`, `TByType`\>
