import type { ComponentType, ReactNode } from 'react';
import type { FieldDataType, JsonObject, RendererRegistry } from '@easyform/core';

type TanStackFieldRenderer = (field: any) => ReactNode;

export type ReactEasyFormInstance = {
  readonly Field: ComponentType<{
    readonly name: string;
    readonly children: TanStackFieldRenderer;
  }>;
  readonly handleSubmit: () => void | Promise<void>;
};

export type ReactRendererProps<
  TForm extends ReactEasyFormInstance = ReactEasyFormInstance,
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

export type ReactRenderer<
  TForm extends ReactEasyFormInstance = ReactEasyFormInstance,
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
