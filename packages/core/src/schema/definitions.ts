import * as v from 'valibot';
import { FieldDataType } from './enums';
import { VJsonObject, VJsonValue, type JsonObject, type JsonValue } from './json';
import {
  VCustomValidatorReference,
  VValidationRule,
  type CustomValidatorReference,
  type ValidationRule,
} from './rules';

/**
 * A single JSON-serializable field definition.
 *
 * Renderer hints (`component`, `props`) stay as data; framework packages turn
 * them into real components with {@link RendererRegistry}.
 */
export type FieldDefinition = {
  /** JSON-safe data type used to choose validation and default-value checks. */
  readonly type: FieldDataType;
  /** Initial field value; must match the field {@link type}. */
  readonly defaultValue: JsonValue;
  /** Human-readable field label for renderers. */
  readonly label?: string;
  /** Longer help text or explanation for renderers. */
  readonly description?: string;
  /** Optional display ordering hint for renderers. */
  readonly order?: number;
  /** JSON-safe application metadata carried with the field definition. */
  readonly meta?: JsonObject;
  /** Renderer registry name to use instead of the default type renderer. */
  readonly component?: string;
  /** JSON-safe renderer props passed to the selected component. */
  readonly props?: JsonObject;
  /** Built-in validation rules applied when compiling the field. */
  readonly rules?: readonly ValidationRule[];
  /** Named custom validators resolved from a runtime validator registry. */
  readonly validators?: readonly CustomValidatorReference[];
  /** Child fields for object-valued fields. */
  readonly fields?: FormFieldsDefinition;
  /** Element definition for array-valued fields. */
  readonly element?: FieldDefinition;
};

/**
 * {@link FieldDefinition} values keyed by form field name.
 */
export type FormFieldsDefinition = {
  /**
   * Field definition keyed by its stable form field name.
   */
  readonly [name: string]: FieldDefinition;
};

/**
 * A portable form definition that can be parsed by {@link VFormDefinition}.
 */
export type FormDefinition = {
  /** Top-level fields keyed by form field name. */
  readonly fields: FormFieldsDefinition;
  /** JSON-safe application metadata carried with the form definition. */
  readonly meta?: JsonObject;
};

const VFieldBase = {
  /** Initial field value; must match the field type during normalization. */
  defaultValue: VJsonValue,
  /** Human-readable field label for renderers. */
  label: v.optional(v.string()),
  /** Longer help text or explanation for renderers. */
  description: v.optional(v.string()),
  /** Optional display ordering hint for renderers. */
  order: v.optional(v.number()),
  /** JSON-safe application metadata carried with the field definition. */
  meta: v.optional(VJsonObject),
  /** Renderer registry name to use instead of the default type renderer. */
  component: v.optional(v.string()),
  /** JSON-safe renderer props passed to the selected component. */
  props: v.optional(VJsonObject),
  /** Built-in validation rules applied when compiling the field. */
  rules: v.optional(v.array(VValidationRule)),
  /** Named custom validators resolved from a runtime validator registry. */
  validators: v.optional(v.array(VCustomValidatorReference)),
};

/**
 * Valibot schema for parsing and validating {@link FieldDefinition} values from JSON.
 */
export const VFieldDefinition: v.GenericSchema<FieldDefinition> = v.lazy(() =>
  v.variant('type', [
    v.object({
      ...VFieldBase,
      /** Discriminator for string-valued fields. */
      type: v.literal(FieldDataType.String),
    }),
    v.object({
      ...VFieldBase,
      /** Discriminator for number-valued fields. */
      type: v.literal(FieldDataType.Number),
    }),
    v.object({
      ...VFieldBase,
      /** Discriminator for boolean-valued fields. */
      type: v.literal(FieldDataType.Boolean),
    }),
    v.object({
      ...VFieldBase,
      /** Discriminator for object-valued fields. */
      type: v.literal(FieldDataType.Object),
      /** Child field definitions for the object value. */
      fields: v.optional(v.record(v.string(), VFieldDefinition)),
    }),
    v.object({
      ...VFieldBase,
      /** Discriminator for array-valued fields. */
      type: v.literal(FieldDataType.Array),
      /** Field definition used for each array element. */
      element: v.optional(VFieldDefinition),
    }),
  ]),
);

/**
 * Valibot schema for parsing and validating {@link FormDefinition} values.
 */
export const VFormDefinition: v.GenericSchema<FormDefinition> = v.object({
  /** Top-level fields keyed by form field name. */
  fields: v.record(v.string(), VFieldDefinition),
  /** JSON-safe application metadata carried with the form definition. */
  meta: v.optional(VJsonObject),
});
