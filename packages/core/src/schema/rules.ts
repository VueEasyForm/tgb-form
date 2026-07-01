import * as v from 'valibot';
import { ValidationRuleKind } from './enums';
import { VJsonObject, type JsonObject } from './json';

/**
 * A built-in validation rule that can round-trip through JSON and compile via {@link toValibotSchema}.
 */
export type ValidationRule =
  | {
      readonly kind: ValidationRuleKind.Required;
      readonly message?: string;
    }
  | {
      readonly kind:
        | ValidationRuleKind.MinLength
        | ValidationRuleKind.MaxLength
        | ValidationRuleKind.Min
        | ValidationRuleKind.Max;
      readonly value: number;
      readonly message?: string;
    }
  | {
      readonly kind: ValidationRuleKind.Pattern;
      readonly value: string;
      readonly message?: string;
    }
  | {
      readonly kind: ValidationRuleKind.Email | ValidationRuleKind.Url;
      readonly message?: string;
    };

/**
 * Reference to a code-defined validator in a {@link ValidatorRegistry}.
 */
export type CustomValidatorReference = {
  readonly name: string;
  readonly message?: string;
  readonly options?: JsonObject;
};

const VOptionalMessage = {
  message: v.optional(v.string()),
};

/**
 * Valibot schema for JSON-safe {@link ValidationRule} values.
 */
export const VValidationRule = v.variant('kind', [
  v.object({
    kind: v.literal(ValidationRuleKind.Required),
    ...VOptionalMessage,
  }),
  v.object({
    kind: v.literal(ValidationRuleKind.MinLength),
    value: v.number(),
    ...VOptionalMessage,
  }),
  v.object({
    kind: v.literal(ValidationRuleKind.MaxLength),
    value: v.number(),
    ...VOptionalMessage,
  }),
  v.object({
    kind: v.literal(ValidationRuleKind.Pattern),
    value: v.string(),
    ...VOptionalMessage,
  }),
  v.object({
    kind: v.literal(ValidationRuleKind.Min),
    value: v.number(),
    ...VOptionalMessage,
  }),
  v.object({
    kind: v.literal(ValidationRuleKind.Max),
    value: v.number(),
    ...VOptionalMessage,
  }),
  v.object({
    kind: v.literal(ValidationRuleKind.Email),
    ...VOptionalMessage,
  }),
  v.object({
    kind: v.literal(ValidationRuleKind.Url),
    ...VOptionalMessage,
  }),
]);

/**
 * Valibot schema for named {@link CustomValidatorReference} values.
 */
export const VCustomValidatorReference = v.object({
  name: v.string(),
  message: v.optional(v.string()),
  options: v.optional(VJsonObject),
});
