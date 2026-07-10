---
editUrl: false
next: false
prev: false
title: "FieldDefinition"
---

> **FieldDefinition** = `object`

Defined in: [core/src/schema/definitions.ts:17](https://github.com/VueEasyForm/tgb-form/blob/4e15a707001bbfb670d3e50c73bdd285a920798e/packages/core/src/schema/definitions.ts#L17)

A single JSON-serializable field definition.

Renderer hints (`component`, `props`) stay as data; framework packages turn
them into real components with [RendererRegistry](/api/core/src/type-aliases/rendererregistry/).

## Properties

### component?

> `readonly` `optional` **component?**: `string`

Defined in: [core/src/schema/definitions.ts:31](https://github.com/VueEasyForm/tgb-form/blob/4e15a707001bbfb670d3e50c73bdd285a920798e/packages/core/src/schema/definitions.ts#L31)

Renderer registry name to use instead of the default type renderer.

***

### defaultValue

> `readonly` **defaultValue**: [`JsonValue`](/api/core/src/type-aliases/jsonvalue/)

Defined in: [core/src/schema/definitions.ts:21](https://github.com/VueEasyForm/tgb-form/blob/4e15a707001bbfb670d3e50c73bdd285a920798e/packages/core/src/schema/definitions.ts#L21)

Initial field value; must match the field [type](/api/core/src/type-aliases/fielddefinition/#type).

***

### description?

> `readonly` `optional` **description?**: `string`

Defined in: [core/src/schema/definitions.ts:25](https://github.com/VueEasyForm/tgb-form/blob/4e15a707001bbfb670d3e50c73bdd285a920798e/packages/core/src/schema/definitions.ts#L25)

Longer help text or explanation for renderers.

***

### element?

> `readonly` `optional` **element?**: `FieldDefinition`

Defined in: [core/src/schema/definitions.ts:41](https://github.com/VueEasyForm/tgb-form/blob/4e15a707001bbfb670d3e50c73bdd285a920798e/packages/core/src/schema/definitions.ts#L41)

Element definition for array-valued fields.

***

### fields?

> `readonly` `optional` **fields?**: [`FormFieldsDefinition`](/api/core/src/type-aliases/formfieldsdefinition/)

Defined in: [core/src/schema/definitions.ts:39](https://github.com/VueEasyForm/tgb-form/blob/4e15a707001bbfb670d3e50c73bdd285a920798e/packages/core/src/schema/definitions.ts#L39)

Child fields for object-valued fields.

***

### label?

> `readonly` `optional` **label?**: `string`

Defined in: [core/src/schema/definitions.ts:23](https://github.com/VueEasyForm/tgb-form/blob/4e15a707001bbfb670d3e50c73bdd285a920798e/packages/core/src/schema/definitions.ts#L23)

Human-readable field label for renderers.

***

### meta?

> `readonly` `optional` **meta?**: [`JsonObject`](/api/core/src/type-aliases/jsonobject/)

Defined in: [core/src/schema/definitions.ts:29](https://github.com/VueEasyForm/tgb-form/blob/4e15a707001bbfb670d3e50c73bdd285a920798e/packages/core/src/schema/definitions.ts#L29)

JSON-safe application metadata carried with the field definition.

***

### order?

> `readonly` `optional` **order?**: `number`

Defined in: [core/src/schema/definitions.ts:27](https://github.com/VueEasyForm/tgb-form/blob/4e15a707001bbfb670d3e50c73bdd285a920798e/packages/core/src/schema/definitions.ts#L27)

Optional display ordering hint for renderers.

***

### props?

> `readonly` `optional` **props?**: [`JsonObject`](/api/core/src/type-aliases/jsonobject/)

Defined in: [core/src/schema/definitions.ts:33](https://github.com/VueEasyForm/tgb-form/blob/4e15a707001bbfb670d3e50c73bdd285a920798e/packages/core/src/schema/definitions.ts#L33)

JSON-safe renderer props passed to the selected component.

***

### rules?

> `readonly` `optional` **rules?**: readonly [`ValidationRule`](/api/core/src/type-aliases/validationrule/)[]

Defined in: [core/src/schema/definitions.ts:35](https://github.com/VueEasyForm/tgb-form/blob/4e15a707001bbfb670d3e50c73bdd285a920798e/packages/core/src/schema/definitions.ts#L35)

Built-in validation rules applied when compiling the field.

***

### type

> `readonly` **type**: [`FieldDataType`](/api/core/src/enumerations/fielddatatype/)

Defined in: [core/src/schema/definitions.ts:19](https://github.com/VueEasyForm/tgb-form/blob/4e15a707001bbfb670d3e50c73bdd285a920798e/packages/core/src/schema/definitions.ts#L19)

JSON-safe data type used to choose validation and default-value checks.

***

### validators?

> `readonly` `optional` **validators?**: readonly [`CustomValidatorReference`](/api/core/src/type-aliases/customvalidatorreference/)[]

Defined in: [core/src/schema/definitions.ts:37](https://github.com/VueEasyForm/tgb-form/blob/4e15a707001bbfb670d3e50c73bdd285a920798e/packages/core/src/schema/definitions.ts#L37)

Named custom validators resolved from a runtime validator registry.
