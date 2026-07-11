<script setup lang="ts">
  type FieldBinding = {
    handleBlur(): void;
    handleChange(value: boolean): void;
  };

  defineProps<{
    label?: string;
    value?: boolean;
    field: FieldBinding;
  }>();
</script>

<template>
  <label class="field field-checkbox">
    <input
      type="checkbox"
      :checked="value"
      @change="field.handleChange(($event.target as HTMLInputElement).checked)"
      @blur="field.handleBlur"
    />
    <span>{{ label }}</span>
  </label>
</template>
