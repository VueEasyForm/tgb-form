---
editUrl: false
next: false
prev: false
title: "resolveRenderer"
---

> **resolveRenderer**\<`TRegistry`\>(`field`, `registry`): `ResolvedRenderer`\<`TRegistry`\>

Defined in: [core/src/renderer-registry.ts:43](https://github.com/VueEasyForm/tgb-form/blob/397eda42c5611a90c55569ab63ad273a22ef9b8c/packages/core/src/renderer-registry.ts#L43)

Resolves a [FieldDefinition](/api/core/src/type-aliases/fielddefinition/) renderer by explicit component name first, then by [FieldDataType](/api/core/src/enumerations/fielddatatype/).

Missing explicit component names throw instead of falling back to type renderers.

## Type Parameters

### TRegistry

`TRegistry` *extends* [`RendererRegistry`](/api/core/src/type-aliases/rendererregistry/)\<`Readonly`\<`Record`\<`string`, `unknown`\>\>, `Partial`\<`Readonly`\<`Record`\<[`FieldDataType`](/api/core/src/enumerations/fielddatatype/), `unknown`\>\>\>\>

## Parameters

### field

[`FieldDefinition`](/api/core/src/type-aliases/fielddefinition/)

### registry

`TRegistry`

## Returns

`ResolvedRenderer`\<`TRegistry`\>
