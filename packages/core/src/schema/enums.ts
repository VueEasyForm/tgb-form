/**
 * JSON-safe field data types supported by {@link FieldDefinition}.
 */
export enum FieldDataType {
  /** Text value stored as a JSON string. */
  String = 'string',
  /** Numeric value stored as a JSON number. */
  Number = 'number',
  /** True/false value stored as a JSON boolean. */
  Boolean = 'boolean',
  /** Nested value stored as a JSON object with child field definitions. */
  Object = 'object',
  /** Repeating value stored as a JSON array with an optional element definition. */
  Array = 'array',
}

/**
 * Built-in validation rules used by {@link ValidationRule}.
 */
export enum ValidationRuleKind {
  /** Rejects empty strings, nullish values, and missing values. */
  Required = 'required',
  /** Requires a string to contain at least the configured number of characters. */
  MinLength = 'minLength',
  /** Requires a string to contain no more than the configured number of characters. */
  MaxLength = 'maxLength',
  /** Requires a string to match the configured regular expression pattern. */
  Pattern = 'pattern',
  /** Requires a number to be greater than or equal to the configured minimum. */
  Min = 'min',
  /** Requires a number to be less than or equal to the configured maximum. */
  Max = 'max',
  /** Requires a string to be formatted as an email address. */
  Email = 'email',
  /** Requires a string to be formatted as a URL. */
  Url = 'url',
}
