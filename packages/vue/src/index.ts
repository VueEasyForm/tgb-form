import {
  createRendererRegistry,
  resolveRenderer,
  type FieldDefinition,
  type FieldDataType,
  type FormDefinition,
  type JsonObject,
  type RendererRegistry,
} from '@easyform/core';
import type { AnyFieldApi, AnyFormApi, VueFormApi } from '@tanstack/vue-form';
import { defineComponent, h, markRaw, toRaw, type Component, type PropType } from 'vue';

export type VueRendererProps = {
  readonly name: string;
  readonly field: AnyFieldApi;
  readonly form: EasyFormTanStackForm;
  readonly label?: string;
  readonly description?: string;
  readonly props?: JsonObject;
  readonly value: unknown;
  readonly errors: readonly unknown[];
};

export type VueRenderer = Component;

export type VueRendererRegistry<
  TByName extends Readonly<Record<string, VueRenderer>> = Readonly<Record<string, VueRenderer>>,
  TByType extends Partial<Readonly<Record<FieldDataType, VueRenderer>>> = Partial<
    Readonly<Record<FieldDataType, VueRenderer>>
  >,
> = RendererRegistry<TByName, TByType>;

type TanStackFieldSlotProps = {
  readonly field: AnyFieldApi & {
    readonly state?: {
      readonly value?: unknown;
      readonly meta?: {
        readonly errors?: readonly unknown[];
      };
    };
    readonly [key: string]: unknown;
  };
  readonly state?: {
    readonly value?: unknown;
    readonly meta?: {
      readonly errors?: readonly unknown[];
    };
  };
};

export type EasyFormTanStackForm = AnyFormApi &
  VueFormApi<any, any, any, any, any, any, any, any, any, any, any, any>;

type EasyFormCompatibleForm = EasyFormTanStackForm & {
  readonly [key: string]: unknown;
};

type SubmitLikeEvent = {
  preventDefault(): void;
};

export type EasyFormProps = {
  readonly form: EasyFormCompatibleForm;
  readonly definition: FormDefinition;
  readonly renderers: VueRendererRegistry;
  readonly fields?: readonly string[];
};

export type EasyFieldProps = {
  readonly form: EasyFormCompatibleForm;
  readonly name: string;
  readonly field: FieldDefinition;
  readonly renderers: VueRendererRegistry;
};

export function createVueRendererRegistry<
  const TByName extends Readonly<Record<string, VueRenderer>> = {},
  const TByType extends Partial<Readonly<Record<FieldDataType, VueRenderer>>> = {},
>(registry: {
  readonly byName?: TByName;
  readonly byType?: TByType;
}): VueRendererRegistry<TByName, TByType> {
  return createRendererRegistry(registry);
}

export const EasyField = defineComponent({
  name: 'EasyField',
  props: {
    form: {
      type: Object as PropType<EasyFormCompatibleForm>,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    field: {
      type: Object as PropType<FieldDefinition>,
      required: true,
    },
    renderers: {
      type: Object as PropType<VueRendererRegistry>,
      required: true,
    },
  },
  setup(props) {
    return () => {
      const FieldComponent = markRaw(toRaw(props.form.Field) as Component);
      const Renderer = markRaw(toRaw(resolveRenderer(props.field, props.renderers)) as VueRenderer);

      return h(
        FieldComponent,
        { name: props.name },
        {
          default: ({ field, state }: TanStackFieldSlotProps) =>
            h(Renderer, {
              name: props.name,
              field,
              form: props.form,
              label: props.field.label,
              description: props.field.description,
              props: props.field.props,
              value: state?.value ?? field.state?.value,
              errors: state?.meta?.errors ?? field.state?.meta?.errors ?? [],
            }),
        },
      );
    };
  },
});

export const EasyForm = defineComponent({
  name: 'EasyForm',
  props: {
    form: {
      type: Object as PropType<EasyFormCompatibleForm>,
      required: true,
    },
    definition: {
      type: Object as PropType<FormDefinition>,
      required: true,
    },
    renderers: {
      type: Object as PropType<VueRendererRegistry>,
      required: true,
    },
    fields: {
      type: Array as PropType<readonly string[]>,
      default: undefined,
    },
  },
  setup(props) {
    return () =>
      h(
        'form',
        {
          onSubmit: (event: SubmitLikeEvent) => {
            event.preventDefault();
            props.form.handleSubmit?.();
          },
        },
        getOrderedFields(props.definition, props.fields).map(({ name, field }) =>
          h(EasyField, {
            key: name,
            form: props.form,
            name,
            field,
            renderers: props.renderers,
          }),
        ),
      );
  },
});

function getOrderedFields(definition: FormDefinition, fields?: readonly string[]) {
  const fieldSet = fields ? new Set(fields) : undefined;

  return Object.entries(definition.fields)
    .map(([name, field], index) => ({ name, field, index }))
    .filter(({ name }) => !fieldSet || fieldSet.has(name))
    .sort(
      (left, right) =>
        (left.field.order ?? Number.POSITIVE_INFINITY) -
          (right.field.order ?? Number.POSITIVE_INFINITY) || left.index - right.index,
    );
}
