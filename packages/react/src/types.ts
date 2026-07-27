import type { ComponentType, ReactNode } from 'react';
import { createRendererRegistry } from '@tgb-form/core';
import type { FieldDataType, RendererRegistry } from '@tgb-form/core';
import type { AnyFieldApi } from '@tanstack/react-form';

export type ReactTgbFormInstance = {
  readonly Field: ComponentType<{
    readonly name: string;
    readonly children: (field: Record<string, unknown>) => ReactNode;
  }>;
  readonly handleSubmit: () => void | Promise<void>;
};

export type ReactRendererProps<
  TForm extends ReactTgbFormInstance = ReactTgbFormInstance,
  TField = ReactRendererField,
> = {
  readonly name: string;
  readonly field: TField;
  readonly form: TForm;
  readonly label: string | undefined;
  readonly description: string | undefined;
  readonly props: Record<string, unknown> | undefined;
  readonly value: unknown;
  readonly errors: readonly unknown[];
};

export type ReactRendererField = AnyFieldApi;

export type BaseReactRendererProps = ReactRendererProps<ReactTgbFormInstance, ReactRendererField>;

export type ReactRenderer<
  TForm extends ReactTgbFormInstance = ReactTgbFormInstance,
  TField = ReactRendererField,
> = ComponentType<ReactRendererProps<TForm, TField>>;

type AnyReactRenderer = ReactRenderer;

export type ReactRendererRegistry<
  TByName extends Readonly<Record<string, AnyReactRenderer>> = Readonly<
    Record<string, AnyReactRenderer>
  >,
  TByType extends Partial<Readonly<Record<FieldDataType, AnyReactRenderer>>> = Partial<
    Readonly<Record<FieldDataType, AnyReactRenderer>>
  >,
> = RendererRegistry<TByName, TByType>;

export function createReactRendererRegistry<
  const TByName extends Readonly<Record<string, AnyReactRenderer>> = {},
  const TByType extends Partial<Readonly<Record<FieldDataType, AnyReactRenderer>>> = {},
>(registry: {
  readonly byName?: TByName;
  readonly byType?: TByType;
}): ReactRendererRegistry<TByName, TByType> {
  return createRendererRegistry(registry);
}
