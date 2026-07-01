import * as v from 'valibot';
import { FieldDataType, ValidationRuleKind } from './schema/enums';
import type { FieldDefinition, FormDefinition, ValidationRule } from './schema';
import type { RuntimeFormDefinition } from './schema/form';
import { compileCustomValidators, type ValibotValidationItem } from './validator-registry';

type AnySchema = v.BaseSchema<unknown, unknown, v.BaseIssue<unknown>>;

/**
 * Compiles a normalized {@link FormDefinition} into a Valibot object schema.
 */
export function toValibotSchema(form: FormDefinition): AnySchema {
  const runtimeForm = form as RuntimeFormDefinition;

  return v.object(
    Object.fromEntries(
      Object.entries(form.fields).map(([name, field]) => [
        name,
        toFieldSchema(field, runtimeForm.validators),
      ]),
    ),
  );
}

function toFieldSchema(
  field: FieldDefinition,
  registry: RuntimeFormDefinition['validators'],
): AnySchema {
  const baseSchema = toBaseSchema(field);
  const pipeItems = [
    ...compileCommonRules(field),
    ...compileCustomValidators(field.validators, registry),
  ];

  if (pipeItems.length === 0) {
    return baseSchema;
  }

  return v.pipe(baseSchema, ...(pipeItems as [ValibotValidationItem, ...ValibotValidationItem[]]));
}

function toBaseSchema(field: FieldDefinition): AnySchema {
  switch (field.type) {
    case FieldDataType.String:
      return v.string();
    case FieldDataType.Number:
      return v.number();
    case FieldDataType.Boolean:
      return v.boolean();
    case FieldDataType.Object:
      return field.fields
        ? v.object(
            Object.fromEntries(
              Object.entries(field.fields).map(([name, nestedField]) => [
                name,
                toFieldSchema(nestedField, undefined),
              ]),
            ),
          )
        : v.object({});
    case FieldDataType.Array:
      return v.array(field.element ? toFieldSchema(field.element, undefined) : v.unknown());
  }
}

function compileCommonRules(field: FieldDefinition): ValibotValidationItem[] {
  return (field.rules ?? []).map((rule) => compileCommonRule(field, rule));
}

function compileCommonRule(field: FieldDefinition, rule: ValidationRule): ValibotValidationItem {
  switch (rule.kind) {
    case ValidationRuleKind.Required:
      return v.check(
        (value) => isFilledValue(field, value),
        rule.message ?? 'This field is required',
      );
    case ValidationRuleKind.MinLength:
      return v.minLength(rule.value, rule.message);
    case ValidationRuleKind.MaxLength:
      return v.maxLength(rule.value, rule.message);
    case ValidationRuleKind.Pattern:
      return v.regex(new RegExp(rule.value), rule.message);
    case ValidationRuleKind.Min:
      return v.minValue(rule.value, rule.message);
    case ValidationRuleKind.Max:
      return v.maxValue(rule.value, rule.message);
    case ValidationRuleKind.Email:
      return v.email(rule.message);
    case ValidationRuleKind.Url:
      return v.url(rule.message);
  }
}

function isFilledValue(field: FieldDefinition, value: unknown): boolean {
  if (value === null || value === undefined) return false;
  if (field.type === FieldDataType.String) return value !== '';
  if (field.type === FieldDataType.Array) return Array.isArray(value) && value.length > 0;
  if (field.type === FieldDataType.Object)
    return typeof value === 'object' && Object.keys(value).length > 0;
  return true;
}
