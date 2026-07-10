# @tgb-form/vue

Vue 3 adapter for TGB Form definitions and TanStack Vue Form.

The adapter renders a `RuntimeFormDefinition` with `TgbForm`, resolves fields through a Vue renderer registry, and passes TanStack field state to renderer components.

## Supported Flows

- Implicit: `TgbForm` creates the TanStack form instance and reads renderers from `TgbFormProvider`.
- Hybrid: pass either `instance` or `renderers`, while `TgbForm` supplies the rest.
- Fully explicit: pass both `instance` and `renderers` directly to `TgbForm`.

## Public API

- `TgbFormProvider`
- `TgbForm`
- `TgbFormField`
- `createVueRendererRegistry`
- `BaseVueRendererProps`
- `VueRenderer`
- `VueRendererField`
- `VueRendererProps`
- `VueRendererRegistry`
- `TgbFormTanStackForm`

## Quick Start

```vue
<script setup lang="ts">
  import { defineComponent, h } from 'vue';
  import { defineForm, FieldDataType, ValidationRuleKind } from '@tgb-form/core';
  import { TgbForm, TgbFormProvider, createVueRendererRegistry } from '@tgb-form/vue';

  const definition = defineForm({
    fields: {
      email: {
        type: FieldDataType.String,
        defaultValue: '',
        label: 'Email',
        component: 'email-input',
        props: { placeholder: 'you@example.com' },
        rules: [{ kind: ValidationRuleKind.Email, message: 'Enter a valid email' }],
      },
    },
  });

  const TextField = defineComponent({
    props: ['field', 'label', 'props', 'value', 'errors'],
    setup(props) {
      return () =>
        h('label', [
          h('span', props.label),
          h('input', {
            value: props.value,
            placeholder: props.props?.placeholder,
            onBlur: props.field.handleBlur,
            onInput: (event: Event) => {
              props.field.handleChange((event.target as HTMLInputElement).value);
            },
          }),
          props.errors?.length ? h('small', props.errors.join(', ')) : null,
        ]);
    },
  });

  const renderers = createVueRendererRegistry({
    byName: {
      'email-input': TextField,
    },
    byType: {
      [FieldDataType.String]: TextField,
    },
  });
</script>

<template>
  <TgbFormProvider :renderers="renderers">
    <TgbForm
      :definition="definition"
      :tanstack-options="{ onSubmit: async ({ value }) => console.log(value) }"
    />
  </TgbFormProvider>
</template>
```

## Component Props

`TgbFormProvider` accepts:

- `renderers`: renderer registry shared by descendant forms and fields.

`TgbForm` accepts:

- `definition`: normalized form definition.
- `instance`: optional TanStack form instance created by `useForm`.
- `tanstackOptions`: options merged into `toTanStackOptions` when `TgbForm` creates the form.
- `renderers`: renderer registry; overrides provider.
- `fields`: optional list of field names to render.

`TgbFormField` accepts:

- `name`: field name.
- `field`: field definition.
- `renderers`: optional renderer registry; overrides provider.

Renderer props include `name`, `field`, `form`, `label`, `description`, `props`, `value`, and `errors`.
