import * as v from 'valibot';
import type { RendererRegistry } from '../renderer-registry';
import type { ValidatorRegistry } from '../validator-registry';
import { FieldDataType } from './enums';
import {
  VFormDefinition,
  type FieldDefinition,
  type FormDefinition,
  type FormFieldsDefinition,
} from './definitions';
import { isJsonObject, type JsonObject, type JsonValue } from './json';
import { type InferFieldValue } from './infer';
import type { CustomValidatorReference, ValidationRule } from './rules';

/**
 * Optional registries used by {@link defineForm} and {@link deserializeForm}.
 */
export type DefineFormOptions = {
  /** Runtime registry used to resolve field custom validators by name. */
  readonly validators?: ValidatorRegistry;
  /** Runtime registry used to resolve renderer component names and field-type defaults. */
  readonly renderers?: RendererRegistry;
};

/**
 * Properties shared by every {@link FieldDefinitionInput} variant.
 */
type FieldInputOptions<TComponentName extends string = string> = {
  /** Human-readable field label for renderers. */
  readonly label?: string;
  /** Longer help text or explanation for renderers. */
  readonly description?: string;
  /** Optional display ordering hint for renderers. */
  readonly order?: number;
  /** JSON-safe application metadata carried with the field definition. */
  readonly meta?: JsonObject;
  /** Renderer registry name, narrowed to known names when renderers are provided. */
  readonly component?: TComponentName;
  /** JSON-safe renderer props passed to the selected component. */
  readonly props?: JsonObject;
  /** Built-in validation rules applied when compiling the field. */
  readonly rules?: readonly ValidationRule[];
  /** Named custom validators resolved from a runtime validator registry. */
  readonly validators?: readonly CustomValidatorReference[];
};

/**
 * Authoring shape for a single {@link FieldDefinition}, discriminated by {@link type}
 * so the {@link defaultValue} always matches the declared data type.
 */
export type FieldDefinitionInput<TComponentName extends string = string> =
  | ({
      readonly type: FieldDataType.String;
      readonly defaultValue: string;
    } & FieldInputOptions<TComponentName>)
  | ({
      readonly type: FieldDataType.Number;
      readonly defaultValue: number;
    } & FieldInputOptions<TComponentName>)
  | ({
      readonly type: FieldDataType.Boolean;
      readonly defaultValue: boolean;
    } & FieldInputOptions<TComponentName>)
  | ({
      readonly type: FieldDataType.Object;
      readonly defaultValue: JsonObject;
      /** Child authoring definitions for the object value. */
      readonly fields?: FormFieldsDefinitionInput<TComponentName>;
    } & FieldInputOptions<TComponentName>)
  | ({
      readonly type: FieldDataType.Array;
      readonly defaultValue: readonly JsonValue[];
      /** Authoring definition used for each array element. */
      readonly element?: FieldDefinitionInput<TComponentName>;
    } & FieldInputOptions<TComponentName>);

export type FormFieldsDefinitionInput<TComponentName extends string = string> = {
  /**
   * Authoring field definition keyed by its stable form field name.
   */
  readonly [name: string]: FieldDefinitionInput<TComponentName>;
};

/**
 * Authoring shape for forms. JSON-loaded forms use runtime validation; TypeScript
 * authored forms can also get component-name checking from a {@link RendererRegistry}.
 */
export type FormDefinitionInput<TComponentName extends string = string> = Omit<
  FormDefinition,
  'fields'
> & {
  /** Top-level authoring field definitions keyed by form field name. */
  readonly fields: FormFieldsDefinitionInput<TComponentName>;
};

/**
 * Normalized {@link FormDefinition} that preserves the literal shape of the
 * authoring {@link FormDefinitionInput} it was built from.
 */
export type RuntimeFormDefinition<TForm extends FormDefinition = FormDefinition> = TForm & {
  /** Runtime-only validator registry attached by {@link defineForm} when provided. */
  readonly validators?: ValidatorRegistry;
  /** Runtime-only renderer registry attached by {@link defineForm} when provided. */
  readonly renderers?: RendererRegistry;
};

type ComponentNameFromOptions<TOptions extends DefineFormOptions> = TOptions extends {
  readonly renderers: RendererRegistry;
}
  ? Extract<keyof TOptions['renderers']['byName'], string>
  : string;

/**
 * Compile-time check that an array field's `defaultValue` entries match the
 * value type inferred from its `element` definition, recursing into nested
 * object fields and array elements.
 *
 * A mismatch resolves the definition to an incompatible marker so
 * {@link defineForm} fails at the call site instead of silently widening the
 * array to `JsonValue[]`.
 */
export type ValidateFieldDefinitionInput<T> = T extends {
  readonly type: FieldDataType.Array;
  readonly element: infer TElement extends FieldDefinitionInput<string>;
  readonly defaultValue: infer TDefault;
}
  ? TDefault extends readonly InferFieldValue<TElement & FieldDefinition>[]
    ? Omit<T, 'element'> & {
        readonly element?: ValidateFieldDefinitionInput<TElement>;
      }
    : T & {
        readonly 'ERROR: array defaultValue must match its element definition': readonly InferFieldValue<
          TElement & FieldDefinition
        >[];
      }
  : T extends {
        readonly type: FieldDataType.Object;
        readonly fields: infer TFields extends FormFieldsDefinitionInput<string>;
      }
    ? Omit<T, 'fields'> & {
        readonly fields?: {
          readonly [TKey in keyof TFields]: ValidateFieldDefinitionInput<TFields[TKey]>;
        };
      }
    : T;

/**
 * Applies {@link ValidateFieldDefinitionInput} to every top-level field while
 * preserving field names and sibling properties such as `meta`.
 */
export type ValidateFormDefinitionInput<T> = T extends {
  readonly fields: infer TFields extends FormFieldsDefinitionInput<string>;
}
  ? Omit<T, 'fields'> & {
      readonly fields: {
        readonly [TKey in keyof TFields]: ValidateFieldDefinitionInput<TFields[TKey]>;
      };
    }
  : T;

/**
 * Validates and normalizes a {@link FormDefinitionInput} while preserving the literal field shape.
 */
export function defineForm<const TForm extends FormDefinitionInput>(
  definition: TForm & ValidateFormDefinitionInput<TForm>,
  options?: undefined,
): RuntimeFormDefinition<TForm>;
export function defineForm<
  const TOptions extends DefineFormOptions,
  const TForm extends FormDefinitionInput<ComponentNameFromOptions<TOptions>>,
>(
  definition: TForm & ValidateFormDefinitionInput<TForm>,
  options: TOptions,
): RuntimeFormDefinition<TForm>;
export function defineForm(
  definition: FormDefinitionInput,
  options: DefineFormOptions = {},
): RuntimeFormDefinition {
  return attachRuntimeOptions(normalizeFormDefinition(definition), options);
}

function attachRuntimeOptions(
  normalized: FormDefinition,
  options: DefineFormOptions,
): RuntimeFormDefinition {
  if (!options.validators && !options.renderers) {
    return normalized;
  }

  return {
    ...normalized,
    ...(options.validators ? { validators: options.validators } : {}),
    ...(options.renderers ? { renderers: options.renderers } : {}),
  };
}

/**
 * Returns a JSON-safe {@link FormDefinition}, omitting runtime-only registries.
 */
export function serializeForm(form: RuntimeFormDefinition): FormDefinition {
  const { validators: _v, renderers: _r, ...serializable } = form;
  return structuredClone(serializable);
}

/**
 * Parses a JSON string or unknown value into a normalized {@link RuntimeFormDefinition}.
 *
 * Pass a {@link FormDefinition} type parameter (for example the inferred type of a
 * code-defined form) to preserve the underlying schema for {@link InferFormValues}.
 */
export function deserializeForm<const TForm extends FormDefinition = FormDefinition>(
  input: unknown,
  options: DefineFormOptions = {},
): RuntimeFormDefinition<TForm> {
  const parsed = typeof input === 'string' ? JSON.parse(input) : input;
  const normalized = attachRuntimeOptions(normalizeFormDefinition(parsed), options);
  // JSON input cannot safely infer TForm; callers may supply it explicitly.
  return normalized as RuntimeFormDefinition<TForm>;
}

function normalizeFormDefinition(definition: unknown): FormDefinition {
  const parsed = v.parse(VFormDefinition, definition);
  validateDefaultValues(parsed.fields, 'fields');
  return structuredClone(parsed);
}

function validateDefaultValues(fields: FormFieldsDefinition, path: string) {
  for (const [name, field] of Object.entries(fields)) {
    validateFieldDefinition(field, `${path}.${name}`);
  }
}

/** Validates a field default and every nested object or array definition. */
function validateFieldDefinition(field: FieldDefinition, path: string) {
  validateDefaultValue(field, `${path}.defaultValue`);

  if (field.fields) {
    validateDefaultValues(field.fields, `${path}.fields`);
  }

  if (field.element) {
    validateFieldDefinition(field.element, `${path}.element`);
  }
}

function validateDefaultValue(field: FieldDefinition, path: string) {
  if (field.type === FieldDataType.Array) {
    if (!Array.isArray(field.defaultValue)) {
      throw new TypeError(`${path} must be an array, got ${describeValue(field.defaultValue)}`);
    }
    return;
  }

  if (field.type === FieldDataType.Object) {
    if (!isJsonObject(field.defaultValue)) {
      throw new TypeError(`${path} must be an object, got ${describeValue(field.defaultValue)}`);
    }
    return;
  }

  if (typeof field.defaultValue !== field.type) {
    throw new TypeError(
      `${path} must be a ${field.type}, got ${describeValue(field.defaultValue)}`,
    );
  }
}

function describeValue(value: unknown): string {
  if (value === null) return 'null';
  if (value === undefined) return 'undefined';

  switch (typeof value) {
    case 'string':
      return JSON.stringify(value);
    case 'object':
      return JSON.stringify(value);
    case 'number':
    case 'boolean':
    case 'bigint':
    case 'symbol':
      return String(value);
    case 'function':
      return value.toString();
    default:
      return JSON.stringify(value);
  }
}
