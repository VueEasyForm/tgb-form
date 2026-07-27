import type { StandardSchemaV1 } from '@tanstack/form-core';
import type { FormDefinition } from './schema';
import { cloneJson } from './schema';
import { toValibotSchema } from './valibot-compiler';

/**
 * Infers form values from each {@link FieldDefinition.defaultValue}.
 */
export type InferFormValues<TForm extends FormDefinition> = {
  readonly [TKey in keyof TForm['fields']]: TForm['fields'][TKey]['defaultValue'];
};

/**
 * Additional options forwarded to `useForm` by {@link toTanStackOptions}.
 */
export type TgbFormTanStackOptions<TForm extends FormDefinition> = {
  readonly onSubmit?: (props: {
    readonly value: InferFormValues<TForm>;
  }) => unknown | Promise<unknown>;
  readonly validators?: Record<string, unknown>;
  readonly [key: string]: unknown;
};

/**
 * TanStack-compatible options generated from a {@link FormDefinition}.
 *
 * Omits `validators` from {@link TgbFormTanStackOptions} to avoid intersecting
 * user-provided function validators with the Standard Schema override for `onSubmit`.
 */
export type TgbFormTanStackOutput<TForm extends FormDefinition> = Omit<
  TgbFormTanStackOptions<TForm>,
  'validators'
> & {
  readonly defaultValues: InferFormValues<TForm>;
  readonly validators: {
    readonly onSubmit: StandardSchemaV1<InferFormValues<TForm>, unknown>;
  };
};

/**
 * Extracts default values from a {@link FormDefinition}.
 */
export function getDefaultValues<TForm extends FormDefinition>(
  form: TForm,
): InferFormValues<TForm> {
  // @ts-expect-error: Object.fromEntries returns {[key: string]: V} — mapped type is lost
  return Object.fromEntries(
    Object.entries(form.fields).map(([name, field]) => [name, cloneJson(field.defaultValue)]),
  );
}

/**
 * Builds TanStack Form Core options with {@link getDefaultValues} and {@link toValibotSchema}.
 */
export function toTanStackOptions<TForm extends FormDefinition>(
  form: TForm,
  options?: TgbFormTanStackOptions<TForm>,
): TgbFormTanStackOutput<TForm> {
  const schema = toValibotSchema(form);

  return {
    ...options,
    defaultValues: getDefaultValues(form),
    validators: {
      ...options?.validators,
      onSubmit: schema as StandardSchemaV1<InferFormValues<TForm>, unknown>,
    },
  } as TgbFormTanStackOutput<TForm>;
}
