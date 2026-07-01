import type { StandardSchemaV1 } from '@tanstack/form-core';
import type { FormDefinition, JsonObject } from './schema';
import { cloneJson } from './schema';
import { toValibotSchema } from './valibot-compiler';

/**
 * Infers form values from each {@link FieldDefinition.defaultValue}.
 */
export type InferFormValues<TForm extends FormDefinition> = {
  readonly [TKey in keyof TForm['fields']]: TForm['fields'][TKey]['defaultValue'];
};

/**
 * Pass-through options accepted by {@link toTanStackOptions}.
 */
export type EasyFormTanStackOptions = {
  readonly validators?: Record<string, unknown>;
  readonly [key: string]: unknown;
};

/**
 * TanStack-compatible options generated from a {@link FormDefinition}.
 */
export type EasyFormTanStackOutput<TForm extends FormDefinition> = EasyFormTanStackOptions & {
  readonly defaultValues: InferFormValues<TForm>;
  readonly validators: Record<string, unknown> & {
    readonly onSubmit: StandardSchemaV1<JsonObject, unknown>;
  };
};

/**
 * Extracts default values from a {@link FormDefinition}.
 */
export function getDefaultValues<TForm extends FormDefinition>(
  form: TForm,
): InferFormValues<TForm> {
  return Object.fromEntries(
    Object.entries(form.fields).map(([name, field]) => [name, cloneJson(field.defaultValue)]),
  ) as InferFormValues<TForm>;
}

/**
 * Builds TanStack Form Core options with {@link getDefaultValues} and {@link toValibotSchema}.
 */
export function toTanStackOptions<TForm extends FormDefinition>(
  form: TForm,
  options: EasyFormTanStackOptions = {},
): EasyFormTanStackOutput<TForm> {
  const schema = toValibotSchema(form);

  return {
    ...options,
    defaultValues: getDefaultValues(form),
    validators: {
      ...options.validators,
      onSubmit: schema as StandardSchemaV1<JsonObject, unknown>,
    },
  };
}
