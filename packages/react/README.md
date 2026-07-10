# @easyform/react

React adapter for EasyForm definitions and TanStack React Form.

The adapter renders a `RuntimeFormDefinition` with `EzForm`, resolves fields through a React renderer registry, and passes TanStack field state to renderer components.

## Supported Flows

- Implicit: `EzForm` creates the TanStack form instance and reads renderers from `EzFormContext`.
- Hybrid: pass either `instance` or `renderers`, while `EzForm` supplies the rest.
- Fully explicit: pass both `instance` and `renderers` directly to `EzForm`.

## Public API

- `EzFormContext`
- `EzForm`
- `EzField`
- `createReactRendererRegistry`
- `BaseReactRendererProps`
- `ReactRenderer`
- `ReactRendererField`
- `ReactRendererProps`
- `ReactRendererRegistry`
- `ReactEasyFormInstance`

## Quick Start

```tsx
import { defineForm, FieldDataType, ValidationRuleKind } from '@easyform/core';
import {
  BaseReactRendererProps,
  EzForm,
  EzFormContext,
  createReactRendererRegistry,
} from '@easyform/react';

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
    <EzFormContext renderers={renderers}>
      <EzForm
        definition={definition}
        tanstackOptions={{
          onSubmit: async ({ value }) => {
            console.log(value);
          },
        }}
      >
        <button type="submit">Submit</button>
      </EzForm>
    </EzFormContext>
  );
}
```

## Component Props

`EzForm` accepts:

- `definition`: normalized form definition.
- `instance`: optional TanStack form instance created by `useForm`.
- `tanstackOptions`: options merged into `toTanStackOptions` when `EzForm` creates the form.
- `renderers`: renderer registry; overrides context.
- `fields`: optional list of field names to render.
- `children`: content rendered after generated fields.

`EzField` accepts:

- `name`: field name.
- `field`: field definition.
- `renderers`: optional renderer registry; overrides context.

Renderer props include `name`, `field`, `form`, `label`, `description`, `props`, `value`, and `errors`.
