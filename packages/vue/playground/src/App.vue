<script setup lang="ts">
  import { ref } from 'vue';
  import { defineForm, FieldDataType, toTanStackOptions } from '@tgb-form/core';
  import { useForm } from '@tanstack/vue-form';
  import { TgbForm, createVueRendererRegistry } from '../../src';
  import CheckboxRenderer from './CheckboxRenderer.vue';
  import TextRenderer from './TextRenderer.vue';

  const submitted = ref('');

  const definition = defineForm({
    fields: {
      email: {
        type: FieldDataType.String,
        defaultValue: '',
        label: 'Email',
        description: 'Passed through to a Vue renderer component.',
        props: { placeholder: 'you@example.com' },
      },
      subscribed: {
        type: FieldDataType.Boolean,
        defaultValue: false,
        label: 'Subscribe to updates',
        order: 2,
      },
    },
  });

  const renderers = createVueRendererRegistry({
    byType: {
      [FieldDataType.String]: TextRenderer,
      [FieldDataType.Boolean]: CheckboxRenderer,
    },
  });

  const form = useForm(
    toTanStackOptions(definition, {
      onSubmit({ value }) {
        submitted.value = JSON.stringify(value, null, 2);
      },
    }),
  );
</script>

<template>
  <main>
    <section class="panel">
      <h1>Vue TgbForm Adapter</h1>
      <TgbForm
        :definition="definition"
        :instance="form"
        :renderers="renderers"
      />
      <pre v-if="submitted">{{ submitted }}</pre>
    </section>
  </main>
</template>
