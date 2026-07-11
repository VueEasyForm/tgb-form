---
editUrl: false
next: false
prev: false
title: "createVueRendererRegistry"
---

> **createVueRendererRegistry**\<`TByName`, `TByType`\>(`registry`): [`VueRendererRegistry`](/api/vue/src/type-aliases/vuerendererregistry/)\<`TByName`, `TByType`\>

Defined in: [vue/src/types.ts:32](https://github.com/VueEasyForm/tgb-form/blob/f18a2074ed91609dbede1c09a33dcf325f5c78db/packages/vue/src/types.ts#L32)

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
