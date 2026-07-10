import { createRendererRegistry, type FieldDataType, type RendererRegistry } from '@tgb-form/core';
import type { AnyFieldApi, AnyFormApi, VueFormApi } from '@tanstack/vue-form';
import type { Component } from 'vue';

export type VueRendererField = AnyFieldApi;

export type VueRendererProps = {
  readonly name: string;
  readonly field: VueRendererField;
  readonly form: TgbFormTanStackForm;
  readonly label?: string;
  readonly description?: string;
  readonly props?: Record<string, unknown>;
  readonly value: unknown;
  readonly errors: readonly unknown[];
};

export type BaseVueRendererProps = VueRendererProps;

export type VueRenderer = Component;

export type VueRendererRegistry<
  TByName extends Readonly<Record<string, VueRenderer>> = Readonly<Record<string, VueRenderer>>,
  TByType extends Partial<Readonly<Record<FieldDataType, VueRenderer>>> = Partial<
    Readonly<Record<FieldDataType, VueRenderer>>
  >,
> = RendererRegistry<TByName, TByType>;

export type TgbFormTanStackForm = AnyFormApi &
  VueFormApi<any, any, any, any, any, any, any, any, any, any, any, any>;

export function createVueRendererRegistry<
  const TByName extends Readonly<Record<string, VueRenderer>> = {},
  const TByType extends Partial<Readonly<Record<FieldDataType, VueRenderer>>> = {},
>(registry: {
  readonly byName?: TByName;
  readonly byType?: TByType;
}): VueRendererRegistry<TByName, TByType> {
  return createRendererRegistry(registry);
}
