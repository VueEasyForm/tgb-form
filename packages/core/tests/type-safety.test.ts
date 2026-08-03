import { describe, expectTypeOf, test } from 'vitest';
import * as v from 'valibot';
import type { StandardSchemaV1 } from '@tanstack/form-core';
import {
  cloneJson,
  type InferFormValues,
  createRendererRegistry,
  createValidatorRegistry,
  defineForm,
  deserializeForm,
  FieldDataType,
  getDefaultValues,
  resolveRenderer,
  serializeForm,
  toTanStackOptions,
  toValibotSchema,
  type FieldDefinition,
  type FormDefinition,
  type FormDefinitionInput,
  type JsonObject,
  type JsonValue,
  type RuntimeFormDefinition,
  type TgbFormTanStackOptions,
} from '../src';

// ---------------------------------------------------------------------------
// InferFormValues
// ---------------------------------------------------------------------------
describe('InferFormValues', () => {
  test('resolves concrete form values from field defaultValues', () => {
    type T = InferFormValues<{
      readonly fields: {
        readonly name: { readonly type: FieldDataType.String; readonly defaultValue: string };
        readonly age: { readonly type: FieldDataType.Number; readonly defaultValue: number };
        readonly active: { readonly type: FieldDataType.Boolean; readonly defaultValue: boolean };
      };
    }>;

    expectTypeOf<T>().toEqualTypeOf<{
      name: string;
      age: number;
      active: boolean;
    }>();
  });

  test('preserves literal field keys and widens defaults by field type', () => {
    const formDefinition = defineForm({
      fields: {
        email: { type: FieldDataType.String, defaultValue: 'a@b.com' },
        age: { type: FieldDataType.Number, defaultValue: 30 },
        active: { type: FieldDataType.Boolean, defaultValue: true },
        profile: {
          type: FieldDataType.Object,
          defaultValue: { nickname: '' },
          fields: {
            nickname: { type: FieldDataType.String, defaultValue: '' },
            score: { type: FieldDataType.Number, defaultValue: 0 },
          },
        },
        tags: {
          type: FieldDataType.Array,
          defaultValue: [],
          element: { type: FieldDataType.String, defaultValue: '' },
        },
      },
    });

    type FormSchema = InferFormValues<typeof formDefinition>;

    expectTypeOf<FormSchema>().toEqualTypeOf<{
      email: string;
      age: number;
      active: boolean;
      profile: { nickname: string; score: number };
      tags: string[];
    }>();

    const updateValues = (values: FormSchema) => {
      values.email = 'updated@example.com';
      values.profile.nickname = 'updated';
      values.tags.push('new tag');
    };

    expectTypeOf(updateValues).toBeFunction();
  });

  test('falls back to JsonValue for unconstrained object and array fields', () => {
    const formDefinition = defineForm({
      fields: {
        meta: { type: FieldDataType.Object, defaultValue: {} },
        extra: { type: FieldDataType.Array, defaultValue: [] },
      },
    });

    type FormSchema = InferFormValues<typeof formDefinition>;

    expectTypeOf<FormSchema>().toEqualTypeOf<{
      meta: JsonObject;
      extra: JsonValue[];
    }>();
  });

  test('uses the JsonValue index signature for non-literal definitions', () => {
    function wrap(form: FormDefinition): FormDefinition {
      return form;
    }

    const indexed = wrap({
      fields: {
        x: { type: FieldDataType.String, defaultValue: '' },
      },
    });

    type T = InferFormValues<typeof indexed>;
    expectTypeOf<T>().toEqualTypeOf<Record<string, JsonValue>>();
  });

  test('types onSubmit through TgbFormTanStackOptions', () => {
    const form = defineForm({
      fields: {
        email: { type: FieldDataType.String, defaultValue: '' },
        age: { type: FieldDataType.Number, defaultValue: 0 },
      },
    });

    type SubmitProps = Parameters<NonNullable<TgbFormTanStackOptions<typeof form>['onSubmit']>>[0];

    expectTypeOf<SubmitProps>().toEqualTypeOf<{ value: { email: string; age: number } }>();
  });
});

// ---------------------------------------------------------------------------
// TgbFormTanStackOutput — onSubmit is StandardSchemaV1 (not intersected with fn)
// ---------------------------------------------------------------------------
describe('TgbFormTanStackOutput', () => {
  test('onSubmit is a StandardSchemaV1', () => {
    const form = defineForm({
      fields: {
        email: { type: FieldDataType.String, defaultValue: '' },
      },
    });

    const options = toTanStackOptions(form);
    expectTypeOf(options.validators.onSubmit).toExtend<StandardSchemaV1>();
  });
});

// ---------------------------------------------------------------------------
// serializeForm — strips runtime-only properties
// ---------------------------------------------------------------------------
describe('serializeForm', () => {
  test('output equals FormDefinition exactly (no runtime props)', () => {
    const validators = createValidatorRegistry();
    const renderers = createRendererRegistry({});

    const form = defineForm(
      {
        fields: {
          x: { type: FieldDataType.String, defaultValue: '' },
        },
      },
      { validators, renderers },
    );

    // Input has runtime-only properties
    expectTypeOf(form).toExtend<RuntimeFormDefinition>();

    // Serialized output matches FormDefinition
    const serialized = serializeForm(form);
    expectTypeOf(serialized).toEqualTypeOf<FormDefinition>();
  });
});

// ---------------------------------------------------------------------------
// deserializeForm — returns RuntimeFormDefinition
// ---------------------------------------------------------------------------
describe('deserializeForm', () => {
  test('returns RuntimeFormDefinition with registries', () => {
    const renderers = createRendererRegistry({});
    const raw = JSON.stringify({
      fields: { name: { type: FieldDataType.String, defaultValue: '' } },
    });

    const form = deserializeForm(raw, { renderers });
    expectTypeOf(form).toExtend<RuntimeFormDefinition>();
  });

  test('returns RuntimeFormDefinition from unknown input', () => {
    const form = deserializeForm({ fields: {} });
    expectTypeOf(form).toExtend<RuntimeFormDefinition>();
    expectTypeOf<InferFormValues<typeof form>>().toExtend<Record<string, JsonValue>>();
  });

  test('preserves the schema when given a definition type parameter', () => {
    const original = defineForm({
      fields: {
        email: { type: FieldDataType.String, defaultValue: 'a@b.com' },
        age: { type: FieldDataType.Number, defaultValue: 30 },
      },
    });

    const restored = deserializeForm<typeof original>(JSON.stringify(serializeForm(original)));

    type RestoredSchema = InferFormValues<typeof restored>;
    expectTypeOf<RestoredSchema>().toEqualTypeOf<{
      email: string;
      age: number;
    }>();
  });
});

// ---------------------------------------------------------------------------
// defineForm — returns correct type with/without registries
// ---------------------------------------------------------------------------
describe('defineForm', () => {
  test('returns RuntimeFormDefinition with both registries', () => {
    const validators = createValidatorRegistry();
    const renderers = createRendererRegistry({});

    const form = defineForm(
      {
        fields: {
          name: { type: FieldDataType.String, defaultValue: '' },
        },
      },
      { validators, renderers },
    );

    expectTypeOf(form).toExtend<RuntimeFormDefinition>();
  });

  test('returns plain FormDefinition without registries', () => {
    const form = defineForm({
      fields: {
        name: { type: FieldDataType.String, defaultValue: '' },
      },
    });

    expectTypeOf(form).toExtend<FormDefinition>();
  });
});

// ---------------------------------------------------------------------------
// createRendererRegistry — preserves literal type keys
// ---------------------------------------------------------------------------
describe('createRendererRegistry literal types', () => {
  test('preserves named renderer keys', () => {
    const registry = createRendererRegistry({
      byName: { email: Symbol('email'), text: Symbol('text') },
    });

    expectTypeOf(registry.byName.email).toExtend<symbol>();
    expectTypeOf(registry.byName.text).toExtend<symbol>();
  });

  test('preserves type renderer keys', () => {
    const registry = createRendererRegistry({
      byType: { [FieldDataType.String]: Symbol('str') },
    });

    expectTypeOf(registry.byType[FieldDataType.String]).toExtend<symbol | undefined>();
  });
});

// ---------------------------------------------------------------------------
// FormDefinitionInput — component name narrowing with renderer registry
// ---------------------------------------------------------------------------
describe('component name narrowing', () => {
  test('allows known component names when registry is provided', () => {
    const registry = createRendererRegistry({
      byName: { known: Symbol('known') },
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
      { renderers: registry },
    );
  });

  test('rejects unknown component names when registry is provided', () => {
    const registry = createRendererRegistry({
      byName: { known: Symbol('known') },
    });

    defineForm(
      {
        fields: {
          name: {
            type: FieldDataType.String,
            defaultValue: '',
            // @ts-expect-error: 'unknown' is not in the known component names
            component: 'unknown',
          },
        },
      },
      { renderers: registry },
    );
  });

  test('accepts any component name without registry', () => {
    defineForm({
      fields: {
        name: {
          type: FieldDataType.String,
          defaultValue: '',
          component: 'anything-goes',
        },
      },
    });
  });
});

// ---------------------------------------------------------------------------
// Valibot schema is Standard Schema V1 compliant (justifies the sole cast)
// ---------------------------------------------------------------------------
describe('valibot Standard Schema V1 compliance', () => {
  test('valibot schema has ~standard with correct shape', () => {
    const form = defineForm({
      fields: {
        email: { type: FieldDataType.String, defaultValue: '' },
      },
    });

    const schema = toValibotSchema(form) as v.BaseSchema<unknown, unknown, v.BaseIssue<unknown>>;

    expectTypeOf(schema).toHaveProperty('~standard');
    expectTypeOf(schema['~standard'].version).toEqualTypeOf<1>();
    expectTypeOf(schema['~standard'].vendor).toEqualTypeOf<'valibot'>();
    expectTypeOf(schema['~standard'].validate).toExtend<Function>();
  });

  test('valibot BaseSchema is compatible with StandardSchemaV1<unknown, unknown>', () => {
    type ValibotSchema = v.BaseSchema<unknown, unknown, v.BaseIssue<unknown>>;

    // Structural check: valibot's ~standard matches StandardSchemaV1Props
    expectTypeOf<ValibotSchema>().toExtend<StandardSchemaV1<unknown, unknown>>();
  });
});

// ---------------------------------------------------------------------------
// resolveRenderer — returns correct union type from registry
// ---------------------------------------------------------------------------
describe('resolveRenderer return type', () => {
  test('returns union of all renderer values', () => {
    const registry = createRendererRegistry({
      byName: { a: 'A' as const },
      byType: { [FieldDataType.Number]: 42 as const },
    });

    const field: FieldDefinition = {
      type: FieldDataType.Number,
      defaultValue: 0,
      component: 'a',
    };

    const renderer = resolveRenderer(field, registry);
    expectTypeOf(renderer).toMatchTypeOf<'A' | 42>();
  });
});

// ---------------------------------------------------------------------------
// cloneJson — preserves input type
// ---------------------------------------------------------------------------
describe('cloneJson type preservation', () => {
  test('returns the same type as input', () => {
    expectTypeOf(cloneJson({ a: 1 } as const)).toEqualTypeOf<{ readonly a: 1 }>();
    expectTypeOf(cloneJson([1, 2, 3])).toEqualTypeOf<number[]>();
    expectTypeOf(cloneJson('hello')).toEqualTypeOf<'hello'>();
  });
});

// ---------------------------------------------------------------------------
// getDefaultValues — mapped type correctness
// ---------------------------------------------------------------------------
describe('getDefaultValues mapped type', () => {
  test('includes only defined field keys', () => {
    const form = defineForm({
      fields: {
        a: { type: FieldDataType.String, defaultValue: '' },
        b: { type: FieldDataType.Number, defaultValue: 0 },
      },
    });

    const values = getDefaultValues(form);
    expectTypeOf(values).toHaveProperty('a').toEqualTypeOf<string>();
    expectTypeOf(values).toHaveProperty('b').toEqualTypeOf<number>();
  });
});

// ---------------------------------------------------------------------------
// FormDefinitionInput is a strict subset of FormDefinition
// ---------------------------------------------------------------------------
describe('FormDefinitionInput / FormDefinition relationship', () => {
  test('FormDefinitionInput is assignable to FormDefinition', () => {
    // Authoring inputs narrow defaultValue by type; normalized definitions only
    // grow those literals into their JSON-safe base types, so the reverse
    // relationship must hold.
    const input: FormDefinitionInput<string> = {
      fields: {
        name: {
          type: FieldDataType.String,
          defaultValue: '',
        },
      },
    };

    const _definition: FormDefinition = input;
    void _definition;
  });
});

// ---------------------------------------------------------------------------
// FieldDefinitionInput — defaultValue must match the declared field type
// ---------------------------------------------------------------------------
describe('defaultValue is narrowed by field type', () => {
  test('rejects string defaults on number fields', () => {
    // Runtime validation also rejects these, so keep the call unexecuted and
    // rely on the compiler to enforce the narrowing via the @ts-expect-error.
    const build = () =>
      defineForm({
        fields: {
          // @ts-expect-error: number fields require a numeric defaultValue
          age: { type: FieldDataType.Number, defaultValue: '' },
        },
      });

    expectTypeOf(build).toBeFunction();
  });

  test('rejects mismatched defaults on other field types', () => {
    const build = () =>
      defineForm({
        fields: {
          // @ts-expect-error: string fields require a string defaultValue
          name: { type: FieldDataType.String, defaultValue: 42 },
          // @ts-expect-error: boolean fields require a boolean defaultValue
          active: { type: FieldDataType.Boolean, defaultValue: 'true' },
          // @ts-expect-error: object fields require a JSON object defaultValue
          meta: { type: FieldDataType.Object, defaultValue: [] },
          // @ts-expect-error: array fields require an array defaultValue
          tags: { type: FieldDataType.Array, defaultValue: 'x' },
        },
      });

    expectTypeOf(build).toBeFunction();
  });

  test('accepts valid defaults including empty string, zero, and empty arrays', () => {
    const build = () =>
      defineForm({
        fields: {
          empty: { type: FieldDataType.String, defaultValue: '' },
          zero: { type: FieldDataType.Number, defaultValue: 0 },
          on: { type: FieldDataType.Boolean, defaultValue: true },
          obj: { type: FieldDataType.Object, defaultValue: {} },
          arr: { type: FieldDataType.Array, defaultValue: [] },
        },
      });

    expectTypeOf(build).toBeFunction();
  });
});
