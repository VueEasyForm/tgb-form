/**
 * JSON-safe field data types supported by {@link FieldDefinition}.
 */
export enum FieldDataType {
  String = 'string',
  Number = 'number',
  Boolean = 'boolean',
  Object = 'object',
  Array = 'array',
}

/**
 * Built-in validation rules used by {@link ValidationRule}.
 */
export enum ValidationRuleKind {
  Required = 'required',
  MinLength = 'minLength',
  MaxLength = 'maxLength',
  Pattern = 'pattern',
  Min = 'min',
  Max = 'max',
  Email = 'email',
  Url = 'url',
}
