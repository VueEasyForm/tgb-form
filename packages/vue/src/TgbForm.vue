<script setup lang="ts" generic="TForm extends RuntimeFormDefinition">
  import { inject, provide } from 'vue';
  import { useForm } from '@tanstack/vue-form';
  import {
    toTanStackOptions,
    type RuntimeFormDefinition,
    type TgbFormTanStackOptions,
  } from '@tgb-form/core';
  import TgbFormField from './TgbFormField.vue';
  import { TgbFormInstanceKey, TgbFormRegistriesKey } from './context';
  import type { TgbFormTanStackForm, VueRendererRegistry } from './types';

  defineOptions({ name: 'TgbForm' });

  const props = defineProps<{
    definition: TForm;
    instance?: Record<string, unknown>;
    tanstackOptions?: TgbFormTanStackOptions<TForm>;
    renderers?: VueRendererRegistry;
    fields?: readonly string[];
  }>();

  const registries = inject(TgbFormRegistriesKey, null);
  const resolveRenderers = () => props.renderers ?? registries?.renderers;
  const rawForm = useForm(toTanStackOptions(props.definition, props.tanstackOptions));
  // @ts-expect-error: useForm return ~ TgbFormTanStackForm structurally
  const form: TgbFormTanStackForm = props.instance ?? rawForm;

  provide(TgbFormInstanceKey, form);

  function getOrderedFields(definition: RuntimeFormDefinition, fields?: readonly string[]) {
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
</script>

<template>
  <form @submit.prevent="form.handleSubmit?.()">
    <TgbFormField
      v-for="{ name, field } in getOrderedFields(props.definition, props.fields)"
      :key="name"
      :name="name"
      :field="field"
      :renderers="resolveRenderers()"
    />
    <slot />
  </form>
</template>
