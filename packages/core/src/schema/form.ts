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
  readonly validators?: ValidatorRegistry;
  readonly renderers?: RendererRegistry;
};

/**
 * Normalized {@link FormDefinition} with optional runtime-only {@link ValidatorRegistry}.
 */
export type RuntimeFormDefinition = FormDefinition & {
  readonly validators?: ValidatorRegistry;
};

/**
 * Authoring shape for {@link FieldDefinition}, narrowed by {@link RendererRegistry} names when provided.
 */
export type FieldDefinitionInput<TComponentName extends string = string> = Omit<
  FieldDefinition,
  'component' | 'element' | 'fields'
> & {
  readonly component?: TComponentName;
  readonly fields?: FormFieldsDefinitionInput<TComponentName>;
  readonly element?: FieldDefinitionInput<TComponentName>;
};

export type FormFieldsDefinitionInput<TComponentName extends string = string> = {
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
  return options.validators ? { ...normalized, validators: options.validators } : normalized;
}

/**
 * Returns a JSON-safe {@link FormDefinition}, omitting runtime-only registries.
 */
export function serializeForm(form: FormDefinition): FormDefinition {
  const { validators: _validators, ...serializable } = form as RuntimeFormDefinition;
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
