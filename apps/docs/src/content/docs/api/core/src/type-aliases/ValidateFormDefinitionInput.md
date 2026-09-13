---
editUrl: false
next: false
prev: false
title: 'ValidateFormDefinitionInput'
---

> **ValidateFormDefinitionInput**\<`T`> \> = `T` _extends_ `object` ? `Omit`\<`T`, `"fields"`> \> & `object` : `T`

Defined in: [core/src/schema/form.ts:151](https://github.com/VueEasyForm/tgb-form/blob/c15b3d9af923dd134fe61f8d88685aed586346d1/packages/core/src/schema/form.ts#L151)

Applies [ValidateFieldDefinitionInput](/api/core/src/type-aliases/validatefielddefinitioninput/) to every top-level field while
preserving field names and sibling properties such as `meta`.

## Type Parameters

### T

`T`
