<script setup lang="ts">
  import { provide } from 'vue';
  import { TgbFormRegistriesKey } from './context';
  import type { VueRendererRegistry } from './types';

  defineOptions({ name: 'TgbFormProvider' });

  const props = defineProps<{
    renderers?: VueRendererRegistry;
  }>();

  provide(TgbFormRegistriesKey, { renderers: props.renderers });
</script>

<template>
  <slot />
</template>
