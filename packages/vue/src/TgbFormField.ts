import { type PropType, defineComponent, h, inject, markRaw, toRaw } from 'vue';
import { resolveRenderer, type FieldDefinition } from '@tgb-form/core';
import { TgbFormInstanceKey, TgbFormRegistriesKey } from './TgbFormProvider';
import type { VueRenderer, VueRendererRegistry } from './types';

type TanStackFieldSlotProps = {
  readonly field: Record<string, unknown> & {
    readonly state?: {
      readonly value?: unknown;
      readonly meta?: {
        readonly errors?: readonly unknown[];
      };
    };
  };
  readonly state?: {
    readonly value?: unknown;
    readonly meta?: {
      readonly errors?: readonly unknown[];
    };
  };
};

export const TgbFormField = defineComponent({
  name: 'TgbFormField',
  props: {
    name: {
      type: String,
      required: true,
    },
    field: {
      type: Object as PropType<FieldDefinition>,
      required: true,
    },
    renderers: {
      type: Object as PropType<VueRendererRegistry | undefined>,
      default: undefined,
    },
  },
  setup(props) {
    return () => {
      const registries = inject(TgbFormRegistriesKey, null);
      const renderers = props.renderers ?? registries?.renderers;

      const form = inject(TgbFormInstanceKey, null);

      if (!form) {
        throw new Error('TgbFormField must be used inside a TgbForm component');
      }

      if (!renderers) {
        throw new Error(
          'No renderer registry found. Pass a renderers prop to TgbFormField or to the parent TgbForm.',
        );
      }

      const FieldComponent = markRaw(toRaw((form as Record<string, unknown>).Field) as any);
      const Renderer = markRaw(toRaw(resolveRenderer(props.field, renderers)) as VueRenderer);

      return h(
        FieldComponent,
        { name: props.name },
        {
          default: ({ field, state }: TanStackFieldSlotProps) =>
            h(Renderer, {
              name: props.name,
              field,
              form,
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
