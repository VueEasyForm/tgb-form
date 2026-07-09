import type { ReactNode } from 'react';
import { FieldDataType, defineForm, toTanStackOptions } from '@easyform/core';
import { useForm } from '@tanstack/react-form';
import { afterEach, expect, test, vi } from 'vitest';
import { render } from 'vitest-browser-react';
import { EzForm, EzField, EzFormContext, createReactRendererRegistry, type ReactRendererProps } from '../src';

type FieldHarness = {
  state: {
    value: unknown;
    meta: {
      errors?: readonly unknown[];
    };
  };
  handleChange: (value: unknown) => void;
};

type FormHarness = {
  Field: (props: { name: string; children: (field: FieldHarness) => ReactNode }) => ReactNode;
  handleSubmit: () => void | Promise<void>;
};

function createFormHarness(
  values: Record<string, unknown>,
  errors: Record<string, readonly unknown[]> = {},
  handleSubmit: () => void | Promise<void> = vi.fn(),
): FormHarness {
  return {
    Field: ({ name, children }) =>
      children({
        state: {
          value: values[name],
          meta: {
            errors: errors[name],
          },
        },
        handleChange: vi.fn(),
      }),
    handleSubmit,
  };
}

const TextRenderer = ({ name, label, description, props, value, errors }: ReactRendererProps) => (
  <div data-testid={`field-${name}`}>
    <span data-testid={`label-${name}`}>{label}</span>
    <span data-testid={`description-${name}`}>{description}</span>
    <span data-testid={`placeholder-${name}`}>{props?.placeholder}</span>
    <span data-testid={`value-${name}`}>{String(value)}</span>
    <span data-testid={`errors-${name}`}>{errors.map(String).join(',')}</span>
  </div>
);

afterEach(() => {
  document.body.innerHTML = '';
});

test('renders fields by order before declaration order and supports field subsets', async () => {
  const definition = defineForm({
    fields: {
      alpha: { type: FieldDataType.String, defaultValue: 'a' },
      beta: { type: FieldDataType.String, defaultValue: 'b', order: 2 },
      gamma: { type: FieldDataType.String, defaultValue: 'g', order: 1 },
      delta: { type: FieldDataType.String, defaultValue: 'd', order: 1 },
    },
  });
  const renderers = createReactRendererRegistry({
    byType: { [FieldDataType.String]: TextRenderer },
  });

  const screen = await render(
    <EzForm
      definition={definition}
      fields={['alpha', 'gamma', 'delta']}
      instance={createFormHarness({ alpha: 'a', gamma: 'g', delta: 'd' })}
      renderers={renderers}
    />,
  );

  expect(screen.container.textContent).toContain('gda');
  expect(screen.container.querySelectorAll('[data-testid^="field-"]')).toHaveLength(3);
});

test('resolves named renderers before type renderers', async () => {
  const definition = defineForm({
    fields: {
      title: { type: FieldDataType.String, defaultValue: 'typed' },
      status: { type: FieldDataType.String, defaultValue: 'named', component: 'badge' },
    },
  });
  const TypeRenderer = ({ name }: ReactRendererProps) => (
    <div data-testid={`type-${name}`}>type</div>
  );
  const NamedRenderer = ({ name }: ReactRendererProps) => (
    <div data-testid={`named-${name}`}>named</div>
  );
  const renderers = createReactRendererRegistry({
    byName: { badge: NamedRenderer },
    byType: { [FieldDataType.String]: TypeRenderer },
  });

  const screen = await render(
    <EzForm
      definition={definition}
      instance={createFormHarness({ title: 'typed', status: 'named' })}
      renderers={renderers}
    />,
  );

  expect(screen.getByTestId('type-title')).toBeInTheDocument();
  expect(screen.getByTestId('named-status')).toBeInTheDocument();
});

test('reads renderers from EzFormContext', async () => {
  const definition = defineForm({
    fields: {
      email: { type: FieldDataType.String, defaultValue: '' },
    },
  });
  const renderers = createReactRendererRegistry({
    byType: { [FieldDataType.String]: TextRenderer },
  });

  const screen = await render(
    <EzFormContext renderers={renderers}>
      <EzForm
        definition={definition}
        instance={createFormHarness({ email: 'a@b.com' })}
      />
    </EzFormContext>,
  );

  expect(screen.getByTestId('field-email')).toBeInTheDocument();
});

test('prop-level renderers override context renderers', async () => {
  const definition = defineForm({
    fields: {
      name: { type: FieldDataType.String, defaultValue: '' },
    },
  });
  const ContextRenderer = ({ name }: ReactRendererProps) => (
    <div data-testid={`ctx-${name}`}>context</div>
  );
  const PropRenderer = ({ name }: ReactRendererProps) => (
    <div data-testid={`prop-${name}`}>prop</div>
  );
  const contextRenderers = createReactRendererRegistry({
    byType: { [FieldDataType.String]: ContextRenderer },
  });
  const propRenderers = createReactRendererRegistry({
    byType: { [FieldDataType.String]: PropRenderer },
  });

  const screen = await render(
    <EzFormContext renderers={contextRenderers}>
      <EzForm
        definition={definition}
        instance={createFormHarness({ name: 'test' })}
        renderers={propRenderers}
      />
    </EzFormContext>,
  );

  expect(screen.getByTestId('prop-name')).toBeInTheDocument();
  expect(screen.container.querySelector('[data-testid="ctx-name"]')).toBeNull();
});

test('passes renderer field metadata, value, errors, form, and field binding', async () => {
  const definition = defineForm({
    fields: {
      email: {
        type: FieldDataType.String,
        defaultValue: '',
        label: 'Email',
        description: 'Where confirmations go',
        props: { placeholder: 'you@example.test' },
      },
    },
  });
  const form = createFormHarness({ email: 'ada@example.test' }, { email: ['Required', 'Invalid'] });
  const Renderer = vi.fn(({ name, label, form: rendererForm, field }: ReactRendererProps) => (
    <div data-testid={`field-${name}`}>
      {label} {rendererForm === form ? 'same-form' : 'wrong-form'}{' '}
      {field ? 'has-field' : 'missing-field'}
    </div>
  ));
  const renderers = createReactRendererRegistry({
    byType: { [FieldDataType.String]: Renderer },
  });

  const screen = await render(
    <EzForm
      definition={definition}
      instance={form}
      renderers={renderers}
    />,
  );

  expect(screen.getByTestId('field-email')).toHaveTextContent('Email same-form has-field');
  expect(Renderer).toHaveBeenCalledWith(
    expect.objectContaining({
      name: 'email',
      form,
      label: 'Email',
      description: 'Where confirmations go',
      props: { placeholder: 'you@example.test' },
      value: 'ada@example.test',
      errors: ['Required', 'Invalid'],
    }),
    undefined,
  );
});

test('throws when no renderer can be resolved', async () => {
  const definition = defineForm({
    fields: {
      subscribed: { type: FieldDataType.Boolean, defaultValue: false },
    },
  });
  const renderers = createReactRendererRegistry({});

  await expect(() =>
    render(
      <EzForm
        definition={definition}
        instance={createFormHarness({ subscribed: false })}
        renderers={renderers}
      />,
    ),
  ).rejects.toThrow('Missing renderer for field type "boolean"');
});

test('submits through the provided TanStack form instance', async () => {
  const definition = defineForm({
    fields: {
      name: { type: FieldDataType.String, defaultValue: '' },
    },
  });
  const handleSubmit = vi.fn();
  const renderers = createReactRendererRegistry({
    byType: { [FieldDataType.String]: TextRenderer },
  });

  const screen = await render(
    <EzForm
      definition={definition}
      instance={createFormHarness({ name: 'Grace' }, {}, handleSubmit)}
      renderers={renderers}
    />,
  );

  screen.getByRole('form').element().requestSubmit();
  expect(handleSubmit).toHaveBeenCalledTimes(1);
});

test('renders and submits with a real @tanstack/react-form instance', async () => {
  const onSubmit = vi.fn();
  const definition = defineForm({
    fields: {
      email: { type: FieldDataType.String, defaultValue: 'ada@example.test' },
    },
  });
  const renderers = createReactRendererRegistry({
    byType: { [FieldDataType.String]: TextRenderer },
  });

  function Host() {
    const form = useForm(
      toTanStackOptions(definition, { onSubmit }) as any,
    );

    return (
      <EzForm
        definition={definition}
        instance={form as any}
        renderers={renderers}
      />
    );
  }

  const screen = await render(<Host />);
  screen.getByRole('form').element().requestSubmit();
  await vi.waitFor(() => expect(onSubmit).toHaveBeenCalledTimes(1));
  expect(onSubmit.mock.calls[0]?.[0]).toMatchObject({
    value: { email: 'ada@example.test' },
  });
});

test('renders children alongside fields', async () => {
  const definition = defineForm({
    fields: {
      name: { type: FieldDataType.String, defaultValue: '' },
    },
  });
  const renderers = createReactRendererRegistry({
    byType: { [FieldDataType.String]: TextRenderer },
  });

  const screen = await render(
    <EzForm
      definition={definition}
      instance={createFormHarness({ name: '' })}
      renderers={renderers}
    >
      <button type="submit">Go</button>
    </EzForm>,
  );

  expect(screen.container.querySelector('button')).toHaveTextContent('Go');
});

test('EzField throws when used outside EzForm', async () => {
  const definition = defineForm({
    fields: {
      x: { type: FieldDataType.String, defaultValue: '' },
    },
  });
  const renderers = createReactRendererRegistry({
    byType: { [FieldDataType.String]: TextRenderer },
  });

  await expect(() =>
    render(
      <EzField
        name="x"
        field={definition.fields.x}
        renderers={renderers}
      />,
    ),
  ).rejects.toThrow('EzField must be used inside an EzForm');
});
