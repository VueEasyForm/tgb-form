import { describe, expect, test } from 'vitest';
import * as v from 'valibot';
import { defineForm, FieldDataType, toValibotSchema, ValidationRuleKind } from '../src';

describe('form builder integration', () => {
  test('validates every built-in rule across published form definitions', () => {
    const profileForm = defineForm({
      fields: {
        displayName: {
          type: FieldDataType.String,
          defaultValue: '',
          rules: [
            { kind: ValidationRuleKind.Required, message: 'Display name is required' },
            { kind: ValidationRuleKind.MinLength, value: 3, message: 'Display name is too short' },
            { kind: ValidationRuleKind.MaxLength, value: 20, message: 'Display name is too long' },
            {
              kind: ValidationRuleKind.Pattern,
              value: '^[A-Za-z ]+$',
              message: 'Display name has invalid characters',
            },
          ],
        },
      },
    });
    const contactForm = defineForm({
      fields: {
        email: {
          type: FieldDataType.String,
          defaultValue: '',
          rules: [{ kind: ValidationRuleKind.Email, message: 'Email is invalid' }],
        },
        website: {
          type: FieldDataType.String,
          defaultValue: '',
          rules: [{ kind: ValidationRuleKind.Url, message: 'Website is invalid' }],
        },
      },
    });
    const teamForm = defineForm({
      fields: {
        memberCount: {
          type: FieldDataType.Number,
          defaultValue: 2,
          rules: [
            { kind: ValidationRuleKind.Min, value: 2, message: 'Team is too small' },
            { kind: ValidationRuleKind.Max, value: 50, message: 'Team is too large' },
          ],
        },
      },
    });

    const scenarios = [
      {
        schema: toValibotSchema(profileForm),
        valid: { displayName: 'Ada Lovelace' },
        invalid: { displayName: '' },
        messages: [
          'Display name is required',
          'Display name is too short',
          'Display name has invalid characters',
        ],
      },
      {
        schema: toValibotSchema(profileForm),
        valid: { displayName: 'Ada Lovelace' },
        invalid: { displayName: 'A'.repeat(21) },
        messages: ['Display name is too long'],
      },
      {
        schema: toValibotSchema(contactForm),
        valid: { email: 'ada@example.test', website: 'https://example.test' },
        invalid: { email: 'invalid', website: 'invalid' },
        messages: ['Email is invalid', 'Website is invalid'],
      },
      {
        schema: toValibotSchema(teamForm),
        valid: { memberCount: 2 },
        invalid: { memberCount: 1 },
        messages: ['Team is too small'],
      },
      {
        schema: toValibotSchema(teamForm),
        valid: { memberCount: 50 },
        invalid: { memberCount: 51 },
        messages: ['Team is too large'],
      },
    ];

    for (const scenario of scenarios) {
      expect(v.safeParse(scenario.schema, scenario.valid).success).toBe(true);

      const result = v.safeParse(scenario.schema, scenario.invalid);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.issues.map((issue) => issue.message)).toEqual(scenario.messages);
      }
    }
  });
});
