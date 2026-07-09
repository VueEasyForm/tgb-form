import type { FormEvent, FormHTMLAttributes, ReactNode } from 'react';
import { useForm } from '@tanstack/react-form';
import {
  toTanStackOptions,
  type EasyFormTanStackOptions,
  type RuntimeFormDefinition,
} from '@easyform/core';
import { EzFormInstanceContext, useEzFormRegistry } from './EzFormContext';
import { EzField } from './EzField';
import type { ReactEasyFormInstance, ReactRendererRegistry } from './types';

type OrderedField = {
  readonly name: string;
  readonly field: import('@easyform/core').FieldDefinition;
  readonly declarationIndex: number;
};

export type EzFormProps = {
  readonly definition: RuntimeFormDefinition;
  readonly instance?: ReactEasyFormInstance;
  readonly tanstackOptions?: EasyFormTanStackOptions;
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

export function EzForm({
  definition,
  instance: externalInstance,
  tanstackOptions,
  renderers: propRenderers,
  fields,
  children,
  ...formProps
}: EzFormProps) {
  const ctx = useEzFormRegistry();
  const renderers = propRenderers ?? ctx?.renderers;

  const mergedOptions = toTanStackOptions(definition, tanstackOptions) as Record<string, unknown>;
  const managedForm = useForm(mergedOptions);
  const form = externalInstance ?? (managedForm as unknown as ReactEasyFormInstance);

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
    <EzFormInstanceContext.Provider value={form}>
      <form
        {...formProps}
        aria-label={accessibleName}
        onSubmit={(event) => {
          void handleSubmit(event);
        }}
      >
        {orderedFields.map(({ name, field }) => (
          <EzField
            key={name}
            name={name}
            field={field}
            renderers={renderers}
          />
        ))}
        {children}
      </form>
    </EzFormInstanceContext.Provider>
  );
}
