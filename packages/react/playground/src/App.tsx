import type { ReactNode } from 'react';
import { useMemo, useState } from 'react';
import { FieldDataType, defineForm } from '@easyform/core';
import { EasyForm, createReactRendererRegistry, type ReactRendererProps } from '../../src';

type PlaygroundField = {
  readonly state: {
    readonly value: unknown;
    readonly meta: {
      readonly errors: readonly string[];
    };
  };
  readonly handleChange: (value: unknown) => void;
};

const definition = defineForm({
  fields: {
    name: {
      type: FieldDataType.String,
      defaultValue: '',
      label: 'Name',
      description: 'Shown on generated documents.',
      props: {
        placeholder: 'Ada Lovelace',
      },
      order: 1,
    },
    email: {
      type: FieldDataType.String,
      defaultValue: '',
      label: 'Email',
      description: 'Used for delivery confirmations.',
      props: {
        placeholder: 'ada@example.com',
      },
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
  const [values, setValues] = useState<Record<string, unknown>>({
    email: '',
    name: '',
    subscribed: true,
  });
  const [submitted, setSubmitted] = useState<Record<string, unknown> | undefined>();

  const form = useMemo(
    () => ({
      Field({
        name,
        children,
      }: {
        readonly name: string;
        readonly children: (field: PlaygroundField) => ReactNode;
      }) {
        return children({
          handleChange(value) {
            setValues((current) => ({
              ...current,
              [name]: value,
            }));
          },
          state: {
            meta: {
              errors: [],
            },
            value: values[name],
          },
        });
      },
      handleSubmit() {
        setSubmitted(values);
      },
    }),
    [values],
  );

  return (
    <main className="app-shell">
      <EasyForm
        className="easy-form"
        definition={definition}
        form={form}
        renderers={renderers}
      />
      <pre>{JSON.stringify(submitted ?? values, null, 2)}</pre>
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
