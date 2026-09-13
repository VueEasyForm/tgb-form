---
editUrl: false
next: false
prev: false
title: 'TgbFormTanStackOptions'
---

> **TgbFormTanStackOptions**\<`TForm`> \> = `Omit`\<`Partial`\<`FormOptions`\<`FormValues`\<`TForm`>\>, `OpenSyncValidator`\<`FormValues`\<`TForm`>>\>\>, `OpenSyncValidator`\<`FormValues`\<`TForm`>>\>\>, `OpenAsyncValidator`\<`FormValues`\<`TForm`>>\>\>, `OpenSyncValidator`\<`FormValues`\<`TForm`>>\>\>, `OpenAsyncValidator`\<`FormValues`\<`TForm`>>\>\>, `OpenSyncValidator`\<`FormValues`\<`TForm`>>\>\>, `OpenAsyncValidator`\<`FormValues`\<`TForm`>>\>\>, `OpenSyncValidator`\<`FormValues`\<`TForm`>>\>\>, `OpenAsyncValidator`\<`FormValues`\<`TForm`>>\>\>, `OpenAsyncValidator`\<`FormValues`\<`TForm`>>\>\>, `unknown`>>\>\>, `"defaultValues"` \| `"validators"`> \> & `object`

Defined in: [core/src/tanstack.ts:51](https://github.com/VueEasyForm/tgb-form/blob/c15b3d9af923dd134fe61f8d88685aed586346d1/packages/core/src/tanstack.ts#L51)

Additional options forwarded to `useForm` by [toTanStackOptions](/api/core/src/functions/totanstackoptions/).

This is TanStack's own `FormOptions` for the inferred values — every `on*`
TanStack supports (form validators, listeners, submit handlers, debounce
options, …) is accepted without redeclaring them here. `defaultValues`
additionally accepts deep partials, which are merged over the definition
defaults.

## Type Declaration

### defaultValues?

> `readonly` `optional` **defaultValues?**: [`DeepPartial`](/api/core/src/type-aliases/deeppartial/)\<`FormValues`\<`TForm`>>\>\>

Partial overrides merged over the definition defaults (user wins).

### validators?

> `readonly` `optional` **validators?**: `FormValidators`\<`FormValues`\<`TForm`>\>, `OpenSyncValidator`\<`FormValues`\<`TForm`>>\>\>, `OpenSyncValidator`\<`FormValues`\<`TForm`>>\>\>, `OpenAsyncValidator`\<`FormValues`\<`TForm`>>\>\>, `OpenSyncValidator`\<`FormValues`\<`TForm`>>\>\>, `OpenAsyncValidator`\<`FormValues`\<`TForm`>>\>\>, `OpenSyncValidator`\<`FormValues`\<`TForm`>>\>\>, `OpenAsyncValidator`\<`FormValues`\<`TForm`>>\>\>, `OpenSyncValidator`\<`FormValues`\<`TForm`>>\>\>, `OpenAsyncValidator`\<`FormValues`\<`TForm`>>>\>\>\>

Form-level validators; an explicit `onSubmit` wins over the compiled schema.

## Type Parameters

### TForm

`TForm` _extends_ [`FormDefinition`](/api/core/src/type-aliases/formdefinition/)
