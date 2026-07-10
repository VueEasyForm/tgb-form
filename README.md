# TGB Form

Define forms as data. Render them anywhere.

TGB Form is a small wrapper around TanStack Form and Valibot for teams that need form builders, generated forms, and stored schemas. A form definition stays JSON-safe. Runtime code supplies renderers, validators, and framework bindings.

## What

TGB Form gives you:

- JSON-serializable form definitions.
- Valibot schemas generated from field rules.
- TanStack Form options generated from the same definition.
- Renderer registries that map stored field hints to React or Vue components.
- Serialization and deserialization APIs for storing definitions in files, databases, CMS records, or builder output.
- Thin adapters that stay out of TanStack Form state management and Valibot schema design.

## Why

TanStack Form is a strong form state engine. Valibot is a strong validation engine. TGB Form adds the missing portable layer between them: a schema that can be authored, saved, loaded, validated, and rendered later.

That layer matters when forms are not only hand-written React or Vue code. It is useful when forms come from an admin builder, tenant configuration, server data, generated templates, or shared package definitions.

## Quick Start

Install the core package and the framework adapter you use:

```sh
pnpm add @tgb-form/core valibot @tanstack/form-core
pnpm add @tgb-form/react @tanstack/react-form
# or
pnpm add @tgb-form/vue @tanstack/vue-form
```

Define a form:

```ts
import { defineForm, FieldDataType, ValidationRuleKind } from '@tgb-form/core';

export const newsletterForm = defineForm({
  fields: {
    email: {
      type: FieldDataType.String,
      defaultValue: '',
      label: 'Email',
      component: 'email-input',
      props: { placeholder: 'you@example.com', autocomplete: 'email' },
      rules: [
        { kind: ValidationRuleKind.Required, message: 'Email is required' },
        { kind: ValidationRuleKind.Email, message: 'Enter a valid email' },
      ],
    },
    subscribed: {
      type: FieldDataType.Boolean,
      defaultValue: true,
      label: 'Subscribe',
    },
  },
});
```

Render it in React:

```tsx
import { FieldDataType } from '@tgb-form/core';
import { useForm } from '@tanstack/react-form';
import { BaseReactRendererProps, TgbForm, createReactRendererRegistry } from '@tgb-form/react';
import { newsletterForm } from './newsletter-form';

function TextInput({ field, label, name, props, value, errors }: BaseReactRendererProps) {
  return (
    <label>
      <span>{label}</span>
      <input
        name={name}
        value={String(value ?? '')}
        placeholder={String(props?.placeholder ?? '')}
        onBlur={() => field.handleBlur()}
        onChange={(event) => field.handleChange(event.currentTarget.value)}
      />
      {errors.length > 0 ? <small>{errors.map(String).join(', ')}</small> : null}
    </label>
  );
}

const renderers = createReactRendererRegistry({
  byName: { 'email-input': TextInput },
  byType: { [FieldDataType.String]: TextInput },
});

export function Newsletter() {
  return (
    <TgbForm
      definition={newsletterForm}
      renderers={renderers}
      tanstackOptions={{
        onSubmit: async ({ value }) => {
          console.log(value);
        },
      }}
    />
  );
}
```

Render it in Vue:

```vue
<script setup lang="ts">
  import { defineComponent, h } from 'vue';
  import { FieldDataType } from '@tgb-form/core';
  import { TgbForm, createVueRendererRegistry } from '@tgb-form/vue';
  import { newsletterForm } from './newsletter-form';

  const TextInput = defineComponent({
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
    byName: { 'email-input': TextInput },
    byType: { [FieldDataType.String]: TextInput },
  });
</script>

<template>
  <TgbForm
    :definition="newsletterForm"
    :renderers="renderers"
    :tanstack-options="{ onSubmit: async ({ value }) => console.log(value) }"
  />
</template>
```

## Core APIs

| API                                 | Purpose                                                           |
| ----------------------------------- | ----------------------------------------------------------------- |
| `defineForm(definition, options?)`  | Parse, validate, normalize, and clone a form definition.          |
| `serializeForm(form)`               | Return JSON-safe data and omit runtime-only registries.           |
| `deserializeForm(input, options?)`  | Parse stored JSON or unknown data back into a runtime definition. |
| `toValibotSchema(form)`             | Compile built-in and custom validation rules into Valibot.        |
| `toTanStackOptions(form, options?)` | Generate TanStack defaults and `validators.onSubmit`.             |
| `getDefaultValues(form)`            | Extract cloned default values from fields.                        |
| `createRendererRegistry(registry)`  | Preserve renderer names and type fallbacks.                       |
| `resolveRenderer(field, registry)`  | Resolve by `component`, then by field type.                       |
| `createValidatorRegistry()`         | Register named Valibot validators referenced by JSON data.        |

## Store And Restore

```ts
import { deserializeForm, serializeForm, toTanStackOptions } from '@tgb-form/core';
import { newsletterForm } from './newsletter-form';

const stored = JSON.stringify(serializeForm(newsletterForm));
const restored = deserializeForm(stored);
const options = toTanStackOptions(restored);
```

Renderer and validator registries are code, so they are attached at runtime instead of stored in JSON. Core keeps TanStack Form and Valibot explicit: `toTanStackOptions` returns plain TanStack options, `toValibotSchema` returns a plain Valibot schema, and the framework adapters only handle renderer lookup and field wiring.

## Packages

- `@tgb-form/core` - schema, normalization, validation, serialization, registries, TanStack helpers.
- `@tgb-form/react` - React components and renderer types for TanStack React Form.
- `@tgb-form/vue` - Vue components and renderer types for TanStack Vue Form.
- `@tgb-form/docs` - TanStack Start and Fumadocs documentation app.

## Development

```sh
pnpm install
pnpm test
pnpm check-types
pnpm build
```

Run the docs locally:

```sh
pnpm --filter @tgb-form/docs dev
```

## Repository

- GitHub: https://github.com/VueEasyForm/tgb-form
- Issues: https://github.com/VueEasyForm/tgb-form/issues
- Releasing: ./RELEASING.md
- License: MIT
