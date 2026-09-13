---
editUrl: false
next: false
prev: false
title: 'FieldDefinitionInput'
---

> **FieldDefinitionInput**\<`TComponentName`> \> = `object` & `FieldInputOptions`\<`TComponentName`> \> \| `object` & `FieldInputOptions`\<`TComponentName`> \> \| `object` & `FieldInputOptions`\<`TComponentName`> \> \| `object` & `FieldInputOptions`\<`TComponentName`> \> \| `object` & `FieldInputOptions`\<`TComponentName`>\>

Defined in: [core/src/schema/form.ts:51](https://github.com/VueEasyForm/tgb-form/blob/c15b3d9af923dd134fe61f8d88685aed586346d1/packages/core/src/schema/form.ts#L51)

Authoring shape for a single [FieldDefinition](/api/core/src/type-aliases/fielddefinition/), discriminated by type
so the defaultValue always matches the declared data type.

## Type Parameters

### TComponentName

`TComponentName` _extends_ `string` = `string`
