---
editUrl: false
next: false
prev: false
title: "InferFieldValue"
---

> **InferFieldValue**\<`TField`\> = `TField` *extends* `object` ? `string` : `TField` *extends* `object` ? `number` : `TField` *extends* `object` ? `boolean` : `TField` *extends* `object` ? `{ -readonly [TKey in keyof TInner]: InferFieldValue<TInner[TKey]> }` : `TField` *extends* `object` ? [`JsonObject`](/api/core/src/type-aliases/jsonobject/) : `TField` *extends* `object` ? `InferFieldValue`\<`TElement`\>[] : `TField` *extends* `object` ? [`JsonValue`](/api/core/src/type-aliases/jsonvalue/)[] : [`JsonValue`](/api/core/src/type-aliases/jsonvalue/)

Defined in: [core/src/tanstack.ts:17](https://github.com/VueEasyForm/tgb-form/blob/4abca4e321d3cb38a962279facfd6a43229347a1/packages/core/src/tanstack.ts#L17)

Maps a single [FieldDefinition](/api/core/src/type-aliases/fielddefinition/) to the runtime value type it stores,
recursing into nested object fields and array elements.

## Type Parameters

### TField

`TField` *extends* [`FieldDefinition`](/api/core/src/type-aliases/fielddefinition/)
