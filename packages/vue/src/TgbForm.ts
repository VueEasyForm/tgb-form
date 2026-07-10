import { type PropType, defineComponent, h, inject, provide } from 'vue';
import { useForm } from '@tanstack/vue-form';
import {
  toTanStackOptions,
  type TgbFormTanStackOptions,
  type FormDefinition,
  type RuntimeFormDefinition,
} from '@tgb-form/core';
import { TgbFormField } from './TgbFormField';
import { TgbFormInstanceKey, TgbFormRegistriesKey } from './TgbFormProvider';
import type { TgbFormTanStackForm, VueRendererRegistry } from './types';

type SubmitLikeEvent = {
  preventDefault(): void;
};

export const TgbForm = defineComponent({
  name: 'TgbForm',
  props: {
    definition: {
      type: Object as PropType<RuntimeFormDefinition>,
      required: true,
    },
    instance: {
      type: Object as PropType<TgbFormTanStackForm>,
      default: undefined,
    },
    tanstackOptions: {
      type: Object as PropType<TgbFormTanStackOptions>,
      default: undefined,
    },
    renderers: {
      type: Object as PropType<VueRendererRegistry>,
      default: undefined,
    },
    fields: {
      type: Array as PropType<readonly string[]>,
      default: undefined,
    },
  },
  setup(props, { slots }) {
    const registries = inject(TgbFormRegistriesKey, null);
    const renderers = props.renderers ?? registries?.renderers;

    const form =
      props.instance !== undefined
        ? (props.instance as unknown as TgbFormTanStackForm)
        : (useForm(
            toTanStackOptions(props.definition, props.tanstackOptions) as Record<string, unknown>,
          ) as unknown as TgbFormTanStackForm);

    provide(TgbFormInstanceKey, form);

    return () => {
      const orderedFields = getOrderedFields(props.definition, props.fields);

      return h(
        'form',
        {
          onSubmit: (event: SubmitLikeEvent) => {
            event.preventDefault();
            form.handleSubmit?.();
          },
        },
        [
          ...orderedFields.map(({ name, field }) =>
            h(TgbFormField, {
              key: name,
              name,
              field,
              renderers,
            }),
          ),
          slots.default?.(),
        ].filter(Boolean),
      );
    };
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
