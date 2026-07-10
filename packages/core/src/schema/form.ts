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
import { cloneJson, isJsonObject, type JsonValue } from './json';

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
 * Normalized {@link FormDefinition} with optional runtime-only {@link ValidatorRegistry}.
 */
export type RuntimeFormDefinition = FormDefinition & {
  /** Runtime-only validator registry attached by {@link defineForm} when provided. */
  readonly validators?: ValidatorRegistry;
  /** Runtime-only renderer registry attached by {@link defineForm} when provided. */
  readonly renderers?: RendererRegistry;
};

/**
 * Authoring shape for {@link FieldDefinition}, narrowed by {@link RendererRegistry} names when provided.
 */
export type FieldDefinitionInput<TComponentName extends string = string> = Omit<
  FieldDefinition,
  'component' | 'element' | 'fields'
> & {
  /** Renderer registry name, narrowed to known names when renderers are provided. */
  readonly component?: TComponentName;
  /** Child authoring definitions for object-valued fields. */
  readonly fields?: FormFieldsDefinitionInput<TComponentName>;
  /** Element authoring definition for array-valued fields. */
  readonly element?: FieldDefinitionInput<TComponentName>;
};

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

type ComponentNameFromOptions<TOptions extends DefineFormOptions> = TOptions extends {
  readonly renderers: RendererRegistry;
}
  ? Extract<keyof TOptions['renderers']['byName'], string>
  : string;

/**
 * Validates and normalizes a {@link FormDefinitionInput}.
 */
export function defineForm(
  definition: FormDefinitionInput,
  options?: undefined,
): RuntimeFormDefinition;
export function defineForm<const TOptions extends DefineFormOptions>(
  definition: FormDefinitionInput<ComponentNameFromOptions<TOptions>>,
  options: TOptions,
): RuntimeFormDefinition;
export function defineForm(
  definition: FormDefinitionInput,
  options: DefineFormOptions = {},
): RuntimeFormDefinition {
  const normalized = normalizeFormDefinition(definition);
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
export function serializeForm(form: FormDefinition): FormDefinition {
  const {
    validators: _validators,
    renderers: _renderers,
    ...serializable
  } = form as RuntimeFormDefinition;
  return cloneJson(serializable as unknown as JsonValue) as unknown as FormDefinition;
}

/**
 * Parses a JSON string or unknown value into a normalized {@link RuntimeFormDefinition}.
 */
export function deserializeForm(
  input: string | unknown,
  options: DefineFormOptions = {},
): RuntimeFormDefinition {
  const parsed = typeof input === 'string' ? JSON.parse(input) : input;
  return defineForm(parsed as FormDefinitionInput, options);
}

function normalizeFormDefinition(definition: unknown): FormDefinition {
  const parsed = v.parse(VFormDefinition, definition);
  validateDefaultValues(parsed.fields, 'fields');
  return cloneJson(parsed as unknown as JsonValue) as unknown as FormDefinition;
}

function validateDefaultValues(fields: FormFieldsDefinition, path: string) {
  for (const [name, field] of Object.entries(fields)) {
    validateDefaultValue(field, `${path}.${name}.defaultValue`);

    if (field.fields) {
      validateDefaultValues(field.fields, `${path}.${name}.fields`);
    }

    if (field.element) {
      validateDefaultValue(field.element, `${path}.${name}.element.defaultValue`);
    }
  }
}

function validateDefaultValue(field: FieldDefinition, path: string) {
  if (field.type === FieldDataType.Array) {
    if (!Array.isArray(field.defaultValue)) {
      throw new TypeError(`${path} must be an array`);
    }
    return;
  }

  if (field.type === FieldDataType.Object) {
    if (!isJsonObject(field.defaultValue)) {
      throw new TypeError(`${path} must be an object`);
    }
    return;
  }

  if (typeof field.defaultValue !== field.type) {
    throw new TypeError(`${path} must be a ${field.type}`);
  }
}
