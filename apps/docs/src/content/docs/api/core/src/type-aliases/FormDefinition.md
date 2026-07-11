---
editUrl: false
next: false
prev: false
title: "FormDefinition"
---

> **FormDefinition** = `object`

Defined in: [core/src/schema/definitions.ts:57](https://github.com/VueEasyForm/tgb-form/blob/397eda42c5611a90c55569ab63ad273a22ef9b8c/packages/core/src/schema/definitions.ts#L57)

A portable form definition that can be parsed by [VFormDefinition](/api/core/src/variables/vformdefinition/).

## Properties

### fields

> `readonly` **fields**: [`FormFieldsDefinition`](/api/core/src/type-aliases/formfieldsdefinition/)

Defined in: [core/src/schema/definitions.ts:59](https://github.com/VueEasyForm/tgb-form/blob/397eda42c5611a90c55569ab63ad273a22ef9b8c/packages/core/src/schema/definitions.ts#L59)

Top-level fields keyed by form field name.

***

### meta?

> `readonly` `optional` **meta?**: [`JsonObject`](/api/core/src/type-aliases/jsonobject/)

Defined in: [core/src/schema/definitions.ts:61](https://github.com/VueEasyForm/tgb-form/blob/397eda42c5611a90c55569ab63ad273a22ef9b8c/packages/core/src/schema/definitions.ts#L61)

JSON-safe application metadata carried with the form definition.
