import { useState } from 'react';
import { FieldDataType, defineForm, toTanStackOptions } from '@easyform/core';
import { useForm } from '@tanstack/react-form';
import { EzForm, createReactRendererRegistry, type ReactRendererProps } from '../../src';

const definition = defineForm({
  fields: {
    name: {
      type: FieldDataType.String,
      defaultValue: '',
      label: 'Name',
      description: 'Shown on generated documents.',
      props: { placeholder: 'Ada Lovelace' },
      order: 1,
    },
    email: {
      type: FieldDataType.String,
      defaultValue: '',
      label: 'Email',
      description: 'Used for delivery confirmations.',
      props: { placeholder: 'ada@example.com' },
      order: 2,
    },
    subscribed: {
      type: FieldDataType.Boolean,
      defaultValue: true,
      label: 'Subscribe',
      description: 'Receive product updates.',
      order: 3,
    },
  },
});

const renderers = createReactRendererRegistry({
  byType: {
    [FieldDataType.Boolean]: BooleanRenderer,
    [FieldDataType.String]: TextRenderer,
  },
});

export function App() {
  const [submitted, setSubmitted] = useState<Record<string, unknown> | undefined>();

  const form = useForm({
    ...toTanStackOptions(definition),
    onSubmit({ value }: { value: Record<string, unknown> }) {
      setSubmitted(value);
    },
  } as any);

  return (
    <main className="app-shell">
      <EzForm
        className="easy-form"
        definition={definition}
        renderers={renderers}
        instance={form as any}
      />
      <pre>{JSON.stringify(submitted ?? null, null, 2)}</pre>
    </main>
  );
}

function TextRenderer({ description, field, label, name, props, value }: ReactRendererProps) {
  const textField = field as PlaygroundField;

  return (
    <label className="field">
      <span>{label}</span>
      <small>{description}</small>
      <input
        name={name}
        onChange={(event) => textField.handleChange(event.currentTarget.value)}
        placeholder={String(props?.placeholder ?? '')}
        value={String(value ?? '')}
      />
    </label>
  );
}

function BooleanRenderer({ description, field, label, name, value }: ReactRendererProps) {
  const booleanField = field as PlaygroundField;

  return (
    <label className="field field-inline">
      <input
        checked={Boolean(value)}
        name={name}
        onChange={(event) => booleanField.handleChange(event.currentTarget.checked)}
        type="checkbox"
      />
      <span>
        {label}
        <small>{description}</small>
      </span>
    </label>
  );
}
