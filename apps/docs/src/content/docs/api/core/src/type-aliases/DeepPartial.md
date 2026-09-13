---
editUrl: false
next: false
prev: false
title: 'DeepPartial'
---

> **DeepPartial**\<`T`> \> = `T` _extends_ readonly `unknown`[] ? `T` : `T` _extends_ `Record`\<`string`, `unknown`> \> ? `{ readonly [TKey in keyof T]?: DeepPartial<T[TKey]> }` : `T`

Defined in: [core/src/tanstack.ts:34](https://github.com/VueEasyForm/tgb-form/blob/c15b3d9af923dd134fe61f8d88685aed586346d1/packages/core/src/tanstack.ts#L34)

Deep partial used for `defaultValues` overrides: objects merge key-wise
while arrays are replaced wholesale, so a nested override can never
silently drop sibling values.

## Type Parameters

### T

`T`
