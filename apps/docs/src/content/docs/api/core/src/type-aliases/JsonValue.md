---
editUrl: false
next: false
prev: false
title: 'JsonValue'
---

> **JsonValue** = [`JsonPrimitive`](/api/core/src/type-aliases/jsonprimitive/) \| [`JsonObject`](/api/core/src/type-aliases/jsonobject/) \| readonly `JsonValue`[]

Defined in: [core/src/schema/json.ts:15](https://github.com/VueEasyForm/tgb-form/blob/c15b3d9af923dd134fe61f8d88685aed586346d1/packages/core/src/schema/json.ts#L15)

Any JSON-serializable value accepted by [VJsonValue](/api/core/src/variables/vjsonvalue/).

Arrays are readonly: JSON data is never mutated in place, and this keeps
`const`-inferred literals (e.g. `['a', 'b']`) assignable without widening
them to `JsonValue[]`.
