import { type PropType, defineComponent, h, inject, provide } from 'vue';
import { useForm } from '@tanstack/vue-form';
import {
  toTanStackOptions,
  type EasyFormTanStackOptions,
  type FormDefinition,
  type RuntimeFormDefinition,
} from '@easyform/core';
import { EzField } from './EzField';
import { EzFormInstanceKey, EzFormRegistriesKey } from './EzFormProvider';
import type { EasyFormTanStackForm, VueRendererRegistry } from './types';

type SubmitLikeEvent = {
  preventDefault(): void;
};

export const EzForm = defineComponent({
  name: 'EzForm',
  props: {
    definition: {
      type: Object as PropType<RuntimeFormDefinition>,
      required: true,
    },
    instance: {
      type: Object as PropType<EasyFormTanStackForm>,
      default: undefined,
    },
    tanstackOptions: {
      type: Object as PropType<EasyFormTanStackOptions>,
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
    const registries = inject(EzFormRegistriesKey, null);
    const renderers = props.renderers ?? registries?.renderers;

    const form =
      props.instance !== undefined
        ? (props.instance as unknown as EasyFormTanStackForm)
        : (useForm(
            toTanStackOptions(props.definition, props.tanstackOptions) as Record<string, unknown>,
          ) as unknown as EasyFormTanStackForm);

    provide(EzFormInstanceKey, form);

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
            h(EzField, {
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
