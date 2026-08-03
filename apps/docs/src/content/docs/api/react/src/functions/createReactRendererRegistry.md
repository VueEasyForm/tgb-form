---
editUrl: false
next: false
prev: false
title: "createReactRendererRegistry"
---

> **createReactRendererRegistry**\<`TByName`, `TByType`\>(`registry`): [`ReactRendererRegistry`](/api/react/src/type-aliases/reactrendererregistry/)\<`TByName`, `TByType`\>

Defined in: [react/src/types.ts:48](https://github.com/VueEasyForm/tgb-form/blob/505349e0f3477e72b1dfc77322d867e6b64238da/packages/react/src/types.ts#L48)

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
