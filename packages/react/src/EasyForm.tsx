import type { ComponentType, FormEvent, FormHTMLAttributes, ReactNode } from 'react';
import {
  createRendererRegistry,
  resolveRenderer,
  type FieldDataType,
  type FieldDefinition,
  type FormDefinition,
  type JsonObject,
  type RendererRegistry,
} from '@easyform/core';

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

export type EasyFormProps<
  TForm extends ReactEasyFormInstance = ReactEasyFormInstance,
  TRegistry extends ReactRendererRegistry = ReactRendererRegistry,
> = Omit<FormHTMLAttributes<HTMLFormElement>, 'children' | 'onSubmit'> & {
  readonly definition: FormDefinition;
  readonly fields?: readonly string[];
  readonly form: TForm;
  readonly renderers: TRegistry;
};

export type EasyFieldProps<
  TForm extends ReactEasyFormInstance = ReactEasyFormInstance,
  TRegistry extends ReactRendererRegistry = ReactRendererRegistry,
> = {
  readonly name: string;
  readonly field: FieldDefinition;
  readonly form: TForm;
  readonly renderers: TRegistry;
};

type OrderedField = {
  readonly name: string;
  readonly field: FieldDefinition;
  readonly declarationIndex: number;
};

type FieldState = {
  readonly value?: unknown;
  readonly meta?: {
    readonly errors?: readonly unknown[];
  };
};

type BoundField = {
  readonly state?: FieldState;
};

export function createReactRendererRegistry<
  const TByName extends Readonly<Record<string, AnyReactRenderer>> = {},
  const TByType extends Partial<Readonly<Record<FieldDataType, AnyReactRenderer>>> = {},
>(registry: {
  readonly byName?: TByName;
  readonly byType?: TByType;
}): ReactRendererRegistry<TByName, TByType> {
  return createRendererRegistry(registry);
}

export function EasyForm<
  TForm extends ReactEasyFormInstance,
  TRegistry extends ReactRendererRegistry,
>({ definition, fields, form, renderers, ...formProps }: EasyFormProps<TForm, TRegistry>) {
  const orderedFields = getOrderedFields(definition, fields);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    event.stopPropagation();
    await form.handleSubmit();
  }

  const accessibleName =
    formProps['aria-label'] === undefined && formProps['aria-labelledby'] === undefined
      ? 'Easy form'
      : formProps['aria-label'];

  return (
    <form
      {...formProps}
      aria-label={accessibleName}
      onSubmit={(event) => {
        void handleSubmit(event);
      }}
    >
      {orderedFields.map(({ name, field }) => (
        <EasyField
          field={field}
          form={form}
          key={name}
          name={name}
          renderers={renderers}
        />
      ))}
    </form>
  );
}

export function EasyField<
  TForm extends ReactEasyFormInstance,
  TField,
  TRegistry extends ReactRendererRegistry,
>({ name, field, form, renderers }: EasyFieldProps<TForm, TRegistry>) {
  const Field = form.Field;

  return (
    <Field name={name}>
      {(boundField) => {
        const Renderer = resolveRenderer(field, renderers) as ReactRenderer<TForm, TField>;
        const typedField = boundField as TField;
        const fieldState = (boundField as BoundField).state;

        return (
          <Renderer
            description={field.description}
            errors={getFieldErrors(fieldState)}
            field={typedField}
            form={form}
            label={field.label}
            name={name}
            props={field.props}
            value={fieldState?.value}
          />
        );
      }}
    </Field>
  );
}

function getOrderedFields(
  definition: FormDefinition,
  subset: readonly string[] | undefined,
): OrderedField[] {
  const subsetNames = subset === undefined ? undefined : new Set(subset);

  return Object.entries(definition.fields)
    .map(([name, field], declarationIndex) => ({
      declarationIndex,
      field,
      name,
    }))
    .filter(({ name }) => subsetNames === undefined || subsetNames.has(name))
    .sort((left, right) => {
      const orderDiff = getFieldOrder(left.field) - getFieldOrder(right.field);
      return orderDiff === 0 ? left.declarationIndex - right.declarationIndex : orderDiff;
    });
}

function getFieldOrder(field: FieldDefinition): number {
  return field.order ?? Number.POSITIVE_INFINITY;
}

function getFieldErrors(fieldState: FieldState | undefined): readonly unknown[] {
  return fieldState?.meta?.errors ?? [];
}
