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
  readonly type: FieldDataType;
  readonly defaultValue: JsonValue;
  readonly label?: string;
  readonly description?: string;
  readonly order?: number;
  readonly meta?: JsonObject;
  readonly component?: string;
  readonly props?: JsonObject;
  readonly rules?: readonly ValidationRule[];
  readonly validators?: readonly CustomValidatorReference[];
  readonly fields?: FormFieldsDefinition;
  readonly element?: FieldDefinition;
};

/**
 * {@link FieldDefinition} values keyed by form field name.
 */
export type FormFieldsDefinition = {
  readonly [name: string]: FieldDefinition;
};

/**
 * A portable form definition that can be parsed by {@link VFormDefinition}.
 */
export type FormDefinition = {
  readonly fields: FormFieldsDefinition;
  readonly meta?: JsonObject;
};

const VFieldBase = {
  defaultValue: VJsonValue,
  label: v.optional(v.string()),
  description: v.optional(v.string()),
  order: v.optional(v.number()),
  meta: v.optional(VJsonObject),
  component: v.optional(v.string()),
  props: v.optional(VJsonObject),
  rules: v.optional(v.array(VValidationRule)),
  validators: v.optional(v.array(VCustomValidatorReference)),
};

/**
 * Valibot schema for parsing and validating {@link FieldDefinition} values from JSON.
 */
export const VFieldDefinition: v.GenericSchema<FieldDefinition> = v.lazy(() =>
  v.variant('type', [
    v.object({
      ...VFieldBase,
      type: v.literal(FieldDataType.String),
    }),
    v.object({
      ...VFieldBase,
      type: v.literal(FieldDataType.Number),
    }),
    v.object({
      ...VFieldBase,
      type: v.literal(FieldDataType.Boolean),
    }),
    v.object({
      ...VFieldBase,
      type: v.literal(FieldDataType.Object),
      fields: v.optional(v.record(v.string(), VFieldDefinition)),
    }),
    v.object({
      ...VFieldBase,
      type: v.literal(FieldDataType.Array),
      element: v.optional(VFieldDefinition),
    }),
  ]),
);

/**
 * Valibot schema for parsing and validating {@link FormDefinition} values.
 */
export const VFormDefinition: v.GenericSchema<FormDefinition> = v.object({
  fields: v.record(v.string(), VFieldDefinition),
  meta: v.optional(VJsonObject),
});
