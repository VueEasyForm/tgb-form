import type { FormEvent, FormHTMLAttributes, ReactNode } from 'react';
import { useForm } from '@tanstack/react-form';
import {
  toTanStackOptions,
  type TgbFormTanStackOptions,
  type RuntimeFormDefinition,
} from '@tgb-form/core';
import { TgbFormInstanceContext, useTgbFormRegistry } from './TgbFormContext';
import { TgbFormField } from './TgbFormField';
import type { ReactTgbFormInstance, ReactRendererRegistry } from './types';

type OrderedField = {
  readonly name: string;
  readonly field: import('@tgb-form/core').FieldDefinition;
  readonly declarationIndex: number;
};

export type TgbFormProps = {
  readonly definition: RuntimeFormDefinition;
  readonly instance?: ReactTgbFormInstance;
  readonly tanstackOptions?: TgbFormTanStackOptions;
  readonly renderers?: ReactRendererRegistry;
  readonly fields?: readonly string[];
  readonly children?: ReactNode;
} & Omit<FormHTMLAttributes<HTMLFormElement>, 'children' | 'onSubmit'>;

function getOrderedFields(
  definition: RuntimeFormDefinition,
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
      const orderDiff =
        (left.field.order ?? Number.POSITIVE_INFINITY) -
        (right.field.order ?? Number.POSITIVE_INFINITY);
      return orderDiff === 0 ? left.declarationIndex - right.declarationIndex : orderDiff;
    });
}

export function TgbForm({
  definition,
  instance: externalInstance,
  tanstackOptions,
  renderers: propRenderers,
  fields,
  children,
  ...formProps
}: TgbFormProps) {
  const ctx = useTgbFormRegistry();
  const renderers = propRenderers ?? ctx?.renderers;

  const mergedOptions = toTanStackOptions(definition, tanstackOptions) as Record<string, unknown>;
  const managedForm = useForm(mergedOptions);
  const form = externalInstance ?? (managedForm as unknown as ReactTgbFormInstance);

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
    <TgbFormInstanceContext.Provider value={form}>
      <form
        {...formProps}
        aria-label={accessibleName}
        onSubmit={(event) => {
          void handleSubmit(event);
        }}
      >
        {orderedFields.map(({ name, field }) => (
          <TgbFormField
            key={name}
            name={name}
            field={field}
            renderers={renderers}
          />
        ))}
        {children}
      </form>
    </TgbFormInstanceContext.Provider>
  );
}
