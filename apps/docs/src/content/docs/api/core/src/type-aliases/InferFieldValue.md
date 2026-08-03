---
editUrl: false
next: false
prev: false
title: "InferFieldValue"
---

> **InferFieldValue**\<`TField`\> = `TField` *extends* `object` ? `string` : `TField` *extends* `object` ? `number` : `TField` *extends* `object` ? `boolean` : `TField` *extends* `object` ? `{ -readonly [TKey in keyof TInner]: InferFieldValue<TInner[TKey]> }` : `TField` *extends* `object` ? [`JsonObject`](/api/core/src/type-aliases/jsonobject/) : `TField` *extends* `object` ? `InferFieldValue`\<`TElement`\>[] : `TField` *extends* `object` ? [`JsonValue`](/api/core/src/type-aliases/jsonvalue/)[] : [`JsonValue`](/api/core/src/type-aliases/jsonvalue/)

Defined in: [core/src/tanstack.ts:17](https://github.com/VueEasyForm/tgb-form/blob/505349e0f3477e72b1dfc77322d867e6b64238da/packages/core/src/tanstack.ts#L17)

Maps a single [FieldDefinition](/api/core/src/type-aliases/fielddefinition/) to the runtime value type it stores,
recursing into nested object fields and array elements.

## Type Parameters

### TField

`TField` *extends* [`FieldDefinition`](/api/core/src/type-aliases/fielddefinition/)
