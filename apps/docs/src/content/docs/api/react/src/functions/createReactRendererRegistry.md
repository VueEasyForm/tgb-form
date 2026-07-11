---
editUrl: false
next: false
prev: false
title: "createReactRendererRegistry"
---

> **createReactRendererRegistry**\<`TByName`, `TByType`\>(`registry`): [`ReactRendererRegistry`](/api/react/src/type-aliases/reactrendererregistry/)\<`TByName`, `TByType`\>

Defined in: [react/src/types.ts:50](https://github.com/VueEasyForm/tgb-form/blob/d3e8e4a8ab0c1ee39d9256e2e460c9593b8ce0cc/packages/react/src/types.ts#L50)

## Type Parameters

### TByName

`TByName` *extends* `Readonly`\<`Record`\<`string`, `AnyReactRenderer`\>\> = \{ \}

### TByType

`TByType` *extends* `Partial`\<`Readonly`\<`Record`\<[`FieldDataType`](/api/core/src/enumerations/fielddatatype/), `AnyReactRenderer`\>\>\> = \{ \}

## Parameters

### registry

#### byName?

`TByName`

#### byType?

`TByType`

## Returns

[`ReactRendererRegistry`](/api/react/src/type-aliases/reactrendererregistry/)\<`TByName`, `TByType`\>
