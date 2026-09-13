import {
  type FormAsyncValidateOrFn,
  type FormOptions,
  type FormValidateOrFn,
  type FormValidators,
  type StandardSchemaV1,
} from '@tanstack/form-core';
import {
  FieldDataType,
  type FieldDefinition,
  type FormDefinition,
  type InferFieldValue,
  type InferFormValues,
  type JsonValue,
} from './schema';
import { cloneJson, isJsonObject } from './schema';
import { toValibotSchema } from './valibot-compiler';

export type { InferFieldValue, InferFormValues };

type FormValues<TForm extends FormDefinition> = InferFormValues<TForm>;

/** Any sync validator for the inferred values (function or Standard Schema). */
type OpenSyncValidator<TValues> = undefined | FormValidateOrFn<TValues>;

/** Any async validator for the inferred values (function or Standard Schema). */
type OpenAsyncValidator<TValues> = undefined | FormAsyncValidateOrFn<TValues>;

/**
 * Deep partial used for `defaultValues` overrides: objects merge key-wise
 * while arrays are replaced wholesale, so a nested override can never
 * silently drop sibling values.
 */
export type DeepPartial<T> = T extends readonly unknown[]
  ? T
  : T extends Record<string, unknown>
    ? {
        readonly [TKey in keyof T]?: DeepPartial<T[TKey]>;
      }
    : T;

/**
 * Additional options forwarded to `useForm` by {@link toTanStackOptions}.
 *
 * This is TanStack's own `FormOptions` for the inferred values — every `on*`
 * TanStack supports (form validators, listeners, submit handlers, debounce
 * options, …) is accepted without redeclaring them here. `defaultValues`
 * additionally accepts deep partials, which are merged over the definition
 * defaults.
 */
export type TgbFormTanStackOptions<TForm extends FormDefinition> = Omit<
  Partial<
    FormOptions<
      FormValues<TForm>,
      OpenSyncValidator<FormValues<TForm>>,
      OpenSyncValidator<FormValues<TForm>>,
      OpenAsyncValidator<FormValues<TForm>>,
      OpenSyncValidator<FormValues<TForm>>,
      OpenAsyncValidator<FormValues<TForm>>,
      OpenSyncValidator<FormValues<TForm>>,
      OpenAsyncValidator<FormValues<TForm>>,
      OpenSyncValidator<FormValues<TForm>>,
      OpenAsyncValidator<FormValues<TForm>>,
      OpenAsyncValidator<FormValues<TForm>>,
      unknown
    >
  >,
  'defaultValues' | 'validators'
> & {
  /** Partial overrides merged over the definition defaults (user wins). */
  readonly defaultValues?: DeepPartial<FormValues<TForm>>;
  /** Form-level validators; an explicit `onSubmit` wins over the compiled schema. */
  readonly validators?: FormValidators<
    FormValues<TForm>,
    OpenSyncValidator<FormValues<TForm>>,
    OpenSyncValidator<FormValues<TForm>>,
    OpenAsyncValidator<FormValues<TForm>>,
    OpenSyncValidator<FormValues<TForm>>,
    OpenAsyncValidator<FormValues<TForm>>,
    OpenSyncValidator<FormValues<TForm>>,
    OpenAsyncValidator<FormValues<TForm>>,
    OpenSyncValidator<FormValues<TForm>>,
    OpenAsyncValidator<FormValues<TForm>>
  >;
};

/**
 * Resolves the effective `validators.onSubmit`: the user's own when present,
 * otherwise the schema compiled from the definition.
 */
type ResolveOnSubmitValidator<TForm extends FormDefinition, TOptions> = TOptions extends {
  readonly validators: { readonly onSubmit: infer TOnSubmit };
}
  ? [undefined] extends [TOnSubmit]
    ? StandardSchemaV1<FormValues<TForm>, unknown>
    : TOnSubmit
  : StandardSchemaV1<FormValues<TForm>, unknown>;

/**
 * User validators preserved as passed, with `onSubmit` resolved by
 * {@link ResolveOnSubmitValidator}.
 */
type OutputValidators<TForm extends FormDefinition, TOptions> = (TOptions extends {
  readonly validators: infer TValidators;
}
  ? TValidators extends object
    ? Omit<TValidators, 'onSubmit'>
    : unknown
  : unknown) & {
  readonly onSubmit: ResolveOnSubmitValidator<TForm, TOptions>;
};

/**
 * TanStack-compatible options generated from a {@link FormDefinition}.
 *
 * `TOptions` preserves the exact user-supplied config (inferred with `const`),
 * so every supported `on*` keeps its type. Merge order is always:
 * user-supplied TanStack config wins, then the definition-derived values
 * (`defaultValues`, `onSubmit` schema), then everything else passes through
 * untouched.
 */
export type TgbFormTanStackOutput<
  TForm extends FormDefinition,
  TOptions extends TgbFormTanStackOptions<TForm> = TgbFormTanStackOptions<TForm>,
> = Omit<TOptions, 'defaultValues' | 'validators'> & {
  readonly defaultValues: FormValues<TForm>;
  readonly validators: OutputValidators<TForm, TOptions>;
};

/**
 * Extracts default values from a {@link FormDefinition}, optionally merged
 * with a partial overrides payload (e.g. values restored from a database).
 *
 * Overrides merge exactly like {@link toTanStackOptions} `defaultValues`:
 * plain objects merge key-wise while arrays are replaced wholesale, so a
 * partial payload can never wipe unrelated sibling values.
 */
export function getDefaultValues<TForm extends FormDefinition>(
  form: TForm,
  overrides?: DeepPartial<InferFormValues<TForm>>,
): InferFormValues<TForm> {
  const values: Record<string, JsonValue> = {};
  for (const [name, field] of Object.entries(form.fields)) {
    values[name] = fieldDefaultValue(field);
  }
  // Incrementally built records lose their mapped-type shape; every entry
  // above is cloned from the matching field definition.
  const defaults = values as InferFormValues<TForm>;
  return deepMergeDefaults(defaults, overrides);
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

/**
 * Resolves a single field's default value. Object fields with child `fields`
 * synthesize missing keys from their children (explicit `defaultValue` keys
 * win), so runtime defaults always match {@link InferFieldValue} and satisfy
 * the compiled schema — visual editors typically persist `{}` for groups.
 */
function fieldDefaultValue(field: FieldDefinition): JsonValue {
  if (field.type === FieldDataType.Object && field.fields) {
    const base: Record<string, JsonValue> = isJsonObject(field.defaultValue)
      ? { ...field.defaultValue }
      : {};
    for (const [name, child] of Object.entries(field.fields)) {
      base[name] ??= fieldDefaultValue(child);
    }
    return base;
  }
  return cloneJson(field.defaultValue);
}

/**
 * Deep-merges user `defaultValues` over definition defaults. Plain objects
 * merge key-wise (user wins per key); arrays are replaced wholesale so an
 * override can never splice unrelated entries together.
 */
function deepMergeDefaults<T>(base: T, override: DeepPartial<T> | undefined): T {
  if (override === undefined) return base;
  if (Array.isArray(base) || Array.isArray(override)) {
    return (override ?? base) as T;
  }
  if (isPlainObject(base) && isPlainObject(override)) {
    const merged: Record<string, unknown> = { ...base };
    for (const [key, value] of Object.entries(override)) {
      merged[key] =
        value === undefined
          ? merged[key]
          : deepMergeDefaults(merged[key], value as DeepPartial<unknown>);
    }
    return merged as T;
  }
  return override as T;
}

/**
 * Builds TanStack Form Core options with {@link getDefaultValues} and {@link toValibotSchema}.
 *
 * Accepts the full TanStack `FormOptions` surface for the inferred values —
 * validators, listeners, submit handlers — with user config taking precedence
 * over definition-derived values.
 */
export function toTanStackOptions<
  TForm extends FormDefinition,
  const TOptions extends TgbFormTanStackOptions<TForm> = TgbFormTanStackOptions<TForm>,
>(form: TForm, options?: TOptions): TgbFormTanStackOutput<TForm, TOptions> {
  const schema = toValibotSchema(form);

  const output = {
    ...options,
    defaultValues: getDefaultValues(form, options?.defaultValues),
    validators: {
      ...options?.validators,
      onSubmit: options?.validators?.onSubmit ?? schema,
    },
  };
  // Generic spreads cannot be statically resolved to the conditional output
  // type; the shape above matches it by construction (user config wins, then
  // the compiled schema) and is covered by merge-order tests.
  return output as unknown as TgbFormTanStackOutput<TForm, TOptions>;
}
