import type { ComponentType, ReactNode } from 'react';
import { createRendererRegistry } from '@tgb-form/core';
import type { FieldDataType, JsonObject, RendererRegistry } from '@tgb-form/core';
import type { AnyFieldApi } from '@tanstack/react-form';

type TanStackFieldRenderer = (field: any) => ReactNode;

export type ReactTgbFormInstance = {
  readonly Field: ComponentType<{
    readonly name: string;
    readonly children: TanStackFieldRenderer;
  }>;
  readonly handleSubmit: () => void | Promise<void>;
};

export type ReactRendererProps<
  TForm extends ReactTgbFormInstance = ReactTgbFormInstance,
  TField = unknown,
> = {
  readonly name: string;
  readonly field: TField;
  readonly form: TForm;
  readonly label: string | undefined;
  readonly description: string | undefined;
  readonly props: JsonObject | undefined;
  readonly value: unknown;
  readonly errors: readonly unknown[];
};

export type ReactRendererField = AnyFieldApi;

export type BaseReactRendererProps = ReactRendererProps<ReactTgbFormInstance, ReactRendererField>;

export type ReactRenderer<
  TForm extends ReactTgbFormInstance = ReactTgbFormInstance,
  TField = unknown,
> = ComponentType<ReactRendererProps<TForm, TField>>;

type AnyReactRenderer = ReactRenderer<any, any>;

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
