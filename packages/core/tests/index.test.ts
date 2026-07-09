import { describe, expect, test } from 'vitest';
import * as v from 'valibot';
import {
  createRendererRegistry,
  createValidatorRegistry,
  defineForm,
  deserializeForm,
  FieldDataType,
  resolveRenderer,
  serializeForm,
  toTanStackOptions,
  toValibotSchema,
  VFormDefinition,
  VValidationRule,
  ValidationRuleKind,
} from '../src';

describe('form definitions', () => {
  test('exports enum-backed Valibot schemas for JSON contracts', () => {
    const parsedForm = v.parse(VFormDefinition, {
      fields: {
        email: {
          type: FieldDataType.String,
          defaultValue: '',
          rules: [{ kind: ValidationRuleKind.Email }],
        },
      },
    });

    const parsedRule = v.parse(VValidationRule, {
      kind: ValidationRuleKind.MinLength,
      value: 2,
    });

    expect(parsedForm.fields.email.type).toBe(FieldDataType.String);
    expect(parsedRule.kind).toBe(ValidationRuleKind.MinLength);
  });

  test('serializes and deserializes JSON-safe definitions', () => {
    const form = defineForm({
      fields: {
        email: {
          type: FieldDataType.String,
          defaultValue: '',
          label: 'Email',
          component: 'email-input',
          props: { autocomplete: 'email' },
          rules: [{ kind: ValidationRuleKind.Required }, { kind: ValidationRuleKind.Email }],
        },
      },
    });

    const serialized = serializeForm(form);
    const deserialized = deserializeForm(serialized);

    expect(deserialized).toEqual(form);
  });

  test('rejects default values that do not match field data types', () => {
    expect(() =>
      defineForm({
        fields: {
          age: {
            type: FieldDataType.Number,
            defaultValue: 'not a number',
          },
        },
      }),
    ).toThrow(/defaultValue.*number/);
  });
});

describe('validation compilation', () => {
  test('compiles common rules into a Valibot schema', () => {
    const form = defineForm({
      fields: {
        name: {
          type: FieldDataType.String,
          defaultValue: '',
          rules: [
            { kind: ValidationRuleKind.Required, message: 'Name is required' },
            { kind: ValidationRuleKind.MinLength, value: 2, message: 'Name is too short' },
          ],
        },
        age: {
          type: FieldDataType.Number,
          defaultValue: 18,
          rules: [{ kind: ValidationRuleKind.Min, value: 18, message: 'Must be an adult' }],
        },
      },
    });

    const schema = toValibotSchema(form);

    expect(v.safeParse(schema, { name: 'Ada', age: 18 }).success).toBe(true);
    const result = v.safeParse(schema, { name: '', age: 16 });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.issues.map((issue) => issue.message)).toEqual([
        'Name is required',
        'Name is too short',
        'Must be an adult',
      ]);
    }
  });

  test('applies custom validator registry entries in order', () => {
    const registry = createValidatorRegistry()
      .register('startsWithA', ({ message }) =>
        v.check((value: string) => value.startsWith('A'), message),
      )
      .register('endsWithZ', ({ message }) =>
        v.check((value: string) => value.endsWith('z'), message),
      );

    const form = defineForm(
      {
        fields: {
          code: {
            type: FieldDataType.String,
            defaultValue: '',
            validators: [
              { name: 'startsWithA', message: 'Must start with A' },
              { name: 'endsWithZ', message: 'Must end with z' },
            ],
          },
        },
      },
      { validators: registry },
    );

    const result = v.safeParse(toValibotSchema(form), { code: 'middle' });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.issues.map((issue) => issue.message)).toEqual([
        'Must start with A',
        'Must end with z',
      ]);
    }
  });

  test('fails clearly when a custom validator is missing', () => {
    const form = defineForm({
      fields: {
        email: {
          type: FieldDataType.String,
          defaultValue: '',
          validators: [{ name: 'uniqueEmail' }],
        },
      },
    });

    expect(() => toValibotSchema(form)).toThrow(/uniqueEmail/);
  });
});

describe('TanStack options', () => {
  test('generates default values and form-level validators', () => {
    const form = defineForm({
      fields: {
        email: {
          type: FieldDataType.String,
          defaultValue: '',
          rules: [{ kind: ValidationRuleKind.Email }],
        },
        subscribed: {
          type: FieldDataType.Boolean,
          defaultValue: false,
        },
      },
    });

    const options = toTanStackOptions(form, {
      formId: 'newsletter',
    });

    expect(options.defaultValues).toEqual({
      email: '',
      subscribed: false,
    });
    expect(options.formId).toBe('newsletter');
    expect(options.validators?.onSubmit).toBeDefined();
  });
});

describe('renderer registry', () => {
  test('resolves named renderers before type renderers', () => {
    const NamedRenderer = Symbol('named renderer');
    const TypeRenderer = Symbol('type renderer');
    const registry = createRendererRegistry({
      byName: { email: NamedRenderer },
      byType: { [FieldDataType.String]: TypeRenderer },
    });
    const form = defineForm({
      fields: {
        email: {
          type: FieldDataType.String,
          defaultValue: '',
          component: 'email',
        },
      },
    });

    expect(resolveRenderer(form.fields.email, registry)).toBe(NamedRenderer);
  });

  test('resolves type renderers when no named renderer is requested', () => {
    const TypeRenderer = Symbol('type renderer');
    const registry = createRendererRegistry({
      byType: { [FieldDataType.String]: TypeRenderer },
    });
    const form = defineForm({
      fields: {
        name: {
          type: FieldDataType.String,
          defaultValue: '',
        },
      },
    });

    expect(resolveRenderer(form.fields.name, registry)).toBe(TypeRenderer);
  });

  test('does not fall back to type renderers for missing named renderers', () => {
    const TypeRenderer = Symbol('type renderer');
    const registry = createRendererRegistry({
      byType: { [FieldDataType.String]: TypeRenderer },
    });
    const form = defineForm({
      fields: {
        name: {
          type: FieldDataType.String,
          defaultValue: '',
          component: 'missing',
        },
      },
    });

    expect(() => resolveRenderer(form.fields.name, registry)).toThrow(/missing/);
  });
});

const typeCheckedRendererRegistry = createRendererRegistry({
  byName: {
    known: Symbol('known renderer'),
  },
  byType: {
    [FieldDataType.String]: Symbol('string renderer'),
  },
});

defineForm(
  {
    fields: {
      name: {
        type: FieldDataType.String,
        defaultValue: '',
        component: 'known',
      },
    },
  },
  { renderers: typeCheckedRendererRegistry },
);

defineForm(
  {
    fields: {
      name: {
        type: FieldDataType.String,
        defaultValue: '',
        // @ts-expect-error component names are checked when a renderer registry is supplied
        component: 'unknown',
      },
    },
  },
  { renderers: typeCheckedRendererRegistry },
);
