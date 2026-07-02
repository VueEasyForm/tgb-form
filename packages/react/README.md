# @easyform/react

React adapter for EasyForm definitions.

## Public API

- `EasyForm`
- `EasyField`
- `createReactRendererRegistry`
- `EasyFormProps`
- `EasyFieldProps`
- `ReactRenderer`
- `ReactRendererProps`

## Usage

```tsx
import { FieldDataType, defineForm, toTanStackOptions } from '@easyform/core';
import { useForm } from '@tanstack/react-form';
import { EasyForm, createReactRendererRegistry, type ReactRendererProps } from '@easyform/react';

const definition = defineForm({
  fields: {
    email: {
      type: FieldDataType.String,
      defaultValue: '',
      label: 'Email',
      props: {
        placeholder: 'you@example.com',
      },
    },
  },
});

const renderers = createReactRendererRegistry({
  byType: {
    [FieldDataType.String]: TextField,
  },
});

function TextField({ field, label, name, props, value, errors }: ReactRendererProps) {
  return (
    <label>
      {label}
      <input
        name={name}
        onBlur={() => field.handleBlur()}
        onChange={(event) => field.handleChange(event.currentTarget.value)}
        placeholder={String(props?.placeholder ?? '')}
        value={String(value ?? '')}
      />
      {errors.map(String).join(', ')}
    </label>
  );
}

export function ContactForm() {
  const form = useForm({
    ...toTanStackOptions(definition),
    onSubmit({ value }) {
      console.log(value);
    },
  });

  return (
    <EasyForm
      definition={definition}
      form={form}
      renderers={renderers}
    />
  );
}
```

`EasyForm` renders fields by `order` and then declaration order. Pass `fields` to render a named subset. Renderer resolution follows `@easyform/core`: explicit `component` names are resolved first, then field `type`.
