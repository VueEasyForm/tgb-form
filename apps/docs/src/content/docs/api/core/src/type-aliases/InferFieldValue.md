---
editUrl: false
next: false
prev: false
title: 'InferFieldValue'
---

> **InferFieldValue**\<`TField`> \> = `TField` _extends_ `object` ? `string` : `TField` _extends_ `object` ? `number` : `TField` _extends_ `object` ? `boolean` : `TField` _extends_ `object` ? `{ -readonly [TKey in keyof TInner]: InferFieldValue<TInner[TKey]> }` : `TField` _extends_ `object` ? [`JsonObject`](/api/core/src/type-aliases/jsonobject/) : `TField` _extends_ `object` ? `InferFieldValue`\<`TElement`>\>[] : `TField` _extends_ `object` ? [`JsonValue`](/api/core/src/type-aliases/jsonvalue/)[] : [`JsonValue`](/api/core/src/type-aliases/jsonvalue/)

Defined in: [core/src/schema/infer.ts:9](https://github.com/VueEasyForm/tgb-form/blob/c15b3d9af923dd134fe61f8d88685aed586346d1/packages/core/src/schema/infer.ts#L9)

Maps a single [FieldDefinition](/api/core/src/type-aliases/fielddefinition/) to the runtime value type it stores,
recursing into nested object fields and array elements.

## Type Parameters

### TField

`TField` _extends_ [`FieldDefinition`](/api/core/src/type-aliases/fielddefinition/)
