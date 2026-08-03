<script setup lang="ts">
  import { defineForm, FieldDataType } from '@tgb-form/core';
  import { TgbForm } from '../src';

  const definition = defineForm({
    fields: {
      profile: {
        type: FieldDataType.Object,
        defaultValue: { email: 'ada@example.com' },
        fields: {
          email: { type: FieldDataType.String, defaultValue: 'ada@example.com' },
        },
      },
      age: { type: FieldDataType.Number, defaultValue: 30 },
    },
  });
</script>

<template>
  <TgbForm
    :definition="definition"
    :tanstack-options="{
      onSubmit: ({ value }) => {
        value.profile.email = 'grace@example.com';
        value.age += 1;
        // @ts-expect-error: age is a number
        value.age = 'not a number';
      },
    }"
  />
</template>
