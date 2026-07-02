import * as v from 'valibot';
import { ValidationRuleKind } from './enums';
import { VJsonObject, type JsonObject } from './json';

/**
 * A built-in validation rule that can round-trip through JSON and compile via {@link toValibotSchema}.
 */
export type ValidationRule =
  | {
      /** Identifies this rule as a required-value check. */
      readonly kind: ValidationRuleKind.Required;
      /** Optional message shown when the required-value check fails. */
      readonly message?: string;
    }
  | {
      /** Identifies this rule as a numeric or string-length boundary check. */
      readonly kind:
        | ValidationRuleKind.MinLength
        | ValidationRuleKind.MaxLength
        | ValidationRuleKind.Min
        | ValidationRuleKind.Max;
      /** Boundary value used by the selected rule kind. */
      readonly value: number;
      /** Optional message shown when the boundary check fails. */
      readonly message?: string;
    }
  | {
      /** Identifies this rule as a regular expression pattern check. */
      readonly kind: ValidationRuleKind.Pattern;
      /** Regular expression source string used for the pattern check. */
      readonly value: string;
      /** Optional message shown when the pattern check fails. */
      readonly message?: string;
    }
  | {
      /** Identifies this rule as a built-in string format check. */
      readonly kind: ValidationRuleKind.Email | ValidationRuleKind.Url;
      /** Optional message shown when the format check fails. */
      readonly message?: string;
    };

/**
 * Reference to a code-defined validator in a {@link ValidatorRegistry}.
 */
export type CustomValidatorReference = {
  /** Registry name of the custom validator to run for the field. */
  readonly name: string;
  /** Optional message passed to the custom validator factory. */
  readonly message?: string;
  /** JSON-safe options passed to the custom validator factory. */
  readonly options?: JsonObject;
};

const VOptionalMessage = {
  /** Optional validation error message returned when the rule fails. */
  message: v.optional(v.string()),
};

/**
 * Valibot schema for JSON-safe {@link ValidationRule} values.
 */
export const VValidationRule = v.variant('kind', [
  v.object({
    /** Discriminator for the required-value validation rule. */
    kind: v.literal(ValidationRuleKind.Required),
    ...VOptionalMessage,
  }),
  v.object({
    /** Discriminator for the minimum string length validation rule. */
    kind: v.literal(ValidationRuleKind.MinLength),
    /** Minimum number of characters required. */
    value: v.number(),
    ...VOptionalMessage,
  }),
  v.object({
    /** Discriminator for the maximum string length validation rule. */
    kind: v.literal(ValidationRuleKind.MaxLength),
    /** Maximum number of characters allowed. */
    value: v.number(),
    ...VOptionalMessage,
  }),
  v.object({
    /** Discriminator for the regular expression pattern validation rule. */
    kind: v.literal(ValidationRuleKind.Pattern),
    /** Regular expression source string to match against. */
    value: v.string(),
    ...VOptionalMessage,
  }),
  v.object({
    /** Discriminator for the minimum numeric value validation rule. */
    kind: v.literal(ValidationRuleKind.Min),
    /** Minimum numeric value allowed. */
    value: v.number(),
    ...VOptionalMessage,
  }),
  v.object({
    /** Discriminator for the maximum numeric value validation rule. */
    kind: v.literal(ValidationRuleKind.Max),
    /** Maximum numeric value allowed. */
    value: v.number(),
    ...VOptionalMessage,
  }),
  v.object({
    /** Discriminator for the email format validation rule. */
    kind: v.literal(ValidationRuleKind.Email),
    ...VOptionalMessage,
  }),
  v.object({
    /** Discriminator for the URL format validation rule. */
    kind: v.literal(ValidationRuleKind.Url),
    ...VOptionalMessage,
  }),
]);

/**
 * Valibot schema for named {@link CustomValidatorReference} values.
 */
export const VCustomValidatorReference = v.object({
  /** Registry name of the custom validator to run. */
  name: v.string(),
  /** Optional validation message passed to the validator factory. */
  message: v.optional(v.string()),
  /** JSON-safe options passed to the validator factory. */
  options: v.optional(VJsonObject),
});
