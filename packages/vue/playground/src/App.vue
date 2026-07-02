<script setup lang="ts">
  import { defineComponent, h, ref } from 'vue';
  import { defineForm, FieldDataType, toTanStackOptions } from '@easyform/core';
  import { useForm } from '@tanstack/vue-form';
  import { EasyForm, createVueRendererRegistry } from '../../src';

  const submitted = ref('');

  const TextRenderer = defineComponent({
    name: 'TextRenderer',
    props: ['label', 'description', 'props', 'value', 'field'],
    setup(props) {
      return () =>
        h('label', { class: 'field' }, [
          h('span', { class: 'field-label' }, props.label),
          h('input', {
            value: props.value,
            placeholder: props.props?.placeholder,
            onInput: (event: Event) => {
              props.field.handleChange((event.target as HTMLInputElement).value);
            },
            onBlur: props.field.handleBlur,
          }),
          props.description ? h('small', props.description) : null,
        ]);
    },
  });

  const CheckboxRenderer = defineComponent({
    name: 'CheckboxRenderer',
    props: ['label', 'value', 'field'],
    setup(props) {
      return () =>
        h('label', { class: 'field field-checkbox' }, [
          h('input', {
            type: 'checkbox',
            checked: props.value,
            onChange: (event: Event) => {
              props.field.handleChange((event.target as HTMLInputElement).checked);
            },
            onBlur: props.field.handleBlur,
          }),
          h('span', props.label),
        ]);
    },
  });

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
      <h1>Vue EasyForm Adapter</h1>
      <EasyForm
        :form="form"
        :definition="definition"
        :renderers="renderers"
      />
      <pre v-if="submitted">{{ submitted }}</pre>
    </section>
  </main>
</template>
