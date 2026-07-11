<script setup lang="ts">
  import { h, inject, markRaw, toRaw } from 'vue';
  import { resolveRenderer, type FieldDefinition } from '@tgb-form/core';
  import { TgbFormInstanceKey, TgbFormRegistriesKey } from './context';
  import type { VueRenderer, VueRendererRegistry } from './types';

  defineOptions({ name: 'TgbFormField' });

  const props = defineProps<{
    name: string;
    field: FieldDefinition;
    renderers?: VueRendererRegistry;
  }>();

  const registries = inject(TgbFormRegistriesKey, null);
  const form = inject(TgbFormInstanceKey, null);

  const resolveRenderers = () => {
    const renderers = props.renderers ?? registries?.renderers;

    if (!renderers) {
      throw new Error(
        'No renderer registry found. Pass a renderers prop to TgbFormField or to the parent TgbForm.',
      );
    }

    return renderers;
  };

  type TanStackFieldSlotProps = {
    readonly field: Record<string, unknown> & {
      readonly state?: {
        readonly value?: unknown;
        readonly meta?: {
          readonly errors?: readonly unknown[];
        };
      };
    };
    readonly state?: {
      readonly value?: unknown;
      readonly meta?: {
        readonly errors?: readonly unknown[];
      };
    };
  };
  const RenderField = () => {
    if (!form) {
      throw new Error('TgbFormField must be used inside a TgbForm component');
    }

    const FieldComponent = markRaw(toRaw((form as Record<string, unknown>).Field) as any);
    const Renderer = markRaw(
      toRaw(resolveRenderer(props.field, resolveRenderers())) as VueRenderer,
    );

    return h(
      FieldComponent,
      { name: props.name },
      {
        default: ({ field, state }: TanStackFieldSlotProps) =>
          h(Renderer, {
            name: props.name,
            field,
            form,
            label: props.field.label,
            description: props.field.description,
            props: props.field.props,
            value: state?.value ?? field.state?.value,
            errors: state?.meta?.errors ?? field.state?.meta?.errors ?? [],
          }),
      },
    );
  };
</script>

<template>
  <RenderField />
</template>
