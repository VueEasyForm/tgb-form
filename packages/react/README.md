# @tgb-form/react

React adapter for TGB Form definitions and TanStack React Form.

The adapter renders a `RuntimeFormDefinition` with `TgbForm`, resolves fields through a React renderer registry, and passes TanStack field state to renderer components.

## Supported Flows

- Implicit: `TgbForm` creates the TanStack form instance and reads renderers from `TgbFormContext`.
- Hybrid: pass either `instance` or `renderers`, while `TgbForm` supplies the rest.
- Fully explicit: pass both `instance` and `renderers` directly to `TgbForm`.

## Public API

- `TgbFormContext`
- `TgbForm`
- `TgbFormField`
- `createReactRendererRegistry`
- `BaseReactRendererProps`
- `ReactRenderer`
- `ReactRendererField`
- `ReactRendererProps`
- `ReactRendererRegistry`
- `ReactTgbFormInstance`

## Quick Start

```tsx
import { defineForm, FieldDataType, ValidationRuleKind } from '@tgb-form/core';
import {
  BaseReactRendererProps,
  TgbForm,
  TgbFormContext,
  createReactRendererRegistry,
} from '@tgb-form/react';

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

function TextField({ field, label, name, props, value, errors }: BaseReactRendererProps) {
  return (
    <label>
      <span>{label}</span>
      <input
        name={name}
        onBlur={() => field.handleBlur()}
        onChange={(event) => field.handleChange(event.currentTarget.value)}
        placeholder={String(props?.placeholder ?? '')}
        value={String(value ?? '')}
      />
      {errors.length > 0 ? <small>{errors.map(String).join(', ')}</small> : null}
    </label>
  );
}

const renderers = createReactRendererRegistry({
  byName: {
    'email-input': TextField,
  },
  byType: {
    [FieldDataType.String]: TextField,
  },
});

export function ContactForm() {
  return (
    <TgbFormContext renderers={renderers}>
      <TgbForm
        definition={definition}
        tanstackOptions={{
          onSubmit: async ({ value }) => {
            console.log(value);
          },
        }}
      >
        <button type="submit">Submit</button>
      </TgbForm>
    </TgbFormContext>
  );
}
```

## Component Props

`TgbForm` accepts:

- `definition`: normalized form definition.
- `instance`: optional TanStack form instance created by `useForm`.
- `tanstackOptions`: options merged into `toTanStackOptions` when `TgbForm` creates the form.
- `renderers`: renderer registry; overrides context.
- `fields`: optional list of field names to render.
- `children`: content rendered after generated fields.

`TgbFormField` accepts:

- `name`: field name.
- `field`: field definition.
- `renderers`: optional renderer registry; overrides context.

Renderer props include `name`, `field`, `form`, `label`, `description`, `props`, `value`, and `errors`.
