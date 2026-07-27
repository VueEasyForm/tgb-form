---
editUrl: false
next: false
prev: false
title: "createVueRendererRegistry"
---

> **createVueRendererRegistry**\<`TByName`, `TByType`\>(`registry`): [`VueRendererRegistry`](/api/vue/src/type-aliases/vuerendererregistry/)\<`TByName`, `TByType`\>

Defined in: [vue/src/types.ts:35](https://github.com/VueEasyForm/tgb-form/blob/95df69fa6a1ea04dca9545f750466416c757786b/packages/vue/src/types.ts#L35)

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
