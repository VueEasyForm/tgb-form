<script setup lang="ts">
  type FieldBinding = {
    handleBlur(): void;
    handleChange(value: string): void;
  };

  defineProps<{
    label?: string;
    description?: string;
    props?: { placeholder?: string };
    value?: string;
    field: FieldBinding;
  }>();
</script>

<template>
  <label class="field">
    <span class="field-label">{{ label }}</span>
    <input
      :value="value"
      :placeholder="props?.placeholder"
      @input="field.handleChange(($event.target as HTMLInputElement).value)"
      @blur="field.handleBlur"
    />
    <small v-if="description">{{ description }}</small>
  </label>
</template>
