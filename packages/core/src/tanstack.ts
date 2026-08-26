import type { StandardSchemaV1 } from '@tanstack/form-core';
import {
  FieldDataType,
  type FieldDefinition,
  type FormDefinition,
  type FormFieldsDefinition,
  type JsonObject,
  type JsonValue,
} from './schema';
import { cloneJson } from './schema';
import { toValibotSchema } from './valibot-compiler';

/**
 * Maps a single {@link FieldDefinition} to the runtime value type it stores,
 * recursing into nested object fields and array elements.
 */
export type InferFieldValue<TField extends FieldDefinition> = TField extends {
  readonly type: FieldDataType.String;
}
  ? string
  : TField extends { readonly type: FieldDataType.Number }
    ? number
    : TField extends { readonly type: FieldDataType.Boolean }
      ? boolean
      : TField extends {
            readonly type: FieldDataType.Object;
            readonly fields: infer TInner extends FormFieldsDefinition;
          }
        ? {
            -readonly [TKey in keyof TInner]: InferFieldValue<TInner[TKey]>;
          }
        : TField extends { readonly type: FieldDataType.Object }
          ? JsonObject
          : TField extends {
                readonly type: FieldDataType.Array;
                readonly element: infer TElement extends FieldDefinition;
              }
            ? InferFieldValue<TElement>[]
            : TField extends { readonly type: FieldDataType.Array }
              ? JsonValue[]
              : JsonValue;

/**
 * Infers the runtime form values shape from each field's {@link FieldDataType},
 * preserving literal keys on code-defined forms.
 */
export type InferFormValues<TForm extends FormDefinition> = {
  -readonly [TKey in keyof TForm['fields']]: InferFieldValue<TForm['fields'][TKey]>;
};

/**
 * Additional options forwarded to `useForm` by {@link toTanStackOptions}.
 */
export type TgbFormTanStackOptions<TForm extends FormDefinition> = {
  readonly onSubmit?: (props: { value: InferFormValues<TForm> }) => unknown;
  readonly validators?: Record<string, unknown>;
  readonly defaultValues?: Partial<InferFormValues<TForm>>;
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
    defaultValues: {
      ...getDefaultValues(form),
      ...options?.defaultValues,
    },
    validators: {
      ...options?.validators,
      onSubmit: schema as StandardSchemaV1<InferFormValues<TForm>, unknown>,
    },
  };
}
