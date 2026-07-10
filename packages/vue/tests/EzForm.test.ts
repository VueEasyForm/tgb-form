import {
  createRendererRegistry,
  defineForm,
  FieldDataType,
  toTanStackOptions,
} from '@easyform/core';
import { useForm } from '@tanstack/vue-form';
import { describe, expect, test, vi } from 'vitest';
import { render } from 'vitest-browser-vue';
import { defineComponent, h } from 'vue';
import {
  EzField,
  EzForm,
  EzFormProvider,
  createVueRendererRegistry,
  type VueRendererProps,
} from '../src';

function createFormStub(
  values: Record<string, unknown> = {},
  errors: Record<string, readonly string[]> = {},
) {
  return {
    handleSubmit: vi.fn(),
    Field: defineComponent({
      name: 'TanStackFieldStub',
      props: {
        name: { type: String, required: true },
      },
      setup(props, { slots }) {
        return () =>
          slots.default?.({
            field: {
              name: props.name,
              state: {
                value: values[props.name],
                meta: {
                  errors: errors[props.name] ?? [],
                },
              },
              handleBlur: vi.fn(),
              handleChange: vi.fn(),
            },
            state: {
              value: values[props.name],
              meta: {
                errors: errors[props.name] ?? [],
              },
            },
          });
      },
    }),
  };
}

const TraceRenderer = defineComponent({
  name: 'TraceRenderer',
  props: {
    name: { type: String, required: true },
    label: String,
    description: String,
    value: null,
    props: Object,
    errors: Array,
  },
  setup(props) {
    return () =>
      h(
        'output',
        { 'data-field': props.name },
        [
          props.name,
          props.label,
          props.description,
          (props.props as { placeholder?: string } | undefined)?.placeholder,
          String(props.value),
          (props.errors as string[]).join('|'),
        ]
          .filter(Boolean)
          .join(':'),
      );
  },
});

describe('EzForm', () => {
  test('renders fields by order and declaration order with an optional subset', () => {
    const definition = defineForm({
      fields: {
        firstDeclared: { type: FieldDataType.String, defaultValue: '' },
        orderedSecond: { type: FieldDataType.String, defaultValue: '', order: 2 },
        orderedFirst: { type: FieldDataType.String, defaultValue: '', order: 1 },
        hidden: { type: FieldDataType.String, defaultValue: '', order: 0 },
      },
    });
    const registry = createVueRendererRegistry({
      byType: { [FieldDataType.String]: TraceRenderer },
    });

    const page = render(EzForm, {
      props: {
        instance: createFormStub(),
        definition,
        renderers: registry,
        fields: ['firstDeclared', 'orderedSecond', 'orderedFirst'],
      },
    });

    expect(
      Array.from(page.container.querySelectorAll('output')).map((element) =>
        element.getAttribute('data-field'),
      ),
    ).toEqual(['orderedFirst', 'orderedSecond', 'firstDeclared']);
  });

  test('reads renderers from EzFormProvider', () => {
    const definition = defineForm({
      fields: {
        name: { type: FieldDataType.String, defaultValue: '' },
      },
    });
    const registry = createVueRendererRegistry({
      byType: { [FieldDataType.String]: TraceRenderer },
    });

    const page = render(EzFormProvider, {
      props: { renderers: registry },
      slots: {
        default: () =>
          h(EzForm, {
            instance: createFormStub({ name: 'Ada' }),
            definition,
          }),
      },
    });

    expect(page.container.querySelector('output')).toBeInTheDocument();
  });

  test('resolves named renderers before type renderers', () => {
    const NamedRenderer = defineComponent({
      name: 'NamedRenderer',
      props: { name: { type: String, required: true } },
      setup(props) {
        return () => h('output', { 'data-kind': 'named', 'data-name': props.name });
      },
    });
    const TypeRenderer = defineComponent({
      name: 'TypeRenderer',
      props: { name: { type: String, required: true } },
      setup(props) {
        return () => h('output', { 'data-kind': 'type', 'data-name': props.name });
      },
    });
    const definition = defineForm({
      fields: {
        email: { type: FieldDataType.String, defaultValue: '', component: 'email' },
        name: { type: FieldDataType.String, defaultValue: '' },
      },
    });
    const registry = createVueRendererRegistry({
      byName: { email: NamedRenderer },
      byType: { [FieldDataType.String]: TypeRenderer },
    });

    const page = render(EzForm, {
      props: {
        instance: createFormStub(),
        definition,
        renderers: registry,
      },
    });

    expect(
      Array.from(page.container.querySelectorAll('output')).map((element) => [
        element.getAttribute('data-kind'),
        element.getAttribute('data-name'),
      ]),
    ).toEqual([
      ['named', 'email'],
      ['type', 'name'],
    ]);
  });

  test('passes field metadata, value, errors, and renderer props to the renderer', () => {
    const received = vi.fn();
    const CapturingRenderer = defineComponent({
      name: 'CapturingRenderer',
      props: {
        name: { type: String, required: true },
        field: { type: Object, required: true },
        form: { type: Object, required: true },
        label: String,
        description: String,
        props: Object,
        value: null,
        errors: Array,
      },
      setup(props) {
        return () => {
          received({
            name: props.name,
            label: props.label,
            description: props.description,
            rendererProps: props.props,
            value: props.value,
            errors: props.errors,
          });
          return h('output', props.name);
        };
      },
    });
    const form = createFormStub({ email: 'ada@example.com' }, { email: ['Invalid email'] });
    const definition = defineForm({
      fields: {
        email: {
          type: FieldDataType.String,
          defaultValue: '',
          label: 'Email',
          description: 'Work address',
          props: { placeholder: 'ada@example.com' },
        },
      },
    });
    const registry = createVueRendererRegistry({
      byType: { [FieldDataType.String]: CapturingRenderer },
    });

    render(EzForm, {
      props: {
        instance: form,
        definition,
        renderers: registry,
      },
    });

    expect(received).toHaveBeenCalledWith({
      name: 'email',
      label: 'Email',
      description: 'Work address',
      rendererProps: { placeholder: 'ada@example.com' },
      value: 'ada@example.com',
      errors: ['Invalid email'],
    });
  });

  test('throws when no renderer can be resolved', () => {
    const definition = defineForm({
      fields: {
        email: { type: FieldDataType.String, defaultValue: '' },
      },
    });
    const registry = createRendererRegistry({});

    expect(() =>
      render(EzForm, {
        props: {
          instance: createFormStub(),
          definition,
          renderers: registry,
        },
      }),
    ).toThrow('Missing renderer for field type "string"');
  });

  test('throws when EzField is used outside EzForm', () => {
    const definition = defineForm({
      fields: {
        x: { type: FieldDataType.String, defaultValue: '' },
      },
    });
    const registry = createVueRendererRegistry({
      byType: { [FieldDataType.String]: TraceRenderer },
    });

    expect(() =>
      render(EzField, {
        props: {
          name: 'x',
          field: definition.fields.x,
          renderers: registry,
        },
      }),
    ).toThrow('EzField must be used inside an EzForm');
  });

  test('delegates form submission to the TanStack form instance', () => {
    const form = createFormStub();
    const definition = defineForm({
      fields: {
        email: { type: FieldDataType.String, defaultValue: '' },
      },
    });
    const registry = createVueRendererRegistry({
      byType: { [FieldDataType.String]: TraceRenderer },
    });

    const page = render(EzForm, {
      props: {
        instance: form,
        definition,
        renderers: registry,
      },
    });

    const submitEvent = new Event('submit', { bubbles: true, cancelable: true });
    page.container.querySelector('form')?.dispatchEvent(submitEvent);

    expect(submitEvent.defaultPrevented).toBe(true);
    expect(form.handleSubmit).toHaveBeenCalledTimes(1);
  });

  test('submits through an @tanstack/vue-form instance', async () => {
    const onSubmit = vi.fn();
    const definition = defineForm({
      fields: {
        email: { type: FieldDataType.String, defaultValue: 'ada@example.com' },
      },
    });
    const registry = createVueRendererRegistry({
      byType: { [FieldDataType.String]: TraceRenderer },
    });

    const Host = defineComponent({
      name: 'TanStackHost',
      setup() {
        const form = useForm(toTanStackOptions(definition, { onSubmit }) as any);

        return () =>
          h(EzForm, {
            instance: form as any,
            definition,
            renderers: registry,
          });
      },
    });

    const page = render(Host);
    const submitEvent = new Event('submit', { bubbles: true, cancelable: true });
    page.container.querySelector('form')?.dispatchEvent(submitEvent);
    await vi.waitFor(() => expect(onSubmit).toHaveBeenCalledTimes(1));
    expect(submitEvent.defaultPrevented).toBe(true);
    expect(onSubmit.mock.calls[0]?.[0]).toMatchObject({
      value: { email: 'ada@example.com' },
    });
  });
});
