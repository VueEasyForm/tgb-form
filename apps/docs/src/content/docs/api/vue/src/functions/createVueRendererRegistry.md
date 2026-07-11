---
editUrl: false
next: false
prev: false
title: "createVueRendererRegistry"
---

> **createVueRendererRegistry**\<`TByName`, `TByType`\>(`registry`): [`VueRendererRegistry`](/api/vue/src/type-aliases/vuerendererregistry/)\<`TByName`, `TByType`\>

Defined in: [vue/src/types.ts:32](https://github.com/VueEasyForm/tgb-form/blob/d3e8e4a8ab0c1ee39d9256e2e460c9593b8ce0cc/packages/vue/src/types.ts#L32)

## Type Parameters

### TByName

`TByName` *extends* `Readonly`\<`Record`\<`string`, [`VueRenderer`](/api/vue/src/type-aliases/vuerenderer/)\>\> = \{ \}

### TByType

`TByType` *extends* `Partial`\<`Readonly`\<`Record`\<[`FieldDataType`](/api/core/src/enumerations/fielddatatype/), [`VueRenderer`](/api/vue/src/type-aliases/vuerenderer/)\>\>\> = \{ \}

## Parameters

### registry

#### byName?

`TByName`

#### byType?

`TByType`

## Returns

[`VueRendererRegistry`](/api/vue/src/type-aliases/vuerendererregistry/)\<`TByName`, `TByType`\>
