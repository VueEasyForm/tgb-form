import { type PropType, defineComponent, h, inject, markRaw, toRaw } from 'vue';
import { resolveRenderer, type FieldDefinition } from '@easyform/core';
import { EzFormInstanceKey, EzFormRegistriesKey } from './EzFormProvider';
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

export const EzField = defineComponent({
  name: 'EzField',
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
      const registries = inject(EzFormRegistriesKey, null);
      const renderers = props.renderers ?? registries?.renderers;

      const form = inject(EzFormInstanceKey, null);

      if (!form) {
        throw new Error('EzField must be used inside an EzForm component');
      }

      if (!renderers) {
        throw new Error(
          'No renderer registry found. Pass a renderers prop to EzField or to the parent EzForm.',
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
