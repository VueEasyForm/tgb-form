---
editUrl: false
next: false
prev: false
title: "createReactRendererRegistry"
---

> **createReactRendererRegistry**\<`TByName`, `TByType`\>(`registry`): [`ReactRendererRegistry`](/api/react/src/type-aliases/reactrendererregistry/)\<`TByName`, `TByType`\>

Defined in: [react/src/types.ts:48](https://github.com/VueEasyForm/tgb-form/blob/95df69fa6a1ea04dca9545f750466416c757786b/packages/react/src/types.ts#L48)

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
