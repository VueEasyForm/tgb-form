import { describe, expect, expectTypeOf, test } from 'vitest';
import * as v from 'valibot';
import {
  defineForm,
  deserializeForm,
  FieldDataType,
  getDefaultValues,
  serializeForm,
  toTanStackOptions,
  toValibotSchema,
  ValidationRuleKind,
  type InferFormValues,
} from '../src';

// ---------------------------------------------------------------------------
// Organic usage: the shape most developers will author.
// ---------------------------------------------------------------------------
const signupForm = defineForm({
  fields: {
    email: {
      type: FieldDataType.String,
      defaultValue: 'ada@example.test',
      rules: [{ kind: ValidationRuleKind.Email }],
    },
    profile: {
      type: FieldDataType.Object,
      defaultValue: { nickname: '', tagline: '' },
      fields: {
        nickname: { type: FieldDataType.String, defaultValue: '' },
        tagline: { type: FieldDataType.String, defaultValue: '' },
      },
    },
    tags: {
      type: FieldDataType.Array,
      defaultValue: ['news', 'updates'],
      element: { type: FieldDataType.String, defaultValue: '' },
    },
    scores: {
      type: FieldDataType.Array,
      defaultValue: [10, 20],
      element: { type: FieldDataType.Number, defaultValue: 0 },
    },
    members: {
      type: FieldDataType.Array,
      defaultValue: [{ name: 'Ada' }],
      element: {
        type: FieldDataType.Object,
        defaultValue: { name: '' },
        fields: {
          name: { type: FieldDataType.String, defaultValue: '' },
        },
      },
    },
  },
});

type SignupValues = InferFormValues<typeof signupForm>;

describe('organic form authoring', () => {
  test('infers true element types for non-empty array defaults', () => {
    expectTypeOf<SignupValues>().toEqualTypeOf<{
      email: string;
      profile: { nickname: string; tagline: string };
      tags: string[];
      scores: number[];
      members: { name: string }[];
    }>();
  });

  test('keeps non-empty array defaults at runtime', () => {
    expect(getDefaultValues(signupForm)).toEqual({
      email: 'ada@example.test',
      profile: { nickname: '', tagline: '' },
      tags: ['news', 'updates'],
      scores: [10, 20],
      members: [{ name: 'Ada' }],
    });
  });

  test('object defaults synthesize missing child keys, explicit keys win', () => {
    const form = defineForm({
      fields: {
        profile: {
          type: FieldDataType.Object,
          defaultValue: { nickname: 'ada' },
          fields: {
            nickname: { type: FieldDataType.String, defaultValue: '' },
            tagline: { type: FieldDataType.String, defaultValue: 'hello' },
          },
        },
      },
    });

    expect(getDefaultValues(form)).toEqual({
      profile: { nickname: 'ada', tagline: 'hello' },
    });
  });

  test('compiled schema accepts the definition defaults', () => {
    expect(v.safeParse(toValibotSchema(signupForm), getDefaultValues(signupForm)).success).toBe(
      true,
    );
  });

  test('rejects array defaults that do not match the element definition', () => {
    const build = () =>
      defineForm({
        fields: {
          // @ts-expect-error: numbers are not valid entries for a string element
          tags: {
            type: FieldDataType.Array,
            defaultValue: [1, 2],
            element: { type: FieldDataType.String, defaultValue: '' },
          },
        },
      });

    expectTypeOf(build).toBeFunction();
  });

  test('rejects mismatched entries in nested object arrays', () => {
    const build = () =>
      defineForm({
        fields: {
          // @ts-expect-error: name must be a string per the element definition
          members: {
            type: FieldDataType.Array,
            defaultValue: [{ name: 42 }],
            element: {
              type: FieldDataType.Object,
              defaultValue: { name: '' },
              fields: {
                name: { type: FieldDataType.String, defaultValue: '' },
              },
            },
          },
        },
      });

    expectTypeOf(build).toBeFunction();
  });
});

describe('organic TanStack overrides', () => {
  test('user defaultValues win per key without dropping nested siblings', () => {
    const options = toTanStackOptions(signupForm, {
      defaultValues: {
        email: 'grace@example.test',
        profile: { nickname: 'ada' },
      },
    });

    expect(options.defaultValues).toEqual({
      email: 'grace@example.test',
      profile: { nickname: 'ada', tagline: '' },
      tags: ['news', 'updates'],
      scores: [10, 20],
      members: [{ name: 'Ada' }],
    });
    expectTypeOf(options.defaultValues.tags).toEqualTypeOf<string[]>();
  });

  test('array overrides replace the definition array wholesale', () => {
    const options = toTanStackOptions(signupForm, {
      defaultValues: { tags: ['only-this'] },
    });

    expect(options.defaultValues.tags).toEqual(['only-this']);
  });

  test('explicit validators.onSubmit wins over the compiled schema', () => {
    const custom = v.object({
      email: v.pipe(v.string(), v.email()),
      profile: v.object({ nickname: v.string(), tagline: v.string() }),
      tags: v.array(v.string()),
      scores: v.array(v.number()),
      members: v.array(v.object({ name: v.string() })),
    });
    const options = toTanStackOptions(signupForm, {
      validators: { onSubmit: custom },
    });

    expect(options.validators.onSubmit).toBe(custom);
  });

  test('other validators survive alongside the compiled schema', () => {
    const onBlur = ({ value }: { value: SignupValues }) =>
      value.email === '' ? 'Email is required' : undefined;
    const options = toTanStackOptions(signupForm, {
      validators: { onBlur },
    });

    expect(options.validators.onBlur).toBe(onBlur);
    expect(options.validators.onSubmit).toBeDefined();
  });

  test('rejects mistyped validators', () => {
    toTanStackOptions(signupForm, {
      // @ts-expect-error: validators must be functions or Standard Schemas
      validators: { onBlur: 42 },
    });
  });

  test('unrelated TanStack config passes through untouched', () => {
    const options = toTanStackOptions(signupForm, {
      formId: 'signup',
    });

    expect(options.formId).toBe('signup');
    expect(options.defaultValues.email).toBe('ada@example.test');
  });

  test('onSubmit handler receives fully typed values', () => {
    toTanStackOptions(signupForm, {
      onSubmit: ({ value }) => {
        expectTypeOf(value).toEqualTypeOf<SignupValues>();
        value.tags.push('reader');
        // @ts-expect-error: scores holds numbers
        value.scores.push('many');
      },
    });
  });

  test('supports every form-level on* TanStack offers, without annotations', () => {
    const options = toTanStackOptions(signupForm, {
      validators: {
        onMount: ({ value }) => {
          expectTypeOf(value).toEqualTypeOf<SignupValues>();
          return undefined;
        },
        onChange: ({ value }) => (value.email === '' ? 'Email is required' : undefined),
        onChangeAsync: async ({ value }) => {
          expectTypeOf(value).toEqualTypeOf<SignupValues>();
          return undefined;
        },
        onBlur: ({ value }) => (value.tags.length === 0 ? 'Pick a tag' : undefined),
        onBlurAsync: async () => undefined,
        onSubmitAsync: async () => undefined,
        onDynamic: ({ value }) => {
          expectTypeOf(value).toEqualTypeOf<SignupValues>();
          return undefined;
        },
        onDynamicAsync: async () => undefined,
        onChangeAsyncDebounceMs: 200,
      },
      listeners: {
        onMount: () => {},
        onChange: () => {},
        onSubmit: () => {},
      },
      onSubmit: ({ value }) => {
        expectTypeOf(value).toEqualTypeOf<SignupValues>();
      },
      onSubmitInvalid: ({ value }) => {
        expectTypeOf(value).toEqualTypeOf<SignupValues>();
      },
      asyncDebounceMs: 100,
      formId: 'signup',
    });

    expect(options.validators.onChangeAsyncDebounceMs).toBe(200);
    expect(options.validators.onSubmit).toBeDefined();
    expect(options.listeners?.onSubmit).toBeDefined();
    expect(options.asyncDebounceMs).toBe(100);
    expect(options.formId).toBe('signup');
  });

  test('survives a JSON round trip for DB storage', () => {
    const restored = deserializeForm<typeof signupForm>(JSON.stringify(serializeForm(signupForm)));
    const options = toTanStackOptions(restored);

    expect(options.defaultValues).toEqual(getDefaultValues(signupForm));
    expectTypeOf(options.defaultValues).toEqualTypeOf<SignupValues>();
    expect(v.safeParse(toValibotSchema(restored), options.defaultValues).success).toBe(true);
  });
});
