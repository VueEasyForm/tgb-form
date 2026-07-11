<script setup lang="ts">
  import { inject, provide } from 'vue';
  import { useForm } from '@tanstack/vue-form';
  import {
    toTanStackOptions,
    type FormDefinition,
    type RuntimeFormDefinition,
    type TgbFormTanStackOptions,
  } from '@tgb-form/core';
  import TgbFormField from './TgbFormField.vue';
  import { TgbFormInstanceKey, TgbFormRegistriesKey } from './context';
  import type { TgbFormTanStackForm, VueRendererRegistry } from './types';

  defineOptions({ name: 'TgbForm' });

  const props = defineProps<{
    definition: RuntimeFormDefinition;
    instance?: TgbFormTanStackForm;
    tanstackOptions?: TgbFormTanStackOptions;
    renderers?: VueRendererRegistry;
    fields?: readonly string[];
  }>();

  const registries = inject(TgbFormRegistriesKey, null);
  const resolveRenderers = () => props.renderers ?? registries?.renderers;
  const form =
    props.instance ??
    (useForm(
      toTanStackOptions(props.definition, props.tanstackOptions) as Record<string, unknown>,
    ) as unknown as TgbFormTanStackForm);

  provide(TgbFormInstanceKey, form);

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
